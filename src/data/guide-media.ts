import manifest from './guide-media.json';

export interface GuideMediaAsset {
  id:string; path:string; url:string; sha256:string; bytes:number;
  width:number; height:number; caption:string; alt:string;
  kind:'image'|'video'; poster?:string;
}
export const guideMedia = manifest.assets as GuideMediaAsset[];
export function mediaAsset(id:string):GuideMediaAsset {
  const asset=guideMedia.find(asset=>asset.id===id);
  if(!asset) throw new Error(`Unknown guide media: ${id}`);
  return asset;
}
const escape = (value:string) => value.replace(/[&<>"']/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]!));
const assetPath = (path:string) => escape(path.startsWith('/')?path:`/${path}`);

/** Shared rendering keeps Markdown media slots and component figures identical. */
export function mediaHTML(id:string) {
  const asset=mediaAsset(id);
  const path=assetPath(asset.path);
  const caption=escape(asset.caption);
  const alt=escape(asset.alt);
  const captionId=`caption-${escape(asset.id)}`;
  const poster=asset.poster?` poster="${assetPath(mediaAsset(asset.poster).path)}"`:'';
  const content=asset.kind==='video'
    ? `<video controls playsinline preload="none" width="${asset.width}" height="${asset.height}" aria-label="${alt}" aria-describedby="${captionId}"${poster}><source src="${path}" type="video/mp4"><a href="${path}">Watch or download this gameplay clip</a>.</video><p class="media-fallback"><a href="${path}">Open gameplay clip</a> · ${alt}</p>`
    : `<a class="guide-image-link" href="${path}" aria-label="Open full-size image: ${alt}"><img src="${path}" alt="${alt}" width="${asset.width}" height="${asset.height}" loading="lazy" decoding="async"></a><p class="media-fallback"><a href="${path}">Open full-size screenshot</a></p>`;
  const figureClass=asset.kind==='image'&&asset.width<600?'guide-media guide-media--detail':'guide-media';
  return `<figure class="${figureClass}" id="media-${escape(asset.id)}">${content}<figcaption id="${captionId}">${caption}</figcaption></figure>`;
}
