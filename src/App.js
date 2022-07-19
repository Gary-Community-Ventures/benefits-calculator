import { Typography, AppBar, CssBaseline } from '@mui/material';
import { useState, useEffect } from 'react';
import { useNavigate, Navigate, Routes, Route } from 'react-router-dom';
import Disclaimer from './Components/Disclaimer/Disclaimer';
import QuestionComponentContainer from './Components/QuestionComponentContainer/QuestionComponentContainer';
import Confirmation from './Components/Confirmation/Confirmation';
import Results from './Components/Results/Results';
import './App.css';

const App = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    agreeToTermsOfService: false,
    applicantAge: '',
    zipcode: '',
    student: false,
    studentFulltime: false,
    pregnant: false,
    unemployed: false,
    unemployedWorkedInLast18Mos: false,
    blindOrVisuallyImpaired: false,
    disabled: false,
    veteran: false,
    medicaid: false,
    disabilityRelatedMedicaid: false,
    hasIncome: false,
    incomeStreams: [],
    hasExpenses: false,
    expenses: [],
    householdSize: '',
    householdData: [],
    householdAssets: '',
    housing: {}
  });

  useEffect(() => {
    const updatedFormData = { ...formData };

    if (formData.student === false) {
      updatedFormData.studentFulltime = false;
    }

    if (formData.unemployed === false) { 
      updatedFormData.unemployedWorkedInLast18Mos = false;
    }

    if(formData.hasIncome === false) {
      updatedFormData.incomeStreams = [];
    }

    if(formData.hasExpenses === false) {
      updatedFormData.expenses = [];
    }

    setFormData(updatedFormData);
    
  }, [formData.student, formData.unemployed, formData.hasIncome, formData.hasExpenses]);

  const handleTextfieldChange = (event) => {
    const { name, value } = event.target;
    const numberUpToEightDigitsLongRegex = /^\d{0,8}$/;

    if (numberUpToEightDigitsLongRegex.test(value)) {
      setFormData({ ...formData, [name]: Number(value) });
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

    if (!validateInputFunction(inputToBeValidated)) {
      if (stepId === 14 && householdSize === 1) { //if you're on the householdSize q and the value is 1
        navigate(`/step-${stepId + 2}`); //skip question 15 and go to 16
      } else { //you've indicated that you're householdSize is larger than 1
        navigate(`/step-${stepId + 1}`);
      }
    }  
  }

  const handleHousingSourcesSubmit = (validatedHousingSources) => {
    setFormData({ ...formData, housing: validatedHousingSources });
    navigate('/confirm-information');
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
    navigate('/step-16');
  }

  return (
    <div className='App'>
      <CssBaseline />
      <AppBar position='relative'>
        <Typography variant='h4' align='center'>Benefits Calculator</Typography>
      </AppBar>
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
            handleHousingSourcesSubmit={handleHousingSourcesSubmit} 
            handleHouseholdDataSubmit={handleHouseholdDataSubmit} /> } /> 
        <Route 
          path='/confirm-information' 
          element={<Confirmation
            formData={formData} /> } /> 
        <Route 
          path='/results' 
          element={<Results /> } /> 
        <Route
          path='*'
          element={<Navigate to="/step-1" replace /> } />
      </Routes>
    </div>
  );
}

export default App;
