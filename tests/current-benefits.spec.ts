import { test, expect } from '@playwright/test';

/**
 * Test for current-benefits pages across all white-label instances
 */

const whiteLabels = [
  { name: 'North Carolina', path: 'nc' },
  { name: 'Colorado', path: 'co' },
  { name: 'Massachusetts', path: 'ma' },
  { name: 'Colorado Energy Calculators', path: 'co_energy_calculator' }
];

test.describe('Current Benefits Pages Test', () => {
  for (const whiteLabel of whiteLabels) {
    test(`${whiteLabel.name} current-benefits page loads without [PLACEHOLDER] text or untranslated labels`, async ({ page }) => {
      const url = `/${whiteLabel.path}/current-benefits`;

      await test.step(`Navigate to ${url}`, async () => {
        await page.goto(url);
        await expect(page).toHaveURL(new RegExp(`${whiteLabel.path}/current-benefits`));
      });
      await test.step('Check for [PLACEHOLDER] text and untranslated labels', async () => {
        /*
        * Wait for the page to fully load with the use of 
        * 'networkidle': waits for all network requests to finish.
        */
        await page.waitForLoadState('networkidle');
        const visibleText = await page.evaluate(() => {
          return document.body.innerText;
        });

        const foundUntranslatedLabels: string[] = [];

        const placeholderRegex = /\[PLACEHOLDER\]/gi;
        const foundPlaceholders = visibleText.match(placeholderRegex) || [];

        /*
        * Using 'TreeWalker' to get collect all of the
        * text nodes on the page.
        */
        const textContent = await page.evaluate(() => {
          const walker = document.createTreeWalker(
            document.body,
            NodeFilter.SHOW_TEXT,
            null
          );

          let node: Node | null;
          const textNodes: string[] = [];

          /*
          * 'walker.nextNode()' returns the next node or null
          * when it reaches the end of the document. The while loop
          * will continue to run until 'walker.nextNode()' returns
          * null.
          */
          while (node = walker.nextNode()) {
            const text = node.textContent?.trim();
            if (text && text.length > 0) {
              textNodes.push(text);
            }
          }

          return textNodes;
        });

        const untranslatedLabelPatterns = [
          /program\.[a-z0-9_-]+/,
          /program_category\.[a-z0-9_-]+/
        ];

        for (const text of textContent as string[]) {
          for (const pattern of untranslatedLabelPatterns) {
            if (pattern.test(text.trim())) {
              foundUntranslatedLabels.push(text.trim());
            }
          }
        }

        const uniqueUntranslatedLabels = [...new Set(foundUntranslatedLabels)];
        const totalIssues = foundPlaceholders.length + uniqueUntranslatedLabels.length;

        if (totalIssues > 0) {
          // Fail the test with a detailed message
          expect(totalIssues,
            `Found ${totalIssues} issues in ${whiteLabel.path}/current-benefits: ` +
            `${foundPlaceholders.length} [PLACEHOLDER], ${uniqueUntranslatedLabels.length} untranslated labels`
          ).toBe(0);
        }
      });
    });
  }
});
