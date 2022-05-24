import { useState, useEffect } from 'react';
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
    incomeStreams: {
      wages: {incomeWagesAmount: 0, incomeWagesFreq: ''},
      selfEmployment: {incomeWagesAmount: 0, incomeWagesFreq: ''},
      unemployment: {incomeWagesAmount: 0, incomeWagesFreq: ''},
      cashAssistance: {incomeWagesAmount: 0, incomeWagesFreq: ''},
      childSupport: {incomeWagesAmount: 0, incomeWagesFreq: ''},
      disabilityMedicaid: {incomeWagesAmount: 0, incomeWagesFreq: ''},
      sSI: {incomeWagesAmount: 0, incomeWagesFreq: ''},
      sSDependent: {incomeWagesAmount: 0, incomeWagesFreq: ''},
      sSDisability: {incomeWagesAmount: 0, incomeWagesFreq: ''},
      sSSurvivor: {incomeWagesAmount: 0, incomeWagesFreq: ''},
      sSRetirement: {incomeWagesAmount: 0, incomeWagesFreq: ''},
      nYSDisability: {incomeWagesAmount: 0, incomeWagesFreq: ''},
      veteran: {incomeWagesAmount: 0, incomeWagesFreq: ''},
      pension: {incomeWagesAmount: 0, incomeWagesFreq: ''},
      deferredComp: {incomeWagesAmount: 0, incomeWagesFreq: ''},
      workersComp: {incomeWagesAmount: 0, incomeWagesFreq: ''},
      alimony: {incomeWagesAmount: 0, incomeWagesFreq: ''},
      boarder: {incomeWagesAmount: 0, incomeWagesFreq: ''},
      gifts: {incomeWagesAmount: 0, incomeWagesFreq: ''},
      rental: {incomeWagesAmount: 0, incomeWagesFreq: ''},
      investment: {incomeWagesAmount: 0, incomeWagesFreq: ''}
    },
    
  });

  useEffect(() => {
    if (formData.student === false) {
      setFormData({ ...formData, studentFulltime: false });
    }
    if (formData.unemployed === false) { 
      setFormData({ ...formData, unemployedWorkedInLast18Mos: false });
    }
  }, [formData.student, formData.unemployed]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCheckboxChange = (event) => {
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
  
  const displayPage = () => {
    return <QuestionComponentContainer 
            formData={formData} 
            handleChange={handleChange} 
            handleSubmit={handleSubmit}
            page={page}
            setPage={setPage} 
            handleRadioButtonChange={handleRadioButtonChange} /> 
  }  

  return (
    <main className='benefits-form'>
      <p className='step-progress-title'>Step {page + 1} of 7</p>
      <h2 className='sub-header'>Tell us a little more about yourself.</h2>
        {displayPage()}
    </main>
  );
}

export default Form;