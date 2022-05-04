import { useState } from 'react';
import QuestionOne from '../QuestionOne/QuestionOne';
import QuestionTwo from '../QuestionTwo/QuestionTwo';
import QuestionThree from '../QuestionThree/QuestionThree';
import QuestionFour from '../QuestionFour/QuestionFour';
import './Form.css';

const Form = () => {
  const [page, setPage] = useState(0);

  const [formData, setFormData] = useState({
    applicantAge: 0,
    zipcode: '',
    isStudent: false,
    isPregnant: false,
    isUnemployed: false,
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
    setFormData({...formData, [value]: !formData[value]})
  }
  
  const displayPage = (pageIndex) => {
    switch(pageIndex) {
      case 0:
        return <QuestionOne 
                formData={formData}
                handleChange={handleChange} 
                page={page}
                setPage={setPage} />
      case 1:
        return <QuestionTwo
                formData={formData}
                handleChange={handleChange} 
                page={page}
                setPage={setPage} />
      case 2:
        return <QuestionThree 
                formData={formData}
                handleCheckboxChange={handleCheckboxChange} 
                page={page}
                setPage={setPage} />
      case 3:
        return <QuestionFour
                formData={formData}
                handleCheckboxChange={handleCheckboxChange} 
                page={page}
                setPage={setPage} />
    }
  }

  return (
    <main className='benefits-form'>
      <p className='step-progress-title'>Step {page + 1} of 7</p>
      <h2 className='sub-header'>Tell us a little more about yourself.</h2>
        {displayPage(page)}
    </main>
  );
}

export default Form;