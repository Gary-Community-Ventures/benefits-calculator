/**
 * NC 211 Referrer Flow Helpers
 *
 * This file contains helper functions specific to the NC 211 referrer workflow,
 * composing common flow helpers into higher-level flows for this specific referrer.
 * 
 * Key Features:
 * - Reuses all common flow helpers from ./common.ts
 * - Maintains referrer parameter persistence throughout workflow
 * - Provides NC 211-specific entry point and session setup
 * - Follows same patterns as nc.ts for consistency
 */

import { Page, expect } from '@playwright/test';
import { navigateToNC211Workflow, clickGetStarted, verifyCurrentUrl, verifyReferrerUrl } from '../navigation';
import {
  completeDisclaimer,
  completeLocationInfo,
  completeHouseholdSize,
  completePrimaryUserInfo,
  completeHouseholdMemberInfo,
  completeExpenses,
  completeAssets,
  completePublicBenefits,
  completeNeeds,
  completeReferralSource,
  completeAdditionalInfo,
  navigateToResults,
} from './common';
import { URL_PATTERNS, REFERRERS } from '../utils/constants';
import { ApplicationData, FlowResult } from './types';
import { BUTTONS } from '../selectors';

/**
 * Sets up a test session for the NC 211 referrer workflow, getting to the first step after disclaimer
 * @param page - Playwright page instance
 * @returns Promise with flow result
 */
export async function setupNC211Session(page: Page): Promise<FlowResult> {
  try {
    // Navigate to NC 211 workflow with referrer parameter
    await navigateToNC211Workflow(page, REFERRERS.NC_211);
    
    // Verify we're on the correct landing page with referrer parameter
    await verifyCurrentUrl(page, URL_PATTERNS.LANDING_PAGE);
    await verifyReferrerUrl(page, REFERRERS.NC_211);

    // Click Get Started to proceed to disclaimer
    await clickGetStarted(page);

    // Verify we're on disclaimer page with referrer parameter maintained
    await verifyCurrentUrl(page, URL_PATTERNS.DISCLAIMER);
    await verifyReferrerUrl(page, REFERRERS.NC_211);

    // Complete disclaimer step
    const disclaimerResult = await completeDisclaimer(page);
    if (!disclaimerResult.success) {
      return disclaimerResult;
    }

    return { success: true, step: 'nc-211-session-setup' };
  } catch (error) {
    return {
      success: false,
      step: 'nc-211-session-setup',
      error: error as Error,
    };
  }
}

/**
 * Completes a full application for the NC 211 referrer workflow
 * Uses the same form steps as NC white label - only entry point differs
 * @param page - Playwright page instance
 * @param data - Application data to use for the test
 * @returns Promise with flow result
 */
export async function completeNC211FullApplication(page: Page, data: ApplicationData): Promise<FlowResult> {
  try {
    // Complete all form steps using shared helpers
    const steps = [
      () => completeLocationInfo(page, data.zipCode, data.county),
      () => completeHouseholdSize(page, data.householdSize),
      () => completePrimaryUserInfo(page, data.primaryUser),
      () => completeHouseholdMemberInfo(page, data.householdMember),
      () => completeExpenses(page, data.expenses),
      () => completeAssets(page, data.assets),
      () => completePublicBenefits(page),
      () => completeNeeds(page, data.needs),
      () => completeReferralSource(page, data.referralSource),
      () => completeAdditionalInfo(page),
      () => navigateToResults(page),
    ];

    // Execute each step and return early on failure
    for (const step of steps) {
      const result = await step();
      if (!result.success) return result;
    }

    return { success: true, step: 'nc-211-full-application' };
  } catch (error) {
    return {
      success: false,
      step: 'nc-211-full-application',
      error: error as Error,
    };
  }
}

/**
 * Runs a complete end-to-end test for the NC 211 referrer workflow
 * @param page - Playwright page instance
 * @param data - Application data to use for the test
 * @returns Promise with flow result
 */
