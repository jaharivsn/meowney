const { chromium } = require('playwright');
const path = require('path');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({
    viewport: { width: 390, height: 844 }
  });
  
  await page.goto('http://localhost:3000/app', { waitUntil: 'networkidle' });
  const outputPath = path.resolve('public/current-dashboard-screenshot.png');
  await page.screenshot({ path: outputPath, fullPage: true });
  
  await browser.close();
  console.log('App screenshot saved to: ' + outputPath);
})();
