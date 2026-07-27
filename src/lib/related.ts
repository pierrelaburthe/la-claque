import type { Piece } from '../data/pieces';
import { categorieFor } from './categories';
import { consensusScore } from './rating';

// Maillage interne : pour une critique donnée, trouver les critiques
// vraiment liées, et non les mêmes trois têtes de gondole partout.
// On score par proximité (catégorie, salle, nombre de claqueurs, dossier) et
// on départage par le consensus. Chaque page pointe ainsi vers un
// voisinage différent, ce qui donne un maillage riche et non répétitif.
export function relatedPieces(piece: Piece, all: Piece[], n = 3): Piece[] {
  const cat = categorieFor(piece.style);
  const vus = Object.keys(piece.notes).length;
  const scored = all
    .filter((p) => p.slug !== piece.slug)
    .map((p) => {
      let score = 0;
      if (categorieFor(p.style) === cat) score += 4;
      if (piece.salle && p.salle === piece.salle) score += 3;
      // À défaut de plume commune, on rapproche les spectacles vus par un
      // nombre comparable de claqueurs : plébiscites avec plébiscites,
      // découvertes confidentielles entre elles.
      if (Math.abs(Object.keys(p.notes).length - vus) <= 1) score += 2;
      if (piece.festival && p.festival === piece.festival) score += 1;
      // Départage : les valeurs sûres remontent, mais après la proximité.
      score += consensusScore(p) / 100;
      return { p, score };
    })
    .sort((a, b) => b.score - a.score);
  return scored.slice(0, n).map((s) => s.p);
}
