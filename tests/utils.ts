import { Locator, Page, expect } from '@playwright/test';

export async function ensureAppReady(page: Page) {
  const acceptCookies = page.getByRole('button', { name: /Accept All Cookies/i });
  if (await acceptCookies.count()) {
    await acceptCookies.click();
    await expect(acceptCookies).toHaveCount(0, { timeout: 10000 });
  }

  const cookiePanel = page.getByText(/Cookie settings/i);
  if (await cookiePanel.count()) {
    const acceptButton = page.getByRole('button', { name: /Accept All Cookies/i });
    if (await acceptButton.count()) {
      await acceptButton.click();
      await expect(acceptButton).toHaveCount(0, { timeout: 10000 });
    }
  }

  const appTab = page.locator('text=/Timing Challenges|Flaky Selectors|Responsive/i').first();
  await appTab.waitFor({ state: 'visible', timeout: 20000 });
}

export async function navigateToTab(page: Page, tabName: string) {
  const tab = page.getByRole('tab', { name: tabName });
  const locator = (await tab.count()) ? tab : page.locator(`text=${tabName}`).first();
  await locator.waitFor({ state: 'visible', timeout: 20000 });
  await locator.click();
}

export async function expectSelectedByText(locator: Locator) {
  const selected = await locator.evaluate((el) => {
    if (el.getAttribute('aria-selected') === 'true') return true;
    return /selected|active/i.test(el.className || '');
  });
  if (!selected) {
    throw new Error('Expected element to be selected, but it was not');
  }
}
