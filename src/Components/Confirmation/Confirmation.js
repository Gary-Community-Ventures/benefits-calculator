import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@mui/material';
import housingOptions from '../../Assets/housingOptions';
import questions from '../../Assets/questions';
import './Confirmation.css';

const Confirmation = ({ formData }) => {
  const navigate = useNavigate();

  const { applicantAge, zipcode, student, studentFulltime, pregnant, unemployed, unemployedWorkedInLast18Mos,
    blindOrVisuallyImpaired, disabled, veteran, medicaid, disabilityRelatedMedicaid, hasIncome, incomeStreams,
    hasExpenses, expenses, householdSize, householdData, householdAssets, housing } = formData;
  
  const displayAllFormData = () => {
    const householdSizeDescriptor = householdSize === 1 ? 'person' : 'people';
    console.log({householdData})
    return (
      <>
        <p className='confirmation-label'>
          <b>Your household: </b>
          { householdSize } { householdSizeDescriptor }
          <Link to='/step-14' className='edit-link'>Edit</Link>
        </p>
  const onePersonHouseholdDataBlock = () => {
    return (
      <>
        <p className='confirmation-label'>
          <b>You, { applicantAge }, head of household</b>
          <Link to='/step-2' className='edit-link'>Edit</Link>
        </p>
        <article className='confirmation-label'><b>Conditions:</b>
          <Link to='/step-4' className='edit-link'>Edit</Link>
          <ul>
            { studentFulltime && <li> Full-time student </li> }
            { student && (studentFulltime === false) && <li> Student </li> }
            { pregnant && <li> Pregnant </li> }
            { unemployedWorkedInLast18Mos && <li> Unemployed, worked in the last 18 months </li> }
            { unemployed && (unemployedWorkedInLast18Mos === false) && <li> Unemployed </li> }
            { blindOrVisuallyImpaired && <li> Blind or visually impaired </li> }
            { disabled && <li> Disabled </li> }
            { veteran && <li> Veteran </li> }
            { medicaid && <li> Receiving Medicaid </li> }
            { disabilityRelatedMedicaid && <li> Receiving disability-related Medicaid </li> }
          </ul>
        </article>
        <article className='confirmation-label'><b>Income:</b>
          <Link to='/step-12' className='edit-link'>Edit</Link>
          { hasIncome && incomeStreams.length > 0 && <ul> {listAllIncomeStreams()} </ul> }
        </article>
        <article className='confirmation-label'><b>Expenses:</b>
          <Link to='/step-13' className='edit-link'>Edit</Link>
          { hasExpenses && expenses.length > 0 && <ul> {listAllExpenses()} </ul> }
        </article>
      </>
    );
  }
        <p className='confirmation-section-underline'></p>
        <p className='confirmation-label'>
          <b> Household resources: </b>
          ${ householdAssets }
          <Link to='/step-15' className='edit-link'>Edit</Link>
        </p>
        <p className='confirmation-label-description'>This is cash on hand, checking or saving accounts, stocks, bonds or mutual funds.</p>
        <p className='confirmation-section-underline'></p>
        <article className='confirmation-label'>
          <b> Housing: </b>
          <Link to='/step-16' className='edit-link'>Edit</Link>
          { <ul> { listAllHousing() } </ul> }
        </article>
        <p className='confirmation-section-underline'></p>
        <p className='confirmation-label'>
          <b> Your zipcode: </b>
          { zipcode }
          <Link to='/step-3' className='edit-link'>Edit</Link>
        </p>
      </>
    );
  }

  const listAllExpenses = () => {
    const mappedExpenses = expenses.map(expense => {
      return <li key={ expense.expenseSourceName }>${ expense.expenseAmount }, { expense.expenseSourceLabel }, { expense.expenseFrequency }</li>
    });

    return mappedExpenses;
  }

  const listAllHousing = () => {
    const housingKeys = Object.keys(housing);

    const mappedHousingListItems = housingKeys
      .filter(housingOption => housing[housingOption] === true)
      .map(selectedOption => {
        return  <li key={ selectedOption }>{ housingOptions[selectedOption] }</li>;
      });
    
    return mappedHousingListItems;
  }

  const listAllIncomeStreams = () => {
    const mappedListItems = incomeStreams.map(incomeStream => {
      return <li key={ incomeStream.incomeStreamName }>${ incomeStream.incomeAmount }, { incomeStream.incomeStreamLabel }, { incomeStream.incomeFrequency }</li>
    });

    return mappedListItems;
  }

  return (
    <div className='benefits-form'>
      <p className='step-progress-title'>Step 17 of { questions.length + 2 }</p>
      <h2 className='sub-header'>Ok. Here's what we've got so far:</h2>
      <p className='question-label'>Is all of your information correct?</p>
      <div className='confirmation-container'>
        { displayAllFormData() }
        <div className='prev-continue-results-buttons'>
          <Button
            className='prev-button'
            onClick={() => {
              navigate(`/step-16`);
            }}
            variant='contained'>
            Prev
          </Button>
          <Button
            variant='contained'
            onClick={() => navigate('/results')}>
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Confirmation;