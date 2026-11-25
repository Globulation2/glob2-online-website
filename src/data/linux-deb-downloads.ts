// These pairs were verified independently against their named distro releases.
export const linuxDebReleaseTag = 'linux-debs-v0.11.7.0';
export const linuxDebVersion = '0.11.7.0';
const releases = 'https://github.com/Globulation2/glob2/releases';
const dataDownloads = 'https://storage.googleapis.com/glob2-website-public/downloads';
export const linuxDebReleaseUrl = `${releases}/tag/${linuxDebReleaseTag}`;

export const linuxDebDownloads = [
  {
    id: 'debian-sid',
    name: 'Debian sid (unstable)',
    logo: 'debian.svg',
    clientSha256: '9f49a92f295d994f3398dbc45024d83dfc5370ebd98226d849d447a10d1713a7',
    dataSha256: '5c7ecd7d64f7ec7ceb1f743c74e612d65cf4d14d959d2e4d697e6de447a7a8c6',
  },
  {
    id: 'ubuntu-26.10',
    name: 'Ubuntu 26.10',
    logo: 'ubuntu.png',
    clientSha256: 'f04ee74d7cf32924749832595a3ffe2b9a2864633593855711c85cb4f0140bd1',
    dataSha256: '0652f5408fa4d935a2a790958129044394301374358aad69e8a32e7bbd23400b',
  },
].map(({ id, name, logo, clientSha256, dataSha256 }) => {
  const client = `${id}-glob2_${linuxDebVersion}-1.glob2.1_arm64.deb`;
  const data = `${id}-glob2-data_${linuxDebVersion}-1.glob2.1_all.deb`;
  const base = `${releases}/download/${linuxDebReleaseTag}`;
  return {
    name,
    logo,
    client: { name: client, url: `${base}/${client}`, sha256: clientSha256 },
    data: { name: data, url: `${dataDownloads}/${linuxDebReleaseTag}/${data}`, sha256: dataSha256 },
  };
});
