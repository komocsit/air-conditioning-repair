const fs = require('fs');
const path = require('path');

const htmlDir = path.join(__dirname, 'public', 'html');
const files = fs.readdirSync(htmlDir).filter(f => f.endsWith('.html'));

const START_MARKER = '<!--Posts-->';
const SECTION_OPEN = '<section class="blog-post-section">';
const SECTION_CLOSE = '</section>';

let totalChanged = 0;

for (const filename of files) {
  const filePath = path.join(htmlDir, filename);
  let html = fs.readFileSync(filePath, 'utf8');

  const startIdx = html.indexOf(START_MARKER);
  if (startIdx === -1) {
    console.log(`  Unchanged: ${filename}`);
    continue;
  }

  const sectionStart = html.indexOf(SECTION_OPEN, startIdx);
  if (sectionStart === -1) {
    console.log(`  Unchanged: ${filename}`);
    continue;
  }

  const closeIdx = html.indexOf(SECTION_CLOSE, sectionStart);
  if (closeIdx === -1) {
    console.log(`  WARNING - no closing tag found: ${filename}`);
    continue;
  }

  const endIdx = closeIdx + SECTION_CLOSE.length;
  html = html.slice(0, startIdx) + html.slice(endIdx);

  fs.writeFileSync(filePath, html, 'utf8');
  console.log(`✓ Removed blog section: ${filename}`);
  totalChanged++;
}

console.log(`\nDone. ${totalChanged}/${files.length} files updated.`);
