/**
 * Compteur de claques du public pour la-claque.com.
 *
 * Le site est statique : ce Worker est la seule pièce serveur du projet. Il ne
 * stocke QUE des compteurs, un par slug de critique. Aucune adresse IP, aucun
 * identifiant, aucun texte libre, donc rien qui relève du RGPD et aucun besoin
 * de bandeau de consentement.
 *
 * DÉPLOIEMENT (une fois, environ cinq minutes)
 *   1. npm i -g wrangler && wrangler login
 *   2. wrangler kv namespace create CLAQUES
 *   3. reporter l'id renvoyé dans infra/wrangler.toml
 *   4. wrangler deploy
 *   5. coller l'URL du Worker dans CLAQUES_ENDPOINT (src/data/claques.ts)
 *
 * ROUTES
 *   GET  /?slug=xxx   -> { slug, claques }
 *   POST /?slug=xxx   -> incrémente puis renvoie { slug, claques }
 */

const ORIGINES = ['https://la-claque.com', 'https://www.la-claque.com'];
const SLUG_OK = /^[a-z0-9][a-z0-9-]{0,63}$/;

function entetes(request) {
  const origine = request.headers.get('Origin') || '';
  const autorisee = ORIGINES.includes(origine) ? origine : ORIGINES[0];
  return {
    'Access-Control-Allow-Origin': autorisee,
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Max-Age': '86400',
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-store',
  };
}

function json(request, corps, statut = 200) {
  return new Response(JSON.stringify(corps), { status: statut, headers: entetes(request) });
}

export default {
  async fetch(request, env) {
    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: entetes(request) });
    }

    const slug = new URL(request.url).searchParams.get('slug') || '';
    if (!SLUG_OK.test(slug)) {
      return json(request, { erreur: 'slug invalide' }, 400);
    }

    const cle = `claques:${slug}`;

    if (request.method === 'GET') {
      const valeur = await env.CLAQUES.get(cle);
      return json(request, { slug, claques: Number(valeur) || 0 });
    }

    if (request.method === 'POST') {
      // Le compteur n'a pas besoin d'être transactionnel : deux claques
      // simultanées sur la même critique sont assez rares pour qu'une collision
      // perdue soit sans conséquence, et cela évite une base de données.
      const actuel = Number(await env.CLAQUES.get(cle)) || 0;
      const suivant = actuel + 1;
      await env.CLAQUES.put(cle, String(suivant));
      return json(request, { slug, claques: suivant });
    }

    return json(request, { erreur: 'méthode non permise' }, 405);
  },
};
