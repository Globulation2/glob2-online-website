import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile,writeFile,mkdtemp,rm} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {createHash} from 'node:crypto';
import {syncExperimentalRelease} from './sync-experimental-release.mjs';
import {experimentalReleaseSchema} from '../src/data/downloads-schema.ts';
const metadata=JSON.parse(await readFile('src/data/experimental-release.json','utf8'));
function fixture({draft=false,prerelease=true,corrupt=false,source=metadata.sourceCommit}={}) {
 const inventory={schemaVersion:1,sourceCommit:metadata.sourceCommit,packages:metadata.packages.map(({filename,platform,architecture,format,minimumOs,dependencies})=>({filename,platform,architecture,format,minimumOs,...(dependencies?{dependencies}:{})})),sources:metadata.sources.map(({filename})=>({filename}))};
 const body=JSON.stringify(inventory);
 const assets=[...metadata.packages,...metadata.sources].map(f=>({name:f.filename,size:f.sizeBytes,digest:'sha256:'+f.sha256,state:'uploaded',browser_download_url:f.url}));
 assets.push({name:'package-inventory.json',size:Buffer.byteLength(body),digest:'sha256:'+createHash('sha256').update(body).digest('hex'),state:'uploaded',browser_download_url:'https://github.com/Globulation2/glob2/releases/download/'+metadata.tag+'/package-inventory.json'});
 return async url=>url.includes('/git/ref/tags/')?Response.json({object:{type:'commit',sha:source}}):url.endsWith('/package-inventory.json')?new Response(corrupt?body+' ':body):Response.json({draft,prerelease,tag_name:metadata.tag,html_url:metadata.releaseNotesUrl,assets});
}
test('public experimental import is idempotent and failures preserve selected downloads',async()=>{
 const directory=await mkdtemp(join(tmpdir(),'glob2-experimental-')); const filename=join(directory,'release.json');
 try {
  assert.equal(await syncExperimentalRelease(metadata.tag,{filename,fetcher:fixture()}),true);
  const original=await readFile(filename,'utf8');
  assert.equal(await syncExperimentalRelease(metadata.tag,{filename,fetcher:fixture()}),false);
  for(const options of [{draft:true},{prerelease:false},{corrupt:true},{source:'a'.repeat(40)}]) {
   await assert.rejects(syncExperimentalRelease(metadata.tag,{filename,fetcher:fixture(options)}));
   assert.equal(await readFile(filename,'utf8'),original);
  }
 } finally {await rm(directory,{recursive:true,force:true});}
});
test('experimental schema permits a selected platform but rejects unsafe asset identities',()=>{
 const selected={...metadata,packages:[metadata.packages[0]]};
 assert.equal(experimentalReleaseSchema.parse(selected).packages.length,1);
 for(const mutate of [m=>m.packages[0].url='https://example.com/build.exe',m=>m.tag='v99.0',m=>m.packages.push(m.packages[0]),m=>m.sources[0].filename='../source.tar.gz']) {
  const changed=structuredClone(selected); mutate(changed); assert.equal(experimentalReleaseSchema.safeParse(changed).success,false);
 }
});
