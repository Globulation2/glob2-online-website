/** Inspect and cancel the real Game shortcut editor without changing bindings. */
export default async function referenceControls({ control, page, state, screenshot, note }) {
  await control('menu/6');
  await control('nav.4');
  if ((await state()).controls['keys.mode.0']) await control('keys.mode.0');
  await page.mouse.move(950, 610);
  await page.mouse.wheel(0, 600);
  await page.waitForFunction(() => {
    const c = glob2Diagnostics.snapshot().controls['keys.binding.3'];
    return c?.visible?.h > 0 && c.enabled;
  }, null, { timeout: 60000 });
  await note('scroll:game-shortcuts', { x: 950, y: 610, dy: 600 });
  await screenshot('reference-settings');
  const before = (await state()).controls['keys.binding.3'].label;
  await control('keys.binding.3');
  await page.waitForFunction(() => {
    const c = glob2Diagnostics.snapshot().controls;
    return c['binding.cancel']?.enabled && c['binding.save']?.enabled && c['binding.escape']?.enabled;
  }, null, { timeout: 60000 });
  await screenshot('reference-shortcut-editor');
  await control('binding.cancel');
  const after = (await state()).controls['keys.binding.3']?.label;
  if (before !== after) throw Error('Cancelling the shortcut editor changed its binding');
  await note('shortcut-cancel-preserved-binding', { before, after });
  await screenshot('reference-settings-after-cancel');
}
