#!/usr/bin/env python3
"""Promote a tested immutable Firebase Hosting version, or restore a previous one."""
import argparse
import importlib.util
import json
from pathlib import Path
import re

spec = importlib.util.spec_from_file_location('hosting', Path(__file__).with_name('deploy-static.py'))
hosting = importlib.util.module_from_spec(spec)
spec.loader.exec_module(hosting)


def promote(*, channel=None, version=None):
    if (channel is None) == (version is None):
        raise ValueError('Choose a preview channel or immutable version')
    if channel:
        if not re.fullmatch(r'[a-z0-9-]{1,40}', channel) or channel == 'live':
            raise ValueError('Invalid preview channel')
        state = hosting.request(f'sites/{hosting.SITE}/channels/{channel}')
        version = state['release']['version']['name']
    if not isinstance(version, str) or not re.fullmatch(f'sites/{hosting.SITE}/versions/[a-z0-9]+', version):
        raise ValueError('Version must belong to the website site')
    metadata = hosting.request(version)
    if metadata['status'] != 'FINALIZED':
        raise ValueError('Only finalized versions can be promoted')
    previous = hosting.request(f'sites/{hosting.SITE}/releases?pageSize=1').get('releases', [])
    release = hosting.request(f'sites/{hosting.SITE}/releases?versionName={version}', {})
    return {'version': version, 'release': release['name'],
            'previousVersion': previous[0].get('version', {}).get('name') if previous else None}


if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    source = parser.add_mutually_exclusive_group(required=True)
    source.add_argument('--channel')
    source.add_argument('--version')
    args = parser.parse_args()
    print(json.dumps(promote(channel=args.channel, version=args.version), indent=2))
