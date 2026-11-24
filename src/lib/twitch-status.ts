const statusUrl = 'https://storage.googleapis.com/glob2-website-public/twitch/v1.json';

export async function twitchLinksRetired(): Promise<boolean> {
  const response = await fetch(statusUrl, {
    cache: 'no-cache',
    credentials: 'omit',
    referrerPolicy: 'no-referrer',
    redirect: 'error',
    signal: AbortSignal.timeout(5000),
  });
  if (response.status === 404) return false;
  if (!response.ok) throw new Error(`Twitch status returned HTTP ${response.status}`);
  const status = await response.json();
  if (status?.schemaVersion !== 1 || typeof status.retired !== 'boolean') {
    throw new Error('Invalid Twitch link status');
  }
  return status.retired;
}
