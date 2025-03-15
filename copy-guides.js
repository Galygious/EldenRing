const fs = require('fs');
const path = require('path');

// Create data directory if it doesn't exist
const dataDir = path.join(__dirname, 'src', 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// Get all markdown files from the root directory
const rootDir = path.join(__dirname, '..');
const files = fs.readdirSync(rootDir).filter(file => file.endsWith('.md'));

// Copy each file to the data directory
files.forEach(file => {
  const sourcePath = path.join(rootDir, file);
  const destPath = path.join(dataDir, file);
  
  fs.copyFileSync(sourcePath, destPath);
  console.log(`Copied ${file} to src/data/`);
});

console.log(`Successfully copied ${files.length} guide files to src/data/`); 