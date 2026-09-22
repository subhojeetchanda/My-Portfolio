import { test, expect } from '@playwright/test';

test('metrics show exact values from profile', async ({ page }) => {
  await page.goto('/');

  // Scroll down smoothly in increments to trigger all `useInView` observers
  await page.evaluate(async () => {
    let currentPos = 0;
    while (currentPos < document.body.scrollHeight) {
      currentPos += 500;
      window.scrollTo(0, currentPos);
      await new Promise(r => setTimeout(r, 100));
    }
  });

  await page.waitForTimeout(3000);

  const metricTexts = await page.$$eval('.font-mono.text-molten', els => els.map(e => e.textContent));
  const digits = metricTexts.filter(t => t && t.match(/^\d+$/));
  
  const expectedValues = ['20', '100', '15', '5', '3', '12', '4', '8', '4', '150', '91', '3', '30'];
  
  for (const expected of expectedValues) {
    expect(digits).toContain(expected);
  }
});
