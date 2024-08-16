import questions from './questions';
import type { QuestionName } from '../Types/Questions';

export const STARTING_QUESTION_NUMBER = 3;
// update pageTitleTags.ts if the step order changes
const defaultStepDirectory: QuestionName[] = [
  'zipcode',
  //the hhSize and hhData have to be consecutive
  'householdSize',
  'householdData',
  'hasExpenses',
  'householdAssets',
  'hasBenefits',
  'acuteHHConditions',
  'referralSource',
  'signUpInfo',
];
const referrerStepDirectory: QuestionName[] = [
  'zipcode',
  //the hhSize and hhData have to be consecutive
  'householdSize',
  'householdData',
  'hasExpenses',
  'householdAssets',
  'hasBenefits',
  'acuteHHConditions',
  'referralSource',
  'signUpInfo',
];
const noSignUpStepDirectory: QuestionName[] = [
  'zipcode',
  //the hhSize and hhData have to be consecutive
  'householdSize',
  'householdData',
  'hasExpenses',
  'householdAssets',
  'hasBenefits',
  'acuteHHConditions',
  'referralSource',
];

export function getStepDirectory(referrer: string | undefined) {
  if (referrer === 'ccig') {
    return noSignUpStepDirectory;
  }
  if (referrer) {
    // if referrer is not undefinded or '' skip the referrer question
    return referrerStepDirectory;
  }
  return defaultStepDirectory;
}

export function getStepNumber(name: QuestionName, referrer: string | undefined) {
  const stepNumber = getStepDirectory(referrer).findIndex((question) => question === name);

  if (stepNumber === -1) {
    throw new Error('Step does not exist for this referrer');
  }

  return stepNumber + STARTING_QUESTION_NUMBER;
}

export function getQuestion(stepNumber: number, referrer: string | undefined) {
  const stepName = getStepDirectory(referrer)[stepNumber - STARTING_QUESTION_NUMBER];
  return questions[stepName];
}
