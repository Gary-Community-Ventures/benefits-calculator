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

  const displayAllMembersDataBlock = () => {
    const { householdData } = formData;
    const allHouseholdRelations = getAllHouseholdRelations();
    const allHouseholdAges = getAllHouseholdAges();

    const householdMemberDataBlocks = householdData.map((personData, i) => {
      const { hasIncome, incomeStreams } = personData;

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
            </Grid>
            <Grid item xs={2} display="flex" justifyContent="flex-end">
              <EditIcon
                className="edit-icon"
                onClick={() => navigate(`/${uuid}/step-${stepDirectory.householdData}/${i + 1}`)}
              />
            </Grid>
          </Grid>
          <p className="confirmation-section-underline"></p>
        </div>
      );
    });

    return householdMemberDataBlocks;
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
          {hasExpenses && expenses.length > 0 && listAllExpenses(expenses)}
        </Grid>
        <Grid item xs={2} display="flex" justifyContent="flex-end">
          <EditIcon className="edit-icon" onClick={() => navigate(`/${uuid}/step-${stepDirectory.hasExpenses}`)} />
        </Grid>
      </Grid>
    );
  };

  const getFormattedMessageString = (id) => {
    return intl.formatMessage({ id: id });
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
      veteran,
    ];

    const hasAnyConditions = iterableConditions.some((condition) => condition === true);

    if (hasAnyConditions === false) {
      return <FormattedMessage id="confirmation.none" defaultMessage=" None" />;
    } else {
      return getConditionsStringWithCommas(
        student,
        studentFulltime,
        pregnant,
        unemployed,
        unemployedWorkedInLast18Mos,
        blindOrVisuallyImpaired,
        disabled,
        veteran,
      );
    }
  };

  const getConditionsStringWithCommas = (
    student,
    studentFulltime,
    pregnant,
    unemployed,
    unemployedWorkedInLast18Mos,
    blindOrVisuallyImpaired,
    disabled,
    veteran,
  ) => {
    const conditions = [];

    if (studentFulltime) {
      conditions.push(getFormattedMessageString('confirmation.headOfHouseholdDataBlock-studentFulltimeText'));
    }
    if (student && studentFulltime === false) {
      conditions.push(getFormattedMessageString('confirmation.headOfHouseholdDataBlock-studentText'));
    }
    if (pregnant) {
      conditions.push(getFormattedMessageString('confirmation.headOfHouseholdDataBlock-pregnantText'));
    }
    if (unemployedWorkedInLast18Mos) {
      conditions.push(getFormattedMessageString('confirmation.headOfHouseholdDataBlock-unemployed18MosText'));
    }
    if (unemployed && unemployedWorkedInLast18Mos === false) {
      conditions.push(getFormattedMessageString('confirmation.headOfHouseholdDataBlock-unemployedText'));
    }
    if (blindOrVisuallyImpaired) {
      conditions.push(getFormattedMessageString('confirmation.headOfHouseholdDataBlock-blindOrVisuallyImpairedText'));
    }
    if (disabled) {
      conditions.push(getFormattedMessageString('confirmation.headOfHouseholdDataBlock-disabledText'));
    }
    if (veteran) {
      conditions.push(getFormattedMessageString('confirmation.headOfHouseholdDataBlock-veteranText'));
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
    const linkTo = `/${uuid}/step-${stepDirectory.householdSize}`;

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
          <EditIcon className="edit-icon" onClick={() => navigate(linkTo)} />
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
          <EditIcon className="edit-icon" onClick={() => navigate(`/${uuid}/step-${stepDirectory.householdAssets}`)} />
        </Grid>
      </Grid>
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
          <EditIcon className="edit-icon" onClick={() => navigate(`/${uuid}/step-${stepDirectory.zipcode}`)} />
        </Grid>
      </Grid>
    );
  };

  const displayReferralSourceSection = () => {
    const { referralSource, otherSource } = formData;
    const referralSourceLabel = referralOptions[referralSource];
    const finalReferralSource = referralSource !== 'other' ? referralSourceLabel : otherSource;

    return (
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
          <EditIcon className="edit-icon" onClick={() => navigate(`/${uuid}/step-${stepDirectory.referralSource}`)} />
        </Grid>
      </Grid>
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
        {displayHHCheckboxSection(
          'healthInsurance',
          'confirmation.displayAllFormData-healthInsurance',
          'Household Insurance',
          `/${uuid}/step-${stepDirectory.healthInsurance}`,
          refactorOptionsList(healthInsuranceOptions),
          <MedicalServicesIcon className="home-icon" />,
        )}
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
          `/${uuid}/step-${stepDirectory.hasBenefits}`,
          allBenefitsList,
          <ChecklistIcon className="home-icon" />,
        )}
        <p className="confirmation-section-underline"></p>
        {displayHHCheckboxSection(
          'acuteHHConditions',
          'confirmation.displayAllFormData-acuteHHConditions',
          'Immediate Needs',
          `/${uuid}/step-${stepDirectory.acuteHHConditions}`,
          refactorOptionsList(acuteConditionOptions),
          <FoodBankIcon className="home-icon" />,
        )}
        <p className="confirmation-section-underline"></p>
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
          <EditIcon className="edit-icon" onClick={() => navigate(linkTo)} />
        </Grid>
      </Grid>
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
