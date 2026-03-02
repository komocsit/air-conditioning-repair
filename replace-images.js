const fs = require('fs');
const path = require('path');

const B07 = '/assets/wordpress_handymane_/wordpress_handymane_wp-content_uploads_2022_07_';
const B05 = '/assets/wordpress_handymane_/wordpress_handymane_wp-content_uploads_2022_05_';

const replacements = [
  [B07+'about-handymane1png.png',            'https://images.unsplash.com/photo-1621905251189-08b45d9adeed?auto=format&fit=crop&w=800&q=80'],
  [B07+'circle-handyman1png.png',            'https://images.unsplash.com/photo-1581094288338-2314dddb7ece?auto=format&fit=crop&w=400&q=80'],
  [B07+'hanyman-service-1jpg.jpg',           'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=400&h=300&q=80'],
  [B07+'hanyman-service-2jpg.jpg',           'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=400&h=300&q=80'],
  [B07+'hanyman-service-3jpg.jpg',           'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=400&h=300&q=80'],
  [B07+'hanyman-service-4jpg.jpg',           'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=400&h=300&q=80'],
  [B07+'hanyman-service-5jpg.jpg',           'https://images.unsplash.com/photo-1524634126442-357e0eac3c14?auto=format&fit=crop&w=400&h=300&q=80'],
  [B07+'handyman-service-big-1jpg.jpg',      'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=800&h=500&q=80'],
  [B07+'handyman-service-big-2jpg.jpg',      'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=800&h=500&q=80'],
  [B07+'handyman-service-big-3jpg.jpg',      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=800&h=500&q=80'],
  [B07+'handyman-service-big-4jpg.jpg',      'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=800&h=500&q=80'],
  [B07+'handyman-service-big-5jpg.jpg',      'https://images.unsplash.com/photo-1614624532983-4ce03382d63d?auto=format&fit=crop&w=800&h=500&q=80'],
  [B07+'team-handyman-1jpg.jpg',             'https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?auto=format&fit=crop&w=400&h=400&q=80'],
  [B07+'team-handyman-2jpg.jpg',             'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&h=400&q=80'],
  [B07+'team-handyman-3jpg.jpg',             'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&h=400&q=80'],
  [B07+'team-handyman-4jpg.jpg',             'https://images.unsplash.com/photo-1600486913747-55e5470d6f40?auto=format&fit=crop&w=400&h=400&q=80'],
  [B07+'news-handyman-1-373x223jpg.jpg',     'https://images.unsplash.com/photo-1621905251189-08b45d9adeed?auto=format&fit=crop&w=373&h=223&q=80'],
  [B07+'news-handyman-2-373x223jpg.jpg',     'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=373&h=223&q=80'],
  [B07+'news-handyman-3-373x223jpg.jpg',     'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=373&h=223&q=80'],
  [B07+'news-handyman-4-373x223jpg.jpg',     'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=373&h=223&q=80'],
  [B07+'news-handyman-5-373x223jpg.jpg',     'https://images.unsplash.com/photo-1614624532983-4ce03382d63d?auto=format&fit=crop&w=373&h=223&q=80'],
  [B07+'news-handyman-6-373x223jpg.jpg',     'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=373&h=223&q=80'],
  [B07+'marka1png.png',  'https://placehold.co/160x60/f0f8ff/085283?text=Carrier&font=montserrat'],
  [B07+'marka2png.png',  'https://placehold.co/160x60/f0f8ff/085283?text=Trane&font=montserrat'],
  [B07+'marka3png.png',  'https://placehold.co/160x60/f0f8ff/085283?text=Lennox&font=montserrat'],
  [B07+'marka4png.png',  'https://placehold.co/160x60/f0f8ff/085283?text=Daikin&font=montserrat'],
  [B07+'marka5png.png',  'https://placehold.co/160x60/f0f8ff/085283?text=Rheem&font=montserrat'],
  [B07+'marka6png.png',  'https://placehold.co/160x60/f0f8ff/085283?text=York&font=montserrat'],
  [B05+'testimonial1-1png.png', 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=100&h=100&q=80'],
  [B05+'testimonial2-1png.png', 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=100&h=100&q=80'],
  [B05+'testimonial3-1png.png', 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&h=100&q=80'],
  [B05+'testimonial4-1png.png', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&h=100&q=80'],
  [B05+'dividerjpg.jpg', 'https://placehold.co/120x15/0d7ebf/0d7ebf?text=+'],
];

const htmlDir = path.join(__dirname, 'public', 'html');
const htmlFiles = fs.readdirSync(htmlDir).filter(f => f.endsWith('.html'));

let total = 0;
for (const file of htmlFiles) {
  const fp = path.join(htmlDir, file);
  let content = fs.readFileSync(fp, 'utf8');
  const orig = content;
  for (const [oldPath, newUrl] of replacements) {
    while (content.includes(oldPath)) content = content.replace(oldPath, newUrl);
  }
  if (content !== orig) { fs.writeFileSync(fp, content, 'utf8'); total++; console.log('Updated: ' + file); }
}
console.log('\nDone. Updated ' + total + ' files.');