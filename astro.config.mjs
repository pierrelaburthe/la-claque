import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// « La Claque » — site statique, servi à la racine du domaine la-claque.com
// (GitHub Pages avec domaine personnalisé). base '/' partout : plus de
// sous-chemin /la-claque. Les URLs internes passent toujours par le helper
// src/lib/url.ts (qui devient un simple passe-plat, BASE_URL = '/').
export default defineConfig({
  site: 'https://la-claque.com',
  base: '/',
  trailingSlash: 'ignore',
  build: { format: 'directory' },
  integrations: [sitemap()],
});
