/** Select an inspected, visible popup option through the game's real mouse path. */
export async function chooseVisibleOption(api, key, label, captureName) {
  await api.control(key);
  await api.screenshot(captureName);
  const current = await api.state();
  const options = Object.entries(current.controls).filter(([id, item]) =>
    id.startsWith('popup/') && item.enabled && item.visible?.w > 0 && item.visible?.h > 0 && item.label === label);
  if (options.length !== 1) throw Error(`Expected one visible option ${JSON.stringify(label)} for ${key}, found ${options.length}`);
  await api.control(options[0][0]);
}
