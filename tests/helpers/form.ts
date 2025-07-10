/**
 * Form - Form interaction helper functions
 * 
 * This file contains helpers for interacting with form elements like
 * dropdowns, text fields, checkboxes, radio buttons, etc.
 */

import { Page, expect } from '@playwright/test';
import { OPTION } from './selectors';

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
  const isCI = process.env.CI === 'true';
  const renderTimeout = isCI ? 20000 : 10000;   // listbox visible
  const optionTimeout  = isCI ? 20000 : 10000;   // option visible

  /* -------------------- MONTH -------------------- */
  const monthBtn = page.getByRole('button', { name: 'Birth Month' });
  await monthBtn.waitFor({ state: 'visible', timeout: renderTimeout });
  await monthBtn.click();

  // Wait until the MUI listbox (role=listbox) is rendered and contains 12 options
  const monthListbox = page.locator('[role="listbox"]');
  await expect(monthListbox).toBeVisible({ timeout: renderTimeout });
  // Wait until at least one month option appears (12 expected eventually, but be tolerant)
  await monthListbox.locator('[role="option"]').first().waitFor({ state: 'visible', timeout: renderTimeout });

  // Click the desired month option
  await monthListbox.locator('[role="option"]', { hasText: month }).first().click({ timeout: optionTimeout, force: true });

  /* -------------------- YEAR -------------------- */
  const yearBtn = page.getByRole('button', { name: 'Open' });
  await yearBtn.waitFor({ state: 'visible', timeout: renderTimeout });
  await yearBtn.click();

  const yearListbox = page.locator('[role="listbox"]');
  await expect(yearListbox).toBeVisible({ timeout: renderTimeout });
  // Wait until at least one year option exists
  await yearListbox.locator('[role="option"]').first().waitFor({ state: 'visible', timeout: renderTimeout });

  await yearListbox.locator('[role="option"]', { hasText: year }).first().click({ timeout: optionTimeout, force: true });
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
