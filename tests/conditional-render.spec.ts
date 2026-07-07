import { expect, test } from '@playwright/test';
import { ensureAppReady, navigateToTab } from './utils';

test('Conditional Login Flow', async ({ page }) => {
  await page.goto('/');
  await ensureAppReady(page);
  await navigateToTab(page, 'Flaky Selectors');

  const adminButton = page.getByRole('button', { name: /Admin User/i });
  await expect(adminButton).toBeVisible();
  await adminButton.click();

  const adminPanel = page.locator('text=/Admin Panel/i');
  const standardPanel = page.locator('text=/Standard Panel/i');

  await expect(adminPanel).toBeVisible({ timeout: 10000 });
  await expect(standardPanel).not.toBeVisible();

  const logoutButton = page.getByRole('button', { name: /Logout/i });
  await expect(logoutButton).toBeVisible({ timeout: 10000 });
  await logoutButton.click();

  const standardButton = page.getByRole('button', { name: /Standard User/i });
  await expect(standardButton).toBeVisible();
  await standardButton.click();

  await expect(standardPanel).toBeVisible({ timeout: 10000 });
  await expect(adminPanel).not.toBeVisible();
});
