import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
const routes=['/','/game/','/learn/','/community/','/competition/','/news/','/downloads/','/history/','/archive/','/search/'];
for(const route of routes) test(`usable and accessible ${route}`,async({page})=>{
 await page.goto(route);
 await expect(page.locator('h1')).toHaveCount(1);
 const issues=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa','wcag22aa']).analyze();
 expect(issues.violations.map(v=>({id:v.id,nodes:v.nodes.map(n=>n.target)}))).toEqual([]);
});
test('homepage is lightweight and handoff explicit',async({page})=>{
 const requests:string[]=[];page.on('request',r=>requests.push(r.url()));
 await page.goto('/'); await expect(page.getByText(/free, open-source real-time strategy game/i).first()).toBeVisible();
 await expect(page.getByRole('link',{name:'Play in browser',exact:false}).first()).toHaveAttribute('href','https://app.glob2online.com/play/');
 await expect(page.getByRole('link',{name:/Multiplayer login/})).toHaveAttribute('href','https://app.glob2online.com/signin');
 expect(requests.some(url=>/\.wasm|\/realtime|\/yog|\/router/.test(url))).toBe(false);
});
test('mobile and zoom reflow',async({page})=>{
 for(const width of [360,768,1440]){
  await page.setViewportSize({width,height:900});await page.goto('/');
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
  await expect(page.getByRole('link',{name:'Play in browser',exact:false}).first()).toBeVisible();
 }
 await page.setViewportSize({width:720,height:900});await page.goto('/learn/');await page.evaluate(()=>document.documentElement.style.fontSize='200%');
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
});
test('keyboard skip link and reduced motion',async({page})=>{
 await page.emulateMedia({reducedMotion:'reduce'});await page.goto('/');await page.keyboard.press('Tab');await expect(page.getByRole('link',{name:'Skip to content'})).toBeFocused();
 await page.keyboard.press('Enter');expect(await page.evaluate(()=>location.hash)).toBe('#main');
});
test('guides history and events are honest',async({page})=>{
 await page.goto('/learn/'); await page.locator('a[href="/learn/getting-started/"]').first().click();
 await expect(page.locator('article')).toBeVisible();
 await page.goto('/competition/');await expect(page.getByText(/No .*tournament|No .*event|No tournament/i).first()).toBeVisible();
 await page.goto('/archive/');await expect(page.locator('main')).toContainText(/original|histor/i);
});
test('static search can find current and historical content',async({page})=>{
 await page.goto('/search/');const input=page.locator('#search input[type="text"]');await input.fill('food');await expect(page.locator('.pagefind-ui__result').first()).toBeVisible();
 await expect(page.locator('#search')).toContainText('Current guides');
});
test('content remains browsable without JavaScript',async({browser})=>{
 const context=await browser.newContext({javaScriptEnabled:false});const page=await context.newPage();
 for(const route of ['/','/learn/','/history/','/archive/']){await page.goto((process.env.SITE_URL??'http://127.0.0.1:4322')+route);await expect(page.locator('h1')).toBeVisible();await expect(page.getByRole('navigation',{name:'Main navigation'})).toBeVisible();}
 await context.close();
});
const base={schemaVersion:1,generatedAt:new Date().toISOString(),backendRevision:'6dbb6bfb',ratingPolicy:'openskill-plackett-luce-v1',ladder:'ranked-1v1',hasMore:false};
for(const scenario of ['fresh','stale','empty','invalid','unavailable','unsafe'] as const)test(`rankings ${scenario}`,async({page})=>{
 await page.route('https://storage.googleapis.com/**',async route=>{
  if(scenario==='unavailable')return route.fulfill({status:503,body:'unavailable'});
  const username=scenario==='unsafe'?'<img src=x onerror=alert(1)>':'Player';
  const feed={...base,generatedAt:scenario==='stale'?new Date(Date.now()-20*60*1000).toISOString():new Date().toISOString(),entries:scenario==='empty'?[]:[{rank:1,username,rating:1500,games:10,provisional:true}]};
  if(scenario==='invalid')(feed as any).schemaVersion=99;
  return route.fulfill({json:feed});
 });
 await page.goto('/competition/');
 if(scenario==='unavailable'||scenario==='invalid')await expect(page.locator('.ranking-status')).toContainText('temporarily unavailable');
 else if(scenario==='empty')await expect(page.locator('.ranking-status')).toContainText('No public player');
 else {await expect(page.locator('.ranking-table')).toBeVisible();await expect(page.locator('tbody')).toContainText(scenario==='unsafe'?'<img src=x onerror=alert(1)>':'Player');expect(await page.locator('tbody img').count()).toBe(0);if(scenario==='stale')await expect(page.locator('.ranking-status')).toContainText('15 minutes');}
});
