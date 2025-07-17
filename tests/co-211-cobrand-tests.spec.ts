import { test, expect } from '@playwright/test';
test.describe('CO 211 cobrand Test', () => {
  test.setTimeout(120000);
    test('collect and analyze text readability', async ({ page }) => {        
      const navigationSteps = [
        {
          url: '/',
          name: 'Home Page',
          action: async () => {
            await page.getByRole('button', { name: 'Get Started' }).click();
          }
        },
        {
          url: '/select-state',
          name: 'State Selection',
          action: async () => {
            await page.locator('#state-source-select').click();
            await page.getByRole('option', { name: 'North Carolina' }).click();
            await page.getByRole('button', { name: 'Continue' }).click();
          }
        },
        {
          url: '/co/step-2/?referrer=211co',
          name: 'Step 2',
          action: async () => {
            await page.getByRole('checkbox', { name: 'By proceeding, you confirm' }).check();
            await page.getByRole('checkbox', { name: 'I confirm I am 13 years of' }).check();
            await page.getByRole('button', { name: 'Continue' }).click();
          }
        },
       
      ];
      for (const step of navigationSteps) {
      // Navigate to the page if it's a direct URL      
        if (typeof step.url === 'string') {
          await page.goto(step.url);
        }
      }
    });
    test('verify header and footer links are working', async ({ page }) => {
        await page.goto('/co/step-2/?referrer=211co');
        
        // Test structure for header/footer links with more specific selectors
        const linksToTest = [
          // Only test the visible footer chat link, skip the hidden header link
          {
            name: 'Chat link (footer)',
            selector: 'a[href="https://www.211colorado.org/chat/#english"][aria-label="211 chat link"]',
            expectedUrl: 'https://www.211colorado.org/chat/#english',
            expectedText: 'Click to live chat with a 2-1-1 Navigator'
          },
          {
            name: 'Phone number',
            selector: 'a[href="tel:866-760-6489"]',
            expectedText: '(866) 760-6489'
          },
          {
            name: 'Text link',
            selector: 'a[href="sms:898211"]',
            expectedText: '898-211'
          },
          {
            name: '2.1.1',
            selector: 'a[href="https://screener.myfriendben.org/co/step-1?referrer=211co"]',
            expectedUrl: 'https://screener.myfriendben.org/co/step-1?referrer=211co',
            expectedText: '2.1.1'
          },
          {
            name: 'Terms of Service',
            selector: 'a[href="https://www.211colorado.org/terms-of-service/"]',
            expectedUrl: 'https://www.211colorado.org/terms-of-service/',
            expectedText: '2-1-1 Terms of Service'
          },
          {
            name: '211 Privacy Policy',
            selector: 'a[href="https://www.211colorado.org/privacy-policy/"]',
            expectedUrl: 'https://www.211colorado.org/privacy-policy/',
            expectedText: '2-1-1 Privacy Policy'
          }
        ];

        // Test each link
        for (const link of linksToTest) {
          const linkElement = page.locator(link.selector);
          await expect(linkElement).toBeVisible();
          await expect(linkElement).toContainText(link.expectedText);
          
          if (link.expectedUrl) {
            const [newPage] = await Promise.all([
              page.waitForEvent('popup'),
              linkElement.click()
            ]);
            await expect(newPage).toHaveURL(link.expectedUrl);
            await newPage.close();
          }
        }
  
        // Test phone number functionality
        // const phoneLink = page.locator('a[href="tel:211"]');
        // await expect(phoneLink).toBeVisible();
        // await expect(phoneLink).toHaveAttribute('href', 'tel:211');
  
        // // Verify text message link
        // const textLink = page.locator('a[href="sms:898211"]');
        // await expect(textLink).toBeVisible();
        // await expect(textLink).toHaveAttribute('href', 'sms:898211');
      });
  
      test('verify footer text content', async ({ page }) => {
        await page.goto('/co/step-2/?referrer=211co');
  
        // Verify important footer text content
        const footerTexts = [
          'Not finding what you are looking for? Try these other ways to get help:',
          'Standard message and data rates may apply.',
          '© Copyright 2-1-1 Colorado',
          'toll free'
        ];
  
        for (const text of footerTexts) {
          await expect(page.getByText(text)).toBeVisible();
        }
  
        // Verify footer paragraphs
        const footerParagraph1 = page.locator('.first-paragraph');
        await expect(footerParagraph1).toContainText('Services found within search results may involve eligibility criteria');
  
        const footerParagraph2 = page.locator('.second-paragraph');
        await expect(footerParagraph2).toContainText('2-1-1 Colorado is committed to helping Colorado citizens');
      });
  });
       