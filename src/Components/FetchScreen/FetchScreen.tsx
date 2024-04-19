import { useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useConfig } from '../Config/configHooks.tsx';
import { getScreen } from '../../apiCalls.js';
import { Context } from '../Wrapper/Wrapper.tsx';
import LoadingPage from '../LoadingPage/LoadingPage.tsx';
import type { ApiFormData, ApiFormDataReadOnly } from '../../Types/ApiFormData.ts';
import type { FormData } from '../../Types/FormData.ts';

const FetchScreen = () => {
  const { formData, setFormData, screenDoneLoading } = useContext(Context);
  const referralOptions = useConfig('referral_options');
  const { uuid } = useParams();
  const navigate = useNavigate();

  const fetchScreen = async (uuid: string) => {
    try {
      const response = await getScreen(uuid);
      createFormData(response);
    } catch (err) {
      navigate('/step-1');
      return;
    }
    screenDoneLoading();
  };

  const createFormData = (response: ApiFormDataReadOnly & ApiFormData) => {
    let otherRefferer = '';
    let referrer = response.referral_source;
    if (!referrer) {
      referrer = '';
    } else if (!(referrer in referralOptions)) {
      otherRefferer = referrer;
      referrer = 'other';
    }

    const initialFormData: FormData = {
      ...formData,
      isTest: response.is_test ?? false,
      externalID: response.external_id ?? undefined,
      agreeToTermsOfService: response.agree_to_tos ?? false,
      is13OrOlder: response.is_13_or_older ?? false,
      zipcode: response.zipcode ?? '',
      county: response.county ?? '',
      startTime: response.start_date ?? formData.startTime,
      hasExpenses: false,
      expenses: [],
      householdSize: String(response.household_size ?? ''),
      householdData: [],
      householdAssets: Math.round(response.household_assets ?? 0),
      hasBenefits: response.has_benefits ?? 'preferNotToAnswer',
      benefits: {
        acp: response.has_acp ?? false,
        andcs: response.has_andcs ?? false,
        cccap: response.has_cccap ?? false,
        coeitc: response.has_coeitc ?? false,
        coheadstart: response.has_chs ?? false,
        coPropTaxRentHeatCreditRebate: response.has_cpcr ?? false,
        ctc: response.has_ctc ?? false,
        dentallowincseniors: response.has_cdhcs ?? false,
        denverpresc: response.has_dpp ?? false,
        ede: response.has_ede ?? false,
        eitc: response.has_eitc ?? false,
        lifeline: response.has_lifeline ?? false,
        leap: response.has_leap ?? false,
        mydenver: response.has_mydenver ?? false,
        nslp: response.has_nslp ?? false,
        oap: response.has_oap ?? false,
        pell: response.has_pell_grant ?? false,
        rtdlive: response.has_rtdlive ?? false,
        snap: response.has_snap ?? false,
        ssdi: response.has_ssdi ?? false,
        ssi: response.has_ssi ?? false,
        tanf: response.has_tanf ?? false,
        wic: response.has_wic ?? false,
        upk: response.has_upk ?? false,
        coctc: response.has_coctc ?? false,
        cowap: response.has_cowap ?? false,
        ubp: response.has_ubp ?? false,
      },
      referralSource: referrer,
      immutableReferrer: response.referrer_code ?? undefined,
      otherSource: otherRefferer,
      acuteHHConditions: {
        food: response.needs_food ?? false,
        babySupplies: response.needs_baby_supplies ?? false,
        housing: response.needs_housing_help ?? false,
        support: response.needs_mental_health_help ?? false,
        childDevelopment: response.needs_child_dev_help ?? false,
        familyPlanning: response.needs_family_planning_help ?? false,
        jobResources: response.needs_job_resources ?? false,
        dentalCare: response.needs_dental_care ?? false,
        legalServices: response.needs_legal_services ?? false,
      },
      signUpInfo: {
        email: '',
        phone: '',
        firstName: '',
        lastName: '',
        hasUser: Boolean(response.user),
        sendOffers: response.user?.send_offers ?? false,
        sendUpdates: response.user?.send_updates ?? false,
        commConsent: false,
      },
    };

    let defaultRelationship = 'headOfHousehold';
    const initialHHMHealthInsurance = {
      none: false,
      employer: false,
      private: false,
      medicaid: false,
      medicare: false,
      chp: false,
      emergency_medicaid: false,
      family_planning: false,
      dont_know: false,
    };

    for (const member of response.household_members) {
      const incomes = [];
      for (const income of member.income_streams) {
        incomes.push({
          incomeStreamName: income.type ?? '',
          incomeAmount: String(income.amount) ?? '',
          incomeFrequency: income.frequency ?? '',
          hoursPerWeek: String(income.hours_worked) ?? '',
        });
      }

      initialFormData.householdData.push({
        age: String(member.age) ?? '',
        relationshipToHH: member.relationship ? member.relationship : defaultRelationship,
        conditions: {
          student: member.student ?? false,
          pregnant: member.pregnant ?? false,
          blindOrVisuallyImpaired: member.visually_impaired ?? false,
          disabled: member.disabled ?? false,
          longTermDisability: member.long_term_disability ?? false,
        },
        hasIncome: member.has_income ?? false,
        incomeStreams: incomes,
        healthInsurance: member.insurance ?? initialHHMHealthInsurance,
      });
      defaultRelationship = '';
    }

    for (const expense of response.expenses) {
      initialFormData.hasExpenses = true;
      initialFormData.expenses.push({
        expenseSourceName: expense.type ?? '',
        expenseAmount: expense.amount ? String(Math.round(expense.amount)) : '',
      });
    }
    setFormData({ ...initialFormData });
  };

  useEffect(() => {
    // https://stackoverflow.com/questions/20041051/how-to-judge-a-string-is-uuid-type
    const uuidRegx = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
    if (uuid === undefined || !uuid.match(uuidRegx)) {
      screenDoneLoading();
      return;
    }
    fetchScreen(uuid);
  }, [uuid]);

  return <LoadingPage />;
};

export default FetchScreen;
