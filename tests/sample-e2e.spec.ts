import { test, expect } from '@playwright/test';

/**
 * Sample screen test: end-to-end
 */
test.describe('MyFriendBen Sample Screen Test', () => {
  test('start to finish screen test', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: 'Get Started' }).click();

    await expect(page).toHaveURL('/select-state');
    await page.locator('#state-source-select').click();
    await page.getByRole('option', { name: 'North Carolina' }).click();
    await page.getByRole('button', { name: 'Continue' }).click();

    await expect(page).toHaveURL('/nc/step-2');
    await page.getByRole('checkbox', { name: 'By proceeding, you confirm' }).check();
    await page.getByRole('checkbox', { name: 'I confirm I am 13 years of' }).check();
    await page.getByRole('button', { name: 'Continue' }).click();

    // Using regular expression to match the URL with any UUID
    await expect(page).toHaveURL(/\/nc\/.*\/step-3/);
    await page.getByRole('textbox', { name: 'Zip Code' }).click();
    await page.getByRole('textbox', { name: 'Zip Code' }).fill('27704');
    await page.locator('#county-source-select').click();
    await page.getByRole('option', { name: 'Durham County' }).click();
    await page.getByRole('button', { name: 'Continue' }).click();

    await expect(page).toHaveURL(/\/nc\/.*\/step-4/);
    await page.getByRole('textbox', { name: 'Household Size' }).click();
    await page.getByRole('textbox', { name: 'Household Size' }).fill('2');
    await page.getByRole('button', { name: 'Continue' }).click();

    await expect(page).toHaveURL(/\/nc\/.*\/step-5/);
    await page.getByRole('button', { name: 'Birth Month' }).click();
    await page.getByRole('option', { name: 'March' }).click();
    await page.getByRole('button', { name: 'Open' }).click();
    await page.getByRole('option', { name: '1990' }).click();
    await page.getByRole('button', { name: "I don't have or know if I" }).click();
    await page.getByRole('radio', { name: 'Yes' }).check();
    await page.getByRole('button', { name: 'Income Type' }).click();
    await page.getByRole('option', { name: 'Wages, salaries, tips' }).click();
    await page.getByRole('button', { name: 'Frequency' }).click();
    await page.getByRole('option', { name: 'every month' }).click();
    await page.getByRole('textbox', { name: 'Amount' }).click();
    await page.getByRole('textbox', { name: 'Amount' }).fill('2200');
    await page.getByRole('button', { name: 'Continue' }).click();

    await expect(page).toHaveURL(/\/nc\/.*\/step-5/);
    await page.getByRole('button', { name: 'Birth Month' }).click();
    const febOption = page.getByRole('option', { name: 'February' });
    await febOption.waitFor({ state: 'visible' });
    await febOption.click();
    await page.getByRole('button', { name: 'Open' }).click();
    await page.getByRole('option', { name: '2020' }).click();
    await page.locator('#relationship-to-hh-select').click();
    await page.getByRole('option', { name: 'Child', exact: true }).click();
    await page.getByRole('button', { name: "They don't have or know if" }).click();
    await page.getByRole('button', { name: 'Continue' }).click();

    await expect(page).toHaveURL(/\/nc\/.*\/step-6/);
    await page.getByRole('radio', { name: 'Yes' }).check();
    await page.getByRole('button', { name: 'Expense Type' }).click();
    await page.getByRole('option', { name: 'Rent' }).click();
    await page.getByRole('textbox', { name: 'Amount' }).click();
    await page.getByRole('textbox', { name: 'Amount' }).fill('2500');
    await page.getByRole('button', { name: 'Continue' }).click();

    await expect(page).toHaveURL(/\/nc\/.*\/step-7/);
    await page.getByRole('textbox', { name: 'Dollar Amount' }).click();
    await page.getByRole('textbox', { name: 'Dollar Amount' }).fill('1000');
    await page.getByRole('button', { name: 'Continue' }).click();

    await expect(page).toHaveURL(/\/nc\/.*\/step-8/);
    await page.getByRole('button', { name: 'Continue' }).click();

    await expect(page).toHaveURL(/\/nc\/.*\/step-9/);
    await page.getByRole('button', { name: 'Food or groceries' }).click();
    await page.getByRole('button', { name: "Concern about your child's" }).click();
    await page.getByRole('button', { name: 'Free or low-cost help with' }).click();
    await page.getByRole('button', { name: 'Continue' }).click();

    await expect(page).toHaveURL(/\/nc\/.*\/step-10/);
    await page.locator('#referral-source-select').click();
    await page.getByRole('option', { name: 'Test / Prospective Partner' }).click();
    await page.getByRole('button', { name: 'Continue' }).click();

    await expect(page).toHaveURL(/\/nc\/.*\/step-11/);
    await page.getByRole('button', { name: 'Continue' }).click();

    await expect(page).toHaveURL(/\/nc\/.*\/confirm-information/);
    await page.getByRole('button', { name: 'Continue' }).click();

    await expect(page).toHaveURL(/\/nc\/.*\/results\/benefits/);
    await page.getByRole('button', { name: 'save my results' }).click();
  });
});
