const fs = require('fs');
const path = require('path');

const htmlDir = path.join(__dirname, 'public', 'html');
const files = fs.readdirSync(htmlDir).filter(f => f.endsWith('.html'));

// Remove any <li> element (single line) that contains href="/blog"
const BLOG_LI = /<li[^>]*>.*?href="\/blog".*?<\/li>\n?/g;

let totalChanged = 0;

for (const filename of files) {
  const filePath = path.join(htmlDir, filename);
  const html = fs.readFileSync(filePath, 'utf8');
  const updated = html.replace(BLOG_LI, '');

  if (updated !== html) {
    fs.writeFileSync(filePath, updated, 'utf8');
    console.log(`✓ Removed Blog nav item: ${filename}`);
    totalChanged++;
  } else {
    console.log(`  Unchanged: ${filename}`);
  }
}

console.log(`\nDone. ${totalChanged}/${files.length} files updated.`);
