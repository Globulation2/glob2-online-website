import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
const routes=['/','/game/','/learn/','/community/','/competition/','/news/','/downloads/','/history/','/archive/','/search/','/privacy/','/terms/'];
for(const scheme of ['light','dark'] as const) for(const route of routes) test(`usable and accessible ${route} (${scheme})`,async({page},testInfo)=>{
 // The site starts light; an explicit System choice lets the device scheme drive both themes.
 await page.addInitScript(()=>localStorage.setItem('glob2-theme-v2','system'));
 await page.emulateMedia({colorScheme:scheme});
 await page.goto(route);
 if(route==='/search/') await expect(page.locator('#site-search')).toBeVisible();
 await expect(page.locator('h1')).toHaveCount(1);
 const issues=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa','wcag22aa']).analyze();
 expect(issues.violations.map(v=>({id:v.id,nodes:v.nodes.map(n=>n.target)}))).toEqual([]);
 if(route==='/privacy/'||route==='/terms/') await page.screenshot({path:testInfo.outputPath('legal-page.png')});
});
test('homepage is lightweight and handoff explicit',async({page})=>{
 const requests:string[]=[];page.on('request',r=>requests.push(r.url()));
 await page.goto('/'); await expect(page.getByText(/free, open-source real-time strategy game/i).first()).toBeVisible();
 await expect(page.getByRole('link',{name:'Play in browser',exact:false}).first()).toHaveAttribute('href','https://app.glob2.online/play/');
 await expect(page.getByRole('link',{name:/Sign in for ranked play/})).toHaveAttribute('href','https://app.glob2.online/signin');
 await expect(page.getByRole('navigation',{name:'Globulation 2 Online app'})).toHaveCount(0);
 const header=page.locator('header.site-header');
 await expect(header.getByRole('link',{name:'Sign in',exact:true})).toHaveAttribute('href','https://app.glob2.online/signin');
 await expect(header.getByRole('link',{name:'Get the game',exact:true})).toHaveAttribute('href','/downloads/');
 const online=page.getByRole('navigation',{name:'Play online'});
 await expect(online.getByRole('link',{name:/^Leaderboards/})).toHaveAttribute('href','https://app.glob2.online/leaderboard');
 await expect(online.getByRole('link',{name:/^Matches/})).toHaveAttribute('href','https://app.glob2.online/matches');
 await expect(online.getByRole('link',{name:/^Maps/})).toHaveAttribute('href','https://app.glob2.online/maps');
 expect(requests.some(url=>/\.wasm|\/realtime|\/yog|\/router/.test(url))).toBe(false);
});
test('live data pages hand off to the app',async({page})=>{
 await page.goto('/competition/');
 await expect(page.getByRole('link',{name:/See live leaderboards/})).toHaveAttribute('href','https://app.glob2.online/leaderboard');
 await page.goto('/community/');
 await expect(page.getByRole('link',{name:/Browse maps in the online app/})).toHaveAttribute('href','https://app.glob2.online/maps');
});
test('mobile and zoom reflow',async({page})=>{
 // Test layout independently of the separately covered background-video lifecycle.
 await page.emulateMedia({reducedMotion:'reduce'});
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
 for(const route of ['/','/learn/','/history/','/archive/']){
  await page.goto((process.env.SITE_URL??'http://127.0.0.1:4322')+route);
  await expect(page.locator('h1')).toBeVisible();
  const summary=page.locator('.header-menu > summary');await expect(summary).toBeVisible();
  await summary.focus();await page.keyboard.press('Enter');
  await expect(page.getByRole('navigation',{name:'Main navigation'})).toBeVisible();
 }
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
test('without a saved choice the site starts light on a dark device',async({page})=>{
 await page.emulateMedia({colorScheme:'dark'});await page.goto('/');
 await expect(page.locator('html')).toHaveAttribute('data-theme','light');
 expect(await page.evaluate(()=>getComputedStyle(document.body).backgroundColor)).toBe('rgb(241, 241, 225)');
});
test('the System choice follows the device and keeps the game look',async({page})=>{
 await page.addInitScript(()=>localStorage.setItem('glob2-theme-v2','system'));
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
 await expect(navigation.getByRole('link')).toHaveText(['Download','The game','Learn','Community','Search','Discord ↗']);
 await expect(page.getByRole('heading',{name:'Three decisions you will make'})).toBeVisible();
 await expect(page.locator('.shots-note')).toContainText('released native game, version 0.11.6.1');
 await expect(page.locator('meta[property="og:image"]')).toHaveAttribute('content','https://glob2.online/images/economy-v0.11.6.1-hd.png');
 await expect(page.locator('.decisions > li')).toHaveCount(3);
 await expect(page.locator('.game-window.lead-shot img')).toHaveAttribute('src','/images/economy-v0.11.6.1-hd.webp');
 await expect.poll(()=>page.locator('.game-window.lead-shot img').evaluate((img:HTMLImageElement)=>img.complete&&img.naturalWidth>=1280)).toBe(true);
 await expect(page.getByRole('heading',{name:'News & notes'})).toHaveCount(0);
 await page.getByRole('link',{name:'Read the first-session guide',exact:false}).click();
 await expect(page.locator('article')).toContainText('Tutorial');
 await expect(page.locator('article')).toContainText(/worker|wheat/i);
 await expect(page.locator('article a[href="https://app.glob2.online/play/"]').first()).toBeVisible();
 await page.goto('/game/');
 await expect(page.getByRole('heading',{name:'Three kinds of glob'})).toBeVisible();
 await expect(page.locator('.gameplay-image img')).toHaveAttribute('src','/images/economy-v0.11.6.1-hd.webp');
 await expect(page.locator('main .actions .primary')).toHaveAttribute('href','/downloads/');
 for(const role of ['Workers','Explorers','Warriors']) await expect(page.getByRole('heading',{name:role,exact:true})).toBeVisible();
 await page.goto('/downloads/');
 await expect(page.getByRole('link',{name:'Play in browser',exact:false}).first()).toHaveAttribute('href','https://app.glob2.online/play/');
 await page.locator('.direct-downloads > summary').click();
 await expect(page.getByRole('link',{name:'Check releases',exact:false})).toHaveAttribute('href','https://github.com/Globulation2/glob2/releases');
});

const twitchStatusUrl='https://storage.googleapis.com/glob2-website-public/twitch/v1.json';

test('community links point to the official Discord, YouTube, and Twitch',async({page})=>{
 await page.route(twitchStatusUrl,route=>route.fulfill({json:{schemaVersion:1,retired:false}}));
 await page.goto('/community/');
 const invites=page.locator('a[href^="https://discord.gg/"]');
 expect(await invites.count()).toBeGreaterThan(0);
 for(const invite of await invites.all()) await expect(invite).toHaveAttribute('href','https://discord.gg/rQn3Br6AFA');
 const youtube='https://www.youtube.com/@Globulation2Online';
 await expect(page.getByRole('main').getByRole('link',{name:'YouTube · Globulation 2 Online'})).toHaveAttribute('href',youtube);
 await expect(page.locator('.header-github + .header-youtube')).toHaveAttribute('href',youtube);
 const twitch='https://www.twitch.tv/globulation2';
 const headerTwitch=page.locator('.header-youtube + .header-twitch').and(page.getByRole('link',{name:'Twitch · Globulation 2 Online'}));
 const communityTwitch=page.getByRole('main').getByRole('link',{name:'Twitch · Claude Plays Glob'});
 if((await page.locator('html').getAttribute('data-twitch-retired'))===null){
  await expect(headerTwitch).toHaveAttribute('href',twitch);
  await expect(headerTwitch.locator('svg')).toBeVisible();
  await expect(communityTwitch).toHaveAttribute('href',twitch);
 }else{
  await expect(page.locator(`a[href="${twitch}"]`)).toHaveCount(0);
 }
});

test('a retired Twitch feed removes both links from an older build',async({page})=>{
 let respond!:()=>void;
 const retiredResponse=new Promise<void>(resolve=>{respond=resolve;});
 await page.route(twitchStatusUrl,async route=>{
  await retiredResponse;
  await route.fulfill({json:{schemaVersion:1,retired:true}});
 });
 await page.goto('/community/');
 const links=page.locator('a[href="https://www.twitch.tv/globulation2"]');
 try{
  const retired=(await page.locator('html').getAttribute('data-twitch-retired'))!==null;
  await expect(links).toHaveCount(retired?0:2);
 }finally{
  respond();
 }
 await expect(links).toHaveCount(0);
 await expect(page.getByRole('main').getByRole('link',{name:'YouTube · Globulation 2 Online'})).toBeVisible();
});
for(const width of [320,360,768,980,1024,1280,1470,1920]) test(`header shares a masthead surface and keeps its mobile entry compact at ${width}`,async({page})=>{
 await page.setViewportSize({width,height:900});await page.goto('/search/');
 await page.evaluate(()=>document.fonts.ready);
 const geometry=await page.locator('.site-header').evaluate(header=>{
  const box=(selector:string)=>{const r=header.querySelector(selector)!.getBoundingClientRect();return {x:r.x,y:r.y,right:r.right,bottom:r.bottom,height:r.height};};
  return {frame:box('.wrap'),brand:box('.brand'),cta:box('.header-play'),menu:box('.header-menu'),nav:box('.nav'),utilities:box('.header-end')};
 });
 const {frame,brand,cta,menu,nav,utilities}=geometry;
 expect(Math.abs((brand.y+brand.bottom)/2-(cta.y+cta.bottom)/2)).toBeLessThan(2);
 expect(cta.x).toBeGreaterThanOrEqual(brand.right);
 if(width<760){
  expect(menu.y).toBeGreaterThanOrEqual(Math.max(brand.bottom,cta.bottom));
  expect(frame.height).toBeLessThan(150);
  await expect(page.locator('.header-menu')).not.toHaveAttribute('open','');
  await expect(page.locator('.site-header .nav')).toBeHidden();
  await page.locator('.header-menu>summary').click();
  await expect(page.locator('.site-header .nav')).toBeVisible();
 }else{
  await expect(page.locator('.site-header .nav')).toBeVisible();
  expect(Math.min(nav.x,utilities.x)).toBeGreaterThanOrEqual(frame.x);
  expect(Math.max(nav.right,utilities.right)).toBeLessThanOrEqual(frame.right);
  if(width>=1400){expect(Math.abs(nav.y-brand.y)).toBeLessThan(4);expect(Math.abs(utilities.y-brand.y)).toBeLessThan(4);}
 }
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
});

test('header keyboard order follows the visible brand, action, navigation and settings',async({page,browserName})=>{
 await page.route(twitchStatusUrl,route=>route.fulfill({json:{schemaVersion:1,retired:false}}));
 await page.setViewportSize({width:1470,height:900});await page.goto('/search/');
 const forward=browserName==='webkit'&&process.platform==='darwin'?'Alt+Tab':'Tab';
 const order=['.skip-link','.site-header .brand','.header-play',...Array.from({length:6},(_,i)=>`.site-header .nav a:nth-child(${i+1})`),'.language-picker summary','.theme-toggle','.header-github','.header-youtube'];
 if(await page.locator('.header-twitch').count()) order.push('.header-twitch');
 order.push('.header-signin');
 for(const selector of order){await page.keyboard.press(forward);await expect(page.locator(selector)).toBeFocused();}
 await page.setViewportSize({width:360,height:900});await page.goto('/search/');
 for(const selector of ['.skip-link','.site-header .brand','.header-play','.header-menu>summary']){await page.keyboard.press(forward);await expect(page.locator(selector)).toBeFocused();}
 await page.keyboard.press('Enter');await page.keyboard.press(forward);await expect(page.locator('.site-header .nav a:first-child')).toBeFocused();
 // Begin closed so the wide-state assertion proves a breakpoint transition,
 // rather than accepting the already-open mobile disclosure before WebKit paints.
 await page.locator('.header-menu>summary').focus();await page.keyboard.press('Enter');
 await expect(page.locator('.header-menu')).not.toHaveAttribute('open','');
 await page.setViewportSize({width:760,height:900});await expect(page.locator('.header-menu')).toHaveAttribute('open','');
 await page.locator('.site-header .nav a:first-child').focus();
 await page.setViewportSize({width:759,height:900});await expect(page.locator('.header-menu')).not.toHaveAttribute('open','');
 await expect(page.locator('.header-menu>summary')).toBeFocused();
 await page.setViewportSize({width:760,height:900});await expect(page.locator('.header-menu')).toHaveAttribute('open','');
 await expect(page.locator('.site-header .nav a:first-child')).toBeFocused();
 await page.locator('.header-play').focus();
 await page.setViewportSize({width:759,height:900});await expect(page.locator('.header-play')).toBeFocused();
 await page.locator('.header-menu>summary').focus();await page.locator('main h1').click();
 await page.setViewportSize({width:760,height:900});await expect(page.locator('.site-header .nav a:first-child')).not.toBeFocused();
});

test('header native disclosure preserves navigation without JavaScript',async({browser,baseURL})=>{
 const context=await browser.newContext({javaScriptEnabled:false});const page=await context.newPage();
 for(const width of [360,1470]){
  await page.setViewportSize({width,height:900});await page.goto(baseURL!+'/');
  await expect(page.locator('.header-play')).toBeVisible();await expect(page.locator('.site-header .nav')).toBeHidden();
  const summary=page.locator('.header-menu>summary');await expect(summary).toBeVisible();
  await summary.focus();await page.keyboard.press('Enter');await expect(page.locator('.site-header .nav a').first()).toBeVisible();await expect(summary).toBeFocused();
  const header=await page.locator('.site-header').boundingBox(),logo=await page.locator('.hero-logo').boundingBox();
  expect(logo!.y).toBeGreaterThanOrEqual(header!.y+header!.height);
  await page.keyboard.press('Enter');await expect(page.locator('.site-header .nav')).toBeHidden();await expect(summary).toBeFocused();
 }
 await context.close();
});

test('localized header keeps its action and language choices reachable at narrow and wide sizes',async({page})=>{
 for(const locale of ['de','ar'])for(const width of [320,1470]){
  await page.setViewportSize({width,height:900});await page.goto(`/${locale}/`);
  const boxes=await page.locator('.site-header').evaluate(header=>['.brand','.header-play'].map(selector=>{const r=header.querySelector(selector)!.getBoundingClientRect();return {left:r.left,right:r.right,top:r.top,bottom:r.bottom};}));
  expect(boxes[0].right<=boxes[1].left||boxes[1].right<=boxes[0].left).toBe(true);
  expect(Math.abs(boxes[0].top-boxes[1].top)).toBeLessThan(8);
  if(width<760)await page.locator('.header-menu>summary').click();
  await page.locator('.language-picker>summary').click();
  const panel=await page.locator('.language-options').boundingBox();
  expect(panel!.x).toBeGreaterThanOrEqual(0);expect(panel!.x+panel!.width).toBeLessThanOrEqual(width);
  expect(await page.locator('.site-header').evaluate(header=>[...header.querySelectorAll('a,button,summary')].filter(el=>el.getClientRects().length&&!el.closest('.language-options')).every(el=>el.getBoundingClientRect().height>=44))).toBe(true);
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
 }
});

test('the two-row home masthead stays above the hero instead of covering its logo',async({page})=>{
 for(const width of [740,760,1024,1280]){
  await page.setViewportSize({width,height:900});await page.goto('/');
  if(width<760)await page.locator('.header-menu>summary').click();
  const header=await page.locator('.site-header').boundingBox(),logo=await page.locator('.hero-logo').boundingBox();
  expect(logo!.y).toBeGreaterThanOrEqual(header!.y+header!.height);
  await expect(page.locator('.hero-logo')).toBeVisible();
 }
});
