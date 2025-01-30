import {
  ApiEnergyCalculatorFormData,
  ApiEnergyCalculatorMember,
  ApiExpense,
  ApiFormData,
  ApiHouseholdMember,
  ApiIncome,
  ApiUser,
  ApiUserWriteOnly,
} from '../Types/ApiFormData.js';
import { EnergyCalculatorFormData, EnergyCalculatorMember, FormData, HouseholdData } from '../Types/FormData';
import { putScreen, postScreen, putUser } from '../apiCalls';
import { Language } from './languageOptions';
import { useContext } from 'react';
import { Context } from '../Components/Wrapper/Wrapper';
import { useParams } from 'react-router-dom';

const getScreensBody = (formData: FormData, languageCode: Language, whiteLabel: string) => {
  const householdMembers = getHouseholdMembersBodies(formData);
  const expenses = getExpensesBodies(formData);

  const screenBody: ApiFormData = {
    white_label: whiteLabel,
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
    household_assets: formData.householdAssets || 0,
    request_language_code: languageCode,
    energy_calculator: getEnergyCalculaorFormDataBody(formData.energyCalculator),
    has_benefits: formData.hasBenefits,
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
    has_erc: null,
    has_lifeline: formData.benefits.lifeline,
    has_leap: formData.benefits.leap,
    has_mydenver: formData.benefits.mydenver,
    has_nslp: formData.benefits.nslp,
    has_oap: formData.benefits.oap,
    has_pell_grant: formData.benefits.pell,
    has_nfp: formData.benefits.nfp,
    has_rtdlive: formData.benefits.rtdlive,
    has_snap: formData.benefits.snap,
    has_sunbucks: formData.benefits.sunbucks,
    has_ssdi: formData.benefits.ssdi,
    has_ssi: formData.benefits.ssi,
    has_cowap: formData.benefits.cowap,
    has_ubp: formData.benefits.ubp,
    has_tanf: formData.benefits.tanf,
    has_wic: formData.benefits.wic,
    has_upk: formData.benefits.upk,
    has_coctc: formData.benefits.coctc,
    has_fatc: formData.benefits.fatc,
    referral_source: formData.referralSource ?? null,
    referrer_code: formData.immutableReferrer ?? null,
    needs_food: formData.acuteHHConditions.food ?? null,
    needs_baby_supplies: formData.acuteHHConditions.babySupplies ?? null,
    needs_housing_help: formData.acuteHHConditions.housing ?? null,
    needs_mental_health_help: formData.acuteHHConditions.support ?? null,
    needs_child_dev_help: formData.acuteHHConditions.childDevelopment ?? null,
    needs_family_planning_help: formData.acuteHHConditions.familyPlanning ?? null,
    needs_job_resources: formData.acuteHHConditions.jobResources ?? null,
    needs_dental_care: formData.acuteHHConditions.dentalCare ?? null,
    needs_legal_services: formData.acuteHHConditions.legalServices ?? null,
  };

  return screenBody;
};

const getHouseholdMembersBodies = (formData: FormData): ApiHouseholdMember[] => {
  const householdMembers = formData.householdData.map((householdMember) => {
    return getHouseholdMemberBody(householdMember);
  });
  return householdMembers;
};

const getEnergyCalculaorMemberBody = (
  energyCalculatorMember: EnergyCalculatorMember | undefined,
): ApiEnergyCalculatorMember | null => {
  if (energyCalculatorMember === undefined) {
    return null;
  }

  return {
    surviving_spouse: energyCalculatorMember.survivingSpouse,
    disabled: energyCalculatorMember.disabled,
    receives_ssi: energyCalculatorMember.receivesSsi,
  };
};

const getEnergyCalculaorFormDataBody = (
  energyCalculatorFormData: EnergyCalculatorFormData | undefined,
): ApiEnergyCalculatorFormData | null => {
  if (energyCalculatorFormData === undefined) {
    return null;
  }

  return {
    is_home_owner: energyCalculatorFormData.isHomeOwner,
    is_renter: energyCalculatorFormData.isRenter,
    electric_provider: energyCalculatorFormData.electricProvider,
    gas_provider: energyCalculatorFormData.gasProvider,
    electricity_is_disconnected: energyCalculatorFormData.electricityIsDisconnected,
    has_past_due_energy_bills: energyCalculatorFormData.hasPastDueEnergyBills,
    needs_water_heater: energyCalculatorFormData.needsWaterHeater,
    needs_hvac: energyCalculatorFormData.needsHvac,
    needs_stove: energyCalculatorFormData.needsStove,
    needs_dryer: energyCalculatorFormData.needsDryer,
  };
};

const getHouseholdMemberBody = (householdMemberData: HouseholdData): ApiHouseholdMember => {
  const incomes = getIncomeStreamsBodies(householdMemberData);

  return {
    frontend_id: householdMemberData.frontendId,
    age: householdMemberData.age ?? null,
    birth_year: householdMemberData.birthYear ?? null,
    birth_month: householdMemberData.birthMonth ?? null,
    relationship: householdMemberData.relationshipToHH,
    student: householdMemberData.conditions.student,
    pregnant: householdMemberData.conditions.pregnant,
    visually_impaired: householdMemberData.conditions.blindOrVisuallyImpaired,
    disabled: householdMemberData.conditions.disabled,
    long_term_disability: householdMemberData.conditions.longTermDisability,
    has_income: householdMemberData.hasIncome,
    income_streams: incomes,
    energy_calculator: getEnergyCalculaorMemberBody(householdMemberData.energyCalculator),
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
    cell: phone ? phoneNumber : null,
    email: email ? email : null,
    first_name: firstName,
    last_name: lastName,
    tcpa_consent: commConsent,
    language_code: languageCode,
    send_offers: sendOffers,
    send_updates: sendUpdates,
  };

  return user;
};

export default function useScreenApi() {
  const { whiteLabel, locale } = useContext(Context);
  const { uuid } = useParams();

  return {
    updateScreen: async (formData: FormData) => {
      if (uuid === undefined) {
        return;
      }

      await putScreen(getScreensBody(formData, locale, whiteLabel), uuid);
    },
    createScreen: async (formData: FormData) => {
      return await postScreen(getScreensBody(formData, locale, whiteLabel));
    },
    updateUser: async (formData: FormData) => {
      const userBody = getUserBody(formData, locale);
      if (!formData.signUpInfo.hasUser && userBody.email_or_cell === '+1') {
        return;
      }

      if (uuid === undefined) {
        return;
      }

      await putUser(userBody, uuid);
    },
  };
}