export async function runNC211EndToEndTest(page: Page, data: ApplicationData): Promise<FlowResult> {
  const maxRetries = 3;
  let attempt = 0;
  let lastError: Error | undefined;

  // Detect debug mode for extended timeouts and logging
  const isDebugMode = page.context().browser()?.browserType().name() === 'chromium' && process.env.PWDEBUG === '1';

  // Log only key environment information if debugging is enabled
  const isCI = process.env.CI === 'true';
  const debugLogging = process.env.DEBUG || isDebugMode;

  if (debugLogging) {
    console.log(
      `[NC-211-E2E] Test environment: ${isCI ? 'CI' : 'local'}, Browser: ${page.context().browser()?.browserType().name()}`,
    );
  }

  // Configure longer timeout for page operations, even longer for debug mode
  const timeoutMs = isDebugMode ? 120000 : 60000; // 2 minutes for debug, 1 minute otherwise
  page.setDefaultTimeout(timeoutMs); // Set timeout for all operations

  while (attempt <= maxRetries) {
    try {
      if (attempt > 0) {
        console.log(`[NC-211-E2E] Retry attempt ${attempt}/${maxRetries} for NC 211 end-to-end test`);
        // Navigate back to NC 211 landing page for a fresh start on retry
        await navigateToNC211Workflow(page, REFERRERS.NC_211);
        // Wait for a key element on the landing page to ensure it's loaded
        await expect(page.getByRole(BUTTONS.GET_STARTED.role, { name: BUTTONS.GET_STARTED.name })).toBeVisible();
      }

      // Setup session (landing page, disclaimer)
      const setupResult = await setupNC211Session(page);

      if (!setupResult.success) {
        console.error(
          `[NC-211-E2E] Setup failed at step: ${setupResult.step} (${setupResult.error?.message || 'Unknown error'})`,
        );

        // Take screenshot of failure for debugging
        try {
          await page.screenshot({ path: `test-results/nc-211-e2e-setup-failure-${Date.now()}.png` });
        } catch (screenshotError) {
          // Silent fail for screenshot errors
        }

        lastError = setupResult.error || new Error('Unknown error in setup');
        attempt++;
        continue;
      }

      // Run complete application flow
      const applicationResult = await completeNC211FullApplication(page, data);

      if (!applicationResult.success) {
        console.error(
          `[NC-211-E2E] Application flow failed at step: ${applicationResult.step} (${
            applicationResult.error?.message || 'Unknown error'
          })`,
        );

        // Take screenshot of failure for debugging
        try {
          await page.screenshot({ path: `test-results/nc-211-e2e-application-failure-${Date.now()}.png` });
        } catch (screenshotError) {
          // Silent fail for screenshot errors
        }

        lastError = applicationResult.error || new Error('Unknown error in application flow');
        attempt++;
        continue;
      }

      if (debugLogging) {
        console.log(`[NC-211-E2E] Test completed successfully`);
      }

      // Success - return immediately without retrying
      return { success: true, step: 'nc-211-end-to-end-test' };
    } catch (error) {
      lastError = error as Error;
      attempt++;

      console.error(`[NC-211-E2E] Error: ${lastError.message}`);

      // Take screenshot of failure for debugging
      try {
        await page.screenshot({ path: `test-results/nc-211-e2e-uncaught-error-${Date.now()}.png` });
      } catch (screenshotError) {
        // Silent fail for screenshot errors
      }

      // If we haven't exceeded max retries, try again
      if (attempt <= maxRetries) {
        // Brief recovery delay before retry to allow for any pending async operations to settle
        const retryDelayMs = isDebugMode ? 4000 : 2000;
        console.log(`[NC-211-E2E] Will retry (attempt ${attempt}/${maxRetries}) after ${retryDelayMs}ms delay`);
        await page.waitForTimeout(retryDelayMs);
      }
    }
  }

  console.error(`[NC-211-E2E] Test failed after ${maxRetries} retry attempts`);

  // If we got here, all attempts failed
  return {
    success: false,
    step: 'nc-211-end-to-end-test',
    error: lastError || new Error('Max retries exceeded with unknown error'),
  };
}
