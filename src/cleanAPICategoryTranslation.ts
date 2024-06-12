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
];

const normalizeDefaultMessage = (defaultMessage: string): string => {
  const whiteSpaceCommasApostropheHyphenMinusNumbersRegex = /\s|,|'|-|[0-9]/g;
  return defaultMessage.toLowerCase().replaceAll(whiteSpaceCommasApostropheHyphenMinusNumbersRegex, '');
};

const findClosestMatchingDefaultMessage = (defaultMessage: string): string => {
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
    const maybeClosestMatchingCategory = alternateProgramTemplateCategories.find((programTemplate) =>
      programTemplate.previousNormalizedValues.includes(normalizedDefaultMessage),
    );

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
