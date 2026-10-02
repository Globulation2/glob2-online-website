import { readFile, readdir, stat } from 'node:fs/promises';
import path from 'node:path';
const root = path.resolve('dist');
const errors = [];
async function walk(dir) { return (await Promise.all((await readdir(dir,{withFileTypes:true})).map(async d=>d.isDirectory()?walk(path.join(dir,d.name)):[path.join(dir,d.name)]))).flat(); }
const files=await walk(root);
for(const file of files.filter(f=>f.endsWith('.html'))) {
 const html=await readFile(file,'utf8');
 for(const m of html.matchAll(/(?:href|src)=["']([^"']+)["']/g)) {
  const href=m[1]; if(/^(https?:|mailto:|data:|tel:|#)/.test(href))continue;
  const pathname=decodeURIComponent(href.split(/[?#]/)[0]); if(!pathname)continue;
  const target=pathname.startsWith('/')?path.join(root,pathname):path.resolve(path.dirname(file),pathname);
  if(!target.startsWith(root+path.sep)&&target!==root){errors.push(`${file}: unsafe path ${href}`);continue;}
  const candidates=[target,path.join(target,'index.html'),target+'.html'];
  if(!(await Promise.all(candidates.map(p=>stat(p).then(s=>s.isFile()).catch(()=>false)))).some(Boolean))errors.push(`${path.relative(root,file)}: missing ${href}`);
 }
}
if(errors.length){console.error(errors.join('\n'));process.exit(1);}console.log(`Validated internal links and media in ${files.filter(f=>f.endsWith('.html')).length} pages.`);
