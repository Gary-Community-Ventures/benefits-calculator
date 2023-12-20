export type StepName =
  | 'step-1'
  | 'step-2'
  | 'step-3'
  | 'step-4'
  | 'step-5'
  | 'step-6'
  | 'step-7'
  | 'step-8'
  | 'step-9'
  | 'step-10'
  | 'step-11'
  | 'confirm-information'
  | 'results';

const pageTitleTags: Record<StepName, string> = {
  'step-1': 'Preferred Language',
  'step-2': 'Legal',
  'step-3': 'Zip and County',
  'step-4': 'Number of HH Members',
  'step-5': 'Individual HH Member',
  'step-6': 'Expenses',
  'step-7': 'Assets',
  'step-8': 'Existing Benefits',
  'step-9': 'Near Term Help',
  'step-10': 'Referral',
  'step-11': 'Optional Sign Up',
  'confirm-information': 'Confirmation',
  results: 'Results',
};

export default pageTitleTags;
