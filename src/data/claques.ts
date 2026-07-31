// La claque du public : un bouton d'applaudissement sur chaque critique.
//
// Le site est 100 % statique (GitHub Pages), donc le compteur vit ailleurs.
// `CLAQUES_ENDPOINT` désigne une petite fonction serverless qui ne stocke qu'un
// nombre par slug. Le code de cette fonction est versionné dans
// `infra/claques-worker.js` : il se déploie sur Cloudflare Workers en quelques
// minutes, et rien d'autre n'est à changer ici que cette constante.
//
// Tant que la constante est vide, le bouton reste actif et remercie le visiteur,
// mais AUCUN CHIFFRE N'EST AFFICHÉ. C'est volontaire : afficher un compteur
// local, propre à un navigateur, reviendrait à publier un nombre inventé.
export const CLAQUES_ENDPOINT = '';

// Les claques du public ne rejoignent jamais la note de la bande, ni le schéma
// `Review` envoyé aux moteurs. Ce sont deux mesures différentes, et les
// confondre reviendrait à faire noter le site par ses lecteurs sans le dire.
export const CLAQUES_LABEL = {
  action: 'Claquer',
  fait: 'Claqué',
  aide: "Vous avez vu ce spectacle ? Applaudissez-le d'ici.",
  merci: 'Merci, votre claque est comptée.',
  sansCompteur: 'Merci, votre claque est notée.',
};
