#!/usr/bin/env python3
"""Publish a sanitized, last-good snapshot from the platform's existing public API.

Authentication is supplied by attached/WIF identity via gcloud; no key files.
"""
import argparse
import datetime as dt
import fcntl
import json
import math
import re
import subprocess
import sys
import time
import urllib.error
import urllib.parse
import urllib.request

MAX_BYTES = 2 * 1024 * 1024
POLICY = 'openskill-plackett-luce-v1'
FEED_KEYS = {'schemaVersion', 'generatedAt', 'backendRevision', 'ratingPolicy', 'ladder', 'hasMore', 'entries'}
ENTRY_KEYS = {'rank', 'username', 'rating', 'provisional', 'games'}


def require(condition, message):
    if not condition:
        raise ValueError(message)


def timestamp(value):
    require(isinstance(value, str) and bool(re.fullmatch(r'\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?Z', value)), 'invalid generatedAt')
    return dt.datetime.fromisoformat(value.replace('Z', '+00:00'))


def validate_feed(feed):
    require(isinstance(feed, dict) and set(feed) == FEED_KEYS, 'invalid snapshot fields')
    require(type(feed['schemaVersion']) is int and feed['schemaVersion'] == 1, 'unsupported schema')
    timestamp(feed['generatedAt'])
    require(isinstance(feed['backendRevision'], str) and bool(re.fullmatch(r'[0-9a-f]{7,64}', feed['backendRevision'])), 'backend revision must be a deployed commit')
    require(feed['ratingPolicy'] == POLICY, 'unsupported rating policy')
    require(isinstance(feed['ladder'], str) and bool(re.fullmatch(r'[a-z0-9][a-z0-9-]{0,63}', feed['ladder'])), 'invalid ladder')
    require(type(feed['hasMore']) is bool, 'invalid hasMore')
    require(isinstance(feed['entries'], list) and len(feed['entries']) <= 200, 'invalid entries')
    last_rating = math.inf
    for index, entry in enumerate(feed['entries']):
        require(isinstance(entry, dict) and set(entry) == ENTRY_KEYS, 'unexpected entry fields')
        require(type(entry['rank']) is int and entry['rank'] == index + 1, 'non-authoritative rank order')
        require(isinstance(entry['username'], str) and 0 < len(entry['username'].encode('utf-8')) <= 32 and not re.search(r'[\x00-\x1f\x7f]', entry['username']), 'invalid public display name')
        require(type(entry['rating']) in (int, float) and math.isfinite(entry['rating']) and entry['rating'] <= last_rating, 'invalid rating/order')
        require(type(entry['games']) is int and entry['games'] > 0, 'invalid game count')
        require(type(entry['provisional']) is bool, 'invalid provisional flag')
        last_rating = entry['rating']
    return feed


def project_page(page, ladder, revision, generated_at):
    require(isinstance(page, dict) and set(page) <= {'ladder', 'name', 'entries', 'nextCursor'}, 'unexpected public API fields')
    require(page.get('ladder') == ladder and isinstance(page.get('entries'), list), 'wrong/malformed ladder')
    require('nextCursor' not in page or isinstance(page['nextCursor'], str) and 0 < len(page['nextCursor']) <= 512, 'invalid page cursor')
    entries = []
    for row in page['entries']:
        require(isinstance(row, dict) and set(row) == {'rank', 'entity', 'rating', 'mu', 'sigma', 'games', 'wins', 'provisional'}, 'unexpected leaderboard fields')
        entity = row['entity']
        require(isinstance(entity, dict) and set(entity) == {'kind', 'account'} and entity['kind'] == 'account', 'non-human leaderboard entry')
        account = entity['account']
        require(isinstance(account, dict) and set(account) == {'id', 'displayName', 'kind', 'createdAt'} and account['kind'] == 'registered', 'unexpected account metadata')
        entries.append({'rank': row['rank'], 'username': account['displayName'], 'rating': row['rating'], 'provisional': row['provisional'], 'games': row['games']})
    return validate_feed({'schemaVersion': 1, 'generatedAt': generated_at, 'backendRevision': revision, 'ratingPolicy': POLICY, 'ladder': ladder, 'hasMore': 'nextCursor' in page, 'entries': entries})


