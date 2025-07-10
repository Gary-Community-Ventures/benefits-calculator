import { test, expect } from '@playwright/test';
import { runNcEndToEndTest, verifyCurrentUrl, saveResults } from './helpers';
import { testUsers } from './helpers/utils/test-data';
import { URL_PATTERNS, WHITE_LABELS } from './helpers/utils/constants';

/**
 * NC white label end-to-end test
 * 
 * This test uses shared helper functions and test data to execute
 * a complete end-to-end flow for the NC white label. The helpers
 * provide proper error handling, retry logic, and debug mode support.
 */
test.describe('NC Screen Test', () => {
  // Set a longer timeout for this test to avoid issues with UI interactions
  test.setTimeout(120000); // 2 minutes

  test('start to finish screen test', async ({ page }) => {
    /**
     * Using runNcEndToEndTest helper to execute the complete flow with:
     * - Shared test data from testUsers
     * - Built-in error handling and retry logic
     * - Debug mode detection and appropriate timeouts
     * - Consistent selectors and interactions
     */
    // Use the helper to run the complete end-to-end test flow
    const result = await runNcEndToEndTest(page, testUsers[WHITE_LABELS.NC]);
    
    // Verify the test was successful
    expect(result.success, `End-to-end test failed at step: ${result.step}`).toBeTruthy();
    
    // Only try these if the test succeeds to avoid cascading failures
    if (result.success) {
      // Verify we reached the results page
      await verifyCurrentUrl(page, URL_PATTERNS.RESULTS);
      
      // Verify results can be saved
      await saveResults(page);
    }
  });
});

