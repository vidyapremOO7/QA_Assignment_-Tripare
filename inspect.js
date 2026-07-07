const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('https://claude.ai/public/artifacts/1e02a9a5-4f20-4f19-a7ba-6c3f16c6eab9', { waitUntil: 'domcontentloaded' });
  await page.waitForSelector('text=Timing Challenges', { timeout: 30000 });
  const buttons = await page.$$eval('button, [role="tab"], [role="button"]', els => els.map(e => ({tag: e.tagName, text:e.innerText.trim(), id:e.id, className:e.className, ariaLabel:e.getAttribute('aria-label')})).filter(x=>x.text||x.ariaLabel));
  console.log(JSON.stringify(buttons, null, 2));
  const tabText = await page.$$eval('[role="tab"]', els => els.map(e => e.innerText.trim()));
  console.log('tabs', tabText);
  await browser.close();
})();
