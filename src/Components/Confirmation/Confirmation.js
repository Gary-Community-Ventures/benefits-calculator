import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@mui/material';
import { FormattedMessage } from 'react-intl';
import relationshipOptions from '../../Assets/relationshipOptions';
import taxYearOptions from '../../Assets/taxYearOptions';
import referralOptions from '../../Assets/referralOptions';
import questions from '../../Assets/questions';
import incomeOptions from '../../Assets/incomeOptions';
import frequencyOptions from '../../Assets/frequencyOptions';
import expenseOptions from '../../Assets/expenseOptions';
import healthInsuranceOptions from '../../Assets/healthInsuranceOptions';
import acuteConditionOptions from '../../Assets/acuteConditionOptions';
import cashAssistanceBenefits from '../../Assets/BenefitCategoryLists/cashAssistanceBenefits';
import foodAndNutritionBenefits from '../../Assets/BenefitCategoryLists/foodAndNutritionBenefits';
import childCareBenefits from '../../Assets/BenefitCategoryLists/childCareBenefits';
import housingAndUtilities from '../../Assets/BenefitCategoryLists/housingAndUtilities';
import transportationBenefits from '../../Assets/BenefitCategoryLists/transportationBenefits';
import healthCareBenefits from '../../Assets/BenefitCategoryLists/healthCareBenefits';
import taxCreditBenefits from '../../Assets/BenefitCategoryLists/taxCreditBenefits';
import stepDirectory from '../../Assets/stepDirectory';
import './Confirmation.css';

