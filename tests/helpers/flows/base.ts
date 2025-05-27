/**
 * Base Page Object Model
 * 
 * This file defines the base interface and abstract class for all page objects,
 * establishing a consistent structure for page interactions.
 */

import { Page, expect } from '@playwright/test';
import { FlowResult } from './types';

/**
 * Base interface that all page objects must implement
 */
export interface PageObject {
  /**
   * Navigate to this page
   */
  navigate(): Promise<void>;
  
  /**
   * Verify that the page is loaded correctly
   */
  isLoaded(): Promise<boolean>;
  
  /**
   * Get the page's URL pattern for verification
   */
  getUrlPattern(): RegExp | string;
}

/**
 * Abstract base class for all page objects
 */
export abstract class BasePage implements PageObject {
  protected page: Page;
  protected urlPattern: RegExp | string;
  
  /**
   * @param page - Playwright page instance
   * @param urlPattern - URL pattern to verify this page
   */
  constructor(page: Page, urlPattern: RegExp | string) {
    this.page = page;
    this.urlPattern = urlPattern;
  }
  
  /**
   * Navigate to this page - must be implemented by derived classes
   */
  abstract navigate(): Promise<void>;
  
  /**
   * Verify that we're on the correct page by checking the URL
   */
  async isLoaded(): Promise<boolean> {
    try {
      await expect(this.page).toHaveURL(this.urlPattern);
      return true;
    } catch (error) {
      return false;
    }
  }
  
  /**
   * Get the page's URL pattern
   */
  getUrlPattern(): RegExp | string {
    return this.urlPattern;
  }
  
  /**
   * Wait for navigation to complete and verify we're on the expected page
   */
  async waitForNavigation(): Promise<FlowResult> {
    try {
      await expect(this.page).toHaveURL(this.urlPattern);
      return { 
        success: true, 
        step: 'navigation' 
      };
    } catch (error) {
      return { 
        success: false, 
        step: 'navigation',
        error: error as Error
      };
    }
  }
  
  /**
   * Click an element and wait for navigation
   * @param selector - Selector for the element to click
   */
  async clickAndWaitForNavigation(selector: string): Promise<FlowResult> {
    try {
      await this.page.locator(selector).click();
      return await this.waitForNavigation();
    } catch (error) {
      return {
        success: false,
        step: 'click-and-navigate',
        error: error as Error
      };
    }
  }
}

/**
 * Base class for step pages in the application
 */
export abstract class BaseStepPage extends BasePage {
  protected stepNumber: number;
  
  /**
   * @param page - Playwright page instance
   * @param urlPattern - URL pattern to verify this page
   * @param stepNumber - The step number in the flow
   */
  constructor(page: Page, urlPattern: RegExp | string, stepNumber: number) {
    super(page, urlPattern);
    this.stepNumber = stepNumber;
  }
  
  /**
   * Get the step number
   */
  getStepNumber(): number {
    return this.stepNumber;
  }
  
  /**
   * Continue to the next step
   */
  async continue(): Promise<FlowResult> {
    try {
      await this.page.getByRole('button', { name: 'Continue' }).click();
      return {
        success: true,
        step: `step-${this.stepNumber}-continue`
      };
    } catch (error) {
      return {
        success: false,
        step: `step-${this.stepNumber}-continue`,
        error: error as Error
      };
    }
  }
}
