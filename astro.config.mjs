import { syncDesignSystem, stageDesignAssets } from './scripts/design-system.mjs';
import { fileURLToPath } from 'node:url';
const designSystem = syncDesignSystem();
stageDesignAssets(fileURLToPath(new URL('./public', import.meta.url)), designSystem);
import { defineConfig } from 'astro/config';
import {unified} from '@astrojs/markdown-remark';
import sitemap from '@astrojs/sitemap';
import {remarkDirective, articleDirectives} from './src/lib/article-directives.mjs';
// Keep generated scripts external so Firebase’s script-src 'self' CSP can execute them.
export default defineConfig({site:'https://glob2.online',output:'static',markdown:{processor:unified({remarkPlugins:[remarkDirective,articleDirectives]})},vite:{build:{assetsInlineLimit:0}},integrations:[sitemap({filter: (page) => !page.includes('/design/')})]});
