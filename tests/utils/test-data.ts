import { type PageTexts } from './page-text-collector';

// Store the expected Spanish translations that will be shared between test files
export let expectedSpanishTexts: PageTexts = {};

// Function to set the expected Spanish texts
export function setExpectedSpanishTexts(texts: PageTexts) {
  expectedSpanishTexts = texts;
}

// Function to get the expected Spanish texts
export function getExpectedSpanishTexts(): PageTexts {
  return expectedSpanishTexts;
}
