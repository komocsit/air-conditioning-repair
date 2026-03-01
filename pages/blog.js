const fs = require('fs');
const path = require('path');

export async function getServerSideProps({ res }) {
  const htmlPath = path.join(process.cwd(), 'public/html/blog.html');
  const fileContent = fs.readFileSync(htmlPath, 'utf8');
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.end(fileContent);
  return { props: {} };
}

export default function Page() { return null; }
