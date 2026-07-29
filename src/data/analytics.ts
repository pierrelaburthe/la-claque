// Mesure d'audience.
//
// Le site n'en avait aucune : impossible de savoir quelles critiques sont lues,
// par quelles requêtes on arrive, ni si le bouton « Réserver » sert à quelque
// chose. Tout est branché ici, en une ligne à remplir.
//
// Aucun des quatre fournisseurs ne pose de cookie ni ne suit les visiteurs
// d'un site à l'autre : pas de bandeau de consentement à prévoir, ce qui est
// exactement ce qu'on veut sur un site de critique.
//
//   - 'cloudflare' : gratuit et illimité. Dans le tableau de bord Cloudflare,
//     Analytics & Logs → Web Analytics → Add a site, et coller le token.
//   - 'plausible'  : payant, le plus lisible. `id` = le domaine déclaré.
//   - 'umami'      : gratuit en cloud ou auto-hébergé. `id` = le Website ID,
//     `hote` = l'URL de l'instance si elle n'est pas le cloud.
//   - 'goatcounter': gratuit pour un site perso. `id` = le code du compte
//     (la partie avant .goatcounter.com).
//
// Tant que `fournisseur` vaut 'aucun' ou que `id` est vide, aucune requête
// n'est ajoutée aux pages.

export type Fournisseur = 'aucun' | 'cloudflare' | 'plausible' | 'umami' | 'goatcounter';

export const ANALYTICS: {
  fournisseur: Fournisseur;
  id: string;
  /** Instance auto-hébergée, pour Plausible et Umami. Vide = service officiel. */
  hote?: string;
} = {
  fournisseur: 'cloudflare',
  id: '',
};

/** Vrai quand la mesure est réellement branchée. */
export const analyticsActif = ANALYTICS.fournisseur !== 'aucun' && ANALYTICS.id.trim() !== '';

/** L'URL du script à charger, selon le fournisseur. */
export function scriptAnalytics(): { src: string; attrs: Record<string, string> } | null {
  if (!analyticsActif) return null;
  const { fournisseur, id, hote } = ANALYTICS;

  switch (fournisseur) {
    case 'cloudflare':
      return {
        src: 'https://static.cloudflareinsights.com/beacon.min.js',
        attrs: { 'data-cf-beacon': JSON.stringify({ token: id }) },
      };
    case 'plausible':
      return {
        src: `${hote || 'https://plausible.io'}/js/script.outbound-links.js`,
        attrs: { 'data-domain': id },
      };
    case 'umami':
      return {
        src: `${hote || 'https://cloud.umami.is'}/script.js`,
        attrs: { 'data-website-id': id },
      };
    case 'goatcounter':
      return {
        src: '//gc.zgo.at/count.js',
        attrs: { 'data-goatcounter': `https://${id}.goatcounter.com/count` },
      };
    default:
      return null;
  }
}

// Balises de vérification des outils pour webmasters. Search Console accepte
// aussi la vérification par DNS, plus propre ; cette balise reste le chemin le
// plus rapide quand on n'a pas la main sur la zone du domaine.
export const VERIFICATION: { google?: string; bing?: string } = {};
