// Préfixe toutes les URLs internes par le base path Astro, et normalise le
// slash final.
//
// BASE vaut '/' partout depuis la bascule sur le domaine la-claque.com. Le
// helper reste en place pour garder les liens robustes si le base change.
//
// Le slash final n'est pas cosmétique : le site est construit en
// `format: 'directory'`, donc GitHub Pages sert /critiques/xxx/ et répond 301
// sur /critiques/xxx. Tant que les liens internes sortaient sans slash, chaque
// clic et chaque passage de robot payait une redirection, et la balise
// canonique (qui, elle, porte le slash) ne correspondait à aucun lien du site.
const BASE = import.meta.env.BASE_URL;

// Un dernier segment contenant un point est un fichier (/rss.xml, /og/x.png,
// /fonts/fonts.css) : surtout pas de slash final, ça le casserait.
function estFichier(chemin: string): boolean {
  const dernier = chemin.split('/').pop() ?? '';
  return dernier.includes('.');
}

export function url(path: string = '/'): string {
  // On isole la query et l'ancre : « /critiques?cat=Comédie » et
  // « /equipe#auteur » doivent recevoir le slash avant le ? ou le #.
  const brut = String(path);
  const coupe = brut.search(/[?#]/);
  const chemin = coupe === -1 ? brut : brut.slice(0, coupe);
  const suffixe = coupe === -1 ? '' : brut.slice(coupe);

  const prefixe = BASE.replace(/\/$/, '');
  let sortie = prefixe + '/' + chemin.replace(/^\//, '');
  if (!sortie.endsWith('/') && !estFichier(sortie)) sortie += '/';

  return sortie + suffixe;
}
