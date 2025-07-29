import { test, expect } from '@playwright/test';
import {
  runNcEndToEndTest,
  verifyCurrentUrl,
  saveResults,
  TEST_TIMEOUTS,
  testCompleteResultsNavigation,
  verifyFooterContent,
  verifyPrivacyPolicySection,
  VIEWPORTS,
} from './helpers';
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
  test.setTimeout(TEST_TIMEOUTS.END_TO_END);

  test('start to finish screen test', async ({ page }) => {
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

/**
 * NC Results Page Navigation Tests
 *
 * Tests detailed results page interactions including More Info navigation,
 * Near-term/Long-term benefits navigation, and estimated savings validation.
 * Mirrors NC 211 test enhancements for consistency across test suites.
 */
test.describe('NC Results Page Navigation', () => {
  test.setTimeout(TEST_TIMEOUTS.END_TO_END);

  test('complete results page navigation flow', async ({ page }) => {
    await page.setViewportSize(VIEWPORTS.DESKTOP);
    
    // Complete the workflow to get to results page
    const result = await runNcEndToEndTest(page, testUsers[WHITE_LABELS.NC]);
    expect(result.success, `NC end-to-end test failed at step: ${result.step}`).toBeTruthy();

    if (result.success) {
      // Test complete results navigation flow (More Info → Details → Back, Near-term/Long-term)
      const navResult = await testCompleteResultsNavigation(page);
      expect(navResult.success, `Results navigation failed at step: ${navResult.step}`).toBeTruthy();
    }
  });
});

/**
 * NC Enhanced Content Validation Tests
 *
 * Tests additional content validation requirements including footer content
 * and privacy policy sections. Ensures consistency with NC 211 test coverage.
 */
test.describe('NC Enhanced Content Validation', () => {
  test('footer and privacy policy validation', async ({ page }) => {
    await page.setViewportSize(VIEWPORTS.DESKTOP);
    
    // Complete the workflow to get to results page
    const result = await runNcEndToEndTest(page, testUsers[WHITE_LABELS.NC]);
    expect(result.success, `NC end-to-end test failed at step: ${result.step}`).toBeTruthy();

    if (result.success) {
      // Verify footer content is displayed on results page
      await verifyFooterContent(page);
      
      // Verify privacy policy section is displayed
      await verifyPrivacyPolicySection(page);
    }
  });
});
