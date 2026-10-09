import { z } from 'zod';

const repository = 'https://github.com/Globulation2/glob2';
const hash = z.string().regex(/^[a-f0-9]{64}$/);
const commit = z.string().regex(/^[a-f0-9]{40}$/);
const filename = z.string().regex(/^[A-Za-z0-9][A-Za-z0-9._+-]*$/);
const fileSchema = z.object({
  filename, sizeBytes: z.number().int().positive().max(Number.MAX_SAFE_INTEGER),
  sha256: hash, url: z.url(),
});
export const packageSchema = fileSchema.extend({
  platform: z.enum(['windows', 'macos', 'linux', 'android']),
  architecture: z.enum(['x86_64', 'arm64', 'armv7']),
  format: z.enum(['exe', 'zip', 'dmg', 'tar.gz', 'rpm', 'flatpak', 'snap', 'apk']),
  minimumOs: z.string().trim().min(1), dependencies: z.array(z.string().trim().min(1)).optional(),
});
const storesSchema = z.object({
  googlePlay: z.object({production: z.literal(true), url: z.url().refine(value => {
    const url = new URL(value);
    return !url.username && !url.password && !url.port && url.origin === 'https://play.google.com' && url.pathname === '/store/apps/details' && url.searchParams.getAll('id').length === 1 && url.searchParams.get('id') === 'org.globulation2.glob2' && !url.hash;
  })}),
  appStore: z.object({production: z.literal(true), url: z.url().refine(value => {
    const url = new URL(value);
    return !url.username && !url.password && !url.port && url.origin === 'https://apps.apple.com' && /\/id[0-9]+\/?$/.test(url.pathname) && !url.hash;
  })}),
});
export const requiredPackages = [
  'windows:x86_64:exe', 'windows:x86_64:zip', 'macos:arm64:dmg', 'macos:x86_64:dmg',
  'linux:x86_64:flatpak', 'linux:x86_64:snap', 'linux:x86_64:tar.gz', 'linux:x86_64:rpm',
  'android:arm64:apk', 'android:armv7:apk', 'android:x86_64:apk',
];
export const manifestSchema = z.object({
  schemaVersion: z.literal(1), version: z.string().regex(/^[0-9]+(?:\.[0-9]+)+$/),
  tag: z.string().regex(/^v[0-9]+(?:\.[0-9]+)+$/), sourceCommit: commit, releaseNotesUrl: z.url(),
  qualification: z.object({qualified: z.literal(true), sourceCommit: commit, stores: storesSchema}),
  packages: z.array(packageSchema).min(1), sources: z.array(fileSchema).min(1),
}).superRefine((manifest, ctx) => {
  const fail = (message: string) => ctx.addIssue({code: 'custom', message});
  if (manifest.tag !== `v${manifest.version}`) fail('Tag must match version');
  if (manifest.sourceCommit !== manifest.qualification.sourceCommit) fail('Qualification source revision mismatch');
  if (manifest.releaseNotesUrl !== `${repository}/releases/tag/${manifest.tag}`) fail('Release notes must identify the public game release');
  const identities = manifest.packages.map(pkg => `${pkg.platform}:${pkg.architecture}:${pkg.format}`);
  if (new Set(identities).size !== identities.length) fail('Duplicate package identity');
  if (requiredPackages.some(identity => !identities.includes(identity))) fail('Missing required platform package');
  if (identities.some(identity => !requiredPackages.includes(identity))) fail('Unsupported platform package');
  const files = [...manifest.packages, ...manifest.sources];
  if (new Set(files.map(file => file.filename)).size !== files.length) fail('Duplicate filename');
  for (const file of files) {
    if (file.url !== `${repository}/releases/download/${manifest.tag}/${encodeURIComponent(file.filename)}`) fail('Downloads must use immutable public game release URLs');
  }
  for (const source of manifest.sources) {
    if (!/\.(tar\.gz|tar\.xz|zip)$/.test(source.filename)) fail('Source downloads must be archives');
  }
  for (const pkg of manifest.packages) {
    if (!pkg.filename.toLowerCase().endsWith(`.${pkg.format.toLowerCase()}`)) fail('Package extension does not match format');
  }
});
export const metadataSchema = z.object({schemaVersion: z.literal(2), checkedAt: z.iso.datetime().nullable(), manifest: manifestSchema.nullable()});
export type DownloadManifest = z.infer<typeof manifestSchema>;
export type DownloadPackage = z.infer<typeof packageSchema>;

// Editorial store updates and withdrawals are separate from immutable package metadata.
export const channelsSchema = z.object({
  schemaVersion: z.literal(1), releaseTag: z.string().regex(/^v[0-9]+(?:\.[0-9]+)+$/).nullable(),
  googlePlay: storesSchema.shape.googlePlay.nullable(), appStore: storesSchema.shape.appStore.nullable(),
  withdrawnPackages: z.array(filename), withdrawnStores: z.array(z.enum(['googlePlay', 'appStore'])),
}).superRefine((channels, ctx) => {
  if (!channels.releaseTag && (channels.googlePlay || channels.appStore || channels.withdrawnPackages.length || channels.withdrawnStores.length)) ctx.addIssue({code: 'custom', message: 'Channel updates must identify the reviewed release tag'});
});
