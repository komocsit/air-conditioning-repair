const fs = require('fs');
const path = require('path');

const htmlDir = path.join(__dirname, 'public', 'html');
const files = fs.readdirSync(htmlDir).filter(f => f.endsWith('.html'));

function replaceAll(html, from, to) {
  return html.split(from).join(to);
}

// ─── 1. Global replacements applied to ALL 23 files ────────────────────────
const globalReplacements = [
  // Nav dropdown – fix URLs for AC Installation, AC Maintenance, Duct Cleaning, Emergency AC Service
  [
    `href="/wordpress_handymane_air-conditioning-repair_" class="dropdown-item"><span itemprop="name">AC Installation</span>`,
    `href="/wordpress_handymane_plumbing-service_" class="dropdown-item"><span itemprop="name">AC Installation</span>`,
  ],
  [
    `href="/wordpress_handymane_air-conditioning-repair_" class="dropdown-item"><span itemprop="name">AC Maintenance</span>`,
    `href="/wordpress_handymane_electrical-installation_" class="dropdown-item"><span itemprop="name">AC Maintenance</span>`,
  ],
  [
    `href="/wordpress_handymane_air-conditioning-repair_" class="dropdown-item"><span itemprop="name">Duct Cleaning</span>`,
    `href="/wordpress_handymane_carpenter-service_" class="dropdown-item"><span itemprop="name">Duct Cleaning</span>`,
  ],
  [
    `href="/wordpress_handymane_contact_" class="dropdown-item"><span itemprop="name">Emergency AC Service</span>`,
    `href="/wordpress_handymane_handyman-service_" class="dropdown-item"><span itemprop="name">Emergency AC Service</span>`,
  ],

  // Sidebar service links – fix onclick URLs and rename service labels
  [
    `onclick="location.href='/wordpress_handymane_air-conditioning-repair_';"><a href="/wordpress_handymane_plumbing-service_"><i class="flaticon-right-chevron"></i>Plumbing Service</a>`,
    `onclick="location.href='/wordpress_handymane_plumbing-service_';"><a href="/wordpress_handymane_plumbing-service_"><i class="flaticon-right-chevron"></i>AC Installation</a>`,
  ],
  [
    `onclick="location.href='/wordpress_handymane_air-conditioning-repair_';"><a href="/wordpress_handymane_electrical-installation_"><i class="flaticon-right-chevron"></i>Electrical Installation</a>`,
    `onclick="location.href='/wordpress_handymane_electrical-installation_';"><a href="/wordpress_handymane_electrical-installation_"><i class="flaticon-right-chevron"></i>AC Maintenance</a>`,
  ],
  [
    `onclick="location.href='/wordpress_handymane_air-conditioning-repair_';"><a href="/wordpress_handymane_carpenter-service_"><i class="flaticon-right-chevron"></i>Carpenter Service</a>`,
    `onclick="location.href='/wordpress_handymane_carpenter-service_';"><a href="/wordpress_handymane_carpenter-service_"><i class="flaticon-right-chevron"></i>Duct Cleaning</a>`,
  ],
  [
    `onclick="location.href='/wordpress_handymane_contact_';"><a href="/wordpress_handymane_handyman-service_"><i class="flaticon-right-chevron"></i>Handyman Service</a>`,
    `onclick="location.href='/wordpress_handymane_handyman-service_';"><a href="/wordpress_handymane_handyman-service_"><i class="flaticon-right-chevron"></i>Emergency AC Service</a>`,
  ],
  // First sidebar item text update
  [
    `<i class="flaticon-right-chevron"></i>Air Conditioning Repair</a>`,
    `<i class="flaticon-right-chevron"></i>AC Repair &amp; Diagnostics</a>`,
  ],

  // Footer services list – rename old service labels
  [
    `<a href="/wordpress_handymane_air-conditioning-repair_">Air Conditioning Repair</a>`,
    `<a href="/wordpress_handymane_air-conditioning-repair_">AC Repair &amp; Diagnostics</a>`,
  ],
  [
    `<a href="/wordpress_handymane_plumbing-service_">Plumbing Service</a>`,
    `<a href="/wordpress_handymane_plumbing-service_">AC Installation</a>`,
  ],
  [
    `<a href="/wordpress_handymane_electrical-installation_">Electrical Installation</a>`,
    `<a href="/wordpress_handymane_electrical-installation_">AC Maintenance</a>`,
  ],
  [
    `<a href="/wordpress_handymane_carpenter-service_">Carpenter Service</a>`,
    `<a href="/wordpress_handymane_carpenter-service_">Duct Cleaning</a>`,
  ],
  [
    `<a href="/wordpress_handymane_handyman-service_">Handyman Service</a>`,
    `<a href="/wordpress_handymane_handyman-service_">Emergency AC Service</a>`,
  ],
];

// ─── 2. Per-page specific content replacements ─────────────────────────────
const pageDescriptionText =
  '<p>Plumbing is the pipeline that ensures that the water taken from any water source is ' +
  'delivered cleanly to the places where it is connected and that the dirty water is discharged ' +
  'out. Plumbing is used in many places, from homes to industrial areas. Plumbing The pipe ' +
  'network that ensures the transmission of clean water to the places of use in a healthy way, ' +
  'and the collection of dirty and dirty water out of the building is called sanitary ' +
  'installation. The way to reach water in buildings in a healthy way is through the design of ' +
  'the installation system and the processes of product selection.</p>';

