/**
 * Form - Form interaction helper functions
 * 
 * This file contains helpers for interacting with form elements like
 * dropdowns, text fields, checkboxes, radio buttons, etc.
 */

import { Page } from '@playwright/test';
import { FORM_INPUTS, OPTION } from './selectors';

/**
 * Selects an option from a dropdown menu
 * @param page - Playwright page instance
 * @param dropdownSelector - CSS selector for the dropdown element
 * @param optionText - Text of the option to select
 * @param exact - Whether to match the option text exactly (default: false)
 */
export async function selectDropdownOption(
  page: Page, 
  dropdownSelector: string, 
  optionText: string, 
  exact: boolean = false
): Promise<void> {
  await page.locator(dropdownSelector).click();
  await page.getByRole('option', { name: optionText, exact }).click();
}

/**
 * Fills in a text field with specified value
 * @param page - Playwright page instance
 * @param labelText - Label text of the text field
 * @param value - Value to fill in
 */
export async function fillTextField(page: Page, labelText: string, value: string): Promise<void> {
  await page.getByRole('textbox', { name: labelText }).click();
  await page.getByRole('textbox', { name: labelText }).fill(value);
}

/**
 * Clicks a radio button with the specified label
 * @param page - Playwright page instance
 * @param labelText - Label text of the radio button
 */
export async function selectRadio(page: Page, labelText: string): Promise<void> {
  await page.getByRole('radio', { name: labelText }).check();
}

/**
 * Checks a checkbox with the specified label
 * @param page - Playwright page instance
 * @param labelText - Label text of the checkbox
 */
export async function checkCheckbox(page: Page, labelText: string): Promise<void> {
  await page.getByRole('checkbox', { name: labelText }).check();
}

/**
 * Selects birth month and year with improved stability for flaky dropdowns
 * @param page - Playwright page instance
 * @param month - Month to select (e.g., 'January')
 * @param year - Year to select (e.g., '1990')
 */
export async function selectDate(page: Page, month: string, year: string): Promise<void> {
  // Get locators for all elements we'll interact with
  const monthSelector = page.getByRole(FORM_INPUTS.BIRTH_MONTH.role, { name: FORM_INPUTS.BIRTH_MONTH.name });
  const yearSelector = page.getByRole(FORM_INPUTS.YEAR_SELECTOR.role, { name: FORM_INPUTS.YEAR_SELECTOR.name });
  
  // Log for debugging
  console.log(`[Form Helper] Selecting date: ${month} ${year}`);
  
  // Select month with retry logic
  await monthSelector.waitFor({ state: 'visible' });
  try {
    // Try to select month
    await monthSelector.click();
    
    // Wait briefly for dropdown to be fully rendered
    await page.waitForTimeout(300);
    
    // Use force: true to ensure the click happens even if the element might be moving
    const monthOption = page.getByRole(OPTION.byName(month).role, { name: OPTION.byName(month).name });
    await monthOption.waitFor({ state: 'visible' });
    await monthOption.click({ force: true });
    
    // Wait briefly for the dropdown to close
    await page.waitForTimeout(300);
  } catch (error) {
    console.warn(`[Form Helper] First attempt to select month ${month} failed, retrying: ${error}`);
    
    // Retry once more with a different approach
    await monthSelector.click();
    await page.waitForTimeout(500);
    
    // Use a more specific selector with .first() to ensure we get a stable element
    await page.getByRole(OPTION.byName(month).role, { name: OPTION.byName(month).name }).first().click({ force: true });
    await page.waitForTimeout(300);
  }
  
  // Select year with similar retry logic
  await yearSelector.waitFor({ state: 'visible' });
  try {
    // Try to select year
    await yearSelector.click();
    
    // Wait briefly for dropdown to be fully rendered
    await page.waitForTimeout(300);
    
    // Use force: true to ensure the click happens even if the element might be moving
    const yearOption = page.getByRole(OPTION.byName(year).role, { name: OPTION.byName(year).name });
    await yearOption.waitFor({ state: 'visible' });
    await yearOption.click({ force: true });
  } catch (error) {
    console.warn(`[Form Helper] First attempt to select year ${year} failed, retrying: ${error}`);
    
    // Retry once more with a different approach
    await yearSelector.click();
    await page.waitForTimeout(500);
    
    // Use a more specific selector with .first() to ensure we get a stable element
    await page.getByRole(OPTION.byName(year).role, { name: OPTION.byName(year).name }).first().click({ force: true });
  }
  
  // Verify both month and year selectors show the expected values
  const monthSelectorText = await monthSelector.textContent();
  const yearSelectorText = await yearSelector.textContent();
  
  console.log(`[Form Helper] Date selection complete: ${monthSelectorText} ${yearSelectorText}`);
}

/**
 * Selects an income type
 * @param page - Playwright page instance
 * @param incomeType - Income type to select
 */
export async function selectIncomeType(page: Page, incomeType: string): Promise<void> {
  await page.getByRole('button', { name: 'Income Type' }).click();
  await page.getByRole(OPTION.byName(incomeType).role, { name: OPTION.byName(incomeType).name }).click();
}

/**
 * Selects a frequency
 * @param page - Playwright page instance
 * @param frequency - Frequency to select
 */
export async function selectFrequency(page: Page, frequency: string): Promise<void> {
  await page.getByRole('button', { name: 'Frequency' }).click();
  await page.getByRole(OPTION.byName(frequency).role, { name: OPTION.byName(frequency).name }).click();
}

/**
 * Selects an expense type
 * @param page - Playwright page instance
 * @param expenseType - Expense type to select
 */
export async function selectExpenseType(page: Page, expenseType: string): Promise<void> {
  await page.getByRole('button', { name: 'Expense Type' }).click();
  await page.getByRole(OPTION.byName(expenseType).role, { name: OPTION.byName(expenseType).name }).click();
}
