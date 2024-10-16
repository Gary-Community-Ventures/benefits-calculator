import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@mui/material';
import { FormattedMessage, useIntl } from 'react-intl';
import { getStepDirectory, getStepNumber, STARTING_QUESTION_NUMBER } from '../../Assets/stepDirectory';
import { useContext, useEffect } from 'react';
import { useConfig } from '../Config/configHook.tsx';
import { Context } from '../Wrapper/Wrapper.tsx';
import Grid from '@mui/material/Grid';
import { ReactComponent as Edit } from '../../Assets/icons/edit.svg';
import { ReactComponent as Residence } from '../../Assets/icons/residence.svg';
import { ReactComponent as Household } from '../../Assets/icons/household.svg';
import { ReactComponent as Head } from '../../Assets/icons/head.svg';
import { ReactComponent as Expenses } from '../../Assets/icons/expenses.svg';
import { ReactComponent as Resources } from '../../Assets/icons/resources.svg';
import { ReactComponent as Benefits } from '../../Assets/icons/benefits.svg';
import { ReactComponent as Immediate } from '../../Assets/icons/immediate.svg';
import { ReactComponent as Referral } from '../../Assets/icons/referral.svg';
import PreviousButton from '../PreviousButton/PreviousButton';
import './Confirmation.css';
import { useTranslateNumber } from '../../Assets/languageOptions';
import QuestionHeader from '../QuestionComponents/QuestionHeader';
import { calcAge } from '../HouseholdDataBlock/AgeInput';

