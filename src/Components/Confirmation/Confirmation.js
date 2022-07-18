import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@mui/material';
import housingOptions from '../../Assets/housingOptions';
import questions from '../../Assets/questions';
import './Confirmation.css';

const Confirmation = ({ formData }) => {
  const navigate = useNavigate();
  const { zipcode, householdSize, householdData, householdAssets, housing } = formData;
  
  const displayAllHouseholdData = () => {
    if (householdSize > 1) {
      return displayAllMembersDataBlock();
    } else {
      return headOfHouseholdDataBlock();
    }
  }

  const displayAllMembersDataBlock = () => {
    const allHouseholdRelations = getAllHouseholdRelations();
    const allHouseholdAges = getAllHouseholdAges();
    const colors = ['🟢', '🟡', '🟣', '🟠', '🟤', '⚫️', '🔴'];

    const householdMemberDataBlocks = householdData.map((personData, i) => {
      const { student, studentFulltime, pregnant, unemployed, unemployedWorkedInLast18Mos,
        blindOrVisuallyImpaired, disabled, veteran, medicaid, disabilityRelatedMedicaid, 
        hasIncome, incomeStreams, hasExpenses, expenses } = personData;

      return (
        <div key={i}>
          <p className='confirmation-label'>
            <b>{colors[i]} {allHouseholdRelations[i]}, { allHouseholdAges[i] }</b>
            <Link to='/step-15' className='edit-link'>Edit</Link>
          </p>
          <article className='confirmation-label'><b>Conditions:</b>
          <Link to='/step-15' className='edit-link'>Edit</Link>
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
          <Link to='/step-15' className='edit-link'>Edit</Link>
          { hasIncome && incomeStreams.length > 0 && <ul> {listAllIncomeStreams(incomeStreams)} </ul> }
        </article>
        <article className='confirmation-label'><b>Expenses:</b>
          <Link to='/step-15' className='edit-link'>Edit</Link>
          { hasExpenses && expenses.length > 0 && <ul> {listAllExpenses(expenses)} </ul> }
        </article>
        </div>
      );
    });

    return [headOfHouseholdDataBlock(), householdMemberDataBlocks];
  }

  const headOfHouseholdDataBlock = () => {
    const { applicantAge, student, studentFulltime, pregnant, unemployed, 
      unemployedWorkedInLast18Mos, blindOrVisuallyImpaired, disabled, veteran, medicaid, 
      disabilityRelatedMedicaid, hasIncome, incomeStreams, hasExpenses, expenses } = formData;

    return (
      <div key='head-of-household-data-block'>
        <p className='confirmation-label'>
          <b>🔵 You, { applicantAge }, head of household</b>
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
          { hasIncome && incomeStreams.length > 0 && <ul> {listAllIncomeStreams(incomeStreams)} </ul> }
        </article>
        <article className='confirmation-label'><b>Expenses:</b>
          <Link to='/step-13' className='edit-link'>Edit</Link>
          { hasExpenses && expenses.length > 0 && <ul> {listAllExpenses(expenses)} </ul> }
        </article>
      </div>
    );
  }

  const getAllHouseholdRelations = () => {
    const householdMembers = householdData.map(personData => {
      const upperCaseFirstLetter = personData.relationshipToHH[0].toUpperCase();
      const upperCaseRelation = upperCaseFirstLetter + personData.relationshipToHH.slice(1);
      const relationString =  upperCaseRelation.split(/(?=[A-Z])/).join(' ');
      
      return relationString;
    });
    
    return householdMembers;
  }

  const getAllHouseholdAges = () => {    
    const householdMemberAges = householdData.map(personData => {
      return Number(personData.age);
    });

    return householdMemberAges;
  }
  
  const displayAllFormData = () => {
    const householdSizeDescriptor = householdSize === 1 ? 'person' : 'people';

    return (
      <>
        <p className='confirmation-label'>
          <b>Your household: </b>
          { householdSize } { householdSizeDescriptor }
          <Link to='/step-14' className='edit-link'>Edit</Link>
        </p>
        { displayAllHouseholdData() }
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

  const listAllExpenses = (memberExpenses) => {
    const mappedExpenses = memberExpenses.map(expense => {
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

  const listAllIncomeStreams = (memberIncomeStreams) => {
    const mappedListItems = memberIncomeStreams.map(incomeStream => {
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