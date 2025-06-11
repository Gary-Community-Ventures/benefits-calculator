import textReadability from 'text-readability';

export function getWordCount(text: string): number {
  return text.trim().split(/\s+/).filter(word => word.length > 0).length;
}

export function getSentenceCount(text: string): number {
  return text.split(/[.!?]+/).filter(sentence => sentence.trim().length > 0).length;
}

export function getLongestSentence(text: string): string {
  return text
    .split(/[.!?]+/)
    .map(s => s.trim())
    .filter(s => s.length > 0)
    .reduce((longest, current) => 
      current.length > longest.length ? current : longest
    , '');
}

export function getPolysyllabicWords(text: string): string[] {
  return text
    .split(/\s+/)
    .filter(word => {
      const syllableCount = countSyllables(word);
      return syllableCount > 2;
    });
}

export function getPassiveVoice(text: string): string[] {
  const passivePatterns = [
    /\b(?:am|is|are|was|were|be|been|being)\s+\w+ed\b/gi,
    /\b(?:have|has|had)\s+been\s+\w+ed\b/gi
  ];

  return text
    .split(/[.!?]+/)
    .map(s => s.trim())
    .filter(sentence => 
      passivePatterns.some(pattern => pattern.test(sentence))
    );
}

// Helper function to count syllables
function countSyllables(word: string): number {
  word = word.toLowerCase();
  word = word.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, '');
  word = word.replace(/^y/, '');
  return word.match(/[aeiouy]{1,2}/g)?.length ?? 0;
}

// Custom readability score functions
export function fleschKincaidGrade(text: string): number {
  // Custom implementation since text-readability's implementation seems broken
  const words = text.split(/\s+/).filter(word => word.length > 0);
  const sentences = text.split(/[.!?]+/).filter(sent => sent.trim().length > 0);
  const syllables = words.reduce((count, word) => count + countSyllables(word), 0);
  
  if (words.length === 0 || sentences.length === 0) return 0;
  
  // Flesch-Kincaid Grade Level formula
  return 0.39 * (words.length / sentences.length) + 
         11.8 * (syllables / words.length) - 15.59;
}

export function fleschKincaidReadingEase(text: string): number {
  // Custom implementation for better accuracy
  const words = text.split(/\s+/).filter(word => word.length > 0);
  const sentences = text.split(/[.!?]+/).filter(sent => sent.trim().length > 0);
  const syllables = words.reduce((count, word) => count + countSyllables(word), 0);
  
  if (words.length === 0 || sentences.length === 0) return 0;
  
  // Flesch Reading Ease formula
  return 206.835 - 1.015 * (words.length / sentences.length) -
         84.6 * (syllables / words.length);
}

export function daleChallReadabilityScore(text: string): number {
  try {
    return textReadability.daleChallReadabilityScore(text);
  } catch {
    return 0;
  }
}

export function automatedReadabilityIndex(text: string): number {
  try {
    return textReadability.automatedReadabilityIndex(text);
  } catch {
    return 0;
  }
}

export function colemanLiauIndex(text: string): number {
  try {
    return textReadability.colemanLiauIndex(text);
  } catch {
    return 0;
  }
}

export function gunningFog(text: string): number {
  try {
    return textReadability.gunningFog(text);
  } catch {
    return 0;
  }
}

export function smogIndex(text: string): number {
  try {
    return textReadability.smogIndex(text);
  } catch {
    return 0;
  }
}
