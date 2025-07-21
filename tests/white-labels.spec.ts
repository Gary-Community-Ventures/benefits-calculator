import { test, expect } from '@playwright/test';
import {
  acceptDisclaimer,
  clickContinueButton,
  clickGetStartedButton,
  fillDateOfBirth,
  fillHouseholdSize,
  fillZipCode,
  navigateHomePage,
  selectCounty,
  selectInsurance,
  selectNearTernNeeds,
  selectReferralSource,
  selectState,
} from './utils/steps';
import {
  selectElectricProvider,
  selectHeatingSource,
  selectHouseholdInfo,
  selectNoBenefit,
  selectOwnerOrRenter,
  selectStatus,
  selectUtility,
} from './utils/energy-calculator';
import { URL_PATTERNS } from './helpers/utils/constants';
import { verifyCurrentUrl } from './helpers/navigation';

const whiteLabels = {
  nc: {
    state: 'North Carolina',
    zipcode: '27708',
    county: 'Durham County',
    householdSize: 1,
    dobMonth: 'February',
    dobYear: '1989',
    insurance: "I don't have or know if I have health insurance",
    nearTernNeeds: ['Food or groceries'],
    referralSource: 'Test / Prospective Partner',
    expectedResult: {
      programsCount: '3Programs Found',
      estimatedMonthlySavings: '$813Estimated Monthly Savings',
      annualTaxCredit: '$0Annual Tax Credit',
    },
  },
  co: {
    state: 'Colorado',
    zipcode: '80012',
    county: 'Denver County',
    householdSize: 1,
    dobMonth: 'February',
    dobYear: '1989',
    insurance: "I don't have or know if I have health insurance",
    nearTernNeeds: ['Food or groceries'],
    referralSource: 'Test / Prospective Partner',
    expectedResult: {
      programsCount: '5Programs Found',
      estimatedMonthlySavings: '$672Estimated Monthly Savings',
      annualTaxCredit: '$177Annual Tax Credit',
    },
  },
  ma: {
    state: 'Macachusetts',
    zipcode: '',
    county: '',
    householdSize: 1,
    dobMonth: 'February',
    dobYear: '1989',
    insurance: "I don't have or know if I have health insurance",
    nearTernNeeds: ['Food or groceries'],
    referralSource: 'Test / Prospective Partner',
    expectedResult: {
      programsCount: '5Programs Found',
      estimatedMonthlySavings: '$672Estimated Monthly Savings',
      annualTaxCredit: '$177Annual Tax Credit',
    },
  },
  energyCalculator: {
    ownerOrRenter: 'Renter',
    utility: 'Heating',
    zipcode: '80012',
    county: 'Denver County',
    householdSize: 1,
    dobMonth: 'February',
    dobYear: '1989',
    status: 'Widowed',
    electricProvider: 'Xcel Energy',
    heatingSource: 'Xcel Energy',
    householdInfo: 'You have a past-due electric',
    noBenefit: true,
    expectedResult: {
      programsCount: '7Programs Found',
    },
  },
};
test.describe('Bbasic e2e tests for each white label ', () => {
  test('NC white label', async ({ page }) => {
    await navigateHomePage(page);
    await clickGetStartedButton(page);
    await verifyCurrentUrl(page, URL_PATTERNS.SELECT_STATE);

    await selectState(page, whiteLabels.nc.state);
    await clickContinueButton(page);
    await verifyCurrentUrl(page, URL_PATTERNS.DISCLAIMER);

    await acceptDisclaimer(page);
    await clickContinueButton(page);
    await verifyCurrentUrl(page, URL_PATTERNS.LOCATION_INFO);

    await fillZipCode(page, whiteLabels.nc.zipcode);
    await clickContinueButton(page);
    await verifyCurrentUrl(page, URL_PATTERNS.HOUSEHOLD_SIZE);

    await fillHouseholdSize(page, 1);
    await clickContinueButton(page);
    await verifyCurrentUrl(page, URL_PATTERNS.HOUSEHOLD_MEMBER);

    await fillDateOfBirth(page, whiteLabels.nc.dobMonth, whiteLabels.nc.dobYear);
    await selectInsurance(page, whiteLabels.nc.insurance);
    await clickContinueButton(page);
    await verifyCurrentUrl(page, URL_PATTERNS.EXPENSES);

    await clickContinueButton(page);
    await verifyCurrentUrl(page, URL_PATTERNS.ASSETS);

    await clickContinueButton(page);
    await verifyCurrentUrl(page, URL_PATTERNS.PUBLIC_BENEFITS);

    await clickContinueButton(page);
    await verifyCurrentUrl(page, URL_PATTERNS.NEEDS);

    await selectNearTernNeeds(page, whiteLabels.nc.nearTernNeeds);
    await clickContinueButton(page);
    await verifyCurrentUrl(page, URL_PATTERNS.REFERRAL_SOURCE);

    await selectReferralSource(page, whiteLabels.nc.referralSource);
    await clickContinueButton(page);
    await verifyCurrentUrl(page, URL_PATTERNS.ADDITIONAL_INFO);

    await clickContinueButton(page);
    await verifyCurrentUrl(page, URL_PATTERNS.CONFIRM_INFORMATION);

    await clickContinueButton(page);
    await verifyCurrentUrl(page, URL_PATTERNS.RESULTS);

    await page.locator('.results-header').waitFor({ state: 'visible' });
    await expect(page.locator('.results-header .results-header-programs-count-text')).toHaveText(
      whiteLabels.nc.expectedResult.programsCount,
    );
    await expect(page.locator('.results-header .results-data-cell').first()).toHaveText(
      whiteLabels.nc.expectedResult.estimatedMonthlySavings,
    );
    await expect(page.locator('.results-header .results-data-cell').last()).toHaveText(
      whiteLabels.nc.expectedResult.annualTaxCredit,
    );
  });

  test('CO white label', async ({ page }) => {
    await navigateHomePage(page);
    await clickGetStartedButton(page);
    await verifyCurrentUrl(page, URL_PATTERNS.SELECT_STATE);

    await selectState(page, whiteLabels.co.state);
    await clickContinueButton(page);
    await verifyCurrentUrl(page, URL_PATTERNS.DISCLAIMER);

    await acceptDisclaimer(page);
    await clickContinueButton(page);
    await verifyCurrentUrl(page, URL_PATTERNS.LOCATION_INFO);

    await fillZipCode(page, whiteLabels.co.zipcode);
    await selectCounty(page, whiteLabels.co.county);
    await clickContinueButton(page);
    await verifyCurrentUrl(page, URL_PATTERNS.HOUSEHOLD_SIZE);

    await fillHouseholdSize(page, 1);
    await clickContinueButton(page);
    await verifyCurrentUrl(page, URL_PATTERNS.HOUSEHOLD_MEMBER);

    await fillDateOfBirth(page, whiteLabels.co.dobMonth, whiteLabels.co.dobYear);
    await selectInsurance(page, whiteLabels.co.insurance);
    await clickContinueButton(page);
    await verifyCurrentUrl(page, URL_PATTERNS.EXPENSES);

    await clickContinueButton(page);
    await verifyCurrentUrl(page, URL_PATTERNS.ASSETS);

    await clickContinueButton(page);
    await verifyCurrentUrl(page, URL_PATTERNS.PUBLIC_BENEFITS);

    await clickContinueButton(page);
    await verifyCurrentUrl(page, URL_PATTERNS.NEEDS);

    await selectNearTernNeeds(page, whiteLabels.co.nearTernNeeds);
    await clickContinueButton(page);
    await verifyCurrentUrl(page, URL_PATTERNS.REFERRAL_SOURCE);

    await selectReferralSource(page, whiteLabels.co.referralSource);
    await clickContinueButton(page);
    await verifyCurrentUrl(page, URL_PATTERNS.ADDITIONAL_INFO);

    await clickContinueButton(page);
    await verifyCurrentUrl(page, URL_PATTERNS.CONFIRM_INFORMATION);

    await clickContinueButton(page);
    await verifyCurrentUrl(page, URL_PATTERNS.RESULTS);

    await page.locator('.results-header').waitFor({ state: 'visible' });
    await expect(page.locator('.results-header .results-header-programs-count-text')).toHaveText(
      whiteLabels.co.expectedResult.programsCount,
    );
    await expect(page.locator('.results-header .results-data-cell').first()).toHaveText(
      whiteLabels.co.expectedResult.estimatedMonthlySavings,
    );
    await expect(page.locator('.results-header .results-data-cell').last()).toHaveText(
      whiteLabels.co.expectedResult.annualTaxCredit,
    );
  });

  test.skip('MA white label', async ({ page }) => {
    await navigateHomePage(page);
    await clickGetStartedButton(page);
    await verifyCurrentUrl(page, URL_PATTERNS.SELECT_STATE);

    await selectState(page, whiteLabels.ma.state);
    await clickContinueButton(page);
    await verifyCurrentUrl(page, URL_PATTERNS.DISCLAIMER);

    await acceptDisclaimer(page);
    await clickContinueButton(page);
    await verifyCurrentUrl(page, URL_PATTERNS.LOCATION_INFO);

    await fillZipCode(page, whiteLabels.ma.zipcode);
    await selectCounty(page, whiteLabels.ma.county);
    await clickContinueButton(page);
    await verifyCurrentUrl(page, URL_PATTERNS.HOUSEHOLD_SIZE);

    await fillHouseholdSize(page, 1);
    await clickContinueButton(page);
    await verifyCurrentUrl(page, URL_PATTERNS.HOUSEHOLD_MEMBER);

    await fillDateOfBirth(page, whiteLabels.ma.dobMonth, whiteLabels.ma.dobYear);
    await selectInsurance(page, whiteLabels.ma.insurance);
    await clickContinueButton(page);
    await verifyCurrentUrl(page, URL_PATTERNS.EXPENSES);

    await clickContinueButton(page);
    await verifyCurrentUrl(page, URL_PATTERNS.ASSETS);

    await clickContinueButton(page);
    await verifyCurrentUrl(page, URL_PATTERNS.PUBLIC_BENEFITS);

    await clickContinueButton(page);
    await verifyCurrentUrl(page, URL_PATTERNS.NEEDS);

    await selectNearTernNeeds(page, whiteLabels.ma.nearTernNeeds);
    await clickContinueButton(page);
    await verifyCurrentUrl(page, URL_PATTERNS.REFERRAL_SOURCE);

    await selectReferralSource(page, whiteLabels.ma.referralSource);
    await clickContinueButton(page);
    await verifyCurrentUrl(page, URL_PATTERNS.ADDITIONAL_INFO);

    await clickContinueButton(page);
    await verifyCurrentUrl(page, URL_PATTERNS.CONFIRM_INFORMATION);

    await clickContinueButton(page);
    await verifyCurrentUrl(page, URL_PATTERNS.RESULTS);

    await page.locator('.results-header').waitFor({ state: 'visible' });
    await expect(page.locator('.results-header .results-header-programs-count-text')).toHaveText(
      whiteLabels.ma.expectedResult.programsCount,
    );
    await expect(page.locator('.results-header .results-data-cell').first()).toHaveText(
      whiteLabels.ma.expectedResult.estimatedMonthlySavings,
    );
    await expect(page.locator('.results-header .results-data-cell').last()).toHaveText(
      whiteLabels.ma.expectedResult.annualTaxCredit,
    );
  });

  test('Energy Calculator White label', async ({ page }) => {
    await navigateHomePage(page, 'energy-calculator');
    await selectOwnerOrRenter(page, whiteLabels.energyCalculator.ownerOrRenter);
    await clickGetStartedButton(page);
    await expect(page).toHaveURL('/co_energy_calculator/step-2?path=renter');

    await acceptDisclaimer(page);
    await clickContinueButton(page);
    await expect(page).toHaveURL(/\/co_energy_calculator\/.*\/step-3/);

    await selectUtility(page, whiteLabels.energyCalculator.utility);
    await clickContinueButton(page);
    await expect(page).toHaveURL(/\/co_energy_calculator\/.*\/step-4/);

    await fillZipCode(page, whiteLabels.energyCalculator.zipcode);
    await selectCounty(page, whiteLabels.energyCalculator.county);
    await clickContinueButton(page);
    await expect(page).toHaveURL(/\/co_energy_calculator\/.*\/step-5/);

    await fillHouseholdSize(page, 1);
    await clickContinueButton(page);
    await expect(page).toHaveURL(/\/co_energy_calculator\/.*\/step-6/);

    await fillDateOfBirth(page, whiteLabels.energyCalculator.dobMonth, whiteLabels.energyCalculator.dobYear);
    await selectStatus(page, whiteLabels.energyCalculator.status);
    await clickContinueButton(page);
    await expect(page).toHaveURL(/\/co_energy_calculator\/.*\/step-7/);

    await selectElectricProvider(page, whiteLabels.energyCalculator.electricProvider);
    await clickContinueButton(page);
    await expect(page).toHaveURL(/\/co_energy_calculator\/.*\/step-8/);

    await selectHeatingSource(page, whiteLabels.energyCalculator.heatingSource);
    await clickContinueButton(page);
    await expect(page).toHaveURL(/\/co_energy_calculator\/.*\/step-9/);

    await selectHouseholdInfo(page, whiteLabels.energyCalculator.householdInfo);
    await clickContinueButton(page);
    await expect(page).toHaveURL(/\/co_energy_calculator\/.*\/step-10/);

    await selectNoBenefit(page);
    await clickContinueButton(page);
    await expect(page).toHaveURL(/\/co_energy_calculator\/.*\/confirm-information/);

    await clickContinueButton(page);
    await expect(page).toHaveURL(/\/co_energy_calculator\/.*\/results\/benefits/);

    await page.locator('header.energy-calculator-results-header').waitFor({ state: 'visible' });
    await expect(page.locator('header.energy-calculator-results-header')).toHaveText(
      whiteLabels.energyCalculator.expectedResult.programsCount,
    );
  });
});
