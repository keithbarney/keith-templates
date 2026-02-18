#!/usr/bin/env node

/**
 * screenshot-uis.js
 *
 * Opens each Figma plugin's ui.html in headless Chrome at the correct
 * dimensions (parsed from code.ts) and saves a PNG screenshot.
 *
 * Usage: node scripts/screenshot-uis.js
 */

const fs = require("fs");
const path = require("path");
const puppeteer = require("puppeteer");

const PROJECTS_DIR = path.resolve(__dirname, "../../figma-plugins");

function discoverPlugins() {
  const entries = fs.readdirSync(PROJECTS_DIR, { withFileTypes: true });
  const plugins = [];

  for (const entry of entries) {
    if (!entry.isDirectory() || !entry.name.startsWith("heavy-")) continue;

    const dir = path.join(PROJECTS_DIR, entry.name);
    const uiHtml = path.join(dir, "ui.html");
    const codeTs = path.join(dir, "code.ts");

    if (fs.existsSync(uiHtml) && fs.existsSync(codeTs)) {
      plugins.push({ name: entry.name, dir, uiHtml, codeTs });
    }
  }

  return plugins;
}

function parseDimensions(codeTs) {
  const src = fs.readFileSync(codeTs, "utf-8");

  const widthMatch = src.match(/const\s+UI_WIDTH\s*=\s*(\d+)/);
  const heightMatch = src.match(/const\s+UI_HEIGHT\s*=\s*(\d+)/);

  return {
    width: widthMatch ? parseInt(widthMatch[1], 10) : 360,
    height: heightMatch ? parseInt(heightMatch[1], 10) : 560,
  };
}

async function main() {
  const plugins = discoverPlugins();

  if (plugins.length === 0) {
    console.log("No plugins found.");
    return;
  }

  console.log(`Found ${plugins.length} plugins\n`);

  const browser = await puppeteer.launch({ headless: true });
  const results = [];

  for (const plugin of plugins) {
    const { width, height } = parseDimensions(plugin.codeTs);
    const outPath = path.join(plugin.dir, "ui-screenshot.png");

    try {
      const page = await browser.newPage();
      await page.setViewport({ width, height, deviceScaleFactor: 2 });
      await page.goto(`file://${plugin.uiHtml}`, {
        waitUntil: "networkidle0",
      });

      // Let CSS transitions / fonts settle
      await new Promise((r) => setTimeout(r, 500));

      await page.screenshot({ path: outPath, fullPage: false });
      await page.close();

      console.log(`  ✅ ${plugin.name}  (${width}×${height}) → ui-screenshot.png`);
      results.push({ name: plugin.name, ok: true });
    } catch (err) {
      console.log(`  ❌ ${plugin.name}  ${err.message}`);
      results.push({ name: plugin.name, ok: false, error: err.message });
    }
  }

  await browser.close();

  const passed = results.filter((r) => r.ok).length;
  const failed = results.filter((r) => !r.ok).length;
  console.log(`\nDone: ${passed} captured, ${failed} failed`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
