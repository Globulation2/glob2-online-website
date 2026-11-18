/** The current first scouting task, followed through an actual explorer arrival. */
export default async function introduction(api) {
  const { control, page, state, screenshot, key, click, waitTicks, note } = api;
  await control('menu/1');
  await screenshot('introduction-lessons');
  await control('tutorial/lesson/0');
  await page.waitForFunction(() => glob2Diagnostics.snapshot().screen === 'match', null, { timeout: 60000 });
  await page.waitForTimeout(500);
  const briefingShown = Boolean((await state()).controls.ok?.enabled);
  if (briefingShown) await control('ok');
  await note('introduction-entry-flow', { briefingShown });
  await waitTicks(30);
  await key('p');
  await screenshot('introduction-first-instruction');
  await control('intro/destination');
  await key('f');
  await key('e');
  await click(620, 630);
  await click(620, 630, { button: 'right' });
  await click(620, 630);
  await screenshot('introduction-flag-default-request');
  await key('p');
  // The next actual task has no destination button. Do not write tutorial goals
  // or force a unit count: allow ordinary travel, then require the UI transition.
  for (let attempt = 0; attempt < 20 && (await state()).controls['intro/destination']; attempt++) {
    await waitTicks(120);
  }
  if ((await state()).controls['intro/destination']) throw Error('Scouting goal has not advanced; inspect the genuine flag placement and arrivals');
  await key('p');
  await screenshot('introduction-arrival-default-request');
  await click(1288, 300);
  await screenshot('introduction-arrival-request-one');
}
