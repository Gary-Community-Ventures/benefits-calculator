import { useState, useEffect } from 'react';
import questions from '../../Assets/questions';
import QuestionComponentContainer from '../QuestionComponentContainer/QuestionComponentContainer';
import './Form.css';

const Form = () => {
  const [page, setPage] = useState(4);

  const [formData, setFormData] = useState({
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
    housing: []
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
  };

  const handleCheckboxChange = (event) => {
    //will need this for legal terms of agreement checkbox
    const { value } = event.target;
    setFormData({ ...formData, [value]: !formData[value] });
  }
  
  const handleRadioButtonChange = (event) => {
    const { name, value } = event.target;
    let boolValue = (value === 'true');
    setFormData({ ...formData, [name]: boolValue });
  }
  
  const handleSubmit = (event, validateInputFunction, inputToBeValidated) => {
    event.preventDefault();
    if (!validateInputFunction(inputToBeValidated)) {
      setPage(page + 1);
    }
  }  
  
  const handleIncomeStreamsSubmit = (validatedIncomeStreams) => {
    setFormData({ ...formData, incomeStreams: validatedIncomeStreams });
    setPage(page + 1);
  }

  const handleExpenseSourcesSubmit = (validatedExpenseSources) => {
    setFormData({ ...formData, expenses: validatedExpenseSources });
    setPage(page + 1);
  }

  const displayPage = () => {
    return <QuestionComponentContainer 
            formData={formData} 
            handleChange={handleChange} 
            handleSubmit={handleSubmit}
            page={page}
            setPage={setPage} 
            handleRadioButtonChange={handleRadioButtonChange} 
            handleIncomeStreamsSubmit={handleIncomeStreamsSubmit} 
            handleExpenseSourcesSubmit={handleExpenseSourcesSubmit} /> 
  }  

  return (
    <main className='benefits-form'>
      <p className='step-progress-title'>Step {page + 1} of {questions.length}</p>
      <h2 className='sub-header'>Tell us a little more about yourself.</h2>
        {displayPage()}
    </main>
  );
}

export default Form;