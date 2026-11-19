/** Real prepared Guard zones and flag tactics lesson; no artificial state setup. */
export default async function guardPractice(api) {
  const { control, page, state, key, click, screenshot, waitTicks, note } = api;
  await control('menu/1');
  // The last lesson is below the first viewport. Scroll the actual catalogue.
  await page.mouse.move(950, 610);
  await page.mouse.wheel(0, 600);
  await note('catalogue-scroll', { x: 950, y: 610, deltaY: 600 });
  await control('tutorial/lesson/9');
  await page.waitForFunction(() => glob2Diagnostics.snapshot().screen === 'match', null, { timeout: 60000 });
  await waitTicks(30);
  await page.waitForTimeout(500);
  await screenshot('jobs-entry-settled');
  if ((await state()).controls.ok) await control('ok');
  await waitTicks(30);
  await key('p');
  await control('intro/destination');
  await key('f');
  await key('e');
  await click(620, 630);
  await click(620, 630, { button: 'right' });
  await click(620, 630);
  await screenshot('jobs-exploration-default');
  await click(1288, 300); // Actual left Working arrow: default request two to one.
  for (let index = 0; index < 6; index++) await click(1288, 382);
  await screenshot('jobs-exploration-request-one-range-four');
  await key('p');
  for (let chunk = 0; chunk < 5; chunk++) await waitTicks(120);
  for (let chunk = 0; chunk < 5; chunk++) await waitTicks(120);
  await key('p');
  await screenshot('jobs-scout-after-normal-simulation');
  await control('intro/destination');
  await key('a');
  await key('g');
  for (const [x, y] of [[620, 630], [588, 630], [620, 598], [588, 598]]) await click(x, y);
  await screenshot('jobs-guard-painted');
  await key('p');
  for (let chunk = 0; chunk < 5; chunk++) await waitTicks(120);
  for (let chunk = 0; chunk < 5; chunk++) await waitTicks(120);
  await key('p');
  await screenshot('jobs-guard-defense-observed');
  await key('p');
  while ((await state()).tick < 5500) await waitTicks(Math.min(120, 5500 - (await state()).tick));
  await key('p');
  await screenshot('jobs-repelled-before-counterattack');
  await control('intro/destination');
  await key('f');
  await key('w');
  await click(700, 600);
  await click(700, 600, { button: 'right' });
  await click(700, 600);
  await screenshot('jobs-war-default');
  for (let count = 0; count < 7; count++) await click(1288, 300);
  await click(1365, 342);
  await screenshot('jobs-war-request-three');
  await key('p');
  for (let count = 0; count < 10; count++) await waitTicks(120);
  await key('p');
  await screenshot('jobs-war-arrivals');
  if (!(await state()).controls['intro/replay']) {
    await key('p');
    for (let count = 0; count < 30 && !(await state()).controls['intro/replay']; count++) await waitTicks(120);
    await key('p');
  }
  if (!(await state()).controls['intro/replay']) throw Error('Guard practice did not report completion; inspect actual defense and counterattack');
  await screenshot('jobs-lesson-complete');
  await key('a');
  await key('g');
  await key('a');
  await key('d');
  await click(124, 646);
  await screenshot('jobs-guard-one-tile-removed');
  await key('a');
  await key('a');
  await click(124, 646);
  await screenshot('jobs-guard-restored');
  await note('guard-practice-complete', { limitation: 'Source frames and counters require visual review; no unobserved filter, drag or victory mechanic is asserted.' });
}
