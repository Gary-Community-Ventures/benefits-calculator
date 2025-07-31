# MyFriendBen

[MyFriendBen](myfriendben.org) was created by [Gary Community Ventures](https://garycommunity.org/), a Denver-based organization. We co-designed MyFriendBen with a group of Colorado families who are participating in a direct cash assistance program. Families told us it was difficult and time-consuming to know what benefits they were entitled to. We are defining “benefits” as public benefits (includes city, county, state and federal), tax credits, financial assistance, nonprofit supports and services. MyFriendBen only includes benefits and tax credits with an annual value of at least $300 or more a year.

Taking inspiration from AccessNYC, and connecting with [PolicyEngine's](https://github.com/PolicyEngine/policyengine-us) API for benefits calculation, we built out a universal benefits screener with the goal to increase benefit participation rates by making key information - like dollar value and time to apply - more transparent, accessible, and accurate. The platform is currently live in Colorado and has been tested with over 40 benefits.

This is the repository for the frontend JavaScript/React multi-step form that collects demographic information from a household that is then sent to the backend benefits API which calculates eligibility and estimated cash value. The backend repository can be accessed [here](https://github.com/Gary-Community-Ventures/benefits-api).

## Set Up Benefits-Calculator (front-end part)
*Back End already should be installed in a separate directory

Clone the project: `git clone https://github.com/Gary-Community-Ventures/benefits-calculator.git`

Install dependencies: `npm install`

#### Set environment variables:

  Create an `.env` file and add the following (available in "Frontend ENV Vars" in our 1Password Engineering vault):

  - REACT_APP_API_KEY

    - The api key for the backend

  - REACT_APP_DOMAIN_URL

    - The url for the backend. Ex: http://localhost:8000

  - REACT_APP_GOOGLE_ANALYTICS_ID [optional]

    - App id for google analytics

  Run server: `npm run dev`

  See local environment at http://localhost:3000/

## Testing

### End-to-End Testing with Playwright

This app is set up to use [Playwright](https://playwright.dev/) for end-to-end testing. Playwright allows us to automate browser interactions and verify application behavior across different browsers and devices.

#### Set test environment variables:

Create a `.env.test` file in the project root and add the following variables:
  - BASE_URL

    - The base URL for the application under test. Ex: http://localhost:3000

#### Running Tests

To run all Playwright tests:

```bash
npm run test:e2e
```

To run tests with the Playwright UI mode (interactive):

```bash
npm run test:e2e:ui
```

To run tests in visual mode (with visible browser):

```bash
npm run test:e2e:visual
```

To view the latest test report:

```bash
npm run test:e2e:report
```

#### Writing Tests

Playwright tests are located in the `tests` directory. Here's our basic smoke test:

```typescript
import { test, expect } from '@playwright/test';

test('application loads with expected elements', async ({ page }) => {
  // Navigate to the application (uses BASE_URL from .env.test)
  await page.goto('/');

  // Verify that the page has loaded
  await expect(page.locator('body')).toBeVisible();

  // Check that the URL contains 'step-1'
  await expect(page).toHaveURL(/step-1/);

  // Check for language selection dropdown
  const languageSelector = page.locator('select, [aria-label*="language"], [data-testid*="language"]');
  await expect(languageSelector).toBeVisible();

  // Check for "Get Started" button
  const getStartedButton = page.getByRole('button', { name: /get started/i });
  await expect(getStartedButton).toBeVisible();

  // Click the "Get Started" button
  await getStartedButton.click();

  // Verify that the browswer navigates to '/select-state'
  await expect(page).toHaveURL(/select-state/)
});
```

This smoke test verifies that:
 - The application loads successfully
 - The URL contains 'step-1'
 - The language selection dropdown is visible
 - The "Get Started" button is visible

#### Configuration

Playwright configuration is in `playwright.config.ts`. Key settings include:

- **Base URL**: Configured from environment variables in `.env.test`
- **Test Browsers**: Chrome, Firefox, Safari, and mobile viewports
- **Visual Debug setting**: Special configuration for visual testing with `--project=debug`
- **Automatic Dev Server**: Started before tests run

For more information, see the [Playwright documentation](https://playwright.dev/docs/intro).
