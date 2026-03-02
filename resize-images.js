const { Jimp } = require('jimp');
const path = require('path');
const fs = require('fs');

const TARGET_W = 454;
const TARGET_H = 280;

const images = [
  'public/images/alling-16.jpg',
  'public/images/How-Does-Spring-AC-Maintenance-Improve-Efficiency-1024x683.jpg',
  'public/images/Air-Duct-Cleaning-How-Often-Atmosphere-Air-Care.jpg',
  // Note: .webp not supported by jimp — handled separately below
];

async function resize(filePath) {
  const img = await Jimp.read(filePath);
  await img.cover({ w: TARGET_W, h: TARGET_H });
  await img.write(filePath);
  console.log(`✓ ${path.basename(filePath)} → ${TARGET_W}×${TARGET_H}`);
}

(async () => {
  for (const f of images) {
    try {
      await resize(f);
    } catch (e) {
      console.error(`✗ ${f}: ${e.message}`);
    }
  }

  // For webp: copy it as jpg with the same cover crop approach
  const webpSrc = 'public/images/Air-Conditioner-Installation.webp';
  const jpgOut  = 'public/images/Air-Conditioner-Installation.jpg';
  if (fs.existsSync(webpSrc)) {
    console.log(`ℹ Skipping ${path.basename(webpSrc)} (webp not supported by jimp)`);
    console.log(`  → If you have the original jpg, place it as: ${jpgOut}`);
  }

  console.log('Done.');
})();

