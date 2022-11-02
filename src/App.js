import { CssBaseline, createTheme, ThemeProvider } from '@mui/material';
import { useState, useEffect } from 'react';
import { useNavigate, useLocation, Navigate, Routes, Route, useSearchParams } from 'react-router-dom';
import { LicenseInfo } from '@mui/x-license-pro';
import ReactGA from "react-ga4";
import Disclaimer from './Components/Disclaimer/Disclaimer';
import QuestionComponentContainer from './Components/QuestionComponentContainer/QuestionComponentContainer';
import Confirmation from './Components/Confirmation/Confirmation';
import Results from './Components/Results/Results';
import Header from './Components/Header/Header';
import EmailResults2 from './Components/EmailResults/EmailResults2';
import styleOverrides from './Assets/styleOverrides';
import './App.css';

const TRACKING_ID = "G-NZ9D1VLR0D";
ReactGA.initialize(TRACKING_ID);
LicenseInfo.setLicenseKey('505464fa6deb7bd75c286bf36859d580Tz01MTQ5MyxFPTE2OTU4Mjk0NDQyMTEsUz1wcm8sTE09c3Vic2NyaXB0aW9uLEtWPTI=');

const App = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const theme = createTheme(styleOverrides);

  const [formData, setFormData] = useState({
    isTest: searchParams.get('test') ? searchParams.get('test') : false,
    externalID: searchParams.get('externalid') ? searchParams.get('externalid') : null,
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
    benefits: {
      tanf: false,
      wic: false,
      snap: false,
      lifeline: false,
      acp: false,
      eitc: false,
      coeitc: false,
      nslp: false,
      ctc: false,
      medicaid: false,
      rtdlive: false,
      cccap: false,
      mydenver: false,
      chp: false,
      ccb: false
    },
    referralSource: '',
    otherSource: '',
    signUpInfo: {
      email: '',
      phone: '',
      firstName: '',
      lastName: '',
      sendOffers: false,
      sendUpdates: false,
      commConsent: false
    }
  });

  // const [formData, setFormData] = useState({
  //   isTest: true,
  //   externalID: searchParams.get('externalid') ? searchParams.get('externalid') : null,
  //   agreeToTermsOfService: false,
  //   age: '33',
  //   zipcode: '80204',
  //   county: '',
  //   startTime: new Date().toJSON(),
  //   student: false,
  //   studentFulltime: false,
  //   pregnant: true,
  //   unemployed: false,
  //   unemployedWorkedInLast18Mos: true,
  //   blindOrVisuallyImpaired: false,
  //   disabled: false,
  //   veteran: false,
  //   hasIncome: true,
  //   incomeStreams: [{
  //     incomeStreamName: 'wages', 
  //     incomeStreamLabel: 'Wages, salaries, tips', 
  //     incomeAmount: '29000',
  //     incomeFrequency: 'yearly',
  //     incomeFrequencyLabel: 'Every year'
  //   }],
  //   hasExpenses: true,
  //   expenses: [{
  //     expenseSourceName: 'rent', 
  //     expenseSourceLabel: 'Rent', 
  //     expenseAmount: '500',
  //     expenseFrequency: 'monthly',
  //     expenseFrequencyLabel: 'Every month'
  //   }],
  //   householdSize: '2',
  //   householdData: [{
  //     age: '3',
  //     relationshipToHH: `child`,
  //     student: false,
  //     studentFulltime: false,
  //     pregnant: false,
  //     unemployed: false,
  //     unemployedWorkedInLast18Mos: false,
  //     blindOrVisuallyImpaired: false,
  //     disabled: false,
  //     veteran: false,
  //     medicaid: false,
  //     disabilityRelatedMedicaid: false,
  //     noneOfTheseApply: true,
  //     hasIncome: false,
  //     incomeStreams: [],
  //     hasExpenses: false,
  //     expenses: []
  //   }],
  //   householdAssets: '1000',
  //   relationship: 'headOfHousehold',
  //   lastTaxFilingYear: '2021',
  //   benefits: {
  //     tanf: true,
  //     wic: true,
  //     snap: false,
  //     lifeline: false,
  //     acp: false,
  //     eitc: false,
  //     coeitc: false,
  //     nslp: false,
  //     ctc: false,
  //     medicaid: false,
  //     rtdlive: false,
  //     cccap: false,
  //     mydenver: false,
  //     chp: false,
  //     ccb: false
  //   },
  //   referralSource: 'gary',
  //   otherSource: '',
  //   signUpInfo: {
  //     email: 'testabc@gmail.com',
  //     phone: '',
  //     firstName: 'Test',
  //     lastName: 'Test',
  //     sendOffers: true,
  //     sendUpdates: false,
  //     commConsent: true
  //   }
  // });
 
  const [results, setResults] = useState({
    eligiblePrograms: [], 
    ineligiblePrograms: [],
    screenerId: 0,
    isLoading: true,
    user: 0
  });

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

    setFormData(updatedFormData);
    
  }, [formData.student, formData.unemployed, formData.hasIncome, formData.hasExpenses, 
    formData.referralSource, formData.signUpInfo.sendOffers, formData.signUpInfo.sendUpdates]
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
  
  const handleSubmit = (event, validateInputFunction, inputToBeValidated, stepId, householdSize) => {
    event.preventDefault();
    const isZipcodeQuestionAndCountyIsEmpty = (stepId === 3 && formData.county === '');
    const isReferralQuestionWithOtherAndOtherSourceIsEmpty = (stepId === 17 && formData.referralSource === 'other' && formData.otherSource === '');

    if (!validateInputFunction(inputToBeValidated)) {
      if (isZipcodeQuestionAndCountyIsEmpty || isReferralQuestionWithOtherAndOtherSourceIsEmpty) {
        return;
      } else if (stepId === 13 && householdSize === 1) { //if you're on the householdSize q and the value is 1
        navigate(`/step-${stepId + 2}`); //skip question 16 and go to 17
      } else if (stepId === 18) {
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

  const handleHouseholdDataSubmit = (unvalidatedHouseholdData) => {
    setFormData({ ...formData, householdData: unvalidatedHouseholdData });
    navigate('/step-15');
  }

  return (
    <ThemeProvider theme={theme}>
      <div className='App'>
        <CssBaseline />
          <Header />
          <Routes>
            <Route
              path='/'
              element={<Navigate to="/step-1" replace /> } />
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
                handleSubmit={handleSubmit}
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
              path='/results' 
              element={<Results 
                formData={formData}
                results={results}
                setResults={setResults}
                programSubset='eligiblePrograms' 
                passedOrFailedTests='passed_tests' /> } /> 
            <Route 
              path='/ineligible-results' 
              element={<Results 
                results={results}
                programSubset='ineligiblePrograms' 
                passedOrFailedTests='failed_tests' /> } />
            <Route
              path='/email-results' 
              element={<EmailResults2
                formData={formData}
                results={results}
                handleTextfieldChange={handleTextfieldChange} /> } />
            <Route
              path='*'
              element={<Navigate to="/step-1" replace /> } />
          </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;
