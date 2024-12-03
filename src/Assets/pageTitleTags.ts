import { QuestionName } from '../Types/Questions';

export const QUESTION_TITLES: Record<QuestionName, string> = {
  zipcode: 'Zip and County',
  householdSize: 'Number of Household Members',
  householdData: 'Household Member',
  hasExpenses: 'Expenses',
  householdAssets: 'Assets',
  hasBenefits: 'Existing Benefits',
  acuteHHConditions: 'Near Term Help',
  referralSource: 'Referral',
  signUpInfo: 'Optional Sign Up',
};

export type OtherStepName = 'language' | 'disclaimer' | 'state' | 'confirmation' | 'results' | 'default';

export const OTHER_PAGE_TITLES: Record<OtherStepName, string> = {
  language: 'Preferred Language',
  disclaimer: 'Legal',
  state: 'State',
  confirmation: 'Confirmation',
  results: 'Results',
  default: 'MyFriendBen',
};
