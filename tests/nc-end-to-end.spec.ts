import { test, expect } from '@playwright/test';
import { 
  runNcEndToEndTest,
  verifyCurrentUrl,
  saveResults
} from './helpers';
import { testUsers } from './helpers/utils/test-data';
import { URL_PATTERNS } from './helpers/utils/constants';

/**
 * NC white label end-to-end test
 * Refactored to use the helper framework for improved stability
 */
test.describe('NC Screen Test', () => {
  // Set a longer timeout for this test to avoid issues with UI interactions
  test.setTimeout(120000); // 2 minutes

  test('start to finish screen test', async ({ page }) => {
    // Run the full NC end-to-end test using our high-level helper
    await test.step('Full application flow', async () => {
      // This single helper encapsulates all the steps of the application flow
      const result = await runNcEndToEndTest(page, testUsers.nc);
      expect(result.success).toBeTruthy();
      
      // Verify we're on the results page
      await verifyCurrentUrl(page, URL_PATTERNS.RESULTS);
      
      // Save the results
      await saveResults(page);
    });
  });
});
