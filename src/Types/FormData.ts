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
  pregnant: boolean;
  blindOrVisuallyImpaired: boolean;
  disabled: boolean;
  longTermDisability: boolean;
  hasIncome: boolean;
  incomeStreams: IncomeStream[];
  healthInsurance: HealthInsurance;
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
  pell: boolean;
  rtdlive: boolean;
  snap: boolean;
  ssdi: boolean;
  ssi: boolean;
  tanf: boolean;
  upk: boolean;
  wic: boolean;
}

export interface HealthInsurance {
  none: boolean;
  employer: boolean;
  private: boolean;
  medicaid: boolean;
  medicare: boolean;
  chp: boolean;
  dont_know: boolean;
  emergency_medicaid: boolean;
  family_planning: boolean;
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
  serverError?: boolean;
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
  legalServices: boolean;
}

export interface FormData {
  isTest?: boolean;
  externalID?: string;
  agreeToTermsOfService: boolean;
  is13OrOlder: boolean;
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
  referralSource?: string;
  immutableReferrer?: string;
  otherSource?: string;
  signUpInfo: SignUpInfo;
  urlSearchParams: string;
  acuteHHConditions: AcuteHHConditions;
}
