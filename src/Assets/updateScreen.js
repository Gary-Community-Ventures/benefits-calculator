import { putScreen, postScreen, putUser } from '../apiCalls.js';

const getScreensBody = (formData, languageCode) => {
  const householdMembers = getHouseholdMembersBodies(formData);
  const expenses = getExpensesBodies(formData);

  const finalReferralSource = formData.otherSource !== '' ? formData.otherSource : formData.referralSource;
  const screenBody = {
    is_test: formData.isTest,
    external_id: formData.externalID,
    agree_to_tos: formData.agreeToTermsOfService,
    is_13_or_older: formData.is13OrOlder,
    zipcode: formData.zipcode,
    county: formData.county,
    start_date: formData.startTime,
    household_size: formData.householdSize === '' ? null : formData.householdSize,
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
    referral_source: finalReferralSource,
    referrer_code: formData.immutableReferrer,
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

const getHouseholdMembersBodies = (formData) => {
  const householdMembers = formData.householdData.map((householdMember) => {
    return getHouseholdMemberBody(householdMember);
  });
  return householdMembers;
};

const getHouseholdMemberBody = (householdMemberData) => {
  const incomes = getIncomeStreamsBodies(householdMemberData);

  return {
    relationship: householdMemberData.relationshipToHH,
    age: Number(householdMemberData.age),
    student: householdMemberData.student,
    pregnant: householdMemberData.pregnant,
    visually_impaired: householdMemberData.blindOrVisuallyImpaired,
    disabled: householdMemberData.disabled,
    medicaid: householdMemberData.medicaid,
    disability_medicaid: householdMemberData.disabilityRelatedMedicaid,
    has_income: householdMemberData.hasIncome,
    income_streams: incomes,
  };
};

const getIncomeStreamsBodies = (householdMemberData) => {
  return householdMemberData.incomeStreams.map((incomeStream) => {
    return {
      type: incomeStream.incomeStreamName,
      amount: Number(incomeStream.incomeAmount),
      frequency: incomeStream.incomeFrequency,
      hours_worked: Number(incomeStream.hoursPerWeek) ?? null,
    };
  });
};

const getExpensesBodies = (formData) => {
  return formData.expenses.map((expense) => {
    return {
      type: expense.expenseSourceName,
      amount: expense.expenseAmount,
      frequency: 'monthly',
    };
  });
};

const getUserBody = (formData, languageCode) => {
  const { email, phone, firstName, lastName, sendUpdates, sendOffers, commConsent } = formData.signUpInfo;
  const phoneNumber = '+1' + phone;

  const user = {
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

const updateScreen = (uuid, formData, languageCode) => {
  putScreen(getScreensBody(formData, languageCode), uuid);
};

const createScreen = (formData) => {
  const uuid = postScreen(getScreensBody(formData));
  return uuid;
};

const updateUser = async (uuid, formData, setFormData, languageCode) => {
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
