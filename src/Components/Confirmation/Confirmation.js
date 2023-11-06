import { useNavigate, Link, useParams } from 'react-router-dom';
import { Button } from '@mui/material';
import { FormattedMessage, useIntl } from 'react-intl';
import relationshipOptions from '../../Assets/relationshipOptions';
import referralOptions from '../../Assets/referralOptions';
import incomeOptions from '../../Assets/incomeOptions';
import frequencyOptions from '../../Assets/frequencyOptions';
import expenseOptions from '../../Assets/expenseOptions';
import healthInsuranceOptions from '../../Assets/healthInsuranceOptions.tsx';
import acuteConditionOptions from '../../Assets/acuteConditionOptions';
import cashAssistanceBenefits from '../../Assets/BenefitCategoryLists/categories/cashAssistanceBenefits.tsx';
import foodAndNutritionBenefits from '../../Assets/BenefitCategoryLists/categories/foodAndNutritionBenefits';
import childCareBenefits from '../../Assets/BenefitCategoryLists/categories/childCareBenefits';
import housingAndUtilities from '../../Assets/BenefitCategoryLists/categories/housingAndUtilities';
import transportationBenefits from '../../Assets/BenefitCategoryLists/categories/transportationBenefits';
import healthCareBenefits from '../../Assets/BenefitCategoryLists/categories/healthCareBenefits';
import taxCreditBenefits from '../../Assets/BenefitCategoryLists/categories/taxCreditBenefits';
import { getStepDirectory, getStepNumber, startingQuestionNumber } from '../../Assets/stepDirectory';
import { useContext, useEffect } from 'react';
import { Context } from '../Wrapper/Wrapper.tsx';
import Grid from '@mui/material/Grid';
import EditIcon from '@mui/icons-material/Edit';
import HomeIcon from '@mui/icons-material/Home';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import ChecklistIcon from '@mui/icons-material/Checklist';
import FoodBankIcon from '@mui/icons-material/FoodBank';
import PeopleIcon from '@mui/icons-material/People';
import PersonIcon from '@mui/icons-material/Person';
import PaymentsIcon from '@mui/icons-material/Payments';
import SavingsIcon from '@mui/icons-material/Savings';
import ConnectWithoutContactIcon from '@mui/icons-material/ConnectWithoutContact';
import './Confirmation.css';

