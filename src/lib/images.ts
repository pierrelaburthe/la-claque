// Les affiches passent par le pipeline d'images d'Astro.
//
// Elles vivaient dans `public/affiches`, servies telles quelles : 11 Mo de
// JPEG et de PNG d'origine, jusqu'à 1 Mo pièce, sans dimensions dans le HTML
// (donc du décalage de mise en page au chargement) et sans format moderne.
// Depuis `src/assets/affiches`, Astro les redimensionne, les convertit en WebP
// et écrit width/height dans la balise.
//
// `pieces.ts` continue de désigner l'affiche par son chemin d'origine
// (« /affiches/xxx.jpg ») : c'est lisible dans les données et ça évite un
// import par pièce. La correspondance se fait ici, sur le nom de fichier.

const FICHIERS = import.meta.glob<{ default: ImageMetadata }>(
  '../assets/affiches/*.{jpg,jpeg,png,webp}',
  { eager: true },
);

// Index par nom de fichier : « la-tour-de-la-defense.jpeg » → ImageMetadata.
const PAR_NOM = new Map<string, ImageMetadata>(
  Object.entries(FICHIERS).map(([chemin, mod]) => [
    chemin.split('/').pop() as string,
    mod.default,
  ]),
);

/**
 * L'affiche d'une pièce, prête pour <Image />. `undefined` quand la pièce n'a
 * pas d'affiche, ou quand le fichier a disparu : l'appelant retombe alors sur
 * son propre fallback plutôt que de casser le build.
 */
export function affiche(chemin?: string): ImageMetadata | undefined {
  if (!chemin) return undefined;
  return PAR_NOM.get(chemin.split('/').pop() as string);
}
