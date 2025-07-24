import { test } from '@playwright/test';
import {
  navigateToNC211Workflow,
  verifyReferrerUrl,
  verifyPageLoaded,
  verifyNC211LandingPageContent,
  verifyCurrentUrl,
  clickGetStarted,
} from './helpers';
import { URL_PATTERNS, REFERRERS } from './helpers/utils/constants';

/**
 * NC 211 Referrer Workflow Tests - Phase 1: Static Content Validation
 *
 * This test suite validates the NC 211 referrer workflow landing page
 * static content including header, navigation, footer, and disclaimer text.
 * 
 * Following the established patterns from existing tests while extending
 * functionality for NC 211 specific branding and content.
 * 
 * Key Features:
 * - Multi-strategy selectors for robust element detection
 * - Comprehensive static content validation
 * - Referrer parameter persistence testing
 * - Desktop viewport for consistent navigation visibility
 */

// Shared configuration for consistent test behavior
const DESKTOP_VIEWPORT = { width: 1440, height: 900 };
const TEST_TIMEOUT = 60000; // 1 minute

test.describe('NC 211 Referrer Workflow - Phase 1', () => {
  test.setTimeout(TEST_TIMEOUT);

  test('NC 211 landing page static content validation', async ({ page }) => {
    // Set viewport to desktop size to ensure navigation links are visible
    await page.setViewportSize(DESKTOP_VIEWPORT);
    /**
     * Navigate to NC 211 workflow with referrer parameter
     * Expected URL: http://localhost:3000/nc/step-1?referrer=211nc
     */
    await navigateToNC211Workflow(page, REFERRERS.NC_211);

    // Verify page has loaded
    await verifyPageLoaded(page);

    // Verify we're on the correct landing page with referrer parameter
    await verifyCurrentUrl(page, URL_PATTERNS.LANDING_PAGE);
    await verifyReferrerUrl(page, REFERRERS.NC_211);

    /**
     * Comprehensive validation of all NC 211 static content:
     * - 211 and MyFriendBen co-branded logo in header
     * - Navigation menu with HOME, ABOUT, AGENCIES, RESOURCES links
     * - Get Help section with contact information and resources
     * - Both disclaimer paragraphs (eligibility criteria and NC 211 info)
     * - Privacy policy and copyright information section
     * - Language selector and globe icon
     */
    await verifyNC211LandingPageContent(page);

    /**
     * Test basic navigation functionality
     * Verify Get Started button works and maintains referrer parameter
     */
    await clickGetStarted(page);

    // Verify we've navigated to step 2 and maintained the referrer parameter
    await verifyCurrentUrl(page, URL_PATTERNS.DISCLAIMER);
    await verifyReferrerUrl(page, REFERRERS.NC_211);
  });

  test('NC 211 referrer parameter persistence', async ({ page }) => {
    // Set viewport to desktop size for consistent behavior
    await page.setViewportSize(DESKTOP_VIEWPORT);
    
    /**
     * Test that referrer parameter persists through navigation
     * This is critical for proper analytics and workflow tracking
     */
    await navigateToNC211Workflow(page, REFERRERS.NC_211);
    await verifyPageLoaded(page);

    // Navigate through first step
    await clickGetStarted(page);
    
    // Verify referrer parameter is maintained in step 2
    await verifyCurrentUrl(page, URL_PATTERNS.DISCLAIMER);
    await verifyReferrerUrl(page, REFERRERS.NC_211);
  });
});
