import rss from '@astrojs/rss';
import { PIECES } from '../data/pieces';
import { url as path } from '../lib/url';

const BASE = import.meta.env.BASE_URL;

export function GET(context) {
  const items = [...PIECES]
    .sort((a, b) => b.noteMoy - a.noteMoy)
    .map((p) => ({
      title: p.titre,
      description: p.chapo,
      link: path(`critiques/${p.slug}`),
      pubDate: new Date('2026-07-24T10:00:00Z'),
      categories: p.festival ? [p.festival] : undefined,
    }));

  return rss({
    title: 'La Claque — critiques de théâtre',
    description:
      "Les critiques de théâtre de La Claque : le Festival OFF d'Avignon et les salles parisiennes, vus par une bande de comédien·nes et racontés par un seul rédacteur.",
    site: new URL(BASE, context.site).href,
    items,
    customData: '<language>fr-fr</language>',
  });
}
