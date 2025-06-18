/**
 * NC White Label Flow Helpers
 * 
 * This file contains helper functions specific to the North Carolina white label,
 * composing common flow helpers into higher-level flows for this specific white label.
 */

import { Page, expect } from '@playwright/test';
import { 
  navigateToHomePage, 
  clickGetStarted, 
  verifyCurrentUrl 
} from '../navigation';
import { 
  completeStateSelection,
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
  navigateToResults
} from './common';
import { URL_PATTERNS, STATES, WHITE_LABELS } from '../utils/constants';
import { ApplicationData, FlowResult } from './types';
import { BUTTONS } from '../selectors';

/**
 * Sets up a test session for the NC white label, getting to the first step after disclaimer
 * @param page - Playwright page instance
 * @returns Promise with flow result
 */
export async function setupNcSession(page: Page): Promise<FlowResult> {
  try {
    // Navigate to homepage and start
    await navigateToHomePage(page);
    await clickGetStarted(page);
    
    // Verify we're on the state selection page
    await verifyCurrentUrl(page, URL_PATTERNS.SELECT_STATE);
    
    // Select North Carolina
    const stateResult = await completeStateSelection(page, STATES.NORTH_CAROLINA);
    if (!stateResult.success) {
      return stateResult;
    }
    
    // Complete disclaimer
    const disclaimerResult = await completeDisclaimer(page);
    if (!disclaimerResult.success) {
      return disclaimerResult;
    }
    
    return { success: true, step: 'nc-session-setup' };
  } catch (error) {
    return {
      success: false,
      step: 'nc-session-setup',
      error: error as Error
    };
  }
}

/**
 * Completes a full application for the NC white label using the provided test data
 * @param page - Playwright page instance
 * @param data - Application data to use for the test
 * @returns Promise with flow result
 */
export async function completeNcFullApplication(
  page: Page,
  data: ApplicationData
): Promise<FlowResult> {
  try {
    // Complete location info
    const locationResult = await completeLocationInfo(page, data.zipCode, data.county);
    if (!locationResult.success) return locationResult;
    
    // Complete household size
    const householdSizeResult = await completeHouseholdSize(page, data.householdSize);
    if (!householdSizeResult.success) return householdSizeResult;
    
    // Complete primary user info
    const primaryUserResult = await completePrimaryUserInfo(page, data.primaryUser);
    if (!primaryUserResult.success) return primaryUserResult;
    
    // Complete household member info
    const memberResult = await completeHouseholdMemberInfo(page, data.householdMember);
    if (!memberResult.success) return memberResult;
    
    // Complete expenses
    const expensesResult = await completeExpenses(page, data.expenses);
    if (!expensesResult.success) return expensesResult;
    
    // Complete assets
    const assetsResult = await completeAssets(page, data.assets);
    if (!assetsResult.success) return assetsResult;
    
    // Complete public benefits (just continue)
    const benefitsResult = await completePublicBenefits(page);
    if (!benefitsResult.success) return benefitsResult;
    
    // Complete needs
    const needsResult = await completeNeeds(page, data.needs);
    if (!needsResult.success) return needsResult;
    
    // Complete referral source
    const referralResult = await completeReferralSource(page, data.referralSource);
    if (!referralResult.success) return referralResult;
    
    // Complete additional info
    const additionalInfoResult = await completeAdditionalInfo(page);
    if (!additionalInfoResult.success) return additionalInfoResult;
    
    // Navigate to results
    const resultsResult = await navigateToResults(page);
    if (!resultsResult.success) return resultsResult;
    
    return { success: true, step: 'nc-full-application' };
  } catch (error) {
    return {
      success: false,
      step: 'nc-full-application',
      error: error as Error
    };
  }
}

/**
 * Runs a complete end-to-end test for the NC white label
 * @param page - Playwright page instance
 * @param data - Application data to use for the test
 * @returns Promise with flow result
 */
export async function runNcEndToEndTest(
  page: Page,
  data: ApplicationData
): Promise<FlowResult> {
  // Add retry mechanism for more resilience
  const maxRetries = 2;
  let attempt = 0;
  let lastError: Error | null = null;
  
  // Check if we're in debug mode (can be detected by looking at the browser name from the page's context)
  const isDebugMode = page.context().browser()?.browserType().name() === 'chromium' && 
                     process.env.PWDEBUG === '1';
  
  // Configure longer timeout for page operations, even longer for debug mode
  const timeoutMs = isDebugMode ? 120000 : 60000; // 2 minutes for debug, 1 minute otherwise
  console.log(`Setting timeout to ${timeoutMs}ms${isDebugMode ? ' (debug mode)' : ''}`);
  page.setDefaultTimeout(timeoutMs); // Set timeout for all operations

  while (attempt <= maxRetries) {
    try {
      if (attempt > 0) {
        console.log(`Retry attempt ${attempt} for NC end-to-end test`);
        // Navigate back to home page for a fresh start on retry
        await page.goto('/');
        // Wait for a key element on the landing page to ensure it's loaded
        await expect(page.getByRole(BUTTONS.GET_STARTED.role, { name: BUTTONS.GET_STARTED.name })).toBeVisible();
      }

      // Setup session (landing page, state selection, disclaimer)
      const setupResult = await setupNcSession(page);
      if (!setupResult.success) {
        lastError = setupResult.error || new Error('Unknown error in setup');
        attempt++;
        continue;
      }
      
      // completeNcFullApplication (starting with completeLocationInfo) now has its own initial waits.
      const applicationResult = await completeNcFullApplication(page, data);
      if (!applicationResult.success) {
        lastError = applicationResult.error || new Error('Unknown error in application flow');
        attempt++;
        continue;
      }
      
      // Success - return immediately without retrying
      return { success: true, step: 'nc-end-to-end-test' };
    } catch (error) {
      lastError = error as Error;
      attempt++;
      
      // If we haven't exceeded max retries, try again
      if (attempt <= maxRetries) {
        console.log(`Error in NC end-to-end test, will retry: ${lastError.message}`);
        
        // Brief recovery delay before retry to allow for any pending async operations to settle
        // This is an intentional brief delay in the error recovery path to prevent rapid-fire retries
        // Longer delay in debug mode to accommodate slower processing
        const retryDelayMs = isDebugMode ? 4000 : 2000;
        console.log(`Waiting ${retryDelayMs}ms before retry attempt ${attempt}/${maxRetries}`);
        await page.waitForTimeout(retryDelayMs);
      }
    }
  }
  
  // If we got here, all attempts failed
  return {
    success: false,
    step: 'nc-end-to-end-test',
    error: lastError || new Error('Max retries exceeded with unknown error')
  };
}
