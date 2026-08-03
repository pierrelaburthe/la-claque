// Annuaire des théâtres parisiens.
//
// Règle de la maison : rien n'est écrit ici qui ne vienne d'une source vérifiable,
// citée dans `sources`. Les jauges, les directions et les adresses proviennent de
// l'article Wikipédia de la salle, de sa fiche à L'Officiel des spectacles ou de
// son propre site. Quand une donnée n'est pas publiée, le champ reste vide et la
// fiche le dit, plutôt que de combler le trou.
//
// `lat` et `lon` sont géocodés depuis l'adresse par l'API de la Base Adresse
// Nationale (adresse.data.gouv.fr), puis figés ici : le site est statique et
// n'appelle aucun service extérieur au moment de l'affichage.
//
// `alias` sert à raccrocher nos critiques à la salle : ce sont les libellés du
// champ `salle` dans pieces.ts.

export type TypeTheatre = 'national' | 'public' | 'prive' | 'petite-salle';

/**
 * Par où une compagnie peut entrer, ce qui n'est pas la même chose que la
 * qualité de l'accueil : c'est le mode de sélection de la maison.
 *  - projet  : la salle publie un dépôt de dossier, un appel ou un concours ;
 *  - coreal  : elle accueille des spectacles en coréalisation ou en location,
 *              sans procédure écrite, donc par contact direct ;
 *  - reseau  : ni dépôt ni location, on y entre par la coproduction, la
 *              tournée ou l'invitation, décidées une à deux saisons avant ;
 *  - troupe  : la maison joue avec sa troupe et n'accueille pas d'équipe.
 */
export type ModeAccueil = 'projet' | 'coreal' | 'reseau' | 'troupe';

export interface SalleTheatre {
  nom: string;
  places?: number;
}

export interface AccueilCompagnies {
  /** Le modèle d'exploitation, dit simplement. */
  modele: string;
  /** La procédure publiée par la salle, quand il y en a une. */
  procedure?: string;
  /** Page de la salle qui décrit cette procédure. */
  url?: string;
  contact?: string;
}

export interface Theatre {
  slug: string;
  nom: string;
  adresse: string;
  cp: string;
  arr: number;
  lat: number;
  lon: number;
  type: TypeTheatre;
  accueil: ModeAccueil;
  salles: SalleTheatre[];
  annee?: number;
  direction?: string;
  monument?: string;
  /** Ce que la maison programme, en une ou deux phrases. */
  ligne: string;
  /** Ce qu'un spectateur gagne à savoir avant de réserver. */
  spectateur?: string;
  compagnies: AccueilCompagnies;
  site?: string;
  tel?: string;
  alias?: string[];
  sources: string[];
}

/** Formule de repli, quand une maison privée ne publie aucune procédure. */
const PRIVE_SANS_PROCEDURE: AccueilCompagnies = {
  modele:
    "Maison privée qui vit de sa billetterie. Une compagnie y entre par la coréalisation, où la salle partage la recette et le risque, ou par la location, où elle paie le plateau et garde ses entrées.",
  procedure:
    "Aucune procédure de dépôt de dossier n'est publiée sur le site. Le passage obligé reste le contact direct avec l'administration du théâtre, avec un dossier court et une date de disponibilité.",
};

