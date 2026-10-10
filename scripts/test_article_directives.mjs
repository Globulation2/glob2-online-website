import test from 'node:test';
import assert from 'node:assert/strict';
import {unified as markdown} from '@astrojs/markdown-remark';
import {remarkDirective, articleDirectives} from '../src/lib/article-directives.mjs';
const renderer=await markdown({remarkPlugins:[remarkDirective,articleDirectives]}).createRenderer({});
test('legacy media markers remain exact inside explicit groups',async()=>{
 const {code}=await renderer.render(':::media-group\n\n[[media:scene]]\n\n[[media:detail]]\n\n:::');
 assert.match(code,/class="media-group"/);
 assert.match(code,/<p>\[\[media:scene\]\]<\/p>/);
 assert.match(code,/<p>\[\[media:detail\]\]<\/p>/);
});
test('inline colons are preserved and supported callouts remain readable',async()=>{
 const {code}=await renderer.render('Compare Food:stock and :literal[example].\n\n:::warning\nKeep food supplied.\n:::');
 assert.match(code,/Food:stock/);assert.match(code,/:literal\[example\]/);
 assert.match(code,/role="note"/);assert.match(code,/aria-label="Warning"/);
 assert.match(code,/Keep food supplied\./);
});
test('unknown blocks fail instead of dropping article content',async()=>{
 await assert.rejects(renderer.render(':::unsupported\nImportant instruction\n:::'),/Unknown article directive/);
});
