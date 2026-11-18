/** The real prepared Food supply practice lesson, not an invented custom match. */
export async function openFoodPractice(api) {
  const { control, page, waitTicks, screenshot, state } = api;
  await control('menu/1');
  await screenshot('tutorial-lessons');
  await control('tutorial/lesson/1');
  await page.waitForFunction(() => glob2Diagnostics.snapshot().screen === 'match', null, { timeout: 60000 });
  await waitTicks(30);
  await screenshot('food-practice-instruction');
  if ((await state()).controls.ok) await control('ok');
  await waitTicks(30);
  await screenshot('food-practice-start');
}

export default openFoodPractice;
