// Keep Pagefind's local index, type filters, and section-level results.
const search=document.getElementById('search');
search.setAttribute('aria-busy','true');
search.textContent='Loading search…';
import('/pagefind/pagefind-ui.js').then(()=>{
  search.replaceChildren();
  new window.PagefindUI({element:'#search',showSubResults:true,showImages:false});
  const input=search.querySelector('input');
  if(input){input.id='site-search';input.removeAttribute('title');}
  const label=document.querySelector('label.search-label');
  if(label)label.hidden=false;
  search.setAttribute('aria-busy','false');
}).catch(()=>{
  search.setAttribute('aria-busy','false');
  search.setAttribute('role','status');
  search.textContent='Search is temporarily unavailable. Browse the collections below to find an article.';
});
