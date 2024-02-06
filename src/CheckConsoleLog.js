const fs = require('fs');

const files = process.argv.slice(2);

files.forEach(file => {
  const content = fs.readFileSync(file, 'utf-8');
  if (content.includes('console.log')) {
    console.error(`Error: Found 'console.log' in ${file}`);
    process.exit(1);
  }
});

process.exit(0);