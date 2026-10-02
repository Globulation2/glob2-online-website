// Updates only reviewed public GitHub release assets; never advertises draft/prerelease builds.
import {readFile,writeFile} from 'node:fs/promises';
const response=await fetch('https://api.github.com/repos/Globulation2/glob2/releases?per_page=20',{headers:{Accept:'application/vnd.github+json',...(process.env.GITHUB_TOKEN?{Authorization:`Bearer ${process.env.GITHUB_TOKEN}`}:{})},signal:AbortSignal.timeout(10000)});
if(!response.ok)throw Error(`Release API failed: ${response.status}`);
const data=await response.json(); if(!Array.isArray(data))throw Error('Invalid releases');
const releases=[];
for(const release of data.filter(r=>!r.draft&&!r.prerelease)) {
 for(const asset of release.assets??[]) {
  const platform=/\.apk$/i.test(asset.name)?'Android':/\.(exe|msi|zip)$/i.test(asset.name)?'Windows':/\.(dmg|pkg)$/i.test(asset.name)?'macOS':/\.(AppImage|deb|rpm)$/i.test(asset.name)?'Linux':null;
  if(!platform||!asset.browser_download_url?.startsWith('https://github.com/Globulation2/glob2/releases/download/'))continue;
  if(releases.some(r=>r.platform===platform))continue;
  releases.push({title:`${platform} download`,version:release.tag_name,url:asset.browser_download_url,platform,status:'published'});
 }
}
const previous=JSON.parse(await readFile('src/data/release-metadata.json','utf8'));
if(JSON.stringify(previous.releases)===JSON.stringify(releases)){console.log('Published downloads are unchanged.');process.exit(0);}
await writeFile('src/data/release-metadata.json',JSON.stringify({schemaVersion:1,checkedAt:new Date().toISOString(),releases},null,2)+'\n');
console.log(`Updated ${releases.length} verified published platform packages.`);
