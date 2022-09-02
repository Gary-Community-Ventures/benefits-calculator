import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@mui/material';
import { FormattedMessage } from 'react-intl';
import housingOptions from '../../Assets/housingOptions';
import relationshipOptions from '../../Assets/relationshipOptions';
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
      const { hasIncome, incomeStreams, hasExpenses, expenses } = personData;

      return (
        <div key={i}>
          <p className='confirmation-label'>
            <b>{colors[i]} {allHouseholdRelations[i]}, { allHouseholdAges[i] }</b>
            <Link to='/step-15' className='edit-link'>
              <FormattedMessage 
                id='confirmation.editLinkText' 
                defaultMessage='Edit' />
            </Link>
          </p>
          <article className='confirmation-label'>
            <b>
              <FormattedMessage 
                id='confirmation.headOfHouseholdDataBlock-conditionsText' 
                defaultMessage='Conditions:' />
            </b>
          <Link to='/step-15' className='edit-link'>
            <FormattedMessage 
              id='confirmation.editLinkText' 
              defaultMessage='Edit' />
          </Link>
          { displayConditions(personData) }
        </article>
        <article className='confirmation-label'>
          <b>
            <FormattedMessage 
              id='confirmation.headOfHouseholdDataBlock-incomeLabel' 
              defaultMessage='Income:' />
          </b>
          <Link to='/step-15' className='edit-link'>
            <FormattedMessage 
              id='confirmation.editLinkText' 
              defaultMessage='Edit' />
          </Link>
          { hasIncome && incomeStreams.length > 0 && <ul> {listAllIncomeStreams(incomeStreams)} </ul> }
        </article>
        <article className='confirmation-label'>
          <b>
            <FormattedMessage 
              id='confirmation.headOfHouseholdDataBlock-expensesLabel' 
              defaultMessage='Expenses:' />
          </b>
          <Link to='/step-15' className='edit-link'>
            <FormattedMessage 
              id='confirmation.editLinkText' 
              defaultMessage='Edit' />
          </Link>
          { hasExpenses && expenses.length > 0 && <ul> {listAllExpenses(expenses)} </ul> }
        </article>
        </div>
      );
    });

    return [headOfHouseholdDataBlock(), householdMemberDataBlocks];
  }

  const headOfHouseholdDataBlock = () => {
    const { age, hasIncome, incomeStreams, hasExpenses, expenses } = formData;
    return (
      <div key='head-of-household-data-block'>
        <p className='confirmation-label'>
          <b> 
            🔵 
            <FormattedMessage 
              id='confirmation.headOfHouseholdDataBlock-youText' 
              defaultMessage=' You, ' /> 
            { age }, 
            <FormattedMessage 
              id='confirmation.headOfHouseholdDataBlock-headOfHouseholdText' 
              defaultMessage=' head of household' />
          </b>
          <Link to='/step-2' className='edit-link'>
            <FormattedMessage 
                id='confirmation.editLinkText' 
                defaultMessage='Edit' />
          </Link>
        </p>
        <article className='confirmation-label'>
          <b>
            <FormattedMessage 
              id='confirmation.headOfHouseholdDataBlock-conditionsText' 
              defaultMessage='Conditions:' />
          </b>
          <Link to='/step-4' className='edit-link'>
            <FormattedMessage 
              id='confirmation.editLinkText' 
              defaultMessage='Edit' />
          </Link>
          { displayConditions(formData) }
        </article>
        <article className='confirmation-label'>
          <b>
            <FormattedMessage 
              id='confirmation.headOfHouseholdDataBlock-incomeLabel' 
              defaultMessage='Income:' />
          </b>
          <Link to='/step-12' className='edit-link'>
            <FormattedMessage 
              id='confirmation.editLinkText' 
              defaultMessage='Edit' />
          </Link>
          { hasIncome && incomeStreams.length > 0 && <ul> {listAllIncomeStreams(incomeStreams)} </ul> }
        </article>
        <article className='confirmation-label'>
          <b>
            <FormattedMessage 
              id='confirmation.headOfHouseholdDataBlock-expensesLabel' 
              defaultMessage='Expenses:' />
          </b>
          <Link to='/step-13' className='edit-link'>
            <FormattedMessage 
              id='confirmation.editLinkText' 
              defaultMessage='Edit' />
          </Link>
          { hasExpenses && expenses.length > 0 && <ul> {listAllExpenses(expenses)} </ul> }
        </article>
      </div>
    );
  }

  const displayConditions = (userData) => {
    const { student, studentFulltime, pregnant, unemployed, 
      unemployedWorkedInLast18Mos, blindOrVisuallyImpaired, disabled, veteran, medicaid, 
      disabilityRelatedMedicaid } = userData;

    return (
      <ul>
        { studentFulltime && 
          <li> 
            <FormattedMessage 
              id='confirmation.headOfHouseholdDataBlock-studentFulltimeText' 
              defaultMessage='Full-time student' />
          </li> 
        }
        { student && (studentFulltime === false) && 
          <li> 
            <FormattedMessage 
              id='confirmation.headOfHouseholdDataBlock-studentText' 
              defaultMessage='Student' /> 
          </li> 
        }
        { pregnant && 
          <li> 
            <FormattedMessage 
              id='confirmation.headOfHouseholdDataBlock-pregnantText' 
              defaultMessage='Pregnant' />
          </li> 
        }
        { unemployedWorkedInLast18Mos && 
          <li> 
            <FormattedMessage 
              id='confirmation.headOfHouseholdDataBlock-unemployed18MosText' 
              defaultMessage='Unemployed, worked in the last 18 months' />
          </li> 
        }
        { unemployed && (unemployedWorkedInLast18Mos === false) && 
          <li> 
            <FormattedMessage 
              id='confirmation.headOfHouseholdDataBlock-unemployedText' 
              defaultMessage='Unemployed' /> 
          </li> 
        }
        { blindOrVisuallyImpaired && 
          <li> 
            <FormattedMessage 
              id='confirmation.headOfHouseholdDataBlock-blindOrVisuallyImpairedText' 
              defaultMessage='Blind or visually impaired' />
          </li> 
        }
        { disabled && 
          <li> 
            <FormattedMessage 
              id='confirmation.headOfHouseholdDataBlock-disabledText' 
              defaultMessage='Disabled' />
          </li> 
        }
        { veteran && 
          <li> 
            <FormattedMessage 
              id='confirmation.headOfHouseholdDataBlock-veteranText' 
              defaultMessage='Veteran' />
          </li> 
        }
        { medicaid && 
          <li> 
            <FormattedMessage 
              id='confirmation.headOfHouseholdDataBlock-medicaidText' 
              defaultMessage='Receiving Medicaid' /> 
          </li> 
        }
        { disabilityRelatedMedicaid && 
          <li> 
            <FormattedMessage 
              id='confirmation.headOfHouseholdDataBlock-disabilityRelatedMedicaidText' 
              defaultMessage='Receiving disability-related Medicaid ' /> 
          </li> 
        }
      </ul>
    );
  }

  const getAllHouseholdRelations = () => {
    const householdMembers = householdData.map(personData => {      
      return relationshipOptions[personData.relationshipToHH];
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
    const householdSizeDescriptor = 
      householdSize === 1 ? 
        <FormattedMessage 
          id='confirmation.displayAllFormData-personLabel' 
          defaultMessage='person' />
      : 
        <FormattedMessage 
          id='confirmation.displayAllFormData-peopleLabel' 
          defaultMessage='people' /> 
    ;

    return (
      <>
        <p className='confirmation-label'>
          <b>
            <FormattedMessage 
              id='confirmation.displayAllFormData-yourHouseholdLabel' 
              defaultMessage='Your household: ' />
          </b>
          { householdSize } { householdSizeDescriptor }
          <Link to='/step-14' className='edit-link'>
            <FormattedMessage 
              id='confirmation.editLinkText' 
              defaultMessage='Edit' />
          </Link>
        </p>
        { displayAllHouseholdData() }
        <p className='confirmation-section-underline'></p>
        <p className='confirmation-label'>
          <b> 
            <FormattedMessage 
              id='confirmation.displayAllFormData-householdResourcesText' 
              defaultMessage='Household resources: ' />
          </b>
          ${ householdAssets }
          <Link to='/step-16' className='edit-link'>
            <FormattedMessage 
              id='confirmation.editLinkText' 
              defaultMessage='Edit' />
          </Link>
        </p>
        <p className='confirmation-label-description'>
          <FormattedMessage 
            id='confirmation.displayAllFormData-householdResourcesDescription' 
            defaultMessage='This is cash on hand, checking or saving accounts, stocks, bonds or mutual funds.' />
        </p>
        <p className='confirmation-section-underline'></p>
        <article className='confirmation-label'>
          <b> 
            <FormattedMessage 
              id='confirmation.displayAllFormData-housingText' 
              defaultMessage='Housing:' />
            </b>
          <Link to='/step-17' className='edit-link'>
            <FormattedMessage 
              id='confirmation.editLinkText' 
              defaultMessage='Edit' />
          </Link>
          { <ul> { listAllHousing() } </ul> }
        </article>
        <p className='confirmation-section-underline'></p>
        <p className='confirmation-label'>
          <b> 
            <FormattedMessage 
              id='confirmation.displayAllFormData-zipcodeText' 
              defaultMessage='Your zipcode:' /> 
          </b>
          { zipcode }
          <Link to='/step-3' className='edit-link'>
            <FormattedMessage 
              id='confirmation.editLinkText' 
              defaultMessage='Edit' />
          </Link>
        </p>
      </>
    );
  }

  const listAllExpenses = (memberExpenses) => {
    const mappedExpenses = memberExpenses.map(expense => {
      return <li key={ expense.expenseSourceName }>${ expense.expenseAmount.toLocaleString(2) }, { expense.expenseSourceLabel }, { expense.expenseFrequencyLabel }</li>
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
      return <li key={ incomeStream.incomeStreamName }>${ incomeStream.incomeAmount.toLocaleString(2) }, { incomeStream.incomeStreamLabel }, { incomeStream.incomeFrequencyLabel }</li>
    });

    return mappedListItems;
  }

  return (
    <div className='benefits-form'>
      <p className='step-progress-title'>
        <FormattedMessage 
          id='confirmation.return-stepLabel' 
          defaultMessage='Step ' /> 
        17 
        <FormattedMessage 
          id='confirmation.return-ofLabel' 
          defaultMessage=' of ' /> 
        { questions.length + 2 }
      </p>
      <h2 className='sub-header'>
        <FormattedMessage 
          id='confirmation.return-subheader' 
          defaultMessage="Ok. Here's what we've got so far:" />
      </h2>
      <p className='question-label'>
        <FormattedMessage 
          id='confirmation.return-questionLabel' 
          defaultMessage='Is all of your information correct?' />
      </p>
      <div className='confirmation-container'>
        { displayAllFormData() }
        <div className='prev-continue-results-buttons'>
          <Button
            className='prev-button'
            onClick={() => {
              navigate(`/step-16`);
            }}
            variant='contained'>
            <FormattedMessage 
              id='previousButton'
              defaultMessage='Prev' />
          </Button>
          <Button
            variant='contained'
            onClick={() => navigate('/results')}>
            <FormattedMessage 
              id='continueButton'
              defaultMessage='Continue' />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Confirmation;