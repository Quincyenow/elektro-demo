// @ts-check
import { defineConfig } from 'astro/config';

import vercel from '@astrojs/vercel';

import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://elektro-demo-indol.vercel.app',
  adapter: vercel(),
  integrations: [sitemap()]
});
