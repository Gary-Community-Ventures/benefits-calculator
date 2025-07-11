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

function isShortText(text: string): boolean {
  // Consider "short" as 1 or 2 words
  return text.trim().split(/\s+/).length < 3;
}

// Add language parameter to functions
export function fleschKincaidGrade(texts: string[] | string, language: 'en' | 'es' = 'en'): number {
  const text = Array.isArray(texts) ? texts.join(' ') : texts;
  if (isShortText(text)) return 1; // Default to grade 1 for short text
  
  // Spanish readability adjustments
  if (language === 'es') {
    // Huerta Formula - Spanish adaptation of Flesch-Kincaid
    const words = text.split(/\s+/).filter(word => word.length > 0);
    const sentences = text.split(/[.!?]+/).filter(sent => sent.trim().length > 0);
    const syllables = words.reduce((count, word) => count + countSyllablesSpanish(word), 0);
    
    if (words.length === 0 || sentences.length === 0) return 0;
    
    return 206.84 - 60 * (syllables / words.length) - 
           1.02 * (words.length / sentences.length);
  }

  // Original English implementation
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
  if (isShortText(text)) return 100; // Default to very easy for short text
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
  if (isShortText(text)) return 1; // Default to easy
  try {
    return textReadability.daleChallReadabilityScore(text);
  } catch {
    return 0;
  }
}

export function automatedReadabilityIndex(text: string): number {
  if (isShortText(text)) return 1;
  try {
    return textReadability.automatedReadabilityIndex(text);
  } catch {
    return 0;
  }
}

export function colemanLiauIndex(text: string): number {
  if (isShortText(text)) return 1;
  try {
    return textReadability.colemanLiauIndex(text);
  } catch {
    return 0;
  }
}

export function gunningFog(text: string): number {
  if (isShortText(text)) return 1;
  try {
    return textReadability.gunningFog(text);
  } catch {
    return 0;
  }
}

export function smogIndex(text: string): number {
  if (isShortText(text)) return 1;
  try {
    return textReadability.smogIndex(text);
  } catch {
    return 0;
  }
}

// Add Spanish syllable counter
function countSyllablesSpanish(word: string): number {
  word = word.toLowerCase();
  let count = 0;
  let prevIsVowel = false;

  // Spanish vowels including accented ones
  const vowels = /[aeiouáéíóúü]/i;
  const diphthongs = /[aeiou][aeiou]/i;

  for (let i = 0; i < word.length; i++) {
    const isVowel = vowels.test(word[i]);
    
    if (isVowel) {
      // Don't count second vowel in diphthongs
      if (!prevIsVowel || diphthongs.test(word.substring(i-1, i+1))) {
        count++;
      }
    }
    prevIsVowel = isVowel;
  }

  return count || 1; // Every word has at least one syllable
}
