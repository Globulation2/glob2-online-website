import { setTimeout } from 'node:timers/promises';

// Hosting can briefly serve the previous release after a successful promotion.
// Retry only unavailable media responses; byte verification still fails closed.
export async function fetchReleasedMedia(url, { fetcher = fetch, sleep = setTimeout } = {}) {
  const delays = [2000, 5000, 10000, 20000];
  for (let attempt = 0; ; attempt++) {
    const response = await fetcher(url, { redirect: 'error', signal: AbortSignal.timeout(60000) });
    if (![404, 503].includes(response.status) || attempt === delays.length) return response;
    await response.body?.cancel();
    await sleep(delays[attempt]);
  }
}
