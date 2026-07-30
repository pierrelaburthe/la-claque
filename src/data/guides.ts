// Source unique de vérité pour tous nos guides.
// Sert au hub /guides, au maillage interne (composant RelatedGuides),
// aux liens contextuels depuis les critiques et à llms.txt.
export type GuideSection = 'spectateur' | 'metier';

export interface Guide {
  slug: string; // sans le préfixe /guides/
  k: string; // sur-titre (kicker)
  titre: string;
  desc: string;
  section: GuideSection;
}

export const GUIDES: Guide[] = [
  // ---- Côté spectateur ----
  {
    slug: 'festival-in-et-off-avignon',
    k: 'Comprendre le festival',
    titre: "Festival IN et OFF d'Avignon : quelle différence ?",
    desc: "Deux festivals, une même ville. Programmation sélective contre accès libre, histoire, lieux, billetterie.",
    section: 'spectateur',
  },
  {
    slug: 'chiffres-cles-festival-avignon',
    k: 'Chiffres et fréquentation',
    titre: "Le Festival d'Avignon en chiffres",
    desc: "Fréquentation, nombre de spectacles, de compagnies, taux de remplissage : les statistiques du IN et du OFF, sourcées.",
    section: 'spectateur',
  },
  {
    slug: 'off-avignon-mode-demploi',
    k: 'Guide pratique',
    titre: "Le OFF d'Avignon, mode d'emploi",
    desc: "Choisir ses spectacles, décrypter le tractage, utiliser la carte OFF et survivre à trois semaines de théâtre.",
    section: 'spectateur',
  },
  {
    slug: 'salles-du-off-avignon',
    k: 'Les salles',
    titre: "Les salles du OFF d'Avignon",
    desc: "Quartier, jauge et ligne artistique des principaux théâtres, avec nos critiques jouées dans chacun.",
    section: 'spectateur',
  },
  {
    slug: 'lexique-du-theatre',
    k: 'Vocabulaire',
    titre: 'Lexique du théâtre : les mots à connaître',
    desc: "Côté cour, côté jardin, la générale, la servante : le vocabulaire des plateaux, expliqué simplement.",
    section: 'spectateur',
  },
  {
    slug: 'genres-du-theatre',
    k: 'Comprendre le théâtre',
    titre: 'Les différents genres théâtraux : définitions et exemples',
    desc: "Tragédie, comédie, drame, vaudeville, boulevard, seul-en-scène, café-théâtre : la définition de chaque genre, avec des exemples.",
    section: 'spectateur',
  },
  {
    slug: 'la-claque-au-theatre',
    k: 'Histoire du théâtre',
    titre: "La claque au théâtre : les applaudisseurs professionnels",
    desc: "Des spectateurs payés pour applaudir, un chef, des rieurs et des pleureurs : l'histoire du mot qui nous a donné notre nom.",
    section: 'spectateur',
  },
  {
    slug: 'choisir-sa-place-au-theatre',
    k: 'Guide pratique',
    titre: 'Bien choisir sa place au théâtre',
    desc: "Orchestre, corbeille, balcon, poulailler : où s'asseoir selon la salle, le spectacle et son budget, sans mauvaise surprise.",
    section: 'spectateur',
  },
  {
    slug: 'etiquette-au-theatre',
    k: 'Savoir-vivre',
    titre: 'Aller au théâtre : le guide du savoir-vivre',
    desc: "Quand applaudir, comment s'habiller, que faire en cas de retard : les usages de la salle, sans snobisme.",
    section: 'spectateur',
  },
  {
    slug: 'les-molieres-recompenses-theatre',
    k: 'Récompenses',
    titre: 'Les Molières : le guide des récompenses du théâtre',
    desc: "La grande cérémonie du théâtre français depuis 1987 : son histoire, ses catégories, et à quoi sert un Molière.",
    section: 'spectateur',
  },
  {
    slug: 'grands-auteurs-theatre-francais',
    k: 'Comprendre le théâtre',
    titre: 'Les grands auteurs du théâtre français',
    desc: "Molière, Racine, Marivaux, Hugo, Feydeau : dix dramaturges qui ont façonné la scène française, et ce qu'on joue encore d'eux.",
    section: 'spectateur',
  },
  {
    slug: 'emmener-un-enfant-au-theatre',
    k: 'En famille',
    titre: 'Emmener un enfant au théâtre : à quel âge et quoi voir',
    desc: "À partir de quel âge, quels spectacles, comment préparer la sortie : le guide pour une première fois réussie au théâtre.",
    section: 'spectateur',
  },
  {
    slug: 'theatre-a-paris-guide-des-salles',
    k: 'À Paris',
    titre: 'Le théâtre à Paris : guide des quartiers et des salles',
    desc: "Grands Boulevards, rive gauche, théâtres nationaux : comment s'y retrouver dans la géographie théâtrale parisienne, toute l'année.",
    section: 'spectateur',
  },
  // ---- Côté métier ----
  {
    slug: 'intermittence-spectacle',
    k: 'Statut et droits',
    titre: "L'intermittence du spectacle, expliquée simplement",
    desc: "Les annexes 8 et 10, le seuil de 507 heures, le cachet, la date anniversaire et les organismes à connaître.",
    section: 'metier',
  },
  {
    slug: 'obtenir-son-intermittence',
    k: 'Statut et droits',
    titre: 'Comment obtenir son intermittence, étape par étape',
    desc: "Réunir ses 507 heures, rassembler ses AEM, s'inscrire à France Travail et s'actualiser chaque mois.",
    section: 'metier',
  },
  {
    slug: 'le-cachet-et-le-decompte-des-heures',
    k: 'Statut et droits',
    titre: 'Le cachet et le décompte des heures',
    desc: "La règle des 12 heures, la fin du cachet groupé, les plafonds mensuels et les heures d'enseignement.",
    section: 'metier',
  },
  {
    slug: 'budget-festival-off-avignon',
    k: 'Production et diffusion',
    titre: "Combien coûte le OFF d'Avignon ?",
    desc: "Le budget d'une compagnie poste par poste, avec un simulateur : salle, transport, logement, repas, com.",
    section: 'metier',
  },
  {
    slug: 'comment-se-faire-produire',
    k: 'Production et diffusion',
    titre: 'Comment se faire produire et programmer',
    desc: "Produire, diffuser, tourner : qui fait quoi ? Le modèle autofinancé du OFF et les aides à la création.",
    section: 'metier',
  },
  {
    slug: 'creer-sa-compagnie-de-theatre',
    k: 'Créer une structure',
    titre: 'Créer sa compagnie de théâtre',
    desc: "Association loi 1901, déclaration d'entrepreneur de spectacles, GUSO : les démarches de base pour se lancer.",
    section: 'metier',
  },
];

export const guideBySlug = (slug: string): Guide | undefined =>
  GUIDES.find((g) => g.slug === slug);

export const guidesForSection = (section: GuideSection): Guide[] =>
  GUIDES.filter((g) => g.section === section);
