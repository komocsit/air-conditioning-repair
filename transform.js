/**
 * Transform script: converts the generic Handymane site into
 * a dedicated air-conditioning-repair website.
 * Run once: node transform.js
 */

const fs = require('fs');
const path = require('path');

const htmlDir = path.join(__dirname, 'public', 'html');
const files = fs.readdirSync(htmlDir).filter(f => f.endsWith('.html'));

// ── Nav replacement helpers ────────────────────────────────────────────────

// New AC services nav items for BOTH mobile and desktop dropdowns
const newServicesNav = `
        <li class="menu-item menu-item-type-post_type nav-item"><a itemprop="url" href="/wordpress_handymane_air-conditioning-repair_" class="dropdown-item"><span itemprop="name">AC Repair &amp; Diagnostics</span></a></li>
        <li class="menu-item menu-item-type-post_type nav-item"><a itemprop="url" href="/wordpress_handymane_air-conditioning-repair_" class="dropdown-item"><span itemprop="name">AC Installation</span></a></li>
        <li class="menu-item menu-item-type-post_type nav-item"><a itemprop="url" href="/wordpress_handymane_air-conditioning-repair_" class="dropdown-item"><span itemprop="name">AC Maintenance</span></a></li>
        <li class="menu-item menu-item-type-post_type nav-item"><a itemprop="url" href="/wordpress_handymane_air-conditioning-repair_" class="dropdown-item"><span itemprop="name">Duct Cleaning</span></a></li>
        <li class="menu-item menu-item-type-post_type nav-item"><a itemprop="url" href="/wordpress_handymane_contact_" class="dropdown-item"><span itemprop="name">Emergency AC Service</span></a></li>
        <li class="menu-item menu-item-type-post_type nav-item"><a itemprop="url" href="/wordpress_handymane_all-services_" class="dropdown-item"><span itemprop="name">All Services</span></a></li>`;

// ── Page-specific titles ───────────────────────────────────────────────────
const pageTitles = {
  'wordpress_handymane_.html':
    'CoolBreeze AC Repair - Expert Air Conditioning Services',
  'wordpress_handymane_about-us_.html':
    'About Us - CoolBreeze AC Repair',
  'wordpress_handymane_air-conditioning-repair_.html':
    'AC Repair Service - CoolBreeze AC Repair',
  'wordpress_handymane_all-services_.html':
    'All AC Services - CoolBreeze AC Repair',
  'wordpress_handymane_contact_.html':
    'Contact Us - CoolBreeze AC Repair',
};
const defaultTitle = 'CoolBreeze AC Repair - Professional Air Conditioning Services';

