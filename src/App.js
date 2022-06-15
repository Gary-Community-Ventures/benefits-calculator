import { Typography, AppBar, CssBaseline } from '@mui/material';
import { useState, useEffect } from 'react';
import { useNavigate, useParams, Navigate, Routes, Route } from 'react-router-dom';
import Disclaimer from './Components/Disclaimer/Disclaimer';
import QuestionComponentContainer from './Components/QuestionComponentContainer/QuestionComponentContainer';
import Confirmation from './Components/Confirmation/Confirmation';
import Results from './Components/Results/Results';
import './App.css';

const App = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const numberId = Number(id);

  const [formData, setFormData] = useState({
    agreeToTermsOfService: false,
    applicantAge: 0,
    zipcode: '',
    student: false,
    studentFulltime: false,
    isPregnant: false,
    unemployed: false,
    unemployedWorkedInLast18Mos: false,
    isBlindOrVisuallyImpaired: false,
    isDisabled: false,
    isAVeteran: false,
    isOnMedicaid: false,
    isOnDisabilityRelatedMedicaid: false,
    hasIncome: false,
    incomeStreams: [],
    hasExpenses: false,
    expenses: [],
    householdSize: 0,
    householdAssets: 0,
    housing: {}
  });

  useEffect(() => {

    if (formData.student === false) {
      setFormData({ ...formData, studentFulltime: false });
    }

    if (formData.unemployed === false) { 
      setFormData({ ...formData, unemployedWorkedInLast18Mos: false });
    }

    if(formData.hasIncome === false) {
      setFormData({ ...formData, incomeStreams: [] });
    }

    if(formData.hasExpenses === false) {
      setFormData({ ...formData, expenses: [] });
    }
    
  }, [formData.student, formData.unemployed, formData.hasIncome, formData.hasExpenses]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name !== 'zipcode') {
      setFormData({ ...formData, [name]: Number(value) });
    } else {
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
  
  const handleSubmit = (event, validateInputFunction, inputToBeValidated, numberId) => {
    event.preventDefault();

    if (!validateInputFunction(inputToBeValidated)) {
      navigate(`/step-${numberId + 1}`)
    }  
  }

  const handleHousingSourcesSubmit = (validatedHousingSources) => {
    setFormData({ ...formData, housing: validatedHousingSources });
    setPage(page + 1);
  }
  
  const handleIncomeStreamsSubmit = (validatedIncomeStreams) => {
    setFormData({ ...formData, incomeStreams: validatedIncomeStreams });
    setPage(page + 1);
  }

  const handleExpenseSourcesSubmit = (validatedExpenseSources) => {
    setFormData({ ...formData, expenses: validatedExpenseSources });
    setPage(page + 1);
  }

  return (
    <div className='App'>
      <CssBaseline />
      <AppBar position='relative'>
        <AppBar position='relative'> 
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
      </Routes>
    </div>
  );
}

export default App;
