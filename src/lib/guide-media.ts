import {mediaHTML} from '../data/guide-media';
/** Replace standalone media marker paragraphs in trusted, rendered repository Markdown. */
export function insertGuideMedia(html:string) {
  return html
    .replace(/<p>\[\[media:([a-z0-9-]+)\]\]<\/p>/g,(_paragraph,id:string)=>mediaHTML(id))
    .replace(/<table([\s>])/g,'<div class="guide-table" tabindex="0" role="region" aria-label="Scrollable reference table"><table$1')
    .replace(/<\/table>/g,'</table></div>');
}
