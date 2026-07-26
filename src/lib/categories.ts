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

// Slug d'URL pour les pages hub /critiques/genre/[slug].
export const CATEGORIE_SLUG: Record<Categorie, string> = {
  'Théâtre': 'theatre',
  'Comédie': 'comedie',
  'Seul-en-scène': 'seul-en-scene',
  'Clown & mime': 'clown-mime',
  'Danse': 'danse',
  'Musical': 'musical',
  'Immersif & impro': 'immersif-impro',
};

export const categorieBySlug = (slug: string): Categorie | undefined =>
  (Object.keys(CATEGORIE_SLUG) as Categorie[]).find((c) => CATEGORIE_SLUG[c] === slug);

// Textes SEO par catégorie, pour les pages hub par genre.
export interface CategorieMeta {
  titre: string; // <title>
  h1: string;
  kicker: string;
  intro: string; // chapô de la page
  desc: string; // meta description
}

export const CATEGORIE_META: Record<Categorie, CategorieMeta> = {
  'Théâtre': {
    titre: "Théâtre au OFF d'Avignon 2026 : nos critiques et avis | La Claque",
    h1: "Théâtre au OFF d'Avignon 2026",
    kicker: 'Genre',
    intro: "Pièces de troupe, drames, créations et classiques revisités : le gros du répertoire du OFF, vu et noté par la bande. Voici nos critiques de théâtre, des plus grosses claques aux paris qu'on défend.",
    desc: "Nos critiques et avis des pièces de théâtre du OFF d'Avignon 2026 : drames, créations et classiques revisités, notés et racontés par La Claque.",
  },
  'Comédie': {
    titre: "Comédies au OFF d'Avignon 2026 : nos critiques et avis | La Claque",
    h1: "Comédies au OFF d'Avignon 2026",
    kicker: 'Genre',
    intro: "Comédies, satires, farces et stand-up : tout ce qui nous a fait rire au OFF cette année. Nos critiques des spectacles les plus drôles du festival, notés sans bouder notre plaisir.",
    desc: "Nos critiques et avis des comédies du OFF d'Avignon 2026 : satires, farces, stand-up et spectacles pour rire, notés et racontés par La Claque.",
  },
  'Seul-en-scène': {
    titre: "Seuls en scène au OFF d'Avignon 2026 : nos critiques | La Claque",
    h1: "Seuls en scène au OFF d'Avignon 2026",
    kicker: 'Genre',
    intro: "La forme reine du OFF : un interprète, un plateau, un récit. Récits intimes, galeries de personnages, confessions : nos critiques des meilleurs seuls-en-scène du festival.",
    desc: "Nos critiques et avis des seuls-en-scène du OFF d'Avignon 2026 : solos, monologues et récits portés par un seul interprète, notés par La Claque.",
  },
  'Clown & mime': {
    titre: "Clown et mime au OFF d'Avignon 2026 : nos critiques | La Claque",
    h1: "Clown et mime au OFF d'Avignon 2026",
    kicker: 'Genre',
    intro: "Le théâtre du corps et du silence : clown, mime, comédie quasi muette. Des spectacles qui font tout passer par le geste, et qu'on a adoré raconter.",
    desc: "Nos critiques des spectacles de clown et de mime du OFF d'Avignon 2026 : le théâtre du corps et du geste, noté et raconté par La Claque.",
  },
  'Danse': {
    titre: "Danse au OFF d'Avignon 2026 : nos critiques | La Claque",
    h1: "Danse au OFF d'Avignon 2026",
    kicker: 'Genre',
    intro: "Danse et danse-théâtre : quand le mouvement raconte. Nos critiques des spectacles chorégraphiques repérés au OFF.",
    desc: "Nos critiques des spectacles de danse et de danse-théâtre du OFF d'Avignon 2026, notés et racontés par La Claque.",
  },
  'Musical': {
    titre: "Théâtre musical au OFF d'Avignon 2026 : nos critiques | La Claque",
    h1: "Théâtre musical au OFF d'Avignon 2026",
    kicker: 'Genre',
    intro: "Quand le plateau se met à chanter : comédies musicales et spectacles où la musique porte le récit. Nos critiques du OFF.",
    desc: "Nos critiques des comédies musicales et spectacles de théâtre musical du OFF d'Avignon 2026, notés et racontés par La Claque.",
  },
  'Immersif & impro': {
    titre: "Théâtre immersif et impro au OFF d'Avignon 2026 : nos critiques | La Claque",
    h1: "Immersif et impro au OFF d'Avignon 2026",
    kicker: 'Genre',
    intro: "Les formes qui cassent le quatrième mur : théâtre immersif, interactif, improvisation. Des spectacles où le public n'est jamais tout à fait spectateur. Nos critiques.",
    desc: "Nos critiques des spectacles de théâtre immersif, interactif et d'improvisation du OFF d'Avignon 2026, notés et racontés par La Claque.",
  },
};

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
