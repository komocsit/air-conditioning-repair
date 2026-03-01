const fs = require('fs');
const path = require('path');

const htmlDir = path.join(__dirname, 'public', 'html');
const files = fs.readdirSync(htmlDir).filter(f => f.endsWith('.html'));

function replaceAll(html, from, to) {
  return html.split(from).join(to);
}

// ─── 1. Global replacements applied to ALL files ───────────────────────────
const globalReplacements = [
  // Section subtitle
  [
    `Useful information about repair.            </p>`,
    `Expert tips and insights on air conditioning.            </p>`,
  ],

  // Blog card h3 titles (Recent News section, appears on every page)
  [
    `What is mechanical infrastructure?                </h3>`,
    `What Is a Central Air Conditioning System?                </h3>`,
  ],
  [
    `What are mechanical installation works?                </h3>`,
    `How Does Central Air Conditioning Work?                </h3>`,
  ],
  [
    `How do you become a plumber?                </h3>`,
    `How Do You Maintain Your AC System?                </h3>`,
  ],
  [
    `What does a plumber do?                </h3>`,
    `What Does an AC Technician Do?                </h3>`,
  ],

  // Blog card excerpts (Recent News section, appears on every page)
  [
    `</p><p>It refers to an integrated system developed to increase the [\u2026]</p>`,
    `</p><p>A central AC system cools your whole home through a duct network and outdoor compressor unit. [\u2026]</p>`,
  ],
  [
    `</p><p>Mechanical installation is one of the 4 basic types of [\u2026]</p>`,
    `</p><p>Central air conditioning works by cycling refrigerant between an indoor evaporator coil and outdoor condenser. [\u2026]</p>`,
  ],
  [
    `</p><p>Age: Most states require apprentice plumbers to be at least [\u2026]</p>`,
    `</p><p>Regular filter changes, coil cleaning, and annual tune-ups keep your AC running efficiently year-round. [\u2026]</p>`,
  ],
  [
    `</p><p>The plumbing profession does the job of laying the clean [\u2026]</p>`,
    `</p><p>An AC technician installs, services, and repairs cooling systems to restore your home\u2019s comfort quickly. [\u2026]</p>`,
  ],

  // Recent Posts sidebar link text (appears in all article-page sidebars)
  [
    `">How do you become a plumber?</a>`,
    `">How Do You Maintain Your AC System?</a>`,
  ],
  [
    `">What is mechanical infrastructure?</a>`,
    `">What Is a Central Air Conditioning System?</a>`,
  ],
  // aria-current="page" variant (the active article)
  [
    `"page">What is mechanical infrastructure?</a>`,
    `"page">What Is a Central Air Conditioning System?</a>`,
  ],
  [
    `">What does a plumber do?</a>`,
    `">What Does an AC Technician Do?</a>`,
  ],
  [
    `">What are mechanical installation works?</a>`,
    `">How Does Central Air Conditioning Work?</a>`,
  ],
  [
    `"page">How do you become a plumber?</a>`,
    `"page">How Do You Maintain Your AC System?</a>`,
  ],
  [
    `"page">What does a plumber do?</a>`,
    `"page">What Does an AC Technician Do?</a>`,
  ],
  [
    `"page">What are mechanical installation works?</a>`,
    `"page">How Does Central Air Conditioning Work?</a>`,
  ],
];

