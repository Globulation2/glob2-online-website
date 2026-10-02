import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
// Keep generated scripts external so Firebase’s script-src 'self' CSP can execute them.
export default defineConfig({site:'https://glob2online.com',output:'static',vite:{build:{assetsInlineLimit:0}},integrations:[sitemap({filter: (page) => !page.includes('/design/')})]});
