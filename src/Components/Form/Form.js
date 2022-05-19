import { useState } from 'react';
import QuestionComponentContainer from '../QuestionComponentContainer/QuestionComponentContainer';
import './Form.css';

const Form = () => {
  const [page, setPage] = useState(0);

  const [formData, setFormData] = useState({
    applicantAge: 0,
    zipcode: '',
    isAFullTimeStudent: false,
    isPregnant: false,
    hasWorkedInPast18Mos: false,
    isBlindOrVisuallyImpaired: false,
    isDisabled: false,
    isAVeteran: false,
    isNoneOfTheseApply: true,
    isOnMedicaid: false,
    isOnDisabilityRelatedMedicaid: false,
    isNotReceivingAnyMedicaidBenefits: true 
  });

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