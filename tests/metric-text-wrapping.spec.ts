import { test, expect } from '@playwright/test';

test('MetricText paragraphs should not collapse to one word per line', async ({ page }) => {
  // Go to the local page
  await page.goto('http://localhost:3001');
  
  // Find the SecPen Labs bullets which were identified as buggy
  // Look for the specific text known to be an issue
  const secPenLocator = page.locator('li').filter({ hasText: 'frontend performance using code-splitting' }).first();
  
  // Ensure it's visible
  await expect(secPenLocator).toBeVisible();
  
  // Get bounding box of the li container and the text span
  const liLocator = secPenLocator;
  const textSpanLocator = secPenLocator.locator('.break-words');
  
  const liBox = await liLocator.boundingBox();
  const textBox = await textSpanLocator.boundingBox();
  
  expect(liBox).not.toBeNull();
  expect(textBox).not.toBeNull();
  
  if (liBox && textBox) {
    // The text span should be reasonably close to the width of its parent li,
    // not collapsed to a tiny width (which happens if it wraps one word per line).
    // Let's assert the text box width is at least 60% of the li box width.
    expect(textBox.width).toBeGreaterThan(liBox.width * 0.6);
  }
});
