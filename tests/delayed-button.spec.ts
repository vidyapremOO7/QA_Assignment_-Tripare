import { expect, test } from '@playwright/test';
import { ensureAppReady, navigateToTab } from './utils';

test('Delayed Button Flow', async ({ page }) => {
  await page.goto('/');
  await ensureAppReady(page);
  await navigateToTab(page, 'Timing Challenges');

  const startButton = page.getByRole('button', { name: /Start Process/i });
  await expect(startButton).toBeVisible();
  await startButton.click();

  const confirmButton = page.getByRole('button', { name: /Confirm Action/i });
  await expect(confirmButton).toBeVisible();
  await expect(confirmButton).toBeEnabled({ timeout: 8000 });
  await confirmButton.click();

  await expect(page.locator('text=success')).toBeVisible({ timeout: 5000 });
});
