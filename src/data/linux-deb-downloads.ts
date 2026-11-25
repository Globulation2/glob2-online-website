// These pairs were verified independently against their named distro releases.
export const linuxDebReleaseTag = 'linux-debs-v0.11.7.0';
export const linuxDebVersion = '0.11.7.0';
const debianAmd64Tag = 'linux-debs-amd64-v0.11.7.0';
const ubuntuAmd64Tag = 'linux-ubuntu-amd64-v0.11.7.0';
const releases = 'https://github.com/Globulation2/glob2/releases';
const dataDownloads = 'https://storage.googleapis.com/glob2-website-public/downloads';
export const linuxDebReleaseUrls = {
  arm64: `${releases}/tag/${linuxDebReleaseTag}`,
  debianAmd64: `${releases}/tag/${debianAmd64Tag}`,
  ubuntuAmd64: `${releases}/tag/${ubuntuAmd64Tag}`,
};
const architectureLabels = { arm64: 'ARM64', amd64: 'x86-64' } as const;

interface PackagePair {
  id: string;
  name: string;
  logo: string;
  architecture: keyof typeof architectureLabels;
  releaseTag?: string;
  clientSha256: string;
  dataSha256: string;
}

const pairs: PackagePair[] = [
  {
    id: 'debian-sid',
    name: 'Debian sid (unstable)',
    logo: 'debian.svg',
    architecture: 'arm64',
    clientSha256: '9f49a92f295d994f3398dbc45024d83dfc5370ebd98226d849d447a10d1713a7',
    dataSha256: '5c7ecd7d64f7ec7ceb1f743c74e612d65cf4d14d959d2e4d697e6de447a7a8c6',
  },
  {
    id: 'debian-sid',
    name: 'Debian sid (unstable)',
    logo: 'debian.svg',
    architecture: 'amd64',
    releaseTag: debianAmd64Tag,
    clientSha256: 'fdc9e0a2b38b6c4672bff194377cd12e7d263557e4a9d3e5981f7f1e5cc39a08',
    dataSha256: '72a93a533b97c7309dd0d718f11015b57b6e22329b5847f16851e0e9ad5faa97',
  },
  {
    id: 'ubuntu-26.10',
    name: 'Ubuntu 26.10',
    logo: 'ubuntu.png',
    architecture: 'arm64',
    clientSha256: 'f04ee74d7cf32924749832595a3ffe2b9a2864633593855711c85cb4f0140bd1',
    dataSha256: '0652f5408fa4d935a2a790958129044394301374358aad69e8a32e7bbd23400b',
  },
  {
    id: 'ubuntu-26.10',
    name: 'Ubuntu 26.10',
    logo: 'ubuntu.png',
    architecture: 'amd64',
    releaseTag: ubuntuAmd64Tag,
    clientSha256: '50c5394fd26deaa7fc3f9bc5067a1698a26357411a5766bfe7f1379ac935be40',
    dataSha256: '0652f5408fa4d935a2a790958129044394301374358aad69e8a32e7bbd23400b',
  },
];

export const linuxDebDownloads = pairs.map(({ id, name, logo, architecture, releaseTag = linuxDebReleaseTag, clientSha256, dataSha256 }) => {
  const client = `${id}-glob2_${linuxDebVersion}-1.glob2.1_${architecture}.deb`;
  const data = `${id}-glob2-data_${linuxDebVersion}-1.glob2.1_all.deb`;
  const base = `${releases}/download/${releaseTag}`;
  const dataBase = architecture === 'arm64' ? `${dataDownloads}/${releaseTag}` : base;
  return {
    name: `${name} · ${architectureLabels[architecture]}`,
    logo,
    client: { name: client, url: `${base}/${client}`, sha256: clientSha256 },
    data: { name: data, url: `${dataBase}/${data}`, sha256: dataSha256 },
  };
});
