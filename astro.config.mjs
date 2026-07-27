import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// « La Claque » — site statique, servi à la racine du domaine la-claque.com
// (GitHub Pages avec domaine personnalisé). base '/' partout : plus de
// sous-chemin /la-claque. Les URLs internes passent toujours par le helper
// src/lib/url.ts (qui devient un simple passe-plat, BASE_URL = '/').
// Anciennes fiches de plumes : le site a longtemps signé ses critiques sous
// huit noms de scène, chacun avec sa page. Un seul rédacteur signe désormais,
// et ces pages renvoient vers « Qui écrit ici ».
const ANCIENNES_PLUMES = [
  'juliette-courjardin',
  'pierrot-strapontin',
  'arlequin-lavant-scene',
  'eraste-praticable',
  'horace-delarampe',
  'crispin-troiscoups',
  'lisette-servante',
  'silvia-generale',
];

export default defineConfig({
  site: 'https://la-claque.com',
  base: '/',
  trailingSlash: 'ignore',
  build: { format: 'directory' },
  integrations: [sitemap()],
  redirects: Object.fromEntries(
    ANCIENNES_PLUMES.map((slug) => [`/equipe/${slug}`, '/equipe']),
  ),
});
