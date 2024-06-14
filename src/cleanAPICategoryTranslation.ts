import { Translation } from './Types/Results';

export const programTemplateCategories = [
  'Housing and Utilities',
  'Food and Nutrition',
  'Health Care',
  'Transportation',
  'Tax Credits',
  'Cash Assistance',
  'Child Care, Youth, and Education',
  'Food or Groceries',
  'Baby Supplies',
  'Managing housing costs',
  'Behavioral health',
  "Child's development",
  'Family planning',
  'Job resources',
  'Low-cost dental care',
  'Civil legal needs',
];

const alternateProgramTemplateCategories = [
  {
    previousNormalizedValues: ['diapers'],
    correctValue: 'Baby Supplies',
  },
  {
    previousNormalizedValues: ['housing'],
    correctValue: 'Managing housing costs',
  },
  {
    previousNormalizedValues: ['jobtraining'],
    correctValue: 'Job resources',
  },
  {
    previousNormalizedValues: [
      'achallengethatyou(oryourchild)havethatyoudbeinterestedintalkingwithsomeoneoutsideyourhouseholdabout',
    ],
    correctValue: 'Behavioral health',
  },
];

const normalizeDefaultMessage = (defaultMessage: string): string => {
  const whiteSpaceCommasApostropheHyphenMinusNumbersRegex = /\s|,|'|’|-|_|[0-9]/g;
  return defaultMessage.toLowerCase().replaceAll(whiteSpaceCommasApostropheHyphenMinusNumbersRegex, '');
};

const findClosestMatchingDefaultMessage = (defaultMessage: string): string => {
  console.log('defaultMessage 1', defaultMessage === '');
  // console.log({defaultMessage})
  // is the default message perfect?
  if (programTemplateCategories.includes(defaultMessage)) {
    return defaultMessage;
  }

  const normalizedDefaultMessage = normalizeDefaultMessage(defaultMessage);
  const maybeTheRightCategory = programTemplateCategories.find((programTemplate) => {
    return normalizeDefaultMessage(programTemplate) === normalizedDefaultMessage;
  });

  // is the default message invalid because of typos related to whitespace, comma, apostrophe,
  // hyphen or number characters?
  if (maybeTheRightCategory) {
    return maybeTheRightCategory;
  } else {
    // is the default message invalid because it uses different wordings
    // or does it have typos not related to whitespace, comma, apostrophe, hyphen or number characters?
    const maybeClosestMatchingCategory = alternateProgramTemplateCategories.find((programTemplate) => {
      console.log(programTemplate.previousNormalizedValues);
      console.log('defaultMessage 2', defaultMessage);
      console.log('normalizedDefaultMessage', normalizedDefaultMessage);
      return programTemplate.previousNormalizedValues.includes(normalizedDefaultMessage);
    });

    if (!maybeClosestMatchingCategory) {
      throw new Error(`CategoryName is undefined`);
    }
    return maybeClosestMatchingCategory.correctValue;
  }
};

export const cleanTranslationDefaultMessage = (translation: Translation) => {
  const cleanDefaultMessage = findClosestMatchingDefaultMessage(translation.default_message);

  return {
    default_message: cleanDefaultMessage,
    label: translation.label,
  };
};

export const cleanUpEnglishTranslations = (translations: Translation[]) => {
  const translationsWithNormalizedCategoryAndTypeValues = { ...translations };

  Object.keys(translations).forEach(translationKey => {
    const includesProgramCategory = translationKey.includes('program') && translationKey.includes('category');
    const includesProgramType = translationKey.includes('urgent_need') && translationKey.includes('type');

    if (includesProgramCategory || includesProgramType) {
      //then we want to change it's value in the translationsWithNormalizedCategoryAndTypeValues by
      //normalizing it's current value
      //then assigning it to the translationKey
      console.log({translationKey})
      const normalizedCategoryOrTypeValue = findClosestMatchingDefaultMessage(translationsWithNormalizedCategoryAndTypeValues[translationKey]);
      console.log({ normalizedCategoryOrTypeValue });
      translationsWithNormalizedCategoryAndTypeValues[translationKey] = normalizedCategoryOrTypeValue;
    }
  });

  console.log(translationsWithNormalizedCategoryAndTypeValues);
  return translationsWithNormalizedCategoryAndTypeValues;
};
