import { Page } from '@playwright/test';

export async function selectOwnerOrRenter(page: Page, type: string) {
  await page.getByRole('link', { name: type }).click();
}

export async function selectUtility(page: Page, utilityType: string) {
  await page.getByRole('button', { name: utilityType }).click();
}

export async function selectStatus(page: Page, statusType: string) {
  await page.getByRole('button', { name: statusType }).click();
}

export async function selectElectricProvider(page: Page, provider: string) {
  await page.locator('form div').filter({ hasText: 'Electric ProviderElectric' }).getByRole('button').click();
  await page.getByRole('option', { name: provider }).click();
}

export async function selectHeatingSource(page: Page, heatingSource: string) {
  await page.locator('form div').filter({ hasText: 'Heating SourceHeating Source' }).getByRole('button').click();
  await page.getByRole('option', { name: heatingSource }).click();
}

export async function selectHouseholdInfo(page: Page, householdInfo: string) {
  await page.getByRole('button', { name: householdInfo }).click();
}

export async function selectNoBenefit(page: Page) {
  await page.getByRole('radio', { name: 'No', exact: true }).check();
}
