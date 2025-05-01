import { test, expect } from '@playwright/test';

/**
 * Basic smoke test: verify the application loads and has expected elements
 */
test.describe('MyFriendBen Smoke Test', () => {
  test('application loads', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('body')).toBeVisible();
    await expect(page).toHaveURL(/step-1/);

    const languageSelector = page.locator('select, [aria-label*="language"], [data-testid*="language"]');
    await expect(languageSelector).toBeVisible();

    const getStartedButton = page.getByRole('button', { name: /get started/i });
    await expect(getStartedButton).toBeVisible();
    await getStartedButton.click();

    await expect(page).toHaveURL(/select-state/)
  });
});
