export interface Expense {
  expenseSourceName: string;
  expenseAmount: string;
}

export interface IncomeStream {
  incomeStreamName: string;
  incomeAmount: string;
  incomeFrequency: string;
  hoursPerWeek: string;
}

export interface HouseholdData {
  age: string;
  relationshipToHH: string;
  student: boolean;
  studentFulltime: boolean;
  pregnant: boolean;
  unemployed: boolean;
  unemployedWorkedInLast18Mos: boolean;
  blindOrVisuallyImpaired: boolean;
  disabled: boolean;
  veteran: boolean;
  hasIncome: boolean;
  incomeStreams: IncomeStream[];
}

export interface Benefits {
  acp: boolean;
  andcs: boolean;
  cccap: boolean;
  coctc: boolean;
  coeitc: boolean;
  coheadstart: boolean;
  coPropTaxRentHeatCreditRebate: boolean;
  ctc: boolean;
  dentallowincseniors: boolean;
  denverpresc: boolean;
  ede: boolean;
  eitc: boolean;
  erc: boolean;
  lifeline: boolean;
  leap: boolean;
  mydenver: boolean;
  nslp: boolean;
  oap: boolean;
  rtdlive: boolean;
  snap: boolean;
  ssi: boolean;
  tanf: boolean;
  upk: boolean;
  wic: boolean;
}

export interface HealthInsurance {
  employer: boolean;
  private: boolean;
  medicaid: boolean;
  medicare: boolean;
  chp: boolean;
  none: boolean;
}
export interface SignUpInfo {
  email: string;
  phone: string;
  firstName: string;
  lastName: string;
  hasUser: boolean;
  sendOffers: boolean;
  sendUpdates: boolean;
  commConsent: boolean;
}

export interface AcuteHHConditions {
  food: boolean;
  babySupplies: boolean;
  housing: boolean;
  support: boolean;
  childDevelopment: boolean;
  familyPlanning: boolean;
  jobResources: boolean;
  dentalCare: boolean;
}

export interface FormData {
  isTest?: boolean;
  externalID?: number;
  agreeToTermsOfService: boolean;
  zipcode: string;
  county: string;
  startTime: string;
  hasExpenses: boolean;
  expenses: Expense[];
  householdSize: string;
  householdData: HouseholdData[];
  householdAssets: number;
  hasBenefits: string;
  benefits: Benefits;
  healthInsurance: HealthInsurance;
  referralSource?: string;
  referrerCode?: string;
  otherSource?: string;
  signUpInfo: SignUpInfo;
  urlSearchParams: string;
  isBIAUser: boolean;
  acuteHHConditions: AcuteHHConditions;
}
