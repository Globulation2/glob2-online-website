import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
export default defineConfig({site:'https://glob2online.com',output:'static',integrations:[sitemap({filter: (page) => !page.includes('/design/')})]});