export const THEATRES: Theatre[] = [
  // ---------------------------------------------------------------- nationaux
  {
    slug: 'comedie-francaise',
    nom: 'Comédie-Française',
    adresse: 'Place Colette',
    cp: '75001',
    arr: 1,
    lat: 48.863356,
    lon: 2.336069,
    type: 'national',
    accueil: 'troupe',
    salles: [
      { nom: 'Salle Richelieu', places: 862 },
      { nom: 'Théâtre du Vieux-Colombier (6e)', places: 300 },
      { nom: 'Studio-Théâtre', places: 136 },
    ],
    direction: 'Clément Hervieu-Léger, administrateur général',
    ligne:
      "La seule maison de France à faire vivre une troupe permanente et un répertoire de plusieurs milliers de pièces. On y voit les classiques joués en alternance, souvent trois titres différents dans la même semaine, et des créations contemporaines au Vieux-Colombier et au Studio.",
    spectateur:
      "L'alternance est la particularité de la maison : le spectacle change d'un soir à l'autre, il faut donc regarder le calendrier avant de choisir sa date plutôt que sa pièce.",
    compagnies: {
      modele:
        "Théâtre national, établissement public : la Comédie-Française produit elle-même, avec sa troupe. Elle n'accueille pas de compagnies extérieures en tournée.",
      procedure:
        "Il n'y a pas de dépôt de dossier possible pour une compagnie. L'entrée dans la maison passe par l'engagement de comédiennes et comédiens comme pensionnaires, ou par l'invitation d'un metteur en scène.",
    },
    site: 'https://www.comedie-francaise.fr/',
    alias: ['Comédie-Française', 'Comédie-Française, Studio-Théâtre'],
    sources: ['https://fr.wikipedia.org/wiki/Com%C3%A9die-Fran%C3%A7aise'],
  },
  {
    slug: 'odeon-theatre-de-l-europe',
    nom: "Odéon-Théâtre de l'Europe",
    adresse: "Place de l'Odéon",
    cp: '75006',
    arr: 6,
    lat: 48.849853,
    lon: 2.338715,
    type: 'national',
    accueil: 'reseau',
    salles: [
      { nom: 'Odéon (6e)', places: 800 },
      { nom: 'Ateliers Berthier (17e)', places: 450 },
    ],
    annee: 1782,
    direction: 'Julien Gosselin, depuis le 15 juillet 2024',
    ligne:
      "Un théâtre national tourné vers la création européenne, qui invite de grandes signatures étrangères autant qu'il produit ses propres spectacles. Les Ateliers Berthier, dans le 17e, accueillent les formes plus longues et les dispositifs scéniques que la salle à l'italienne ne permet pas.",
    spectateur:
      "Deux adresses très différentes portent le même nom : vérifiez si votre place est place de l'Odéon ou boulevard Berthier, à l'autre bout de Paris.",
    compagnies: {
      modele:
        "Théâtre national : la maison produit et coproduit, et invite des équipes en tournée. Les projets se montent avec le bureau artistique, plusieurs saisons à l'avance.",
      procedure:
        "Aucun appel à projets ouvert n'est publié. Le chemin habituel est celui d'une production déjà repérée en festival ou coproduite par un réseau de scènes.",
    },
    site: 'https://www.theatre-odeon.eu/',
    alias: ["Odéon, Théâtre de l'Europe"],
    sources: ['https://fr.wikipedia.org/wiki/Od%C3%A9on-Th%C3%A9%C3%A2tre_de_l%27Europe'],
  },
  {
    slug: 'theatre-national-de-la-colline',
    nom: 'Théâtre national de la Colline',
    adresse: '15 rue Malte-Brun',
    cp: '75020',
    arr: 20,
    lat: 48.864546,
    lon: 2.397659,
    type: 'national',
    accueil: 'reseau',
    salles: [
      { nom: 'Grand théâtre', places: 655 },
      { nom: 'Petit théâtre', places: 160 },
    ],
    direction: 'Julie Deliquet, depuis mars 2026, après Wajdi Mouawad',
    ligne:
      "Le seul théâtre national dont la mission tient en une phrase : ne jouer que des textes des XXe et XXIe siècles. Une douzaine de spectacles par saison, dont trois ou quatre créations maison, et une jeune troupe qui réunit six comédiennes et comédiens de moins de trente ans pendant dix mois.",
    compagnies: {
      modele:
        "Théâtre national, établissement public : production, coproduction et accueil d'équipes, avec une préférence assumée pour les écritures d'aujourd'hui.",
      procedure:
        "La Jeune troupe de la Colline est l'entrée la plus concrète pour un interprète en début de parcours. Pour un projet de compagnie, le contact passe par le secrétariat artistique.",
    },
    site: 'https://www.colline.fr/',
    tel: '01 44 62 52 52',
    sources: [
      'https://fr.wikipedia.org/wiki/Th%C3%A9%C3%A2tre_national_de_la_Colline',
      'https://www.colline.fr/infos-pratiques',
    ],
  },
  {
    slug: 'chaillot',
    nom: 'Chaillot, Théâtre national de la Danse',
    adresse: '1 place du Trocadéro et du 11-Novembre',
    cp: '75116',
    arr: 16,
    lat: 48.862905,
    lon: 2.288342,
    type: 'national',
    accueil: 'reseau',
    salles: [
      { nom: 'Salle Jean-Vilar', places: 1250 },
      { nom: 'Salle Gémier', places: 420 },
      { nom: 'Studio Maurice-Béjart', places: 80 },
    ],
    annee: 1937,
    direction: 'Rachid Ouramdane, depuis 2021',
    ligne:
      "Le théâtre national qui a choisi la danse. On y voit surtout de la création chorégraphique, française et internationale, avec des incursions vers le cirque, le théâtre et le jeune public. La maison de Jean Vilar et d'Antoine Vitez a changé de langage, pas d'ambition populaire.",
    compagnies: {
      modele:
        "Établissement public tourné vers la danse : coproductions, accueils et résidences de création.",
      procedure:
        "Pas d'appel à projets permanent. Les projets se construisent avec la direction artistique, en général dans le sillage d'un réseau de coproducteurs.",
    },
    site: 'https://theatre-chaillot.fr/',
    sources: ['https://fr.wikipedia.org/wiki/Th%C3%A9%C3%A2tre_national_de_Chaillot'],
  },
  // ------------------------------------------------------------------ publics
  {
    slug: 'theatre-de-la-ville',
    nom: 'Théâtre de la Ville-Sarah-Bernhardt',
    adresse: '2 place du Châtelet',
    cp: '75004',
    arr: 4,
    lat: 48.857346,
    lon: 2.347790,
    type: 'public',
    accueil: 'reseau',
    salles: [
      { nom: 'Salle principale', places: 1000 },
      { nom: 'Théâtre des Abbesses (18e)', places: 400 },
    ],
    direction: 'Emmanuel Demarcy-Mota, depuis 2008',
    ligne:
      "La grande maison municipale, revenue place du Châtelet en septembre 2023 après sept ans de travaux. Danse contemporaine, théâtre international et musiques du monde s'y croisent dans une même saison.",
    compagnies: {
      modele:
        "Établissement de la Ville de Paris : coproductions et accueils, avec un tropisme international marqué.",
      procedure:
        "Aucune procédure publique de dépôt. Les équipes françaises y arrivent le plus souvent après un parcours en scène nationale ou en festival.",
    },
    site: 'https://www.theatredelaville-paris.com/',
    sources: ['https://fr.wikipedia.org/wiki/Th%C3%A9%C3%A2tre_de_la_Ville'],
  },
  {
    slug: 'theatre-du-rond-point',
    nom: 'Théâtre du Rond-Point',
    adresse: '2 bis avenue Franklin-D.-Roosevelt',
    cp: '75008',
    arr: 8,
    lat: 48.867784,
    lon: 2.310549,
    type: 'public',
    accueil: 'reseau',
    salles: [{ nom: 'Salle Renaud-Barrault', places: 760 }, { nom: 'Salle Jean-Tardieu' }, { nom: 'Salle Roland-Topor' }],
    direction: 'Laurence de Magalhaes et Stéphane Ricordel, depuis 2023, après Jean-Michel Ribes',
    ligne:
      "La maison des auteurs vivants, et elle le prend au mot : on n'y joue que des textes d'aujourd'hui, trente-cinq à quarante spectacles par saison. Trois salles de tailles très différentes permettent d'y voir une grande forme comme un seul en scène de trente places.",
    spectateur:
      "C'est l'adresse à regarder quand on veut découvrir une écriture contemporaine sans prendre de risque sur la qualité du plateau.",
    compagnies: {
      modele:
        "Structure à moitié subventionnée, environ 45 % de son budget : elle produit, coproduit et accueille beaucoup, sur un rythme de programmation rapide.",
      procedure:
        "Pas de dépôt public affiché. La règle non écrite de la maison est claire en revanche : le texte doit être d'un auteur vivant.",
    },
    site: 'https://www.theatredurondpoint.fr/',
    sources: ['https://fr.wikipedia.org/wiki/Th%C3%A9%C3%A2tre_du_Rond-Point'],
  },
  {
    slug: 'theatre-de-la-bastille',
    nom: 'Théâtre de la Bastille',
    adresse: '76 rue de la Roquette',
    cp: '75011',
    arr: 11,
    lat: 48.855861,
    lon: 2.375555,
    type: 'public',
    accueil: 'reseau',
    salles: [
      { nom: 'Grande salle', places: 261 },
      { nom: 'Petite salle', places: 155 },
    ],
    direction: 'Claire Dupont, depuis 2023',
    ligne:
      "Une maison passée sous statut public en 2022, résolument contemporaine, où le théâtre, la danse et la performance se répondent. Sa singularité tient à son parlement artistique, un petit groupe d'artistes qui pèse sur la programmation.",
    spectateur: "Le placement est libre dans les deux salles, donc arriver en avance change vraiment la soirée.",
    compagnies: {
      modele:
        "Soutien de l'État et de la Ville de Paris. La maison mise sur la durée : longues séries, cessions et partenariats de production avec les équipes qu'elle suit.",
      procedure:
        "Depuis 2025, le théâtre s'est lancé dans la production déléguée, donc il porte lui-même des créations. Le contact passe par l'accueil administratif.",
      contact: 'accueil@theatre-bastille.com',
    },
    site: 'https://www.theatre-bastille.com/',
    tel: '01 43 57 42 14',
    alias: ['Théâtre de la Bastille'],
    sources: ['https://www.theatre-bastille.com/le-theatre'],
  },
  {
    slug: 'theatre-paris-villette',
    nom: 'Théâtre Paris-Villette',
    adresse: '211 avenue Jean-Jaurès',
    cp: '75019',
    arr: 19,
    lat: 48.888952,
    lon: 2.392454,
    type: 'public',
    accueil: 'projet',
    salles: [{ nom: 'Salle principale' }, { nom: 'Le Grand Parquet (18e)' }],
    direction: 'Adrien de Van',
    ligne:
      "Un établissement de la Ville de Paris qui se présente comme une scène contemporaine jeunesse : on y programme dès trois ans et jusqu'aux formes pour adultes, sans traiter le jeune public comme un sous-genre.",
    compagnies: {
      modele:
        "Établissement culturel de la Ville de Paris : résidences, commandes et accueils de compagnies.",
      procedure:
        "C'est l'une des rares maisons parisiennes à publier une page dédiée au dépôt de projet, avec ses critères et son calendrier.",
      url: 'https://www.theatre-paris-villette.fr/proposer-un-projet-au-tpv/',
    },
    site: 'https://theatre-paris-villette.fr/',
    tel: '01 40 03 74 20',
    alias: ['Théâtre Paris-Villette'],
    sources: ['https://theatre-paris-villette.fr/'],
  },
  {
    slug: 'theatre-13',
    nom: 'Théâtre 13',
    adresse: '30 rue du Chevaleret',
    cp: '75013',
    arr: 13,
    lat: 48.827622,
    lon: 2.377256,
    type: 'public',
    accueil: 'projet',
    salles: [
      { nom: 'Théâtre 13 / Bibliothèque' },
      { nom: 'Théâtre 13 / Glacière, 103A boulevard Auguste-Blanqui' },
    ],
    ligne:
      "Deux salles dans le 13e, une programmation contemporaine, et surtout un prix de mise en scène qui a lancé beaucoup de parcours. C'est l'une des maisons parisiennes les plus utiles à connaître quand on débute.",
    compagnies: {
      modele:
        "Maison soutenue par la Ville, qui accompagne des équipes émergentes : résidences, compagnonnages et productions maison.",
      procedure:
        "Le Prix Théâtre 13 est ouvert aux jeunes metteuses et metteurs en scène, sur candidature. Pour l'édition 2027, les candidatures se ferment le 9 octobre 2026.",
      url: 'https://www.theatre13.com/',
      contact: 'billetterie@theatre13.com',
    },
    site: 'https://www.theatre13.com/',
    tel: '01 45 88 62 22',
    sources: ['https://www.theatre13.com/'],
  },
  {
    slug: 'theatre-14',
    nom: 'Théâtre 14',
    adresse: '20 avenue Marc Sangnier',
    cp: '75014',
    arr: 14,
    lat: 48.825896,
    lon: 2.306846,
    type: 'public',
    accueil: 'coreal',
    salles: [{ nom: 'Salle principale' }],
    ligne:
      "Une salle de quartier soutenue par la Ville, à Porte de Vanves, qui programme du théâtre de texte et des formes plus larges sans chercher la mode.",
    compagnies: {
      modele: 'Salle soutenue par la Ville de Paris, qui accueille des spectacles et propose des stages professionnels.',
      procedure: "Aucune procédure de dépôt n'est publiée. Le contact se fait par l'administration.",
      contact: 'contact@theatre14.fr',
    },
    site: 'https://www.theatre14.fr/',
    tel: '01 45 45 49 77',
    sources: ['https://www.theatre14.fr/'],
  },
  // ------------------------------------------------------------------- privés
  {
    slug: 'theatre-antoine',
    nom: 'Théâtre Antoine-Simone Berriau',
    adresse: '14 boulevard de Strasbourg',
    cp: '75010',
    arr: 10,
    lat: 48.870599,
    lon: 2.355207,
    type: 'prive',
    accueil: 'coreal',
    salles: [{ nom: 'Salle', places: 780 }],
    annee: 1866,
    direction: 'Jean-Marc Dumontet, depuis 2011',
    monument: 'Inscrit monument historique en 1989',
    ligne:
      "Une des grandes salles privées des Grands Boulevards, qui alterne comédies à distribution connue et pièces plus sombres. C'est ici qu'André Antoine installa son Théâtre-Libre, et que Simone Berriau créa tout le théâtre de Sartre.",
    compagnies: PRIVE_SANS_PROCEDURE,
    site: 'https://www.theatre-antoine.com/',
    alias: ['Théâtre Antoine'],
    sources: ['https://fr.wikipedia.org/wiki/Th%C3%A9%C3%A2tre_Antoine'],
  },
  {
    slug: 'theatre-de-l-atelier',
    nom: "Théâtre de l'Atelier",
    adresse: '1 place Charles-Dullin',
    cp: '75018',
    arr: 18,
    lat: 48.883380,
    lon: 2.342473,
    type: 'prive',
    accueil: 'coreal',
    salles: [{ nom: 'Salle', places: 563 }],
    annee: 1822,
    direction: 'Rose Berthet, depuis janvier 2022',
    monument: 'Inscrit monument historique en 1965',
    ligne:
      "La maison que Charles Dullin a refondée en 1922, sur une placette au pied de Montmartre. Elle programme du théâtre de texte exigeant, souvent porté par des metteurs en scène venus du public.",
    compagnies: PRIVE_SANS_PROCEDURE,
    site: 'https://www.theatre-atelier.com/',
    alias: ["Théâtre de l'Atelier"],
    sources: ['https://fr.wikipedia.org/wiki/Th%C3%A9%C3%A2tre_de_l%27Atelier'],
  },
  {
    slug: 'theatre-montparnasse',
    nom: 'Théâtre Montparnasse',
    adresse: '31 rue de la Gaîté',
    cp: '75014',
    arr: 14,
    lat: 48.839499,
    lon: 2.323534,
    type: 'prive',
    accueil: 'coreal',
    salles: [
      { nom: 'Grande salle', places: 715 },
      { nom: 'Petit Montparnasse', places: 200 },
    ],
    annee: 1886,
    direction: 'Bertrand Thamin, seul depuis avril 2021',
    monument: 'Inscrit monument historique en 1984',
    ligne:
      "Une grande maison de la rue de la Gaîté, qui tient les deux bouts : des adaptations littéraires et des textes contemporains dans la grande salle, des formes plus intimes au Petit Montparnasse.",
    compagnies: PRIVE_SANS_PROCEDURE,
    site: 'https://www.theatremontparnasse.com/',
    alias: ['Théâtre du Petit Montparnasse'],
    sources: ['https://fr.wikipedia.org/wiki/Th%C3%A9%C3%A2tre_Montparnasse'],
  },
  {
    slug: 'theatre-saint-georges',
    nom: 'Théâtre Saint-Georges',
    adresse: '51 rue Saint-Georges',
    cp: '75009',
    arr: 9,
    lat: 48.878145,
    lon: 2.337392,
    type: 'prive',
    accueil: 'coreal',
    salles: [{ nom: 'Salle', places: 490 }],
    annee: 1929,
    direction: 'Pascal Guillaume, Sébastien Azzopardi, Francis Nani et Romain Frobert',
    ligne:
      "Une salle de boulevard au sens noble, connue pour ses comédies bien construites et ses adaptations à gros succès. La jauge reste assez contenue pour qu'on entende jouer les comédiens plutôt que les micros.",
    compagnies: PRIVE_SANS_PROCEDURE,
    site: 'https://www.theatre-saint-georges.com/',
    alias: ['Théâtre Saint-Georges'],
    sources: ['https://fr.wikipedia.org/wiki/Th%C3%A9%C3%A2tre_Saint-Georges'],
  },
  {
    slug: 'theatre-des-varietes',
    nom: 'Théâtre des Variétés',
    adresse: '7 boulevard Montmartre',
    cp: '75002',
    arr: 2,
    lat: 48.871471,
    lon: 2.342142,
    type: 'prive',
    accueil: 'coreal',
    salles: [{ nom: 'Salle' }],
    annee: 1807,
    direction: 'Jean-Manuel Bajen, depuis 2005',
    monument: 'Classé monument historique en 1974',
    ligne:
      "L'une des plus anciennes salles encore en activité sur les Grands Boulevards, créée sous Napoléon et devenue la maison d'Offenbach. Elle programme surtout des comédies et des spectacles à grande distribution.",
    compagnies: PRIVE_SANS_PROCEDURE,
    site: 'https://www.theatre-des-varietes.fr/',
    alias: ['Théâtre des Variétés'],
    sources: ['https://fr.wikipedia.org/wiki/Th%C3%A9%C3%A2tre_des_Vari%C3%A9t%C3%A9s'],
  },
  {
    slug: 'theatre-du-palais-royal',
    nom: 'Théâtre du Palais-Royal',
    adresse: '38 rue de Montpensier',
    cp: '75001',
    arr: 1,
    lat: 48.866057,
    lon: 2.337508,
    type: 'prive',
    accueil: 'coreal',
    salles: [{ nom: 'Salle', places: 716 }],
    annee: 1831,
    direction: 'Francis Nani et Sébastien Azzopardi, depuis 2013',
    monument: 'Façades classées en 1930, théâtre inscrit en 1993',
    ligne:
      "La maison de la comédie et du vaudeville, dans un décor rouge et or qui fait partie du spectacle. On y va pour rire, et la programmation ne prétend pas autre chose.",
    compagnies: PRIVE_SANS_PROCEDURE,
    site: 'https://www.theatrepalaisroyal.com/',
    alias: ['Théâtre du Palais-Royal'],
    sources: ['https://fr.wikipedia.org/wiki/Th%C3%A9%C3%A2tre_du_Palais-Royal'],
  },
  {
    slug: 'theatre-du-gymnase-marie-bell',
    nom: 'Théâtre du Gymnase Marie-Bell',
    adresse: '38 boulevard de Bonne-Nouvelle',
    cp: '75010',
    arr: 10,
    lat: 48.870746,
    lon: 2.348839,
    type: 'prive',
    accueil: 'coreal',
    salles: [
      { nom: 'Grande salle', places: 800 },
      { nom: 'Petit Gymnase', places: 160 },
      { nom: 'Studio Marie-Bell', places: 90 },
    ],
    annee: 1820,
    direction: 'Jean-Marc Dumontet',
    monument: 'Inscrit monument historique en 1994',
    ligne:
      "Trois salles dans le même bâtiment, donc trois économies différentes : la grande salle pour les têtes d'affiche, le Petit Gymnase et le Studio pour les seuls en scène et les premières séries. C'est une des adresses où l'on peut suivre un spectacle qui grandit de la petite salle vers la grande.",
    compagnies: PRIVE_SANS_PROCEDURE,
    site: 'https://www.theatredugymnase.paris/',
    alias: ['Théâtre du Gymnase Marie-Bell', 'Petit Théâtre du Gymnase'],
    sources: ['https://fr.wikipedia.org/wiki/Th%C3%A9%C3%A2tre_du_Gymnase_Marie-Bell'],
  },
  {
    slug: 'theatre-de-la-renaissance',
    nom: 'Théâtre de la Renaissance',
    adresse: '20 boulevard Saint-Martin',
    cp: '75010',
    arr: 10,
    lat: 48.869011,
    lon: 2.356402,
    type: 'prive',
    accueil: 'coreal',
    salles: [{ nom: 'Salle', places: 650 }],
    annee: 1873,
    direction: 'Christian Spillemaecker et Bruno Moynot',
    monument: 'Classé monument historique en 1994',
    ligne:
      "Une salle à l'italienne au décor Second Empire, avec ses cariatides et son plafond à coupole, qui programme surtout des comédies à succès.",
    compagnies: PRIVE_SANS_PROCEDURE,
    site: 'https://www.theatredelarenaissance.com/',
    alias: ['Théâtre de la Renaissance'],
    sources: ['https://fr.wikipedia.org/wiki/Th%C3%A9%C3%A2tre_de_la_Renaissance_(Paris)'],
  },
  {
    slug: 'gaite-montparnasse',
    nom: 'Théâtre de la Gaîté-Montparnasse',
    adresse: '26 rue de la Gaîté',
    cp: '75014',
    arr: 14,
    lat: 48.839319,
    lon: 2.323170,
    type: 'prive',
    accueil: 'coreal',
    salles: [{ nom: 'Salle', places: 399 }],
    annee: 1868,
    direction: 'Louis-Michel Colla et Angélique Thomas-Colla, depuis 1998',
    monument: 'Inscrit monument historique en 1984',
    ligne:
      "Une maison de la rue de la Gaîté qui mélange comédies, seuls en scène et spectacles musicaux, avec une jauge assez petite pour garder de l'intimité.",
    compagnies: PRIVE_SANS_PROCEDURE,
    site: 'https://www.gaite-montparnasse.com/',
    alias: ['Théâtre de la Gaîté-Montparnasse'],
    sources: ['https://fr.wikipedia.org/wiki/Ga%C3%AEt%C3%A9-Montparnasse'],
  },
  {
    slug: 'bouffes-parisiens',
    nom: 'Théâtre des Bouffes-Parisiens',
    adresse: '4 rue Monsigny',
    cp: '75002',
    arr: 2,
    lat: 48.868382,
    lon: 2.335318,
    type: 'prive',
    accueil: 'coreal',
    salles: [{ nom: 'Salle', places: 600 }],
    annee: 1827,
    direction: 'Dominique Dumond',
    ligne:
      "La maison qu'Offenbach a rendue célèbre, aujourd'hui tournée vers la comédie et le spectacle musical. Le lieu a gardé l'échelle et le charme d'un théâtre du XIXe.",
    compagnies: PRIVE_SANS_PROCEDURE,
    site: 'https://www.bouffesparisiens.com/',
    sources: ['https://fr.wikipedia.org/wiki/Th%C3%A9%C3%A2tre_des_Bouffes-Parisiens'],
  },
  {
    slug: 'porte-saint-martin',
    nom: 'Théâtre de la Porte-Saint-Martin',
    adresse: '18 boulevard Saint-Martin',
    cp: '75010',
    arr: 10,
    lat: 48.868965,
    lon: 2.356716,
    type: 'prive',
    accueil: 'coreal',
    salles: [{ nom: 'Salle', places: 1050 }],
    annee: 1781,
    direction: 'Jean Robert-Charrier, avec Jean-Claude Camus depuis 2003',
    monument: 'Inscrit monument historique en 1992',
    ligne:
      "Une très grande salle du boulevard, faite pour les spectacles à distribution nombreuse et les grands textes. Elle a porté le drame romantique au XIXe et retrouve depuis quelques saisons une ambition de répertoire.",
    compagnies: PRIVE_SANS_PROCEDURE,
    site: 'https://www.portestmartin.com/',
    sources: ['https://fr.wikipedia.org/wiki/Th%C3%A9%C3%A2tre_de_la_Porte-Saint-Martin'],
  },
  {
    slug: 'bouffes-du-nord',
    nom: 'Théâtre des Bouffes du Nord',
    adresse: '37 bis boulevard de la Chapelle',
    cp: '75010',
    arr: 10,
    lat: 48.884177,
    lon: 2.358623,
    type: 'prive',
    accueil: 'reseau',
    salles: [{ nom: 'Salle', places: 503 }],
    annee: 1876,
    direction: 'Olivier Mantei et Olivier Poubelle, depuis 2010',
    monument: 'Inscrit monument historique en 1993',
    ligne:
      "La salle aux murs laissés dans leur usure, rouverte par Peter Brook en 1974 et devenue un modèle pour toute une génération de metteurs en scène. Théâtre et musique s'y partagent la saison.",
    spectateur:
      "L'acoustique et la proximité y sont exceptionnelles, mais les places latérales du deuxième niveau demandent de se pencher.",
    compagnies: {
      modele:
        "Modèle mixte, entre production privée et soutien public, avec beaucoup de coproductions et de tournées internationales.",
      procedure:
        "Pas de dépôt de dossier publié. La maison suit des artistes sur la durée plutôt qu'elle n'ouvre des créneaux.",
    },
    site: 'https://www.bouffesdunord.com/',
    sources: ['https://fr.wikipedia.org/wiki/Th%C3%A9%C3%A2tre_des_Bouffes_du_Nord'],
  },
  {
    slug: 'theatre-de-paris',
    nom: 'Théâtre de Paris',
    adresse: '15 rue Blanche',
    cp: '75009',
    arr: 9,
    lat: 48.878671,
    lon: 2.331518,
    type: 'prive',
    accueil: 'coreal',
    salles: [
      { nom: 'Grande salle', places: 1100 },
      { nom: 'Salle Réjane', places: 300 },
    ],
    annee: 1891,
    direction: 'Richard Caillat et Marc Lesage',
    ligne:
      "Une très grande salle qui accueille surtout des comédies musicales et des spectacles à gros moyens, avec la salle Réjane pour des formes plus resserrées. C'est ici qu'Ubu roi fut créé en 1896.",
    compagnies: PRIVE_SANS_PROCEDURE,
    site: 'https://www.theatredeparis.com/',
    sources: ['https://fr.wikipedia.org/wiki/Th%C3%A9%C3%A2tre_de_Paris'],
  },
  {
    slug: 'theatre-edouard-vii',
    nom: 'Théâtre Édouard-VII',
    adresse: '10 place Édouard-VII',
    cp: '75009',
    arr: 9,
    lat: 48.871314,
    lon: 2.329345,
    type: 'prive',
    accueil: 'coreal',
    salles: [{ nom: 'Salle', places: 720 }],
    annee: 1913,
    direction: 'Pascal Legros, depuis 2018',
    ligne:
      "La maison de Sacha Guitry, dans une place cachée entre la Madeleine et l'Opéra. Programmation de théâtre privé haut de gamme, avec des distributions très identifiables.",
    compagnies: PRIVE_SANS_PROCEDURE,
    site: 'https://www.theatreedouard7.com/',
    sources: ['https://fr.wikipedia.org/wiki/Th%C3%A9%C3%A2tre_%C3%89douard-VII'],
  },
  {
    slug: 'theatre-de-la-madeleine',
    nom: 'Théâtre de la Madeleine',
    adresse: '19 rue de Surène',
    cp: '75008',
    arr: 8,
    lat: 48.870982,
    lon: 2.320443,
    type: 'prive',
    accueil: 'coreal',
    salles: [{ nom: 'Salle', places: 709 }],
    annee: 1924,
    direction: 'Michel Lumbroso et Dominique Bergin, direction artistique Philippe Lellouche',
    ligne:
      "Une salle du 8e qui programme des pièces contemporaines et des comédies portées par des noms connus.",
    compagnies: PRIVE_SANS_PROCEDURE,
    site: 'https://www.theatremadeleine.com/',
    sources: ['https://fr.wikipedia.org/wiki/Th%C3%A9%C3%A2tre_de_la_Madeleine'],
  },
  {
    slug: 'theatre-marigny',
    nom: 'Théâtre Marigny',
    adresse: 'Carré Marigny, avenue de Marigny',
    cp: '75008',
    arr: 8,
    lat: 48.870018,
    lon: 2.315458,
    type: 'prive',
    accueil: 'coreal',
    salles: [
      { nom: 'Grande salle', places: 1000 },
      { nom: 'Studio Marigny, salle Popesco', places: 300 },
    ],
    direction: 'Direction artistique Michel Lumbroso',
    ligne:
      "Rouvert en 2018 après cinq ans de travaux, Marigny s'est spécialisé dans la comédie musicale et les grandes formes, dans un écrin très soigné en bas des Champs-Élysées.",
    compagnies: PRIVE_SANS_PROCEDURE,
    site: 'https://www.theatremarigny.fr/',
    sources: ['https://fr.wikipedia.org/wiki/Th%C3%A9%C3%A2tre_Marigny'],
  },
  {
    slug: 'theatre-hebertot',
    nom: 'Théâtre Hébertot',
    adresse: '78 bis boulevard des Batignolles',
    cp: '75017',
    arr: 17,
    lat: 48.882013,
    lon: 2.318984,
    type: 'prive',
    accueil: 'coreal',
    salles: [
      { nom: 'Grande salle', places: 630 },
      { nom: 'Petite salle', places: 110 },
    ],
    annee: 1838,
    direction: 'Francis Lombrail et Stéphane Prouvé, depuis 2013',
    monument: 'Inscrit monument historique en 1974',
    ligne:
      "Une maison de théâtre de texte, classique et contemporain, avec une petite salle qui permet d'accueillir des formes plus fragiles.",
    compagnies: PRIVE_SANS_PROCEDURE,
    site: 'https://www.theatrehebertot.com/',
    sources: ['https://fr.wikipedia.org/wiki/Th%C3%A9%C3%A2tre_H%C3%A9bertot'],
  },
  {
    slug: 'theatre-de-l-oeuvre',
    nom: "Théâtre de l'Œuvre",
    adresse: '3 cité Monthiers, 55 rue de Clichy',
    cp: '75009',
    arr: 9,
    lat: 48.880871,
    lon: 2.328213,
    type: 'prive',
    accueil: 'coreal',
    salles: [{ nom: 'Salle', places: 326 }],
    annee: 1893,
    direction: 'Kim Poignant',
    ligne:
      "Le théâtre qui créa Ubu roi et fit connaître les auteurs scandinaves en France, aujourd'hui propriété du groupe Canal+. On y voit du théâtre de texte, souvent contemporain.",
    compagnies: PRIVE_SANS_PROCEDURE,
    site: 'https://www.theatredeloeuvre.fr/',
    sources: ['https://fr.wikipedia.org/wiki/Th%C3%A9%C3%A2tre_de_l%27%C5%92uvre'],
  },
  {
    slug: 'theatre-tristan-bernard',
    nom: 'Théâtre Tristan-Bernard',
    adresse: '64 rue du Rocher',
    cp: '75008',
    arr: 8,
    lat: 48.878811,
    lon: 2.319220,
    type: 'prive',
    accueil: 'coreal',
    salles: [{ nom: 'Salle' }],
    annee: 1912,
    direction: 'Pascal Guillaume, depuis 2013',
    monument: 'Inscrit monument historique en 1991',
    ligne:
      "Une salle de taille moyenne dans le quartier de l'Europe, qui donne leur chance à des textes contemporains et à des seuls en scène, avec une belle récolte de nominations aux Molières ces dernières saisons.",
    compagnies: PRIVE_SANS_PROCEDURE,
    site: 'https://www.theatretristanbernard.fr/',
    sources: ['https://fr.wikipedia.org/wiki/Th%C3%A9%C3%A2tre_Tristan-Bernard'],
  },
  {
    slug: 'la-pepiniere-theatre',
    nom: 'La Pépinière-Théâtre',
    adresse: '7 rue Louis-le-Grand',
    cp: '75002',
    arr: 2,
    lat: 48.868598,
    lon: 2.332236,
    type: 'prive',
    accueil: 'coreal',
    salles: [{ nom: 'Salle', places: 347 }],
    annee: 1919,
    direction: 'Caroline Verdu-Sap',
    ligne:
      "Une salle du quartier de l'Opéra qui a changé plusieurs fois de nom et qui programme aussi bien la comédie que le spectacle musical, avec des séries souvent primées aux Molières.",
    compagnies: PRIVE_SANS_PROCEDURE,
    site: 'https://www.theatrelapepiniere.com/',
    sources: ['https://fr.wikipedia.org/wiki/Th%C3%A9%C3%A2tre_de_la_P%C3%A9pini%C3%A8re'],
  },
  {
    slug: 'le-splendid',
    nom: 'Le Splendid',
    adresse: '48 rue du Faubourg-Saint-Martin',
    cp: '75010',
    arr: 10,
    lat: 48.870710,
    lon: 2.356726,
    type: 'prive',
    accueil: 'coreal',
    salles: [{ nom: 'Salle', places: 300 }],
    annee: 1974,
    direction: 'Bruno Moynot et Christian Spillemaecker',
    ligne:
      "Le café-théâtre fondé par la bande du Splendid en 1974, installé depuis 1981 dans un ancien cinéma du faubourg Saint-Martin. Comédies et humour, dans la lignée de la maison.",
    compagnies: PRIVE_SANS_PROCEDURE,
    site: 'https://www.lesplendid.com/',
    sources: ['https://fr.wikipedia.org/wiki/Le_Splendid', 'https://www.lesplendid.com/'],
  },
  {
    slug: 'theatre-des-mathurins',
    nom: 'Théâtre des Mathurins',
    adresse: '36 rue des Mathurins',
    cp: '75008',
    arr: 8,
    lat: 48.873274,
    lon: 2.325636,
    type: 'prive',
    accueil: 'coreal',
    salles: [{ nom: 'Salle à l’italienne', places: 386 }],
    annee: 1898,
    direction: 'Dominique Bergin, Pierre Callegari et Louis-Michel Colla, depuis 2019',
    ligne:
      "Une salle à l'italienne de taille humaine, qui alterne classiques revisités, textes contemporains et formes plus expérimentales.",
    compagnies: PRIVE_SANS_PROCEDURE,
    site: 'https://www.theatredesmathurins.com/',
    sources: ['https://fr.wikipedia.org/wiki/Th%C3%A9%C3%A2tre_des_Mathurins'],
  },
  {
    slug: 'theatre-de-poche-montparnasse',
    nom: 'Théâtre de Poche-Montparnasse',
    adresse: '75 boulevard du Montparnasse',
    cp: '75006',
    arr: 6,
    lat: 48.843728,
    lon: 2.324991,
    type: 'prive',
    accueil: 'coreal',
    salles: [
      { nom: 'Grand Poche', places: 100 },
      { nom: 'Petit Poche', places: 60 },
    ],
    annee: 1943,
    direction: 'Stéphanie Tesson et Charlotte Rondelez, depuis 2013',
    ligne:
      "Deux toutes petites salles au fond d'une impasse, avec une vraie tradition de découverte : on y crée des auteurs connus comme parfaitement inconnus.",
    spectateur: "À cette échelle, il n'y a pas de mauvaise place, mais les premiers rangs sont vraiment sur le plateau.",
    compagnies: {
      modele:
        "Maison privée de petite jauge, historiquement ouverte aux jeunes autrices et auteurs.",
      procedure:
        "Aucune procédure publiée. Vu la taille et la ligne de la maison, un dossier court adressé à la direction a du sens.",
    },
    site: 'https://www.theatredepoche-montparnasse.com/',
    sources: ['https://fr.wikipedia.org/wiki/Th%C3%A9%C3%A2tre_de_Poche-Montparnasse'],
  },
  {
    slug: 'la-scala-paris',
    nom: 'La Scala Paris',
    adresse: '13 boulevard de Strasbourg',
    cp: '75010',
    arr: 10,
    lat: 48.870299,
    lon: 2.354572,
    type: 'prive',
    accueil: 'coreal',
    salles: [
      { nom: 'Grande salle', places: 550 },
      { nom: 'Piccola Scala', places: 180 },
    ],
    annee: 2018,
    direction: 'Mélanie et Frédéric Biessy',
    ligne:
      "Un ancien music-hall devenu cinéma, puis rouvert en 2018 en salle modulable de très haute qualité technique. La programmation mêle théâtre, danse, musique, nouveau cirque et arts numériques, ce qui en fait l'une des adresses les moins prévisibles de Paris.",
    compagnies: {
      modele:
        "Maison privée qui produit et coproduit beaucoup, avec une gradin modulable qui autorise des dispositifs impossibles ailleurs.",
      procedure: "Aucune procédure de dépôt publiée. Le contact passe par l'administration de la salle.",
    },
    site: 'https://lascala-paris.fr/',
    alias: ['La Scala Paris'],
    sources: ['https://fr.wikipedia.org/wiki/La_Scala_(Paris)'],
  },
  {
    slug: 'theatre-de-la-huchette',
    nom: 'Théâtre de la Huchette',
    adresse: '23 rue de la Huchette',
    cp: '75005',
    arr: 5,
    lat: 48.853025,
    lon: 2.345354,
    type: 'prive',
    accueil: 'coreal',
    salles: [{ nom: 'Salle', places: 85 }],
    annee: 1948,
    direction: 'Franck Desmedt, depuis 2016',
    ligne:
      "Quatre-vingt-cinq places et un record du monde : La Cantatrice chauve et La Leçon de Ionesco s'y jouent sans interruption depuis février 1957. Une troisième pièce complète l'affiche, et la maison s'est ouverte au spectacle musical depuis 2016.",
    spectateur:
      "La salle est minuscule et la rue très touristique, mais l'expérience Ionesco vaut le détour au moins une fois dans une vie de spectateur.",
    compagnies: PRIVE_SANS_PROCEDURE,
    site: 'https://www.theatre-huchette.com/',
    tel: '01 43 26 38 99',
    alias: ['Théâtre de la Huchette'],
    sources: ['https://fr.wikipedia.org/wiki/Th%C3%A9%C3%A2tre_de_la_Huchette'],
  },
  {
    slug: 'theatre-michel',
    nom: 'Théâtre Michel',
    adresse: '38 rue des Mathurins',
    cp: '75008',
    arr: 8,
    lat: 48.873287,
    lon: 2.325460,
    type: 'prive',
    accueil: 'coreal',
    salles: [{ nom: 'Salle', places: 350 }],
    annee: 1908,
    direction: 'Karim Daghefali, président-directeur général depuis juin 2025, direction artistique Sébastien Azzopardi',
    ligne:
      "Une salle de comédie du 8e, qui a créé Boeing Boeing de Marc Camoletti et ses milliers de représentations. On y voit surtout des comédies contemporaines et du mentalisme.",
    compagnies: PRIVE_SANS_PROCEDURE,
    site: 'https://www.theatre-michel.fr/',
    tel: '01 42 65 35 02',
    alias: ['Théâtre Michel'],
    sources: ['https://www.offi.fr/theatre/theatre-michel-2780.html'],
  },
  {
    slug: 'gaite-rive-gauche',
    nom: 'Théâtre Gaîté Rive Gauche',
    adresse: '6 rue de la Gaîté',
    cp: '75014',
    arr: 14,
    lat: 48.840770,
    lon: 2.324362,
    type: 'prive',
    accueil: 'coreal',
    salles: [{ nom: 'Salle', places: 400 }],
    direction: "Repris par l'équipe de la Gaîté-Montparnasse",
    ligne:
      "Ancien cabaret devenu cinéma puis théâtre en 1994, rénové depuis peu avec un équipement vidéo très complet. Humour, comédie, magie et spectacles interactifs.",
    compagnies: PRIVE_SANS_PROCEDURE,
    site: 'https://lagaiterivegauche.com/',
    alias: ['Théâtre Gaîté Rive Gauche'],
    sources: ['https://www.offi.fr/theatre/theatre-rive-gauche-3077.html'],
  },
  {
    slug: 'le-theatre-libre',
    nom: 'Le Théâtre Libre',
    adresse: '4 boulevard de Strasbourg',
    cp: '75010',
    arr: 10,
    lat: 48.869821,
    lon: 2.354771,
    type: 'prive',
    accueil: 'coreal',
    salles: [{ nom: 'Grande salle', places: 934 }, { nom: 'La Scène Libre' }],
    ligne:
      "Une grande salle moderne du boulevard de Strasbourg, doublée d'une seconde plus petite. Théâtre, seuls en scène, spectacles musicaux et jeune public s'y succèdent.",
    compagnies: PRIVE_SANS_PROCEDURE,
    site: 'https://le-theatrelibre.fr/',
    alias: ['Le Théâtre Libre'],
    sources: ['https://www.offi.fr/theatre/theatre-libre-1903.html'],
  },
  {
    slug: 'le-13e-art',
    nom: 'Le 13e Art',
    adresse: "Centre commercial Italie 2, place d'Italie",
    cp: '75013',
    arr: 13,
    lat: 48.832118,
    lon: 2.354705,
    type: 'prive',
    accueil: 'coreal',
    salles: [
      { nom: 'Grande salle', places: 900 },
      { nom: 'Petite salle', places: 130 },
    ],
    annee: 2017,
    ligne:
      "Un théâtre ouvert en 2017 au cœur d'un centre commercial de la place d'Italie, ce qui surprend jusqu'à ce qu'on y entre. Programmation très large, du cirque au théâtre visuel en passant par l'humour et la danse.",
    compagnies: PRIVE_SANS_PROCEDURE,
    site: 'https://www.le13emeart.com/',
    alias: ['Le 13e Art'],
    sources: ['https://www.offi.fr/theatre/le-13eme-art-6566.html'],
  },
  // ------------------------------------------------------------ petites salles
  {
    slug: 'le-funambule-montmartre',
    nom: 'Le Funambule Montmartre',
    adresse: '53 rue des Saules',
    cp: '75018',
    arr: 18,
    lat: 48.890751,
    lon: 2.340416,
    type: 'petite-salle',
    accueil: 'coreal',
    salles: [{ nom: 'Salle', places: 120 }],
    direction: 'Sandra Everro et Julien Héteau, depuis 2006',
    ligne:
      "Une salle de cent vingt places en haut de Montmartre, rénovée en 2016, qui assume une programmation à la fois grand public et exigeante : comédies, théâtre contemporain, seuls en scène et jeune public.",
    spectateur: 'Les tarifs y restent entre dix et seize euros, ce qui en fait une bonne salle pour tenter un inconnu.',
    compagnies: {
      modele:
        "Petite salle indépendante qui accueille des compagnies en séries courtes, sur le modèle habituel de la coréalisation.",
      procedure: "Aucune procédure publiée en ligne. Le contact se fait directement avec la direction.",
    },
    site: 'https://www.funambule-montmartre.com/',
    tel: '01 42 23 88 83',
    alias: ['Le Funambule Montmartre'],
    sources: ['https://www.offi.fr/theatre/le-funambule-2362.html'],
  },
  {
    slug: 'theatre-des-beliers-parisiens',
    nom: 'Théâtre des Béliers Parisiens',
    adresse: '14 bis rue Sainte-Isaure',
    cp: '75018',
    arr: 18,
    lat: 48.893710,
    lon: 2.344278,
    type: 'petite-salle',
    accueil: 'coreal',
    salles: [{ nom: 'Salle', places: 195 }],
    annee: 2012,
    direction: 'Florent Bruneau, Arthur Jugnot, David Roussel et Frédéric Thibault',
    ligne:
      "L'antenne parisienne des Béliers d'Avignon, ouverte en 2012 dans le 18e. Théâtre contemporain accessible, avec beaucoup de spectacles repérés au festival OFF qui viennent y faire leur saison.",
    compagnies: {
      modele:
        "Salle privée de deux cents places, tenue par des gens de plateau, qui prolonge à Paris des spectacles vus à Avignon.",
      procedure:
        "Aucune procédure publiée. Être vu au OFF dans leur salle avignonnaise reste la porte d'entrée la plus évidente.",
    },
    site: 'https://www.lesbeliersparisiens.com/',
    alias: ['Théâtre des Béliers Parisiens'],
    sources: ['https://www.offi.fr/theatre/theatre-des-beliers-3223.html'],
  },
  {
    slug: 'theatre-lepic',
    nom: 'Théâtre Lepic',
    adresse: '1 avenue Junot',
    cp: '75018',
    arr: 18,
    lat: 48.887636,
    lon: 2.337265,
    type: 'petite-salle',
    accueil: 'coreal',
    salles: [{ nom: 'Salle', places: 120 }],
    annee: 1982,
    ligne:
      "Une salle de cent vingt places sur les pentes de Montmartre, reconstruite en 1982 par Claude Lelouch, qui accueille et soutient des compagnies émergentes.",
    compagnies: {
      modele:
        "Petite salle qui revendique l'accompagnement de compagnies émergentes, en séries courtes.",
      procedure: "Pas de formulaire public. C'est typiquement une salle où un dossier direct a des chances d'être lu.",
    },
    site: 'https://www.theatrelepic.com/',
    alias: ['Théâtre Lepic'],
    sources: ['https://www.offi.fr/theatre/theatre-lepic-1813.html'],
  },
  {
    slug: 'theatre-edgar',
    nom: 'Théâtre Edgar',
    adresse: '58 boulevard Edgar-Quinet',
    cp: '75014',
    arr: 14,
    lat: 48.841509,
    lon: 2.324432,
    type: 'petite-salle',
    accueil: 'coreal',
    salles: [{ nom: 'Salle', places: 132 }],
    annee: 1973,
    direction: 'Luq Hamett, depuis 2014',
    ligne:
      "Un café-théâtre historique de Montparnasse, né en 1973 sous le nom de Théâtre Bleu, racheté et rénové en 2014. Comédies et spectacles familiaux.",
    compagnies: {
      modele: 'Café-théâtre privé, séries longues en soirée, créneaux courts en semaine.',
      procedure: "Aucune procédure publiée. La salle propose aussi de la privatisation, gérée séparément.",
    },
    site: 'https://www.theatre-edgar.com/',
    tel: '01 42 79 97 97',
    alias: ['Théâtre Edgar'],
    sources: ['https://www.offi.fr/theatre/cafe-dedgar-1602.html'],
  },
  {
    slug: 'le-passage-vers-les-etoiles',
    nom: 'Théâtre Le Passage vers les Étoiles',
    adresse: '17 cité Joly',
    cp: '75011',
    arr: 11,
    lat: 48.862856,
    lon: 2.382571,
    type: 'petite-salle',
    accueil: 'coreal',
    salles: [
      { nom: 'Salle 1', places: 100 },
      { nom: 'Salle 2', places: 70 },
    ],
    annee: 2005,
    direction: 'Frank Maillol',
    ligne:
      "Deux petites salles au fond d'une cité du 11e, créées en 2005 comme un lieu ouvert aux artistes indépendants. Classiques, créations, comédie et improvisation s'y côtoient.",
    compagnies: {
      modele:
        "Lieu indépendant qui se définit par son ouverture aux compagnies sans producteur, avec des créneaux réguliers.",
      procedure: "Pas de procédure en ligne, mais c'est une des salles où le contact direct est le plus naturel.",
    },
    site: 'https://lepassageverslesetoiles.com/',
    sources: ['https://www.offi.fr/theatre/theatre-le-passage-vers-les-etoiles-2956.html'],
  },
  {
    slug: 'la-nouvelle-seine',
    nom: 'La Nouvelle Seine',
    adresse: 'Péniche face au 3 quai de Montebello',
    cp: '75005',
    arr: 5,
    lat: 48.851482,
    lon: 2.349954,
    type: 'petite-salle',
    accueil: 'coreal',
    salles: [{ nom: 'Salle', places: 110 }],
    ligne:
      "Une péniche amarrée face à Notre-Dame, avec un restaurant sous verrière et la salle en contrebas. Humour, seuls en scène et cabaret.",
    spectateur: "Le théâtre ferme l'été et rouvre à la mi-septembre, ce que le site rappelle chaque année.",
    compagnies: {
      modele: 'Petite salle privée, programmation resserrée autour de l’humour.',
      procedure: "Aucune procédure publiée. Contact par le formulaire du site.",
    },
    site: 'https://lanouvelleseine.com/',
    tel: '01 43 54 08 08',
    alias: ['La Nouvelle Seine'],
    sources: ['https://www.offi.fr/theatre/la-nouvelle-seine-5821.html'],
  },
  {
    slug: 'le-lucernaire',
    nom: 'Le Lucernaire',
    adresse: '53 rue Notre-Dame-des-Champs',
    cp: '75006',
    arr: 6,
    lat: 48.844242,
    lon: 2.330403,
    type: 'petite-salle',
    accueil: 'coreal',
    salles: [{ nom: 'Théâtre Rouge' }, { nom: 'Théâtre Noir' }, { nom: 'Théâtre Paradis' }],
    ligne:
      "Un centre culturel plus qu'un théâtre : trois salles, deux cinémas d'art et essai, un restaurant, et une programmation qui va du classique au jeune public dans la même journée.",
    compagnies: {
      modele: 'Lieu privé à plusieurs salles, qui accueille de nombreuses compagnies en séries longues.',
      procedure: "Aucune procédure publiée. Une demande passe par le formulaire de contact du site.",
    },
    site: 'https://www.lucernaire.fr/',
    tel: '01 45 44 57 34',
    sources: ['https://www.lucernaire.fr/'],
  },
];

