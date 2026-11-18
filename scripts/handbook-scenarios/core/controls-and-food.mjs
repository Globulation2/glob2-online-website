import { openFoodPractice } from './food-practice.mjs';

/** Reproduce controls and a real Inn construction/supply sequence in the lesson. */
export default async function controlsAndFood(api) {
  const { state, note, key, click, control, screenshot, waitTicks, page } = api;
  await openFoodPractice(api);
  // Normal simulation only. A later colony view makes the staffing distinction
  // visible; no literal counter or unit position is written into the game.
  while ((await state()).tick < 2500) {
    await waitTicks(Math.min(600, 2500 - (await state()).tick));
  }
  await key('p');
  await page.waitForFunction(() => glob2Diagnostics.snapshot().paused, null, { timeout: 10000 });
  await screenshot('controls-overview-paused');
  await click(845, 489);
  await screenshot('controls-supplied-inn');
  await control('intro/collapse');

  // These are observed map-view coordinates, not entity/state access. The
  // diagnostic assertion prevents silently substituting a building for a unit
  // if movement or future payload changes require renewed visual review.
  let selected = false;
  for (const [x, y] of [[514, 590], [607, 403], [418, 547], [709, 100], [828, 239], [1111, 268], [688, 681], [893, 608], [589, 749]]) {
    await click(x, y);
    await click(x, y);
    if ((await state()).hud?.selection === 'unit') { selected = true; break; }
  }
  if (!selected) throw Error('Inspect the paused frame and update genuine unit hit coordinates');
  await screenshot('controls-selected-worker');
  await click(1356, 164);
  await screenshot('controls-statistics');
  await control('stats/full-history/population');
  await screenshot('controls-population-history');
  await control('stats/history/close');
  await click(1388, 164);
  await screenshot('controls-map-overlays');

  await click(1291, 164);
  await key('b');
  await key('i');
  await click(796, 338);
  await click(796, 338, { button: 'right' });
  await click(796, 338);
  await screenshot('resources-inn-foundation');
  await key('p');
  await page.waitForFunction(() => !glob2Diagnostics.snapshot().paused, null, { timeout: 10000 });
  await note('construction-motion-start');
  for (let index = 1; index <= 4; index++) {
    await waitTicks(120);
    await screenshot(`resources-construction-${index}`);
  }
  for (let attempt = 0; attempt < 40 && !(await state()).controls['intro/replay']; attempt++) {
    await waitTicks(120);
  }
  if (!(await state()).controls['intro/replay']) throw Error('Food practice did not report completion; inspect actual construction and supply');
  await screenshot('resources-lesson-complete');
  await key('p');
  await screenshot('resources-supplied-inn-paused');
  await note('food-practice-completion-observed');
}
