/** Development-only capture of home page gameplay shots from the public browser game.
 * Plays a 128x128 Quick clash match (You + AI Maxima vs Nicowar, Cabino and Maxima) for the given
 * wall-clock minutes, reopens it in the replay viewer with fog of war off and photographs a 3x3 grid
 * of minimap positions after each fast-forward. Pick and crop frames by hand (HUD and event messages excluded).
 * Usage: node scripts/capture-home-shots.mjs artifacts/home-shots [minutes=12] [fast-forward-ms=12000] */
import { chromium } from '@playwright/test';
import { mkdir } from 'node:fs/promises';
const out=process.argv[2]; const W=1600,H=900; const minutes=+(process.argv[3]||12);
if (!out) throw new Error('Usage: node scripts/capture-home-shots.mjs artifacts/home-shots [minutes] [fast-forward-ms]');
await mkdir(out,{recursive:true});
const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: W, height: H } });
try {
await page.goto('https://app.glob2.online/play/?renderer=webgl2', { waitUntil: 'domcontentloaded' });
await page.waitForFunction(() => window.glob2Diagnostics?.snapshot().screen.includes('MainMenuScreen'), null, { timeout: 120000 });
const state=()=>page.evaluate(() => glob2Diagnostics.snapshot());
const dump=async()=>{const s=await state();console.log(s.screen,s.tick,JSON.stringify(Object.fromEntries(Object.entries(s.controls).map(([k,v])=>[k,(v.text??v.label??'')+(v.enabled?'':'(x)')]))));};
const control = async key => {
  await page.waitForFunction(key => {const c=glob2Diagnostics.snapshot().controls[key];return c?.enabled && c.visible?.w > 0;}, key, { timeout: 30000 });
  const c = (await state()).controls[key]; const v = c.visible;
  await page.mouse.click((v.x + v.w / 2) * W / c.surface.w, (v.y + v.h / 2) * H / c.surface.h, { delay: 100 });
  await page.waitForTimeout(700);
};
const pick = async (key, text) => { await control(key); const s=await state(); const k=Object.keys(s.controls).find(k=>k.startsWith('popup/')&&(s.controls[k].text??s.controls[k].label??'').startsWith(text)); if(!k) throw new Error('no option '+text); await control(k); };
await control('menu/3'); await page.waitForTimeout(3000);
await pick('generator/width','128'); await pick('generator/height','128');
await control('tab/2'); await control('ruleset/quick-clash'); await dump();
await control('tab/1');
await pick('colony/0/controller','You + AI'); await pick('colony/0/ai','Maxima');
await pick('colony/1/ai','Nicowar'); await pick('colony/2/ai','Cabino'); await pick('colony/3/ai','Maxima');
await dump();
await control('start');
await page.waitForFunction(()=>glob2Diagnostics.snapshot().tick>5,null,{timeout:180000});
await page.waitForTimeout(minutes*60000);
console.log('live done tick',(await state()).tick);
await page.keyboard.press('Escape'); await page.waitForTimeout(1500);
await control('quit'); await page.waitForTimeout(3000);
for (let n=0;n<4;n++){ const s=await state(); if(s.screen.includes('MainMenu')) break; const k=['quit','back'].find(k=>s.controls[k]); if(!k) break; await control(k); await page.waitForTimeout(2000); }
await control('menu/2'); await page.waitForTimeout(2000);
await control('switch'); await control('files/0'); await control('ok');
await page.waitForFunction(()=>glob2Diagnostics.snapshot().screen.includes('match')||glob2Diagnostics.snapshot().tick>0,null,{timeout:60000});
await page.waitForTimeout(4000);
await page.mouse.click(1472,218); await page.waitForTimeout(800); // Replay panel's Fog of war checkbox at 1600x900.
await page.screenshot({path:out+'/replay-start.png'});
const FF=[1415,886], PLAY=[1383,886]; // Replay bar buttons; minimap spans x 1460-1588, y 10-138.
let last=-1;
for (let round=0; round<30; round++) {
  await page.mouse.click(...FF); await page.waitForTimeout(+(process.argv[4]||12000));
  await page.mouse.click(...PLAY); await page.waitForTimeout(500);
  const tick=(await state()).tick; console.log('round',round,'tick',tick);
  if (tick===last) break; last=tick;
  for (const gy of [31,74,117]) for (const gx of [1481,1524,1567]) {
    await page.mouse.click(gx, gy); await page.waitForTimeout(600);
    await page.screenshot({path:`${out}/r${String(round).padStart(2,'0')}-t${tick}-${gx}-${gy}.png`});
  }
}
} finally { await browser.close(); }
