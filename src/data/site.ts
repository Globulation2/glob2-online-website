import { metadataSchema } from './downloads-schema';
import releaseMetadata from './release-metadata.json';
export { events, getCommunityEvents } from './events';
export type { CommunityEvent } from './events';

export const site = {
  name: 'Globulation 2 Online',
  tagline: 'A free, open-source real-time strategy game about managing the work of a colony.',
  url: 'https://glob2.online',
  appUrl: 'https://app.glob2.online/play/',
  hubUrl: 'https://app.glob2.online/',
  loginUrl: 'https://app.glob2.online/signin',
  leaderboardUrl: 'https://app.glob2.online/leaderboard',
  matchesUrl: 'https://app.glob2.online/matches',
  mapsUrl: 'https://app.glob2.online/maps',
  sourceUrl: 'https://github.com/Globulation2/glob2',
  discordUrl: 'https://discord.gg/xnVrafzMD',
};

export const communityLinks = [
  { title: 'Build with us', description: 'Find the game source and its contribution, build and translation instructions.', url: 'https://github.com/Globulation2/glob2' },
  { title: 'Report a bug', description: 'Include your game version, what happened, and steps we can follow.', url: 'https://github.com/Globulation2/glob2/issues' },
  { title: 'Explore the original wiki', description: 'Read older manuals and strategies with their original contributor histories.', url: 'https://globulation2.org/wiki/Main_Page' },
];

export const publishedReleaseMetadata = metadataSchema.parse(releaseMetadata);