const pageSpecific = {
  'wordpress_handymane_air-conditioning-repair_.html': {
    replacements: [
      [
        `<h2>Air Conditioning Repair</h2>`,
        `<h2>AC Repair &amp; Diagnostics</h2>`,
      ],
      [
        `<i class="flaticon-right-chevron"></i>Air Conditioning Repair</p>`,
        `<i class="flaticon-right-chevron"></i>AC Repair &amp; Diagnostics</p>`,
      ],
      [
        `>Agricultural Products</h2>`,
        `>AC Repair &amp; Diagnostics</h2>`,
      ],
      [
        pageDescriptionText,
        `<p>Our professional AC Repair &amp; Diagnostics service delivers fast, accurate fault detection and complete repair solutions for all makes and models of air conditioning systems. Our certified technicians use advanced diagnostic equipment to identify problems quickly and restore your cooling system to optimal performance. From refrigerant leaks and compressor failures to electrical faults and thermostat issues, we guarantee a lasting fix.</p>`,
      ],
    ],
  },
  'wordpress_handymane_plumbing-service_.html': {
    replacements: [
      [
        `<title>CoolBreeze AC Repair - Professional Air Conditioning Services</title>`,
        `<title>AC Installation Services - CoolBreeze AC Repair</title>`,
      ],
      [
        `<h2>Plumbing Service</h2>`,
        `<h2>AC Installation</h2>`,
      ],
      [
        `<i class="flaticon-right-chevron"></i>Plumbing Service</p>`,
        `<i class="flaticon-right-chevron"></i>AC Installation</p>`,
      ],
      [
        `>Organic Products</h2>`,
        `>AC Installation Services</h2>`,
      ],
      [
        pageDescriptionText,
        `<p>Our expert AC Installation service covers everything from system selection to full installation and commissioning. Whether you need a new split system, multi-zone unit, or ducted air conditioner for your home or business, our trained technicians ensure a seamless, code-compliant installation. We work with all major brands and provide tailored advice to maximize energy efficiency and long-term comfort.</p>`,
      ],
    ],
  },
  'wordpress_handymane_electrical-installation_.html': {
    replacements: [
      [
        `<title>CoolBreeze AC Repair - Expert Air Conditioning Repair Services</title>`,
        `<title>AC Maintenance Services - CoolBreeze AC Repair</title>`,
      ],
      [
        `<h2>Electrical Installation</h2>`,
        `<h2>AC Maintenance</h2>`,
      ],
      [
        `<i class="flaticon-right-chevron"></i>Electrical Installation</p>`,
        `<i class="flaticon-right-chevron"></i>AC Maintenance</p>`,
      ],
      [
        `>Organic Fresh Vegetables</h2>`,
        `>AC Maintenance Services</h2>`,
      ],
      [
        pageDescriptionText,
        `<p>Regular AC Maintenance is essential for keeping your cooling system running efficiently and preventing costly breakdowns. Our comprehensive maintenance service includes thorough cleaning, component inspection, refrigerant level checks, filter replacement, and full system performance testing. With scheduled maintenance plans available, we help extend the lifespan of your AC unit and ensure reliable comfort year-round.</p>`,
      ],
    ],
  },
  'wordpress_handymane_carpenter-service_.html': {
    replacements: [
      [
        `<title>CoolBreeze AC Repair - Expert Air Conditioning Repair Services</title>`,
        `<title>Duct Cleaning Services - CoolBreeze AC Repair</title>`,
      ],
      [
        `<h2>Carpenter Service</h2>`,
        `<h2>Duct Cleaning</h2>`,
      ],
      [
        `<i class="flaticon-right-chevron"></i>Carpenter Service</p>`,
        `<i class="flaticon-right-chevron"></i>Duct Cleaning</p>`,
      ],
      [
        `>Organic Fresh Fruits</h2>`,
        `>Duct Cleaning Services</h2>`,
      ],
      [
        pageDescriptionText,
        `<p>Our professional Duct Cleaning service removes accumulated dust, allergens, mold, and debris from your air conditioning ductwork to improve indoor air quality and system efficiency. Clean ducts result in better airflow, lower energy bills, and a healthier environment for your family or staff. Our technicians use specialized equipment to thoroughly clean all duct components with minimal disruption to your property.</p>`,
      ],
    ],
  },
  'wordpress_handymane_handyman-service_.html': {
    replacements: [
      [
        `<title>CoolBreeze AC Repair - Expert Air Conditioning Repair Services</title>`,
        `<title>Emergency AC Service - CoolBreeze AC Repair</title>`,
      ],
      [
        `<h2>Handyman Service</h2>`,
        `<h2>Emergency AC Service</h2>`,
      ],
      [
        `<i class="flaticon-right-chevron"></i>Handyman Service</p>`,
        `<i class="flaticon-right-chevron"></i>Emergency AC Service</p>`,
      ],
      [
        `>Fertilizer Production</h2>`,
        `>Emergency AC Service</h2>`,
      ],
      [
        pageDescriptionText,
        `<p>Our Emergency AC Service is available around the clock to restore your cooling as quickly as possible. When your air conditioner breaks down on the hottest day of the year, our rapid-response technicians are ready to diagnose and repair the problem on the spot. We carry a wide range of replacement parts to handle most repairs immediately, minimizing downtime and discomfort for you and your family.</p>`,
      ],
    ],
  },
};

// ─── 3. Process all files ──────────────────────────────────────────────────
let totalChanged = 0;

for (const filename of files) {
  const filePath = path.join(htmlDir, filename);
  let html = fs.readFileSync(filePath, 'utf8');
  const original = html;

  // Apply global replacements
  for (const [from, to] of globalReplacements) {
    if (from === to) continue;
    html = replaceAll(html, from, to);
  }

  // Apply per-page replacements
  if (pageSpecific[filename]) {
    for (const [from, to] of pageSpecific[filename].replacements) {
      if (from === to) continue;
      html = replaceAll(html, from, to);
    }
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
