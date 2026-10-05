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
  '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.ico': 'image/x-icon', '.mp4': 'video/mp4',
  '.wasm': 'application/wasm', '.woff': 'font/woff', '.woff2': 'font/woff2',
};
function matches(source, pathname) {
  if (source === '**') return true;
  if (source.endsWith('/**')) return pathname.startsWith(source.slice(0, -2));
  if (source.includes('*')) throw new Error(`Unsupported Firebase test header pattern: ${source}`);
  return pathname === source;
}
// Firebase redirect sources with segments like /j/:code and /play/:path*.
function redirectTo(rule, pathname) {
  const names = [];
  const pattern = rule.source.split('/').map(segment => {
    const param = /^:(\w+)(\*)?$/.exec(segment);
    if (!param) return segment.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    names.push(param[1]);
    return param[2] ? '(.*)' : '([^/]+)';
  }).join('/');
  const match = new RegExp(`^${pattern}$`).exec(pathname);
  if (!match) return null;
  return names.reduce((to, name, i) => to.replace(`:${name}`, match[i + 1]), rule.destination);
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
    for (const rule of hosting.redirects ?? []) {
      const location = redirectTo(rule, pathname);
      if (location !== null) { response.writeHead(rule.type, { Location: location }).end(); return; }
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
    const size = (await stat(file)).size;
    response.setHeader('Content-Length', size);
    response.setHeader('Accept-Ranges', 'bytes');
    if (request.method === 'HEAD') { response.end(); return; }
    let start = 0;
    let end = size - 1;
    if (request.headers.range && response.statusCode === 200) {
      const range = /^bytes=(\d*)-(\d*)$/.exec(request.headers.range);
      if (range && (range[1] || range[2])) {
        start = range[1] ? Number(range[1]) : Math.max(0, size - Number(range[2]));
        end = range[1] && range[2] ? Math.min(size - 1, Number(range[2])) : size - 1;
      }
      if (!range || !(range[1] || range[2]) || !Number.isSafeInteger(start) ||
          !Number.isSafeInteger(end) || start > end || start >= size) {
        response.setHeader('Content-Range', `bytes */${size}`);
        response.setHeader('Content-Length', 0);
        response.writeHead(416).end(); return;
      }
      response.statusCode = 206;
      response.setHeader('Content-Range', `bytes ${start}-${end}/${size}`);
      response.setHeader('Content-Length', end - start + 1);
    }
    const stream = createReadStream(file, { start, end });
    stream.on('error', () => response.destroy());
    response.on('close', () => stream.destroy());
    stream.pipe(response);
  } catch {
    if (!response.headersSent) response.writeHead(400);
    response.end('Bad request');
  }
});
server.listen(port, '127.0.0.1', () => console.log(`Firebase-header test server: http://127.0.0.1:${port}`));
for (const signal of ['SIGINT', 'SIGTERM']) process.on(signal, () => server.close());
