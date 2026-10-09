import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
const routes=['/','/game/','/learn/','/community/','/competition/','/news/','/downloads/','/history/','/archive/','/search/'];
for(const scheme of ['light','dark'] as const) for(const route of routes) test(`usable and accessible ${route} (${scheme})`,async({page})=>{
 await page.emulateMedia({colorScheme:scheme});
 await page.goto(route);
 if(route==='/search/') await expect(page.locator('#site-search')).toBeVisible();
 await expect(page.locator('h1')).toHaveCount(1);
 const issues=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa','wcag22aa']).analyze();
 expect(issues.violations.map(v=>({id:v.id,nodes:v.nodes.map(n=>n.target)}))).toEqual([]);
});
test('homepage is lightweight and handoff explicit',async({page})=>{
 const requests:string[]=[];page.on('request',r=>requests.push(r.url()));
 await page.goto('/'); await expect(page.getByText(/free, open-source real-time strategy game/i).first()).toBeVisible();
 await expect(page.getByRole('link',{name:'Play in browser',exact:false}).first()).toHaveAttribute('href','https://app.glob2online.com/play/');
 await expect(page.getByRole('link',{name:/Sign in for ranked play/})).toHaveAttribute('href','https://app.glob2online.com/signin');
 await expect(page.getByRole('navigation',{name:'Globulation 2 Online app'})).toHaveCount(0);
 const header=page.locator('header.site-header');
 await expect(header.getByRole('link',{name:'Sign in',exact:true})).toHaveAttribute('href','https://app.glob2online.com/signin');
 await expect(header.getByRole('link',{name:/^Play/})).toHaveAttribute('href','https://app.glob2online.com/play/');
 const online=page.getByRole('navigation',{name:'Play online'});
 await expect(online.getByRole('link',{name:/^Leaderboards/})).toHaveAttribute('href','https://app.glob2online.com/leaderboard');
 await expect(online.getByRole('link',{name:/^Matches/})).toHaveAttribute('href','https://app.glob2online.com/matches');
 await expect(online.getByRole('link',{name:/^Maps/})).toHaveAttribute('href','https://app.glob2online.com/maps');
 expect(requests.some(url=>/\.wasm|\/realtime|\/yog|\/router/.test(url))).toBe(false);
});
test('live data pages hand off to the app',async({page})=>{
 await page.goto('/competition/');
 await expect(page.getByRole('link',{name:/See live leaderboards/})).toHaveAttribute('href','https://app.glob2online.com/leaderboard');
 await page.goto('/community/');
 await expect(page.getByRole('link',{name:/Browse maps in the online app/})).toHaveAttribute('href','https://app.glob2online.com/maps');
});
test('mobile and zoom reflow',async({page})=>{
 for(const width of [360,768,1440]){
  await page.setViewportSize({width,height:900});await page.goto('/',{waitUntil:'domcontentloaded'});await page.evaluate(()=>document.fonts.ready);
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
  await expect(page.getByRole('link',{name:'Play in browser',exact:false}).first()).toBeVisible();
 }
 await page.setViewportSize({width:720,height:900});await page.goto('/learn/',{waitUntil:'domcontentloaded'});await page.evaluate(()=>document.fonts.ready);await page.evaluate(()=>document.documentElement.style.fontSize='200%');
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
 await expect(page.locator('#search')).toContainText('Player handbook');
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
test('dark mode follows the system and keeps the game look',async({page})=>{
 await page.emulateMedia({colorScheme:'dark'});await page.goto('/');
 const bg=await page.evaluate(()=>getComputedStyle(document.body).backgroundColor);
 expect(bg).toBe('rgb(27, 18, 41)');
 const font=await page.evaluate(()=>getComputedStyle(document.querySelector('h1')!).fontFamily);
 expect(font).toContain('Glob2 Sans');
 await page.emulateMedia({colorScheme:'light'});
 expect(await page.evaluate(()=>getComputedStyle(document.body).backgroundColor)).toBe('rgb(241, 241, 225)');
});
test('search box has a visible label',async({page})=>{
 await page.goto('/search/');
 await expect(page.getByLabel('Search guides, news and the archive')).toBeVisible();
});
test('phone navigation targets are thumb-sized',async({page})=>{
 await page.setViewportSize({width:390,height:844});await page.goto('/');
 for(const link of [...await page.getByRole('navigation',{name:'Main navigation'}).getByRole('link').all(),...await page.locator('.header-end a').all()]){
  const box=await link.boundingBox();expect(box!.height).toBeGreaterThanOrEqual(44);
 }
});

test('new player can understand the game and reach a practical first session',async({page})=>{
 await page.goto('/');
 const navigation=page.getByRole('navigation',{name:'Main navigation'});
 await expect(navigation.getByRole('link')).toHaveText(['The game','Learn','Community','Search']);
 await expect(page.getByRole('heading',{name:'Three decisions you will make'})).toBeVisible();
 await expect(page.locator('.mechanics-list > li')).toHaveCount(3);
 await expect(page.locator('.gameplay-image img')).toHaveAttribute('src','/images/glob2-first-colony.webp');
 await expect.poll(()=>page.locator('.gameplay-image img').evaluate((img:HTMLImageElement)=>img.complete&&img.naturalWidth>=1280)).toBe(true);
 await expect(page.getByRole('heading',{name:'News & notes'})).toHaveCount(0);
 await page.getByRole('link',{name:'Read the first-session guide',exact:false}).click();
 await expect(page.locator('article')).toContainText('Tutorial');
 await expect(page.locator('article')).toContainText(/worker|wheat/i);
 await expect(page.locator('article a[href="https://app.glob2online.com/play/"]').first()).toBeVisible();
 await page.goto('/game/');
 await expect(page.getByRole('heading',{name:'Three kinds of glob'})).toBeVisible();
 for(const role of ['Workers','Explorers','Warriors']) await expect(page.getByRole('heading',{name:role,exact:true})).toBeVisible();
 await page.goto('/downloads/');
 await expect(page.getByRole('link',{name:'Play in browser',exact:false}).first()).toHaveAttribute('href','https://app.glob2online.com/play/');
 await expect(page.getByRole('link',{name:'Check releases',exact:false})).toHaveAttribute('href','https://github.com/Globulation2/glob2/releases');
});
