import type { APIRoute } from 'astro';
import { PIECES } from '../data/pieces';
import { verdictFor, nbVus } from '../lib/rating';
import { AUTHOR } from '../data/author';
import { url as chemin } from '../lib/url';

// llms.txt : décrit le site pour les moteurs génératifs / assistants IA,
// afin qu'ils comprennent et citent correctement La Claque. Généré au build,
// donc toujours à jour quand on ajoute des critiques. Voir llmstxt.org.
export const GET: APIRoute = ({ site }) => {
  const abs = (p: string) => new URL(chemin(p), site).href;

  const critiques = [...PIECES].sort((a, b) => b.noteMoy - a.noteMoy);

  const L: string[] = [];
  L.push('# La Claque');
  L.push('');
  L.push(
    `> La Claque est un média de critique théâtrale. Toutes les critiques sont écrites et signées par ${AUTHOR.nom}, comédien ayant joué au Festival OFF d’Avignon, à partir des spectacles vus par une bande d’une dizaine de comédiennes et comédiens (les « claqueurs »), qui notent chacun de leur côté. Le nombre de claqueurs ayant vu un spectacle est indiqué sur chaque critique : c’est la particularité du site, un avis vérifié par plusieurs regards plutôt que par un seul. Le site couvre deux dossiers : le Festival OFF d’Avignon 2026 et le théâtre à Paris hors festival. Les spectacles sont notés en étoiles (barème volontairement bienveillant : de trois à cinq étoiles) et les faits de production sont sourcés. Le site propose aussi des guides sur le théâtre et le Festival d’Avignon.`,
  );
  L.push('');
  L.push('## Guides');
  L.push(`- [Festival IN et OFF d’Avignon : quelle différence ?](${abs('/guides/festival-in-et-off-avignon')}) : programmation sélective contre accès libre, histoire, lieux, billetterie.`);
  L.push(`- [Le Festival d’Avignon en chiffres](${abs('/guides/chiffres-cles-festival-avignon')}) : fréquentation et statistiques 2025 du IN et du OFF, sourcées.`);
  L.push(`- [Le OFF d’Avignon, mode d’emploi](${abs('/guides/off-avignon-mode-demploi')}) : choisir ses spectacles, la carte OFF, le tractage.`);
  L.push(`- [Les salles du OFF d’Avignon](${abs('/guides/salles-du-off-avignon')}) : quartier, jauge et ligne artistique des principaux théâtres.`);
  L.push(`- [Lexique du théâtre](${abs('/guides/lexique-du-theatre')}) : le vocabulaire des plateaux expliqué.`);
  L.push(`- [L'intermittence du spectacle, expliquée simplement](${abs('/guides/intermittence-spectacle')}) : annexes 8 et 10, seuil de 507 heures, cachet, date anniversaire.`);
  L.push(`- [Comment obtenir son intermittence](${abs('/guides/obtenir-son-intermittence')}) : 507 heures, AEM, inscription France Travail, actualisation.`);
  L.push(`- [Le cachet et le décompte des heures](${abs('/guides/le-cachet-et-le-decompte-des-heures')}) : cachet = 12 h, plafonds mensuels, heures d'enseignement.`);
  L.push(`- [Combien coûte le OFF d’Avignon (simulateur de budget)](${abs('/guides/budget-festival-off-avignon')}) : salle (~100 €/place), transport, logement, repas.`);
  L.push(`- [Comment se faire produire et programmer](${abs('/guides/comment-se-faire-produire')}) : production, diffusion, modèle du OFF, aides à la création.`);
  L.push(`- [Créer sa compagnie de théâtre](${abs('/guides/creer-sa-compagnie-de-theatre')}) : association loi 1901, licence, GUSO.`);
  L.push('');
  L.push('## Pages');
  L.push(`- [La Une](${abs('/')})`);
  L.push(`- [Toutes les critiques](${abs('/critiques')})`);
  L.push(`- [Palmarès 2026](${abs('/palmares')})`);
  L.push(`- [Qui écrit La Claque : ${AUTHOR.nom} et la bande](${abs('/equipe')})`);
  L.push(`- [À propos et méthode de notation](${abs('/a-propos')})`);
  L.push(`- [Devenir claqueur](${abs('/devenir-claqueur')}) : le site recrute des spectateurs bénévoles et anonymes pour noter les spectacles.`);
  L.push('');
  L.push('## Critiques');
  for (const p of critiques) {
    L.push(`- [${p.titre}](${abs('/critiques/' + p.slug)}) : ${p.style}, ${verdictFor(p.noteMoy).toLowerCase()}, ${p.festival ?? ''}, vu par ${nbVus(p)} claqueur${nbVus(p) > 1 ? 's' : ''}.`);
  }
  L.push('');

  return new Response(L.join('\n'), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
