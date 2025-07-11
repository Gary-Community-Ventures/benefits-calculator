/**
 * Navigation - Navigation helper functions
 *
 * This file contains helpers for common navigation patterns used in tests,
 * such as clicking the continue button, navigating to specific pages, etc.
 */

import { Page, expect } from '@playwright/test';
import { BUTTONS } from './selectors';

/**
 * Clicks the continue button to proceed to the next step
 * @param page - Playwright page instance
 */
export async function clickContinue(page: Page): Promise<void> {
  await page.getByRole(BUTTONS.CONTINUE.role, { name: BUTTONS.CONTINUE.name }).click();
}

/**
 * Clicks the "Get Started" button on the landing page
 * @param page - Playwright page instance
 */
export async function clickGetStarted(page: Page): Promise<void> {
  await page.getByRole(BUTTONS.GET_STARTED.role, { name: BUTTONS.GET_STARTED.name }).click();
}

/**
 * Navigates to the homepage
 * @param page - Playwright page instance
 */
export async function navigateToHomePage(page: Page): Promise<void> {
  await page.goto('/');
}

/**
 * Verifies that the current URL matches the expected pattern
 * @param page - Playwright page instance
 * @param urlPattern - Regular expression or string pattern to match against URL
 * @param timeoutMs - Optional timeout in milliseconds (defaults to 15000ms)
 */
export async function verifyCurrentUrl(
  page: Page,
  urlPattern: RegExp | string,
  timeoutMs: number = 15000,
): Promise<void> {
  // Use a longer timeout than the default 5000ms to accommodate slower navigation in debug mode
  await expect(page).toHaveURL(urlPattern, { timeout: timeoutMs });
}

/**
 * Clicks the "Save My Results" button on the results page
 * @param page - Playwright page instance
 */
export async function saveResults(page: Page): Promise<void> {
  await page.getByRole(BUTTONS.SAVE_RESULTS.role, { name: BUTTONS.SAVE_RESULTS.name }).click();
}
