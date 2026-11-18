import { chooseVisibleOption } from './visible-options.mjs';

/** Capture a real two-colony practice setup, opponent choices and rule presets. */
export default async function setupAndRules(api) {
  const { control, screenshot, page } = api;
  await control('menu/3');
  await chooseVisibleOption(api, 'generator/width', '128', 'width-options');
  await chooseVisibleOption(api, 'generator/height', '128', 'height-options');
  await chooseVisibleOption(api, 'generator/colonies', '2', 'colony-options');
  await page.waitForFunction(() => glob2Diagnostics.snapshot().customGameReady, null, { timeout: 120000 });
  await api.note('practice-preview-ready');
  await screenshot('practice-map');
  await control('tab/1');
  await screenshot('players-and-teams');
  await control('colony/1/controller');
  await screenshot('controller-choices');
  await api.key('Escape');
  await control('colony/1/ai');
  await screenshot('opponent-roster');
  await api.key('Escape');
  await control('colony/1/info');
  for (const [index, name] of ['numbi', 'castor', 'econo', 'warrush', 'cortex', 'nicowar', 'cabino', 'maxima'].entries()) {
    await control(`profile/list/${index}`);
    await screenshot(`${name}-strategy`);
  }
  await control('profile/list/2');
  await control('profile/use');
  await screenshot('econo-selected');
  await control('tab/2');
  await control('ruleset/standard');
  await screenshot('rules-standard');
  await control('rule/victory/1');
  await screenshot('rules-conquest-only');
  await control('ruleset/blitz');
  await screenshot('rules-blitz');
  await control('ruleset/sandbox');
  await screenshot('rules-sandbox');
  await control('ruleset/standard');
  await control('rules/all');
  await screenshot('rules-standard-all');
}
