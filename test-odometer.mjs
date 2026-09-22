import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:3000');
  
  // wait for animations to settle
  await page.waitForTimeout(3000);
  
  // scroll down to trigger all inViews
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(3000);
  
  const metricTexts = await page.$$eval('.font-mono.text-molten', els => els.map(e => e.textContent));
  console.log("Molten texts:", metricTexts);
  
  await browser.close();
})();
