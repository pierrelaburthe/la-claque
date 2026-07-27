// Les claqueurs : les membres de la bande qui voient les spectacles et les
// notent chacun de leur côté.
//
// Ils restent volontairement anonymes. Ils travaillent dans ce milieu, et
// personne n'a envie que son avis sur un spectacle lui revienne en audition.
// Leurs clés servent uniquement à ranger les notes dans pieces.ts : le site
// n'affiche jamais qui a mis quoi, seulement combien de claqueurs ont vu la
// pièce. Les critiques, elles, sont écrites et signées par l'auteur unique
// du site (voir src/data/author.ts).

export type CriticKey =
  | 'julie'
  | 'pierre'
  | 'alexandre'
  | 'etienne'
  | 'henry'
  | 'cedric'
  | 'lucie'
  | 'sana';

export const CRITIC_ORDER: CriticKey[] = [
  'julie', 'pierre', 'alexandre', 'etienne', 'henry', 'cedric', 'lucie', 'sana',
];
