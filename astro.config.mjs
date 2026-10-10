import { defineConfig } from 'astro/config';
import {unified} from '@astrojs/markdown-remark';
import sitemap from '@astrojs/sitemap';
import {remarkDirective, articleDirectives} from './src/lib/article-directives.mjs';
// Keep generated scripts external so Firebase’s script-src 'self' CSP can execute them.
export default defineConfig({site:'https://glob2online.com',output:'static',markdown:{processor:unified({remarkPlugins:[remarkDirective,articleDirectives]})},vite:{build:{assetsInlineLimit:0}},integrations:[sitemap({filter: (page) => !page.includes('/design/')})]});
