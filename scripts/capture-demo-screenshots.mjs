import { readFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const dataPath = join(root, 'assets/data/projects.json');
const outDir = join(root, 'assets/imgs/projects');

const { projects } = JSON.parse(await readFile(dataPath, 'utf8'));
const targets = projects.filter((project) => project.demo);

const browser = await chromium.launch();
const context = await browser.newContext({
  viewport: { width: 1440, height: 900 },
  deviceScaleFactor: 2,
});

let failed = 0;

for (const project of targets) {
  const page = await context.newPage();
  const outPath = join(outDir, `${project.id}.png`);

  try {
    await page.goto(project.demo, { waitUntil: 'networkidle', timeout: 60000 });
    await new Promise((resolve) => setTimeout(resolve, 1500));
    await page.screenshot({ path: outPath, fullPage: false, type: 'png' });
    console.log(`ok  ${project.id} -> ${outPath}`);
  } catch (err) {
    failed += 1;
    console.error(`fail ${project.id} (${project.demo}): ${err.message}`);
  } finally {
    await page.close();
  }
}

await browser.close();

if (failed > 0) {
  console.error(`Finished with ${failed} failure(s).`);
  process.exit(1);
}

console.log(`Captured ${targets.length} demo screenshot(s).`);
