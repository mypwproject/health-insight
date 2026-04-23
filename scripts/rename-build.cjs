const fs = require('fs');
const path = require('path');

const srcFile = path.join(__dirname, '../dist/client/index-vercel.html');
const destFile = path.join(__dirname, '../dist/client/index.html');

if (fs.existsSync(srcFile)) {
  fs.renameSync(srcFile, destFile);
  console.log('✓ Renamed index-vercel.html to index.html');
} else {
  console.log('✓ index.html already exists');
}
