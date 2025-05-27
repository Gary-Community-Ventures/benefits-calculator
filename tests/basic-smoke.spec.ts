import { test } from '@playwright/test';
import { 
  navigateToHomePage,
  verifyCurrentUrl,
  clickGetStarted,
  verifyPageLoaded,
  verifyLanguageSelectorVisible,
  verifyButtonVisible
} from './helpers';
import { URL_PATTERNS } from './helpers/utils/constants';

/**
 * Basic smoke test: verify the application loads and has expected elements
 * Refactored to use helper functions for better maintainability
 */
test.describe('MyFriendBen Smoke Test', () => {
  test('application loads', async ({ page }) => {
    // Navigate to homepage
    await navigateToHomePage(page);
    
    // Verify page has loaded
    await verifyPageLoaded(page);
    
    // Verify we're on the landing page
    await verifyCurrentUrl(page, URL_PATTERNS.LANDING_PAGE);

    // Verify language selector is visible
    await verifyLanguageSelectorVisible(page);

    // Verify and click the get started button
    await verifyButtonVisible(page, /get started/i);
    await clickGetStarted(page);

    // Verify we've navigated to the state selection page
    await verifyCurrentUrl(page, URL_PATTERNS.SELECT_STATE);
  });
});
