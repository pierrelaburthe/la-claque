// Regroupe les styles variés des pièces en quelques grandes catégories,
// pour le filtre de la page Critiques.
export const CATEGORIES = [
  'Théâtre',
  'Comédie',
  'Seul-en-scène',
  'Clown & mime',
  'Danse',
  'Musical',
  'Immersif & impro',
] as const;

export type Categorie = (typeof CATEGORIES)[number];

export function categorieFor(style: string): Categorie {
  const s = style.toLowerCase();
  if (s.includes('danse')) return 'Danse';
  if (s.includes('clown') || s.includes('mime') || s.includes('muette')) return 'Clown & mime';
  if (s.includes('seul en scène') || s.includes('seul-en-scène')) return 'Seul-en-scène';
  if (s.includes('musical')) return 'Musical';
  if (s.includes('impro') || s.includes('immersif') || s.includes('interactif')) return 'Immersif & impro';
  if (
    s.includes('comédie') ||
    s.includes('stand-up') ||
    s.includes('policier') ||
    s.includes('policière') ||
    s.includes('documentaire') ||
    s.includes('satirique') ||
    s.includes('farce')
  ) {
    // Une tragi-comédie reste avant tout du théâtre.
    if (s.includes('tragi')) return 'Théâtre';
    return 'Comédie';
  }
  return 'Théâtre';
}
