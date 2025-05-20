import { Page } from '@playwright/test';

export interface PageTexts {
  [key: string]: string[];
}

export async function collectPageTexts(page: Page): Promise<string[]> {
  // Get all visible text elements on the page
  const texts = await page.evaluate(() => {
    const walker = document.createTreeWalker(
      document.body,
      NodeFilter.SHOW_TEXT,
      {
        acceptNode: (node) => {
          // Skip hidden elements
          const element = node.parentElement;
          if (!element) return NodeFilter.FILTER_REJECT;
          
          const style = window.getComputedStyle(element);
          if (style.display === 'none' || style.visibility === 'hidden') {
            return NodeFilter.FILTER_REJECT;
          }
          
          // Skip empty text nodes
          const text = node.textContent?.trim();
          if (!text) return NodeFilter.FILTER_REJECT;
          
          return NodeFilter.FILTER_ACCEPT;
        }
      }
    );

    const texts: string[] = [];
    let node;
    while (node = walker.nextNode()) {
      const text = node.textContent?.trim();
      if (text) texts.push(text);
    }
    return texts;
  });

  // Filter out numbers, dates, and other non-translatable content
  return texts.filter(text => {
    // Skip if text is just numbers
    if (/^\d+$/.test(text)) return false;
    
    // Skip if text is just a date
    if (/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(text)) return false;
    
    // Skip if text is an email or URL
    if (/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(text)) return false;
    if (/^(http|https):\/\//.test(text)) return false;
    
    return true;
  });
}

export async function collectAllPageTexts(page: Page, steps: { url: string | RegExp; actions: ((page: Page) => Promise<void>)[] }[]): Promise<PageTexts> {
  const pageTexts: PageTexts = {};

  for (const step of steps) {
    // Navigate to the page and store URL
    let currentUrl: string;
    if (typeof step.url === 'string') {
      await page.goto(step.url);
      currentUrl = step.url;
    } else {
      await page.waitForURL(step.url);
      currentUrl = await page.url();
    }

    // Collect texts before any actions
    pageTexts[currentUrl] = await collectPageTexts(page);

    // Perform any required actions for this step
    for (const action of step.actions) {
      await action(page);
    }
  }

  return pageTexts;
}
