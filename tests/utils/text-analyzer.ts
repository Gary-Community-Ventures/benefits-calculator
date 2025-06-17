import textReadability from 'text-readability';

export function getWordCount(texts: string[] | string): number {
  if (Array.isArray(texts)) {
    return texts.reduce((total, text) => total + text.trim().split(/\s+/).filter(word => word.length > 0).length, 0);
  }
  return texts.trim().split(/\s+/).filter(word => word.length > 0).length;
}

export function getSentenceCount(texts: string[] | string): number {
  if (Array.isArray(texts)) {
    return texts.reduce((total, text) => total + text.split(/[.!?]+/).filter(sentence => sentence.trim().length > 0).length, 0);
  }
  return texts.split(/[.!?]+/).filter(sentence => sentence.trim().length > 0).length;
}

export function getLongestSentence(texts: string[] | string): string {
  if (Array.isArray(texts)) {
    return texts
      .map(text => text.split(/[.!?]+/).map(s => s.trim()).filter(s => s.length > 0))
      .flat()
      .reduce((longest, current) => current.length > longest.length ? current : longest, '');
  }
  return texts
    .split(/[.!?]+/)
    .map(s => s.trim())
    .filter(s => s.length > 0)
    .reduce((longest, current) => current.length > longest.length ? current : longest, '');
}

export function getPolysyllabicWords(texts: string[] | string): string[] {
  if (Array.isArray(texts)) {
    return texts.flatMap(text => 
      text.split(/\s+/).filter(word => {
        const syllableCount = countSyllables(word);
        return syllableCount > 2;
      })
    );
  }
  return texts
    .split(/\s+/)
    .filter(word => {
      const syllableCount = countSyllables(word);
      return syllableCount > 2;
    });
}

export function getPassiveVoice(texts: string[] | string): string[] {
  const passivePatterns = [
    /\b(?:am|is|are|was|were|be|been|being)\s+\w+ed\b/gi,
    /\b(?:have|has|had)\s+been\s+\w+ed\b/gi
  ];

  if (Array.isArray(texts)) {
    return texts.flatMap(text =>
      text.split(/[.!?]+/)
        .map(s => s.trim())
        .filter(sentence => passivePatterns.some(pattern => pattern.test(sentence)))
    );
  }
  
  return texts
    .split(/[.!?]+/)
    .map(s => s.trim())
    .filter(sentence => passivePatterns.some(pattern => pattern.test(sentence)));
}

// Helper function to count syllables
function countSyllables(word: string): number {
  word = word.toLowerCase();
  word = word.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, '');
  word = word.replace(/^y/, '');
  return word.match(/[aeiouy]{1,2}/g)?.length ?? 0;
}

// Custom readability score functions
export function fleschKincaidGrade(texts: string[] | string): number {
  const text = Array.isArray(texts) ? texts.join(' ') : texts;
  // Custom implementation since text-readability's implementation seems broken
  const words = text.split(/\s+/).filter(word => word.length > 0);
  const sentences = text.split(/[.!?]+/).filter(sent => sent.trim().length > 0);
  const syllables = words.reduce((count, word) => count + countSyllables(word), 0);
  
  if (words.length === 0 || sentences.length === 0) return 0;
  
  // Flesch-Kincaid Grade Level formula
  return 0.39 * (words.length / sentences.length) + 
         11.8 * (syllables / words.length) - 15.59;
}

export function fleschKincaidReadingEase(texts: string[] | string): number {
  const text = Array.isArray(texts) ? texts.join(' ') : texts;
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
