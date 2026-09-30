const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'node_modules', 'react-snap', 'src', 'puppeteer_utils.js');

try {
  let content = fs.readFileSync(filePath, 'utf8');
  content = content.replace(
    'await page.goto(pageUrl, { waitUntil: "networkidle0" });',
    'await page.goto(pageUrl, { waitUntil: "networkidle0", timeout: 120000 });'
  );
  fs.writeFileSync(filePath, content, 'utf8');
  console.log('react-snap patched to increase timeout.');
} catch (e) {
  console.error('Error patching react-snap:', e);
}
