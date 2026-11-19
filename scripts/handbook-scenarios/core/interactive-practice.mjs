import { readFile, writeFile, realpath } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import path from 'node:path';

/** Import only an intact export recorded by this capture, through its real chooser. */
export async function importDownloadedFile(api, command) {
  if (typeof command.filename !== 'string' || !/^downloads\/[a-zA-Z0-9._-]+$/.test(command.filename)) {
    throw Error('Import requires a relative filename in this capture downloads directory');
  }
  const recorded = (await api.downloadedFiles()).find(file => file.filename === command.filename);
  if (!recorded) throw Error('Import file is not a completed download from this capture');
  const directory = await realpath(path.join(api.output, 'downloads'));
  const file = await realpath(path.join(api.output, command.filename));
  if (!file.startsWith(directory + path.sep)) throw Error('Import file escapes capture downloads');
  const bytes = await readFile(file);
  const sha256 = createHash('sha256').update(bytes).digest('hex');
  if (bytes.length !== recorded.bytes || sha256 !== recorded.sha256) throw Error('Import download bytes changed');
  const control = (await api.state()).controls?.[command.key];
  if (!control?.enabled || !(control.visible?.w > 0) || !(control.visible?.h > 0)) {
    throw Error('Import requires an enabled visible game control');
  }
  const [chooser] = await Promise.all([
    api.page.waitForEvent('filechooser', { timeout: 15000 }),
    api.control(command.key),
  ]);
  await chooser.setFiles(file);
  await api.note('interactive:import-file', { control: command.key, filename: recorded.filename, bytes: bytes.length, sha256 });
}

/** Genuine UI exploration with a serialized, recorded command file. */
export default async function interactivePractice(api) {
  const commandPath = path.join(api.output, 'interactive-command.json');
  const responsePath = path.join(api.output, 'interactive-response.json');
  let sequence = 0;
  await api.screenshot('interactive-entry');
  await writeFile(responsePath, JSON.stringify({ sequence, ready: true, snapshot: await api.state() }, null, 2));
  for (;;) {
    let command;
    try { command = JSON.parse(await readFile(commandPath, 'utf8')); }
    catch (error) {
      if (error.code === 'ENOENT' || error instanceof SyntaxError) {
        await api.page.waitForTimeout(100);
        continue;
      }
      throw error;
    }
    if (command.sequence === sequence) { await api.page.waitForTimeout(100); continue; }
    if (command.sequence !== sequence + 1) throw Error('Interactive commands must be strictly sequential');
    let finished = false;
    switch (command.action) {
      case 'inspect': await api.note('interactive:inspect'); break;
      case 'control': await api.control(command.key); break;
      case 'key': await api.key(command.key); break;
      case 'click': await api.click(command.x, command.y, command.options ?? {}); break;
      case 'scroll':
        await api.page.mouse.move(command.x, command.y);
        await api.page.mouse.wheel(command.dx ?? 0, command.dy);
        await api.page.waitForTimeout(300);
        await api.note('interactive:scroll', { x: command.x, y: command.y, dx: command.dx ?? 0, dy: command.dy });
        break;
      case 'screenshot': await api.screenshot(command.name); break;
      case 'import-file': await importDownloadedFile(api, command); break;
      case 'advance':
        if (!Number.isInteger(command.ticks) || command.ticks < 1 || command.ticks > 120) throw Error('Advance accepts 1–120 normal simulation ticks');
        await api.waitTicks(command.ticks);
        break;
      case 'close': await api.note('interactive:close'); finished = true; break;
      default: throw Error('Unsupported interactive action');
    }
    sequence = command.sequence;
    await writeFile(responsePath, JSON.stringify({ sequence, complete: finished, snapshot: await api.state() }, null, 2));
    if (finished) return;
  }
}
