import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

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
