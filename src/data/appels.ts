// Où une compagnie peut déposer un dossier : concours, aides publiques et
// appels à projets, avec leur calendrier réel.
//
// Règle : on ne liste que des dispositifs dont le calendrier est publié par
// l'organisme lui-même, et on cite la source. Les dates sont en ISO pour que la
// page puisse dire, au moment de la compilation, si la session est ouverte ou
// passée. Quand une session est close, on ne la supprime pas : elle indique la
// fenêtre à laquelle il faudra revenir, ce qui est exactement ce dont on a
// besoin quand on prépare une saison à l'avance.

export type PublicVise = 'compagnie' | 'auteur' | 'metteur-en-scene';

export interface Appel {
  slug: string;
  nom: string;
  organisme: string;
  /** À qui ça s'adresse, en une phrase. */
  pour: string;
  /** Ce que ça apporte concrètement. */
  apporte: string;
  /** Les conditions d'éligibilité publiées. */
  conditions?: string[];
  /** Fenêtre de dépôt de la dernière session connue. */
  depot?: { debut?: string; fin: string; libelle: string };
  /** Ce qui se passe après le dépôt, quand c'est publié. */
  suite?: string;
  publics: PublicVise[];
  url: string;
  source: string;
}

export const APPELS: Appel[] = [
  {
    slug: 'prix-theatre-13',
    nom: 'Prix Théâtre 13',
    organisme: 'Théâtre 13, Paris',
    pour: "Les metteuses et metteurs en scène en début de parcours, sur un spectacle déjà monté ou en projet.",
    apporte:
      "Une sélection jouée au Théâtre 13 devant un jury et le public, et pour les lauréats un accompagnement de la maison, qui a lancé beaucoup de parcours.",
    depot: { fin: '2026-10-09', libelle: "Candidatures pour l'édition 2027 jusqu'au 9 octobre 2026" },
    publics: ['metteur-en-scene', 'compagnie'],
    url: 'https://www.theatre13.com/',
    source: 'https://www.theatre13.com/',
  },
  {
    slug: 'adsv-aide-au-projet-idf',
    nom: 'Aide au projet, création et reprise',
    organisme: "DRAC Île-de-France, aides déconcentrées au spectacle vivant",
    pour: "Les équipes artistiques indépendantes qui montent une création ou reprennent un spectacle.",
    apporte: "Une subvention de l'État sur un projet identifié, instruite par une commission régionale.",
    depot: {
      debut: '2026-09-01',
      fin: '2026-10-21',
      libelle: 'Dépôt du 1er septembre au 21 octobre 2026, pour la session création et reprise 2027',
    },
    suite: 'Commission des 19, 20 et 21 janvier 2027.',
    publics: ['compagnie'],
    url: 'https://www.culture.gouv.fr/Demarches-en-ligne/Par-type-de-demarche/Subvention/Aides-aux-equipes-independantes-aides-deconcentrees-au-spectacle-vivant-ADSV',
    source: 'https://www.culture.gouv.fr/regions/drac-ile-de-france/aides-et-demarches-specifiques-ile-de-france/theatre',
  },
  {
    slug: 'adsv-conventionnement-idf',
    nom: 'Conventionnement',
    organisme: "DRAC Île-de-France, aides déconcentrées au spectacle vivant",
    pour: "Les compagnies qui visent un soutien pluriannuel, en entrée ou en renouvellement.",
    apporte: "Un conventionnement, c'est-à-dire un financement sur plusieurs saisons plutôt que sur un spectacle.",
    depot: { debut: '2026-02-16', fin: '2026-03-27', libelle: 'Dépôt du 16 février au 27 mars 2026, pour 2027' },
    suite: 'Commission des 9, 10 et 11 juin 2026.',
    publics: ['compagnie'],
    url: 'https://www.culture.gouv.fr/Demarches-en-ligne/Par-type-de-demarche/Subvention/Aides-aux-equipes-independantes-aides-deconcentrees-au-spectacle-vivant-ADSV',
    source: 'https://www.culture.gouv.fr/regions/drac-ile-de-france/aides-et-demarches-specifiques-ile-de-france/theatre',
  },
  {
    slug: 'aide-nationale-creation-textes-dramatiques',
    nom: 'Aide nationale à la création de textes dramatiques',
    organisme: 'ARTCENA, pour le ministère de la Culture',
    pour: "Les autrices, auteurs et traducteurs de théâtre, en leur nom propre.",
    apporte:
      "Une aide et un accompagnement pour la circulation du texte : ARTCENA suit une cinquantaine de textes lauréats par an et les fait connaître aux réseaux francophones.",
    conditions: [
      'Le texte est écrit en langue française.',
      "C'est une forme achevée, pas un projet d'écriture.",
      "Il n'a jamais été représenté, en France ni ailleurs, dans le cadre d'un contrat de cession ou de coréalisation.",
      "Il est déposé pour la première fois devant la commission, par son autrice, son auteur ou son traducteur.",
    ],
    depot: {
      debut: '2026-06-01',
      fin: '2026-06-15',
      libelle: 'Dépôt du 1er au 15 juin 2026, pour la session de novembre 2026',
    },
    suite: 'Trois catégories : littérature dramatique, traduction, dramaturgies plurielles, toutes ouvertes au jeune public.',
    publics: ['auteur'],
    url: 'https://www.artcena.fr/aide-nationale-creation-de-textes-dramatiques/faire-une-demande',
    source: 'https://www.artcena.fr/aide-nationale-creation-de-textes-dramatiques',
  },
  {
    slug: 'festival-impatience',
    nom: 'Festival Impatience',
    organisme: 'CENTQUATRE-PARIS',
    pour: "Les jeunes metteuses et metteurs en scène et les collectifs, sur un spectacle récent.",
    apporte:
      "Une sélection jouée dans un festival entièrement consacré à l'émergence, très regardé par les programmateurs, depuis 2008.",
    conditions: [
      "Avoir entre une et cinq créations à son actif, pas davantage.",
      'Le spectacle se joue en français et dure moins de deux heures.',
      "Il a été créé récemment, et n'a pas déjà été beaucoup vu en Île-de-France.",
      "L'inscription se fait en ligne, avec des frais de dossier de douze euros.",
    ],
    depot: { debut: '2026-01-21', fin: '2026-02-20', libelle: 'Candidatures du 21 janvier au 20 février 2026' },
    suite: "La dix-huitième édition se tient du 7 au 18 décembre 2026. L'appel revient au cœur de l'hiver.",
    publics: ['metteur-en-scene', 'compagnie'],
    url: 'https://www.festivalimpatience.fr/',
    source: 'https://www.104.fr/appels-a-artistes',
  },
  {
    slug: 'prix-art-ensemble',
    nom: 'Prix Art Ensemble',
    organisme: 'Fondation Calouste-Gulbenkian et CENTQUATRE-PARIS',
    pour: "Les artistes qui travaillent en collectif ou en pratique partagée.",
    apporte: 'Trois à quatre projets retenus chaque année, dotés de dix mille euros chacun.',
    depot: { debut: '2026-03-17', fin: '2026-04-26', libelle: 'Candidatures du 17 mars au 26 avril 2026' },
    publics: ['compagnie'],
    url: 'https://www.104.fr/appels-a-artistes',
    source: 'https://www.104.fr/appels-a-artistes',
  },
  {
    slug: 'proposer-un-projet-paris-villette',
    nom: 'Proposer un projet au Théâtre Paris-Villette',
    organisme: 'Théâtre Paris-Villette, établissement de la Ville de Paris',
    pour: "Les compagnies dont le travail parle au jeune public autant qu'aux adultes.",
    apporte: "Une des rares salles parisiennes à publier une page de dépôt de projet, avec ses critères.",
    publics: ['compagnie', 'metteur-en-scene'],
    url: 'https://www.theatre-paris-villette.fr/proposer-un-projet-au-tpv/',
    source: 'https://theatre-paris-villette.fr/',
  },
  {
    slug: 'appels-a-projets-artcena',
    nom: 'Le fil des appels à projets',
    organisme: 'ARTCENA, centre national des arts du cirque, de la rue et du théâtre',
    pour: "Tout le monde : c'est le tableau d'affichage national du secteur.",
    apporte:
      "Les appels à textes, résidences, concours et recrutements publiés par les structures, mis à jour en continu. C'est la page à mettre en favori plutôt qu'à consulter une fois.",
    publics: ['compagnie', 'auteur', 'metteur-en-scene'],
    url: 'https://www.artcena.fr/annonces/appels-a-projets',
    source: 'https://www.artcena.fr/annonces/appels-a-projets',
  },
];

/** Les dispositifs dont la fenêtre de dépôt n'est pas encore passée. */
export const appelsOuverts = (aujourdhui: string): Appel[] =>
  APPELS.filter((a) => a.depot && a.depot.fin >= aujourdhui);

/** Ceux dont la session est passée, et qui reviendront à la même période. */
export const appelsPasses = (aujourdhui: string): Appel[] =>
  APPELS.filter((a) => a.depot && a.depot.fin < aujourdhui);

/** Ceux qui restent ouverts en permanence, sans date. */
export const appelsPermanents = (): Appel[] => APPELS.filter((a) => !a.depot);
