import { useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getScreen } from '../../apiCalls';
import referralOptions from '../../Assets/referralOptions';
import { Context } from '../Wrapper/Wrapper.tsx';
import LoadingPage from '../LoadingPage/LoadingPage.tsx';

const FetchScreen = () => {
  const { formData, setFormData, screenDoneLoading } = useContext(Context);
  const { uuid } = useParams();
  const navigate = useNavigate();

  const fetchScreen = async (uuid) => {
    try {
      const response = await getScreen(uuid);
      createFormData(response);
    } catch (err) {
      navigate('/step-1');
      return;
    }
    screenDoneLoading();
  };

  const createFormData = (response) => {
    let otherRefferer = '';
    let referrer = response.referral_source;
    if (!referrer) {
      referrer = '';
    } else if (!(referrer in referralOptions)) {
      referrer = 'other';
      otherRefferer = response.referral_source;
    }

    const initialFormData = {
      screenUUID: response.uuid,
      isTest: response.is_test ?? false,
      externalID: response.external_id,
      agreeToTermsOfService: response.agree_to_tos ?? false,
      is13OrOlder: response.is_13_or_older ?? false,
      zipcode: response.zipcode ?? '',
      county: response.county ?? '',
      startTime: response.start_date ?? formData.startTime,
      hasExpenses: false,
      expenses: [],
      householdSize: response.household_size ?? '',
      householdData: [],
      householdAssets: Math.round(response.household_assets) ?? 0,
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
        erc: response.has_erc ?? false,
        lifeline: response.has_lifeline ?? false,
        leap: response.has_leap ?? false,
        mydenver: response.has_mydenver ?? false,
        nslp: response.has_nslp ?? false,
        oap: response.has_oap ?? false,
        rtdlive: response.has_rtdlive ?? false,
        snap: response.has_snap ?? false,
        ssi: response.has_ssi ?? false,
        tanf: response.has_tanf ?? false,
        wic: response.has_wic ?? false,
        upk: response.has_upk ?? false,
        coctc: response.has_coctc ?? false,
      },
      healthInsurance: {
        employer: response.has_employer_hi ?? false,
        private: response.has_private_hi ?? false,
        medicaid: response.has_medicaid_hi ?? false,
        medicare: response.has_medicare_hi ?? false,
        chp: response.has_chp_hi ?? false,
        none: response.has_no_hi ?? false,
      },
      referralSource: referrer,
      immutableReferrer: response.referrer_code,
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
    for (const member of response.household_members) {
      const incomes = [];
      for (const income of member.income_streams) {
        incomes.push({
          incomeStreamName: income.type ?? '',
          incomeAmount: income.amount ?? '',
          incomeFrequency: income.frequency ?? '',
          hoursPerWeek: income.hours_worked ?? '',
        });
      }
      initialFormData.householdData.push({
        age: String(member.age) ?? '',
        relationshipToHH: member.relationship ? member.relationship : defaultRelationship,
        student: member.student ?? false,
        pregnant: member.pregnant ?? false,
        blindOrVisuallyImpaired: member.visually_impaired ?? false,
        disabled: member.disabled ?? false,
        hasIncome: member.has_income ?? false,
        incomeStreams: incomes,
      });
      defaultRelationship = '';
    }

    for (const expense of response.expenses) {
      initialFormData.hasExpenses = true;
      initialFormData.expenses.push({
        expenseSourceName: expense.type ?? '',
        expenseAmount: Math.round(expense.amount) ?? '',
      });
    }
    setFormData({ ...formData, ...initialFormData });
  };

  useEffect(() => {
    fetchScreen(uuid);
  }, []);

  return <LoadingPage />;
};

export default FetchScreen;
