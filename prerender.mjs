import puppeteer from 'puppeteer';
import { preview } from 'vite';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const routes = ['/', '/contact'];

async function prerender() {
  console.log('🚀 Starting pre-render...');

  const previewServer = await preview({
    preview: { port: 5173, open: false },
  });

  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();

  // Set a tall viewport so more content is in view on first load
  await page.setViewport({ width: 1280, height: 2400 });

  for (const route of routes) {
    const url = `http://localhost:5173${route}`;
    console.log(`📄 Rendering: ${url}`);

    // networkidle0 = wait until there are 0 network requests for 500ms
    // This means all your API calls (gallery, packages, promotions) have finished
    await page.goto(url, { waitUntil: 'networkidle0', timeout: 30000 });

    // Scroll to trigger any lazy-loaded content
    await page.evaluate(async () => {
      await new Promise((resolve) => {
        let totalHeight = 0;
        const distance = 300;
        const timer = setInterval(() => {
          window.scrollBy(0, distance);
          totalHeight += distance;
          if (totalHeight >= document.body.scrollHeight) {
            clearInterval(timer);
            resolve();
          }
        }, 150);
      });
    });

    // Extra buffer after scrolling for any remaining renders
    await new Promise(resolve => setTimeout(resolve, 2000));

    const html = await page.content();

    let outputPath;
    if (route === '/') {
      outputPath = path.join(__dirname, 'dist', 'index.html');
    } else {
      const dir = path.join(__dirname, 'dist', route);
      fs.mkdirSync(dir, { recursive: true });
      outputPath = path.join(dir, 'index.html');
    }

    fs.writeFileSync(outputPath, html, 'utf-8');
    console.log(`✅ Saved: ${outputPath}`);
  }

  await browser.close();
  previewServer.httpServer.close();
  console.log('🎉 Pre-render complete!');
}

prerender().catch(console.error);