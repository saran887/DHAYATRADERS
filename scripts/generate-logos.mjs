/**
 * generate-logos.mjs
 *
 * Generates responsive WebP logo variants from the high-resolution source
 * logo at public/logo.webp. Each variant is resized directly from the
 * original to preserve maximum quality—smaller sizes are never derived
 * from other resized variants.
 *
 * Usage:
 *   node scripts/generate-logos.mjs
 *   npm run generate:logos
 */

import sharp from 'sharp';
import { existsSync, mkdirSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const ROOT = resolve(__dirname, '..');

const SOURCE = resolve(ROOT, 'public', 'logo.webp');
const OUT_DIR = resolve(ROOT, 'public', 'assets');

/** Widths to generate (px). The original (~1104px) is kept as-is. */
const WIDTHS = [48, 64, 128, 256, 512, 1024];

/** WebP quality setting (0–100). 90 balances sharpness and file size. */
const QUALITY = 90;

async function main() {
  // Ensure output directory exists
  if (!existsSync(OUT_DIR)) {
    mkdirSync(OUT_DIR, { recursive: true });
    console.log(`Created directory: ${OUT_DIR}`);
  }

  // Read source metadata once
  const meta = await sharp(SOURCE).metadata();
  console.log(`Source: ${meta.width}×${meta.height} (${meta.format})\n`);

  // Also copy the original into public/assets/ as the full-resolution fallback
  const originalDest = resolve(OUT_DIR, 'logo.webp');
  await sharp(SOURCE)
    .webp({ quality: QUALITY })
    .toFile(originalDest);
  console.log(`  ✓ logo.webp (${meta.width}×${meta.height}) → assets/logo.webp`);

  for (const width of WIDTHS) {
    // Skip if the requested width exceeds the source width
    if (width > meta.width) {
      console.log(`  ⊘ logo-${width}w.webp skipped (exceeds source width)`);
      continue;
    }

    const outPath = resolve(OUT_DIR, `logo-${width}w.webp`);

    // Resize from the ORIGINAL source each time (never from another variant).
    // sharp's .resize() with only width preserves aspect ratio automatically.
    await sharp(SOURCE)
      .resize({ width, withoutEnlargement: true })
      .webp({ quality: QUALITY })
      .toFile(outPath);

    // Read back to report actual dimensions
    const info = await sharp(outPath).metadata();
    console.log(`  ✓ logo-${width}w.webp (${info.width}×${info.height})`);
  }

  console.log('\nDone. All variants generated from the original source.');
}

main().catch((err) => {
  console.error('Logo generation failed:', err);
  process.exit(1);
});
