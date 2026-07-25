// Génère les cartes de partage 1200×630 (Open Graph) pour chaque critique.
// Pré-génération LOCALE avec sharp : les PNG sont committés dans public/og,
// donc rien à installer côté CI. Relancer après ajout/retrait de critiques.
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const ROOT = process.cwd();
const OUT = path.join(ROOT, 'public/og');
fs.mkdirSync(OUT, { recursive: true });

const C = { paper: '#f3ede1', card: '#fbf7ee', ink: '#1a1815', ink3: '#857a67', red: '#9e2b25', gold: '#e7b53c' };
const W = 1200, H = 630;

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

function starsFor(n) { return n >= 8 ? 5 : n > 5 ? 4 : 3; }
function verdictFor(n) { return n >= 8 ? 'Grosse claque' : n > 5 ? 'Belle claque' : 'Petite claque'; }

function starPath(cx, cy, outer, inner) {
  let d = '';
  for (let i = 0; i < 10; i++) {
    const r = i % 2 === 0 ? outer : inner;
    const a = (-90 + i * 36) * Math.PI / 180;
    const x = cx + r * Math.cos(a), y = cy + r * Math.sin(a);
    d += (i === 0 ? 'M' : 'L') + x.toFixed(1) + ' ' + y.toFixed(1);
  }
  return d + 'Z';
}

function wrap(text, maxChars) {
  const words = text.split(/\s+/);
  const lines = [];
  let cur = '';
  for (const w of words) {
    if ((cur + ' ' + w).trim().length > maxChars && cur) { lines.push(cur); cur = w; }
    else cur = (cur + ' ' + w).trim();
  }
  if (cur) lines.push(cur);
  return lines;
}

async function makeCard(piece) {
  const imgPath = path.join(ROOT, 'public', piece.image);
  // Fond : affiche en cover, floutée et assombrie.
  const bg = await sharp(imgPath).resize(W, H, { fit: 'cover' }).blur(22).modulate({ brightness: 0.5, saturation: 1.05 }).toBuffer();
  // Portrait net à gauche, contenu dans une boîte (gère aussi les affiches paysage).
  const port = await sharp(imgPath).resize({ height: 486, width: 440, fit: 'inside' }).toBuffer({ resolveWithObject: true });
  const pw = port.info.width, ph = port.info.height;
  const px = 70, py = Math.round((H - ph) / 2) + 6;

  const textX = px + pw + 60;
  const colW = W - textX - 64;

  const st = starsFor(piece.noteMoy);
  const title = piece.titre;
  const size = title.length <= 18 ? 64 : title.length <= 30 ? 54 : title.length <= 44 ? 45 : 38;
  const maxChars = Math.max(8, Math.floor(colW / (size * 0.5)));
  const lines = wrap(title, maxChars);
  const titleTop = 250;
  const lineH = size * 1.1;

  // Étoiles
  const starsY = 520, sO = 17, sI = 7.2, gap = 42;
  let stars = '';
  for (let i = 0; i < 5; i++) {
    const cx = textX + sO + i * gap;
    stars += `<path d="${starPath(cx, starsY, sO, sI)}" fill="${i < st ? C.gold : 'rgba(255,255,255,0.25)'}"/>`;
  }

  const svg = `<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
    <rect x="0" y="0" width="${W}" height="14" fill="${C.red}"/>
    <rect x="${px - 5}" y="${py - 5}" width="${pw + 10}" height="${ph + 10}" fill="#fff" opacity="0.9"/>
    <text x="${textX}" y="108" font-family="Georgia, 'Times New Roman', serif" font-weight="700" font-size="46" fill="#fff">La <tspan fill="${C.red}" style="fill:#e2564b">Claque</tspan></text>
    <text x="${textX}" y="162" font-family="Helvetica, Arial, sans-serif" font-weight="700" font-size="21" letter-spacing="3" fill="${C.gold}">CRITIQUE · ${esc((piece.festival || 'Théâtre').toUpperCase())}</text>
    ${lines.map((l, i) => `<text x="${textX}" y="${titleTop + i * lineH}" font-family="Georgia, 'Times New Roman', serif" font-weight="700" font-size="${size}" fill="#fff">${esc(l)}</text>`).join('')}
    ${stars}
    <text x="${textX + 5 * gap + 6}" y="${starsY + 11}" font-family="Helvetica, Arial, sans-serif" font-weight="700" font-size="30" fill="${C.gold}">${esc(verdictFor(piece.noteMoy))}</text>
    <text x="${textX}" y="580" font-family="Georgia, serif" font-style="italic" font-size="26" fill="rgba(255,255,255,0.82)">Critique de théâtre, à plusieurs paires d'yeux</text>
  </svg>`;

  await sharp(bg)
    .composite([
      { input: Buffer.from(`<svg width="${W}" height="${H}"><rect width="${W}" height="${H}" fill="${C.ink}" opacity="0.68"/></svg>`) },
      { input: port.data, left: px, top: py },
      { input: Buffer.from(svg), left: 0, top: 0 },
    ])
    .png()
    .toFile(path.join(OUT, `${piece.slug}.png`));
}

async function makeDefault() {
  const svg = `<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
    <rect width="${W}" height="${H}" fill="${C.paper}"/>
    <rect x="0" y="0" width="${W}" height="16" fill="${C.red}"/>
    <text x="${W / 2}" y="290" text-anchor="middle" font-family="Georgia, serif" font-weight="700" font-size="120" fill="${C.ink}">La <tspan fill="${C.red}">Claque</tspan></text>
    <text x="${W / 2}" y="360" text-anchor="middle" font-family="Helvetica, Arial, sans-serif" font-weight="700" font-size="28" letter-spacing="4" fill="${C.ink3}">CRITIQUES DE THÉÂTRE · OFF D'AVIGNON</text>
    <text x="${W / 2}" y="430" text-anchor="middle" font-family="Georgia, serif" font-style="italic" font-size="34" fill="#4a4034">On voit tout, on note fort, on vous raconte.</text>
  </svg>`;
  await sharp(Buffer.from(svg)).png().toFile(path.join(OUT, 'default.png'));
}

// Parse pieces.ts
const src = fs.readFileSync(path.join(ROOT, 'src/data/pieces.ts'), 'utf8');
const re = /\{\s*\n\s*slug: '([^']+)'[\s\S]*?\n  \}/g;
let m;
const pieces = [];
while ((m = re.exec(src))) {
  const b = m[0];
  const g = (k) => {
    const s = b.match(new RegExp(k + `:\\s*'([^']*)'`));
    if (s) return s[1];
    const d = b.match(new RegExp(k + `:\\s*"([^"]*)"`));
    return d ? d[1] : undefined;
  };
  const slug = m[1];
  const titre = g('titre');
  const image = g('image');
  const festival = g('festival') || '';
  const noteMoy = parseFloat((b.match(/noteMoy:\s*([0-9.]+)/) || [])[1]);
  if (slug && image) pieces.push({ slug, titre, image, festival, noteMoy });
}

const only = process.argv[2];
const list = only ? pieces.filter((p) => p.slug === only) : pieces;
await makeDefault();
for (const p of list) { await makeCard(p); console.log('og:', p.slug); }
console.log(`\n${list.length} carte(s) + default générées dans public/og/`);
