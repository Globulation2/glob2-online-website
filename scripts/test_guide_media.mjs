import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, writeFile, readFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { createHash } from 'node:crypto';
import { validateManifest, verifyAsset, stageMedia, bucket } from './stage-guide-media.mjs';
const bytes = Buffer.from('a captured teaching image');
const asset = { id:'test-image',path:'/guide-media/v1/test/image.webp',url:`https://storage.googleapis.com/${bucket}/guide-media/v1/test/image.webp`,sha256:createHash('sha256').update(bytes).digest('hex'),bytes:bytes.length,width:1440,height:900,caption:'An inn receiving wheat.',alt:'A worker delivering wheat to an inn.',kind:'image' };
test('manifest rejects untrusted hosts, traversal, duplicate IDs and missing posters',()=>{
 for(const item of [{...asset,url:'https://example.com/image.webp'},{...asset,path:'/guide-media/../image.webp'},{...asset,path:'/guide-media/v1//test/image.webp'},{...asset,sha256:'wrong'},{...asset,alt:''}]) assert.throws(()=>validateManifest({schemaVersion:1,assets:[item]}));
 assert.throws(()=>validateManifest({schemaVersion:1,assets:[asset,asset]}));
 assert.throws(()=>validateManifest({schemaVersion:1,assets:[{...asset,id:'video',kind:'video',path:asset.path.replace('.webp','.mp4'),url:asset.url.replace('.webp','.mp4'),poster:'missing'}]}));
});
test('changed capture bytes are rejected',()=>{assert.throws(()=>verifyAsset(asset,Buffer.from('changed')));verifyAsset(asset,bytes)});
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
