// Game repository is authoritative. --check is read-only; omit it to import.
import {readFile, writeFile} from 'node:fs/promises';
import {resolve, dirname} from 'node:path';
import {fileURLToPath} from 'node:url';
import {createHash} from 'node:crypto';
import {execFileSync} from 'node:child_process';
const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const args = process.argv.slice(2);
const check = args.includes('--check');
const repoIndex = args.indexOf('--game-repo');
if (repoIndex >= 0 && (!args[repoIndex + 1] || args[repoIndex + 1].startsWith('--'))) throw new Error('--game-repo requires a checkout path');
const game = repoIndex >= 0 ? resolve(args[repoIndex + 1]) : null;
const files = [
  {source: 'docs/mobile/privacy-policy.md', target: 'src/content/legal/privacy.md', title: 'Globulation 2 privacy policy', description: 'Privacy for the website, game editions and official online service.'},
  {source: 'docs/mobile/terms.md', target: 'src/content/legal/terms.md', title: 'Globulation 2 terms and conditions', description: 'Terms for the public website and official online service.'},
];
// Resolve remote master once so both documents come from the same revision.
let revision;
if (!game) {
  // Public Git resolution avoids shared-runner GitHub API rate limits.
  revision = execFileSync('git', ['ls-remote', 'https://github.com/Globulation2/glob2.git', 'refs/heads/master'], {encoding: 'utf8', timeout: 30000}).split(/\s+/)[0];
  if (!/^[a-f0-9]{40}$/.test(revision)) throw new Error('Invalid game revision');
}
// Read every source before writing anything; a missing source cannot partly import.
const sources = await Promise.all(files.map(async file => {
  if (game) return readFile(resolve(game, file.source), 'utf8');
  const response = await fetch(`https://raw.githubusercontent.com/Globulation2/glob2/${revision}/${file.source}`, {signal: AbortSignal.timeout(30000)});
  if (!response.ok) throw new Error(`Cannot fetch ${file.source}: HTTP ${response.status}`);
  return response.text();
}));
let failed = false;
for (const [index, file] of files.entries()) {
  const source = sources[index];
  const hash = createHash('sha256').update(source).digest('hex');
  const expected = file.title
    ? `---\ntitle: "${file.title}"\ndescription: "${file.description}"\nsourceUrl: "https://github.com/Globulation2/glob2/blob/master/${file.source}"\nsourceSha256: "${hash}"\n---\n\n${source.replace(/^# [^\n]+\n\n/, '')}`
    : source;
  if (check) {
    const actual = await readFile(resolve(root, file.target), 'utf8').catch(() => '');
    if (actual !== expected) { console.error(`Out of sync: ${file.target}`); failed = true; }
    else console.log(`In sync: ${file.target}`);
  } else { await writeFile(resolve(root, file.target), expected); console.log(`Synced: ${file.target}`); }
}
if (failed) process.exitCode = 1;
