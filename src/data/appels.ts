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

/**
 * D'où vient l'argent, ce qui change tout au moment de monter le dossier.
 *  - concours       : une sélection artistique, avec un jury et souvent du plateau ;
 *  - aide-publique  : l'État ou une collectivité, sur dossier et commission ;
 *  - societe-civile : les sociétés de perception des droits, dont l'aide est
 *                     presque toujours adossée à l'emploi d'artistes-interprètes ;
 *  - emploi         : les dispositifs qui remboursent une part des salaires ;
 *  - diffusion      : ce qui aide à tourner plutôt qu'à créer ;
 *  - salle          : une maison qui publie sa propre procédure ;
 *  - veille         : les endroits où les appels sont publiés.
 */
export type Famille =
  | 'concours'
  | 'aide-publique'
  | 'societe-civile'
  | 'emploi'
  | 'diffusion'
  | 'salle'
  | 'veille';

export const LIBELLE_FAMILLE: Record<Famille, string> = {
  concours: 'Concours',
  'aide-publique': 'Aide publique',
  'societe-civile': 'Société civile',
  emploi: "Aide à l'emploi",
  diffusion: 'Diffusion',
  salle: 'Procédure de salle',
  veille: 'Veille',
};

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
  famille: Famille;
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
    famille: 'concours',
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
    famille: 'aide-publique',
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
    famille: 'aide-publique',
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
    famille: 'aide-publique',
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
    famille: 'concours',
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
    famille: 'concours',
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
    famille: 'salle',
    publics: ['compagnie', 'metteur-en-scene'],
    url: 'https://www.theatre-paris-villette.fr/proposer-un-projet-au-tpv/',
    source: 'https://theatre-paris-villette.fr/',
  },
  {
    slug: 'aide-adami-spectacle-theatre',
    nom: 'Aide à un spectacle de théâtre',
    organisme: "Adami, société des artistes-interprètes",
    pour: "Les structures privées titulaires d'une licence d'entrepreneur de spectacles qui emploient des artistes-interprètes.",
    apporte:
      "Une prise en charge de 40 % des salaires bruts des artistes-interprètes, plafonnée par service et par cachet, dans la limite de vingt mille euros par spectacle.",
    conditions: [
      "Au moins quatre artistes-interprètes salariés par représentation au théâtre, trois dans les autres disciplines.",
      'Au moins douze représentations en neuf mois au théâtre, six dans les autres disciplines.',
      'Une rémunération au moins égale aux minima conventionnels.',
      "Une seule aide par spectacle, en création ou en reprise à partir de la troisième représentation.",
    ],
    suite:
      "Le dépôt se fait au plus tôt quatre mois avant la première représentation, et au plus tard le jour de celle-ci, sur la plateforme de l'Adami.",
    famille: 'societe-civile',
    publics: ['compagnie'],
    url: 'https://compte.adami.fr/',
    source:
      'https://www.adami.fr/que-fait-ladami-pour-moi/cherche-financement-projet-artistique/aide-spectacle-theatre/',
  },
  {
    slug: 'aide-spedidam-spectacle-dramatique',
    nom: 'Aide au spectacle dramatique, chorégraphique, cirque et marionnette',
    organisme: 'Spedidam, société des artistes-interprètes',
    pour: "Les structures privées. Les collectivités et les structures majoritairement publiques en sont exclues.",
    apporte:
      "Jusqu'à 30 % du coût total employeur, et 40 % pour les plateaux d'au moins huit artistes, à partir d'un coût employeur de six mille euros.",
    conditions: [
      "Des rémunérations au moins égales aux minima du programme, autour de cent euros bruts par jour de répétition et cent trente par représentation pour les comédiennes et comédiens.",
      'Au moins huit jours de représentations, et au plus vingt jours de répétitions, sur une période de six mois.',
      'Toutes les dates doivent être postérieures à la commission qui examine le dossier.',
      "Le spectacle comporte un musicien au plateau ou une bande sonore musicale d'au moins vingt minutes.",
      "Le dossier complet passe par ADEL, le portail de l'action culturelle de la Spedidam.",
    ],
    depot: {
      fin: '2026-02-02',
      libelle: 'Dernier dépôt connu le 2 février 2026, pour la commission des 9 au 13 mars 2026',
    },
    suite: "Le calendrier des commissions est publié par la Spedidam, plusieurs sessions par an.",
    famille: 'societe-civile',
    publics: ['compagnie'],
    url: 'https://www.spedidam.fr/aides-aux-projets/nos-programmes/aide-au-spectacle-dramatique-choregraphique-cirque-marionnette/',
    source:
      'https://www.spedidam.fr/aides-aux-projets/nos-programmes/aide-au-spectacle-dramatique-choregraphique-cirque-marionnette/',
  },
  {
    slug: 'bourse-ecriture-beaumarchais',
    nom: "Bourses d'écriture Théâtre et Mise en scène",
    organisme: 'Association Beaumarchais-SACD',
    pour: "Les autrices, auteurs et metteuses ou metteurs en scène, adhérents de la SACD ou non.",
    apporte:
      "Une bourse qui rémunère le temps d'écriture, sur un projet de pièce ou de mise en scène, avec un règlement publié chaque année.",
    conditions: [
      "L'adhésion à la SACD n'est pas exigée, et il n'y a ni limite d'âge, ni condition de nationalité ou de résidence.",
      "Le projet est écrit en français, et la création ne doit pas avoir déjà eu lieu.",
      "Les adaptations et les réécritures ne sont pas retenues.",
      "La bourse se cumule avec les autres aides, sauf avec l'aide à la création d'ARTCENA et le Fonds SACD Théâtre déjà obtenus pour le même projet.",
    ],
    famille: 'societe-civile',
    publics: ['auteur', 'metteur-en-scene'],
    url: 'https://beaumarchais.asso.fr/theatre/',
    source: 'https://beaumarchais.asso.fr/theatre/',
  },
  {
    slug: 'fonds-sacd-theatre',
    nom: 'Fonds SACD Théâtre',
    organisme: 'SACD, société des auteurs et compositeurs dramatiques',
    pour: "Les projets de théâtre, dans le privé comme dans le public, portés par un auteur et une production.",
    apporte:
      "Une prime d'écriture versée à l'autrice ou à l'auteur, et une enveloppe destinée à la production du spectacle.",
    famille: 'societe-civile',
    publics: ['auteur', 'compagnie'],
    url: 'https://beaumarchais.asso.fr/theatre/',
    source: 'https://beaumarchais.asso.fr/theatre/',
  },
  {
    slug: 'fonpeps-apaj',
    nom: "APAJ, aide à l'emploi du plateau artistique en petite jauge",
    organisme: "FONPEPS, versé par l'Agence de services et de paiement",
    pour: "Les entreprises et associations qui produisent des spectacles vivants joués dans des salles de petite jauge.",
    apporte:
      "Une prise en charge d'une partie de l'emploi artistique, pensée précisément pour les petites salles, là où la billetterie ne couvre pas le plateau.",
    conditions: [
      "Les représentations concernées se tiennent entre le 1er janvier 2026 et le 31 décembre 2028.",
      "Une première demande pour un spectacle porte sur au moins trois représentations.",
      "L'équipe reste identique en nombre d'artistes et de techniciens d'une date à l'autre, les personnes pouvant changer.",
      "Il faut fournir les contrats, les bulletins de paie et un justificatif de la jauge de la salle.",
    ],
    suite: "L'Agence de services et de paiement met un simulateur à disposition avant le dépôt.",
    famille: 'emploi',
    publics: ['compagnie'],
    url: 'https://puma.asp-public.fr/puma/aide/apaj26',
    source: 'https://puma.asp-public.fr/puma/aide/apaj26',
  },
  {
    slug: 'fonds-soutien-emergence-afc',
    nom: "Fonds de soutien à l'émergence et à la création",
    organisme: 'Avignon Festival & Compagnies, pour le OFF',
    pour: "Les structures dites émergentes qui montent au festival OFF d'Avignon.",
    apporte:
      "Une aide qui porte sur les salaires des artistes, pour accompagner la professionnalisation et la participation au festival.",
    suite: "Le calendrier de l'édition 2026 est annoncé par AF&C sur la page du fonds.",
    famille: 'aide-publique',
    publics: ['compagnie'],
    url: 'https://www.festivaloffavignon.com/page/fonds-de-soutien',
    source: 'https://www.festivaloffavignon.com/page/les-aides-financieres',
  },
  {
    slug: 'onda',
    nom: 'Les soutiens à la diffusion',
    organisme: "ONDA, office national de diffusion artistique",
    pour: "Les lieux qui accueillent des spectacles, et les compagnies pour leur mobilité.",
    apporte:
      "Un soutien qui vise la circulation des œuvres plutôt que leur création : mobilité des équipes, accueil de grands formats, dispositifs cofinancés avec des réseaux.",
    suite:
      "C'est souvent le théâtre qui vous accueille qui sollicite l'ONDA, pas vous. Le savoir permet d'en parler au bon moment dans une négociation.",
    famille: 'diffusion',
    publics: ['compagnie'],
    url: 'https://www.onda.fr/',
    source: 'https://www.onda.fr/',
  },
  {
    slug: 'appels-a-projets-artcena',
    nom: 'Le fil des appels à projets',
    organisme: 'ARTCENA, centre national des arts du cirque, de la rue et du théâtre',
    pour: "Tout le monde : c'est le tableau d'affichage national du secteur.",
    apporte:
      "Les appels à textes, résidences, concours et recrutements publiés par les structures, mis à jour en continu. C'est la page à mettre en favori plutôt qu'à consulter une fois.",
    famille: 'veille',
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
