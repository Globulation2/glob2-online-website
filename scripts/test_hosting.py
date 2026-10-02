"""Hosting safety gates tested without cloud credentials or network access."""
import importlib.util
from pathlib import Path
import tempfile
import os
import unittest
from unittest.mock import patch


def load(name, file):
    spec = importlib.util.spec_from_file_location(name, Path(__file__).with_name(file))
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module


hosting = load('hosting_test', 'deploy-static.py')
promotion = load('promotion_test', 'promote-static.py')


class HostingSafetyTests(unittest.TestCase):
    def test_credentials_only_sent_to_explicit_tls_hosts(self):
        allowed = 'https://upload-firebasehosting.googleapis.com/upload/123'
        self.assertEqual(hosting.trusted_url(allowed, upload=True), allowed)
        for url in ('http://firebasehosting.googleapis.com/x',
                    'https://firebasehosting.googleapis.com.evil.test/x',
                    'https://user@firebasehosting.googleapis.com/x',
                    'https://firebasehosting.googleapis.com:444/x',
                    'https://evil.test/x'):
            with self.subTest(url=url), self.assertRaises(ValueError):
                hosting.trusted_url(url, upload=True)
        self.assertIsNone(hosting.NoRedirect().redirect_request(None, None, 302, '', {}, 'https://evil.test'))

    def test_token_command_bounded(self):
        with patch.object(hosting.subprocess, 'check_output', return_value='token\n') as call:
            self.assertEqual(hosting.access_token(), 'token')
            self.assertEqual(call.call_args.kwargs['timeout'], 15)

    def test_untrusted_version_never_calls_cloud(self):
        with patch.object(promotion.hosting, 'request') as request:
            for version in ('sites/other/versions/abc', 'sites/'+hosting.SITE+'/versions/abc?injected=1'):
                with self.assertRaises(ValueError):
                    promotion.promote(version=version)
            request.assert_not_called()

    def test_unfinalized_version_never_released(self):
        with patch.object(promotion.hosting, 'request', return_value={'status': 'CREATED'}) as request:
            with self.assertRaises(ValueError):
                promotion.promote(version=f'sites/{hosting.SITE}/versions/abc')
            self.assertEqual(request.call_count, 1)

    def test_promotion_keeps_exact_tested_version_and_rollback_pointer(self):
        version=f'sites/{hosting.SITE}/versions/tested123'
        old=f'sites/{hosting.SITE}/versions/old456'
        with patch.object(promotion.hosting, 'request', side_effect=[
                {'release': {'version': {'name': version}}}, {'status': 'FINALIZED'},
                {'releases': [{'version': {'name': old}}]}, {'name': 'release123'}]) as request:
            result=promotion.promote(channel='candidate')
            self.assertEqual(result['version'],version)
            self.assertEqual(result['previousVersion'],old)
            self.assertFalse(result['unchanged'])
            self.assertEqual(request.call_args.args,(f'sites/{hosting.SITE}/releases?versionName={version}',{}))

    def test_repeated_promotion_preserves_prior_release_for_rollback_without_post(self):
        version=f'sites/{hosting.SITE}/versions/tested123'
        old=f'sites/{hosting.SITE}/versions/old456'
        release=f'sites/{hosting.SITE}/releases/current123'
        for channel in (None, 'candidate'):
            responses=([{'release': {'version': {'name': version}}}] if channel else [])
            responses += [{'status': 'FINALIZED'},
                          {'releases': [{'name': release, 'version': {'name': version}},
                                        {'name': 'earlier456', 'version': {'name': old}}]}]
            with self.subTest(channel=channel), patch.object(promotion.hosting, 'request', side_effect=responses) as request:
                result=promotion.promote(channel=channel, version=None if channel else version)
                self.assertEqual(result, {'version': version, 'release': release,
                                         'previousVersion': old, 'unchanged': True})
                self.assertEqual(request.call_count, len(responses))
                self.assertEqual(request.call_args.args, (f'sites/{hosting.SITE}/releases?pageSize=2',))
                self.assertTrue(all(len(call.args) == 1 for call in request.call_args_list))

    def test_retry_first_active_release_has_no_rollback_pointer(self):
        version=f'sites/{hosting.SITE}/versions/first123'
        with patch.object(promotion.hosting, 'request', side_effect=[
                {'status': 'FINALIZED'},
                {'releases': [{'name': 'release123', 'version': {'name': version}}]}]) as request:
            result=promotion.promote(version=version)
            self.assertIsNone(result['previousVersion'])
            self.assertTrue(result['unchanged'])
            self.assertEqual(request.call_count, 2)

    def test_first_promotion_records_no_previous_version(self):
        version=f'sites/{hosting.SITE}/versions/first123'
        with patch.object(promotion.hosting, 'request', side_effect=[
                {'status': 'FINALIZED'}, {'releases': []}, {'name': 'release123'}]):
            result=promotion.promote(version=version)
            self.assertIsNone(result['previousVersion'])
            self.assertFalse(result['unchanged'])

    def test_failed_upload_cannot_finalize_or_release(self):
        with tempfile.TemporaryDirectory() as directory:
            root=Path(directory)
            (root/'dist').mkdir()
            (root/'dist'/'index.html').write_text('fixture')
            (root/'firebase.json').write_text('{"hosting":{"site":"'+hosting.SITE+'","cleanUrls":true,"redirects":[],"headers":[]}}')
            def api(url, payload=None, method=None):
                if url.endswith('/versions'):
                    return {'name': f'sites/{hosting.SITE}/versions/fixture'}
                if url.endswith(':populateFiles'):
                    return {'uploadRequiredHashes': list(payload['files'].values()), 'uploadUrl': 'https://evil.test/upload'}
                raise AssertionError('Failed upload must not finalize or release')
            before=Path.cwd()
            try:
                os.chdir(root)
                with patch.object(hosting, 'request', side_effect=api), patch.object(hosting, 'access_token', return_value='identity'), patch.object(hosting, 'open_request') as network:
                    with self.assertRaises(ValueError):
                        hosting.deploy('review')
                    network.assert_not_called()
            finally:
                os.chdir(before)

    def test_invalid_channel_rejected_before_any_cloud_action(self):
        with patch.object(hosting, 'request') as request:
            with self.assertRaises(ValueError):
                hosting.deploy('../live')
            request.assert_not_called()


if __name__ == '__main__':
    unittest.main()
