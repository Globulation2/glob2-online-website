/** Local MCP observer for the isolated public native instructional session.
 * Lease material is stored only in the ignored output tree, never logged.
 * No direct simulation-state injection, Hive program or undocumented endpoint is used.
 */
import fs from 'node:fs/promises';
import path from 'node:path';
const [output, operation = 'inspect', target] = process.argv.slice(2);
if (!output) throw new Error('Provide an ignored artifacts output directory');
const root = path.resolve('artifacts');
const directory = path.resolve(output);
if (!directory.startsWith(root + path.sep)) throw new Error('Output must be below artifacts/');
await fs.mkdir(directory, { recursive: true });
const leasePath = path.join(directory, 'lease-private.json');
async function call(name, args) {
 const response = await fetch('http://127.0.0.1:27207/mcp', { method:'POST', headers:{'Content-Type':'application/json',Accept:'application/json, text/event-stream','MCP-Protocol-Version':'2025-11-25'},body:JSON.stringify({jsonrpc:'2.0',id:1,method:'tools/call',params:{name,arguments:args}})});
 if(!response.ok) throw new Error(`MCP HTTP ${response.status}`);
 const rpc=await response.json();
 if(rpc.error || rpc.result?.isError) throw new Error(JSON.stringify(rpc.error || rpc.result));
 const result=rpc.result;
 return result.structuredContent || JSON.parse(result.content.find(item=>item.type==='text').text);
}
let lease;
try {const raw=JSON.parse(await fs.readFile(leasePath,'utf8'));lease=raw.token?raw:raw.result.structuredContent || JSON.parse(raw.result.content.find(item=>item.type==='text').text);}
catch(error){if(error.code!=='ENOENT')throw error;lease=await call('ui_acquire_control',{inspect:true});await fs.writeFile(leasePath,JSON.stringify(lease));}
const token=lease.token;
const initialState=await call('ui_inspect',{token});
lease.viewport_id=initialState.viewport_id;
let inspection=initialState.inspection;
if(operation==='release'){await call('ui_release_control',{token});await fs.unlink(leasePath);console.log(JSON.stringify({released:true}));process.exit(0);}
function entries(node,surface,found=[]){if(node.key)found.push({surface,key:node.key,label:node.label,revision:node.revision,actions:node.actions,visible:node.visible,enabled:node.enabled});for(const child of node.children||[])entries(child,surface,found);return found;}
function controls(snapshot){return snapshot.surfaces.flatMap(surface=>surface.controls.flatMap(node=>entries(node,surface.instance)));}
if(operation==='activate'||operation==='set'||operation==='file'){
 const [controlKey,controlValue]=target.split('=');
 const matches=controls(inspection).filter(item=>(operation==='file'?item.key.startsWith('files/')&&item.label===target:item.key===controlKey)&&item.enabled&&item.visible?.w>0&&item.actions.includes(operation==='set'?'set_value':'activate'));
 if(matches.length!==1)throw new Error(`Expected one visible actionable ${target}, found ${matches.length}`);
 const item=matches[0];await call('ui_act',{token,surface:item.surface,key:item.key,revision:item.revision,action:operation==='set'?'set_value':'activate',...(operation==='set'?{value:Number(controlValue)}:{})});
 await new Promise(resolve=>setTimeout(resolve,250));
 inspection=(await call('ui_inspect',{token})).inspection;
 await fs.appendFile(path.join(directory,'actions.jsonl'),JSON.stringify({time:new Date().toISOString(),operation,target,inspection})+'\n');
}
if(operation==='scroll'){const [x,y,dy]=target.split(',').map(Number);await call('ui_scroll',{token,x,y,dx:0,dy,viewport_id:lease.viewport_id});await new Promise(resolve=>setTimeout(resolve,250));inspection=(await call('ui_inspect',{token})).inspection;await fs.appendFile(path.join(directory,'actions.jsonl'),JSON.stringify({time:new Date().toISOString(),operation,target,inspection})+'\n');}
if(operation==='move'){const [x,y]=target.split(',').map(Number);if(!Number.isFinite(x)||!Number.isFinite(y))throw new Error('Expected screenshot x,y');await call('ui_move',{token,x,y,viewport_id:lease.viewport_id});await new Promise(resolve=>setTimeout(resolve,1000));inspection=(await call('ui_inspect',{token})).inspection;await fs.appendFile(path.join(directory,'actions.jsonl'),JSON.stringify({time:new Date().toISOString(),operation,target,inspection})+'\n');}
if(operation==='click'){const [x,y]=target.split(',').map(Number);if(!Number.isFinite(x)||!Number.isFinite(y))throw new Error('Expected screenshot x,y');await call('ui_click',{token,x,y,viewport_id:lease.viewport_id});await new Promise(resolve=>setTimeout(resolve,250));inspection=(await call('ui_inspect',{token})).inspection;await fs.appendFile(path.join(directory,'actions.jsonl'),JSON.stringify({time:new Date().toISOString(),operation,target,inspection})+'\n');}
if(operation==='key'){await call('ui_key',{token,key:target});await new Promise(resolve=>setTimeout(resolve,250));inspection=(await call('ui_inspect',{token})).inspection;await fs.appendFile(path.join(directory,'actions.jsonl'),JSON.stringify({time:new Date().toISOString(),operation,target,inspection})+'\n');}
if(operation==='screenshot'){
 if(!/^[a-z0-9-]+$/.test(target||''))throw new Error('Screenshot name required');
 const response=await fetch('http://127.0.0.1:27207/mcp',{method:'POST',headers:{'Content-Type':'application/json',Accept:'application/json, text/event-stream','MCP-Protocol-Version':'2025-11-25'},body:JSON.stringify({jsonrpc:'2.0',id:2,method:'tools/call',params:{name:'ui_screenshot',arguments:{token}}})});
 const rpc=await response.json();if(rpc.error||rpc.result?.isError)throw new Error('Screenshot failed');
 const image=rpc.result.content.find(item=>item.type==='image');if(!image)throw new Error('No screenshot returned');
 await fs.writeFile(path.join(directory,`${target}.png`),Buffer.from(image.data,'base64'));
 await fs.writeFile(path.join(directory,`${target}.json`),JSON.stringify(inspection,null,2));
}
console.log(JSON.stringify({screen:inspection.screen,operation,target,...(operation==='inspect'?{controls:controls(inspection).filter(item=>item.actions?.length&&(!target||item.key.startsWith(target)))}:{})}));
