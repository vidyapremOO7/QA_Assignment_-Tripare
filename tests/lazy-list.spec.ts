import { expect, test } from '@playwright/test';
import { ensureAppReady, navigateToTab } from './utils';

test('Load and Verify List Items', async ({ page }) => {
  await page.goto('/');
  await ensureAppReady(page);
  await navigateToTab(page, 'Timing Challenges');

  const loadButton = page.getByRole('button', { name: /Load More Items/i });
  const itemTitles = page.locator('text=/Item\\s*\\d+/i');

  for (let i = 1; i <= 3; i++) {
    await expect(loadButton).toBeVisible();
    await loadButton.click();
    await expect(page.locator(`text=Item ${i * 5}`)).toBeVisible({ timeout: 7000 });
  }

  await expect(itemTitles).toHaveCount(15, { timeout: 7000 });
  await expect(page.locator('text=/active/i')).toBeVisible();
  await expect(page.locator('text=/pending/i')).toBeVisible();
});
