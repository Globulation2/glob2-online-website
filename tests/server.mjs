// Serve the built site with Firebase headers so browser tests exercise production CSP.
import { createServer } from 'node:http';
import { createReadStream } from 'node:fs';
import { readFile, realpath, stat } from 'node:fs/promises';
import { dirname, extname, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const project = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const { hosting } = JSON.parse(await readFile(resolve(project, 'firebase.json'), 'utf8'));
const root = await realpath(resolve(project, hosting.public));
const port = Number(process.env.TEST_PORT ?? 4322);
const types = {
  '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8', '.json': 'application/json; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8', '.txt': 'text/plain; charset=utf-8',
  '.svg': 'image/svg+xml', '.png': 'image/png', '.webp': 'image/webp',
  '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.ico': 'image/x-icon',
  '.wasm': 'application/wasm', '.woff': 'font/woff', '.woff2': 'font/woff2',
};
function matches(source, pathname) {
  if (source === '**') return true;
  if (source.endsWith('/**')) return pathname.startsWith(source.slice(0, -2));
  if (source.includes('*')) throw new Error(`Unsupported Firebase test header pattern: ${source}`);
  return pathname === source;
}
async function fileAt(pathname) {
  const candidate = resolve(root, `.${pathname}`);
  if (!candidate.startsWith(root + sep) && candidate !== root) return null;
  let file = candidate;
  try {
    if ((await stat(file)).isDirectory()) file = resolve(file, 'index.html');
  } catch {
    if (hosting.cleanUrls && !extname(file)) file += '.html';
  }
  try {
    file = await realpath(file);
    if (!file.startsWith(root + sep) || !(await stat(file)).isFile()) return null;
    return file;
  } catch { return null; }
}
const server = createServer(async (request, response) => {
  try {
    const pathname = decodeURIComponent(new URL(request.url, 'http://localhost').pathname);
    for (const rule of hosting.headers ?? []) {
      if (matches(rule.source, pathname)) {
        for (const header of rule.headers) response.setHeader(header.key, header.value);
      }
    }
    if (!['GET', 'HEAD'].includes(request.method)) {
      response.setHeader('Allow', 'GET, HEAD');
      response.writeHead(405).end(); return;
    }
    const redirect = hosting.redirects?.find(rule => matches(rule.source, pathname));
    if (redirect) {
      response.writeHead(redirect.type, { Location: redirect.destination }).end(); return;
    }
    // Hidden files are excluded by Firebase's hosting.ignore configuration.
    const hidden = pathname.split('/').some(segment => segment.startsWith('.'));
    let file = hidden ? null : await fileAt(pathname);
    if (!file) {
      response.statusCode = 404;
      file = await fileAt('/404.html');
    }
    if (!file) { response.end('Not found'); return; }
    response.setHeader('Content-Type', types[extname(file)] ?? 'application/octet-stream');
    response.setHeader('Content-Length', (await stat(file)).size);
    if (request.method === 'HEAD') { response.end(); return; }
    const stream = createReadStream(file);
    stream.on('error', () => response.destroy());
    stream.pipe(response);
  } catch {
    if (!response.headersSent) response.writeHead(400);
    response.end('Bad request');
  }
});
server.listen(port, '127.0.0.1', () => console.log(`Firebase-header test server: http://127.0.0.1:${port}`));
for (const signal of ['SIGINT', 'SIGTERM']) process.on(signal, () => server.close());
