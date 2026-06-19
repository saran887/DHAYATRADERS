import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const assetsDir = './public/assets';

function optimizeDir(dir) {
  if (!fs.existsSync(dir)) {
    console.error(`Directory does not exist: ${dir}`);
    return;
  }
  fs.readdirSync(dir).forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      // Don't recurse into .aistudio or internal metadata folders
      if (file.startsWith('.')) return;
      optimizeDir(fullPath);
    } else if (/\.(jpg|png)$/i.test(file)) {
      const ext = path.extname(file);
      const nameWithoutExt = path.basename(file, ext);
      const outPath = path.join(dir, `${nameWithoutExt}.webp`);
      
      console.log(`Optimizing ${fullPath} -> ${outPath}`);
      sharp(fullPath)
        .webp({ quality: 80 })
        .toFile(outPath)
        .then(() => {
          console.log(`Success: ${outPath}`);
        })
        .catch(err => {
          console.error(`Error: ${fullPath}`, err);
        });

      // Generate 400px and 800px size variants for srcset
      const outPath400 = path.join(dir, `${nameWithoutExt}-400.webp`);
      const outPath800 = path.join(dir, `${nameWithoutExt}-800.webp`);
      
      sharp(fullPath)
        .resize(400)
        .webp({ quality: 80 })
        .toFile(outPath400)
        .then(() => {
          console.log(`Success: ${outPath400}`);
        })
        .catch(err => console.error(`Error resizing 400w: ${file}`, err));
        
      sharp(fullPath)
        .resize(800)
        .webp({ quality: 80 })
        .toFile(outPath800)
        .then(() => {
          console.log(`Success: ${outPath800}`);
        })
        .catch(err => console.error(`Error resizing 800w: ${file}`, err));
    }
  });
}

optimizeDir(assetsDir);
