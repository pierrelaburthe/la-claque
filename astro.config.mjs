import { defineConfig } from 'astro/config';

// « La Claque » — site statique.
// En local, servi à la racine (base '/'). En CI (GitHub Actions), servi sous
// le sous-chemin du repo GitHub Pages. Les URLs internes passent toutes par le
// helper src/lib/url.ts, qui s'appuie sur import.meta.env.BASE_URL.
const onPages = process.env.GITHUB_ACTIONS === 'true';

export default defineConfig({
  site: 'https://pierrelaburthe.github.io',
  base: onPages ? '/la-claque' : '/',
  trailingSlash: 'ignore',
  build: { format: 'directory' },
});
