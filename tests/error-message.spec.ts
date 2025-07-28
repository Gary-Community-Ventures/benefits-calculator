import { test, expect } from '@playwright/test';
import {
  navigateToHomePage,
  verifyCurrentUrl,
  clickContinue,
  fillTextField,
  FORM_INPUTS,
  selectDropdownOption,
  selectDate,
  selectRadio,
  selectIncomeType,
  selectFrequency,
  selectExpenseType,
  checkCheckbox,
  UncheckCheckbox,
  clickGetStarted,
} from './helpers';

import { URL_PATTERNS, STATES } from './helpers/utils/constants';

// define a user data
// update comments
// clean up
// format

const userInfo = {
  state: 'North Carolina',
  zipcode: '27215',
  county: 'Alamance County',
  householdSize: 1,
  dobMonth: 'January',
  dobYear: '1989',
  insurance: "I don't have or know if I have health insurance",
  nearTernNeeds: ['Food or groceries'],
  referralSource: 'Test / Prospective Partner',
  expectedResult: {
    programsCount: '3Programs Found',
    estimatedMonthlySavings: '$813Estimated Monthly Savings',
    annualTaxCredit: '$0Annual Tax Credit',
  },
}

test.describe('Error Message', () => {
  // Set a longer timeout for this test to avoid issues with UI interactions
  // test.setTimeout(120000); // 2 minutes

  test('error message', async ({ page }) => {
    await navigateToHomePage(page);
    const question = page.locator('h2.question-label');
    await expect(question).toBeVisible();

    await expect(question).toHaveText('What is your preferred language?');
    await clickGetStarted(page);

    // Verify State page
    await expect(question).toHaveText('What is your state?');
    await verifyCurrentUrl(page, URL_PATTERNS.SELECT_STATE);

    await clickContinue(page);

    await expect(page.locator('span.error-message')).toHaveText('Please select a state');
    await selectDropdownOption(page, FORM_INPUTS.STATE_SELECT, STATES.NORTH_CAROLINA);

    await clickContinue(page);

    // Verify disclaimer page
    const legalHeader = page.locator('h1.sub-header');
    await expect(legalHeader).toHaveText('What you should know:');
    await verifyCurrentUrl(page, URL_PATTERNS.DISCLAIMER);
    
    await clickContinue(page);

    const disclaimerErrorMessage = page.locator('span.error-message', { hasText: 'Please check the box to continue.' });
    await expect(disclaimerErrorMessage).toHaveCount(2);

    await checkCheckbox(page, FORM_INPUTS.DISCLAIMER_CHECKBOX_1.name);
    await checkCheckbox(page, FORM_INPUTS.DISCLAIMER_CHECKBOX_2.name);
    await clickContinue(page);

    // Verify zip code
    await expect(question).toHaveText('What is your zip code?');
    await verifyCurrentUrl(page, URL_PATTERNS.LOCATION_INFO);

    await clickContinue(page);

    await expect(page.locator('span.error-message')).toHaveText('Please enter a valid zip code for North Carolina');
    await fillTextField(page, FORM_INPUTS.ZIP_CODE.name, '27215');

    await expect(page.locator('span.error-message')).toHaveText('Please Select a county');
    await selectDropdownOption(page, FORM_INPUTS.COUNTY_SELECT, 'Alamance County');

    await clickContinue(page);

    // Verify number of household members
    await expect(page.getByRole('heading', {
      name: 'Including you, how many people are in your household?',
    })).toBeVisible();
    await verifyCurrentUrl(page, URL_PATTERNS.HOUSEHOLD_SIZE);
    
    await clickContinue(page);
    
    await expect(page.locator('span.error-helper-text')).toHaveText('Please enter the number of people in your household (max. 8)');

    await fillTextField(page, FORM_INPUTS.HOUSEHOLD_SIZE.name, '1');

    await clickContinue(page);

    // Verify household member info
    const memberPageHeader = page.locator('h1.sub-header');
    await expect(memberPageHeader).toHaveText('Tell us about yourself.');
    await verifyCurrentUrl(page, URL_PATTERNS.HOUSEHOLD_MEMBER);

    await clickContinue(page);

    const memberErrorMessages = await page.locator('span.error-message').allTextContents();

    expect(memberErrorMessages).toEqual([
      'Please enter a birth month.',
      'Please enter a birth year.',
      'Please select at least one health insurance option.'
    ]);

    await selectDate(page, 'January', '1989');

    const healthInsuranceButtonLocator = page.getByRole('button', { name: "I don't have or know if I" });
    await healthInsuranceButtonLocator.click();

    await selectRadio(page, FORM_INPUTS.YES_RADIO.name);

    await clickContinue(page);

    const incomeErrorMessages = await page.locator('span.error-message').allTextContents();

    expect(incomeErrorMessages).toEqual([
      'Please select an income type',
      'Please select a frequency',
      'Please enter a number greater than 0'
    ]);

    await selectIncomeType(page, 'Wages, salaries, tips');
    await selectFrequency(page, 'every month');
    await fillTextField(page, FORM_INPUTS.AMOUNT.name, '2000');

    await clickContinue(page);

    // Verify expenses
    const expenseQuestion = page.locator('div.expenses-q-and-help-button');
    await expect(expenseQuestion).toContainText('Does your household have any expenses?');

    await verifyCurrentUrl(page, URL_PATTERNS.EXPENSES);

    await selectRadio(page, FORM_INPUTS.YES_RADIO.name);

    await clickContinue(page);

    const expenseErrorMessages = await page.locator('span.error-message').allTextContents();

    expect(expenseErrorMessages).toEqual([
      'Please select an expense type',
      'Please enter a number greater than 0'
    ]);

    await selectExpenseType(page, 'Rent');
    await fillTextField(page, FORM_INPUTS.AMOUNT.name, '900');

    await clickContinue(page);

    // Verify assets
    await expect(page.getByRole('heading', {
      name: 'How much does your whole household have right now in cash,',
    })).toBeVisible();
    await verifyCurrentUrl(page, URL_PATTERNS.ASSETS);

    await clickContinue(page);

    // Verify current benefits
    await expect(question).toContainText('Does your household currently have any benefits?');
    await selectRadio(page, FORM_INPUTS.YES_RADIO.name);
    await verifyCurrentUrl(page, URL_PATTERNS.PUBLIC_BENEFITS); 

    await clickContinue(page);

    await expect(page.locator('span.error-message')).toHaveText('If your household does not receive any of these benefits, please select the "No" option above.');

    await page.locator('input[type="radio"][value="false"]').check();

    await clickContinue(page);
    
    // Verify near term benefits
    await expect(question).toHaveText('Do you want / need information on any of the following resources?'); 
    await verifyCurrentUrl(page, URL_PATTERNS.NEEDS);

    await page.getByRole('button', { name: 'Food or groceries' }).click();

    await clickContinue(page);

    // Verify referral
    await expect(question).toHaveText('How did you hear about MyFriendBen?'); 
    await verifyCurrentUrl(page, URL_PATTERNS.REFERRAL_SOURCE); 

    await clickContinue(page);

    await expect(page.locator('span.error-message')).toHaveText('Please select a referral source.');

    await selectDropdownOption(page, FORM_INPUTS.REFERRAL_SOURCE_SELECT, 'Test / Prospective Partner');

    await clickContinue(page);

    // Verify sign up page
    await expect(question).toHaveText('OPTIONAL: Would you like us to contact you about either of the following?');
    await verifyCurrentUrl(page, URL_PATTERNS.ADDITIONAL_INFO);
    
    await checkCheckbox(page, FORM_INPUTS.SIGNUP_CHECKBOX_1.name);
    await checkCheckbox(page, FORM_INPUTS.SIGNUP_CHECKBOX_2.name);

    await clickContinue(page);

    const singUpErrorMessages = await page.locator('span.error-message').allTextContents();

    expect(singUpErrorMessages).toEqual([
      'Please enter your first name',
      'Please enter your last name',
      'Please enter an email or phone number',
      'Please enter an email or phone number'
    ]);

    await UncheckCheckbox(page, FORM_INPUTS.SIGNUP_CHECKBOX_1.name);
    await UncheckCheckbox(page, FORM_INPUTS.SIGNUP_CHECKBOX_2.name); 

    await clickContinue(page);

    // Verify confirmation page
    const confirmHeader = page.locator('h1.sub-header');
    await expect(confirmHeader).toHaveText('Is all of your information correct?');
    await verifyCurrentUrl(page, URL_PATTERNS.CONFIRM_INFORMATION);

    await clickContinue(page);

    // verify results page
    await expect(page.locator('.results-header .results-header-programs-count-text')).toContainText('Programs Found');
    await verifyCurrentUrl(page, URL_PATTERNS.RESULTS);

    // const monthlyEstimate = page.locator('div.results-header-label');
    // await expect(monthlyEstimate).toHaveText('Estimated Monthly Savings');

    // const annualEstimate = page.locator('div.results-header-label');
    // await expect(annualEstimate).toHaveText('Annual Tax Credit');

    const estimateMessages = await page.locator('div.results-header-label').allTextContents();
    expect(estimateMessages).toEqual([
      'Estimated Monthly Savings',
      'Annual Tax Credit'
    ]);
  });
});
