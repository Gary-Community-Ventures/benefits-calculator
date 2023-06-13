import { useNavigate, Link, useParams } from 'react-router-dom';
import { Button } from '@mui/material';
import { FormattedMessage, useIntl } from 'react-intl';
import relationshipOptions from '../../Assets/relationshipOptions';
import taxYearOptions from '../../Assets/taxYearOptions';
import referralOptions from '../../Assets/referralOptions';
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
import { useContext } from 'react';
import { Context } from '../Wrapper/Wrapper';
import './Confirmation.css';

const Confirmation = () => {
  const { formData } = useContext(Context);
  const { uuid } = useParams();
  const navigate = useNavigate();
  const intl = useIntl();

  const displayAllMembersDataBlock = () => {
    const { householdData } = formData;
    const allHouseholdRelations = getAllHouseholdRelations();
    const allHouseholdAges = getAllHouseholdAges();

    const householdMemberDataBlocks = householdData.map((personData, i) => {
      const { hasIncome, incomeStreams } = personData;

      return (
        <div key={i}>
          <p className="confirmation-label">
            <b>
              ⚫️ {allHouseholdRelations[i]}, {allHouseholdAges[i]}
            </b>
            <Link to={`/${uuid}/step-${stepDirectory.householdData}/${i + 1}`} className="edit-link">
              <FormattedMessage id="confirmation.editLinkText" defaultMessage="Edit" />
            </Link>
          </p>
          <article className="confirmation-label">
            <b>
              <FormattedMessage
                id="confirmation.headOfHouseholdDataBlock-conditionsText"
                defaultMessage="Conditions:"
              />
            </b>
            {displayConditions(personData)}
          </article>
          <article className="confirmation-label">
            <b>
              <FormattedMessage id="confirmation.headOfHouseholdDataBlock-incomeLabel" defaultMessage="Income:" />
            </b>
            {hasIncome && incomeStreams.length > 0 && <ul> {listAllIncomeStreams(incomeStreams)} </ul>}
            {hasIncome === false && <FormattedMessage id='confirmation.noIncome' defaultMessage=" None" />}
          </article>
        </div>
      );
    });

    return householdMemberDataBlocks;
  };

  const displayHouseholdExpenses = () => {
    const { hasExpenses, expenses } = formData;

    return (
      <article className="confirmation-label">
        <b>
          <FormattedMessage
            id="confirmation.headOfHouseholdDataBlock-expensesLabel"
            defaultMessage="Monthly household expenses:"
          />
        </b>
        <Link to={`/${uuid}/step-${stepDirectory.hasExpenses}`} className="edit-link">
          <FormattedMessage id="confirmation.editLinkText" defaultMessage="Edit" />
        </Link>
        {hasExpenses && expenses.length > 0 && <ul> {listAllExpenses(expenses)} </ul>}
      </article>
    );
  };

  const displayConditions = (userData) => {
    const {
      student,
      studentFulltime,
      pregnant,
      unemployed,
      unemployedWorkedInLast18Mos,
      blindOrVisuallyImpaired,
      disabled,
      veteran,
    } = userData;

    const iterableConditions = [
      student,
      studentFulltime,
      pregnant,
      unemployed,
      unemployedWorkedInLast18Mos,
      blindOrVisuallyImpaired,
      disabled,
      veteran
    ];

    const hasAnyConditions = iterableConditions.some(condition => condition === true);

    if (hasAnyConditions === false) {
      return (
        <FormattedMessage id='confirmation.none' defaultMessage=" None" />
      );
    } else {
      return (
        <ul>
          {studentFulltime && (
            <li>
              <FormattedMessage
                id="confirmation.headOfHouseholdDataBlock-studentFulltimeText"
                defaultMessage="Full-time student"
              />
            </li>
          )}
          {student && studentFulltime === false && (
            <li>
              <FormattedMessage id="confirmation.headOfHouseholdDataBlock-studentText" defaultMessage="Student" />
            </li>
          )}
          {pregnant && (
            <li>
              <FormattedMessage id="confirmation.headOfHouseholdDataBlock-pregnantText" defaultMessage="Pregnant" />
            </li>
          )}
          {unemployedWorkedInLast18Mos && (
            <li>
              <FormattedMessage
                id="confirmation.headOfHouseholdDataBlock-unemployed18MosText"
                defaultMessage="Unemployed, worked in the last 18 months"
              />
            </li>
          )}
          {unemployed && unemployedWorkedInLast18Mos === false && (
            <li>
              <FormattedMessage id="confirmation.headOfHouseholdDataBlock-unemployedText" defaultMessage="Unemployed" />
            </li>
          )}
          {blindOrVisuallyImpaired && (
            <li>
              <FormattedMessage
                id="confirmation.headOfHouseholdDataBlock-blindOrVisuallyImpairedText"
                defaultMessage="Blind or visually impaired"
              />
            </li>
          )}
          {disabled && (
            <li>
              <FormattedMessage id="confirmation.headOfHouseholdDataBlock-disabledText" defaultMessage="Disabled" />
            </li>
          )}
          {veteran && (
            <li>
              <FormattedMessage id="confirmation.headOfHouseholdDataBlock-veteranText" defaultMessage="Veteran" />
            </li>
          )}
        </ul>
      );
    }
  };

  const getAllHouseholdRelations = () => {
    const { householdData } = formData;
    const householdMembers = householdData.map((personData, index) => {
      if (index === 0) {
        return <FormattedMessage id="qcc.hoh-text" defaultMessage="Head of household" key={index} />;
      } else {
        return relationshipOptions[personData.relationshipToHH];
      }
    });

    return householdMembers;
  };

  const getAllHouseholdAges = () => {
    const { householdData } = formData;
    const householdMemberAges = householdData.map((personData) => {
      return Number(personData.age);
    });

    return householdMemberAges;
  };

  const displayHouseholdSizeSection = () => {
    const { householdSize } = formData;
    const householdSizeDescriptor =
      householdSize === 1 ? (
        <FormattedMessage id="confirmation.displayAllFormData-personLabel" defaultMessage="person" />
      ) : (
        <FormattedMessage id="confirmation.displayAllFormData-peopleLabel" defaultMessage="people" />
      );
    return (
      <article className="confirmation-label">
        <b>
          <FormattedMessage id="confirmation.displayAllFormData-yourHouseholdLabel" defaultMessage="Your household: " />
        </b>
        {householdSize} {householdSizeDescriptor}
        <Link to={`/${uuid}/step-${stepDirectory.householdSize}`} className="edit-link">
          <FormattedMessage id="confirmation.editLinkText" defaultMessage="Edit" />
        </Link>
      </article>
    );
  };

  const displayHouseholdAssetsSection = () => {
    const { householdAssets } = formData;
    return (
      <>
        <article className="confirmation-label">
          <b>
            <FormattedMessage
              id="confirmation.displayAllFormData-householdResourcesText"
              defaultMessage="Household resources: "
            />
          </b>
          ${Number(householdAssets).toLocaleString(2)}
          <Link to={`/${uuid}/step-${stepDirectory.householdAssets}`} className="edit-link">
            <FormattedMessage id="confirmation.editLinkText" defaultMessage="Edit" />
          </Link>
        </article>
        <p className="confirmation-label-description">
          <FormattedMessage
            id="confirmation.displayAllFormData-householdResourcesDescription"
            defaultMessage="This is cash on hand, checking or saving accounts, stocks, bonds or mutual funds."
          />
        </p>
      </>
    );
  };

  const displayLastTaxFilingYearSection = () => {
    const { lastTaxFilingYear } = formData;
    return (
      <article className="confirmation-label">
        <b>
          <FormattedMessage
            id="confirmation.displayAllFormData-lastTaxFilingYear"
            defaultMessage="Last Tax Filing Year: "
          />
        </b>
        {taxYearOptions[lastTaxFilingYear]}
        <Link to={`/${uuid}/step-${stepDirectory.lastTaxFilingYear}`} className="edit-link">
          <FormattedMessage id="confirmation.editLinkText" defaultMessage="Edit" />
        </Link>
      </article>
    );
  };

  const displayZipcodeSection = () => {
    const { zipcode, county } = formData;
    return (
      <article className="confirmation-label">
        <b>
          <FormattedMessage id="confirmation.displayAllFormData-zipcodeText" defaultMessage="Zip code: " />
        </b>
        {zipcode}
        <Link to={`/${uuid}/step-${stepDirectory.zipcode}`} className="edit-link">
          <FormattedMessage id="confirmation.editLinkText" defaultMessage="Edit" />
        </Link>
        <br></br>
        <b>
          <FormattedMessage id="confirmation.displayAllFormData-countyText" defaultMessage="County: " />
        </b>
        {county}
      </article>
    );
  };

  const displayReferralSourceSection = () => {
    const { referralSource, otherSource } = formData;
    const referralSourceLabel = referralOptions[referralSource];
    const finalReferralSource = referralSource !== 'other' ? referralSourceLabel : otherSource;

    return (
      <article className="confirmation-label">
        <b>
          <FormattedMessage
            id="confirmation.displayAllFormData-referralSourceText"
            defaultMessage="Referral Source: "
          />
        </b>
        {finalReferralSource}
        <Link to={`/${uuid}/step-${stepDirectory.referralSource}`} className="edit-link">
          <FormattedMessage id="confirmation.editLinkText" defaultMessage="Edit" />
        </Link>
      </article>
    );
  };

  const refactorOptionsList = (options) => {
    return Object.keys(options).reduce((acc, option) => {
      acc[option] = options[option].formattedMessage;
      return acc;
    }, {});
  };

  const displayAllFormData = () => {
    const allBenefitsList = {
      ...cashAssistanceBenefits,
      ...foodAndNutritionBenefits,
      ...childCareBenefits,
      ...housingAndUtilities,
      ...transportationBenefits,
      ...healthCareBenefits,
      ...taxCreditBenefits,
    };

    return (
      <>
        {displayHouseholdSizeSection()}
        {displayAllMembersDataBlock()}
        <p className="confirmation-section-underline"></p>
        {displayHouseholdExpenses()}
        <p className="confirmation-section-underline"></p>
        {displayHouseholdAssetsSection()}
        <p className="confirmation-section-underline"></p>
        {displayHHCheckboxSection(
          'benefits',
          'confirmation.displayAllFormData-currentHHBenefitsText',
          'Household benefits:',
          `/${uuid}/step-${stepDirectory.hasBenefits}`,
          allBenefitsList,
        )}
        <p className="confirmation-section-underline"></p>
        {displayHHCheckboxSection(
          'healthInsurance',
          'confirmation.displayAllFormData-healthInsurance',
          'Household health insurance:',
          `/${uuid}/step-${stepDirectory.healthInsurance}`,
          refactorOptionsList(healthInsuranceOptions),
        )}
        <p className="confirmation-section-underline"></p>
        {displayHHCheckboxSection(
          'acuteHHConditions',
          'confirmation.displayAllFormData-acuteHHConditions',
          'Immediate Needs:',
          `/${uuid}/step-${stepDirectory.acuteHHConditions}`,
          refactorOptionsList(acuteConditionOptions),
        )}
        <p className="confirmation-section-underline"></p>
        {displayReferralSourceSection()}
        <p className="confirmation-section-underline"></p>
        {displayZipcodeSection()}
      </>
    );
  };

  const getExpenseSourceLabel = (expenseSourceName) => {
    return expenseOptions[expenseSourceName];
  };

  const listAllExpenses = (memberExpenses) => {
    const mappedExpenses = memberExpenses.map((expense, index) => {
      return (
        <li key={expense.expenseSourceName + index}>
          {' '}
          {getExpenseSourceLabel(expense.expenseSourceName)}: {formatToUSD(Number(expense.expenseAmount))}{' '}
        </li>
      );
    });

    return mappedExpenses;
  };

  const getIncomeStreamNameLabel = (incomeStreamName) => {
    return incomeOptions[incomeStreamName];
  };

  const getIncomeStreamFrequencyLabel = (incomeFrequency) => {
    return frequencyOptions[incomeFrequency];
  };

  const formatToUSD = (num) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(num);
  };

  const displayAnnualIncome = (incomeStream) => {
    const { incomeAmount, incomeFrequency, hoursPerWeek } = incomeStream;
    const translatedAnnualText = intl.formatMessage({ id: 'displayAnnualIncome.annual' });
    let num = 0;

    switch (incomeFrequency) {
      case 'weekly':
        num = Number(incomeAmount) * 52;
        break;
      case 'biweekly':
        num = Number(incomeAmount) * 26;
        break;
      case 'monthly':
        num = Number(incomeAmount) * 12;
        break;
      case 'hourly':
        num = Number(incomeAmount) * Number(hoursPerWeek) * 52;
        break;
    }

    return `(${formatToUSD(num)}` + translatedAnnualText + `)`;
  };

  const listAllIncomeStreams = (memberIncomeStreams) => {
    const mappedListItems = memberIncomeStreams.map((incomeStream, index) => {
      const incomeStreamName = getIncomeStreamNameLabel(incomeStream.incomeStreamName);
      const incomeAmount = formatToUSD(Number(incomeStream.incomeAmount));
      const incomeFrequency = getIncomeStreamFrequencyLabel(incomeStream.incomeFrequency);
      const hoursPerWeek = incomeStream.hoursPerWeek;
      const translatedHrsPerWkText = intl.formatMessage({
        id: 'listAllIncomeStreams.hoursPerWeek',
      });
      const annualAmount = displayAnnualIncome(incomeStream);

      return (
        <li key={incomeStream.incomeStreamName + index}>
          <p>{incomeStreamName}:</p>
          {incomeStream.incomeFrequency === 'hourly' ? (
            <p>
              {incomeAmount} {incomeFrequency} ~{hoursPerWeek} {translatedHrsPerWkText} {annualAmount}
            </p>
          ) : (
            <p>
              {incomeAmount} {incomeFrequency} {annualAmount}
            </p>
          )}
        </li>
      );
    });

    return mappedListItems;
  };

  const listAllTruthyValues = (selectedOptions, relatedOptionsList) => {
    const mappedListItems = selectedOptions.map((option) => {
      return <li key={option}> {relatedOptionsList[option]} </li>;
    });

    return mappedListItems;
  };

  const displayHHCheckboxSection = (stateVariableName, fMessageId, fMessageDefaultMsg, linkTo, optionsList) => {
    const stateVariableObj = formData[stateVariableName];
    const stateVariableKeys = Object.keys(stateVariableObj);
    const truthyOptions = stateVariableKeys.filter((key) => stateVariableObj[key]);

    return (
      <>
        <article className="confirmation-label">
          <b>
            <FormattedMessage id={fMessageId} defaultMessage={fMessageDefaultMsg} />
          </b>
          <Link to={linkTo} className="edit-link">
            <FormattedMessage id="confirmation.editLinkText" defaultMessage="Edit" />
          </Link>
          <ul>{listAllTruthyValues(truthyOptions, optionsList)}</ul>
        </article>
      </>
    );
  };

  const totalNumberOfQuestions = () => {
    return Object.keys(stepDirectory).length + 2;
  };

  return (
    <main className="benefits-form">
      <h1 className="sub-header">
        <FormattedMessage id="confirmation.return-subheader" defaultMessage="Ok. Here's what we've got:" />
      </h1>
      <div className="confirmation-container">
        {displayAllFormData()}
      </div>
      <div className="prev-continue-results-buttons confirmation">
        <Button
          className="prev-button"
          onClick={() => {
            navigate(`/${uuid}/step-${totalNumberOfQuestions() - 1}`);
          }}
          variant="contained"
        >
          <FormattedMessage id="previousButton" defaultMessage="Prev" />
        </Button>
        <Button variant="contained" onClick={() => navigate(`/${uuid}/results`)}>
          <FormattedMessage id="continueButton" defaultMessage="Continue" />
        </Button>
      </div>
    </main>
  );
};

export default Confirmation;
