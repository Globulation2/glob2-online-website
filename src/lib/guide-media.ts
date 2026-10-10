import {mediaHTML} from '../data/guide-media';
/** Replace standalone media marker paragraphs in trusted, rendered repository Markdown. */
export function insertGuideMedia(html:string) {
  let tableNumber=0;
  let section='Reference';
  return html
    .replace(/<p>\[\[media:([a-z0-9-]+)\]\]<\/p>/g,(_paragraph,id:string)=>mediaHTML(id))
    .replace(/(<h[23][^>]*>)([\s\S]*?)(<\/h[23]>)|<table([\s>])/g,(_match,start:string,title:string,end:string,ending:string)=>{
      if(start){section=title.replace(/<[^>]*>/g,'');return start+title+end;}
      const label=section.replace(/[\"<>]/g,'');
      return `<p class="table-scroll-hint" data-pagefind-ignore>Scroll to compare all columns ↔</p><div class="guide-table" tabindex="0" role="region" aria-label="${label} — reference table ${++tableNumber}"><table${ending}`;
    })
    .replace(/<\/table>/g,'</table></div>');
}
