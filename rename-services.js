const fs = require('fs');
const path = require('path');

const htmlDir  = path.join(__dirname, 'public', 'html');
const pagesDir = path.join(__dirname, 'pages');

// [oldSlug, newSlug]
const RENAMES = [
  ['plumbing-service',       'ac-installation'],
  ['electrical-installation', 'ac-maintenance'],
  ['carpenter-service',       'duct-cleaning'],
  ['handyman-service',        'emergency-ac-service'],
];

const URL_PAIRS = RENAMES.map(([o, n]) => [`/${o}`, `/${n}`]);

// ─── Step 1: Rewrite all internal links in every HTML file ─────────────────
const htmlFiles = fs.readdirSync(htmlDir).filter(f => f.endsWith('.html'));

for (const filename of htmlFiles) {
  const filePath = path.join(htmlDir, filename);
  let html = fs.readFileSync(filePath, 'utf8');
  const original = html;

  for (const [from, to] of URL_PAIRS) {
    html = html.split(`href="${from}"`).join(`href="${to}"`);
    html = html.split(`href='${from}'`).join(`href='${to}'`);
    html = html.split(`location.href='${from}';`).join(`location.href='${to}';`);
    html = html.split(`location.href='${from}'`).join(`location.href='${to}'`);
    html = html.split(`window.location.href='${from}'`).join(`window.location.href='${to}'`);
    html = html.split(`window.location.href="${from}"`).join(`window.location.href="${to}"`);
    html = html.split(`href="${from}">`).join(`href="${to}">`);
  }

  if (html !== original) {
    fs.writeFileSync(filePath, html, 'utf8');
    console.log(`  Links updated: ${filename}`);
  }
}
console.log('✓ Step 1 complete: internal links rewritten\n');

// ─── Step 2: Rename HTML files ─────────────────────────────────────────────
for (const [oldSlug, newSlug] of RENAMES) {
  const oldPath = path.join(htmlDir, `${oldSlug}.html`);
  const newPath = path.join(htmlDir, `${newSlug}.html`);
  if (fs.existsSync(oldPath)) {
    fs.renameSync(oldPath, newPath);
    console.log(`  HTML: ${oldSlug}.html  →  ${newSlug}.html`);
  }
}
console.log('✓ Step 2 complete: HTML files renamed\n');

// ─── Step 3: Rename Next.js page files ────────────────────────────────────
const PAGE_TEMPLATE = (html) =>
`const fs = require('fs');
const path = require('path');

export async function getServerSideProps({ res }) {
  const htmlPath = path.join(process.cwd(), 'public/html/${html}');
  const fileContent = fs.readFileSync(htmlPath, 'utf8');
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.end(fileContent);
  return { props: {} };
}

export default function Page() { return null; }
`;

for (const [oldSlug, newSlug] of RENAMES) {
  fs.writeFileSync(path.join(pagesDir, `${newSlug}.js`), PAGE_TEMPLATE(`${newSlug}.html`), 'utf8');
  console.log(`  Page written: ${newSlug}.js`);

  const oldPage = path.join(pagesDir, `${oldSlug}.js`);
  if (fs.existsSync(oldPage)) {
    fs.unlinkSync(oldPage);
    console.log(`    Deleted old: ${oldSlug}.js`);
  }
}
console.log('\n✓ Step 3 complete: Next.js pages renamed\n');
console.log('Done! Restart the dev server for the new routes to register.');
