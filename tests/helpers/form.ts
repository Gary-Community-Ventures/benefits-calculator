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
  // We'll use a simplified but robust approach
  try {
    // Get selectors for the buttons that open the dropdowns
    const birthMonthButton = page.getByRole('button', { name: 'Birth Month' });
    
    // 1. Select month - first make sure the button is visible and clickable
    await birthMonthButton.waitFor({ state: 'visible', timeout: 15000 });
    await birthMonthButton.click();
    await page.waitForTimeout(300); // Give dropdown time to appear
    
    // Use a more reliable way to find the month in the dropdown
    const monthOption = page.getByRole('option', { name: month, exact: true });
    await monthOption.waitFor({ state: 'visible', timeout: 5000 });
    await monthOption.click({ force: true });
    await page.waitForTimeout(300); // Wait for dropdown to close and DOM to stabilize
    
    // 2. Select year - find the year button, which has 'Open' as its accessible name
    const yearButton = page.getByRole('button', { name: 'Open' });
    await yearButton.waitFor({ state: 'visible', timeout: 15000 });
    await yearButton.click();
    await page.waitForTimeout(300); // Give dropdown time to appear
    
    // Select the year from the dropdown
    const yearOption = page.getByRole('option', { name: year, exact: true });
    await yearOption.waitFor({ state: 'visible', timeout: 5000 });
    await yearOption.click({ force: true });
    await page.waitForTimeout(300); // Wait for dropdown to close
    
  } catch (error) {
    // If our primary approach fails, try a more forceful fallback approach
    console.warn(`Date selection failed on first attempt for ${month} ${year}. Using fallback approach.`);
    
    try {
      // Try with the first button first, which should be the month
      const buttons = page.getByRole('button').filter({ hasText: /Birth Month|Open/ });
      const birthMonthButton = await buttons.first();
      await birthMonthButton.click({ force: true });
      await page.waitForTimeout(500);
      
      // Find and click month option by text content, not by role
      await page.locator(`text="${month}"`).first().click({ force: true });
      await page.waitForTimeout(500);
      
      // Now find the second button, which should be the year
      const yearButton = await buttons.nth(1);
      await yearButton.click({ force: true });
      await page.waitForTimeout(500);
      
      // Find and click year option by text content
      await page.locator(`text="${year}"`).first().click({ force: true });
      await page.waitForTimeout(500);
      
    } catch (fallbackError) {
      // If both approaches fail, throw a more helpful error
      throw new Error(`Failed to select date ${month} ${year}. Original error: ${error.message}, Fallback error: ${fallbackError.message}`);
    }
  }
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