// ── Text replacements applied to ALL files ────────────────────────────────
// Order matters: more specific strings first
const globalTextReplacements = [
  // Brand name
  ['© 2024 Handymane', '© 2026 CoolBreeze AC Repair'],
  ['© 2025 Handymane', '© 2026 CoolBreeze AC Repair'],
  ['© 2026 Handymane', '© 2026 CoolBreeze AC Repair'],
  [' Handymane', ' CoolBreeze AC Repair'],
  ['Handymane -', 'CoolBreeze AC Repair -'],
  ['Handymane', 'CoolBreeze AC Repair'],

  // Hero slider headings
  ['<h1>Need <br>\n                Repair? </h1>', '<h1>Need <br>\n                AC Service? </h1>'],
  ['Then you are in the right place. </p>', 'Expert air conditioning repair &amp; installation. </p>'],

  // About / feature section text
  [
    'We are ready to serve you for air conditioning repair, boiler repair, electrical installation, plumbing and all your plumbing problems. We will immediately repair your installation with our professional team.',
    'We specialise in air conditioning repair, installation, maintenance, and duct cleaning. Our certified technicians diagnose and fix your AC problems fast, restoring comfort to your home or business.',
  ],
  [
    'Thanks to our solid expertise, we quickly repair your plumbing and all your faulty items.',
    'Thanks to our certified expertise, we quickly diagnose and repair your air conditioning system to restore comfort.',
  ],
  // "Do you need repair service?" header - update the text
  [
    'Do you need repair service?',
    'Do you need AC service?',
  ],

  // Service section heading kept but we refine the sub-text
  [
    'We are at your service for your urgent repair needs.',
    'We are at your service for all your air conditioning needs.',
  ],

  // Service card: Conditioning Repair → AC Repair & Diagnostics
  [
    'data-tab-title="Conditioning Repair"',
    'data-tab-title="AC Repair &amp; Diagnostics"',
  ],
  ['<h3 class="titlecarousel">Conditioning Repair</h3>', '<h3 class="titlecarousel">AC Repair &amp; Diagnostics</h3>'],

  // Service card: Plumbing Service → AC Installation
  ['data-tab-title="Plumbing Service"', 'data-tab-title="AC Installation"'],
  ['<h3 class="titlecarousel">Plumbing Service</h3>', '<h3 class="titlecarousel">AC Installation</h3>'],

  // Service card: Electrical Installation → AC Maintenance
  ['data-tab-title="Electrical Installation"', 'data-tab-title="AC Maintenance"'],
  ['<h3 class="titlecarousel">Electrical Installation</h3>', '<h3 class="titlecarousel">AC Maintenance</h3>'],

  // Service card: Carpenter Service → Duct Cleaning
  ['data-tab-title="Carpenter Service"', 'data-tab-title="Duct Cleaning"'],
  ['<h3 class="titlecarousel">Carpenter Service</h3>', '<h3 class="titlecarousel">Duct Cleaning</h3>'],

  // Service card: Handyman Service → Emergency AC Service
  ['data-tab-title="Handyman Service"', 'data-tab-title="Emergency AC Service"'],
  ['<h3 class="titlecarousel">Handyman Service</h3>', '<h3 class="titlecarousel">Emergency AC Service</h3>'],

  // Service card onclick links → point to AC repair or contact page
  [
    "onclick=\"window.location.href='https://garantiwebtasarim.com/wordpress/handymane/plumbing-service/'\"",
    "onclick=\"window.location.href='/wordpress_handymane_air-conditioning-repair_'\"",
  ],
  [
    "onclick=\"window.location.href='https://garantiwebtasarim.com/wordpress/handymane/electrical-installation/'\"",
    "onclick=\"window.location.href='/wordpress_handymane_air-conditioning-repair_'\"",
  ],
  [
    "onclick=\"window.location.href='https://garantiwebtasarim.com/wordpress/handymane/carpenter-service/'\"",
    "onclick=\"window.location.href='/wordpress_handymane_air-conditioning-repair_'\"",
  ],
  [
    "onclick=\"window.location.href='https://garantiwebtasarim.com/wordpress/handymane/handyman-service/'\"",
    "onclick=\"window.location.href='/wordpress_handymane_contact_'\"",
  ],
  [
    "onclick=\"window.location.href='https://garantiwebtasarim.com/wordpress/handymane/air-conditioning-repair/'\"",
    "onclick=\"window.location.href='/wordpress_handymane_air-conditioning-repair_'\"",
  ],

  // Miscellaneous leftover external links in content
  [
    'https://garantiwebtasarim.com/wordpress/handymane/air-conditioning-repair/',
    '/wordpress_handymane_air-conditioning-repair_',
  ],
  [
    'https://garantiwebtasarim.com/wordpress/handymane/plumbing-service/',
    '/wordpress_handymane_air-conditioning-repair_',
  ],
  [
    'https://garantiwebtasarim.com/wordpress/handymane/electrical-installation/',
    '/wordpress_handymane_air-conditioning-repair_',
  ],
  [
    'https://garantiwebtasarim.com/wordpress/handymane/carpenter-service/',
    '/wordpress_handymane_air-conditioning-repair_',
  ],
  [
    'https://garantiwebtasarim.com/wordpress/handymane/handyman-service/',
    '/wordpress_handymane_contact_',
  ],
];

// ── Regex to replace the full services dropdown list ──────────────────────
// Matches the full <ul> block inside the Services dropdown (both desktop & mobile nav)
function replaceServicesDropdown(html) {
  // Strategy: find each dropdown <ul> that contains the AC repair item and
  // replace its entire contents with our new AC service items.
  // The dropdown ul looks like:
  //   <ul class="dropdown-menu" aria-labelledby="menu-item-dropdown-NNN">
  //     ... old <li> items ...
  //   </ul>
  const dropdownRe =
    /(<ul class="dropdown-menu"[^>]*>)([\s\S]*?)(<\/ul>)/g;
  return html.replace(dropdownRe, (match, open, inner, close) => {
    // Only touch dropdowns that are the Services menus
    if (
      inner.includes('air-conditioning-repair') ||
      inner.includes('plumbing-service') ||
      inner.includes('electrical-installation') ||
      inner.includes('carpenter-service') ||
      inner.includes('handyman-service')
    ) {
      return open + newServicesNav + '\n' + close;
    }
    return match;
  });
}

// ── Process each file ─────────────────────────────────────────────────────
let totalFiles = 0;
files.forEach(filename => {
  const filePath = path.join(htmlDir, filename);
  let html = fs.readFileSync(filePath, 'utf8');

  // 1. Page title
  const newTitle = pageTitles[filename] || defaultTitle;
  html = html.replace(
    /<title>[^<]*<\/title>/,
    `<title>${newTitle}</title>`,
  );

  // 2. Services dropdown replacement
  html = replaceServicesDropdown(html);

  // 3. Global text replacements
  for (const [from, to] of globalTextReplacements) {
    if (from === to) continue; // safety guard: skip no-op replacements
    // Use split/join for a safe global replace without regex
    html = html.split(from).join(to);
  }

  fs.writeFileSync(filePath, html, 'utf8');
  totalFiles++;
  console.log(`✓ ${filename}`);
});

console.log(`\nDone. Transformed ${totalFiles} file(s).`);
