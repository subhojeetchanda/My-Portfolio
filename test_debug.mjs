import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:3000/');
  
  await page.evaluate(async () => {
    for (let i = 0; i < document.body.scrollHeight; i += 100) {
      window.scrollTo(0, i);
      await new Promise(r => setTimeout(r, 10));
    }
  });

  await page.waitForTimeout(3000);
  
  const metricTexts = await page.$$eval('.font-mono.text-molten', els => els.map(e => e.textContent));
  console.log("Molten texts:", metricTexts);
  
  await browser.close();
})();
