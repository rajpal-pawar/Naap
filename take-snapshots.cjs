const puppeteer = require('puppeteer');
const { spawn } = require('child_process');
const fs = require('fs');

async function capture() {
  if (!fs.existsSync('snapshots')) {
    fs.mkdirSync('snapshots');
  }

  // Start a simple server for the dist folder to avoid Vite preview port/base issues
  // Since `npm run build` ran, we can serve `dist` using the `serve` package.
  const preview = spawn('npx', ['serve', '-s', 'dist', '-p', '5000'], { stdio: 'inherit' });

  // Wait for server to start
  await new Promise(resolve => setTimeout(resolve, 3000));

  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox', '--disable-setuid-sandbox'] });
  const page = await browser.newPage();
  
  // Set mobile viewport
  await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true, deviceScaleFactor: 2 });

  // Load home screen
  await page.goto('http://localhost:5000/Naap/#home', { waitUntil: 'networkidle0' });
  
  // Let the fonts load
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({ path: 'snapshots/home.png' });

  // Go to add form
  await page.goto('http://localhost:5000/Naap/#add', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 500));
  await page.screenshot({ path: 'snapshots/form.png' });

  // Toggle Dark Mode
  await page.evaluate(() => {
    const buttons = document.querySelectorAll('.theme-toggle');
    if (buttons.length > 1) {
      buttons[1].click();
    }
  });
  await new Promise(r => setTimeout(r, 500));
  await page.screenshot({ path: 'snapshots/dark.png' });

  await browser.close();
  preview.kill();
  console.log("Snapshots captured.");
  process.exit(0);
}

capture().catch(e => {
  console.error(e);
  process.exit(1);
});
