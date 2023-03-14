import { CssBaseline, createTheme, ThemeProvider } from '@mui/material';
import { useState, useEffect } from 'react';
import { useNavigate, useLocation, Navigate, Routes, Route, useSearchParams } from 'react-router-dom';
import { LicenseInfo } from '@mui/x-license-pro';
import ReactGA from "react-ga4";
import Disclaimer from './Components/Disclaimer/Disclaimer';
import QuestionComponentContainer from './Components/QuestionComponentContainer/QuestionComponentContainer';
import Confirmation from './Components/Confirmation/Confirmation';
import SubmitScreen from './Components/SubmitScreen/SubmitScreen';
import Results from './Components/Results/Results';
import Header from './Components/Header/Header';
import EmailResults2 from './Components/EmailResults/EmailResults2';
import LandingPage from './Components/LandingPage/LandingPage';
import styleOverrides from './Assets/styleOverrides';
import referralOptions from './Assets/referralOptions';
import './App.css';
// import { createDevFormData } from './Assets/devFormData';

const TRACKING_ID = "G-NZ9D1VLR0D";
ReactGA.initialize(TRACKING_ID);
LicenseInfo.setLicenseKey('505464fa6deb7bd75c286bf36859d580Tz01MTQ5MyxFPTE2OTU4Mjk0NDQyMTEsUz1wcm8sTE09c3Vic2NyaXB0aW9uLEtWPTI=');

