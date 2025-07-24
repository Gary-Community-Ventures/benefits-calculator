# NC Workflow Testing Guide

## Overview

This guide explains the NC (North Carolina) workflow testing framework for developers, covering both the standard NC workflow and the NC 211 referrer workflow. These tests validate white-labeled versions of the benefits calculator with different branding and entry points but identical form functionality.

## Key Concepts

### NC Workflows Overview
- **NC Standard**: The default North Carolina benefits calculator workflow
- **NC 211**: A white-labeled version branded for NC 211 (North Carolina's 2-1-1 information service)
- **Shared Foundation**: Both workflows collect identical user data through the same form steps
- **Key Differences**: Only branding, copy, and entry points differ between workflows

### Test Architecture
Both NC workflows follow the same modular, DRY patterns:
- **Shared helpers** for common form interactions and navigation
- **Reusable test data** for consistent testing across workflows
- **Flow-based architecture** for multi-step application processes
- **White-label specific helpers** for branding and entry point differences

## File Structure

```
tests/
├── nc-end-to-end.spec.ts            # NC standard workflow test
├── nc-211-workflow.spec.ts          # NC 211 referrer workflow tests
├── helpers/
│   ├── flows/
│   │   ├── nc.ts                    # NC standard workflow helpers
│   │   ├── nc-211.ts                # NC 211 specific flow helpers
│   │   └── common.ts                # Shared flow helpers (form steps)
│   ├── assertions.ts                # Custom assertion helpers
│   ├── navigation.ts                # Navigation and URL verification helpers
│   ├── form.ts                      # Form interaction helpers
│   ├── selectors.ts                 # Reusable UI selectors
│   └── utils/
│       ├── test-data.ts             # Test data and constants
│       └── test-config.ts           # Test configuration and timeouts
```

## Test Structure

Both NC workflows follow similar testing patterns with workflow-specific entry points and shared form validation.

### NC Standard Workflow (`nc-end-to-end.spec.ts`)

A single comprehensive end-to-end test that validates the complete NC workflow:

```typescript
test('start to finish screen test', async ({ page }) => {
  // Run complete NC workflow using shared helper
  const result = await runNcEndToEndTest(page, testUsers[REFERRERS.NC]);
  
  // Verify test was successful
  expect(result.success).toBeTruthy();
  
  // Verify results page and save functionality
  if (result.success) {
    await verifyCurrentUrl(page, URL_PATTERNS.RESULTS);
    await saveResults(page);
  }
});
```

### NC 211 Workflow (`nc-211-workflow.spec.ts`)

The NC 211 tests are organized into two phases:

#### 1: Static Content Validation
Tests the NC 211 landing page content and referrer parameter persistence:

```typescript
test('NC 211 landing page static content validation', async ({ page }) => {
  await page.setViewportSize(VIEWPORTS.DESKTOP);
  
  // Navigate to NC 211 workflow and verify landing page
  await navigateToNC211Workflow(page, REFERRERS.NC_211);
  await verifyPageLoaded(page);
  await verifyCurrentUrl(page, URL_PATTERNS.LANDING_PAGE);
  
  // Validate NC 211 specific branding and content
  await verifyNC211LandingPageContent(page);
  
  // Test navigation maintains referrer parameter
  await clickGetStarted(page);
  await verifyReferrerUrl(page, REFERRERS.NC_211);
});
```

#### 2: Complete End-to-End Test
Tests the full workflow from landing page to results:

```typescript
test('NC 211 start to finish workflow test', async ({ page }) => {
  // Run complete NC 211 workflow using shared helper
  const result = await runNC211EndToEndTest(page, testUsers[REFERRERS.NC_211]);
  
  // Verify test was successful
  expect(result.success).toBeTruthy();
  
  // Verify results page and save functionality
  if (result.success) {
    await verifyCurrentUrl(page, URL_PATTERNS.RESULTS);
    await saveResults(page);
  }
});
```

## Helper Functions

The testing framework uses a layered approach with shared helpers for common functionality and workflow-specific helpers for branding and entry points.

### NC Standard Workflow Helpers (`helpers/flows/nc.ts`)

#### `navigateToNcWorkflow(page)`
- Navigates to the standard NC landing page
- Handles state selection and initial setup

#### `setupNcSession(page)`
- Sets up the NC session by completing disclaimer
- Returns early on any failures

#### `completeNcFullApplication(page, data)`
- Completes the entire application using shared form helpers
- Returns early on any step failure

#### `runNcEndToEndTest(page, data)`
- Orchestrates the complete NC end-to-end test
- Includes retry logic and error handling

### NC 211 Specific Helpers (`helpers/flows/nc-211.ts`)

#### `navigateToNC211Workflow(page, referrer)`
- Navigates to the NC 211 landing page with referrer parameter
- Handles URL construction and navigation

#### `setupNC211Session(page)`
- Sets up the NC 211 session by completing disclaimer
- Returns early on any failures

#### `completeNC211FullApplication(page, data)`
- Completes the entire application using shared form helpers
- Uses a clean array-based approach for step execution
- Returns early on any step failure

#### `runNC211EndToEndTest(page, data)`
- Orchestrates the complete end-to-end test
- Includes retry logic for flaky interactions
- Provides detailed error reporting

### Shared Helpers (`helpers/flows/common.ts`)
All form steps use shared helpers:
- `completeLocationInfo()` - Zip code and county selection
- `completeHouseholdSize()` - Household size input
- `completePrimaryUserInfo()` - Primary user demographics
- `completeHouseholdMemberInfo()` - Additional household member info
- `completeExpenses()` - Monthly expenses
- `completeAssets()` - Asset information
- `completePublicBenefits()` - Current benefits (just continue)
- `completeNeeds()` - Service needs selection
- `completeReferralSource()` - How they heard about the service
- `completeAdditionalInfo()` - Additional information (optional)
- `navigateToResults()` - Navigate to final results

## Test Data

Test data is centralized in `helpers/utils/test-data.ts` and shared between both workflows:

```typescript
export const testUsers = {
  // Standard NC workflow test data
  [REFERRERS.NC]: {
    zipCode: '27701',
    county: 'Durham County',
    householdSize: '2',
    primaryUser: {
      birthMonth: 'February',
      birthYear: '1990',
      // ... other user data
    },
    householdMember: {
      birthMonth: 'March',
      birthYear: '1985',
      // ... other member data
    },
    expenses: {
      rent: '1200',
      utilities: '150',
      // ... other expenses
    },
    // ... other application data
  },
  
  // NC 211 referrer workflow test data (identical structure)
  [REFERRERS.NC_211]: {
    zipCode: '27701',
    county: 'Durham County',
    householdSize: '2',
    primaryUser: {
      birthMonth: 'February',
      birthYear: '1990',
      // ... other user data
    },
    // ... other application data (same structure as NC)
  }
};
```

### Key Points:
- **Identical Structure**: Both NC and NC 211 use the same data structure
- **Realistic Data**: Test data represents real user scenarios
- **Centralized**: All test data is maintained in one location for consistency

## Key Design Decisions

### 1. Referrer Parameter Handling
- **Entry Point Only**: Referrer parameter is only verified at the landing page
- **Why**: The application doesn't preserve query parameters through navigation
- **Impact**: Tests don't fail on later steps due to missing referrer parameter

### 2. Shared vs. Specific Helpers
- **Shared**: All form interaction helpers are shared between NC and NC 211
- **Specific**: Only entry point and session setup are NC 211 specific
- **Benefit**: Maximum code reuse and consistency

### 3. Error Handling Strategy
- **Early Return**: Functions return immediately on failure
- **Retry Logic**: Built-in retries for flaky UI interactions
- **Detailed Errors**: Comprehensive error messages for debugging

### 4. Viewport Management
- **Desktop Viewport**: Used for navigation link visibility
- **Consistent**: Same viewport settings across all tests

## Common Issues and Solutions

### 1. Date Picker Interactions
**Issue**: DOM instability in MUI date picker components
**Solution**: Enhanced `selectDate()` function with:
- Retry logic (3 attempts)
- DOM stability checks
- Scoped selectors to avoid conflicts

### 2. Navigation Timing
**Issue**: Occasional navigation timeouts between steps
**Solution**: 
- Extended timeouts in configuration
- Retry logic in end-to-end test runner
- Explicit waits for page stability

### 3. Selector Conflicts
**Issue**: Ambiguous selectors (e.g., "Open" button in dropdown vs. hamburger menu)
**Solution**: Scoped selectors using container classes
```typescript
// Instead of: page.getByRole('button', { name: 'Open' })
// Use: page.locator('.age-input-container').getByRole('button', { name: 'Open' })
```

## Running Tests

### Run All NC Workflow Tests
```bash
# Run all end-to-end tests (includes both NC and NC 211)
npm run test:e2e

# Run specific test files
npx playwright test tests/nc-end-to-end.spec.ts
npx playwright test tests/nc-211-workflow.spec.ts

# Run both NC workflow tests together
npx playwright test tests/nc-end-to-end.spec.ts tests/nc-211-workflow.spec.ts
```

### Run Specific Tests
```bash
# Run specific NC 211 test by name
npx playwright test tests/nc-211-workflow.spec.ts -g "landing page static content"

# Run specific NC test by name
npx playwright test tests/nc-end-to-end.spec.ts -g "start to finish"
```

### Debug and UI Mode
```bash
# Run tests with Playwright UI (recommended for debugging)
npm run test:e2e:ui

# Run specific test in UI mode
npx playwright test tests/nc-211-workflow.spec.ts --ui

# Run tests in debug mode
npx playwright test tests/nc-211-workflow.spec.ts --debug

# Run visual tests in UI mode
npm run test:e2e:visual
```

### View Test Reports
```bash
# Show test report after running tests
npm run test:e2e:report
```

## Best Practices for Developers

### 1. Use Existing Helpers
- Always check `helpers/` directory before writing new functions
- Reuse shared helpers for consistency
- Follow established patterns from NC end-to-end tests

### 2. Error Handling
- Always check function return values for success/failure
- Return early on failures to avoid cascading errors
- Provide meaningful error messages

### 3. Test Data Management
- Use centralized test data from `test-data.ts`
- Don't hardcode test values in test files
- Keep test data realistic and representative

### 4. Debugging
- Use `console.log()` statements for debugging (they're already in helpers)
- Check browser developer tools for DOM issues
- Use Playwright's debug mode for step-by-step execution

### 5. Maintenance
- Keep tests DRY (Don't Repeat Yourself)
- Update shared helpers when making changes
- Maintain consistent patterns across test files

## Configuration

### Timeouts
- **Default**: 60 seconds (from `playwright.config.ts`)
- **End-to-End**: 120 seconds (extended for full workflows)
- **Navigation**: 30 seconds
- **Actions**: 15 seconds

### Viewports
- **Desktop**: 1440x900 (used for navigation visibility)
- **Mobile**: 375x667
- **Tablet**: 768x1024

## Troubleshooting

### Test Failures
1. **Check the error message** - Look for the specific step that failed
2. **Review logs** - Helper functions provide detailed logging
3. **Check selectors** - Verify UI elements haven't changed
4. **Run in debug mode** - Use `--debug` flag for step-by-step execution

### Flaky Tests
1. **Increase timeouts** - Some interactions need more time
2. **Add explicit waits** - Wait for specific conditions
3. **Check DOM stability** - Ensure elements are stable before interaction

This guide should help developers understand and maintain the NC 211 testing framework effectively.
