export type Expense = {
  expenseSourceName: string;
  expenseAmount: string;
};

export type IncomeStream = {
  incomeStreamName: string;
  incomeAmount: string;
  incomeFrequency: string;
  hoursPerWeek: string;
};

export type EnergyCalculatorFormData = {
  isHomeOwner: boolean;
  isRenter: boolean;
  electricProvider: string;
  gasProvider: string;
  electricityIsDisconnected: boolean;
  hasPastDueEnergyBills: boolean;
  hasOldCar: boolean
  needsWaterHeater: boolean;
  needsHvac: boolean;
  needsStove: boolean;
};

export type EnergyCalculatorMember = {
  survivingSpouse: boolean;
  receivesSsi: boolean;
};

export type HouseholdData = {
  id: number;
  frontendId: string;
  age?: number; // deprecated: used for historical screens only
  birthYear?: number;
  birthMonth?: number;
  relationshipToHH: string;
  conditions: Conditions;
  hasIncome: boolean;
  incomeStreams: IncomeStream[];
  energyCalculator?: EnergyCalculatorMember;
  healthInsurance?: HealthInsurance;
};

export type Benefits = {
  [key: string]: boolean;
};

export type HealthInsurance = {
  none: boolean;
  employer: boolean;
  private: boolean;
  medicaid: boolean;
  medicare: boolean;
  chp: boolean;
  emergency_medicaid: boolean;
  family_planning: boolean;
  va: boolean;
  mass_health: boolean;
};

export type SignUpInfo = {
  email: string;
  phone: string;
  firstName: string;
  lastName: string;
  hasUser: boolean;
  sendOffers: boolean;
  sendUpdates: boolean;
  commConsent: boolean;
  serverError?: boolean;
};

export type AcuteHHConditions = { [key: string]: boolean };

export type FormData = {
  isTest: boolean;
  isTestData?: boolean;
  frozen: boolean;
  externalID?: string;
  agreeToTermsOfService: boolean;
  is13OrOlder: boolean;
  zipcode: string;
  county: string;
  startTime: string;
  hasExpenses: string;
  expenses: Expense[];
  householdSize: number;
  householdData: HouseholdData[];
  householdAssets: number;
  hasBenefits: 'true' | 'false' | 'preferNotToAnswer';
  benefits: Benefits;
  referralSource?: string;
  immutableReferrer?: string;
  path?: string;
  signUpInfo: SignUpInfo;
  urlSearchParams: string;
  energyCalculator?: EnergyCalculatorFormData;
  acuteHHConditions: AcuteHHConditions;
};

export type Conditions = {
  student?: boolean;
  pregnant?: boolean;
  blindOrVisuallyImpaired?: boolean;
  disabled?: boolean;
  longTermDisability?: boolean;
};

export const isCustomTypedLocationState = (
  locationState: unknown,
): locationState is { routedFromConfirmationPg: boolean } => {
  return typeof locationState === 'object' && locationState !== null && 'routedFromConfirmationPg' in locationState;
};
