import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import housingOptions from '../../Assets/housingOptions';
import questions from '../../Assets/questions';
import './Confirmation.css';

const Confirmation = ({ formData }) => {
  const navigate = useNavigate();

  const { applicantAge, zipcode, student, studentFulltime, isPregnant, unemployed, unemployedWorkedInLast18Mos,
    isBlindOrVisuallyImpaired, isDisabled, isAVeteran, isOnMedicaid, isOnDisabilityRelatedMedicaid, hasIncome, incomeStreams,
    hasExpenses, expenses, householdSize, householdAssets, housing } = formData;
  
  const displayAllFormData = () => {
    const householdSizeDescriptor = householdSize === 1 ? 'person' : 'people';
    
    return (
      <>
        <p className='confirmation-label'>
          <b>Your household: </b>
          { householdSize } {householdSizeDescriptor}
        </p>
        <p className='confirmation-label'>
          <b>You, {applicantAge}, head of household</b>
        </p>
        <article className='confirmation-label'><b>Conditions:</b>
          <ul>
            { studentFulltime && <li> Full-time student </li> }
            { student && (studentFulltime === false) && <li> Student </li> }
            { isPregnant && <li> Pregnant </li> }
            { unemployedWorkedInLast18Mos && <li> Unemployed, worked in the last 18 months </li> }
            { unemployed && (unemployedWorkedInLast18Mos === false) && <li> Unemployed </li> }
            { isBlindOrVisuallyImpaired && <li> Blind or visually impaired </li> }
            { isDisabled && <li> Disabled </li> }
            { isAVeteran && <li> Veteran </li> }
            { isOnMedicaid && <li> Receiving Medicaid </li> }
            { isOnDisabilityRelatedMedicaid && <li> Receiving disability-related Medicaid </li> }
          </ul>
        </article>
        <article className='confirmation-label'><b>Income:</b>
          { hasIncome && incomeStreams.length > 0 && <ul> {listAllIncomeStreams()} </ul> }
        </article>
        <article className='confirmation-label'><b>Expenses:</b>
          { hasExpenses && expenses.length > 0 && <ul> {listAllExpenses()} </ul> }
        </article>
        <p className='confirmation-label'>
          <b> Household resources: </b>
          ${householdAssets}
        </p>
        <p className='confirmation-label-description'>This is cash on hand, checking or saving accounts, stocks, bonds or mutual funds.</p>
        <article className='confirmation-label'>
          <b> Housing: </b>
          { <ul> {listAllHousing()} </ul> }
        </article>
        <p className='confirmation-label'>
          <b> Your zipcode: </b>
          { zipcode }
        </p>
      </>
    );
  }

  const listAllExpenses = () => {
    const mappedExpenses = expenses.map(expense => {
      return <li key={expense.expenseSourceName}>${expense.expenseAmount}, {expense.expenseSourceLabel}, {expense.expenseFrequency}</li>
    });

    return mappedExpenses;
  }

  const listAllHousing = () => {
    const housingKeys = Object.keys(housing);

    const mappedHousingListItems = housingKeys
      .filter(housingOption => housing[housingOption] === true)
      .map(selectedOption => {
        return  <li key={selectedOption}>{housingOptions[selectedOption]}</li>;
      });
    
    return mappedHousingListItems;
  }

  const listAllIncomeStreams = () => {
    const mappedListItems = incomeStreams.map(incomeStream => {
      return <li key={incomeStream.incomeStreamName}>${incomeStream.incomeAmount}, {incomeStream.incomeStreamLabel}, {incomeStream.incomeFrequency}</li>
    });

    return mappedListItems;
  }

  return (
    <div className='benefits-form'>
      <p className='step-progress-title'>Step 17 of {questions.length + 2}</p>
      <h2 className='sub-header'>Ok. Here's what we've got so far:</h2>
      <p className='question-label'>Is all of your information correct?</p>
      <div className='confirmation-container'>
        {displayAllFormData()}
        <div className='income-block-question-buttons'>
        <Button
          onClick={() => {
            navigate(`/step-16`);
          }}
          variant='contained'>
          Prev
        </Button>
          <Button
            variant='contained'
            onClick={() => navigate('/results')}>
            Yes, continue to my results
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Confirmation;