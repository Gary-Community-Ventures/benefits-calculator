import { test, expect } from '@playwright/test';
import { runNcEndToEndTest } from './helpers';
import { testUsers } from './helpers/utils/test-data';
import { URL_PATTERNS } from './helpers/utils/constants';

/**
 * Sample screen test: end-to-end
 * Refactored to use helper functions for better maintainability
 */
test.describe('MyFriendBen Sample Screen Test', () => {
  // Set a timeout for the full e2e test
  test.setTimeout(120000); // 2 minutes

  test('start to finish screen test', async ({ page }) => {
    // Use our high-level helper to run the entire NC end-to-end test flow
    // This replaces ~90 lines of hard-coded test steps with a single function call
    const result = await runNcEndToEndTest(page, testUsers.nc);
    
    // Verify the test completed successfully
    expect(result.success).toBeTruthy();
    
    // Verify we're on the results page
    await expect(page).toHaveURL(URL_PATTERNS.RESULTS);
    
    // Take a screenshot of the results page
    await page.screenshot({ path: 'test-results/nc-e2e-results.png' });
  });
});

