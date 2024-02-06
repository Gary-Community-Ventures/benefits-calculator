import { CssBaseline, createTheme, ThemeProvider } from '@mui/material';
import { useState, useEffect, useContext } from 'react';
import { useNavigate, useLocation, Navigate, Routes, Route, useSearchParams } from 'react-router-dom';
import { LicenseInfo } from '@mui/x-license-pro';
import { Context } from './Components/Wrapper/Wrapper';
import FetchScreen from './Components/FetchScreen/FetchScreen';
import QuestionComponentContainer from './Components/QuestionComponentContainer/QuestionComponentContainer';
import Confirmation from './Components/Confirmation/Confirmation';
import Results from './Components/Results/Results';
import LandingPage from './Components/LandingPage/LandingPage';
import HouseholdDataBlock from './Components/HouseholdDataBlock/HouseholdDataBlock.js';
import ProgressBar from './Components/ProgressBar/ProgressBar';
import referralOptions from './Assets/referralOptions';
import JeffcoLandingPage from './Components/JeffcoComponents/JeffcoLandingPage/JeffcoLandingPage';
import LoadingPage from './Components/LoadingPage/LoadingPage.tsx';
import SelectLanguagePage from './Components/SelectLanguagePage/SelectLanguagePage.tsx';
import { updateScreen, updateUser } from './Assets/updateScreen.ts';
import { getStepDirectory, STARTING_QUESTION_NUMBER, getStepNumber } from './Assets/stepDirectory';
import Box from '@mui/material/Box';
import { Expense, HealthInsurance, HouseholdData, IncomeStream, SignUpInfo } from './Types/FormData.js';
import { BrandedFooter, BrandedHeader } from './Components/Referrer/Referrer.tsx';
import { useErrorController } from './Assets/validationFunctions.tsx';
import dataLayerPush from './Assets/analytics.ts';
import pageTitleTags, { StepName } from './Assets/pageTitleTags.ts';
import './App.css';
LicenseInfo.setLicenseKey(process.env.REACT_APP_MUI_LICENSE_KEY + '=');

