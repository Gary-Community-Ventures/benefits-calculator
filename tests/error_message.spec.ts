import { test } from '@playwright/test';
import {
  navigateToHomePage,
  verifyCurrentUrl,
  clickGetStarted,
  verifyPageLoaded,
  verifyLanguageSelectorVisible,
  verifyButtonVisible,
  clickContinue,
  completeStateSelection,
  completeDisclaimer,
  fillTextField,
  FORM_INPUTS,
  selectDropdownOption,
  completeHouseholdSize,
  selectDate,
  selectRadio,
  DROPDOWN,
  selectIncomeType,
  selectFrequency,
  selectExpenseType,
  completeNeeds,
  checkCheckbox,
} from './helpers';

import { URL_PATTERNS, STATES } from './helpers/utils/constants';
import { clickGetStartedButton } from './helpers/steps';

// run and tune this test
// define a user data
// update comments
// clean up
// format


test.describe('Error Message', () => {
  // Set a longer timeout for this test to avoid issues with UI interactions
  test.setTimeout(120000); // 2 minutes

  test('error message', async ({ page }) => {

    // Navigate to homepage
    await navigateToHomePage(page);

    const question = page.locator('h2.question-label');
    
    // expect language page
    await expect(question).toContainText('preferred language');

    // await clickGetStarted(page);
    await clickGetStartedButton(page);

    // expect language page
    await expect(question).toHaveText('What is your state?');
    await verifyCurrentUrl(page, URL_PATTERNS.SELECT_STATE);

    await clickContinue(page);
    
    // verify state error message 
    await expect(page.locator('span.error-message')).toHaveText('Please select a state');
    await completeStateSelection(page, STATES.NORTH_CAROLINA);


    // verify legal
    const legalHeader = page.locator('h1.sub-header');
    await expect(legalHeader).toHaveText('What you should know:');
    await verifyCurrentUrl(page, URL_PATTERNS.DISCLAIMER);
    
    await clickContinue(page);

    const disclamerErrorMessage = page.locator('span.error-message', { hasText: 'Please select a state' });
    await expect(disclamerErrorMessage).toHaveCount(2);

    await completeDisclaimer(page);

    // verify zip and county
    await expect(question).toHaveText('What is your zip code?');
    await verifyCurrentUrl(page, URL_PATTERNS.LOCATION_INFO);

    await clickContinue(page);

    await expect(page.locator('span.error-message')).toHaveText('Please enter a valid zip code for North Carolina');
    await fillTextField(page, FORM_INPUTS.ZIP_CODE.name, '27708');

    await expect(page.locator('span.error-message')).toHaveText('Please Select a county');
    await selectDropdownOption(page, FORM_INPUTS.COUNTY_SELECT, 'Durham County');

    await clickContinue(page);

    // verify number of household
    await expect(question).toContainText('how many people are in your household?');
    
    await clickContinue(page);
    
    await expect(page.locator('span.error-helper-text')).toHaveText('Please enter the number of people in your household (max. 8)');
    
    await completeHouseholdSize(page, '1');
    
    await verifyCurrentUrl(page, URL_PATTERNS.HOUSEHOLD_SIZE);

    // verify household member
    const memberHeader = page.locator('h1.sub-header');
    await expect(memberHeader).toHaveText('Tell us about yourself.');
    await verifyCurrentUrl(page, URL_PATTERNS.HOUSEHOLD_MEMBER);

    await clickContinue(page);

    await expect(page.locator('span.error-message')).toHaveText('Please enter a birth month.');
    await expect(page.locator('span.error-message')).toHaveText('Please enter a birth year.');
    await expect(page.locator('span.error-message')).toHaveText('Please select at least one health insurance option.');

    await selectDate(page, 'January', '1989');

    const healthInsuranceButtonLocator = page.getByRole('button', { name: "I don't have or know if I" });
    await healthInsuranceButtonLocator.click();

    await selectRadio(page, FORM_INPUTS.YES_RADIO.name);

    await clickContinue(page);

    await expect(page.locator('span.error-message')).toHaveText('Please select an income type');
    await expect(page.locator('span.error-message')).toHaveText('Please select a frequency');
    await expect(page.locator('span.error-message')).toHaveText('Please enter a number greater than 0');

    await selectRadio(page, FORM_INPUTS.YES_RADIO.name);

    // Wait for dropdown triggers to be visible before calling helpers
    await selectIncomeType(page, 'Wages, salaries, tips');
    await selectFrequency(page, 'every month');
    await fillTextField(page, FORM_INPUTS.AMOUNT.name, '2000');

    await clickContinue(page);

    // verify expenses
    const expenseQuestion = page.locator('div.expenses-q-and-help-button');
    await expect(expenseQuestion).toHaveText('Does your household have any expenses?');

    await verifyCurrentUrl(page, URL_PATTERNS.EXPENSES);

    await selectRadio(page, FORM_INPUTS.YES_RADIO.name);

    await clickContinue(page);

    await expect(page.locator('span.error-message')).toHaveText('Please select an expense type');
    await expect(page.locator('span.error-message')).toHaveText('Please enter a number greater than 0');

    await selectExpenseType(page, 'Rent');
    await fillTextField(page, FORM_INPUTS.AMOUNT.name, '900');

    await clickContinue(page);

    // verify assets step
    await expect(question).toContainText('How much does your whole household have right now in cash');
    await verifyCurrentUrl(page, URL_PATTERNS.ASSETS);

    await clickContinue(page);

    // verify current benefits
    await expect(question).toHaveText('Does your household currently have any benefits?');
    await selectRadio(page, FORM_INPUTS.YES_RADIO.name);
    await verifyCurrentUrl(page, URL_PATTERNS.PUBLIC_BENEFITS); 

    await clickContinue(page);

    await expect(page.locator('span.error-message')).toHaveText('If your household does not receive any of these benefits, please select the "No" option above.');
    
    await selectRadio(page, 'No');

    await clickContinue(page);
    
    // verify near term
    await expect(question).toHaveText('Do you want / need information on any of the following resources?'); 
    await verifyCurrentUrl(page, URL_PATTERNS.NEEDS);
    
    await completeNeeds(page, ['Food or groceries']);

    await clickContinue(page);

    // verify referral
    await expect(question).toHaveText('How did you hear about MyFriendBen?'); 
    await verifyCurrentUrl(page, URL_PATTERNS.REFERRAL_SOURCE); 

    await clickContinue(page);

    await expect(page.locator('span.error-message')).toHaveText('Please select a referral source.');

    await selectDropdownOption(page, FORM_INPUTS.REFERRAL_SOURCE_SELECT, 'Test / Prospective Partner');

    await clickContinue(page);

    // verify sign up page
    await expect(question).toHaveText('OPTIONAL: Would you like us to contact you about either of the following?');
    
    await verifyCurrentUrl(page, URL_PATTERNS.ADDITIONAL_INFO);
    
    await checkCheckbox(page, FORM_INPUTS.SIGNUP_CHECKBOX_1.name);
    await checkCheckbox(page, FORM_INPUTS.SIGNUP_CHECKBOX_2.name);

    await clickContinue(page);

    await expect(page.locator('span.error-message')).toHaveText('Please enter your first name');
    await expect(page.locator('span.error-message')).toHaveText('Please enter your last name');
    // await expect(page.locator('span.error-message')).toHaveText('Please enter an email or phone number');
    // await expect(page.locator('span.error-message')).toHaveText('Please enter an email or phone number');
    const emailOrCellErrorMessage = page.locator('span.error-message', { hasText: 'Please enter an email or phone number' });
    await expect(emailOrCellErrorMessage).toHaveCount(2);

    await checkCheckbox(page, FORM_INPUTS.SIGNUP_CHECKBOX_1.name); // uncheck ??
    await checkCheckbox(page, FORM_INPUTS.SIGNUP_CHECKBOX_2.name); 

    await clickContinue(page);

    // verify confirmation page
    const confirmHeader = page.locator('h1.sub-header');
    await expect(confirmHeader).toHaveText('Is all of your information correct?');
    await verifyCurrentUrl(page, URL_PATTERNS.CONFIRM_INFORMATION);

    await clickContinue(page);

    // verify results page
    await expect(page.locator('.results-header .results-header-programs-count-text')).toContainText('Programs Found');
    await verifyCurrentUrl(page, URL_PATTERNS.RESULTS);

    const monthlyEstimate = page.locator('div.results-header-label');
    await expect(monthlyEstimate).toHaveText('Estimated Monthly Savings');

    const annualEstimate = page.locator('div.results-header-label');
    await expect(annualEstimate).toHaveText('Annual Tax Credit');
  });
});