def read_json(url, *, token=None, data=None, content_type=None, deadline=None):
    remaining = 15 if deadline is None else min(15, deadline - time.monotonic())
    require(remaining > 0, 'publisher deadline exceeded')
    headers = {'Accept': 'application/json'}
    if token:
        headers['Authorization'] = 'Bearer ' + token
    if content_type:
        headers['Content-Type'] = content_type
    request = urllib.request.Request(url, data=data, headers=headers)
    # Do not follow redirects that could forward the identity bearer token.
    class NoRedirect(urllib.request.HTTPRedirectHandler):
        def redirect_request(self, *args, **kwargs):
            return None
    with urllib.request.build_opener(NoRedirect).open(request, timeout=remaining) as response:
        raw = response.read(MAX_BYTES + 1)
        require(len(raw) <= MAX_BYTES, 'response too large')
        return json.loads(raw, parse_constant=lambda _: (_ for _ in ()).throw(ValueError('non-finite JSON')))


def publish(feed, bucket, object_name, token, *, request=read_json, deadline=None):
    """Compare a pinned old generation, then atomically commit; no delete-on-failure."""
    validate_feed(feed)
    encoded_bucket = urllib.parse.quote(bucket, safe='')
    encoded_name = urllib.parse.quote(object_name, safe='')
    metadata_url = f'https://storage.googleapis.com/storage/v1/b/{encoded_bucket}/o/{encoded_name}'
    try:
        metadata = request(metadata_url, token=token, deadline=deadline)
        generation = str(metadata['generation'])
        require(generation.isdigit(), 'invalid GCS generation')
        previous = request(metadata_url + '?alt=media&generation=' + generation, token=token, deadline=deadline)
        validate_feed(previous)
        require(previous['ladder'] == feed['ladder'], 'object belongs to another ladder')
        if timestamp(previous['generatedAt']) >= timestamp(feed['generatedAt']):
            return False
    except urllib.error.HTTPError as error:
        error.close()
        if error.code != 404:
            raise
        generation = '0'
    boundary = 'glob2-rankings-snapshot-v1'
    metadata = json.dumps({'name': object_name, 'contentType': 'application/json', 'cacheControl': 'public,max-age=60'}).encode()
    body = json.dumps(feed, ensure_ascii=False, allow_nan=False, separators=(',', ':')).encode()
    payload = b'--' + boundary.encode() + b'\r\nContent-Type: application/json; charset=UTF-8\r\n\r\n' + metadata + b'\r\n--' + boundary.encode() + b'\r\nContent-Type: application/json\r\n\r\n' + body + b'\r\n--' + boundary.encode() + b'--\r\n'
    url = f'https://storage.googleapis.com/upload/storage/v1/b/{encoded_bucket}/o?uploadType=multipart&ifGenerationMatch={generation}'
    try:
        request(url, token=token, data=payload, content_type='multipart/related; boundary=' + boundary, deadline=deadline)
    except urllib.error.HTTPError as error:
        error.close()
        if error.code == 412:
            return False  # A concurrent publisher won; do not overwrite it.
        raise
    return True


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--api-origin', required=True)
    parser.add_argument('--ladder', required=True)
    parser.add_argument('--backend-revision', required=True)
    parser.add_argument('--bucket', required=True)
    parser.add_argument('--object', default='rankings/v1.json')
    parser.add_argument('--lock', default='/tmp/glob2-online-rankings.lock')
    args = parser.parse_args()
    origin = urllib.parse.urlsplit(args.api_origin)
    require(origin.scheme == 'https' and origin.hostname and not origin.username and not origin.password and origin.path in ('', '/') and not origin.query and not origin.fragment, 'API origin must be an HTTPS origin')
    with open(args.lock, 'a') as lock:
        try:
            fcntl.flock(lock, fcntl.LOCK_EX | fcntl.LOCK_NB)
        except BlockingIOError:
            print('Another publisher is running; skipped.')
            return
        deadline = time.monotonic() + 60
        generated_at = dt.datetime.now(dt.timezone.utc).isoformat(timespec='seconds').replace('+00:00', 'Z')
        url = args.api_origin.rstrip('/') + '/api/v1/leaderboards/' + urllib.parse.quote(args.ladder, safe='') + '?limit=200&provisional=include'
        feed = project_page(read_json(url, deadline=deadline), args.ladder, args.backend_revision, generated_at)
        token = subprocess.run(['gcloud', 'auth', 'print-access-token'], check=True, capture_output=True, text=True, timeout=15).stdout.strip()
        require(bool(token), 'missing workload identity token')
        changed = publish(feed, args.bucket, args.object, token, deadline=deadline)
        print('Published verified public rankings.' if changed else 'Newer/concurrent snapshot retained.')


if __name__ == '__main__':
    try:
        main()
    except Exception as error:
        # Never print bearer tokens, account records or API response bodies.
        print(f'Rankings publication failed ({type(error).__name__}); last snapshot retained.', file=sys.stderr)
        raise SystemExit(1)
