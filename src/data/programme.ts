// « Au programme » : les spectacles qu'on a repérés mais PAS ENCORE VUS.
// Source : notre tableur commun (colonne Description). Ce ne sont pas des
// critiques, mais des notes de repérage, à la voix de la bande, sans rien
// inventer sur le contenu des pièces. La critique viendra après le lever de rideau.
export interface Repere {
  slug: string;
  titre: string;
  genre: string;
  lieu?: string;
  ville?: string; // Paris, Avignon…
  periode?: string; // « à la rentrée », « OFF 2026 »
  contexte?: 'rentree' | 'avignon'; // défaut : avignon (repérages du OFF)
  note: string; // pourquoi c'est sur notre liste
  lien?: string; // billetterie / fiche, seulement si URL réelle
}

export const PROGRAMME: Repere[] = [
  // ---- La rentrée parisienne (toute l'année) ----
  {
    slug: 'courir-a-la-catastrophe',
    titre: 'Courir à la catastrophe',
    genre: 'Seul en scène',
    lieu: 'Théâtre La Flèche',
    ville: 'Paris 11ᵉ',
    periode: 'À la rentrée',
    contexte: 'rentree',
    note: "Le seul-en-scène d'Antoine Heuillet : l'aveu d'un garçon anxieux et rêveur qui avance dans une vie chaotique, entre chutes, premiers amours et éclats de résilience. On y va à la rentrée.",
    lien: 'https://www.billetreduc.com/spectacle/courir-a-la-catastrophe-398348',
  },
  {
    slug: 'the-loop',
    titre: 'The Loop',
    genre: 'Comédie',
    ville: 'Paris',
    periode: 'À la rentrée',
    contexte: 'rentree',
    note: "La comédie à boucle temporelle de Robin Goupil, Molière 2025 de la meilleure comédie : une enquête pour meurtre rejouée à l'infini, dix comédiens et un rythme démentiel. De retour à Paris, on ne la manquera pas.",
    lien: 'https://www.billetreduc.com/spectacle/the-loop-391973',
  },
  // ---- Repérés au OFF d'Avignon 2026 ----
  {
    slug: 'le-schpountz',
    titre: 'Le Schpountz',
    genre: 'Théâtre (d’après Pagnol)',
    note: "D’après Pagnol : la comédie d’un naïf qui se rêve tragédien et découvre le cinéma. Le pitch nous met déjà en joie.",
    lien: 'https://www.festivaloffavignon.com/spectacles/8050-le-schpountz',
  },
  {
    slug: 'bel-ami',
    titre: 'Bel Ami',
    genre: 'Théâtre (d’après Maupassant)',
    note: "Une avalanche de prix, à l’affiche du OFF depuis trois ans, et on aime beaucoup le roman de Maupassant. Difficile de passer à côté.",
    lien: 'https://www.festivaloffavignon.com/spectacles/9015-bel-ami',
  },
  {
    slug: 'cold-cuts',
    titre: 'Cold Cuts',
    genre: 'Théâtre',
    lieu: 'Le 11',
    note: "Un thriller sur les violences conjugales, dans la programmation très solide du 11. Le sujet et le ton nous attirent.",
  },
  {
    slug: 'ils-ont-rate-l-histoire',
    titre: 'Ils ont raté l’histoire',
    genre: 'Seul en scène',
    note: "Un seul-en-scène qui déterre les anecdotes que la grande Histoire a laissées de côté. On est curieux.",
    lien: 'https://www.billetreduc.com/spectacle/ils-ont-rate-l-histoire-397626',
  },
  {
    slug: 'revue',
    titre: 'Revue',
    genre: 'Danse-théâtre',
    lieu: 'Le Train Bleu',
    note: "Un spectacle de danse-théâtre au Train Bleu, une salle qui a du nez. Ce qu’on en voit passer donne très envie.",
  },
  {
    slug: 'journal-d-un-fou',
    titre: 'Journal d’un fou',
    genre: 'Seul en scène (d’après Gogol)',
    note: "Le classique de Gogol porté seul en scène, avec de belles références. Un pari qu’on a envie de tenter.",
  },
  {
    slug: 'kiss',
    titre: 'KISS',
    genre: 'Théâtre',
    lieu: 'Le 11',
    note: "Sa question de départ nous intrigue : deux interprètes peuvent-ils cesser de « jouer » pour vivre un vrai baiser d’amour sur le plateau ?",
  },
  {
    slug: 'le-bourgeois-gentilhomme',
    titre: 'Le Bourgeois gentilhomme',
    genre: 'Théâtre (Molière)',
    note: "Le Molière revisité aux codes du XXIᵉ siècle, avec d’excellents retours de spectateurs. On veut voir ce que ça donne.",
    lien: 'https://www.tatouvu.com/w/wwa_FicheSpec/public/33716/spectacle-bourgeois-gentilhomme-le.html',
  },
  {
    slug: 'monsieur-motobecane',
    titre: 'Monsieur Motobécane',
    genre: 'Théâtre',
    note: "Un OVNI déjà passé plusieurs fois à Avignon et chaudement recommandé. La curiosité est piquée.",
    lien: 'https://www.tatouvu.com/w/wwa_FicheSpec/adh/33660/spectacle-monsieur-motobecane.html',
  },
  {
    slug: 'ne-t-arrete-pas-de-courir',
    titre: 'Ne t’arrête pas de courir',
    genre: 'Seul en scène',
    note: "Un seul-en-scène autour du sport et du dépassement de soi. Le pitch nous plaît beaucoup.",
  },
  {
    slug: 'une-heure-de-philosophie',
    titre: 'Une heure de philosophie',
    genre: 'Théâtre',
    note: "Apprendre la philo en une heure, promettent-ils, et les retours sont excellents. On y jettera un œil.",
  },
  {
    slug: 'le-temps-des-ogres',
    titre: 'Le Temps des ogres',
    genre: 'Marionnettes',
    lieu: 'Les 3 Raisins',
    note: "Des marionnettes à la manière de Ionesco, et un tractage qui donne le sourire. Ça nous parle.",
  },
  {
    slug: 'mais-ne-te-promene-donc-pas-toute-nue',
    titre: 'Mais ne te promène donc pas toute nue',
    genre: 'Théâtre (Feydeau)',
    note: "Du Feydeau, ses quiproquos et ses portes qui claquent, très bien accueilli. Une valeur sûre de rigolade.",
    lien: 'https://www.festivaloffavignon.com/spectacles/8926-mais-n-te-promene-donc-pas-toute-nue',
  },
  {
    slug: 'antigone-des-supermarches',
    titre: 'Antigone des supermarchés',
    genre: 'Seul en scène',
    lieu: 'Le 11',
    note: "Le seul-en-scène intime et politique d’une comédienne qui a passé une grande partie de sa vie à se cacher. Le genre de récit qu’on ne veut pas rater.",
  },
  {
    slug: 'la-horde-du-contrevent',
    titre: 'La Horde du Contrevent',
    genre: 'Théâtre (d’après Alain Damasio)',
    lieu: 'Le 3T',
    note: "L’adaptation scénique du roman culte d’Alain Damasio. Un défi de plateau qu’on a hâte de voir relevé.",
  },
  {
    slug: 'la-prochaine-fois-que-tu-mordras-la-poussiere',
    titre: 'La prochaine fois que tu mordras la poussière',
    genre: 'Seul en scène',
    note: "La pièce d’après le récit de Panayotis Pascot. On est intrigués par ce passage à la scène.",
    lien: 'https://www.festivaloffavignon.com/spectacles/7985-la-prochaine-fois-que-tu-mordras-la-poussiere',
  },
  {
    slug: 'alexis-tramoni-le-meilleur-et-le-pire',
    titre: 'Alexis Tramoni — Le meilleur et le pire',
    genre: 'Stand-up',
    note: "Un humoriste qu’on apprécie, même quand ça tape franchement sous la ceinture. On ira se faire secouer.",
  },
  {
    slug: 'polar-polar',
    titre: 'Polar polar',
    genre: 'Théâtre',
    lieu: 'Le Roi René',
    note: "Chaudement recommandé par une amie de confiance. Ça suffit à le mettre sur la liste.",
  },
];
