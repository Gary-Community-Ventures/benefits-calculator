import {
  ApiExpense,
  ApiFormData,
  ApiHouseholdMember,
  ApiIncome,
  ApiUser,
  ApiUserWriteOnly,
} from '../Types/ApiFormData.js';
import { FormData, HouseholdData } from '../Types/FormData.js';
import { putScreen, postScreen, putUser } from '../apiCalls.js';
import { Language } from './languageOptions.js';

const getScreensBody = (formData: FormData, languageCode: Language) => {
  const householdMembers = getHouseholdMembersBodies(formData);
  const expenses = getExpensesBodies(formData);

  const finalReferralSource = formData.otherSource !== '' ? formData.otherSource : formData.referralSource;
  const screenBody: ApiFormData = {
    is_test: formData.isTest ?? false,
    external_id: formData.externalID ?? null,
    agree_to_tos: formData.agreeToTermsOfService,
    is_13_or_older: formData.is13OrOlder,
    zipcode: formData.zipcode,
    county: formData.county,
    start_date: formData.startTime,
    household_size: formData.householdSize === '' ? null : Number(formData.householdSize),
    household_members: householdMembers,
    expenses: expenses,
    household_assets: formData.householdAssets,
    request_language_code: languageCode,
    has_benefits: formData.hasBenefits ?? 'preferNotToAnswer',
    has_acp: formData.benefits.acp,
    has_andcs: formData.benefits.andcs,
    has_cccap: formData.benefits.cccap,
    has_coeitc: formData.benefits.coeitc,
    has_chs: formData.benefits.coheadstart,
    has_cpcr: formData.benefits.coPropTaxRentHeatCreditRebate,
    has_ctc: formData.benefits.ctc,
    has_cdhcs: formData.benefits.dentallowincseniors,
    has_dpp: formData.benefits.denverpresc,
    has_ede: formData.benefits.ede,
    has_eitc: formData.benefits.eitc,
    has_erc: formData.benefits.erc,
    has_lifeline: formData.benefits.lifeline,
    has_leap: formData.benefits.leap,
    has_mydenver: formData.benefits.mydenver,
    has_nslp: formData.benefits.nslp,
    has_oap: formData.benefits.oap,
    has_pell_grant: formData.benefits.pell,
    has_rtdlive: formData.benefits.rtdlive,
    has_snap: formData.benefits.snap,
    has_ssdi: formData.benefits.ssdi,
    has_ssi: formData.benefits.ssi,
    has_tanf: formData.benefits.tanf,
    has_wic: formData.benefits.wic,
    has_upk: formData.benefits.upk,
    has_coctc: formData.benefits.coctc,
    referral_source: finalReferralSource ?? null,
    referrer_code: formData.immutableReferrer ?? null,
    needs_food: formData.acuteHHConditions.food,
    needs_baby_supplies: formData.acuteHHConditions.babySupplies,
    needs_housing_help: formData.acuteHHConditions.housing,
    needs_mental_health_help: formData.acuteHHConditions.support,
    needs_child_dev_help: formData.acuteHHConditions.childDevelopment,
    needs_family_planning_help: formData.acuteHHConditions.familyPlanning,
    needs_job_resources: formData.acuteHHConditions.jobResources,
    needs_dental_care: formData.acuteHHConditions.dentalCare,
    needs_legal_services: formData.acuteHHConditions.legalServices,
  };

  return screenBody;
};

const getHouseholdMembersBodies = (formData: FormData): ApiHouseholdMember[] => {
  const householdMembers = formData.householdData.map((householdMember) => {
    return getHouseholdMemberBody(householdMember);
  });
  return householdMembers;
};

const getHouseholdMemberBody = (householdMemberData: HouseholdData): ApiHouseholdMember => {
  const incomes = getIncomeStreamsBodies(householdMemberData);

  return {
    age: Number(householdMemberData.age),
    relationship: householdMemberData.relationshipToHH,
    student: householdMemberData.conditions.student,
    pregnant: householdMemberData.conditions.pregnant,
    visually_impaired: householdMemberData.conditions.blindOrVisuallyImpaired,
    disabled: householdMemberData.conditions.disabled,
    long_term_disability: householdMemberData.conditions.longTermDisability,
    has_income: householdMemberData.hasIncome,
    income_streams: incomes,
    insurance: householdMemberData.healthInsurance,
  };
};

const getIncomeStreamsBodies = (householdMemberData: HouseholdData): ApiIncome[] => {
  return householdMemberData.incomeStreams.map((incomeStream) => {
    return {
      type: incomeStream.incomeStreamName,
      amount: Number(incomeStream.incomeAmount),
      frequency: incomeStream.incomeFrequency,
      hours_worked: Number(incomeStream.hoursPerWeek) ?? null,
    };
  });
};

const getExpensesBodies = (formData: FormData): ApiExpense[] => {
  return formData.expenses.map((expense) => {
    return {
      type: expense.expenseSourceName,
      amount: expense.expenseAmount === '' ? 0 : Number(expense.expenseAmount),
      frequency: 'monthly',
    };
  });
};

const getUserBody = (formData: FormData, languageCode: Language): ApiUser & ApiUserWriteOnly => {
  const { email, phone, firstName, lastName, sendUpdates, sendOffers, commConsent } = formData.signUpInfo;
  const phoneNumber = '+1' + phone;

  const user: ApiUser & ApiUserWriteOnly = {
    email_or_cell: email ? email : phoneNumber,
    cell: phone ? phoneNumber : '',
    email: email ? email : '',
    first_name: firstName,
    last_name: lastName,
    tcpa_consent: commConsent,
    language_code: languageCode,
    send_offers: sendOffers,
    send_updates: sendUpdates,
  };

  return user;
};

const updateScreen = (uuid: string, formData: FormData, languageCode: Language) => {
  putScreen(getScreensBody(formData, languageCode), uuid);
};

const createScreen = (formData: FormData, languageCode: Language) => {
  const uuid = postScreen(getScreensBody(formData, languageCode));
  return uuid;
};

const updateUser = async (
  uuid: string,
  formData: FormData,
  setFormData: (formData: FormData) => void,
  languageCode: Language,
) => {
  const userBody = getUserBody(formData, languageCode);
  if (!formData.signUpInfo.hasUser && userBody.email_or_cell === '+1') {
    return;
  }
  try {
    await putUser(userBody, uuid);
  } catch (err) {
    return;
  }
  setFormData({
    ...formData,
    signUpInfo: { ...formData.signUpInfo, hasUser: true },
  });
};

export { updateScreen, createScreen, updateUser };
