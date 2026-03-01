const fs = require('fs');
const path = require('path');

const htmlDir = path.join(__dirname, 'public', 'html');
const files = fs.readdirSync(htmlDir).filter(f => f.endsWith('.html'));

function replaceAll(html, from, to) {
  return html.split(from).join(to);
}

// Each carousel card has a unique data-wow-delay. Use delay+old-href as the key.
const replacements = [
  // AC Installation (delay 0.7s) → plumbing-service
  [
    `data-wow-delay="0.7s" onclick="window.location.href='/wordpress_handymane_air-conditioning-repair_'"`,
    `data-wow-delay="0.7s" onclick="window.location.href='/wordpress_handymane_plumbing-service_'"`,
  ],
  // AC Maintenance (delay 0.8s) → electrical-installation
  [
    `data-wow-delay="0.8s" onclick="window.location.href='/wordpress_handymane_air-conditioning-repair_'"`,
    `data-wow-delay="0.8s" onclick="window.location.href='/wordpress_handymane_electrical-installation_'"`,
  ],
  // Duct Cleaning (delay 0.9s) → carpenter-service
  [
    `data-wow-delay="0.9s" onclick="window.location.href='/wordpress_handymane_air-conditioning-repair_'"`,
    `data-wow-delay="0.9s" onclick="window.location.href='/wordpress_handymane_carpenter-service_'"`,
  ],
  // Emergency AC Service (delay 1s) → handyman-service
  [
    `data-wow-delay="1s" onclick="window.location.href='/wordpress_handymane_contact_'"`,
    `data-wow-delay="1s" onclick="window.location.href='/wordpress_handymane_handyman-service_'"`,
  ],
];

let totalChanged = 0;

for (const filename of files) {
  const filePath = path.join(htmlDir, filename);
  let html = fs.readFileSync(filePath, 'utf8');
  const original = html;

  for (const [from, to] of replacements) {
    html = replaceAll(html, from, to);
  }

  if (html !== original) {
    fs.writeFileSync(filePath, html, 'utf8');
    console.log(`✓ Updated: ${filename}`);
    totalChanged++;
  } else {
    console.log(`  Unchanged: ${filename}`);
  }
}

console.log(`\nDone. ${totalChanged}/${files.length} files updated.`);
