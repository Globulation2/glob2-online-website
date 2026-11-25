// The signed OBS revision 4 package, independently tested on Tumbleweed.
const filename = 'globulation2-0.11.7.0-8.1.x86_64.rpm';
const tag = 'linux-opensuse-v0.11.7.0';

export const tumbleweedDownload = {
  filename,
  version: '0.11.7.0',
  url: `https://storage.googleapis.com/glob2-website-public/downloads/${tag}/${filename}`,
  releaseUrl: `https://github.com/Globulation2/glob2/releases/tag/${tag}`,
  sha256: 'df9db7e90825a0351fc7e03df1c410baecb11210d538431e5e78268150ae22da',
};
