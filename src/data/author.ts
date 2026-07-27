// L'auteur unique de La Claque.
//
// Le site a d'abord fonctionné avec huit plumes signant chacune ses papiers.
// C'était une fiction : dans les faits, la bande voit les spectacles et en
// discute, une seule personne rédige. On l'assume désormais, pour trois
// raisons : c'est vrai, ça donne une voix cohérente, et un auteur identifiable
// pèse beaucoup plus lourd qu'un pseudonyme aux yeux de Google et des IA.
//
// Les notes individuelles de la bande restent dans pieces.ts : elles calculent
// l'étoile et le consensus, et ne sont jamais affichées nom par nom.

export interface Author {
  nom: string;
  role: string;
  /** Une phrase, pour la signature sous les articles. */
  ligne: string;
  /** Bio courte, pour la page auteur et les pieds de page. */
  bio: string;
  /** Profils publics, pour le sameAs du schéma Person. À compléter. */
  sameAs: string[];
}

export const AUTHOR: Author = {
  nom: 'Pierre Laburthe-Tolra',
  role: 'Rédacteur',
  ligne: 'Comédien, joue au Festival OFF',
  bio: "Je suis comédien, et j'ai joué au Festival OFF d'Avignon 2026 dans « Le Flan Pâtissier », au Théâtre Tremplin. Je regarde donc les spectacles depuis les deux côtés du plateau : je connais le trac des coulisses autant que le velours des fauteuils. Je rédige toutes les critiques de La Claque, à partir de ce que la bande et moi avons vu ensemble.",
  sameAs: [],
};

// Règle de transparence : je ne critique jamais un spectacle auquel je
// participe. Si La Claque en parle un jour, ce sera signalé en toutes lettres.
export const CONFLIT_INTERET =
  "Je ne critique aucun spectacle auquel je participe. Le cas échéant, mon implication est indiquée en tête d'article.";
