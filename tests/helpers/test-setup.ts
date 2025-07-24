/**
 * Test Setup - Reusable test setup utilities
 *
 * Provides utilities for test environment setup, primarily for viewport overrides
 * when testing mobile/tablet layouts. Default desktop configuration is handled
 * by playwright.config.ts.
 */

import { Page } from '@playwright/test';
import { VIEWPORTS, TEST_ENV } from './utils/test-config';

/**
 * Sets up mobile viewport for responsive testing
 * @param page - Playwright page instance
 */
export async function setupMobileViewport(page: Page): Promise<void> {
  await page.setViewportSize(VIEWPORTS.MOBILE);
  if (TEST_ENV.DEBUG_MODE) {
    console.log('[TEST-SETUP] Mobile viewport configured');
  }
}

/**
 * Sets up tablet viewport for responsive testing
 * @param page - Playwright page instance
 */
export async function setupTabletViewport(page: Page): Promise<void> {
  await page.setViewportSize(VIEWPORTS.TABLET);
  if (TEST_ENV.DEBUG_MODE) {
    console.log('[TEST-SETUP] Tablet viewport configured');
  }
}
