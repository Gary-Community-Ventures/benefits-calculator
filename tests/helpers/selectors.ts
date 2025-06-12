/**
 * Selectors - Common selectors used across the application tests
 * 
 * This file contains reusable selectors for common UI elements to ensure
 * consistency across tests and make maintenance easier if selectors change.
 */

/**
 * Navigation and button selectors
 */
export const BUTTONS = {
  CONTINUE: { role: 'button' as const, name: 'Continue' },
  GET_STARTED: { role: 'button' as const, name: /get started/i },
  SAVE_RESULTS: { role: 'button' as const, name: 'save my results' },
};

/**
 * Form input selectors
 */
export const FORM_INPUTS = {
  // Dropdowns
  STATE_SELECT: '#state-source-select',
  COUNTY_SELECT: '#county-source-select',
  REFERRAL_SOURCE_SELECT: '#referral-source-select',
  RELATIONSHIP_SELECT: '#relationship-to-hh-select',

  // Text inputs
  ZIP_CODE: { role: 'textbox' as const, name: 'Zip Code' },
  HOUSEHOLD_SIZE: { role: 'textbox' as const, name: 'Household Size' },
  AMOUNT: { role: 'textbox' as const, name: 'Amount' },
  DOLLAR_AMOUNT: { role: 'textbox' as const, name: 'Dollar Amount' },

  // Checkboxes
  DISCLAIMER_CHECKBOX_1: { role: 'checkbox' as const, name: 'By proceeding, you confirm' },
  DISCLAIMER_CHECKBOX_2: { role: 'checkbox' as const, name: 'I confirm I am 13 years of' },

  // Radio buttons
  YES_RADIO: { role: 'radio' as const, name: 'Yes' },
  
  // Date selectors
  BIRTH_MONTH: { role: 'button' as const, name: 'Birth Month' },
  YEAR_SELECTOR: { role: 'button' as const, name: 'Open' },
};

/**
 * Language selector - uses multiple possible selectors
 */
export const LANGUAGE_SELECTOR = 'select, [aria-label*="language"], [data-testid*="language"]';

/**
 * Common option selectors
 */
export const OPTION = {
  byName: (name: string) => ({ role: 'option' as const, name }),
};

/**
 * Common dropdown button selectors
 */
export const DROPDOWN = {
  INCOME_TYPE: { role: 'button' as const, name: 'Income Type' },
  EXPENSE_TYPE: { role: 'button' as const, name: 'Expense Type' },
  FREQUENCY: { role: 'button' as const, name: 'Frequency' },
};
