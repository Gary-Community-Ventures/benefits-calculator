import questions from './questions';
import type { QuestionNames } from '../Types/Questions';

export const startingQuestionNumber = 3;
const defaultStepDirectory: QuestionNames[] = [
  'zipcode',
  'healthInsurance',
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
const referrerStepDirectory: QuestionNames[] = [
  'zipcode',
  'healthInsurance',
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

export function getStepDirectory(referrer: string | undefined) {
  if (referrer) {
    // if referrer is not undefinded or '' skip the referrer question
    return referrerStepDirectory;
  }
  return defaultStepDirectory;
}

export function getStepNumber(name: QuestionNames, referrer: string | undefined) {
  const stepNumber = getStepDirectory(referrer).findIndex((question) => question === name);

  if (stepNumber === -1) {
    throw new Error('Step does not exist for this referrer');
  }

  return stepNumber + startingQuestionNumber;
}

export function getQuestion(stepNumber: number, referrer: string | undefined) {
  const stepName = getStepDirectory(referrer)[stepNumber - startingQuestionNumber];
  return questions[stepName];
}
