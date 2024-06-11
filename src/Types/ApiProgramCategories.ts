import { Translation } from "./Results";

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
    correctValue: 'Baby Supplies'
  },
 {
    previousNormalizedValues: ['housing'],
    correctValue: 'Managing housing costs'
  },
 {
    previousNormalizedValues:['jobtraining'],
    correctValue: 'Job resources'
  },
];

const normalizeDefaultMessage = (defaultMessage: string): string => {
    const whiteSpaceCommasApostropheOrHyphenMinusRegex = /\s|,|'|-/g;
    return defaultMessage.toLowerCase()
      .replaceAll(whiteSpaceCommasApostropheOrHyphenMinusRegex, '');
};

const findClosestMatchingDefaultMessage = (defaultMessage: string): string => {
  // is the default message perfect?
  if (programTemplateCategories.includes(defaultMessage)) {
    return defaultMessage;
  };


  const normalizedDefaultMessage = normalizeDefaultMessage(defaultMessage);
  // if not, we normalize the programTemplate categories first
  //then find where in that array it matches with the normalizedDefaultMessage
  //and return the value at that
  const maybeTheRightCategory = programTemplateCategories.find((programTemplate) => {
    return normalizeDefaultMessage(programTemplate) === normalizedDefaultMessage;
  });


  // is the default message invalid because of whitespace, commas, apostrophes, or hyphens?
  if (maybeTheRightCategory) {
    return maybeTheRightCategory;
  } else {
    // is the default message invalid because it uses different wordings
    // or does it have typos not related to whitespace, comma, apostrophe, or hyphen characters?
    const maybeClosestMatchingCategory = alternateProgramTemplateCategories.find((programTemplate) => programTemplate.previousNormalizedValues.includes(normalizedDefaultMessage));

    if (!maybeClosestMatchingCategory) {
      throw new Error(`CategoryName is undefined`)
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