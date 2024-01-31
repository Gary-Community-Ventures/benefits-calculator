import { ApiIncome } from './ApiFormData';

export interface ConfigApiResponse {
  id: number;
  name: string;
  data: Record<string, any>; // defining as 'any' for now. should be redefined once API response model is finalized
  active: boolean;
}

export type Config = Record<string, number[] | Record<string, any>>;

export type ApiExpenses = {
  expenseSourceName: string;
  expenseAmount: number;
};

export type ApiBenefits = {
  acp: string;
  andcs: string;
  cccap: string;
  coeitc: string;
  coheadstart: string;
  coPropTaxRentHeatCreditRebate: string;
  ctc: string;
  dentallowincseniors: string;
  denverpresc: string;
  ede: string;
  eitc: string;
  erc: string;
  lifeline: string;
  leap: string;
  mydenver: string;
  nslp: string;
  oap: string;
  pell: string;
  rtdlive: string;
  snap: string;
  ssdi: string;
  ssi: string;
  tanf: string;
  wic: string;
  upk: string;
  coctc: string;
};

export type ApiAcuteHHConditions = {
  food: string;
  babySupplies: string;
  housing: string;
  support: string;
  childDevelopment: string;
  familyPlanning: string;
  jobResources: string;
  dentalCare: string;
  legalServices: string;
};

export type ApiSignupInfo = {
  email: string;
  phone: string;
  firstName: string;
  lastName: string;
  hasUser: boolean;
  sendOffers: boolean;
  sendUpdates: boolean;
  commConsent: boolean;
};

export type ApiConfig = {
  zipcode: string;
  county: string;
  householdSize: number;
  age: number;
  healthInsurance: string;
  isStudent: boolean;
  isPregnant: boolean;
  isBlindOrVisuallyImpaired: boolean;
  isDisabled: boolean;
  longTermDisability: boolean;
  hasIncome: string;
  incomeStreams: ApiIncome;
  hasExpenses: boolean;
  expenses: ApiExpenses;
  householdAssets: number;
  hasBenefits: string;
  benefits: ApiBenefits;
  acuteHHConditions: ApiAcuteHHConditions;
  referralSource: string;
  signUpInfo: ApiSignupInfo;
};
