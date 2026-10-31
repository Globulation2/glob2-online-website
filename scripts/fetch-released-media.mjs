import { setTimeout } from 'node:timers/promises';

// Hosting can briefly serve the previous release after a successful promotion.
// Retry only unavailable required resources; content verification still fails closed.
export async function fetchReleasedResource(url, { fetcher = fetch, sleep = setTimeout } = {}) {
  const delays = [2000, 5000, 10000, 20000];
  for (let attempt = 0; ; attempt++) {
    const response = await fetcher(url, { redirect: 'error', signal: AbortSignal.timeout(60000) });
    if (![404, 503].includes(response.status) || attempt === delays.length) return response;
    await response.body?.cancel();
    await sleep(delays[attempt]);
  }
}

export const fetchReleasedMedia = fetchReleasedResource;

// A reused Hosting channel can also briefly serve the previous redirect config.
// Return the final response unchanged so the caller still enforces its exact
// status and destination assertions after this bounded propagation window.
export async function fetchReleasedRedirect(url, expectedLocation, statuses, { fetcher = fetch, sleep = setTimeout } = {}) {
  const delays = [2000, 5000, 10000, 20000];
  for (let attempt = 0; ; attempt++) {
    const response = await fetcher(url, { redirect: 'manual', signal: AbortSignal.timeout(15000) });
    const matches = statuses.includes(response.status) && response.headers.get('location') === expectedLocation;
    const mayBePropagating = statuses.includes(response.status) || [404, 503].includes(response.status);
    if (matches || !mayBePropagating || attempt === delays.length) return response;
    await response.body?.cancel();
    await sleep(delays[attempt]);
  }
}
