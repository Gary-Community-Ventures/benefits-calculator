import { CssBaseline, createTheme, ThemeProvider } from '@mui/material';
import { useState, useEffect, useContext } from 'react';
import { useNavigate, useLocation, Navigate, Routes, Route, useSearchParams } from 'react-router-dom';
import { LicenseInfo } from '@mui/x-license-pro';
import { Context } from './Components/Wrapper/Wrapper';
import ReactGA from 'react-ga4';
import FetchScreen from './Components/FetchScreen/FetchScreen';
import QuestionComponentContainer from './Components/QuestionComponentContainer/QuestionComponentContainer';
import Confirmation from './Components/Confirmation/Confirmation';
import Results from './Components/Results/Results';
import Header from './Components/Header/Header';
import TwoOneOneHeader from './Components/TwoOneOneComponents/TwoOneOneHeader/TwoOneOneHeader';
import LandingPage from './Components/LandingPage/LandingPage';
import HouseholdDataBlock from './Components/HouseholdDataBlock/HouseholdDataBlock.js';
import ProgressBar from './Components/ProgressBar/ProgressBar';
import TwoOneOneFooter from './Components/TwoOneOneComponents/TwoOneOneFooter/TwoOneOneFooter';
import referralOptions from './Assets/referralOptions';
import JeffcoLandingPage from './Components/JeffcoComponents/JeffcoLandingPage/JeffcoLandingPage';
import { updateScreen, updateUser } from './Assets/updateScreen';
import stepDirectory from './Assets/stepDirectory';
import Box from '@mui/material/Box';
import { Expense, HealthInsurance, HouseholdData, IncomeStream, SignUpInfo } from './Types/FormData.js';
import { useErrorController } from './Assets/validationFunctions.tsx';
import './App.css';

const TRACKING_ID = process.env.REACT_APP_GOOGLE_ANALYTICS_ID;
if (TRACKING_ID === undefined) {
  throw new Error('TRACKING_ID is not set');
}
ReactGA.initialize(TRACKING_ID);
LicenseInfo.setLicenseKey(process.env.REACT_APP_MUI_LICENSE_KEY + '=');

const App = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const urlSearchParams = location.search;
  const [searchParams] = useSearchParams();
  const isTest = searchParams.get('test') ? true : false;
  const externalId = searchParams.get('externalid') ? Number(searchParams.get('externalid')) : undefined;
  const referrer = searchParams.get('referrer') !== null ? (searchParams.get('referrer') as string) : '';
  const referrerSource = referrer in referralOptions ? referrer : '';
  const totalSteps = Object.keys(stepDirectory).length + 2;
  const [fetchedScreen, setFetchedScreen] = useState(false);
  const { locale, formData, setFormData, styleOverride, setTheme: changeTheme } = useContext(Context);
  const [theme, setTheme] = useState(createTheme(styleOverride));

  useEffect(() => {
    const theme = formData.immutableReferrer === '211co' ? 'twoOneOne' : 'default';
    changeTheme(theme);
  }, [formData.immutableReferrer]);

  useEffect(() => {
    setTheme(createTheme(styleOverride));
  }, [styleOverride]);

  useEffect(() => {
    ReactGA.pageview(window.location.pathname + window.location.search);
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
    const isOtherSource = referrerSource === '';
    setFormData({
      ...formData,
      isTest: isTest,
      externalID: externalId,
      referralSource: isOtherSource && referrer ? 'other' : referrerSource,
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
        updateUser(uuid, formData, setFormData, locale.toLowerCase());
        navigate(`/${uuid}/confirm-information`);
      } else if (questionName === 'householdSize') {
        const updatedHouseholdData = formData.householdData.slice(0, Number(formData.householdSize));
        const updatedFormData = { ...formData, householdData: updatedHouseholdData };
        updateScreen(uuid, updatedFormData, locale.toLowerCase());
        setFormData(updatedFormData);
        navigate(`/${uuid}/step-${stepId + 1}/1`);
      } else {
        updateScreen(uuid, formData, locale.toLowerCase());
        navigate(`/${uuid}/step-${stepId + 1}`);
      }
    }
  };

  const handleIncomeStreamsSubmit = (validatedIncomeStreams: IncomeStream[], stepId: number, uuid: string) => {
    const updatedFormData = { ...formData, incomeStreams: validatedIncomeStreams };
    updateScreen(uuid, updatedFormData, locale.toLowerCase());
    setFormData(updatedFormData);
    navigate(`/${uuid}/step-${stepId + 1}`);
  };

  const handleExpenseSourcesSubmit = (validatedExpenseSources: Expense[], stepId: number, uuid: string) => {
    const updatedFormData = { ...formData, expenses: validatedExpenseSources };
    updateScreen(uuid, updatedFormData, locale.toLowerCase());
    setFormData(updatedFormData);
    navigate(`/${uuid}/step-${stepId + 1}`);
  };

  const handleHouseholdDataSubmit = (memberData: HouseholdData, stepId: number, uuid: string) => {
    const updatedMembers = [...formData.householdData];
    updatedMembers[stepId] = memberData;
    const updatedFormData = { ...formData, householdData: updatedMembers };
    updateScreen(uuid, updatedFormData, locale.toLowerCase());
    setFormData(updatedFormData);
    navigate(`/${uuid}/step-${stepId + 1}`);
  };

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <CssBaseline />
        {formData.immutableReferrer === '211co' ? (
          <TwoOneOneHeader handleTextfieldChange={handleTextfieldChange} />
        ) : (
          <Header handleTextfieldChange={handleTextfieldChange} />
        )}
        <Box className="main-max-width">
          <Routes>
            <Route path="/step-1" element={<ProgressBar step={1} />} />
            <Route path="/:uuid/step-:id" element={<ProgressBar />} />
            <Route path="/:uuid/step-:id/:page" element={<ProgressBar />} />
            <Route path="/:uuid/confirm-information" element={<ProgressBar step={totalSteps} />} />
            <Route path="*" element={<></>} />
          </Routes>
          <Routes>
            <Route path="/" element={<Navigate to={`/step-1${urlSearchParams}`} replace />} />
            <Route path="/jeffcohs" element={<JeffcoLandingPage />} />
            <Route
              path="/step-1"
              element={<LandingPage setFetchedScreen={setFetchedScreen} handleCheckboxChange={handleCheckboxChange} />}
            />
            <Route path="results/:uuid" element={<Results />} />
            <Route path=":uuid">
              {!fetchedScreen && <Route path="*" element={<FetchScreen setFetchedScreen={setFetchedScreen} />} />}
              {fetchedScreen && (
                <>
                  <Route path="" element={<Navigate to="/step-1" replace />} />
                  <Route
                    path="step-1"
                    element={
                      <LandingPage setFetchedScreen={setFetchedScreen} handleCheckboxChange={handleCheckboxChange} />
                    }
                  />
                  <Route
                    path={`step-${stepDirectory.householdData}/:page`}
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
                  <Route path="results" element={<Results />} />
                  <Route path="*" element={<Navigate to="/step-1" replace />} />
                </>
              )}
            </Route>
            <Route path="*" element={<Navigate to="/step-1" replace />} />
          </Routes>
        </Box>
        {formData.immutableReferrer === '211co' && <TwoOneOneFooter />}
      </div>
    </ThemeProvider>
  );
};

export default App;