const App = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const urlSearchParams = location.search;
  const [searchParams] = useSearchParams();
  const isTest = searchParams.get('test') ? true : false;
  const rawExternalId = searchParams.get('externalid');
  const externalId = rawExternalId !== null ? rawExternalId : undefined;
  const {
    locale,
    formData,
    setFormData,
    styleOverride,
    setTheme: changeTheme,
    pageIsLoading,
    getReferrer,
  } = useContext(Context);
  const [totalSteps, setTotalSteps] = useState(
    getStepDirectory(formData.immutableReferrer).length + STARTING_QUESTION_NUMBER,
  );
  const [theme, setTheme] = useState(createTheme(styleOverride));

  useEffect(() => {
    changeTheme(getReferrer('theme') as 'default' | 'twoOneOne');
  }, [getReferrer('theme')]);

  useEffect(() => {
    setTotalSteps(getStepDirectory(formData.immutableReferrer).length + STARTING_QUESTION_NUMBER);
  }, [formData.immutableReferrer]);

  useEffect(() => {
    setTheme(createTheme(styleOverride));
  }, [styleOverride]);

  useEffect(() => {
    dataLayerPush({
      event: 'Page Change',
      url: window.location.pathname + window.location.search,
    });
  }, [location.pathname]);

  useEffect(() => {
    const stepString = location.pathname.split('/').filter((string) => string.includes('step'))[0] as StepName;
    const isConfirmationPage = location.pathname.includes('confirm-information');
    const isResultsPage = location.pathname.includes('results');

    if (isConfirmationPage) {
      document.title = pageTitleTags['confirm-information'];
    } else if (isResultsPage) {
      document.title = pageTitleTags['results'];
    } else if (pageTitleTags[stepString]) {
      document.title = pageTitleTags[stepString];
    } else {
      document.title = 'MyFriendBen';
    }
  }, [location]);

  useEffect(() => {
    const updatedFormData = { ...formData };
    const referralSourceIsNotOther = !(formData.referralSource === 'other');

    if (formData.hasExpenses === false) {
      updatedFormData.expenses = [];
    }

    if (referralSourceIsNotOther) {
      updatedFormData.otherSource = '';
    }

    if (formData.signUpInfo.sendOffers === false && formData.signUpInfo.sendUpdates === false) {
      updatedFormData.signUpInfo = {
        email: '',
        phone: '',
        firstName: '',
        lastName: '',
        hasUser: formData.signUpInfo.hasUser,
        sendOffers: false,
        sendUpdates: false,
        commConsent: false,
      };
    }

    if (formData.hasBenefits !== 'true') {
      for (const benefit in formData.benefits) {
        // @ts-ignore
        updatedFormData.benefits[benefit] = false;
      }
    }

    setFormData(updatedFormData);
  }, [
    formData.hasExpenses,
    formData.referralSource,
    formData.signUpInfo.sendOffers,
    formData.signUpInfo.sendUpdates,
    formData.hasBenefits,
  ]);

  useEffect(() => {
    const referrerParam = searchParams.get('referrer');
    const utmParam = searchParams.get('utm_source');

    // use referrer if there is a referrer, otherwise use utm source
    const referrer = referrerParam ?? utmParam ?? '';
    const isOtherSource = !(referrer in referralOptions);

    setFormData({
      ...formData,
      isTest: isTest,
      externalID: externalId,
      referralSource: isOtherSource && referrer !== '' ? 'other' : referrer,
      immutableReferrer: referrer,
      otherSource: isOtherSource ? referrer : '',
      urlSearchParams: urlSearchParams,
    });
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  const handleTextfieldChange = (event: Event) => {
    const { name, value } = event.target as HTMLInputElement;
    const numberUpToEightDigitsLongRegex = /^\d{0,8}$/; //for zipcode
    const numberUpToTenDigitsLongRegex = /^\d{0,10}$/; //for phone number
    const isFirstLastOrEmail = name === 'firstName' || name === 'lastName' || name === 'email';

    if (isFirstLastOrEmail) {
      const updatedSignUpInfo = { ...formData.signUpInfo, [name]: value };
      setFormData({ ...formData, signUpInfo: updatedSignUpInfo });
      return;
    }

    if (name === 'phone' && numberUpToTenDigitsLongRegex.test(value)) {
      const updatedSignUpInfo = { ...formData.signUpInfo, [name]: value };
      setFormData({ ...formData, signUpInfo: updatedSignUpInfo });
      return;
    }

    if (name === 'otherSource') {
      setFormData({ ...formData, [name]: value });
    } else if (numberUpToEightDigitsLongRegex.test(value)) {
      if (value === '') {
        setFormData({ ...formData, [name]: value });
        return;
      }
      setFormData({ ...formData, [name]: Number(value) });
    }
  };

  const handleCheckboxChange = (event: React.FormEvent<HTMLInputElement>) => {
    //the value is the name of the formData property for everything except the commConsent
    const { value, name } = event.target as HTMLInputElement;

    if (name === 'commConsent') {
      const updatedCommConsent = !formData.signUpInfo.commConsent;
      const updatedSignUpInfo = { ...formData.signUpInfo, commConsent: updatedCommConsent };
      setFormData({ ...formData, signUpInfo: updatedSignUpInfo });
      return;
    } else {
      // @ts-ignore
      setFormData({ ...formData, [value]: !formData[value] });
    }
  };

  const handleRadioButtonChange = (event: Event) => {
    const { name, value } = event.target as HTMLInputElement;
    let boolValue = value === 'true';
    setFormData({ ...formData, [name]: boolValue });
  };

  const handleNoAnswerChange = (event: Event) => {
    const { name, value } = event.target as HTMLInputElement;
    setFormData({ ...formData, [name]: value });
  };

  const handleContinueSubmit = (
    event: Event,
    errorController: ReturnType<typeof useErrorController>, // update this when validationFunctions is converted to typescript
    inputToBeValidated: string | number | Expense[] | SignUpInfo | HealthInsurance,
    stepId: number,
    questionName: string,
    uuid: string,
  ) => {
    event.preventDefault();
    errorController.incrementSubmitted();
    const hasError = errorController.updateError(inputToBeValidated, formData);
    const isZipcodeQuestionAndCountyIsEmpty = questionName === 'zipcode' && formData.county === '';
    const isReferralQuestionWithOtherAndOtherSourceIsEmpty =
      questionName === 'referralSource' && formData.referralSource === 'other' && formData.otherSource === '';
    const isEmptyAssets = questionName === 'householdAssets' && formData.householdAssets < 0;

    if (!hasError) {
      if (isZipcodeQuestionAndCountyIsEmpty || isReferralQuestionWithOtherAndOtherSourceIsEmpty || isEmptyAssets) {
        return;
      } else if (questionName === 'signUpInfo') {
        updateUser(uuid, formData, setFormData, locale)
          .then(() => {
            navigate(`/${uuid}/confirm-information`);
          })
          .catch(() => {
            setFormData({ ...formData, signUpInfo: { ...formData.signUpInfo, serverError: true } });
          });
      } else if (questionName === 'householdSize') {
        const updatedHouseholdData = formData.householdData.slice(0, Number(formData.householdSize));
        const updatedFormData = { ...formData, householdData: updatedHouseholdData };
        updateScreen(uuid, updatedFormData, locale);
        setFormData(updatedFormData);
        navigate(`/${uuid}/step-${stepId + 1}/1`);
      } else {
        updateScreen(uuid, formData, locale);
        navigate(`/${uuid}/step-${stepId + 1}`);
      }
    }
  };

  const handleIncomeStreamsSubmit = (validatedIncomeStreams: IncomeStream[], stepId: number, uuid: string) => {
    const updatedFormData = { ...formData, incomeStreams: validatedIncomeStreams };
    updateScreen(uuid, updatedFormData, locale);
    setFormData(updatedFormData);
    navigate(`/${uuid}/step-${stepId + 1}`);
  };

  const handleExpenseSourcesSubmit = (validatedExpenseSources: Expense[], stepId: number, uuid: string) => {
    const updatedFormData = { ...formData, expenses: validatedExpenseSources };
    updateScreen(uuid, updatedFormData, locale);
    setFormData(updatedFormData);
    navigate(`/${uuid}/step-${stepId + 1}`);
  };

  const handleHouseholdDataSubmit = (memberData: HouseholdData, stepId: number, uuid: string) => {
    const updatedMembers = [...formData.householdData];
    updatedMembers[stepId] = memberData;
    const updatedFormData = { ...formData, householdData: updatedMembers };
    updateScreen(uuid, updatedFormData, locale);
    setFormData(updatedFormData);
    navigate(`/${uuid}/step-${stepId + 1}`);
  };

  if (pageIsLoading) {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes>
          <Route path=":uuid">
            <Route path="" element={<FetchScreen />} />
            <Route path="*" element={<FetchScreen />} />
          </Route>
          <Route path="" element={<LoadingPage />} />
          <Route path="*" element={<LoadingPage />} />
        </Routes>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <CssBaseline />
        <BrandedHeader handleTextFieldChange={handleTextfieldChange} />
        <Box className="main-max-width">
          <Routes>
            <Route path="/step-1" element={<ProgressBar step={1} />} />
            <Route path="/step-2" element={<ProgressBar step={2} />} />
            <Route path="/:uuid/step-:id" element={<ProgressBar />} />
            <Route path="/:uuid/step-:id/:page" element={<ProgressBar />} />
            <Route path="/:uuid/confirm-information" element={<ProgressBar step={totalSteps} />} />
            <Route path="*" element={<></>} />
          </Routes>
          <Routes>
            <Route path="/" element={<Navigate to={`/step-1${urlSearchParams}`} replace />} />
            <Route path="/jeffcohs" element={<JeffcoLandingPage referrer="jeffcoHS" />} />
            <Route path="/jeffcohscm" element={<JeffcoLandingPage referrer="jeffcoHSCM" />} />
            <Route path="/step-1" element={<SelectLanguagePage />} />
            <Route path="/step-2" element={<LandingPage handleCheckboxChange={handleCheckboxChange} />} />
            <Route path=":uuid">
              <Route path="" element={<Navigate to="/step-1" replace />} />
              <Route path="step-1" element={<SelectLanguagePage />} />
              <Route path="step-2" element={<LandingPage handleCheckboxChange={handleCheckboxChange} />} />
              <Route
                path={`step-${getStepNumber('householdData', formData.immutableReferrer)}/:page`}
                element={
                  <HouseholdDataBlock
                    key={window.location.href}
                    handleHouseholdDataSubmit={handleHouseholdDataSubmit}
                  />
                }
              />
              <Route
                path="step-:id"
                element={
                  <QuestionComponentContainer
                    key={window.location.href}
                    handleTextfieldChange={handleTextfieldChange}
                    handleContinueSubmit={handleContinueSubmit}
                    handleRadioButtonChange={handleRadioButtonChange}
                    handleNoAnswerChange={handleNoAnswerChange}
                    handleIncomeStreamsSubmit={handleIncomeStreamsSubmit}
                    handleExpenseSourcesSubmit={handleExpenseSourcesSubmit}
                    handleCheckboxChange={handleCheckboxChange}
                  />
                }
              />
              <Route path="confirm-information" element={<Confirmation />} />
              <Route
                path="results/benefits"
                element={<Results type="program" handleTextfieldChange={handleTextfieldChange} />}
              />
              <Route
                path="results/near-term-needs"
                element={<Results type="need" handleTextfieldChange={handleTextfieldChange} />}
              />
              <Route
                path="results/benefits/:programId"
                element={<Results type="program" handleTextfieldChange={handleTextfieldChange} />}
              />
              <Route
                path="results/benefits/:programId/navigators"
                element={<Results type="navigator" handleTextfieldChange={handleTextfieldChange} />}
              />
              <Route path="*" element={<Navigate to="/step-1" replace />} />
            </Route>
            <Route path="*" element={<Navigate to={`/step-1${urlSearchParams}`} replace />} />
          </Routes>
        </Box>
        <BrandedFooter />
      </div>
    </ThemeProvider>
  );
};

export default App;