const Confirmation = () => {
  const { formData } = useContext(Context);
  const { uuid } = useParams();
  const navigate = useNavigate();
  const intl = useIntl();

  const getQuestionUrl = (name) => {
    const stepNumber = getStepNumber(name, formData.immutableReferrer);

    return `/${uuid}/step-${stepNumber}`;
  };

  useEffect(() => {
    const continueOnEnter = (event) => {
      if (event.key === 'Enter') {
        navigate(`/${uuid}/results`);
      }
    };
    document.addEventListener('keyup', continueOnEnter);
    return () => {
      document.removeEventListener('keyup', continueOnEnter); // remove event listener on onmount
    };
  });

  const displayAllMembersDataBlock = () => {
    const { householdData } = formData;
    const allHouseholdRelations = getAllHouseholdRelations();
    const allHouseholdAges = getAllHouseholdAges();

    const householdMemberDataBlocks = householdData.map((personData, i) => {
      const { hasIncome, incomeStreams, healthInsurance } = personData;

      return (
        <div key={i}>
          <Grid container spacing={1}>
            <Grid item xs={2}>
              <PersonIcon className="home-icon" />
            </Grid>
            <Grid item xs={8}>
              <p className="section-title">{allHouseholdRelations[i]}</p>
              <article className="section-p">
                <b>
                  <FormattedMessage id="questions.age-inputLabel" defaultMessage="Age" />
                  {': '}
                </b>
                {allHouseholdAges[i]}
              </article>
              <article className="section-p">
                <b>
                  <FormattedMessage
                    id="confirmation.headOfHouseholdDataBlock-conditionsText"
                    defaultMessage="Conditions:"
                  />{' '}
                </b>
                {displayConditions(personData)}
              </article>
              <article className="section-p">
                <b>
                  <FormattedMessage id="confirmation.headOfHouseholdDataBlock-incomeLabel" defaultMessage="Income:" />{' '}
                </b>
                {hasIncome && incomeStreams.length > 0 && <ul> {listAllIncomeStreams(incomeStreams)} </ul>}
                {hasIncome === false && <FormattedMessage id="confirmation.noIncome" defaultMessage=" None" />}
              </article>
              {displayHHMHealthInsuranceSection(healthInsurance)}
            </Grid>
            <Grid item xs={2} display="flex" justifyContent="flex-end">
              <button
                aria-label="edit household member"
                onClick={() => navigate(getQuestionUrl('householdData') + `/${i + 1}`)}
              >
                <EditIcon className="edit-icon" />
              </button>
            </Grid>
          </Grid>
          <p className="confirmation-section-underline"></p>
        </div>
      );
    });

    return householdMemberDataBlocks;
  };

  const displayHHMHealthInsuranceSection = (hHMemberHealthInsurance) => {
    return (
      <article className="section-p">
        <b>
          <FormattedMessage
            id="confirmation.headOfHouseholdDataBlock-healthInsuranceText"
            defaultMessage="Health Insurance: "
          />{' '}
        </b>
        {displayHealthInsurance(hHMemberHealthInsurance)}
      </article>
    );
  };

  const displayHouseholdExpenses = () => {
    const { hasExpenses, expenses } = formData;

    return (
      <Grid container spacing={1}>
        <Grid item xs={2}>
          <PaymentsIcon className="home-icon" />
        </Grid>
        <Grid item xs={8}>
          <p className="section-title">
            <FormattedMessage
              id="confirmation.headOfHouseholdDataBlock-expensesLabel"
              defaultMessage="Monthly Household Expenses"
            />
          </p>
          {hasExpenses && expenses.length > 0 ? (
            listAllExpenses(expenses)
          ) : (
            <FormattedMessage id="confirmation.none" defaultMessage=" None" />
          )}
        </Grid>
        <Grid item xs={2} display="flex" justifyContent="flex-end">
          <button aria-label="edit expenses" onClick={() => navigate(getQuestionUrl('hasExpenses'))}>
            <EditIcon className="edit-icon" />
          </button>
        </Grid>
      </Grid>
    );
  };

  const displayConditions = (userData) => {
    const { student, pregnant, blindOrVisuallyImpaired, disabled } = userData;

    const iterableConditions = [student, pregnant, blindOrVisuallyImpaired, disabled];

    const hasAnyConditions = iterableConditions.some((condition) => condition === true);

    if (hasAnyConditions === false) {
      return <FormattedMessage id="confirmation.none" defaultMessage=" None" />;
    } else {
      return getConditionsStringWithCommas(student, pregnant, blindOrVisuallyImpaired, disabled);
    }
  };

  const getFormattedMessageString = (fMObj) => {
    return intl.formatMessage({ id: fMObj.id, defaultMessage: fMObj.defaultMessage });
  };

  const getConditionsStringWithCommas = (student, pregnant, blindOrVisuallyImpaired, disabled) => {
    const conditions = [];

    if (student) {
      conditions.push(
        getFormattedMessageString({
          id: 'confirmation.headOfHouseholdDataBlock-studentText',
          defaultMessage: 'Student',
        }),
      );
    }

    if (pregnant) {
      conditions.push(
        getFormattedMessageString({
          id: 'confirmation.headOfHouseholdDataBlock-pregnantText',
          defaultMessage: 'Pregnant',
        }),
      );
    }

    if (blindOrVisuallyImpaired) {
      conditions.push(
        getFormattedMessageString({
          id: 'confirmation.headOfHouseholdDataBlock-blindOrVisuallyImpairedText',
          defaultMessage: 'Blind or visually impaired',
        }),
      );
    }

    if (disabled) {
      conditions.push(
        getFormattedMessageString({
          id: 'confirmation.headOfHouseholdDataBlock-disabledText',
          defaultMessage: 'Disabled',
        }),
      );
    }

    return conditions.join(', ');
  };

  const getAllHouseholdRelations = () => {
    const { householdData } = formData;
    const householdMembers = householdData.map((personData, index) => {
      if (index === 0) {
        return <FormattedMessage id="qcc.hoh-text" defaultMessage="Head of Household (You)" key={index} />;
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
    const linkTo = getQuestionUrl('householdSize');

    return (
      <Grid container spacing={1}>
        <Grid item xs={2}>
          <PeopleIcon className="home-icon" />
        </Grid>
        <Grid item xs={8}>
          <p className="section-title">
            <FormattedMessage
              id="confirmation.displayAllFormData-yourHouseholdLabel"
              defaultMessage="Household Members"
            />
          </p>
          <article className="section-p">
            <b>
              <FormattedMessage id="questions.householdSize-inputLabel" defaultMessage="Household Size" />
              {': '}
            </b>
            {householdSize} {householdSizeDescriptor}
          </article>
        </Grid>
        <Grid item xs={2} display="flex" justifyContent="flex-end">
          <button aria-label="edit household size" onClick={() => navigate(linkTo)}>
            <EditIcon className="edit-icon" />
          </button>
        </Grid>
      </Grid>
    );
  };

  const displayHouseholdAssetsSection = () => {
    const { householdAssets } = formData;
    return (
      <Grid container spacing={1}>
        <Grid item xs={2}>
          <SavingsIcon className="home-icon" />
        </Grid>
        <Grid item xs={8}>
          <p className="section-title">
            <FormattedMessage
              id="confirmation.displayAllFormData-householdResourcesText"
              defaultMessage="Household resources"
            />
          </p>
          <article className="section-p">
            ${Number(householdAssets).toLocaleString(2)}
            <i>
              <FormattedMessage
                id="confirmation.displayAllFormData-householdResourcesDescription"
                defaultMessage="(This is cash on hand, checking or saving accounts, stocks, bonds or mutual funds.)"
              />
            </i>
          </article>
        </Grid>
        <Grid item xs={2} display="flex" justifyContent="flex-end">
          <button aria-label="edit household assets" onClick={() => navigate(getQuestionUrl('householdAssets'))}>
            <EditIcon className="edit-icon" />
          </button>
        </Grid>
      </Grid>
    );
  };

  const displayZipcodeSection = () => {
    const { zipcode, county } = formData;
    return (
      <Grid container spacing={1}>
        <Grid item xs={2}>
          <HomeIcon className="home-icon" />
        </Grid>
        <Grid item xs={8}>
          <p className="section-title">
            <FormattedMessage id="confirmation.residenceInfo" defaultMessage="Residence Information" />
          </p>
          <p className="section-p">
            <b>
              <FormattedMessage id="confirmation.displayAllFormData-zipcodeText" defaultMessage="Zip code: " />
            </b>
            {zipcode}
          </p>
          <p className="section-p">
            <b>
              <FormattedMessage id="confirmation.displayAllFormData-countyText" defaultMessage="County: " />
            </b>
            {county}
          </p>
        </Grid>
        <Grid item xs={2} display="flex" justifyContent="flex-end">
          <button aria-label="edit zipcode" onClick={() => navigate(getQuestionUrl('zipcode'))}>
            <EditIcon className="edit-icon" />
          </button>
        </Grid>
      </Grid>
    );
  };

  const displayReferralSourceSection = () => {
    const { referralSource, otherSource } = formData;
    const referralSourceLabel = referralOptions[referralSource];
    const finalReferralSource = referralSource !== 'other' ? referralSourceLabel : otherSource;

    if (formData.immutableReferrer) {
      return <></>;
    }

    return (
      <>
        <p className="confirmation-section-underline"></p>
        <Grid container spacing={1}>
          <Grid item xs={2}>
            <ConnectWithoutContactIcon className="home-icon flip-horizontally" />
          </Grid>
          <Grid item xs={8}>
            <p className="section-title">
              <FormattedMessage
                id="confirmation.displayAllFormData-referralSourceText"
                defaultMessage="Referral Source"
              />
            </p>
            <article className="section-p">{finalReferralSource}</article>
          </Grid>
          <Grid item xs={2} display="flex" justifyContent="flex-end">
            <button aria-label="edit referral source" onClick={() => navigate(getQuestionUrl('referralSource'))}>
              <EditIcon className="edit-icon" />
            </button>
          </Grid>
        </Grid>
      </>
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
        {displayZipcodeSection()}
        <p className="confirmation-section-underline"></p>
        {displayHouseholdSizeSection()}
        <p className="confirmation-section-underline"></p>
        {displayAllMembersDataBlock()}
        {displayHouseholdExpenses()}
        <p className="confirmation-section-underline"></p>
        {displayHouseholdAssetsSection()}
        <p className="confirmation-section-underline"></p>
        {displayHHCheckboxSection(
          'benefits',
          'confirmation.displayAllFormData-currentHHBenefitsText',
          'Current Household Benefits:',
          getQuestionUrl('hasBenefits'),
          allBenefitsList,
          <ChecklistIcon className="home-icon" />,
          'edit current benefits',
        )}
        <p className="confirmation-section-underline"></p>
        {displayHHCheckboxSection(
          'acuteHHConditions',
          'confirmation.displayAllFormData-acuteHHConditions',
          'Immediate Needs',
          getQuestionUrl('acuteHHConditions'),
          refactorOptionsList(acuteConditionOptions),
          <FoodBankIcon className="home-icon" />,
        )}
        {displayReferralSourceSection()}
      </>
    );
  };

  const getExpenseSourceLabel = (expenseSourceName) => {
    return expenseOptions[expenseSourceName];
  };

  const listAllExpenses = (memberExpenses) => {
    const mappedExpenses = memberExpenses.map((expense, index) => {
      return (
        <article key={expense.expenseSourceName + index} className="section-p">
          {' '}
          <b>{getExpenseSourceLabel(expense.expenseSourceName)}: </b>
          {formatToUSD(Number(expense.expenseAmount))}{' '}
        </article>
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
    const translatedAnnualText = intl.formatMessage({ id: 'displayAnnualIncome.annual', defaultMessage: ' annually' });
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
        defaultMessage: ' hours/week ',
      });
      const annualAmount = displayAnnualIncome(incomeStream);

      return (
        <li key={incomeStream.incomeStreamName + index}>
          <b>{incomeStreamName}: </b>
          {incomeStream.incomeFrequency === 'hourly' ? (
            <>
              {incomeAmount} {incomeFrequency} ~{hoursPerWeek} {translatedHrsPerWkText} {annualAmount}
            </>
          ) : (
            <>
              {incomeAmount} {incomeFrequency} {annualAmount}
            </>
          )}
        </li>
      );
    });

    return mappedListItems;
  };

  const listAllTruthyValues = (selectedOptions, relatedOptionsList) => {
    const mappedListItems = selectedOptions.map((option) => {
      return (
        <p key={option} className="bottom-margin">
          {' '}
          {relatedOptionsList[option]}{' '}
        </p>
      );
    });

    return mappedListItems;
  };

  const displayHHCheckboxSection = (
    stateVariableName,
    fMessageId,
    fMessageDefaultMsg,
    linkTo,
    optionsList,
    iconComp,
    ariaLabel,
  ) => {
    const stateVariableObj = formData[stateVariableName];
    const stateVariableKeys = Object.keys(stateVariableObj);
    const truthyOptions = stateVariableKeys.filter((key) => stateVariableObj[key]);
    const hasAnyTruthyOptions = stateVariableKeys.some((key) => stateVariableObj[key]);

    return (
      <Grid container spacing={1}>
        <Grid item xs={2}>
          {iconComp}
        </Grid>
        <Grid item xs={8}>
          <p className="section-title">
            <FormattedMessage id={fMessageId} defaultMessage={fMessageDefaultMsg} />
          </p>
          {hasAnyTruthyOptions ? (
            <article className="section-p">{listAllTruthyValues(truthyOptions, optionsList)}</article>
          ) : (
            <p className="section-p">
              <FormattedMessage id="confirmation.noIncome" defaultMessage=" None" />
            </p>
          )}
        </Grid>
        <Grid item xs={2} display="flex" justifyContent="flex-end">
          <button aria-label={ariaLabel} onClick={() => navigate(linkTo)}>
            <EditIcon className="edit-icon" />
          </button>
        </Grid>
      </Grid>
    );
  };

  const totalNumberOfQuestions = () => {
    return getStepDirectory(formData.immutableReferrer).length + startingQuestionNumber;
  };

  const displayHealthInsurance = (hHMemberHealthInsurance) => {
    const selectedDontKnow = hHMemberHealthInsurance.dont_know === true;
    const selectedNone = hHMemberHealthInsurance.none === true;
    const allOtherSelectedOptions = Object.entries(hHMemberHealthInsurance).filter(
      (hHMemberInsEntry) => hHMemberInsEntry[1] === true,
    );

    const allOtherSelectedOptionsString = allOtherSelectedOptions.reduce((acc, filteredHHMInsEntry, index) => {
      const formattedMessageProp = healthInsuranceOptions[filteredHHMInsEntry[0]].formattedMessage.props;
      const translatedAriaLabel = intl.formatMessage({ ...formattedMessageProp });

      if (allOtherSelectedOptions.length - 1 === index) {
        //we're at the last element in the array => don't include the comma
        return (acc += translatedAriaLabel);
      } else {
        //include a comma to separate each string
        return (acc += translatedAriaLabel + ', ');
      }
    }, '');

    if (selectedDontKnow) {
      return <>{healthInsuranceOptions.dont_know.formattedMessage}</>;
    } else if (selectedNone) {
      return <>{healthInsuranceOptions.none.formattedMessage}</>;
    } else {
      return <>{allOtherSelectedOptionsString}</>;
    }
  };

  return (
    <main className="benefits-form">
      <h1 className="sub-header">
        <FormattedMessage id="confirmation.return-subheader" defaultMessage="Ok. Here's what we've got:" />
      </h1>
      <div className="confirmation-container">{displayAllFormData()}</div>
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
