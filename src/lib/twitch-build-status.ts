import { twitchLinksRetired } from './twitch-status';

// Read once per build. A failed status lookup stops publication of stale markup.
export const omitTwitchLinks = await twitchLinksRetired();
