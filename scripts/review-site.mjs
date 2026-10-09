import {chromium} from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import {mkdir, writeFile} from 'node:fs/promises';

// Run against a built-site preview; all captures and reports remain ignored.
const round = process.argv[2] ?? '2';
if (!/^[a-z0-9-]+$/i.test(round)) throw new Error('Use a review name containing letters, numbers or hyphens.');
const baseUrl = process.env.SITE_URL ?? 'http://127.0.0.1:4322';
const out = `artifacts/review-round-${round}`;
await mkdir(out, {recursive:true});
const browser = await chromium.launch({headless:true});
const report = [];
const reflow = [];
for (const scheme of ['light','dark']) {
  for (const [device,width] of [['desktop',1440],['tablet',768],['mobile',360]]) {
    const context = await browser.newContext({viewport:{width,height:900},colorScheme:scheme,reducedMotion:'reduce'});
    const page = await context.newPage();
    for (const [name,route] of [['home','/'],['game','/game/'],['guide','/learn/getting-started/'],['downloads','/downloads/'],['community','/community/']]) {
      await page.goto(new URL(route, baseUrl).href);
      await page.evaluate(async () => {
        document.querySelectorAll('img[loading="lazy"]').forEach(image => image.loading = 'eager');
        await document.fonts.ready;
        await Promise.all([...document.images].map(image => image.decode().catch(() => {})));
      });
      const file = `${out}/${name}-${device}-${scheme}.png`;
      await page.screenshot({path:file,fullPage:true});
      if (name === 'home') await page.screenshot({path:`${out}/home-${device}-${scheme}-viewport.png`});
      const measurements = await page.evaluate(() => ({
        viewport:innerWidth,scrollWidth:document.documentElement.scrollWidth,
        images:[...document.querySelectorAll('main img')].map(image => ({src:image.getAttribute('src'),width:image.getBoundingClientRect().width,naturalWidth:image.naturalWidth})),
        targets:[...document.querySelectorAll('.nav a,.header-end a')].map(link => ({text:link.textContent.trim(),height:link.getBoundingClientRect().height}))
      }));
      const {violations} = await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa','wcag22aa']).analyze();
      report.push({route,device,scheme,file,...measurements,violations:violations.map(issue=>({id:issue.id,nodes:issue.nodes.map(node=>node.target)}))});
      if (['home','game','guide'].includes(name)) {
        const zoom = await page.evaluate(() => {
          document.documentElement.style.fontSize = '200%';
          return {viewport:innerWidth,scrollWidth:document.documentElement.scrollWidth};
        });
        reflow.push({route,device,scheme,fontSize:'200%',...zoom});
      }
    }
    await context.close();
  }
}
await browser.close();
await writeFile(`${out}/report.json`,JSON.stringify(report,null,2));
await writeFile(`${out}/reflow.json`,JSON.stringify(reflow,null,2));
const failures = report.filter(row => row.violations.length || row.scrollWidth > row.viewport || row.targets.some(target => target.height < 44) || row.images.some(image => image.naturalWidth === 0));
const reflowFailures = reflow.filter(row => row.scrollWidth > row.viewport);
console.log(JSON.stringify({round,captures:report.length,failures,reflow:reflow.length,reflowFailures}));
if (failures.length || reflowFailures.length) process.exitCode = 1;
