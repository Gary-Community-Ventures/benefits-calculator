import { Language } from '../Assets/languageOptions';

export type ApiInsuranceReadOnly = {
  household_member: number;
};

export type ApiInsurance = {
  none: boolean;
  employer: boolean;
  private: boolean;
  chp: boolean;
  medicaid: boolean;
  medicare: boolean;
  emergency_medicaid: boolean;
  family_planning: boolean;
  va: boolean;
};

export type ApiIncomeReadOnly = {
  screen: number;
  household_member: number;
  id: number;
};

export type ApiIncome = {
  type: string | null;
  amount: number | null;
  frequency: string | null;
  hours_worked: number | null;
};

export type ApiHouseholdMemberReadOnly = {
  screen: number;
  id: number;
  income_streams: ApiIncomeReadOnly[];
  insurance: ApiInsuranceReadOnly;
};

export type ApiHouseholdMember = {
  age: number | null; // deprecated: used for historical screens only
  birth_year: number | null;
  birth_month: number | null;
  relationship: string | null;
  student: boolean | null;
  student_full_time?: boolean | null;
  pregnant: boolean | null;
  unemployed?: boolean | null;
  worked_in_last_18_mos?: boolean | null;
  visually_impaired: boolean | null;
  disabled: boolean | null;
  veteran?: boolean | null;
  medicaid?: boolean | null;
  disability_medicaid?: boolean | null;
  long_term_disability: boolean | null;
  has_income: boolean | null;
  income_streams: ApiIncome[];
  insurance: ApiInsurance;
};

export type ApiExpenseReadOnly = {
  screen: number;
  household_member: number;
  id: number;
};

export type ApiExpense = {
  type: string | null;
  amount: number | null;
  frequency: string | null;
};

export type ApiUserReadOnly = {
  id: number;
};

export type ApiUserWriteOnly = {
  cell: string | null;
  email: string | null;
  first_name: string | null;
  last_name: string | null;
  email_or_cell: string | null;
  language_code: Language | null;
  tcpa_consent: boolean;
};

export type ApiUser = {
  send_offers: boolean;
  send_updates: boolean;
};

export type ApiFormDataReadOnly = {
  id: number;
  frozen: boolean;
  uuid: string;
  submision_date: string | null;
  last_email_request_date: string | null;
  completed: boolean;
  user: ApiUser & ApiUserReadOnly;
  is_test_data: boolean | null;
  household_members: ApiHouseholdMemberReadOnly[];
  expenses: ApiExpenseReadOnly[];
};

export type ApiFormData = {
  is_test: boolean;
  start_date: string;
  agree_to_tos: boolean | null;
  is_13_or_older: boolean | null;
  zipcode: string | null;
  county: string | null;
  referral_source: string | null;
  referrer_code: string | null;
  household_size: number | null;
  household_assets: number | null;
  housing_situation?: string | null;
  household_members: ApiHouseholdMember[];
  last_tax_filing_year?: string | null;
  expenses: ApiExpense[];
  user?: ApiUserWriteOnly;
  external_id: string | null;
  request_language_code: Language | null;
  has_benefits: string | null;
  has_tanf: boolean | null;
  has_wic: boolean | null;
  has_snap: boolean | null;
  has_lifeline: boolean | null;
  has_acp: boolean | null;
  has_eitc: boolean | null;
  has_coeitc: boolean | null;
  has_nslp: boolean | null;
  has_ctc: boolean | null;
  has_medicaid?: boolean | null;
  has_rtdlive: boolean | null;
  has_cccap: boolean | null;
  has_mydenver: boolean | null;
  has_chp?: boolean | null;
  has_ccb?: boolean | null;
  has_ssi: boolean | null;
  has_andcs: boolean | null;
  has_chs: boolean | null;
  has_cpcr: boolean | null;
  has_cdhcs: boolean | null;
  has_dpp: boolean | null;
  has_ede: boolean | null;
  has_erc: boolean | null;
  has_leap: boolean | null;
  has_oap: boolean | null;
  has_coctc: boolean | null;
  has_upk: boolean | null;
  has_ssdi: boolean | null;
  has_cowap: boolean | null;
  has_ubp: boolean | null;
  has_pell_grant: boolean | null;
  has_nfp: boolean | null;
  has_fatc: boolean | null;
  has_employer_hi?: boolean | null;
  has_private_hi?: boolean | null;
  has_medicaid_hi?: boolean | null;
  has_medicare_hi?: boolean | null;
  has_chp_hi?: boolean | null;
  has_no_hi?: boolean | null;
  needs_food: boolean | null;
  needs_baby_supplies: boolean | null;
  needs_housing_help: boolean | null;
  needs_mental_health_help: boolean | null;
  needs_child_dev_help: boolean | null;
  needs_funeral_help?: boolean | null;
  needs_family_planning_help: boolean | null;
  needs_job_resources: boolean | null;
  needs_dental_care: boolean | null;
  needs_legal_services: boolean | null;
};
