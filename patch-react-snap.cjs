const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'node_modules', 'react-snap', 'src', 'puppeteer_utils.js');

try {
  let content = fs.readFileSync(filePath, 'utf8');

  // 1. Increase timeout and switch from networkidle0 to networkidle2 to avoid hanging on keepalives
  content = content.replace(
    'await page.goto(pageUrl, { waitUntil: "networkidle0" });',
    'await page.goto(pageUrl, { waitUntil: "networkidle2", timeout: 120000 });'
  );

  // 2. Prevent shuttingDown = true on non-fatal page/console errors (e.g. external analytics tags)
  content = content.replace(
    `onError: () => {\n            shuttingDown = true;\n          },`,
    `onError: () => {\n            /* Do not abort entire crawl on page error */\n          },`
  );

  // 3. Prevent a failure on a single route from killing the crawl for all other routes
  content = content.replace(
    `      } catch (e) {\n        if (!shuttingDown) {\n          console.log(\`🔥  error at \${route}\`, e);\n        }\n        shuttingDown = true;\n      }`,
    `      } catch (e) {\n        console.log(\`🔥  error at \${route}\`, e);\n      }`
  );

  fs.writeFileSync(filePath, content, 'utf8');
  console.log('react-snap patched: increased timeout, networkidle2, and prevented premature shutdown.');
} catch (e) {
  console.error('Error patching react-snap:', e);
}
