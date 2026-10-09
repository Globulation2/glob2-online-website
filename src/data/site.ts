import { metadataSchema } from './downloads-schema';
import releaseMetadata from './release-metadata.json';
export { events, getCommunityEvents } from './events';
export type { CommunityEvent } from './events';

export const site = {
  name: 'Globulation 2 Online',
  tagline: 'A free, open-source real-time strategy game where you assign tasks and your globs get to work.',
  url: 'https://glob2online.com',
  appUrl: 'https://app.glob2online.com/play/',
  hubUrl: 'https://app.glob2online.com/',
  loginUrl: 'https://app.glob2online.com/signin',
  leaderboardUrl: 'https://app.glob2online.com/leaderboard',
  matchesUrl: 'https://app.glob2online.com/matches',
  mapsUrl: 'https://app.glob2online.com/maps',
  sourceUrl: 'https://github.com/Globulation2/glob2',
  discordUrl: null as string | null,
};

export const communityLinks = [
  { title: 'Build with us', description: 'Code, maps, translations, documentation, and testing all help the colony grow.', url: 'https://github.com/Globulation2/glob2' },
  { title: 'Report a bug', description: 'Include your game version, what happened, and steps we can follow.', url: 'https://github.com/Globulation2/glob2/issues' },
  { title: 'Explore the original wiki', description: 'Meet the project’s history and the players who documented it.', url: 'https://globulation2.org/wiki/Main_Page' },
];

export const publishedReleaseMetadata = metadataSchema.parse(releaseMetadata);
