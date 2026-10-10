import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, writeFile, readFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { createHash } from 'node:crypto';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { validateManifest, verifyAsset, stageMedia, bucket } from './stage-guide-media.mjs';
import { fetchReleasedMedia } from './fetch-released-media.mjs';
const bytes = Buffer.from('a captured teaching image');
const asset = { id:'test-image',path:'/guide-media/v1/test/image.webp',url:`https://storage.googleapis.com/${bucket}/guide-media/v1/test/image.webp`,sha256:createHash('sha256').update(bytes).digest('hex'),bytes:bytes.length,width:1440,height:900,caption:'An inn receiving wheat.',alt:'A worker delivering wheat to an inn.',kind:'image' };
const runFile = promisify(execFile);
async function runSmokeFixture(mode) {
 const dir=await mkdtemp(path.join(tmpdir(),'guide-release-'));
 try {
  const fixture=path.join(dir,'fetch.mjs'),manifest=path.join(dir,'manifest.json');
  await writeFile(manifest,JSON.stringify({schemaVersion:1,assets:[asset]}));
  await writeFile(fixture,`
   const counts={};
   process.on('exit',()=>console.log('Requests '+JSON.stringify(counts)));
   globalThis.fetch=async input=>{
    const url=new URL(input),route=url.pathname;counts[route]=(counts[route]??0)+1;
    if(route==='/this-page-does-not-exist/')return new Response('missing',{status:404});
    if(['/j/ABCDEFGH','/matches/00000000-0000-4000-8000-000000000000','/players/00000000-0000-4000-8000-000000000000','/leaderboard','/maps','/api/v1/instance','/play/'].includes(route))return new Response(null,{status:301,headers:{location:'https://app.glob2online.com'+route+url.search}});
    if(route==='/'&&${JSON.stringify(mode)}==='propagation'&&counts[route]===1)return new Response('not ready',{status:404});
    if(route==='/'&&${JSON.stringify(mode)}==='invalid')return new Response('invalid page');
    if(route===${JSON.stringify(asset.path)})return new Response(Buffer.from(${JSON.stringify(bytes.toString('base64'))},'base64'));
    const html=route==='/learn/'?(${JSON.stringify(mode)}==='empty-index'?'<h1>Handbook</h1>':'<h1>Handbook</h1><a href="/learn/example/">Example</a>'):route==='/learn/example/'?'<article><h1>Example</h1>On this page</article>':'<h1>Website</h1>';
    return new Response(html,{headers:{'content-security-policy':"default-src 'self'"}});
   };
  `);
  return await runFile(process.execPath,['--import',fixture,'scripts/smoke.mjs','https://example.test',manifest],{timeout:20000});
 } finally {await rm(dir,{recursive:true,force:true})}
}
test('release CLI recovers a required-page propagation delay and preserves the intentional404 check',async()=>{
 const {stdout}=await runSmokeFixture('propagation');
 assert.match(stdout,/Validated 1 handbook chapters and 1 immutable media assets/);
 const counts=JSON.parse(stdout.match(/Requests (.*)/)[1]);
 assert.equal(counts['/'],2);assert.equal(counts['/learn/'],1);assert.equal(counts['/this-page-does-not-exist/'],1);
});
test('release CLI rejects successful invalid HTML without retrying',async()=>{
 await assert.rejects(runSmokeFixture('invalid'),error=>{
  assert.match(error.stderr,/invalid public page/);
  assert.equal(JSON.parse(error.stdout.match(/Requests (.*)/)[1])['/'],1);return true;
 });
});
test('release CLI rejects an index that would silently skip all chapter checks',async()=>{
 await assert.rejects(runSmokeFixture('empty-index'),error=>{
  assert.match(error.stderr,/Handbook index has no chapters/);return true;
 });
});
test('manifest rejects untrusted hosts, traversal, duplicate IDs and missing posters',()=>{
 for(const item of [{...asset,url:'https://example.com/image.webp'},{...asset,path:'/guide-media/../image.webp'},{...asset,path:'/guide-media/v1//test/image.webp'},{...asset,sha256:'wrong'},{...asset,alt:''}]) assert.throws(()=>validateManifest({schemaVersion:1,assets:[item]}));
 assert.throws(()=>validateManifest({schemaVersion:1,assets:[asset,asset]}));
 assert.throws(()=>validateManifest({schemaVersion:1,assets:[{...asset,id:'video',kind:'video',path:asset.path.replace('.webp','.mp4'),url:asset.url.replace('.webp','.mp4'),poster:'missing'}]}));
});
test('changed capture bytes are rejected',()=>{assert.throws(()=>verifyAsset(asset,Buffer.from('changed')));verifyAsset(asset,bytes)});
test('release smoke tolerates temporary Hosting propagation but verifies recovered bytes',async()=>{
 const statuses=[404,503,200], waits=[];
 const response=await fetchReleasedMedia('https://example.test/image.webp',{
  fetcher:async()=>new Response(bytes,{status:statuses.shift()}),sleep:async ms=>waits.push(ms)
 });
 assert.deepEqual(waits,[2000,5000]);
 verifyAsset(asset,Buffer.from(await response.arrayBuffer()));
});
test('release smoke bounds retries and preserves permanent errors',async()=>{
 let calls=0;const waits=[];
 const missing=await fetchReleasedMedia('https://example.test/image.webp',{
  fetcher:async()=>{calls++;return new Response('missing',{status:404})},sleep:async ms=>waits.push(ms)
 });
 assert.equal(missing.status,404);assert.equal(calls,5);assert.equal(waits.reduce((a,b)=>a+b,0),37000);
 const denied=await fetchReleasedMedia('https://example.test/image.webp',{
  fetcher:async()=>new Response('denied',{status:403}),sleep:async()=>assert.fail('must not retry denied access')
 });
 assert.equal(denied.status,403);
});
test('release smoke does not retry corrupted successful responses',async()=>{
 const response=await fetchReleasedMedia('https://example.test/image.webp',{
  fetcher:async()=>new Response('corrupted'),sleep:async()=>assert.fail('must not retry successful response')
 });
 const downloaded=Buffer.from(await response.arrayBuffer());
 assert.throws(()=>verifyAsset(asset,downloaded),/checksum mismatch/);
});
test('staging verifies downloaded bytes, reuses checked cache, and fails closed on unavailable or corrupt assets',async()=>{
 const dir=await mkdtemp(path.join(tmpdir(),'guide-media-'));
 try {
  const manifestPath=path.join(dir,'manifest.json'), output=path.join(dir,'dist'),cache=path.join(dir,'cache');
  await writeFile(manifestPath,JSON.stringify({schemaVersion:1,assets:[asset]}));
  await stageMedia({manifestPath,output,cache,fetcher:async()=>new Response(bytes)});
  assert.deepEqual(await readFile(path.join(output,asset.path)),bytes);
  await stageMedia({manifestPath,output,cache,fetcher:async()=>{throw Error('must use cache')}});
  await rm(cache,{recursive:true});
  await assert.rejects(stageMedia({manifestPath,output,cache,fetcher:async()=>new Response('missing',{status:404})}),/unavailable/);
  await assert.rejects(stageMedia({manifestPath,output,cache,fetcher:async()=>new Response(Buffer.from('changed'))}),/checksum mismatch/);
 } finally {await rm(dir,{recursive:true,force:true})}
});
