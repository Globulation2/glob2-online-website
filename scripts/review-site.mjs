import {chromium} from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import {mkdir, writeFile} from 'node:fs/promises';

// Build first, then npm run preview -- --host 127.0.0.1 --port 4322.
// SITE_URL=http://127.0.0.1:4322 node scripts/review-site.mjs 1
// Repeat after addressing findings with round 2. All output stays ignored.
// Chromium captures emulate widths, not physical touch/pinch or browser zoom.
const round = process.argv[2] ?? '2';
if (!/^[a-z0-9-]+$/i.test(round)) throw new Error('Use a review name containing letters, numbers or hyphens.');
const baseUrl = process.env.SITE_URL ?? 'http://127.0.0.1:4322';
const out = `artifacts/review-round-${round}`;
await mkdir(out, {recursive:true});
const browser = await chromium.launch({headless:true});
const report = [];
const reflow = [];
const failures = [];
const routes = [
  ['home','/'],['game','/game/'],['downloads','/downloads/'],['community','/community/'],
  ['handbook','/learn/'],['first-colony','/learn/getting-started/'],
  ['fruit','/learn/fruit-and-conversion/'],['buildings','/learn/reference-buildings/'],
  ['news','/news/'],['history','/history/'],['archive','/archive/'],['search','/search/'],
  ['news-article','/news/browser-development/'],['history-article','/history/project-history/'],
  ['archive-article','/archive/legacy-strategy/'],
];
const widths = [['mobile',360],['tablet',768],['compact-desktop',1024],['desktop',1440],['wide-desktop',1920]];
const articleNames = new Set(['first-colony','fruit','buildings','news-article','history-article','archive-article']);
const tags = ['wcag2a','wcag2aa','wcag21aa','wcag22aa'];
async function ready(page, search=false) {
  await page.evaluate(async () => {
    document.querySelectorAll('img[loading="lazy"]').forEach(image => image.loading = 'eager');
    await document.fonts.ready;
    await Promise.all([...document.images].map(image => image.decode().catch(() => {})));
  });
  if(search) await page.locator('#site-search').waitFor({state:'visible'});
}
async function measure(page) {
  return page.evaluate(() => ({
    viewport:innerWidth,scrollWidth:document.documentElement.scrollWidth,
    images:[...document.querySelectorAll('main img')].map(image => ({src:image.getAttribute('src'),width:image.getBoundingClientRect().width,naturalWidth:image.naturalWidth})),
    targets:[...document.querySelectorAll('.nav a,.header-end a')].map(link => ({text:link.textContent.trim(),height:link.getBoundingClientRect().height})),
    rails:[...document.querySelectorAll('.article-rail')].map(rail => {
      const rect=rail.getBoundingClientRect();
      return {className:rail.className,x:rect.x,width:rect.width,height:rect.height,visible:getComputedStyle(rail).display!=='none'};
    }),
  }));
}
async function audit(page) {
  const {violations}=await new AxeBuilder({page}).withTags(tags).analyze();
  return violations.map(issue=>({id:issue.id,impact:issue.impact,nodes:issue.nodes.map(node=>({target:node.target,summary:node.failureSummary}))}));
}
async function record(page, details, file, extra={}) {
  await page.screenshot({path:file,fullPage:!details.state.startsWith('viewer-'),animations:details.state.startsWith('viewer-')?'disabled':'allow'});
  const row={...details,file,...await measure(page),violations:details.state==='no-javascript'?[]:await audit(page),...extra};
  report.push(row);
  if(row.violations.length || row.scrollWidth>row.viewport || row.targets.some(target=>target.height<44) || row.images.some(image=>image.naturalWidth===0)) failures.push(row);
}
try {
  for (const scheme of ['light','dark']) {
    for (const [device,width] of widths) {
      const context=await browser.newContext({viewport:{width,height:900},colorScheme:scheme,reducedMotion:'reduce'});
      const page=await context.newPage();
      for (const [name,route] of routes) {
        await page.goto(new URL(route,baseUrl).href);
        await ready(page,name==='search');
        const prefix=`${out}/${name}-${device}-${scheme}`;
        await record(page,{route,device,scheme,state:'default'},`${prefix}.png`);
        if(articleNames.has(name)||name==='home'||name==='handbook') await page.screenshot({path:`${prefix}-viewport.png`});
        if(name==='search') {
          await page.locator('#site-search').fill('food');
          await page.locator('.pagefind-ui__result').first().waitFor();
          await record(page,{route,device,scheme,state:'search-results'},`${prefix}-results.png`);
        }
        if(['home','game','first-colony','fruit','buildings'].includes(name)) {
          await page.evaluate(()=>{document.documentElement.style.fontSize='200%';});
          const measurements=await measure(page);
          const file=`${prefix}-text-200.png`;
          await page.screenshot({path:file,fullPage:true});
          reflow.push({route,device,scheme,fontSize:'200%',file,...measurements});
          await page.evaluate(()=>{document.documentElement.style.removeProperty('font-size');});
        }
        if(name==='fruit'||name==='first-colony') {
          const kind=name==='fruit'?'image':'video';
          const opener=kind==='image'?page.locator('.guide-image-link[data-media-open]').first():page.locator('.guide-media:has(video) [data-media-open]').first();
          if(await opener.count()) {
            await opener.click();
            await page.locator('.pswp.pswp--open').waitFor({state:'visible'});
            const media=page.locator(kind==='image'?'.pswp__item[aria-hidden="false"] .pswp__img:not(.pswp__img--placeholder)':'.pswp__item[aria-hidden="false"] video');
            await media.waitFor({state:'visible'});
            if(kind==='image') await media.evaluate(image=>image.decode().catch(()=>{}));
            await page.waitForFunction(() => {
              const caption=document.querySelector('.pswp__caption');
              return Boolean(caption?.textContent.trim());
            });
            // Require final opacity and unchanged geometry across three animation
            // frames rather than capturing the library's first opening frame.
            await page.evaluate(()=>{delete window.__reviewMediaGeometry;});
            await page.waitForFunction((kind) => {
              const element=document.querySelector(kind==='image'?'.pswp__item[aria-hidden="false"] .pswp__img:not(.pswp__img--placeholder)':'.pswp__item[aria-hidden="false"] video');
              if(!element)return false;
              const rect=element.getBoundingClientRect();
              let ancestor=element;
              while(ancestor && !ancestor.classList.contains('pswp')) {
                if(Number(getComputedStyle(ancestor).opacity)<.99)return false;
                ancestor=ancestor.parentElement;
              }
              if(rect.width<=0||rect.height<=0)return false;
              const geometry=[rect.x,rect.y,rect.width,rect.height].map(value=>Math.round(value*10)/10).join(',');
              const previous=window.__reviewMediaGeometry;
              const stable=previous?.geometry===geometry?previous.stable+1:0;
              window.__reviewMediaGeometry={geometry,stable};
              return stable>=3;
            },kind,{polling:'raf'});
            const caption=await page.locator('.pswp__caption').innerText();
            await record(page,{route,device,scheme,state:`viewer-${kind}`},`${prefix}-viewer-${kind}.png`,{caption});
            await page.keyboard.press('Escape');
            await page.locator('.pswp.pswp--open').waitFor({state:'hidden'});
          } else failures.push({route,device,scheme,state:`viewer-${kind}`,error:'Expected media opener is missing'});
        }
      }
      await context.close();
    }
    for(const width of [360,1440]) {
      const context=await browser.newContext({viewport:{width,height:900},colorScheme:scheme,javaScriptEnabled:false});
      const page=await context.newPage();
      for(const [name,route] of routes.filter(([name])=>['handbook','fruit','search'].includes(name))) {
        await page.goto(new URL(route,baseUrl).href);
        await ready(page);
        await record(page,{route,device:`width-${width}`,scheme,state:'no-javascript'},`${out}/${name}-${width}-${scheme}-no-javascript.png`);
      }
      await context.close();
    }
  }
} finally {
  await browser.close();
  await writeFile(`${out}/report.json`,JSON.stringify(report,null,2));
  await writeFile(`${out}/reflow.json`,JSON.stringify(reflow,null,2));
  await writeFile(`${out}/review-info.json`,JSON.stringify({round,baseUrl,command:`SITE_URL=${baseUrl} node scripts/review-site.mjs ${round}`,browser:'Chromium',schemes:['light','dark'],widths:widths.map(([,width])=>width),limits:['Physical touch/pinch not tested by this capture helper','200% text sizing is CSS font-size, not browser zoom','Firefox and WebKit covered by separate Playwright suite','Screenshots require human design/content review','No-JavaScript captures check static fallback; axe runs in JavaScript-enabled contexts']},null,2));
}
const reflowFailures=reflow.filter(row=>row.scrollWidth>row.viewport);
console.log(JSON.stringify({round,captures:report.length,failures,reflow:reflow.length,reflowFailures}));
if(failures.length||reflowFailures.length) process.exitCode=1;
