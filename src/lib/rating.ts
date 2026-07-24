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

// Score de consensus : met en avant ce que le PLUS GRAND NOMBRE a aimé.
// Une pièce adorée par sept d'entre nous pèse plus lourd qu'un 9 solitaire.
export function consensusScore(p: Piece): number {
  return p.noteMoy * (1 + 0.08 * (nbVus(p) - 1));
}

// Une pièce est « plébiscitée » quand la bande y est allée en nombre ET l'a aimée.
export function estPlebiscite(p: Piece): boolean {
  return nbVus(p) >= 4 && p.noteMoy >= 7.5;
}

export function estDecouverteSolo(p: Piece): boolean {
  return nbVus(p) === 1;
}

// Combien de la bande ont vu la pièce, dit de façon parlante et raccord
// avec la signature « à plusieurs paires d'yeux ».
export function seenLabel(n: number): string {
  return `${n} paire${n > 1 ? 's' : ''} d'yeux`;
}

export function formatNote(note: number): string {
  return note.toFixed(note % 1 === 0 ? 0 : 1).replace('.', ',');
}
