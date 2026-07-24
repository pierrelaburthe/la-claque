// Les huit plumes de La Claque.
// Noms de scène empruntés à la comédie (Juliette, Pierrot, Arlequin, Éraste,
// Horace, Crispin, Lisette, Silvia), mariés à un terme du jargon des plateaux.
// Chaque nom de scène commence par la même lettre que le vrai prénom, pour que
// la bande se reconnaisse, tout en restant anonyme pour le public.

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
  prenomScene: string; // le prénom de personnage seul
  initiales: string;
  couleur: string;
  role: string;       // spécialité éditoriale
  bio: string;        // court et direct
}

export const CRITICS: Record<CriticKey, Critic> = {
  julie: {
    key: 'julie',
    plume: 'Juliette Courjardin',
    prenomScene: 'Juliette',
    initiales: 'JC',
    couleur: '#b23a48',
    role: 'Rédactrice en chef',
    bio: "La boussole de la bande : c'est elle qui trace les parcours et remplit le tableur. Faible pour le théâtre d'acteur et l'émotion qui déborde.",
  },
  pierre: {
    key: 'pierre',
    plume: 'Pierrot Strapontin',
    prenomScene: 'Pierrot',
    initiales: 'PS',
    couleur: '#1f6f6b',
    role: 'Boulimique de salles',
    bio: "Cinq spectacles par jour, minimum. Carbure au rythme et à l'énergie qui déborde du plateau.",
  },
  alexandre: {
    key: 'alexandre',
    plume: 'Arlequin Lavant-Scène',
    prenomScene: 'Arlequin',
    initiales: 'AL',
    couleur: '#7a4fb0',
    role: "L'œil scénographe",
    bio: "Juge d'abord avec les yeux : décor, lumière, belle image de plateau. La scénographie avant tout.",
  },
  etienne: {
    key: 'etienne',
    plume: 'Éraste Praticable',
    prenomScene: 'Éraste',
    initiales: 'EP',
    couleur: '#c07a1e',
    role: 'Technicien du regard',
    bio: "Aime quand la mise en scène tient debout : construction, dramaturgie, mécanique bien huilée.",
  },
  henry: {
    key: 'henry',
    plume: 'Horace Delarampe',
    prenomScene: 'Horace',
    initiales: 'HD',
    couleur: '#0e7a9c',
    role: 'Le cœur sur la main',
    bio: "Se laisse emporter sans résistance. Un grand show, une émotion sincère, et il applaudit debout avant tout le monde.",
  },
  cedric: {
    key: 'cedric',
    plume: 'Crispin Troiscoups',
    prenomScene: 'Crispin',
    initiales: 'CT',
    couleur: '#8a6d1f',
    role: 'Gardien du répertoire',
    bio: "Défend le texte, la langue et les classiques, avec un faible pour le théâtre de tréteaux.",
  },
  lucie: {
    key: 'lucie',
    plume: 'Lisette Servante',
    prenomScene: 'Lisette',
    initiales: 'LS',
    couleur: '#4a7a3a',
    role: 'Éclaireuse et programmatrice',
    bio: "Repère les pépites intimes et les petites salles, et distribue les bonnes adresses à toute la bande.",
  },
  sana: {
    key: 'sana',
    plume: 'Silvia Générale',
    prenomScene: 'Silvia',
    initiales: 'SG',
    couleur: '#b0416f',
    role: 'Flair pour les créations',
    bio: "Découvre avant les autres les jeunes compagnies dont on reparlera. Aime prendre des risques.",
  },
};

export const CRITIC_ORDER: CriticKey[] = [
  'julie', 'pierre', 'alexandre', 'etienne', 'henry', 'cedric', 'lucie', 'sana',
];