export const theatreBySlug = (slug: string): Theatre | undefined =>
  THEATRES.find((t) => t.slug === slug);

/** Retrouve la fiche d'une salle à partir du libellé porté par une critique. */
export const theatrePourSalle = (salle?: string): Theatre | undefined => {
  if (!salle) return undefined;
  const s = salle.trim().toLowerCase();
  return THEATRES.find(
    (t) => t.nom.toLowerCase() === s || (t.alias ?? []).some((a) => a.toLowerCase() === s),
  );
};

export const LIBELLE_TYPE: Record<TypeTheatre, string> = {
  national: 'Théâtre national',
  public: 'Scène publique',
  prive: 'Théâtre privé',
  'petite-salle': 'Petite salle',
};

/** Libellé court, pour les pastilles et les filtres. */
export const LIBELLE_ACCUEIL: Record<ModeAccueil, string> = {
  projet: 'Dépôt de projet publié',
  coreal: 'Coréalisation ou location',
  reseau: 'Coproduction et invitation',
  troupe: 'Troupe permanente',
};

/** La même chose en une phrase, pour les listes et les fiches. */
export const EXPLIQUE_ACCUEIL: Record<ModeAccueil, string> = {
  projet:
    "La salle publie une procédure : dépôt de dossier, appel à projets ou concours, avec des dates. C'est la porte la plus ouverte de l'annuaire.",
  coreal:
    "La salle accueille des spectacles en coréalisation ou en location, mais ne publie pas de procédure : il faut écrire directement à l'administration.",
  reseau:
    "Ni dépôt ni location : on y entre par la coproduction, la tournée ou l'invitation, décidées souvent deux saisons à l'avance.",
  troupe: "La maison joue avec sa troupe permanente et n'accueille pas de compagnie extérieure.",
};

/** De la porte la plus ouverte à la plus fermée, pour trier et filtrer. */
export const ORDRE_ACCUEIL: ModeAccueil[] = ['projet', 'coreal', 'reseau', 'troupe'];