const Confirmation = () => {
  const { formData, locale } = useContext(Context);
  const { uuid } = useParams();
  const navigate = useNavigate();
  const intl = useIntl();
  const locationState = { state: { routedFromConfirmationPg: true } };
  const translateNumber = useTranslateNumber();

  const acuteConditionOptions = useConfig('acute_condition_options');
  const categoryBenefits = useConfig('category_benefits');
  const expenseOptions = useConfig('expense_options');
  const incomeOptions = useConfig('income_options');
  const frequencyOptions = useConfig('frequency_options');
  const healthInsuranceOptions = useConfig('health_insurance_options');
  const referralOptions = useConfig('referral_options');
  const relationshipOptions = useConfig('relationship_options');

  const getQuestionUrl = (name) => {
    const stepNumber = getStepNumber(name, formData.immutableReferrer);

    return `/${uuid}/step-${stepNumber}`;
  };

  useEffect(() => {
    const continueOnEnter = (event) => {
      if (event.key === 'Enter') {
        navigate(`/${uuid}/results/benefits`);
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
      const hhMemberIndex = Number(i + 1);
      const editHHMAriaLabelProps = {
        id: 'confirmation.hhMember-AL',
        defaultMsg: 'edit household member',
      };

      return (
        <Grid container key={i} spacing={1}>
          <Grid item className="no-padding" xs={2}>
            <Head className="confirmation-icon" alt="head-icon" />
          </Grid>
          <Grid item xs={8}>
            <p className="section-title">{allHouseholdRelations[i]}</p>
            <article className="section-p">
              <b>
                <FormattedMessage id="questions.age-inputLabel" defaultMessage="Age: " />
              </b>
              {translateNumber(allHouseholdAges[i])}
            </article>
            <article className="section-p">
              <b>
                <FormattedMessage id="confirmation.member.birthYearMonth" defaultMessage="Birth Month/Year: " />
              </b>
              {translateNumber(String(personData.birthMonth).padStart(2, '0')) +
                '/' +
                translateNumber(personData.birthYear)}
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
            {displayHHMHealthInsuranceSection(healthInsurance, hhMemberIndex)}
          </Grid>
          <Grid item xs={2} display="flex" justifyContent="flex-end">
            <button
              aria-label={intl.formatMessage(editHHMAriaLabelProps)}
              onClick={() => navigate(getQuestionUrl('householdData') + `/${i + 1}`, locationState)}
            >
              <Edit className="edit-button" alt="edit icon" />
            </button>
          </Grid>
        </Grid>
      );
    });

    return householdMemberDataBlocks;
  };

  const displayHHMHealthInsuranceSection = (hHMemberHealthInsurance, hhMemberIndex) => {
    return (
      <article className="section-p">
        <b>
          <FormattedMessage
            id="confirmation.headOfHouseholdDataBlock-healthInsuranceText"
            defaultMessage="Health Insurance: "
          />{' '}
        </b>
        {displayHealthInsurance(hHMemberHealthInsurance, hhMemberIndex)}
      </article>
    );
  };

  const displayHouseholdExpenses = () => {
    const { hasExpenses, expenses } = formData;
    const editExpensesAriaLabelProps = {
      id: 'confirmation.expenses-AL',
      defaultMsg: 'edit expenses',
    };

    return (
      <Grid container spacing={1}>
        <Grid item className="no-padding" xs={2}>
          <Expenses className="confirmation-icon" alt="expenses-icon" />
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
          <button
            aria-label={intl.formatMessage(editExpensesAriaLabelProps)}
            onClick={() => navigate(getQuestionUrl('hasExpenses'), locationState)}
          >
            <Edit className="edit-button" alt="edit-icon" />
          </button>
        </Grid>
      </Grid>
    );
  };

  const displayConditions = (userData) => {
    const { student, pregnant, blindOrVisuallyImpaired, disabled, longTermDisability } = userData.conditions;

    const iterableConditions = [student, pregnant, blindOrVisuallyImpaired, disabled, longTermDisability];

    const hasAnyConditions = iterableConditions.some((condition) => condition === true);

    if (hasAnyConditions === false) {
      return <FormattedMessage id="confirmation.none" defaultMessage=" None" />;
    } else {
      return getConditionsStringWithCommas(student, pregnant, blindOrVisuallyImpaired, disabled, longTermDisability);
    }
  };

  const getFormattedMessageString = (fMObj) => {
    return intl.formatMessage({ id: fMObj.id, defaultMessage: fMObj.defaultMessage });
  };

  const getConditionsStringWithCommas = (student, pregnant, blindOrVisuallyImpaired, disabled, longTermDisability) => {
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

    if (longTermDisability) {
      conditions.push(
        getFormattedMessageString({
          id: 'confirmation.longTermDisability',
          defaultMessage:
            'Has a medical or developmental condition that has lasted, or is expected to last, more than 12 months',
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
      return calcAge(personData.birthYear, personData.birthMonth);
    });

    return householdMemberAges;
  };

  const displayHouseholdSizeSection = () => {
    const { householdSize } = formData;
    let householdSizeDescriptor = (
      <FormattedMessage id="confirmation.displayAllFormData-personLabel" defaultMessage="person" />
    );

    if (householdSize >= 2) {
      householdSizeDescriptor = (
        <FormattedMessage id="confirmation.displayAllFormData-peopleLabel" defaultMessage="people" />
      );
      // Russian uses the singular of people for 1-4 people
      if (householdSize <= 4 && locale === 'ru') {
        householdSizeDescriptor = (
          <FormattedMessage id="confirmation.displayAllFormData-personLabel" defaultMessage="person" />
        );
      }
    }

    const linkTo = getQuestionUrl('householdSize');
    const editHHSizeAriaLabelProps = {
      id: 'confirmation.hhSize-AL',
      defaultMsg: 'edit household size',
    };

    return (
      <Grid container spacing={1}>
        <Grid item className="no-padding" xs={2}>
          <Household className="confirmation-icon" alt="household-icon" />
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
            {translateNumber(householdSize)} {householdSizeDescriptor}
          </article>
        </Grid>
        <Grid item xs={2} display="flex" justifyContent="flex-end">
          <button aria-label={intl.formatMessage(editHHSizeAriaLabelProps)} onClick={() => navigate(linkTo)}>
            <Edit className="edit-button" alt="edit-icon" />
          </button>
        </Grid>
      </Grid>
    );
  };

  const displayHouseholdAssetsSection = () => {
    const { householdAssets } = formData;
    const editHHAssetsAriaLabelProps = {
      id: 'confirmation.hhAssets-AL',
      defaultMsg: 'edit household assets',
    };

    return (
      <Grid container spacing={1}>
        <Grid item xs={2}>
          <Resources className="confirmation-icon" alt="resources-icon" />
        </Grid>
        <Grid item xs={8}>
          <p className="section-title">
            <FormattedMessage
              id="confirmation.displayAllFormData-householdResourcesText"
              defaultMessage="Household resources"
            />
          </p>
          <article className="section-p">
            {`$${translateNumber(Number(householdAssets).toLocaleString(2))} `}
            <i>
              <FormattedMessage
                id="confirmation.displayAllFormData-householdResourcesDescription"
                defaultMessage="(This is cash on hand, checking or saving accounts, stocks, bonds or mutual funds.)"
              />
            </i>
          </article>
        </Grid>
        <Grid item xs={2} display="flex" justifyContent="flex-end">
          <button
            aria-label={intl.formatMessage(editHHAssetsAriaLabelProps)}
            onClick={() => navigate(getQuestionUrl('householdAssets'), locationState)}
          >
            <Edit className="edit-button" alt="edit icon" />
          </button>
        </Grid>
      </Grid>
    );
  };

  const displayZipcodeSection = () => {
    const { zipcode, county } = formData;
    const editZipAriaLabelProps = {
      id: 'confirmation.zipcode-AL',
      defaultMsg: 'edit zipcode',
    };

    return (
      <Grid container spacing={1}>
        <Grid item className="no-padding" xs={2}>
          <Residence className="confirmation-icon" alt="residence-icon" />
        </Grid>
        <Grid item xs={8}>
          <p className="section-title">
            <FormattedMessage id="confirmation.residenceInfo" defaultMessage="Residence Information" />
          </p>
          <p className="section-p">
            <b>
              <FormattedMessage id="confirmation.displayAllFormData-zipcodeText" defaultMessage="Zip code: " />
            </b>
            {translateNumber(zipcode)}
          </p>
          <p className="section-p">
            <b>
              <FormattedMessage id="confirmation.displayAllFormData-countyText" defaultMessage="County: " />
            </b>
            {county}
          </p>
        </Grid>
        <Grid item xs={2} display="flex" justifyContent="flex-end">
          <button
            aria-label={intl.formatMessage(editZipAriaLabelProps)}
            onClick={() => navigate(getQuestionUrl('zipcode'), locationState)}
          >
            <Edit className="edit-button" alt="edit-icon" />
          </button>
        </Grid>
      </Grid>
    );
  };

  const displayReferralSourceSection = () => {
    const { referralSource, otherSource } = formData;
    const referralSourceLabel =
      typeof referralOptions[referralSource] === 'object'
        ? referralOptions[referralSource]
        : referralOptions[referralSource];

    const finalReferralSource = referralSource !== 'other' ? referralSourceLabel : otherSource;

    if (formData.immutableReferrer) {
      return <></>;
    }

    const editReferralSrcAriaLabelProps = {
      id: 'confirmation.referralSrc-AL',
      defaultMsg: 'edit referral source',
    };

    return (
      <>
        <Grid container spacing={1}>
          <Grid item className="no-padding" xs={2}>
            <Referral className="confirmation-icon" alt="referral-icon" />
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
            <button
              aria-label={intl.formatMessage(editReferralSrcAriaLabelProps)}
              onClick={() => navigate(getQuestionUrl('referralSource'), locationState)}
            >
              <Edit className="edit-button" alt="edit icon" />
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
    const allBenefitsList = Object.values(categoryBenefits)
      .map((category) => category?.benefits ?? {})
      .reduce((acc, benefits) => ({ ...acc, ...benefits }), {});

    return (
      <>
        {displayZipcodeSection()}
        {displayHouseholdSizeSection()}
        {displayAllMembersDataBlock()}
        {displayHouseholdExpenses()}
        {displayHouseholdAssetsSection()}
        {displayHHCheckboxSection(
          'benefits',
          'confirmation.displayAllFormData-currentHHBenefitsText',
          'Current Household Benefits:',
          getQuestionUrl('hasBenefits'),
          allBenefitsList,
          <Benefits className="confirmation-icon" alt="benefits-icon" />,
          intl.formatMessage({ id: 'confirmation.editCurrentBenefits-AL', defaultMsg: 'edit current benefits' }),
        )}
        {displayHHCheckboxSection(
          'acuteHHConditions',
          'confirmation.displayAllFormData-acuteHHConditions',
          'Immediate Needs',
          getQuestionUrl('acuteHHConditions'),
          refactorOptionsList(acuteConditionOptions),
          <Immediate className="confirmation-icon" alt="immediate-icon" />,
          intl.formatMessage({ id: 'confirmation.editImmedNeeds-AL', defaultMsg: 'edit immediate needs' }),
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
          {translateNumber(formatToUSD(Number(expense.expenseAmount)))}{' '}
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
      case 'semimonthly':
        num = Number(incomeAmount) * 24;
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
              {translateNumber(incomeAmount)} {incomeFrequency} ~{translateNumber(hoursPerWeek)}{' '}
              {translatedHrsPerWkText} {translateNumber(annualAmount)}
            </>
          ) : (
            <>
              {translateNumber(incomeAmount)} {incomeFrequency} {translateNumber(annualAmount)}
            </>
          )}
        </li>
      );
    });

    return mappedListItems;
  };

  const listAllTruthyValues = (selectedOptions, relatedOptionsList, stateVariableName) => {
    if (stateVariableName === 'benefits') {
      const mappedListItems = selectedOptions.map((option) => {
        return (
          <p key={relatedOptionsList[option].name.props.id} className="bottom-margin">
            <strong>{relatedOptionsList[option].name}</strong>
            <span>{relatedOptionsList[option].description}</span>
          </p>
        );
      });

      return mappedListItems;
    } else {
      const mappedListItems = selectedOptions.map((option) => {
        return (
          <p key={option} className="bottom-margin">
            {relatedOptionsList[option]}
          </p>
        );
      });

      return mappedListItems;
    }
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
        <Grid item className="no-padding" xs={2}>
          {iconComp}
        </Grid>
        <Grid item xs={8}>
          <p className="section-title">
            <FormattedMessage id={fMessageId} defaultMessage={fMessageDefaultMsg} />
          </p>
          {hasAnyTruthyOptions ? (
            <article className="section-p">
              {listAllTruthyValues(truthyOptions, optionsList, stateVariableName)}
            </article>
          ) : (
            <p className="section-p">
              <FormattedMessage id="confirmation.noIncome" defaultMessage=" None" />
            </p>
          )}
        </Grid>
        <Grid item xs={2} display="flex" justifyContent="flex-end">
          <button aria-label={ariaLabel} onClick={() => navigate(linkTo, locationState)}>
            <Edit className="edit-button" alt="edit icon" />
          </button>
        </Grid>
      </Grid>
    );
  };

  const totalNumberOfQuestions = () => {
    return getStepDirectory(formData.immutableReferrer).length + STARTING_QUESTION_NUMBER;
  };

  const displayHealthInsurance = (hHMemberHealthInsurance, hhMemberIndex) => {
    const selectedDontKnow = hHMemberHealthInsurance.dont_know === true;
    const selectedNone = hHMemberHealthInsurance.none === true;
    const allOtherSelectedOptions = Object.entries(hHMemberHealthInsurance).filter(
      (hHMemberInsEntry) => hHMemberInsEntry[1] === true,
    );
    const youVsThemHealthInsuranceOptions =
      hhMemberIndex === 1 ? healthInsuranceOptions.you : healthInsuranceOptions.them;

    const allOtherSelectedOptionsString = allOtherSelectedOptions.reduce((acc, filteredHHMInsEntry, index) => {
      const formattedMessageProp = youVsThemHealthInsuranceOptions[filteredHHMInsEntry[0]].formattedMessage.props;
      const translatedAriaLabel = intl.formatMessage({ ...formattedMessageProp });

      if (allOtherSelectedOptions.length - 1 === index) {
        //we're at the last element in the array => don't include the comma
        return (acc += translatedAriaLabel);
      } else {
        //include a comma to separate each string
        return (acc += translatedAriaLabel + ', ');
      }
    }, '');

    if (selectedNone) {
      return <>{youVsThemHealthInsuranceOptions.none.formattedMessage}</>;
    } else {
      return <>{allOtherSelectedOptionsString}</>;
    }
  };

  return (
    <main className="benefits-form">
      <QuestionHeader>
        <FormattedMessage id="confirmation.return-subheader" defaultMessage="Is all of your information correct?" />
      </QuestionHeader>
      <div className="confirmation-container">{displayAllFormData()}</div>
      <div className="prev-continue-results-buttons confirmation">
        <PreviousButton navFunction={() => navigate(`/${uuid}/step-${totalNumberOfQuestions() - 1}`)} />
        <Button variant="contained" onClick={() => navigate(`/${uuid}/results/benefits`)}>
          <FormattedMessage id="continueButton" defaultMessage="Continue" />
        </Button>
      </div>
    </main>
  );
};

export default Confirmation;
