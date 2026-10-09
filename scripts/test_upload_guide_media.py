import hashlib
import importlib.util
import json
from pathlib import Path
import tempfile
import unittest
from unittest.mock import patch

spec = importlib.util.spec_from_file_location('guide_upload', Path(__file__).with_name('upload-guide-media.py'))
uploader = importlib.util.module_from_spec(spec)
spec.loader.exec_module(uploader)

class MediaUploadTest(unittest.TestCase):
    def setUp(self):
        self.directory = tempfile.TemporaryDirectory()
        self.root = Path(self.directory.name)
        self.bytes = b'real source capture bytes'
        self.asset = {'id': 'lesson', 'path': '/guide-media/v1/lesson/inn.webp',
                      'url': f'https://storage.googleapis.com/{uploader.BUCKET}/guide-media/v1/lesson/inn.webp',
                      'sha256': hashlib.sha256(self.bytes).hexdigest(), 'bytes': len(self.bytes),
                      'kind': 'image', 'width': 1440, 'height': 900, 'caption': 'Food supply', 'alt': 'A stocked inn'}
        file = self.root / self.asset['path'].lstrip('/')
        file.parent.mkdir(parents=True)
        file.write_bytes(self.bytes)
        self.manifest = self.root / 'manifest.json'

    def tearDown(self):
        self.directory.cleanup()

    def write_manifest(self, assets):
        self.manifest.write_text(json.dumps({'schemaVersion': 1, 'assets': assets}))

    def test_checks_entire_package_before_acquiring_credentials_or_uploading(self):
        bad = {**self.asset, 'id': 'bad', 'path': '/guide-media/v1/lesson/bad.webp',
               'url': self.asset['url'].replace('inn.webp', 'bad.webp')}
        (self.root / bad['path'].lstrip('/')).write_bytes(b'corrupt')
        self.write_manifest([self.asset, bad])
        with patch.object(uploader.subprocess, 'run'), patch.object(uploader.subprocess, 'check_output') as token, patch.object(uploader.urllib.request, 'urlopen') as network:
            with self.assertRaisesRegex(ValueError, 'checksum mismatch'):
                uploader.publish(self.manifest, self.root)
            token.assert_not_called()
            network.assert_not_called()

    def test_symlink_cannot_escape_source(self):
        self.write_manifest([self.asset])
        file = self.root / self.asset['path'].lstrip('/')
        file.unlink()
        file.symlink_to('/etc/hosts')
        with patch.object(uploader.subprocess, 'run'), patch.object(uploader.subprocess, 'check_output') as token:
            with self.assertRaisesRegex(ValueError, 'escapes'):
                uploader.publish(self.manifest, self.root)
            token.assert_not_called()

if __name__ == '__main__':
    unittest.main()
