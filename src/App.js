import { CssBaseline, createTheme, ThemeProvider } from '@mui/material';
import { useState, useEffect, useContext } from 'react';
import { useNavigate, useLocation, Navigate, Routes, Route, useSearchParams } from 'react-router-dom';
import { LicenseInfo } from '@mui/x-license-pro';
import { Context } from './Components/Wrapper/Wrapper.js'
import ReactGA from "react-ga";
import FetchScreen from './Components/FetchScreen/FetchScreen';
import Disclaimer from './Components/Disclaimer/Disclaimer';
import QuestionComponentContainer from './Components/QuestionComponentContainer/QuestionComponentContainer';
import Confirmation from './Components/Confirmation/Confirmation';
import Results from './Components/Results/Results';
import Header from './Components/Header/Header';
import LandingPage from './Components/LandingPage/LandingPage';
import styleOverrides from './Assets/styleOverrides';
import referralOptions from './Assets/referralOptions';
import { updateScreen, updateUser } from './Assets/updateScreen'
import './App.css';
import ProgressBar from './Components/ProgressBar/ProgressBar';
import stepDirectory from './Assets/stepDirectory';
// import { createDevFormData } from './Assets/devFormData';

const TRACKING_ID = process.env.REACT_APP_GOOGLE_ANALYTICS_ID;
ReactGA.initialize(TRACKING_ID, {name: 'main'});
LicenseInfo.setLicenseKey(process.env.REACT_APP_MUI_LICENSE_KEY + '=');

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
	const totalSteps = Object.keys(stepDirectory).length + 2;
  const [fetchedScreen, setFetchedScreen] = useState(false);
  const locale = useContext(Context).locale

  const initialFormData = {
    screenUUID: undefined,
    isTest: isTest,
    externalID: externalId,
    agreeToTermsOfService: false,
    zipcode: '',
    county: '',
    startTime: new Date().toJSON(),
    hasExpenses: false,
    expenses: [],
    householdSize: '',
    householdData: [],
    householdAssets: 0,
    hasBenefits: 'preferNotToAnswer',
    benefits: {
      acp: false,
      andcs: false,
      cccap: false,
      coctc: false,
      coeitc: false,
      coheadstart: false,
      coPropTaxRentHeatCreditRebate: false,
      ctc: false,
      dentallowincseniors: false,
      denverpresc: false,
      ede: false,
      eitc: false,
      erc: false,
      lifeline: false,
      leap: false,
      mydenver: false,
      nslp: false,
      oap: false,
      rtdlive: false,
      snap: false,
      ssi: false,
      tanf: false,
      upk: false,
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
      hasUser: false,
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
      loss: false,
      familyPlanning: false,
    }
  };

  const [formData, setFormData] = useState(initialFormData);
  // const [formData, setFormData] = useState(createDevFormData(searchParams));

  useEffect(() => {
    ReactGA.pageview(window.location.pathname +  window.location.search);
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
        commConsent: false
      };
    }

    if (formData.hasBenefits !== 'true') {
      updatedFormData.benefits = initialFormData.benefits;
    }

    setFormData(updatedFormData);

  }, [formData.hasExpenses,formData.referralSource, formData.signUpInfo.sendOffers, formData.signUpInfo.sendUpdates,
    formData.hasBenefits, formData.sendOffers]
  );

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

    if (name === 'otherSource') {
      setFormData({ ...formData, [name]: value });
    } else if (numberUpToEightDigitsLongRegex.test(value)) {
      if (value === '') {
        setFormData({ ...formData, [name]: value });
        return;
      }
      setFormData({ ...formData, [name]: Number(value) });
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

  const handleNoAnswerChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  }

  const handleContinueSubmit = (event, validateInputFunction, inputToBeValidated, stepId, questionName, uuid) => {
    event.preventDefault();
    const isZipcodeQuestionAndCountyIsEmpty = (questionName === 'zipcode' && formData.county === '');
    const isReferralQuestionWithOtherAndOtherSourceIsEmpty = (questionName === 'referralSource' && formData.referralSource === 'other' && formData.otherSource === '');
    const isEmptyAssets = questionName === 'householdAssets' && formData.householdAssets === '';

    if (!validateInputFunction(inputToBeValidated, formData)) {
      if (isZipcodeQuestionAndCountyIsEmpty || isReferralQuestionWithOtherAndOtherSourceIsEmpty || isEmptyAssets) {
        return;
      } else if (questionName === 'signUpInfo') {
        updateUser(uuid, formData, setFormData, locale.toLowerCase())
        navigate(`/${uuid}/confirm-information`);
      } else { //you've indicated that you're householdSize is larger than 1
        updateScreen(uuid, formData, locale.toLowerCase())
        navigate(`/${uuid}/step-${stepId + 1}`);
      }
    }
  }

  const handleIncomeStreamsSubmit = (validatedIncomeStreams, stepId, uuid) => {
    const updatedFormData = { ...formData, incomeStreams: validatedIncomeStreams };
    updateScreen(uuid, updatedFormData, locale.toLowerCase());
    setFormData(updatedFormData);
    navigate(`/${uuid}/step-${stepId + 1}`);
  }

  const handleExpenseSourcesSubmit = (validatedExpenseSources, stepId, uuid) => {
    const updatedFormData = { ...formData, expenses: validatedExpenseSources };
    updateScreen(uuid, updatedFormData, locale.toLowerCase());
    setFormData(updatedFormData);
    navigate(`/${uuid}/step-${stepId + 1}`);
  }

  const handleHouseholdDataSubmit = (validatedHouseholdData, stepId, uuid) => {
    const updatedFormData = { ...formData, householdData: validatedHouseholdData };
    updateScreen(uuid, updatedFormData, locale.toLowerCase());
    setFormData(updatedFormData);
    navigate(`/${uuid}/step-${stepId + 1}`);
  }

  return (
		<ThemeProvider theme={theme}>
			<div className="App">
				<CssBaseline />
				<Header
					formData={formData}
					handleTextfieldChange={handleTextfieldChange}
				/>
        <Routes>
          <Route
            path="/step-0"
            element={<ProgressBar step="0"/>}
          />
          <Route
            path="/:uuid/step-:id"
            element={<ProgressBar />}
          />
          <Route
            path="/:uuid/confirm-information"
            element={<ProgressBar step={totalSteps}/>}
          />
          <Route
            path="*"
            element={<></>}
          />
        </Routes>
				<Routes>
					<Route
						path="/"
						element={<Navigate to={`/step-0${urlSearchParams}`} replace />}
					/>
					<Route
						path="/step-0"
						element={
							<LandingPage
                formData={formData}
                setFetchedScreen={setFetchedScreen}
							/>
						}
					/>
          <Route path="results/:uuid" element={<Results />} />
          <Route
            path=":uuid"
          >
            { !fetchedScreen && (
              <Route
                path="*"
                element={
                  <FetchScreen
                    formData={formData}
                    setFormData={setFormData}
                    setFetchedScreen={setFetchedScreen}
                  />
                }
              />
            )}
            { fetchedScreen && (<>
              <Route path="" element={<Navigate to="/step-0" replace />} />
              <Route
                path="step-0"
                element={
                  <LandingPage
                    formData={formData}
                    setFetchedScreen={setFetchedScreen}
                  />
                }
              />
              <Route
                path="step-1"
                element={
                  <Disclaimer
                    formData={formData}
                    handleCheckboxChange={handleCheckboxChange}
                  />
                }
              />
              <Route
                path="step-:id"
                element={
                  <QuestionComponentContainer
                    formData={formData}
                    handleTextfieldChange={handleTextfieldChange}
                    handleContinueSubmit={handleContinueSubmit}
                    handleRadioButtonChange={handleRadioButtonChange}
                    handleNoAnswerChange={handleNoAnswerChange}
                    handleIncomeStreamsSubmit={handleIncomeStreamsSubmit}
                    handleExpenseSourcesSubmit={handleExpenseSourcesSubmit}
                    handleHouseholdDataSubmit={handleHouseholdDataSubmit}
                    setFormData={setFormData}
                    handleCheckboxChange={handleCheckboxChange}
                  />
                }
              />
              <Route
                path="confirm-information"
                element={<Confirmation formData={formData} />}
              />
              <Route path="results" element={<Results />} />
              <Route path="*" element={<Navigate to="/step-0" replace />} />
            </>)}
          </Route>
					<Route path="*" element={<Navigate to="/step-0" replace />} />
				</Routes>
			</div>
		</ThemeProvider>
	);
}

export default App;
