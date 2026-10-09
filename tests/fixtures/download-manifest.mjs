// Synthetic test data; never publish or use as reviewed release metadata.
import { createHash } from 'node:crypto';
import { requiredPackages } from '../../src/data/downloads-schema.ts';
export function fixtureManifest() {
  const version = '0.11.0.0', tag = `v${version}`, sourceCommit = 'a'.repeat(40);
  const bytes = Buffer.from('fixture package');
  const file = filename => ({filename, sizeBytes: bytes.length, sha256: createHash('sha256').update(bytes).digest('hex'), url: `https://github.com/Globulation2/glob2/releases/download/${tag}/${filename}`});
  return {schemaVersion: 1, version, tag, sourceCommit, releaseNotesUrl: `https://github.com/Globulation2/glob2/releases/tag/${tag}`,
    qualification: {qualified: true, sourceCommit, stores: {googlePlay: {production: true, url: 'https://play.google.com/store/apps/details?id=org.globulation2.glob2'}, appStore: {production: true, url: 'https://apps.apple.com/app/id123456789'}}},
    packages: requiredPackages.map(identity => { const [platform, architecture, format] = identity.split(':'); return {...file(`glob2-${platform}-${architecture}.${format}`), platform, architecture, format, minimumOs: `${platform} test baseline`}; }),
    sources: [file('glob2-source.tar.gz')]};
}
