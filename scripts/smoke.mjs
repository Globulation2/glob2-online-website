import {readFile} from 'node:fs/promises';
import {validateManifest, verifyAsset} from './stage-guide-media.mjs';
import {fetchReleasedMedia} from './fetch-released-media.mjs';
const base=process.argv[2];if(!base?.startsWith('https://'))throw Error('HTTPS website URL required');
for(const route of ['/','/game/','/learn/','/community/','/competition/','/events/','/news/','/downloads/','/history/','/archive/','/search/']) {
 const response=await fetch(new URL(route,base),{signal:AbortSignal.timeout(15000)});
 if(!response.ok)throw Error(`${route}: ${response.status}`);const html=await response.text();
 if(!html.includes('<h1')||/\.wasm["']|new WebSocket\(/.test(html))throw Error(`${route}: invalid public page`);
 if(!response.headers.get('content-security-policy'))throw Error(`${route}: missing CSP`);
}
const missing=await fetch(new URL('/this-page-does-not-exist/',base));if(missing.status!==404)throw Error('Missing routes must return404');
// The apex used to be the multiplayer app; its old paths must reach the app host.
const app='https://app.glob2online.com';
for(const [route,codes] of [['/j/ABCDEFGH',[301]],['/matches/00000000-0000-4000-8000-000000000000',[301]],['/players/00000000-0000-4000-8000-000000000000',[301]],['/leaderboard',[301]],['/maps',[301]],['/api/v1/instance',[301]],['/play/?join=ABCDEFGH',[301,302]]]) {
 const response=await fetch(new URL(route,base),{redirect:'manual',signal:AbortSignal.timeout(15000)});
 const location=response.headers.get('location');
 if(!codes.includes(response.status)||location!==app+route)throw Error(`${route}: ${response.status} -> ${location}, expected ${app+route}`);
}
console.log('Old app paths redirect to the app host.');
console.log('Static routes, security headers and404 validated.');

// Check the actual immutable release: chapter routes and every approved media byte.
const handbook=await (await fetch(new URL('/learn/',base))).text();
const chapters=[...new Set([...handbook.matchAll(/href="(\/learn\/[a-z0-9-]+\/)"/g)].map(match=>match[1]))];
for(const route of chapters) {
 const response=await fetch(new URL(route,base),{signal:AbortSignal.timeout(15000)});
 const html=await response.text();
 if(!response.ok||!html.includes('<article')||html.includes('[[media:')||!html.includes('On this page'))throw Error(`${route}: invalid handbook chapter`);
}
const assets=validateManifest(JSON.parse(await readFile(process.argv[3]??'src/data/guide-media.json','utf8')));
for(let offset=0;offset<assets.length;offset+=4)await Promise.all(assets.slice(offset,offset+4).map(async asset=>{
 const response=await fetchReleasedMedia(new URL(asset.path,base));
 if(!response.ok)throw Error(`${asset.id}: missing deployed media (${response.status})`);
 const chunks=[];let length=0;
 for await(const chunk of response.body){length+=chunk.length;if(length>asset.bytes)throw Error(`${asset.id}: oversized deployed media`);chunks.push(chunk);}
 verifyAsset(asset,Buffer.concat(chunks));
}));
console.log(`Validated ${chapters.length} handbook chapters and ${assets.length} immutable media assets.`);
