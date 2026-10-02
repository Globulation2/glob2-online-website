import copy
import io
import importlib.util
from pathlib import Path
import unittest
from urllib.error import HTTPError

spec = importlib.util.spec_from_file_location('publisher', Path(__file__).with_name('publish-rankings.py'))
publisher = importlib.util.module_from_spec(spec)
spec.loader.exec_module(publisher)


def page():
    return {'ladder': 'ranked-1v1', 'name': 'Ranked 1v1', 'entries': [
        {'rank': 1, 'entity': {'kind': 'account', 'account': {'id': 'public-id', 'displayName': '<Alice>', 'kind': 'registered', 'createdAt': '2026-01-01T00:00:00Z'}}, 'rating': 1500.5, 'mu': 25, 'sigma': 3, 'games': 5, 'wins': 3, 'provisional': False}
    ]}


def feed(when='2026-10-02T10:00:00Z'):
    return publisher.project_page(page(), 'ranked-1v1', '6dbb6bfb', when)


class PublisherTest(unittest.TestCase):
    def test_projection_exposes_only_allowed_fields_and_preserves_rank(self):
        result = feed()
        self.assertEqual(set(result['entries'][0]), publisher.ENTRY_KEYS)
        self.assertEqual(result['entries'][0]['username'], '<Alice>')
        self.assertEqual(result['entries'][0]['rank'], 1)
        self.assertNotIn('public-id', str(result))
        self.assertNotIn('createdAt', str(result))

    def test_private_metadata_guests_ai_malformed_values_fail_closed(self):
        cases = []
        p = page(); p['entries'][0]['entity']['account']['email'] = 'private@example.com'; cases.append(p)
        p = page(); p['entries'][0]['entity']['account']['kind'] = 'guest'; cases.append(p)
        p = page(); p['entries'][0]['entity'] = {'kind': 'ai', 'ai': 'maxima'}; cases.append(p)
        for key, value in [('rating', float('nan')), ('rank', True), ('rank', 2), ('games', 0), ('provisional', 'false')]:
            p = page(); p['entries'][0][key] = value; cases.append(p)
        for p in cases:
            with self.subTest(page=p), self.assertRaises(ValueError):
                publisher.project_page(p, 'ranked-1v1', '6dbb6bfb', '2026-10-02T10:00:00Z')

    def test_ties_keep_authoritative_order_and_truncation_is_explicit(self):
        p = page(); second = copy.deepcopy(p['entries'][0]); second['rank'] = 2
        second['entity']['account']['displayName'] = 'Aaron'
        p['entries'].append(second); p['nextCursor'] = 'abc'
        result = publisher.project_page(p, 'ranked-1v1', '6dbb6bfb', '2026-10-02T10:00:00Z')
        self.assertEqual([e['username'] for e in result['entries']], ['<Alice>', 'Aaron'])
        self.assertTrue(result['hasMore'])
        p['entries'][1]['rating'] = 1600
        with self.assertRaises(ValueError): publisher.project_page(p, 'ranked-1v1', '6dbb6bfb', '2026-10-02T10:00:00Z')

    def test_empty_ladder_is_valid_and_unknown_fields_rejected(self):
        p = page(); p['entries'] = []
        result = publisher.project_page(p, 'ranked-1v1', '6dbb6bfb', '2026-10-02T10:00:00Z')
        self.assertEqual(result['entries'], [])
        result['password'] = 'no'
        with self.assertRaises(ValueError): publisher.validate_feed(result)

    def test_newer_snapshot_remains_and_writes_use_generation_precondition(self):
        calls = []
        def request(url, **kwargs):
            calls.append((url, kwargs))
            if len(calls) == 1: return {'generation': '42'}
            if len(calls) == 2: return feed('2026-10-02T09:00:00Z')
            return {'generation': '43'}
        self.assertTrue(publisher.publish(feed(), 'test', 'rankings.json', 'token', request=request))
        self.assertIn('generation=42', calls[1][0])
        self.assertIn('ifGenerationMatch=42', calls[2][0])
        self.assertNotIn(b'public-id', calls[2][1]['data'])
        calls.clear()
        self.assertFalse(publisher.publish(feed('2026-10-02T08:00:00Z'), 'test', 'rankings.json', 'token', request=request))
        self.assertEqual(len(calls), 2)

    def test_failures_do_not_delete_last_good_object(self):
        for status in [412, 503]:
            calls = []
            def request(url, **kwargs):
                calls.append(url)
                if len(calls) == 1: return {'generation': '42'}
                if len(calls) == 2: return feed('2026-10-02T09:00:00Z')
                raise HTTPError(url, status, 'failure', {}, io.BytesIO())
            if status == 412:
                self.assertFalse(publisher.publish(feed(), 'test', 'rankings.json', 'token', request=request))
            else:
                with self.assertRaises(HTTPError): publisher.publish(feed(), 'test', 'rankings.json', 'token', request=request)
            self.assertEqual(len(calls), 3)

    def test_bootstrap_requires_generation_zero(self):
        calls = []
        def request(url, **kwargs):
            calls.append(url)
            if len(calls) == 1: raise HTTPError(url, 404, 'missing', {}, io.BytesIO())
            return {'generation': '1'}
        self.assertTrue(publisher.publish(feed(), 'test', 'rankings.json', 'token', request=request))
        self.assertIn('ifGenerationMatch=0', calls[-1])

    def test_corrupt_old_snapshot_is_retained_for_operator_recovery(self):
        calls = []
        def request(url, **kwargs):
            calls.append(url)
            return {'generation': '42'} if len(calls) == 1 else {'password': 'private'}
        with self.assertRaises(ValueError): publisher.publish(feed(), 'test', 'rankings.json', 'token', request=request)
        self.assertEqual(len(calls), 2)


if __name__ == '__main__': unittest.main()
