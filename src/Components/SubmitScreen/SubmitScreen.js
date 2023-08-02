import Loading from '../Loading/Loading';
import { postScreen, postUser } from '../../apiCalls';
import { Context } from '../Wrapper/Wrapper.tsx';
import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const SubmitScreen = () => {
  const { locale, formData, setFormData } = useContext(Context);
  const navigate = useNavigate();
  useEffect(() => {
    fetchResults();
  }, []);

  const fetchResults = async () => {
    let userId = 0;

    if (formData.signUpInfo.sendOffers || formData.signUpInfo.sendUpdates) {
      userId = await postUserSignUpInfo();
    }

    const screensBody = getScreensBody(formData, locale.toLowerCase(), userId);
    const screensResponse = await postScreen(screensBody);
    setFormData({ ...formData, screenUUID: screensResponse.uuid });
    navigate(`/${screensResponse.uuid}/results`, { replace: true });
  };

  const getScreensBody = (formData, languageCode, userId) => {
    const {
      agreeToTermsOfService,
      zipcode,
      county,
      householdSize,
      householdAssets,
      startTime,
      isTest,
      externalID,
      benefits,
      healthInsurance,
      referralSource,
      referrerCode,
      otherSource,
      acuteHHConditions,
      hasBenefits,
    } = formData;

    const householdMembers = getHouseholdMembersBodies(formData);
    const expenses = getExpensesBodies(formData);

    const finalReferralSource = otherSource !== '' ? otherSource : referralSource;
    const screenBody = {
      is_test: isTest,
      external_id: externalID,
      agree_to_tos: agreeToTermsOfService,
      zipcode: zipcode,
      county: county,
      start_date: startTime,
      household_size: householdSize,
      household_members: householdMembers,
      expenses: expenses,
      household_assets: householdAssets,
      request_language_code: languageCode,
      has_benefits: hasBenefits,
      has_acp: benefits.acp,
      has_andcs: benefits.andcs,
      has_cccap: benefits.cccap,
      has_coctc: benefits.coctc,
      has_coeitc: benefits.coeitc,
      has_chs: benefits.coheadstart,
      has_cpcr: benefits.coPropTaxRentHeatCreditRebate,
      has_ctc: benefits.ctc,
      has_cdhcs: benefits.dentallowincseniors,
      has_dpp: benefits.denverpresc,
      has_ede: benefits.ede,
      has_eitc: benefits.eitc,
      has_erc: benefits.erc,
      has_lifeline: benefits.lifeline,
      has_leap: benefits.leap,
      has_mydenver: benefits.mydenver,
      has_nslp: benefits.nslp,
      has_oap: benefits.oap,
      has_rtdlive: benefits.rtdlive,
      has_snap: benefits.snap,
      has_ssi: benefits.ssi,
      has_tanf: benefits.tanf,
      has_upk: benefits.upk,
      has_wic: benefits.wic,
      has_employer_hi: healthInsurance.employer,
      has_private_hi: healthInsurance.private,
      has_medicaid_hi: healthInsurance.medicaid,
      has_medicare_hi: healthInsurance.medicare,
      has_chp_hi: healthInsurance.chp,
      has_no_hi: healthInsurance.none,
      referral_source: finalReferralSource,
      referrer_code: referrerCode,
      needs_food: acuteHHConditions.food,
      needs_baby_supplies: acuteHHConditions.babySupplies,
      needs_housing_help: acuteHHConditions.housing,
      needs_mental_health_help: acuteHHConditions.support,
      needs_child_dev_help: acuteHHConditions.childDevelopment,
      needs_family_planning_help: acuteHHConditions.familyPlanning,
      needs_job_resources: formData.acuteHHConditions.jobResources
    };

    if (userId !== 0 && userId !== false) {
      screenBody.user = userId;
    }

    return screenBody;
  };

  const getHouseholdMembersBodies = (formData) => {
    const householdMembers = formData.householdData.map((householdMember) => {
      return getHouseholdMemberBody(householdMember);
    });
    return householdMembers;
  };

  const getHouseholdMemberBody = (householdMemberData) => {
    const {
      relationshipToHH,
      age,
      student,
      studentFulltime,
      pregnant,
      unemployed,
      unemployedWorkedInLast18Mos,
      blindOrVisuallyImpaired,
      disabled,
      veteran,
      medicaid,
      disabilityRelatedMedicaid,
      hasIncome,
    } = householdMemberData;

    const incomes = getIncomeStreamsBodies(householdMemberData);

    return {
      relationship: relationshipToHH,
      age: Number(age),
      student: student,
      student_full_time: studentFulltime,
      pregnant: pregnant,
      unemployed: unemployed,
      worked_in_last_18_mos: unemployedWorkedInLast18Mos,
      visually_impaired: blindOrVisuallyImpaired,
      disabled: disabled,
      veteran: veteran,
      medicaid: medicaid,
      disability_medicaid: disabilityRelatedMedicaid,
      has_income: hasIncome,
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

  const postUserSignUpInfo = async () => {
    const { email, phone, firstName, lastName, sendUpdates, sendOffers, commConsent } = formData.signUpInfo;
    const lowerCaseLocale = locale.toLowerCase();
    const phoneNumber = '+1' + phone;

    const user = {
      email_or_cell: email ? email : phoneNumber,
      cell: phone ? phoneNumber : '',
      email: email ? email : '',
      first_name: firstName,
      last_name: lastName,
      tcpa_consent: commConsent,
      language_code: lowerCaseLocale,
      send_offers: sendOffers,
      send_updates: sendUpdates,
    };

    try {
      const userSignUpResponse = await postUser(user); //this should return what's on the swagger docs
      return userSignUpResponse.id;
    } catch {
      return false;
    }
  };

  return (
    <main>
      <Loading />
    </main>
  );
};
export default SubmitScreen;
