// Pagefind's search box gets the page's visible label (search.astro), so it is
// not labelled by its title attribute alone.
import('/pagefind/pagefind-ui.js').then(()=>{
  new window.PagefindUI({element:'#search',showSubResults:true,showImages:false});
  const input=document.querySelector('#search input');
  if(input){input.id='site-search';input.removeAttribute('title');}
  const label=document.querySelector('label.search-label');
  if(label)label.hidden=false;
}).catch(()=>{document.getElementById('search').textContent='Search is temporarily unavailable. Browse the guides and archive using the navigation.';});