const App = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const urlSearchParams = location.search;
  const [searchParams] = useSearchParams();
  const isTest = searchParams.get('test') ? searchParams.get('test') : false;
  const externalId = searchParams.get('externalid') ? searchParams.get('externalid') : null;
  const referrer = searchParams.get('referrer') ? searchParams.get('referrer') : '';
  const setReferrerSource = referrer === '' || referrer in referralOptions
  const isBIAUser = externalId !== null && referrer !== '';
  const theme = createTheme(styleOverrides);

  const initialFormData = {
    screenUUID: undefined,
    isTest: isTest,
    externalID: externalId,
    agreeToTermsOfService: false,
    age: '',
    zipcode: '',
    county: '',
    startTime: new Date().toJSON(),
    student: false,
    studentFulltime: false,
    pregnant: false,
    unemployed: false,
    unemployedWorkedInLast18Mos: false,
    blindOrVisuallyImpaired: false,
    disabled: false,
    veteran: false,
    hasIncome: false,
    incomeStreams: [],
    hasExpenses: false,
    expenses: [],
    householdSize: '',
    householdData: [],
    householdAssets: 0,
    lastTaxFilingYear: '',
    hasBenefits: false,
    benefits: {
      acp: false,
      andcs: false,
      cccap: false,
      coeitc: false,
      coheadstart: false,
      coPropTaxRentHeatCreditRebate: false,
      ctc: false,
      dentallowincseniors: false,
      denverpresc: false,
      ede: false,
      eitc: false,
      erc: false,
      familyplanning: false,
      lifeline: false,
      leap: false,
      mydenver: false,
      nslp: false,
      oap: false,
      reproductivehealth: false,
      rtdlive: false,
      snap: false,
      ssi: false,
      tanf: false,
      wic: false
    },
    healthInsurance: {
      employer: false,
      private: false,
      medicaid: false,
      medicare: false,
      chp: false,
      none: false
    },
    referralSource: setReferrerSource ? referrer : 'other',
    referrerCode: referrer,
    otherSource: setReferrerSource ? '' : referrer,
    signUpInfo: {
      email: '',
      phone: '',
      firstName: '',
      lastName: '',
      sendOffers: false,
      sendUpdates: false,
      commConsent: false
    },
    urlSearchParams: urlSearchParams,
    isBIAUser: isBIAUser,
    acuteHHConditions: {
      food: false,
      babySupplies: false,
      housing: false,
      support: false,
      childDevelopment: false,
      loss: false
    }
  };

  const getCurrentState = () => {
    const localStorageFormData = localStorage.getItem('formData');
    if (localStorageFormData === null) {
      return initialFormData;
    } else {
      return JSON.parse(localStorageFormData);
    }
  }

  const [formData, setFormData] = useState(getCurrentState());
  // const [formData, setFormData] = useState(createDevFormData(searchParams));

  useEffect(() => {
    ReactGA.pageview(window.location.pathname +  window.location.search);
  }, [location]);

  useEffect(() => {
    const updatedFormData = { ...formData };
    const referralSourceIsNotOther = !(formData.referralSource === 'other');

    if (formData.student === false) {
      updatedFormData.studentFulltime = false;
    }

    if (formData.unemployed === false) {
      updatedFormData.unemployedWorkedInLast18Mos = false;
    }

    if (formData.hasIncome === false) {
      updatedFormData.incomeStreams = [];
    }

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
        sendOffers: false,
        sendUpdates: false,
        commConsent: false
      };
    }

    if (formData.hasBenefits === false) {
      updatedFormData.benefits = initialFormData.benefits;
    }

    setFormData(updatedFormData);

  }, [formData.student, formData.unemployed, formData.hasIncome, formData.hasExpenses,
    formData.referralSource, formData.signUpInfo.sendOffers, formData.signUpInfo.sendUpdates,
    formData.hasBenefits]
  );

  useEffect(() => {
    localStorage.setItem('formData', JSON.stringify(formData));
  }, [formData]);

  const handleTextfieldChange = (event) => {
    const { name, value } = event.target;
    const numberUpToEightDigitsLongRegex = /^\d{0,8}$/; //for zipcode
    const numberUpToTenDigitsLongRegex = /^\d{0,10}$/; //for phone number
    const isFirstLastOrEmail = name === 'firstName'|| name === 'lastName' || name === 'email';

    if (isFirstLastOrEmail ) {
      const updatedSignUpInfo = { ...formData.signUpInfo, [name]: value };
      setFormData({ ...formData, signUpInfo: updatedSignUpInfo });
      return;
    }

    if (name === 'phone' && numberUpToTenDigitsLongRegex.test(value)) {
      const updatedSignUpInfo = { ...formData.signUpInfo, [name]: value };
      setFormData({ ...formData, signUpInfo: updatedSignUpInfo });
      return;
    }

    if (numberUpToEightDigitsLongRegex.test(value)) {
      setFormData({ ...formData, [name]: Number(value) });
    } else if (name === 'otherSource') {
      setFormData({ ...formData, [name]: value });
    }
  }

  const handleCheckboxChange = (event) => {
    //the value is the name of the formData property for everything except the commConsent
    const { value } = event.target;
    const { name } = event.target;

    if (name === 'commConsent') {
      const updatedCommConsent = !(formData.signUpInfo.commConsent);
      const updatedSignUpInfo = { ...formData.signUpInfo, commConsent: updatedCommConsent };
      setFormData({ ...formData, signUpInfo: updatedSignUpInfo });
      return;
    } else {
      setFormData({ ...formData, [value]: !formData[value] });
    }
  }

  const handleRadioButtonChange = (event) => {
    const { name, value } = event.target;
    let boolValue = (value === 'true');
    setFormData({ ...formData, [name]: boolValue });
  }

  const handleContinueSubmit = (event, validateInputFunction, inputToBeValidated, stepId, questionName, householdSize) => {
    event.preventDefault();
    const isZipcodeQuestionAndCountyIsEmpty = (questionName === 'zipcode' && formData.county === '');
    const isReferralQuestionWithOtherAndOtherSourceIsEmpty = (questionName === 'referralSource' && formData.referralSource === 'other' && formData.otherSource === '');

    if (!validateInputFunction(inputToBeValidated, formData)) {
      if (isZipcodeQuestionAndCountyIsEmpty || isReferralQuestionWithOtherAndOtherSourceIsEmpty) {
        return;
      } else if (questionName === 'householdSize' && householdSize === 1) { //if you're on the householdSize q and the value is 1
        setFormData({ ...formData, householdData: [] });
        navigate(`/step-${stepId + 2}`); //skip householdData question
      } else if (questionName === 'signUpInfo') {
        navigate('/confirm-information');
      } else { //you've indicated that you're householdSize is larger than 1
        navigate(`/step-${stepId + 1}`);
      }
    }
  }

  const handleIncomeStreamsSubmit = (validatedIncomeStreams, stepId) => {
    setFormData({ ...formData, incomeStreams: validatedIncomeStreams });
    navigate(`/step-${stepId + 1}`);
  }

  const handleExpenseSourcesSubmit = (validatedExpenseSources, stepId) => {
    setFormData({ ...formData, expenses: validatedExpenseSources });
    navigate(`/step-${stepId + 1}`);
  }

  const handleHouseholdDataSubmit = (validatedHouseholdData, stepId) => {
    setFormData({ ...formData, householdData: validatedHouseholdData });
    navigate(`/step-${stepId + 1}`);
  }

  const clearLocalStorageFormDataAndResults = () => {
    localStorage.clear();
    //the setTimeout function was added in order to make sure that you don't clear and
    //set the formData and results at the same time
    setTimeout(() => {
      setFormData(initialFormData);
    }, '100');
  }

  return (
    <ThemeProvider theme={theme}>
      <div className='App'>
        <CssBaseline />
          <Header formData={formData} />
          <Routes>
            <Route
              path='/'
              element={<Navigate to={`/step-0${urlSearchParams}`} replace /> } />
            <Route
              path='/step-0'
              element={<LandingPage
                clearLocalStorageFormDataAndResults={clearLocalStorageFormDataAndResults} /> } />
            <Route
              path='/step-1'
              element={<Disclaimer
                formData={formData}
                handleCheckboxChange={handleCheckboxChange} /> } />
            <Route
              path='/step-:id'
              element={<QuestionComponentContainer
                formData={formData}
                handleTextfieldChange={handleTextfieldChange}
                handleContinueSubmit={handleContinueSubmit}
                handleRadioButtonChange={handleRadioButtonChange}
                handleIncomeStreamsSubmit={handleIncomeStreamsSubmit}
                handleExpenseSourcesSubmit={handleExpenseSourcesSubmit}
                handleHouseholdDataSubmit={handleHouseholdDataSubmit}
                setFormData={setFormData}
                handleCheckboxChange={handleCheckboxChange} /> } />
            <Route
              path='/confirm-information'
              element={<Confirmation
                formData={formData} /> } />
            <Route
              path='/submit-screen'
              element={<SubmitScreen
                formData={formData}
                setFormData={setFormData}
                /> } />
            <Route
              path='/results/:id'
              element={<Results/> } />
            <Route
              path='/email-results/:id'
              element={<EmailResults2
                formData={formData}
                handleTextfieldChange={handleTextfieldChange} /> } />
            <Route
              path='*'
              element={<Navigate to='/step-0' replace /> } />
          </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;
