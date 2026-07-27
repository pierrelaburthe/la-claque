import type { Piece } from '../data/pieces';

// Barème étoilé « maison » de La Claque.
// Choix éditorial assumé : on ne montre jamais qu'un spectacle nous a déçus.
// Le plancher est donc 3 étoiles, et tout le reste monte.
//   moyenne >= 8   -> 5 étoiles, « Chef-d'œuvre »
//   moyenne  > 5   -> 4 étoiles
//   le reste       -> 3 étoiles (le plancher)
export function starsFor(note: number): number {
  if (note >= 8) return 5;
  if (note > 5) return 4;
  return 3;
}

// Verdicts « maison », sur le thème de la claque (applaudissements).
// Toujours positifs : même le plancher reste une claque.
export function verdictFor(note: number): string {
  if (note >= 8) return 'Grosse claque';
  if (note > 5) return 'Belle claque';
  return 'Petite claque';
}

// Nombre d'ami·es de la bande qui ont vu et noté la pièce.
export function nbVus(p: Piece): number {
  return Object.keys(p.notes).length;
}

// Score de classement : la note reste le juge de paix, mais ce que le PLUS
// GRAND NOMBRE de claqueurs a vu et aimé remonte. Chaque claqueur
// supplémentaire vaut +0,3 de note.
//
// Ce coefficient est calibré pour tenir trois promesses à la fois, avec les
// données réelles du tableur :
//   1. une pièce vue par cinq et notée 9,5 passe devant un 10 solitaire ;
//   2. une pièce vue par sept et notée 8,5 passe elle aussi devant ce 10
//      solitaire, ce que /a-propos promet noir sur blanc ;
//   3. cette même 8,5 vue par sept ne double PAS la 9,5 vue par cinq : la
//      qualité garde le dernier mot sur le seul nombre.
// En dessous de 0,3, la promesse nº2 tombe ; bien au-dessus, la nº3 tombe.
// Le palmarès étant par ailleurs groupé par taille de claque, ce score ne
// classe que des spectacles de même niveau d'étoiles entre eux.
export function consensusScore(p: Piece): number {
  return p.noteMoy + 0.3 * (nbVus(p) - 1);
}

// Une pièce est « plébiscitée » quand la bande y est allée en nombre ET l'a aimée.
export function estPlebiscite(p: Piece): boolean {
  return nbVus(p) >= 4 && p.noteMoy >= 7.5;
}

export function estDecouverteSolo(p: Piece): boolean {
  return nbVus(p) === 1;
}

// Combien de la bande ont vu la pièce. On les appelle les « claqueurs »,
// en raccord avec le nom du site : la claque, c'était ce groupe de
// spectateurs placés dans la salle pour applaudir.
export function seenLabel(n: number): string {
  return `${n} claqueur${n > 1 ? 's' : ''}`;
}

export function formatNote(note: number): string {
  return note.toFixed(note % 1 === 0 ? 0 : 1).replace('.', ',');
}
