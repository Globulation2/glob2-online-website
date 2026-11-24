#!/usr/bin/env python3
"""Record channel observations and preserve a one-way website retirement decision."""

import datetime as dt
import json
import os
import subprocess
import sys
import urllib.error
import urllib.parse
import urllib.request

OBJECT = 'gs://glob2-website-public/twitch/v1.json'
STATUS_URL = 'https://storage.googleapis.com/glob2-website-public/twitch/v1.json'
CHANNEL_ID = '1613269448'
INACTIVITY = dt.timedelta(weeks=6)
MAX_OBSERVATION_GAP = dt.timedelta(hours=24)


class NoRedirect(urllib.request.HTTPRedirectHandler):
    def redirect_request(self, *args, **kwargs):
        return None


def read_json(url, *, headers=None, data=None):
    request = urllib.request.Request(url, data=data, headers=headers or {})
    with urllib.request.build_opener(NoRedirect).open(request, timeout=15) as response:
        body = response.read(65537)
        if len(body) > 65536:
            raise ValueError('oversized response')
        return json.loads(body), response.headers


def twitch_is_live(client_id, secret):
    credentials = urllib.parse.urlencode({
        'client_id': client_id, 'client_secret': secret, 'grant_type': 'client_credentials',
    })
    token, _ = read_json('https://id.twitch.tv/oauth2/token', data=credentials.encode())
    headers = {'Client-Id': client_id, 'Authorization': 'Bearer ' + token['access_token']}
    streams, _ = read_json('https://api.twitch.tv/helix/streams?user_id=' + CHANNEL_ID, headers=headers)
    matches = streams['data']
    if matches == []:
        return False
    if (isinstance(matches, list) and len(matches) == 1
            and matches[0]['user_id'] == CHANNEL_ID and matches[0]['type'] == 'live'):
        return True
    raise ValueError('invalid Twitch stream response')


def parse_time(value):
    if not isinstance(value, str) or not value.endswith('Z'):
        raise ValueError('status timestamps must be UTC')
    return dt.datetime.fromisoformat(value[:-1] + '+00:00')


def format_time(value):
    return value.isoformat(timespec='seconds').replace('+00:00', 'Z')


def next_status(previous, live, now):
    if previous is not None:
        checked_at = parse_time(previous['checkedAt'])
        offline_since = parse_time(previous['offlineSince']) if previous['offlineSince'] else None
        if checked_at > now or (offline_since is not None and offline_since > checked_at):
            raise ValueError('inconsistent observation dates')
        if previous['retired']:
            return previous
    else:
        checked_at = None
        offline_since = None

    if live:
        offline_since = None
    elif offline_since is None or now - checked_at > MAX_OBSERVATION_GAP:
        offline_since = now
    return {
        'schemaVersion': 1,
        'checkedAt': format_time(now),
        'offlineSince': format_time(offline_since) if offline_since else None,
        'retired': offline_since is not None and now - offline_since >= INACTIVITY,
    }


def read_status():
    try:
        status, headers = read_json(STATUS_URL, headers={'Cache-Control': 'no-cache'})
    except urllib.error.HTTPError as error:
        error.close()
        if error.code == 404:
            return None, '0'
        raise
    generation = headers.get('x-goog-generation', '')
    if (set(status) != {'schemaVersion', 'checkedAt', 'offlineSince', 'retired'}
            or status['schemaVersion'] != 1 or type(status['retired']) is not bool
            or not generation.isdecimal()):
        raise ValueError('invalid existing Twitch status')
    return status, generation


def main():
    previous, generation = read_status()
    if previous is not None and previous['retired']:
        print('Twitch links remain retired.')
        return
    live = twitch_is_live(os.environ['TWITCH_CLIENT_ID'], os.environ['TWITCH_CLIENT_SECRET'])
    now = dt.datetime.now(dt.timezone.utc)
    status = next_status(previous, live, now)
    subprocess.run(
        ['gcloud', 'storage', 'cp', '-', OBJECT, '--content-type=application/json',
         '--cache-control=public,max-age=60', '--if-generation-match=' + generation],
        input=json.dumps(status) + '\n', text=True, check=True, timeout=45,
    )
    print('Twitch links retired.' if status['retired'] else 'Recorded Twitch observation.')


if __name__ == '__main__':
    try:
        main()
    except Exception as error:
        # API errors never advance the inactivity timer or expose credential material.
        print(f'Twitch status check failed ({type(error).__name__}); previous status retained.', file=sys.stderr)
        sys.exit(1)
