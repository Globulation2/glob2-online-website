import { z } from 'zod';
import releaseMetadata from './release-metadata.json';
export { events, getCommunityEvents } from './events';
export type { CommunityEvent } from './events';

export const site = {
  name: 'Globulation 2',
  tagline: 'A free, open-source real-time strategy game where you assign tasks and your globs get to work.',
  url: 'https://glob2online.com',
  appUrl: 'https://app.glob2online.com/play/',
  hubUrl: 'https://app.glob2online.com/',
  loginUrl: 'https://app.glob2online.com/signin',
  sourceUrl: 'https://github.com/Globulation2/glob2',
  discordUrl: null as string | null,
};

export const communityLinks = [
  { title: 'Build with us', description: 'Code, maps, translations, documentation, and testing all help the colony grow.', url: 'https://github.com/Globulation2/glob2' },
  { title: 'Report a bug', description: 'Include your game version, what happened, and steps we can follow.', url: 'https://github.com/Globulation2/glob2/issues' },
  { title: 'Explore the original wiki', description: 'Meet the project’s history and the players who documented it.', url: 'https://globulation2.org/wiki/Main_Page' },
];

export interface ReleaseLink {
  title: string;
  version?: string;
  url: string;
  platform: string;
  status: 'source' | 'published';
}
const releaseFallbacks: ReleaseLink[] = [
  { title: 'Release downloads', url: 'https://github.com/Globulation2/glob2/releases', platform: 'Published packages', status: 'published' },
  { title: 'Build from source', url: 'https://github.com/Globulation2/glob2', platform: 'Windows · macOS · Linux', status: 'source' },
  { title: 'Browser development guide', url: 'https://github.com/Globulation2/glob2/blob/master/browser/README.md', platform: 'Browser', status: 'source' },
];

const releaseSchema = z.object({
  title: z.string().min(1),
  version: z.string().min(1),
  url: z.url().refine(value => new URL(value).protocol === 'https:'),
  platform: z.string().min(1),
  status: z.literal('published'),
});
const metadataSchema = z.object({
  schemaVersion: z.literal(1),
  checkedAt: z.iso.datetime().nullable(),
  releases: z.array(releaseSchema),
});
export const publishedReleaseMetadata = metadataSchema.parse(releaseMetadata);
export const releases: ReleaseLink[] = publishedReleaseMetadata.releases.length
  ? [...publishedReleaseMetadata.releases, ...releaseFallbacks.filter(release => release.status === 'source')]
  : releaseFallbacks;
