import { test, expect } from '@playwright/test';

test.describe('Google Translate Prevention Tests', () => {
  test('verify HTML language attributes and translation prevention', async ({ page }) => {
    
    await page.goto('/');
    
    // Check initial HTML attributes for English
    await expect(page.locator('html')).toHaveAttribute('lang', 'en');
    await expect(page.locator('html')).not.toHaveAttribute('translate');

    // Switch to Spanish and verify attributes
    await page.locator('#language-select').click();
    await page.getByRole('option', { name: 'Español' }).click();
    
    // Wait for language change to take effect
    await page.waitForTimeout(1000);

    // Verify Spanish language attributes
    await expect(page.locator('html')).toHaveAttribute('lang', 'es');
    await expect(page.locator('html')).toHaveAttribute('translate', 'no');   

    // Check Google Translate is not active
    const bodyHTML = await page.evaluate(() => document.body.innerHTML);
    expect(bodyHTML).not.toContain('goog-te');
    expect(bodyHTML).not.toContain('google-translate');

    // Test switching back to English
    await page.locator('#language-select').click();
    await page.getByRole('option', { name: 'English' }).click();
    
    // Verify English attributes are restored
    await expect(page.locator('html')).toHaveAttribute('lang', 'en');
    await expect(page.locator('html')).not.toHaveAttribute('translate');
  });

  test('verify language persistence across page navigation', async ({ page }) => {
    // Start in Spanish
    await page.goto('/');
    await page.locator('#language-select').click();
    await page.getByRole('option', { name: 'Español' }).click();
    
    // Verify initial Spanish setup
    await expect(page.locator('html')).toHaveAttribute('lang', 'es');
    await expect(page.locator('html')).toHaveAttribute('translate', 'no');

    // Navigate through several pages
    await page.getByRole('button', { name: 'EMPEZAR' }).click();
    await expect(page.locator('html')).toHaveAttribute('lang', 'es');
    await expect(page.locator('html')).toHaveAttribute('translate', 'no');

    await page.locator('#state-source-select').click();
    await page.getByRole('option', { name: 'North Carolina' }).click();
    await page.getByRole('button', { name: 'CONTINUAR' }).click();
    await expect(page.locator('html')).toHaveAttribute('lang', 'es');
    await expect(page.locator('html')).toHaveAttribute('translate', 'no');
  });

  test('verify Google Translate prevention with mobile user agent', async ({ browser }) => {
    // Create context with mobile user agent
    const mobileContext = await browser.newContext({
      userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_7_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.1.2 Mobile/15E148 Safari/604.1'
    });

    const page = await mobileContext.newPage();

    // Prevent Google Translate initialization
    await page.addInitScript(() => {
      Object.defineProperty(window, 'google', {
        get: () => undefined,
        configurable: true
      });
    });

    await page.goto('/');
    
    // Switch to Spanish
    await page.locator('#language-select').click();
    await page.getByRole('option', { name: 'Español' }).click();

    // Verify Spanish attributes on mobile
    await expect(page.locator('html')).toHaveAttribute('lang', 'es');
    await expect(page.locator('html')).toHaveAttribute('translate', 'no');

    // Verify no Google Translate elements exist
    const googleElements = await page.evaluate(() => {
      return {
        hasGoogTeCombo: !!document.querySelector('.goog-te-combo'),
        hasGoogElement: !!document.getElementById('google_translate_element'),
        hasGoogScript: !!document.querySelector('script[src*="translate.google.com"]')
      };
    });

    expect(googleElements.hasGoogTeCombo).toBe(false);
    expect(googleElements.hasGoogElement).toBe(false);
    expect(googleElements.hasGoogScript).toBe(false);

    await mobileContext.close();
  });
});
