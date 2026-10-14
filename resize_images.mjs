import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const REPO = path.dirname(fileURLToPath(import.meta.url));
const ORIGINALS = path.join(REPO, 'originals');

if (!fs.existsSync(ORIGINALS)) fs.mkdirSync(ORIGINALS);

const tasks = [
  ['lockassure.webp',   488, 366, 82],
  ['kenny.webp',        null, null, 80],
  ['drinkmave.webp',    500, 375, 82],
  ['whole-nights.webp', 500, 375, 82],
  ['laboostudio.webp',  616, 462, 82],
  ['GaryM.webp',         84,  84, 82],
  ['craig.webp',        null, null, 80],
];

for (const [file, w, h, q] of tasks) {
  const src = path.join(REPO, file);
  const bak = path.join(ORIGINALS, file);

  if (!fs.existsSync(src)) { console.log(`SKIP (not found): ${file}`); continue; }

  const origBuf = fs.readFileSync(src);
  fs.writeFileSync(bak, origBuf);

  let img = sharp(origBuf);
  if (w && h) img = img.resize(w, h, { fit: 'cover' });

  const outBuf = await img.webp({ quality: q }).toBuffer();

  const origSize = origBuf.length;
  fs.writeFileSync(src, outBuf);

  console.log(`${file}: ${(origSize/1024).toFixed(1)} KB → ${(outBuf.length/1024).toFixed(1)} KB (${w ? w+'×'+h : 'recompress'} q${q})`);
}

console.log('\nDone. Originals backed up to:', ORIGINALS);
