import { openFoodPractice } from './food-practice.mjs';

/** Observe birth weights and real births in the prepared Food supply colony. */
export default async function populationPractice(api) {
  const { key, click, state, screenshot, waitTicks, page, note } = api;
  await openFoodPractice(api);
  await key('p');
  await page.waitForFunction(() => glob2Diagnostics.snapshot().paused);
  await click(655, 514);
  if ((await state()).hud?.selection !== 'building') throw Error('Inspect the actual Swarm selection');
  await screenshot('population-swarm-initial');

  const clampWeights = async () => {
    // Genuine repeated decrement controls reach their UI minimum; the bar's
    // tiny fill is never interpreted as an exact numerical weight.
    for (const y of [402, 422, 442]) {
      for (let count = 0; count < 20; count++) await click(1288, y);
    }
  };
  const advance = async (ticks) => {
    await key('p');
    await page.waitForFunction(() => !glob2Diagnostics.snapshot().paused);
    for (let remaining = ticks; remaining > 0; remaining -= Math.min(120, remaining)) {
      await waitTicks(Math.min(120, remaining));
    }
    await key('p');
    await page.waitForFunction(() => glob2Diagnostics.snapshot().paused);
  };

  await clampWeights();
  // Keep genuine haulers available to supply the Swarm throughout this role
  // experiment. Food and attached/requested workers must be read from frames.
  await click(1390, 300);
  await click(1390, 300);
  await screenshot('population-zero-weights-before-settling');
  await advance(400);
  await screenshot('population-zero-weights-settled');
  await note('pending-birth-caveat', { explanation: 'A previously pending birth may finish after weights reach zero; compare settled observations, food and role totals.' });

  await click(1390, 402);
  await screenshot('population-worker-only-start');
  await advance(300);
  await screenshot('population-worker-only-result');
  await clampWeights();
  await screenshot('population-zero-hold-start');
  await advance(600);
  await screenshot('population-zero-hold-result');

  await click(1390, 422);
  await screenshot('population-explorer-only-start');
  await advance(300);
  await screenshot('population-explorer-only-result');
  await clampWeights();
  await screenshot('population-final-zero-start');
  await advance(600);
  await screenshot('population-final-zero-result');
  // With all birth weights clamped, stop Swarm hauling before the Inn
  // interruption so the competing production request is explicitly recorded.
  for (let count = 0; count < 20; count++) await click(1288, 300);
  await screenshot('food-swarm-growth-and-hauling-off');
  await click(845, 489);
  await screenshot('food-inn-before-interruption');
  for (let count = 0; count < 20; count++) await click(1288, 300);
  await screenshot('food-inn-hauling-zero');
  await advance(600);
  await screenshot('food-inn-interruption-result');
  await click(1390, 300);
  await click(1390, 300);
  await click(1365, 342);
  await screenshot('food-inn-hauling-restored');
  await advance(600);
  await screenshot('food-inn-recovery-one');
  await advance(600);
  await screenshot('food-inn-recovery-two');
  await note('population-observations-require-review', { explanation: 'No literal birth count, exact ratio or food sufficiency asserted automatically; inspect actual role totals, stored Food and Working on each source frame before teaching the outcome.' });
}
