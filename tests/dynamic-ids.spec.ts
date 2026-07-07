import { expect, test } from '@playwright/test';
import { ensureAppReady, navigateToTab } from './utils';

test('Dynamic ID Handling', async ({ page }) => {
  await page.goto('/');
  await ensureAppReady(page);
  await navigateToTab(page, 'Flaky Selectors');

  const regenerate = page.getByRole('button', { name: /Regenerate All IDs/i });
  await expect(regenerate).toBeVisible();
  await regenerate.click();

  const betaItem = page.locator('text=Beta').first();
  await expect(betaItem).toBeVisible();
  await betaItem.click();

  const isSelected = await betaItem.evaluate((el) => {
    if (el.getAttribute('aria-selected') === 'true') return true;
    return /selected|active/i.test(el.className || '');
  });

  expect(isSelected).toBe(true);
});
