import housingOptions from '../../Assets/housingOptions';
import './Confirmation.css';

const Confirmation = ({ formData, page, setPage }) => {
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

  return (
    <div className='confirmation-container'>
      {displayAllFormData()}
    </div>
  );
}

export default Confirmation;