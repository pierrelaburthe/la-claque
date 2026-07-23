// Les huit plumes de La Claque.
// Noms de scène 100% anonymes : un personnage de la comédie (Colombine, Scapin,
// Arlequin, Crispin, Léandre, Sganarelle, Isabelle, Rosine) marié à un terme du
// jargon des plateaux (côté cour / côté jardin, le strapontin, la servante...).
// Aucun vrai prénom n'apparaît nulle part sur le site.

export type CriticKey =
  | 'julie'
  | 'pierre'
  | 'alexandre'
  | 'etienne'
  | 'henry'
  | 'cedric'
  | 'lucie'
  | 'sana';

export interface Critic {
  key: CriticKey;
  plume: string;      // nom de scène complet
  prenomScene: string; // le prénom de personnage seul (pour les mentions courtes)
  initiales: string;
  couleur: string;
  role: string;       // spécialité éditoriale
  bio: string;
}

export const CRITICS: Record<CriticKey, Critic> = {
  julie: {
    key: 'julie',
    plume: 'Colombine Courjardin',
    prenomScene: 'Colombine',
    initiales: 'CC',
    couleur: '#b23a48',
    role: 'Rédactrice en chef',
    bio: "Côté cour, côté jardin : Colombine connaît toutes les entrées et toutes les sorties du festival. C'est la boussole de la bande, celle qui trace les parcours d'une salle à l'autre. Elle a un faible pour le théâtre d'acteur, l'émotion qui déborde et les jeunes troupes qui n'ont rien à perdre.",
  },
  pierre: {
    key: 'pierre',
    plume: 'Scapin Strapontin',
    prenomScene: 'Scapin',
    initiales: 'SS',
    couleur: '#1f6f6b',
    role: 'Boulimique de salles',
    bio: "Toujours sur un strapontin, jamais rassasié : Scapin enchaîne cinq spectacles par jour sans broncher. Il carbure au rythme, à l'énergie qui déborde du plateau et aux textes qui partent joyeusement dans tous les sens.",
  },
  alexandre: {
    key: 'alexandre',
    plume: 'Arlequin Lavant-Scène',
    prenomScene: 'Arlequin',
    initiales: 'AL',
    couleur: '#7a4fb0',
    role: "L'œil scénographe",
    bio: "Toujours à l'avant-scène pour ne rien rater de la lumière et des décors. Arlequin juge d'abord avec les yeux : une belle image, une scénographie qui respire, un masque qui capte la lumière, et il est déjà conquis.",
  },
  etienne: {
    key: 'etienne',
    plume: 'Crispin Praticable',
    prenomScene: 'Crispin',
    initiales: 'CP',
    couleur: '#c07a1e',
    role: 'Technicien du regard',
    bio: "Un praticable, au théâtre, c'est l'élément de décor sur lequel on peut vraiment monter. Crispin aime quand ça tient debout : la construction, la dramaturgie, la mécanique d'une mise en scène bien huilée.",
  },
  henry: {
    key: 'henry',
    plume: 'Léandre Delarampe',
    prenomScene: 'Léandre',
    initiales: 'LD',
    couleur: '#0e7a9c',
    role: 'Le cœur sur la main',
    bio: "Les feux de la rampe, il ne s'en méfie jamais : Léandre se laisse emporter sans résistance. Un grand show, une émotion sincère, et il applaudit debout avant tout le monde.",
  },
  cedric: {
    key: 'cedric',
    plume: 'Sganarelle Troiscoups',
    prenomScene: 'Sganarelle',
    initiales: 'ST',
    couleur: '#8a6d1f',
    role: 'Gardien du répertoire',
    bio: "Les trois coups avant le lever de rideau, c'est sa musique préférée. Sganarelle défend le texte, la langue et la tradition, avec un faible avoué pour le théâtre de tréteaux et les grands classiques revisités.",
  },
  lucie: {
    key: 'lucie',
    plume: 'Isabelle Servante',
    prenomScene: 'Isabelle',
    initiales: 'IS',
    couleur: '#4a7a3a',
    role: 'Programmatrice et éclaireuse',
    bio: "La servante, c'est la petite lampe qu'on laisse allumée sur les plateaux vides. Isabelle repère les pépites intimes, les seuls-en-scène et les salles de cinquante places, et distribue ses bonnes adresses à toute la bande.",
  },
  sana: {
    key: 'sana',
    plume: 'Rosine Générale',
    prenomScene: 'Rosine',
    initiales: 'RG',
    couleur: '#b0416f',
    role: 'Flair pour les créations',
    bio: "La générale, c'est l'ultime répétition avant la première. Rosine a le nez pour repérer les créations qui vont marcher et les compagnies dont on reparlera. Elle aime prendre des risques et découvrir avant les autres.",
  },
};

export const CRITIC_ORDER: CriticKey[] = [
  'julie', 'pierre', 'alexandre', 'etienne', 'henry', 'cedric', 'lucie', 'sana',
];
