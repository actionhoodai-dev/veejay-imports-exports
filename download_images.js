const https = require('https');
const fs = require('fs');
const path = require('path');

const assetsDir = path.join(__dirname, 'public', 'assets');

const images = [
  {
    url: 'https://images.unsplash.com/photo-1586528116311-083d3937965c?w=1600&auto=format&fit=crop',
    file: 'warehouse.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1436491865332-7a61a109c0f2?w=1600&auto=format&fit=crop',
    file: 'about_bg.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1521295121781-8bf5f6a25f7d?w=1600&auto=format&fit=crop',
    file: 'global_bg.jpg'
  }
];

if (!fs.existsSync(assetsDir)) {
  fs.mkdirSync(assetsDir, { recursive: true });
}

images.forEach(img => {
  const dest = path.join(assetsDir, img.file);
  const file = fs.createWriteStream(dest);

  console.log(`Downloading ${img.file}...`);
  https.get(img.url, (response) => {
    response.pipe(file);
    file.on('finish', () => {
      file.close();
      console.log(`✓ Finished ${img.file}`);
    });
  }).on('error', (err) => {
    fs.unlink(dest, () => {});
    console.error(`✗ Error downloading ${img.file}:`, err.message);
  });
});
