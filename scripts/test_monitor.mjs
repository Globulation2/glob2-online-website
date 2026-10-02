import assert from 'node:assert/strict';
import { test } from 'node:test';
import { MAX_FEED_AGE_MS, request, validateFreshness, validateInstance } from './monitor.mjs';

const now = Date.parse('2026-10-02T16:00:00Z');
const feed = generatedAt => ({ schemaVersion: 1, ratingPolicy: 'openskill-plackett-luce-v1', ladder: 'ranked-1v1', generatedAt, entries: [] });
test('empty current ratings remain healthy, with exact stale boundary', () => {
  assert.equal(validateFreshness(feed('2026-10-02T16:00:00Z'), now), 0);
  assert.equal(validateFreshness(feed('2026-10-02T15:45:00Z'), now), MAX_FEED_AGE_MS);
  assert.throws(() => validateFreshness(feed('2026-10-02T15:44:59Z'), now), /stale/);
});
test('malformed, unsupported and future snapshots fail', () => {
  for (const timestamp of ['invalid', '2026-02-30T16:00:00Z', '2026-10-02T16:02:00Z']) {
    assert.throws(() => validateFreshness(feed(timestamp), now));
  }
  assert.throws(() => validateFreshness({ ...feed('2026-10-02T16:00:00Z'), schemaVersion: 2 }, now), /schema/);
  assert.throws(() => validateFreshness({ ...feed('2026-10-02T16:00:00Z'), entries: null }, now), /schema/);
});
test('canonical app metadata detects a hostname regression', () => {
  const origin = 'https://app.glob2online.com';
  const instance = { origin, realtimeUrl: 'wss://app.glob2online.com/realtime', supportedSimVersions: [], authProviders: [] };
  validateInstance(instance, origin);
  assert.throws(() => validateInstance({ ...instance, origin: 'https://glob2online.com' }, origin), /origin/);
  assert.throws(() => validateInstance({ ...instance, realtimeUrl: 'ws://app.glob2online.com/realtime' }, origin), /endpoint/);
});
test('HTTP failures, redirects and bounded requests are enforced', async () => {
  let options;
  await assert.rejects(request('https://example.com', async (_, opts) => {
    options = opts;
    return new Response('Unavailable', { status: 503 });
  }), /HTTP 503/);
  assert.equal(options.redirect, 'error');
  assert.ok(options.signal instanceof AbortSignal);
  await assert.rejects(request('http://example.com'), /HTTPS/);
  await assert.rejects(request('https://example.com', async () => new Response('x'.repeat(1024 * 1024 + 1))), /size limit/);
});
