// Préfixe toutes les URLs internes (liens et affiches) par le base path Astro.
// BASE vaut '/' partout depuis la bascule sur le domaine la-claque.com.
// Le helper reste en place pour garder les liens robustes si le base change.
const BASE = import.meta.env.BASE_URL;

export function url(path: string = '/'): string {
  return BASE.replace(/\/$/, '') + '/' + String(path).replace(/^\//, '');
}
