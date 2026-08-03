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
  L.push(`- [La claque au théâtre](${abs('/guides/la-claque-au-theatre')}) : les applaudisseurs payés du XIXᵉ siècle, le chef de claque, les rieurs et les pleureurs, et d'où vient le nom du site.`);
  L.push(`- [Les différents genres théâtraux](${abs('/guides/genres-du-theatre')}) : tragédie, comédie, drame, vaudeville, boulevard, seul-en-scène, café-théâtre.`);
  L.push(`- [Les grands auteurs du théâtre français](${abs('/guides/grands-auteurs-theatre-francais')}) : dix dramaturges et ce qu'on joue encore d'eux.`);
  L.push(`- [Les Molières](${abs('/guides/les-molieres-recompenses-theatre')}) : la cérémonie du théâtre français depuis 1987, ses catégories, ce qu'un Molière change.`);
  L.push(`- [Bien choisir sa place au théâtre](${abs('/guides/choisir-sa-place-au-theatre')}) : orchestre, corbeille, balcon, poulailler, selon la salle et le budget.`);
  L.push(`- [Le guide du savoir-vivre au théâtre](${abs('/guides/etiquette-au-theatre')}) : quand applaudir, comment s'habiller, que faire en cas de retard.`);
  L.push(`- [Emmener un enfant au théâtre](${abs('/guides/emmener-un-enfant-au-theatre')}) : à quel âge, quels spectacles, comment préparer la sortie.`);
  L.push(`- [Le théâtre à Paris : quartiers et salles](${abs('/guides/theatre-a-paris-guide-des-salles')}) : Grands Boulevards, rive gauche, théâtres nationaux.`);
  L.push(`- [Le théâtre pas cher à Paris](${abs('/guides/theatre-pas-cher-a-paris')}) : kiosque à moitié prix, tarif 10 € pour les moins de 26 ans, premières représentations à 50 %, abonnements, Pass Culture.`);
  L.push(`- [L'intermittence du spectacle, expliquée simplement](${abs('/guides/intermittence-spectacle')}) : annexes 8 et 10, seuil de 507 heures, cachet, date anniversaire.`);
  L.push(`- [Comment obtenir son intermittence](${abs('/guides/obtenir-son-intermittence')}) : 507 heures, AEM, inscription France Travail, actualisation.`);
  L.push(`- [Le cachet et le décompte des heures](${abs('/guides/le-cachet-et-le-decompte-des-heures')}) : cachet = 12 h, plafonds mensuels, heures d'enseignement.`);
  L.push(`- [Combien coûte le OFF d’Avignon (simulateur de budget)](${abs('/guides/budget-festival-off-avignon')}) : salle (~100 €/place), transport, logement, repas.`);
  L.push(`- [Tracter au OFF d’Avignon](${abs('/guides/tracter-au-off-avignon')}) : quantités autorisées par l'arrêté municipal, lieux d'affichage interdits, amendes, impression mutualisée AF&C, méthode de tractage.`);
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
