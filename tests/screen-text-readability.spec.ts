import { test } from '@playwright/test';
import { collectPageTexts } from './utils/page-text-collector';
import * as fs from 'fs';
import * as path from 'path';
import {
  fleschKincaidGrade,
  fleschKincaidReadingEase,
  daleChallReadabilityScore,
  automatedReadabilityIndex,
  colemanLiauIndex,
  gunningFog,
  smogIndex,
  getPolysyllabicWords,
  getSentenceCount,
  getWordCount,
  getLongestSentence,
  getPassiveVoice
} from './utils/text-analyzer';

interface ReadabilityMetrics {
  pageName: string;
  text: string;
  wordCount: number;
  sentenceCount: number;
  longestSentence: string;
  polysyllabicWordCount: number;
  polysyllabicWords: string[];
  passiveVoiceCount: number;
  passiveVoiceSentences: string[];
  scores: {
    fleschReadingEase: number;
    fleschKincaidGrade: number;
    daleChallScore: number;
    automatedReadability: number;
    colemanLiau: number;
    gunningFog: number;
    smog: number;
  };
}

test.describe('Screen Text Collection and Readability Analysis', () => {
  test('collect and analyze text readability', async ({ page }) => {
    // Prevent Google Translate from initializing
    await page.addInitScript(() => {
      Object.defineProperty(window, 'google', {
        get: () => undefined,
        configurable: true
      });
    });

    // Define navigation steps with URLs and actions
    const navigationSteps = [
      {
        url: '/',
        name: 'Home Page',
        action: async () => {
          await page.getByRole('button', { name: 'Get Started' }).click();
        }
      },
      {
        url: '/select-state',
        name: 'State Selection',
        action: async () => {
          await page.locator('#state-source-select').click();
          await page.getByRole('option', { name: 'North Carolina' }).click();
          await page.getByRole('button', { name: 'Continue' }).click();
        }
      },
      {
        url: '/nc/step-2',
        name: 'Step 2',
        action: async () => {
          await page.getByRole('checkbox', { name: 'By proceeding, you confirm' }).check();
          await page.getByRole('checkbox', { name: 'I confirm I am 13 years of' }).check();
          await page.getByRole('button', { name: 'Continue' }).click();
        }
      },
      {
        url: /\/nc\/.*\/step-3/,
        name: 'Step 3',
        action: async () => {
          await page.getByRole('textbox', { name: 'Zip Code' }).fill('27704');
          await page.locator('#county-source-select').click();
          await page.getByRole('option', { name: 'Durham County' }).click();
          await page.getByRole('button', { name: 'Continue' }).click();
        }
      },
      {
        url: /\/nc\/.*\/step-4/,
        name: 'Step 4',
        action: async () => {
          await page.getByRole('textbox', { name: 'Household Size' }).fill('2');
          await page.getByRole('button', { name: 'Continue' }).click();
        }
      },
      {
        url: /\/nc\/.*\/step-5/,
        name: 'Step 5',
        action: async () => {
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
      },
      {
        url: /\/nc\/.*\/step-5/,
        name: 'Step 5',
        action: 
          async () => {
            await page.getByRole('button', { name: 'Birth Month' }).click();
            await page.getByRole('option', { name: 'March' }).click();
            await page.getByRole('button', { name: 'Open' }).click();
            await page.getByRole('option', { name: '1989' }).click();
            await page.locator('#relationship-to-hh-select').click();
            await page.getByRole('option', { name: 'Child', exact: true }).click();
            await page.getByRole('button', { name: "They don't have or know if" }).click();
            await page.getByRole('button', { name: 'Continue' }).click();
          }        
      },
      {
        url: /\/nc\/.*\/step-6/,

        name: 'Step 6',
        action: 
          async () => {
            await page.getByRole('radio', { name: 'Yes' }).check();
            await page.getByRole('button', { name: 'Expense Type' }).click();
            await page.getByRole('option', { name: 'Rent' }).click();
            await page.getByRole('textbox', { name: 'Amount' }).fill('2500');
            await page.getByRole('button', { name: 'Continue' }).click();
          }        
      },
      {
        url: /\/nc\/.*\/step-7/,
        name: 'Step 7',
        action: 
          async () => {
            await page.getByRole('textbox', { name: 'Dollar Amount' }).fill('1000');
            await page.getByRole('button', { name: 'Continue' }).click();
          }        
      },
      {
        url: /\/nc\/.*\/step-8/,
        name: 'Step 8',
        action: 
          async () => await page.getByRole('button', { name: 'Continue' }).click()        
      },
      {
        url: /\/nc\/.*\/step-9/,
        name: 'Step 9',
        action: 
          async () => {
            await page.getByRole('button', { name: 'Food or groceries' }).click();
            await page.getByRole('button', { name: "Concern about your child's" }).click();
            await page.getByRole('button', { name: 'Free or low-cost help with' }).click();
            await page.getByRole('button', { name: 'Continue' }).click();
          }        
      },
      {
        url: /\/nc\/.*\/step-10/,
        name: 'Step 10',
        action: 
          async () => {
            await page.locator('#referral-source-select').click();
            await page.getByRole('option', { name: 'Test / Prospective Partner' }).click();
            await page.getByRole('button', { name: 'Continue' }).click();
          }        
      },
      {
        url: /\/nc\/.*\/step-11/,
        name: 'Step 11',
        action: 
          async () => await page.getByRole('button', { name: 'Continue' }).click()        
      },
      {
        url: /\/nc\/.*\/confirm-information/,
        name: 'Step confirm',
        action: 
          async () => await page.getByRole('button', { name: 'Continue' }).click()        
      },
      {
        url: /\/nc\/.*\/results\/benefits\/?admin=true/,
        name: 'Benefits',
        action: 
          async () => await page.getByRole('button', { name: 'save my results' }).click()        
      },    
    ];

    const screenTexts: { [key: string]: string[] } = {};
    const readabilityResults: ReadabilityMetrics[] = [];

    // Navigate through each step
    for (const step of navigationSteps) {
      // Navigate to the page if it's a direct URL
      if (typeof step.url === 'string') {
        await page.goto(step.url);
      }
      
      // Wait for page to load
      await page.waitForLoadState('networkidle');

      // Collect text for current page
      const texts = await collectPageTexts(page);
      screenTexts[step.name] = texts;

      // Analyze readability for this page
      const combinedText = texts.join(' ');
      const metrics: ReadabilityMetrics = {
        pageName: step.name,
        text: combinedText,
        wordCount: getWordCount(combinedText),
        sentenceCount: getSentenceCount(combinedText),
        longestSentence: getLongestSentence(combinedText),
        polysyllabicWordCount: getPolysyllabicWords(combinedText).length,
        polysyllabicWords: getPolysyllabicWords(combinedText),
        passiveVoiceCount: getPassiveVoice(combinedText).length,
        passiveVoiceSentences: getPassiveVoice(combinedText),
        scores: {
          fleschReadingEase: fleschKincaidReadingEase(combinedText),
          fleschKincaidGrade: fleschKincaidGrade(combinedText),
          daleChallScore: daleChallReadabilityScore(combinedText),
          automatedReadability: automatedReadabilityIndex(combinedText),
          colemanLiau: colemanLiauIndex(combinedText),
          gunningFog: gunningFog(combinedText),
          smog: smogIndex(combinedText)
        }
      };

      readabilityResults.push(metrics);

      // Perform the navigation action for this step
      try {
        await step.action();        
      } catch (error) {        
        throw error;
      }

      // Wait for navigation to complete
      await page.waitForLoadState('networkidle');
    }

    // Generate reports
    const outputDir = './test-results/readability';
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    // Generate timestamp for filenames
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');

    // Generate CSV report
    const csvRows = [
      [
        'Page',
        'Word Count',
        'Sentence Count',
        'Polysyllabic Words',
        'Passive Voice Count',
        'Flesch Reading Ease',
        'Flesch-Kincaid Grade',
        'Dale-Chall Score',
        'Automated Readability',
        'Coleman-Liau',
        'Gunning Fog',
        'SMOG'
      ].join(','),
      ...readabilityResults.map(result => [
        result.pageName,
        result.wordCount,
        result.sentenceCount,
        result.polysyllabicWordCount,
        result.passiveVoiceCount,
        result.scores.fleschReadingEase.toFixed(1),
        result.scores.fleschKincaidGrade.toFixed(1),
        result.scores.daleChallScore.toFixed(1),
        result.scores.automatedReadability.toFixed(1),
        result.scores.colemanLiau.toFixed(1),
        result.scores.gunningFog.toFixed(1),
        result.scores.smog.toFixed(1)
      ].join(','))
    ].join('\n');

    const getReadingLevel = (fleschScore: number): string => {
      if (fleschScore >= 90) return 'Very Easy to Read (5th Grade)';
      if (fleschScore >= 80) return 'Easy to Read (6th Grade)';
      if (fleschScore >= 70) return 'Fairly Easy to Read (7th Grade)';
      if (fleschScore >= 60) return 'Plain English (8th-9th Grade)';
      if (fleschScore >= 50) return 'Fairly Difficult (10th-12th Grade)';
      if (fleschScore >= 30) return 'Difficult (College)';
      return 'Very Difficult (College Graduate)';
    };

    // Generate detailed JSON report with enhanced metrics
    const detailedReport = {
      summary: {
        totalPages: readabilityResults.length,
        overallMetrics: {
          averageFleschScore: average(readabilityResults.map(r => r.scores.fleschReadingEase)),
          averageGradeLevel: average(readabilityResults.map(r => r.scores.fleschKincaidGrade)),
          averageWordsPerSentence: average(readabilityResults.map(r => r.wordCount / r.sentenceCount)),
          totalWords: readabilityResults.reduce((sum, r) => sum + r.wordCount, 0),
          totalSentences: readabilityResults.reduce((sum, r) => sum + r.sentenceCount, 0),
          totalPolysyllabicWords: readabilityResults.reduce((sum, r) => sum + r.polysyllabicWordCount, 0),
          averageSyllablesPerWord: readabilityResults.reduce((sum, r) => sum + r.polysyllabicWordCount, 0) / 
                                 readabilityResults.reduce((sum, r) => sum + r.wordCount, 0)
        }
      },
      pageDetails: readabilityResults.map(result => ({
        page: result.pageName,
        summary: {
          readingLevel: getReadingLevel(result.scores.fleschReadingEase),
          readabilityAssessment: `${
            result.scores.fleschReadingEase < 60 ? 'Needs Simplification' : 'Acceptable'
          }`,
        },
        metrics: {
          basic: {
            sentences: result.sentenceCount,
            words: result.wordCount,
            avgWordsPerSentence: (result.wordCount / result.sentenceCount).toFixed(1),
            avgSyllablesPerWord: (result.polysyllabicWordCount / result.wordCount).toFixed(1)
          },
          scores: {
            fleschReadingEase: {
              score: result.scores.fleschReadingEase.toFixed(1),
              interpretation: getReadingLevel(result.scores.fleschReadingEase)
            },
            fleschKincaidGrade: {
              score: result.scores.fleschKincaidGrade.toFixed(1),
              interpretation: `Grade ${Math.round(result.scores.fleschKincaidGrade)}`
            },
            otherMetrics: {
              daleChall: result.scores.daleChallScore.toFixed(1),
              automatedReadability: result.scores.automatedReadability.toFixed(1),
              colemanLiau: result.scores.colemanLiau.toFixed(1),
              gunningFog: result.scores.gunningFog.toFixed(1),
              smog: result.scores.smog.toFixed(1)
            }
          },
          complexity: {
            polysyllabicWordCount: result.polysyllabicWordCount,
            passiveVoiceCount: result.passiveVoiceCount,
            complexityIndicators: {
              longSentence: result.longestSentence,
              polysyllabicWords: result.polysyllabicWords.slice(0, 5),
              passiveVoice: result.passiveVoiceSentences.slice(0, 3) 
            }
          }
        }
      }))
    };

    fs.writeFileSync(
      path.join(outputDir, `readability-metrics-${timestamp}.csv`),
      csvRows
    );
    fs.writeFileSync(
      path.join(outputDir, `detailed-readability-${timestamp}.json`),
      JSON.stringify(detailedReport, null, 2)
    );

    // Calculate overall metrics first before any CSV generation
    const overall = {
      averageFleschScore: average(readabilityResults.map(r => r.scores.fleschReadingEase)),
      averageGradeLevel: average(readabilityResults.map(r => r.scores.fleschKincaidGrade)),
      averageWordsPerSentence: average(readabilityResults.map(r => r.wordCount / r.sentenceCount)),
      totalComplexWords: readabilityResults.reduce((sum, r) => sum + r.polysyllabicWordCount, 0),
      totalPassiveVoice: readabilityResults.reduce((sum, r) => sum + r.passiveVoiceCount, 0)
    };

    // Console output for overall metrics
    console.log('\nOverall Content Metrics:');
    console.table({
      'Average Reading Level': getReadingLevel(overall.averageFleschScore),
      'Average Grade Level': `Grade ${overall.averageGradeLevel.toFixed(1)}`,
      'Average Words/Sentence': overall.averageWordsPerSentence.toFixed(1),
      'Total Complex Words': overall.totalComplexWords,
      'Total Passive Voice': overall.totalPassiveVoice
    });

    // Generate CSV for console.table data
    const tableDataCsv = [
      // Header row
      ['Page', 'Reading Level', 'Flesch Score', 'Grade Level', 'Avg Words/Sentence', 'Syllables/Word', 'Complex Words', 'Passive Voice'].join(','),
      // Data rows
      ...readabilityResults.map(r => [
        r.pageName,
        getReadingLevel(r.scores.fleschReadingEase),
        r.scores.fleschReadingEase.toFixed(1),
        `Grade ${r.scores.fleschKincaidGrade.toFixed(1)}`,
        (r.wordCount / r.sentenceCount).toFixed(1),
        (r.polysyllabicWordCount / r.wordCount).toFixed(2),
        r.polysyllabicWordCount,
        r.passiveVoiceCount
      ].join(','))
    ].join('\n');

    // Generate CSV for overall metrics
    const overallMetricsCsv = [
      // Header row
      ['Metric', 'Value'].join(','),
      // Data rows
      ['Average Reading Level', getReadingLevel(overall.averageFleschScore)].join(','),
      ['Average Grade Level', `Grade ${overall.averageGradeLevel.toFixed(1)}`].join(','),
      ['Average Words/Sentence', overall.averageWordsPerSentence.toFixed(1)].join(','),
      ['Total Complex Words', overall.totalComplexWords].join(','),
      ['Total Passive Voice', overall.totalPassiveVoice].join(',')
    ].join('\n');

    // Write the CSV files
    fs.writeFileSync(
      path.join(outputDir, `readability-table-${timestamp}.csv`),
      tableDataCsv
    );
    
    fs.writeFileSync(
      path.join(outputDir, `readability-overall-${timestamp}.csv`),
      overallMetricsCsv
    );

    // Original console.table outputs
    console.log('\nReadability Analysis Summary:');
    console.table(readabilityResults.map(r => ({
      Page: r.pageName,
      'Reading Level': getReadingLevel(r.scores.fleschReadingEase),
      'Flesch Score': r.scores.fleschReadingEase.toFixed(1),
      'Grade Level': `Grade ${r.scores.fleschKincaidGrade.toFixed(1)}`,
      'Avg Words/Sentence': (r.wordCount / r.sentenceCount).toFixed(1),
      'Syllables/Word': (r.polysyllabicWordCount / r.wordCount).toFixed(2),
      'Complex Words': r.polysyllabicWordCount,
      'Passive Voice': r.passiveVoiceCount
    })));
  });
});

// Helper function
function average(numbers: number[]): number {
  return numbers.reduce((a, b) => a + b, 0) / numbers.length;
}
