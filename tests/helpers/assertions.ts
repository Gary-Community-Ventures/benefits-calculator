/**
 * Assertions - Common test assertion helpers
 *
 * This file contains helpers for common assertions used across tests,
 * making it easier to verify application state consistently.
 */

import { Page, expect } from '@playwright/test';
import { LANGUAGE_SELECTOR } from './selectors';

/**
 * Verifies that the page body is visible (page has loaded)
 * @param page - Playwright page instance
 */
export async function verifyPageLoaded(page: Page): Promise<void> {
  await expect(page.locator('body')).toBeVisible();
}

/**
 * Verifies that the language selector is visible on the page
 * @param page - Playwright page instance
 */
export async function verifyLanguageSelectorVisible(page: Page): Promise<void> {
  const languageSelector = page.locator(LANGUAGE_SELECTOR);
  await expect(languageSelector).toBeVisible();
}

/**
 * Verifies that a button with the specified name is visible
 * @param page - Playwright page instance
 * @param buttonName - Text on the button to check for
 */
export async function verifyButtonVisible(page: Page, buttonName: string | RegExp): Promise<void> {
  const button = page.getByRole('button', { name: buttonName });
  await expect(button).toBeVisible();
}

/**
 * Verifies that an element with specified selector exists
 * @param page - Playwright page instance
 * @param selector - CSS selector for the element
 */
export async function verifyElementExists(page: Page, selector: string): Promise<void> {
  await expect(page.locator(selector)).toHaveCount(1);
}

/**
 * Verifies that a text element with specified content exists
 * @param page - Playwright page instance
 * @param text - Text content to search for
 */
export async function verifyTextExists(page: Page, text: string | RegExp): Promise<void> {
  await expect(page.getByText(text)).toBeVisible();
}
