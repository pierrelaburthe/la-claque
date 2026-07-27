// Point de contact unique du site.
//
// La Claque est un site 100 % statique (GitHub Pages) : aucun formulaire ne
// peut être traité côté serveur. Les candidatures passent donc par un SMS,
// avec le numéro affiché en clair et doublé d'un lien qui pré-remplit le
// message sur mobile.

export const CONTACT_TEL = '+33672974484';
export const CONTACT_TEL_AFFICHE = '06 72 97 44 84';

// Ce qu'on demande dans la candidature. Sert à la fois au message pré-rempli
// et à la liste affichée sur la page, pour qu'ils ne divergent jamais.
export const CANDIDATURE = [
  'Qui vous êtes, en une phrase. On ne demande aucun CV.',
  'La ville où vous voyez du théâtre.',
  'Un spectacle qui vous a marqué cette année.',
];

// La syntaxe « ?& » est celle qui pré-remplit le corps du message aussi bien
// sur iOS que sur Android ; « ? » seul est ignoré par certaines versions d'iOS.
export function smsCandidature(): string {
  const corps = "Bonjour, je voudrais devenir claqueur de La Claque. Voici qui je suis : ";
  return `sms:${CONTACT_TEL}?&body=${encodeURIComponent(corps)}`;
}
