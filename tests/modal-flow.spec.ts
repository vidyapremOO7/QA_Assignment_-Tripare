import { expect, test } from '@playwright/test';
import { ensureAppReady, navigateToTab } from './utils';

test('Modal Confirmation Flow', async ({ page }) => {
  await page.goto('/');
  await ensureAppReady(page);
  await navigateToTab(page, 'Responsive');

  const openModalButton = page.getByRole('button', { name: /Open Modal/i });
  await expect(openModalButton).toBeVisible();
  await openModalButton.click();

  const showDetailsButton = page.getByRole('button', { name: /Show Details/i }).last();
  await expect(showDetailsButton).toBeVisible();
  await showDetailsButton.click();

  const confirmButton = page.getByRole('button', { name: /^Confirm$/i }).last();
  await expect(confirmButton).toBeVisible();
  await confirmButton.click();

  await expect(page.getByRole('dialog')).toHaveCount(0, { timeout: 5000 });
  await expect(page.locator('text=confirmed')).toBeVisible({ timeout: 5000 });
});
