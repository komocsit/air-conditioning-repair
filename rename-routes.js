const fs = require('fs');
const path = require('path');

const htmlDir  = path.join(__dirname, 'public', 'html');
const pagesDir = path.join(__dirname, 'pages');

// [oldSlug, newSlug]  — oldSlug = what appears after the leading / in the old URL
// newSlug = '' means the homepage (maps to /, index.js, index.html)
const PAGE_MAP = [
  ['wordpress_handymane_',                                   ''],
  ['wordpress_handymane_about-us_',                          'about-us'],
  ['wordpress_handymane_air-conditioning-repair_',           'air-conditioning-repair'],
  ['wordpress_handymane_all-services_',                      'all-services'],
  ['wordpress_handymane_blog_',                              'blog'],
  ['wordpress_handymane_carpenter-service_',                 'carpenter-service'],
  ['wordpress_handymane_category_handyman_',                 'category-handyman'],
  ['wordpress_handymane_contact_',                           'contact'],
  ['wordpress_handymane_electrical-installation_',           'electrical-installation'],
  ['wordpress_handymane_handyman-service_',                  'handyman-service'],
  ['wordpress_handymane_how-do-you-become-a-plumber_',       'how-do-you-become-a-plumber'],
  ['wordpress_handymane_plumbing-service_',                  'plumbing-service'],
  ['wordpress_handymane_tag_fix_',                           'tag-fix'],
  ['wordpress_handymane_tag_handyman-service_',              'tag-handyman-service'],
  ['wordpress_handymane_tag_handyman_',                      'tag-handyman'],
  ['wordpress_handymane_tag_repair-service_',                'tag-repair-service'],
  ['wordpress_handymane_tag_repairman_',                     'tag-repairman'],
  ['wordpress_handymane_tag_repair_',                        'tag-repair'],
  ['wordpress_handymane_what-are-mechanical-installation-works_', 'what-are-mechanical-installation-works'],
  ['wordpress_handymane_what-does-a-plumber-do_',            'what-does-a-plumber-do'],
  ['wordpress_handymane_what-does-mechanical-room-mean_',    'what-does-mechanical-room-mean'],
  ['wordpress_handymane_what-is-mechanical-infrastructure_', 'what-is-mechanical-infrastructure'],
  ['wordpress_handymane_what-is-mechanical-plumbing_',       'what-is-mechanical-plumbing'],
];

// Derived helpers
const htmlName  = ([, newSlug]) => newSlug === '' ? 'index.html' : `${newSlug}.html`;
const pageFile  = ([, newSlug]) => newSlug === '' ? 'index.js'   : `${newSlug}.js`;
const oldUrl    = ([oldSlug])   => `/${oldSlug}`;
const newUrl    = ([, newSlug]) => newSlug === '' ? '/' : `/${newSlug}`;

// Sort longest-first so no partial match clobbers a longer URL
const URL_PAIRS = [...PAGE_MAP]
  .sort((a, b) => b[0].length - a[0].length)
  .map(e => [oldUrl(e), newUrl(e)]);

// ─── Step 1: Rewrite all internal links inside every HTML file ─────────────
let htmlFiles = fs.readdirSync(htmlDir).filter(f => f.endsWith('.html'));

for (const filename of htmlFiles) {
  const filePath = path.join(htmlDir, filename);
  let html = fs.readFileSync(filePath, 'utf8');
  const original = html;

  for (const [from, to] of URL_PAIRS) {
    // href="..." and href='...'
    html = html.split(`href="${from}"`).join(`href="${to}"`);
    html = html.split(`href='${from}'`).join(`href='${to}'`);
    // onclick location.href with semicolon variants
    html = html.split(`location.href='${from}';`).join(`location.href='${to}';`);
    html = html.split(`location.href='${from}'`).join(`location.href='${to}'`);
    html = html.split(`window.location.href='${from}'`).join(`window.location.href='${to}'`);
    html = html.split(`window.location.href="${from}"`).join(`window.location.href="${to}"`);
    // <link rel="canonical">
    html = html.split(`<link rel="canonical" href="${from}">`).join(`<link rel="canonical" href="${to}">`);
  }

  if (html !== original) {
    fs.writeFileSync(filePath, html, 'utf8');
    console.log(`  Links updated: ${filename}`);
  }
}
console.log('✓ Step 1 complete: internal links rewritten\n');

// ─── Step 2: Rename HTML files ─────────────────────────────────────────────
for (const entry of PAGE_MAP) {
  const oldFile = `${entry[0]}.html`;
  const newFile = htmlName(entry);
  const oldPath = path.join(htmlDir, oldFile);
  const newPath = path.join(htmlDir, newFile);
  if (fs.existsSync(oldPath) && oldPath !== newPath) {
    fs.renameSync(oldPath, newPath);
    console.log(`  HTML: ${oldFile}  →  ${newFile}`);
  }
}
console.log('✓ Step 2 complete: HTML files renamed\n');

// ─── Step 3: Create new Next.js page files, delete old ones ───────────────
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

for (const entry of PAGE_MAP) {
  const [oldSlug, newSlug] = entry;
  const newPage = pageFile(entry);
  const html    = htmlName(entry);
  const oldPage = oldSlug === 'wordpress_handymane_' ? null : `${oldSlug}.js`;

  // Write new (or updated) page file
  fs.writeFileSync(path.join(pagesDir, newPage), PAGE_TEMPLATE(html), 'utf8');
  console.log(`  Page written: ${newPage}  (serves ${html})`);

  // Remove old page file if different from the new one
  if (oldPage && oldPage !== newPage) {
    const oldPath = path.join(pagesDir, oldPage);
    if (fs.existsSync(oldPath)) {
      fs.unlinkSync(oldPath);
      console.log(`    Deleted old: ${oldPage}`);
    }
  }
}
console.log('\n✓ Step 3 complete: Next.js pages renamed\n');
console.log('All done! Restart the dev server for changes to take effect.');
