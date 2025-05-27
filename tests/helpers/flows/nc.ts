/**
 * NC White Label Flow Helpers
 * 
 * This file contains helper functions specific to the North Carolina white label,
 * composing common flow helpers into higher-level flows for this specific white label.
 */

import { Page } from '@playwright/test';
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
  try {
    // Setup session (landing page, state selection, disclaimer)
    const setupResult = await setupNcSession(page);
    if (!setupResult.success) return setupResult;
    
    // Complete full application
    const applicationResult = await completeNcFullApplication(page, data);
    if (!applicationResult.success) return applicationResult;
    
    return { success: true, step: 'nc-end-to-end-test' };
  } catch (error) {
    return {
      success: false,
      step: 'nc-end-to-end-test',
      error: error as Error
    };
  }
}
