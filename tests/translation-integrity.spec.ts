import { test, expect } from '@playwright/test';
import { collectAllPageTexts, collectPageTexts, type PageTexts } from './utils/page-text-collector';
import { translateTextsToSpanish } from './utils/translations-map';

test.describe('Translation Integrity Tests', () => {
  test('Spanish translation validation through application flow', async ({ page }) => {
    // Prevent Google Translate from initializing
    await page.addInitScript(() => {
      Object.defineProperty(window, 'google', {
        get: () => undefined,
        configurable: true
      });
    });

    // Define the steps for collecting English text
    const steps = [
      {
        url: '/',
        actions: [
          async (page) => await page.getByRole('button', { name: 'Get Started' }).click()
        ]
      },
      {
        url: '/select-state',
        actions: [
          async (page) => {
            await page.locator('#state-source-select').click();
            await page.getByRole('option', { name: 'North Carolina' }).click();
            await page.getByRole('button', { name: 'Continue' }).click();
          }
        ]
      },
      {
        url: '/nc/step-2',
        actions: [
          async (page) => {
            await page.getByRole('checkbox', { name: 'By proceeding, you confirm' }).check();
            await page.getByRole('checkbox', { name: 'I confirm I am 13 years of' }).check();
            await page.getByRole('button', { name: 'Continue' }).click();
          }
        ]
      },
      {
        url: /\/nc\/.*\/step-3/,
        actions: [
          async (page) => {
            await page.getByRole('textbox', { name: 'Zip Code' }).fill('27704');
            await page.locator('#county-source-select').click();
            await page.getByRole('option', { name: 'Durham County' }).click();
            await page.getByRole('button', { name: 'Continue' }).click();
          }
        ]
      },
      {
        url: /\/nc\/.*\/step-4/,
        actions: [
          async (page) => {
            await page.getByRole('textbox', { name: 'Household Size' }).fill('2');
            await page.getByRole('button', { name: 'Continue' }).click();
          }
        ]
      },
      {
        url: /\/nc\/.*\/step-5/,
        actions: [
          async (page) => {
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
            await page.getByRole('textbox', { name: 'Amount' }).fill('2200');
            await page.getByRole('button', { name: 'Continue' }).click();
          }
        ]
      },
      {
        url: /\/nc\/.*\/step-5/,
        actions: [
          async (page) => {
            await page.getByRole('button', { name: 'Birth Month' }).click();
            await page.getByRole('option', { name: 'February' }).click();
            await page.getByRole('button', { name: 'Open' }).click();
            await page.getByRole('option', { name: '2020' }).click();
            await page.locator('#relationship-to-hh-select').click();
            await page.getByRole('option', { name: 'Child', exact: true }).click();
            await page.getByRole('button', { name: "They don't have or know if" }).click();
            await page.getByRole('button', { name: 'Continue' }).click();
          }
        ]
      },
      {
        url: /\/nc\/.*\/step-6/,
        actions: [
          async (page) => {
            await page.getByRole('radio', { name: 'Yes' }).check();
            await page.getByRole('button', { name: 'Expense Type' }).click();
            await page.getByRole('option', { name: 'Rent' }).click();
            await page.getByRole('textbox', { name: 'Amount' }).fill('2500');
            await page.getByRole('button', { name: 'Continue' }).click();
          }
        ]
      },
      {
        url: /\/nc\/.*\/step-7/,
        actions: [
          async (page) => {
            await page.getByRole('textbox', { name: 'Dollar Amount' }).fill('1000');
            await page.getByRole('button', { name: 'Continue' }).click();
          }
        ]
      },
      {
        url: /\/nc\/.*\/step-8/,
        actions: [
          async (page) => await page.getByRole('button', { name: 'Continue' }).click()
        ]
      },
      {
        url: /\/nc\/.*\/step-9/,
        actions: [
          async (page) => {
            await page.getByRole('button', { name: 'Food or groceries' }).click();
            await page.getByRole('button', { name: "Concern about your child's" }).click();
            await page.getByRole('button', { name: 'Free or low-cost help with' }).click();
            await page.getByRole('button', { name: 'Continue' }).click();
          }
        ]
      },
      {
        url: /\/nc\/.*\/step-10/,
        actions: [
          async (page) => {
            await page.locator('#referral-source-select').click();
            await page.getByRole('option', { name: 'Test / Prospective Partner' }).click();
            await page.getByRole('button', { name: 'Continue' }).click();
          }
        ]
      },
      {
        url: /\/nc\/.*\/step-11/,
        actions: [
          async (page) => await page.getByRole('button', { name: 'Continue' }).click()
        ]
      },
      {
        url: /\/nc\/.*\/confirm-information/,
        actions: [
          async (page) => await page.getByRole('button', { name: 'Continue' }).click()
        ]
      },
      {
        url: /\/nc\/.*\/results\/benefits/,
        actions: [
          async (page) => await page.getByRole('button', { name: 'save my results' }).click()
        ]
      }
    ];

    // First collect English text from all pages
    const englishTexts = await collectAllPageTexts(page, steps);

    // Convert English texts to expected Spanish translations
    const expectedSpanishTexts = translateTextsToSpanish(englishTexts);

    // Restart the flow in Spanish
    await page.goto('/');
    
    // Wait for and verify language selector exists
    const languageSelector = page.locator('#language-select');
    await languageSelector.waitFor({ state: 'visible', timeout: 10000 });
    console.log('Language selector found');
    
    // Change language and wait for change
    await languageSelector.click();
    await page.getByRole('option', { name: 'Español' }).click();
    
    // Wait for HTML lang attribute to change
    await expect(page.locator('html')).toHaveAttribute('lang', 'es', { timeout: 10000 });
    console.log('Language changed to Spanish');
    
    // Wait for and verify the Spanish button exists
    const spanishButton = page.getByRole('button', { name: /comenzar/i }); // Case insensitive
    await spanishButton.waitFor({ state: 'visible', timeout: 10000 });
    console.log('Spanish button found');

    const steps2 = [
      {
        url: '/',
        actions: [
          async (page) => await page.getByRole('button', { name: /comenzar/i }).click()
        ]
      },
      {
        url: '/select-state',
        actions: [
          async (page) => {
            await page.locator('#state-source-select').click();
            await page.getByRole('option', { name: 'North Carolina' }).click();
            await page.getByRole('button', { name: 'Continuar' }).click();
          }
        ]
      },
      {
        url: '/nc/step-2',
        actions: [
          async (page) => {
            await page.getByRole('checkbox', { name: 'By proceeding, you confirm' }).check();
            await page.getByRole('checkbox', { name: 'Yo confirmo que tengo 13 años de edad o más.' }).check();
            await page.getByRole('button', { name: 'Continuar' }).click();
          }
        ]
      },
      {
        url: /\/nc\/.*\/step-3/,
        actions: [
          async (page) => {
            await page.getByRole('textbox', { name: 'Código postal' }).fill('27704');
            await page.locator('#county-source-select').click();
            await page.getByRole('option', { name: 'Durham Condado' }).click();
            await page.getByRole('button', { name: 'Continuar' }).click();
          }
        ]
      },
      {
        url: /\/nc\/.*\/step-4/,
        actions: [
          async (page) => {
            await page.getByRole('textbox', { name: 'Número de integrantes del hogar' }).fill('2');
            await page.getByRole('button', { name: 'CONTINUAR' }).click();
          }
        ]
      },
      {
        url: /\/nc\/.*\/step-5/,
        actions: [
          async (page) => {
            await page.getByRole('button', { name: 'Mes de nacimiento' }).click();
            await page.getByRole('option', { name: 'Marzo' }).click();
            await page.getByRole('button', { name: 'Abrir' }).click();
            await page.getByRole('option', { name: '1990' }).click();
            await page.getByRole('button', { name: "No tengo o no sé si tengo" }).click();
            await page.getByRole('radio', { name: 'Sí' }).check();
            await page.getByRole('button', { name: 'Tipo de ingreso' }).click();
            await page.getByRole('option', { name: 'Wages, salaries, tips' }).click();
            await page.getByRole('button', { name: 'Frequency' }).click();
            await page.getByRole('option', { name: 'cada mes' }).click();
            await page.getByRole('textbox', { name: 'Cantidad' }).fill('2200');
            await page.getByRole('button', { name: 'Continuar' }).click();
          }
        ]
      },
      {
        url: /\/nc\/.*\/step-5/,
        actions: [
          async (page) => {
            await page.getByRole('button', { name: 'Mes de nacimiento' }).click();
            await page.getByRole('option', { name: 'Febrero' }).click();
            await page.getByRole('button', { name: 'Abrir' }).click();
            await page.getByRole('option', { name: '2020' }).click();
            await page.locator('#relationship-to-hh-select').click();
            await page.getByRole('option', { name: 'Hijo/a', exact: true }).click();
            await page.getByRole('button', { name: "No tienen o no saben si tienen" }).click();
            await page.getByRole('button', { name: 'Continuar' }).click();
          }
        ]
      },
      {
        url: /\/nc\/.*\/step-6/,
        actions: [
          async (page) => {
            await page.getByRole('radio', { name: 'Sí' }).check();
            await page.getByRole('button', { name: 'Tipo de gasto' }).click();
            await page.getByRole('option', { name: 'Alquiler' }).click();
            await page.getByRole('textbox', { name: 'Cantidad' }).fill('2500');
            await page.getByRole('button', { name: 'Continuar' }).click();
          }
        ]
      },
      {
        url: /\/nc\/.*\/step-7/,
        actions: [
          async (page) => {
            await page.getByRole('textbox', { name: 'Cantidad en dólares' }).fill('1000');
            await page.getByRole('button', { name: 'Continuar' }).click();
          }
        ]
      },
      {
        url: /\/nc\/.*\/step-8/,
        actions: [
          async (page) => await page.getByRole('button', { name: 'Continuar' }).click()
        ]
      },
      {
        url: /\/nc\/.*\/step-9/,
        actions: [
          async (page) => {
            await page.getByRole('button', { name: 'Alimentos o comestibles' }).click();
            await page.getByRole('button', { name: "Preocupación por su hijo/a" }).click();
            await page.getByRole('button', { name: 'Ayuda gratuita o de bajo costo con' }).click();
            await page.getByRole('button', { name: 'Continuar' }).click();
          }
        ]
      },
      {
        url: /\/nc\/.*\/step-10/,
        actions: [
          async (page) => {
            await page.locator('#referral-source-select').click();
            await page.getByRole('option', { name: 'Prueba / Socio Potencial' }).click();
            await page.getByRole('button', { name: 'Continuar' }).click();
          }
        ]
      },
      {
        url: /\/nc\/.*\/step-11/,
        actions: [
          async (page) => await page.getByRole('button', { name: 'Continuar' }).click()
        ]
      },
      {
        url: /\/nc\/.*\/confirm-information/,
        actions: [
          async (page) => await page.getByRole('button', { name: 'Continuar' }).click()
        ]
      },
      {
        url: /\/nc\/.*\/results\/benefits/,
        actions: [
          async (page) => await page.getByRole('button', { name: 'guardar mis resultados' }).click()
        ]
      }
    ];
    // Collect actual Spanish texts using the same steps
    const actualSpanishTexts = await collectAllPageTexts(page, steps2);

    // Compare actual Spanish texts with expected translations
    for (const [url, expectedTexts] of Object.entries(expectedSpanishTexts)) {
      const actualTexts = actualSpanishTexts[url] || [];
      
      // Create sets for comparison (ignoring order)
      const expectedSet = new Set(expectedTexts);
      const actualSet = new Set(actualTexts);

      // Find missing translations
      const missingTranslations = expectedTexts.filter(text => !actualSet.has(text));
      if (missingTranslations.length > 0) {
        console.log(`Missing translations at ${url}:`, missingTranslations);
      }

      // Find unexpected translations
      const unexpectedTranslations = actualTexts.filter(text => !expectedSet.has(text));
      if (unexpectedTranslations.length > 0) {
        console.log(`Unexpected translations at ${url}:`, unexpectedTranslations);
      }

      // Verify translations match
      expect(actualSet, `Translation mismatch at ${url}`).toEqual(expectedSet);

      // Verify no English text remains
      // const bodyText = await page.textContent('body');
      // if (bodyText) {
      //   for (const englishText of Object.keys(englishToSpanishTranslations)) {
      //     expect(bodyText).not.toContain(englishText);
      //   }
      //   // Verify Google Translate is not active
      //   expect(bodyText).not.toContain('Mayonesa'); // Ensure "Mayo" is not incorrectly translated
      // }

      // Additional verification that Google Translate widget is not present
      // const googleTranslateElement = await page.$('#google_translate_element');
      // expect(googleTranslateElement).toBeNull();
    }
  });
});