const Confirmation = ({ formData }) => {
  const navigate = useNavigate();

  const displayAllHouseholdData = () => {
    const { householdSize } = formData;
    if (householdSize > 1) {
      return displayAllMembersDataBlock();
    } else {
      return headOfHouseholdDataBlock();
    }
  }

  const displayAllMembersDataBlock = () => {
    const { householdData } = formData;
    const allHouseholdRelations = getAllHouseholdRelations();
    const allHouseholdAges = getAllHouseholdAges();

    const householdMemberDataBlocks = householdData.map((personData, i) => {
      const { hasIncome, incomeStreams } = personData;

      return (
        <div key={i}>
          <p className='confirmation-label'>
            <b>⚫️ {allHouseholdRelations[i]}, { allHouseholdAges[i] }</b>
            <Link to={`/step-${stepDirectory.householdData}`} className='edit-link'>
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
            <Link to={`/step-${stepDirectory.householdData}`} className='edit-link'>
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
            <Link to={`/step-${stepDirectory.householdData}`} className='edit-link'>
              <FormattedMessage
                id='confirmation.editLinkText'
                defaultMessage='Edit' />
            </Link>
            { hasIncome && incomeStreams.length > 0 && <ul> {listAllIncomeStreams(incomeStreams)} </ul> }
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
            ⚫️
            <FormattedMessage
              id='confirmation.headOfHouseholdDataBlock-youText'
              defaultMessage=' You, ' />
            { age },
            <FormattedMessage
              id='confirmation.headOfHouseholdDataBlock-headOfHouseholdText'
              defaultMessage=' head of household' />
          </b>
          <Link to={`/step-${stepDirectory.age}`} className='edit-link'>
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
          <Link to={`/step-${stepDirectory.student}`} className='edit-link'>
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
          <Link to={`/step-${stepDirectory.hasIncome}`} className='edit-link'>
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
              defaultMessage='Monthly Expenses:' />
          </b>
          <Link to={`/step-${stepDirectory.hasExpenses}`} className='edit-link'>
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
    const { householdData } = formData;
    const householdMembers = householdData.map(personData => {
      return relationshipOptions[personData.relationshipToHH];
    });

    return householdMembers;
  }

  const getAllHouseholdAges = () => {
    const { householdData } = formData;
    const householdMemberAges = householdData.map(personData => {
      return Number(personData.age);
    });

    return householdMemberAges;
  }

  const displayHouseholdSizeSection = () => {
    const { householdSize } = formData;
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
      <article className='confirmation-label'>
        <b>
          <FormattedMessage
            id='confirmation.displayAllFormData-yourHouseholdLabel'
            defaultMessage='Your household: ' />
        </b>
        { householdSize } { householdSizeDescriptor }
        <Link to={`/step-${stepDirectory.householdSize}`} className='edit-link'>
          <FormattedMessage
            id='confirmation.editLinkText'
            defaultMessage='Edit' />
        </Link>
      </article>
    );
  }

  const displayHouseholdAssetsSection = () => {
    const { householdAssets } = formData;
    return (
      <>
        <article className='confirmation-label'>
          <b>
            <FormattedMessage
              id='confirmation.displayAllFormData-householdResourcesText'
              defaultMessage='Household resources: ' />
          </b>
          ${ Number(householdAssets).toLocaleString(2) }
          <Link to={`/step-${stepDirectory.householdAssets}`} className='edit-link'>
            <FormattedMessage
              id='confirmation.editLinkText'
              defaultMessage='Edit' />
          </Link>
        </article>
        <p className='confirmation-label-description'>
          <FormattedMessage
            id='confirmation.displayAllFormData-householdResourcesDescription'
            defaultMessage='This is cash on hand, checking or saving accounts, stocks, bonds or mutual funds.' />
        </p>
      </>
    );
  }

  const displayLastTaxFilingYearSection = () => {
    const { lastTaxFilingYear } = formData;
    return (
      <article className='confirmation-label'>
        <b>
          <FormattedMessage
            id='confirmation.displayAllFormData-lastTaxFilingYear'
            defaultMessage='Last Tax Filing Year: ' />
        </b>
        {taxYearOptions[lastTaxFilingYear]}
        <Link to={`/step-${stepDirectory.lastTaxFilingYear}`} className='edit-link'>
          <FormattedMessage
            id='confirmation.editLinkText'
            defaultMessage='Edit' />
        </Link>
      </article>
    );
  }

  const displayZipcodeSection = () => {
    const { zipcode, county } = formData;
    return (
      <article className='confirmation-label'>
        <b>
          <FormattedMessage
            id='confirmation.displayAllFormData-zipcodeText'
            defaultMessage='Zip code: ' />
        </b>
        { zipcode }
        <Link to={`/step-${stepDirectory.zipcode}`} className='edit-link'>
          <FormattedMessage
            id='confirmation.editLinkText'
            defaultMessage='Edit' />
        </Link>
        <br></br>
        <b>
          <FormattedMessage
            id='confirmation.displayAllFormData-countyText'
            defaultMessage='County: ' />
        </b>
        { county }
      </article>
    );
  }

  const displayReferralSourceSection = () => {
    const { referralSource, otherSource } = formData;
    const referralSourceLabel = referralOptions[referralSource];
    const finalReferralSource = (referralSource !== 'other') ? referralSourceLabel : otherSource;

    return (
      <article className='confirmation-label'>
        <b>
          <FormattedMessage
            id='confirmation.displayAllFormData-referralSourceText'
            defaultMessage='Referral Source: ' />
        </b>
        { finalReferralSource }
        <Link to={`/step-${stepDirectory.referralSource}`} className='edit-link'>
          <FormattedMessage
            id='confirmation.editLinkText'
            defaultMessage='Edit' />
        </Link>
      </article>
    );
  }

  const displayAllFormData = () => {
    const allBenefitsList = {
      ...cashAssistanceBenefits,
      ...foodAndNutritionBenefits,
      ...childCareBenefits,
      ...housingAndUtilities,
      ...transportationBenefits,
      ...healthCareBenefits,
      ...taxCreditBenefits
    };

    return (
      <>
        { displayHouseholdSizeSection() }
        { displayAllHouseholdData() }
        <p className='confirmation-section-underline'></p>
          { displayHouseholdAssetsSection() }
        <p className='confirmation-section-underline'></p>
          { displayHHCheckboxSection('benefits',
            'confirmation.displayAllFormData-currentHHBenefitsText',
            'Household benefits:', `/step-${stepDirectory.hasBenefits}`, allBenefitsList
            )
          }
        <p className='confirmation-section-underline'></p>
          { displayHHCheckboxSection('healthInsurance',
            'confirmation.displayAllFormData-healthInsurance',
            'Household health insurance:', `/step-${stepDirectory.healthInsurance}`, healthInsuranceOptions
            )
          }
        <p className='confirmation-section-underline'></p>
          { displayHHCheckboxSection('acuteHHConditions',
            'confirmation.displayAllFormData-acuteHHConditions',
            'Immediate Needs:', `/step-${stepDirectory.acuteHHConditions}`, acuteConditionOptions
            )
          }
        <p className='confirmation-section-underline'></p>
          { displayLastTaxFilingYearSection() }
        <p className='confirmation-section-underline'></p>
          { displayReferralSourceSection() }
        <p className='confirmation-section-underline'></p>
          { displayZipcodeSection() }
      </>
    );
  }

  const getExpenseSourceLabel = (expenseSourceName) => {
    return expenseOptions[expenseSourceName];
  }

  const listAllExpenses = (memberExpenses) => {
    const mappedExpenses = memberExpenses.map(expense => {
      return <li key={ expense.expenseSourceName }> { getExpenseSourceLabel(expense.expenseSourceName) }: ${ Number(expense.expenseAmount).toLocaleString(2) } </li>
    });

    return mappedExpenses;
  }

  const getIncomeStreamNameLabel = (incomeStreamName) => {
    return incomeOptions[incomeStreamName];
  }

  const getIncomeStreamFrequencyLabel = (incomeFrequency) => {
    return frequencyOptions[incomeFrequency];
  }

  const listAllIncomeStreams = (memberIncomeStreams) => {
    const mappedListItems = memberIncomeStreams.map(incomeStream => {
      return <li key={ incomeStream.incomeStreamName }> { getIncomeStreamNameLabel(incomeStream.incomeStreamName) }: ${ Number(incomeStream.incomeAmount).toLocaleString(2) } / { getIncomeStreamFrequencyLabel(incomeStream.incomeFrequency) }</li>
    });

    return mappedListItems;
  }

  const listAllTruthyValues = (selectedOptions, relatedOptionsList) => {
    const mappedListItems = selectedOptions.map(option => {
      return <li key={ option }> { relatedOptionsList[option] } </li>
    });

    return mappedListItems;
  }

  const displayHHCheckboxSection = (stateVariableName, fMessageId, fMessageDefaultMsg, linkTo, optionsList) => {
    const stateVariableObj = formData[stateVariableName];
    const stateVariableKeys = Object.keys(stateVariableObj);
    const truthyOptions = stateVariableKeys.filter(key => stateVariableObj[key]);

    return (
      <>
        <article className='confirmation-label'>
          <b>
            <FormattedMessage
              id={fMessageId}
              defaultMessage={fMessageDefaultMsg} />
          </b>
          <Link to={linkTo} className='edit-link'>
            <FormattedMessage
              id='confirmation.editLinkText'
              defaultMessage='Edit' />
          </Link>
          <ul>
            { listAllTruthyValues(truthyOptions, optionsList) }
          </ul>
        </article>
      </>
    );
  }

  const totalNumberOfQuestions = () => {
    return Object.keys(stepDirectory).length + 2;
  }

  return (
    <div className='benefits-form'>
      <p className='step-progress-title'>
        <FormattedMessage
          id='confirmation.return-stepLabel'
          defaultMessage='Step ' />
        { totalNumberOfQuestions() }
        <FormattedMessage
          id='confirmation.return-ofLabel'
          defaultMessage=' of ' />
        { totalNumberOfQuestions() }
      </p>
      <h2 className='sub-header'>
        <FormattedMessage
          id='confirmation.return-subheader'
          defaultMessage="Ok. Here's what we've got:" />
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
              navigate(`/step-${totalNumberOfQuestions() - 1}`);
            }}
            variant='contained'>
            <FormattedMessage
              id='previousButton'
              defaultMessage='Prev' />
          </Button>
          <Button
            variant='contained'
            onClick={() => navigate('/submit-screen')}>
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
