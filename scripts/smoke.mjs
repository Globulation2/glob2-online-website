const base=process.argv[2];if(!base?.startsWith('https://'))throw Error('HTTPS website URL required');
for(const route of ['/','/game/','/learn/','/community/','/competition/','/events/','/news/','/downloads/','/history/','/archive/','/search/']) {
 const response=await fetch(new URL(route,base),{signal:AbortSignal.timeout(15000)});
 if(!response.ok)throw Error(`${route}: ${response.status}`);const html=await response.text();
 if(!html.includes('<h1')||/\.wasm["']|new WebSocket\(/.test(html))throw Error(`${route}: invalid public page`);
 if(!response.headers.get('content-security-policy'))throw Error(`${route}: missing CSP`);
}
const missing=await fetch(new URL('/this-page-does-not-exist/',base));if(missing.status!==404)throw Error('Missing routes must return404');
console.log('Static routes, security headers and404 validated.');
