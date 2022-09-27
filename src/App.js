import { CssBaseline, createTheme, ThemeProvider } from '@mui/material';
import { useState, useEffect } from 'react';
import { useNavigate, Navigate, Routes, Route, useSearchParams } from 'react-router-dom';
import Disclaimer from './Components/Disclaimer/Disclaimer';
import QuestionComponentContainer from './Components/QuestionComponentContainer/QuestionComponentContainer';
import Confirmation from './Components/Confirmation/Confirmation';
import Results from './Components/Results/Results';
import EmailResults from './Components/EmailResults/EmailResults';
import Header from './Components/Header/Header';
import './App.css';

const App = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const primaryBlueColor = '#0096B0';
  const primaryGreenColor = '#4ecdc4';
  const primaryBlackColor = '#2A2B2A';

  const theme = createTheme({
    components: {
      // Name of the component
      MuiButton: {
        styleOverrides: {
          // Name of the slot
          root: {
            // Some CSS
            backgroundColor: primaryBlueColor,
            ":hover": {
              backgroundColor: primaryGreenColor
            }
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundColor: primaryBlackColor
          }
        }
      },
      MuiCheckbox: {
        styleOverrides: {
          root: {
            "&.Mui-checked": {
              color: primaryBlueColor
            }
          }
        }
      }
    }
  });


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
    email: '',
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
    otherSource: ''
  });

  // const [formData, setFormData] = useState({
  //   isTest: searchParams.get('test') ? searchParams.get('test') : true,
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
  //   email: '',
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
  //   referralSource: '',
  //   otherSource: ''
  // });
 
  const [results, setResults] = useState({
    eligiblePrograms: [], 
    ineligiblePrograms: [],
    screenerId: 0,
    isLoading: true 
  });

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

    setFormData(updatedFormData);
    
  }, [formData.student, formData.unemployed, formData.hasIncome, formData.hasExpenses, formData.referralSource]);

  const handleTextfieldChange = (event) => {
    const { name, value } = event.target;
    const numberUpToEightDigitsLongRegex = /^\d{0,8}$/;

    if (numberUpToEightDigitsLongRegex.test(value)) {
      setFormData({ ...formData, [name]: Number(value) });
    } else if (name === 'otherSource') {
      setFormData({ ...formData, [name]: value });
    }
  }

  const handleCheckboxChange = (event) => {
    //the value is the name of the formData property
    const { value } = event.target; 
    setFormData({ ...formData, [value]: !formData[value] });
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
      } else if (stepId === 17) {
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

  const handleEmailTextfieldChange = (event) => {
    const { name, value } = event.target;    
    setFormData({ ...formData, [name]: value});
  }

  return (
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
              setFormData={setFormData} /> } /> 
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
            element={<EmailResults 
              formData={formData}
              results={results} 
              handleEmailTextfieldChange={handleEmailTextfieldChange} /> } />
          <Route
            path='*'
            element={<Navigate to="/step-1" replace /> } />
        </Routes>
    </div>
  );
}

export default App;
