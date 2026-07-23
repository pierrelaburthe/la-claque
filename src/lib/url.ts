// Préfixe toutes les URLs internes (liens et affiches) par le base path Astro.
// BASE vaut '/' en local, '/la-claque/' sur GitHub Pages.
const BASE = import.meta.env.BASE_URL;

export function url(path: string = '/'): string {
  return BASE.replace(/\/$/, '') + '/' + String(path).replace(/^\//, '');
}
