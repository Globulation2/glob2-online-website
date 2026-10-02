#!/usr/bin/env python3
"""Deploy an already verified Astro dist to a Firebase channel. No secret files."""
import argparse, gzip, hashlib, json, pathlib, subprocess, urllib.request, urllib.error, urllib.parse, re
PROJECT='pharaoh-418820'
SITE='glob2-website-pharaoh-418820'
BASE='https://firebasehosting.googleapis.com/v1beta1/'
class NoRedirect(urllib.request.HTTPRedirectHandler):
    def redirect_request(self, *args, **kwargs):
        return None

def access_token():
    token=subprocess.check_output(['gcloud','auth','print-access-token'],text=True,timeout=15).strip()
    if not token: raise ValueError('Missing workload identity token')
    return token

def trusted_url(url, *, upload=False):
    parsed=urllib.parse.urlsplit(url)
    hosts={'firebasehosting.googleapis.com'}
    if upload: hosts.add('upload-firebasehosting.googleapis.com')
    if parsed.scheme!='https' or parsed.hostname not in hosts or parsed.username or parsed.password or parsed.port not in (None,443) or parsed.fragment:
        raise ValueError('Unexpected Firebase URL')
    return url

def open_request(req):
    return urllib.request.build_opener(NoRedirect).open(req,timeout=60)

def request(url, payload=None, method=None):
    token=access_token()
    url=trusted_url(url if url.startswith('https://') else BASE+url)
    req=urllib.request.Request(url, data=None if payload is None else json.dumps(payload).encode(), method=method, headers={'Authorization':'Bearer '+token,'x-goog-user-project':PROJECT,'Content-Type':'application/json'})
    try:
        with open_request(req) as response:return json.load(response)
    except urllib.error.HTTPError as e:raise RuntimeError(f'Firebase {e.code}: {e.read().decode()}') from e

def deploy(channel):
    if not re.fullmatch(r'[a-z0-9-]{1,40}',channel): raise ValueError('Invalid channel')
    config=json.loads(pathlib.Path('firebase.json').read_text())['hosting']
    if config['site']!=SITE:raise ValueError('Unexpected Hosting target')
    serving={k:config[k] for k in ('cleanUrls','redirects')}
    serving['trailingSlashBehavior']='ADD'
    serving['headers']=[{'glob':row['source'],'headers':{h['key']:h['value'] for h in row['headers']}} for row in config['headers']]
    serving['redirects']=[{'glob':r['source'],'location':r['destination'],'statusCode':r['type']} for r in config['redirects']]
    root=pathlib.Path('dist'); assert (root/'index.html').is_file()
    uploads={}; files={}
    for file in sorted(root.rglob('*')):
        if file.is_file() and not any(p.startswith('.') for p in file.relative_to(root).parts):
            data=gzip.compress(file.read_bytes(),mtime=0); digest=hashlib.sha256(data).hexdigest(); uploads[digest]=data; files['/'+file.relative_to(root).as_posix()]=digest
    version=request(f'sites/{SITE}/versions',{'config':serving})['name']
    result=request(f'{version}:populateFiles',{'files':files})
    token=access_token()
    for digest in result.get('uploadRequiredHashes',[]):
        req=urllib.request.Request(trusted_url(result['uploadUrl']+'/'+digest,upload=True),data=uploads[digest],method='POST',headers={'Authorization':'Bearer '+token,'Content-Type':'application/octet-stream'})
        with open_request(req) as r:r.read()
    request(version+'?updateMask=status',{'status':'FINALIZED'},'PATCH')
    if channel!='live':
        try:request(f'sites/{SITE}/channels?channelId={channel}',{'ttl':'604800s'})
        except RuntimeError as e:
            if '409' not in str(e):raise
            request(f'sites/{SITE}/channels/{channel}?updateMask=ttl',{'ttl':'604800s'},'PATCH')
        release=request(f'sites/{SITE}/channels/{channel}/releases?versionName={version}',{})
    else:release=request(f'sites/{SITE}/releases?versionName={version}',{})
    print(json.dumps({'version':version,'release':release.get('name'),'channel':channel},indent=2))
if __name__=='__main__':
    parser=argparse.ArgumentParser();parser.add_argument('--channel',default='review');deploy(parser.parse_args().channel)
