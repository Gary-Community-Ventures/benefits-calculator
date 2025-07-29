import { test, expect } from '@playwright/test';
import {
  navigateToNC211Workflow,
  verifyReferrerUrl,
  verifyPageLoaded,
  verifyNC211LandingPageContent,
  verifyCurrentUrl,
  clickGetStarted,
  saveResults,
  VIEWPORTS,
  runNC211EndToEndTest,
  testUsers,
  TEST_TIMEOUTS,
  testCompleteResultsNavigation,
  testNC211NavigationMenu,
  verifyFooterContent,
  verifyPrivacyPolicySection,
} from './helpers';
import { URL_PATTERNS, REFERRERS } from './helpers/utils/constants';

/**
 * NC 211 Referrer Workflow Tests
 *
 * Tests NC 211 landing page content and referrer parameter persistence.
 * Uses desktop viewport for consistent navigation visibility.
 */

test.describe('NC 211 Referrer Workflow', () => {

  test('NC 211 landing page static content validation', async ({ page }) => {
    await page.setViewportSize(VIEWPORTS.DESKTOP);
    
    // Navigate to NC 211 workflow and verify landing page
    await navigateToNC211Workflow(page, REFERRERS.NC_211);
    await verifyPageLoaded(page);
    await verifyCurrentUrl(page, URL_PATTERNS.LANDING_PAGE);
    await verifyReferrerUrl(page, REFERRERS.NC_211);

    // Validate NC 211 specific content (branding, navigation, disclaimers)
    await verifyNC211LandingPageContent(page);

    // Test navigation maintains referrer parameter
    await clickGetStarted(page);
    await verifyCurrentUrl(page, URL_PATTERNS.DISCLAIMER);
    await verifyReferrerUrl(page, REFERRERS.NC_211);
  });

  test('NC 211 referrer parameter persistence', async ({ page }) => {
    await page.setViewportSize(VIEWPORTS.DESKTOP);
    
    // Test referrer parameter persists through navigation
    await navigateToNC211Workflow(page, REFERRERS.NC_211);
    await verifyPageLoaded(page);
    await clickGetStarted(page);
    
    // Verify referrer parameter maintained after navigation
    await verifyCurrentUrl(page, URL_PATTERNS.DISCLAIMER);
    await verifyReferrerUrl(page, REFERRERS.NC_211);
  });
});

/**
 * NC 211 Referrer Workflow Tests - Complete End-to-End Test
 *
 * Tests the complete NC 211 workflow from landing page to results.
 * Uses shared helpers and follows the same pattern as NC end-to-end test.
 */
test.describe('NC 211 Referrer Workflow - Complete End-to-End', () => {
  // Set extended timeout for end-to-end workflow tests (same as NC end-to-end)
  test.setTimeout(TEST_TIMEOUTS.END_TO_END);

  test('NC 211 start to finish workflow test', async ({ page }) => {
    // Run complete NC 211 workflow using shared helper
    const result = await runNC211EndToEndTest(page, testUsers[REFERRERS.NC_211]);

    // Verify test was successful
    expect(result.success, `NC 211 end-to-end test failed at step: ${result.step}`).toBeTruthy();

    // Verify results page and save functionality
    if (result.success) {
      await verifyCurrentUrl(page, URL_PATTERNS.RESULTS);
      await saveResults(page);
    }
  });
});

/**
 * NC 211 Results Page Navigation Tests
 *
 * Tests detailed results page interactions including More Info navigation,
 * Near-term/Long-term benefits navigation, and estimated savings validation.
 * Addresses high-priority gaps identified in testing guide comparison.
 */
test.describe('NC 211 Results Page Navigation', () => {
  test.setTimeout(TEST_TIMEOUTS.END_TO_END);

  test('complete results page navigation flow', async ({ page }) => {
    await page.setViewportSize(VIEWPORTS.DESKTOP);
    
    // Complete the workflow to get to results page
    const result = await runNC211EndToEndTest(page, testUsers[REFERRERS.NC_211]);
    expect(result.success, `NC 211 end-to-end test failed at step: ${result.step}`).toBeTruthy();

    if (result.success) {
      // Test complete results navigation flow (More Info → Details → Back, Near-term/Long-term)
      const navResult = await testCompleteResultsNavigation(page);
      expect(navResult.success, `Results navigation failed at step: ${navResult.step}`).toBeTruthy();
    }
  });
});

/**
 * NC 211 Navigation Menu Tests
 *
 * Tests the header navigation menu functionality specific to NC 211 referrer.
 * Validates HOME, ABOUT, AGENCIES, RESOURCES links as specified in testing guide.
 */
test.describe('NC 211 Navigation Menu', () => {
  test('navigation menu links validation', async ({ page }) => {
    await page.setViewportSize(VIEWPORTS.DESKTOP);
    
    // Navigate to NC 211 landing page
    await navigateToNC211Workflow(page, REFERRERS.NC_211);
    await verifyPageLoaded(page);
    await verifyCurrentUrl(page, URL_PATTERNS.LANDING_PAGE);
    
    // Test navigation menu functionality
    const navResult = await testNC211NavigationMenu(page);
    expect(navResult.success, `Navigation menu test failed at step: ${navResult.step}`).toBeTruthy();
  });
});

/**
 * NC 211 Enhanced Content Validation Tests
 *
 * Tests additional content validation requirements from the testing guide,
 * including footer content and privacy policy sections.
 */
test.describe('NC 211 Enhanced Content Validation', () => {
  test.setTimeout(TEST_TIMEOUTS.END_TO_END);

  test('footer and privacy policy validation', async ({ page }) => {
    await page.setViewportSize(VIEWPORTS.DESKTOP);
    
    // Navigate to NC 211 landing page
    await navigateToNC211Workflow(page, REFERRERS.NC_211);
    await verifyPageLoaded(page);
    
    // Verify footer content is displayed
    await verifyFooterContent(page);
    
    // Verify privacy policy section is displayed
    await verifyPrivacyPolicySection(page);
    
    // Test that footer content persists on results page
    const result = await runNC211EndToEndTest(page, testUsers[REFERRERS.NC_211]);
    if (result.success) {
      await verifyFooterContent(page);
      await verifyPrivacyPolicySection(page);
    }
  });
});