// ─── 2. Per-page content ───────────────────────────────────────────────────
const pageSpecific = {
  'wordpress_handymane_what-is-mechanical-infrastructure_.html': [
    [
      `<title>CoolBreeze AC Repair - Professional Air Conditioning Services</title>`,
      `<title>What Is a Central Air Conditioning System? - CoolBreeze AC Repair</title>`,
    ],
    [
      `<h2>What is mechanical infrastructure?</h2>`,
      `<h2>What Is a Central Air Conditioning System?</h2>`,
    ],
    [
      `<i class="flaticon-right-chevron"></i>What is mechanical infrastructure?</p>`,
      `<i class="flaticon-right-chevron"></i>What Is a Central Air Conditioning System?</p>`,
    ],
    [
      `</p><p>It refers to an integrated system developed to increase the living standards and comfort areas of people in the building where the mechanical installation is built. Devices used, installed and operated are considered under engineering activities.</p>`,
      `</p><p>A central air conditioning system is an integrated network of indoor and outdoor units, refrigerant lines, and ductwork designed to cool every room in your home or business. The outdoor compressor unit pumps refrigerant to the indoor evaporator coil, where warm air is absorbed and cooled air is distributed through the duct system. Properly designed and installed, a central AC system delivers consistent, energy-efficient comfort throughout the entire building.</p>`,
    ],
  ],

  'wordpress_handymane_what-are-mechanical-installation-works_.html': [
    [
      `<title>CoolBreeze AC Repair - Professional Air Conditioning Services</title>`,
      `<title>How Does Central Air Conditioning Work? - CoolBreeze AC Repair</title>`,
    ],
    [
      `<h2>What are mechanical installation works?</h2>`,
      `<h2>How Does Central Air Conditioning Work?</h2>`,
    ],
    [
      `<i class="flaticon-right-chevron"></i>What are mechanical installation works?</p>`,
      `<i class="flaticon-right-chevron"></i>How Does Central Air Conditioning Work?</p>`,
    ],
    [
      `</p><p>Mechanical installation is one of the 4 basic types of projects in the construction sector: static, architectural, electrical and mechanical. It is all of the works of heating, cooling, ventilation, clean and waste water, sanitary hot water and fire extinguishing systems, which fall within the scope of mechanical engineering in construction and construction works.</p>`,
      `</p><p>Central air conditioning works by continuously cycling refrigerant between an indoor evaporator coil and an outdoor condenser unit. The blower fan draws warm room air over the cold evaporator coil, transferring heat to the refrigerant. The refrigerant then travels to the outdoor condenser, releases the heat outside, and returns to repeat the cycle. This process also dehumidifies the air, making your home feel cooler and more comfortable even on the hottest days.</p>`,
    ],
  ],

  'wordpress_handymane_how-do-you-become-a-plumber_.html': [
    [
      `<title>CoolBreeze AC Repair - Professional Air Conditioning Services</title>`,
      `<title>How Do You Maintain Your AC System? - CoolBreeze AC Repair</title>`,
    ],
    [
      `<h2>How do you become a plumber?</h2>`,
      `<h2>How Do You Maintain Your AC System?</h2>`,
    ],
    [
      `<i class="flaticon-right-chevron"></i>How do you become a plumber?</p>`,
      `<i class="flaticon-right-chevron"></i>How Do You Maintain Your AC System?</p>`,
    ],
    [
      `</p><p>Age: Most states require apprentice plumbers to be at least 18 years old. Education: A vocational high school diploma or 8-year education diploma is an admission requirement for most plumbers. Documentation: Applicants must be able to prove their legal right to work in the Republic of Turkey.</p>`,
      `</p><p>Keeping your AC system in top shape requires a few simple maintenance steps performed regularly. Start by replacing the air filter every 1\u20133 months to maintain airflow and indoor air quality. Clean the outdoor condenser coils once a year to prevent overheating, and clear any debris from around the unit. Check refrigerant lines for frost or ice buildup, which can signal a refrigerant leak. Schedule a professional tune-up each spring before the cooling season to catch small issues before they become costly repairs.</p>`,
    ],
  ],

  'wordpress_handymane_what-does-a-plumber-do_.html': [
    [
      `<title>CoolBreeze AC Repair - Professional Air Conditioning Services</title>`,
      `<title>What Does an AC Technician Do? - CoolBreeze AC Repair</title>`,
    ],
    [
      `<h2>What does a plumber do?</h2>`,
      `<h2>What Does an AC Technician Do?</h2>`,
    ],
    [
      `<i class="flaticon-right-chevron"></i>What does a plumber do?</p>`,
      `<i class="flaticon-right-chevron"></i>What Does an AC Technician Do?</p>`,
    ],
    [
      `</p><p>The plumbing profession does the job of laying the clean and dirty water system extensively. Sanitary plumbers install the necessary installations for drawing all kinds of clean water and evacuating dirty water in buildings or open spaces. For this reason, it is a profession that does not die and job opportunities do not decrease.</p>`,
      `</p><p>An AC technician is a trained professional who installs, services, and repairs residential and commercial air conditioning systems. Their work includes diagnosing electrical faults, testing refrigerant levels, cleaning coils, replacing worn components, and commissioning new systems. AC technicians play a vital role in maintaining indoor comfort and air quality. With the growing demand for energy-efficient cooling solutions, the profession offers strong long-term career prospects and steady job opportunities nationwide.</p>`,
    ],
  ],
};

// ─── 3. Process all files ──────────────────────────────────────────────────
let totalChanged = 0;
for (const filename of files) {
  const filePath = path.join(htmlDir, filename);
  let html = fs.readFileSync(filePath, 'utf8');
  const original = html;

  for (const [from, to] of globalReplacements) {
    html = replaceAll(html, from, to);
  }

  if (pageSpecific[filename]) {
    for (const [from, to] of pageSpecific[filename]) {
      html = replaceAll(html, from, to);
    }
  }

  if (html !== original) {
    fs.writeFileSync(filePath, html, 'utf8');
    console.log(`\u2713 Updated: ${filename}`);
    totalChanged++;
  } else {
    console.log(`  Unchanged: ${filename}`);
  }
}
console.log(`\nDone. ${totalChanged}/${files.length} files updated.`);
