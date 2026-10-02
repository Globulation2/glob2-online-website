type Entry={rank:number;username:string;rating:number;games:number;provisional:boolean};
const panel=document.querySelector<HTMLElement>('[data-ranking-url]');
if(panel){
const status=panel.querySelector<HTMLElement>('.ranking-status')!;
const table=panel.querySelector<HTMLElement>('.ranking-table')!;
const updated=panel.querySelector<HTMLElement>('.ranking-updated')!;
const tbody=panel.querySelector('tbody')!;
const controller=new AbortController();const timeout=setTimeout(()=>controller.abort(),8000);
fetch(panel.dataset.rankingUrl!,{credentials:'omit',signal:controller.signal}).then(async response=>{if(!response.ok)throw Error('Unavailable');return response.json();}).then(data=>{
const time=Date.parse(data.generatedAt);
if(data.schemaVersion!==1||data.ratingPolicy!=='openskill-plackett-luce-v1'||data.ladder!=='ranked-1v1'||typeof data.hasMore!=='boolean'||typeof data.backendRevision!=='string'||!Number.isFinite(time)||time>Date.now()+60000||!Array.isArray(data.entries)||data.entries.length>10000)throw Error('Invalid feed');
const entries:Entry[]=data.entries;
if(entries.some((entry,index)=>!entry||typeof entry.username!=='string'||entry.username.length===0||entry.username.length>128||/[\u0000-\u001f\u007f]/.test(entry.username)||!Number.isFinite(entry.rating)||!Number.isSafeInteger(entry.rank)||entry.rank<1||(index>0&&entry.rank<entries[index-1].rank)||!Number.isSafeInteger(entry.games)||entry.games<0||typeof entry.provisional!=='boolean'))throw Error('Invalid entries');
const stale=Date.now()-time>15*60*1000;
status.textContent=entries.length?(stale?'Ratings are more than 15 minutes old. Updates may be delayed.':'Latest available player ratings.'):'No public player ratings are available yet.';
updated.textContent=`Updated ${new Date(time).toLocaleString()}.${data.hasMore?' Showing the top players. Open the online hub for the full leaderboard.':''}`;
entries.forEach(entry=>{const row=document.createElement('tr');for(const value of [entry.rank,`${entry.username}${entry.provisional?' (provisional)':''}`,entry.rating.toFixed(1),entry.games]){const cell=document.createElement('td');cell.textContent=String(value);row.append(cell);}tbody.append(row);});table.hidden=!entries.length;
}).catch(()=>{status.textContent='Player ratings are temporarily unavailable. Please try again later.';}).finally(()=>clearTimeout(timeout));
}
