import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { FormattedMessage, useIntl } from 'react-intl';
import { useConfig } from '../Config/configHook.tsx';
import { Box, Stack } from '@mui/material';
import ContinueButton from '../ContinueButton/ContinueButton';
import DropdownMenu from '../DropdownMenu/DropdownMenu';
import HealthInsuranceError from '../HealthInsuranceError/HealthInsuranceError.tsx';
import HHDataRadiofield from '../Radiofield/HHDataRadiofield';
import OptionCardGroup from '../OptionCardGroup/OptionCardGroup';
import PersonIncomeBlock from '../IncomeBlock/PersonIncomeBlock';
import PreviousButton from '../PreviousButton/PreviousButton';
import { personDataIsValid, selectHasError, relationTypeHelperText } from '../../Assets/validationFunctions.tsx';
import { useStepNumber } from '../../Assets/stepDirectory';
import { Context } from '../Wrapper/Wrapper.tsx';
import { isCustomTypedLocationState } from '../../Types/FormData.ts';
import HelpButton from '../HelpBubbleIcon/HelpButton.tsx';
import QuestionHeader from '../QuestionComponents/QuestionHeader';
import QuestionQuestion from '../QuestionComponents/QuestionQuestion';
import QuestionDescription from '../QuestionComponents/QuestionDescription';
import AgeInput, { calcAge } from './AgeInput';
import { QUESTION_TITLES } from '../../Assets/pageTitleTags';
import HHMSummaryCards from '../Steps/HouseholdMembers/HHMSummaryCards.tsx';
import './HouseholdDataBlock.css';
const HouseholdDataBlock = ({ handleHouseholdDataSubmit }) => {
  const { formData } = useContext(Context);
  const conditionOptions = useConfig('condition_options');
  const healthInsuranceOptions = useConfig('health_insurance_options');
  const relationshipOptions = useConfig('relationship_options');
  const { householdSize } = formData;
  const hHSizeNumber = Number(householdSize);
  let { whiteLabel, uuid, page } = useParams();
  page = parseInt(page);
  const step = useStepNumber('householdData');
  const navigate = useNavigate();
  const location = useLocation();
  const setPage = (page) => {
    navigate(`/${whiteLabel}/${uuid}/step-${step}/${page}`);
  };
  const [submittedCount, setSubmittedCount] = useState(0);

  useEffect(() => {
    document.title = QUESTION_TITLES.householdData;
  }, []);

  const initialMemberData = formData.householdData[page - 1] ?? {
    birthYear: undefined,
    birthMonth: undefined,
    relationshipToHH: page === 1 ? 'headOfHousehold' : '',
    conditions: {
      student: false,
      pregnant: false,
      blindOrVisuallyImpaired: false,
      disabled: false,
      longTermDisability: false,
    },
    hasIncome: false,
    incomeStreams: [],
    healthInsurance: {
      none: false,
      employer: false,
      private: false,
      medicaid: false,
      medicare: false,
      chp: false,
      emergency_medicaid: false,
      family_planning: false,
      va: false,
    },
  };

  const [memberData, setMemberData] = useState(initialMemberData);
  const [wasSubmitted, setWasSubmitted] = useState(false);

  useEffect(() => {
    window.scroll({ top: 0, left: 0, behavior: 'smooth' });
  }, [wasSubmitted]);

  useEffect(() => {
    const updatedMemberData = { ...memberData };

    if (updatedMemberData.hasIncome === false) {
      updatedMemberData.incomeStreams = [];
    }

    setMemberData(updatedMemberData);
  }, [memberData.hasIncome]);

  useEffect(() => {
    //this useEffect solves for the unlikely scenario that the page number is greater than the HHSize or NaN,
    //it routes the user back to the last valid HHM
    const lastMemberPage = Math.min(formData.householdData.length + 1, formData.householdSize);
    if (isNaN(page) || page < 1 || page > lastMemberPage) {
      navigate(`/${whiteLabel}/${uuid}/step-${step}/${lastMemberPage}`, { replace: true });
      return;
    }
  }, []);

  const createAgeQuestion = (personIndex) => {
    const birthMonth = memberData.birthMonth ?? null;
    const birthYear = memberData.birthYear ?? null;
    const setBirthMonth = (month) => {
      setMemberData({ ...memberData, birthMonth: month ?? undefined });
    };
    const setBirthYear = (year) => {
      setMemberData({ ...memberData, birthYear: year ?? undefined });
    };

    if (personIndex === 1) {
      return (
        <Box sx={{ marginBottom: '1.5rem' }}>
          <QuestionQuestion>
            <FormattedMessage
              id="householdDataBlock.createAgeQuestion-how-headOfHH"
              defaultMessage="Please enter your month and year of birth"
            />
          </QuestionQuestion>
          <AgeInput
            birthMonth={birthMonth}
            birthYear={birthYear}
            setBirthMonth={setBirthMonth}
            setBirthYear={setBirthYear}
            submitted={submittedCount}
          />
        </Box>
      );
    } else {
      return (
        <Box sx={{ marginBottom: '1.5rem' }}>
          <QuestionQuestion>
            <FormattedMessage
              id="householdDataBlock.createAgeQuestion-how"
              defaultMessage="Please enter their month and year of birth"
            />
          </QuestionQuestion>
          <AgeInput
            birthMonth={birthMonth}
            birthYear={birthYear}
            setBirthMonth={setBirthMonth}
            setBirthYear={setBirthYear}
            submitted={submittedCount}
          />
        </Box>
      );
    }
  };

  const createHOfHRelationQuestion = () => {
    return (
      <Box sx={{ marginBottom: '1.5rem' }}>
        <QuestionQuestion>
          <FormattedMessage
            id="householdDataBlock.createHOfHRelationQuestion-relation"
            defaultMessage="What is this person’s relationship to you?"
          />
        </QuestionQuestion>
        {createRelationshipDropdownMenu()}
      </Box>
    );
  };

  const formatToUSD = (num) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(num);
  };

  const createFormDataMemberCard = (member, index) => {
    let relationship = relationshipOptions[member.relationshipToHH];
    if (relationship === undefined) {
      relationship = <FormattedMessage id="relationshipOptions.yourself" defaultMessage="Yourself" />;
    }

    let age = calcAge(member.birthYear, member.birthMonth);
    if (Number.isNaN(age)) {
      age = 0;
    }

    let income = 0;
    for (const { incomeFrequency, incomeAmount, hoursPerWeek } of member.incomeStreams) {
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
      income += Number(num);
    }

    return createMemberCard(index, relationship, member.birthYear, member.birthMonth, age, income, page);
  };

  const handleEditBtnSubmit = (memberIndex) => {
    setSubmittedCount(submittedCount + 1);

    const validPersonData = personDataIsValid(memberData);
    if (validPersonData) {
      handleHouseholdDataSubmit(memberData, page - 1, uuid);
      navigate(`/${uuid}/step-${step}/${memberIndex + 1}`);
    }
  };

  const translateNumber = useTranslateNumber();
  const createMemberCard = (index, relationship, birthYear, birthMonth, age, income, page) => {
    const containerClassName = `member-added-container ${index + 1 === page ? 'current-household-member' : ''}`;

    return (
      <article className={containerClassName} key={index}>
        <div className="household-member-header">
          <h3 className="member-added-relationship">{relationship}:</h3>
          <div className="household-member-edit-button">
            <IconButton
              onClick={() => {
                handleEditBtnSubmit(index);
              }}
              aria-label={editHHMemberAriaLabel}
            >
              <EditIcon alt="edit icon" />
            </IconButton>
          </div>
        </div>
        <div className="member-added-age">
          <strong>
            <FormattedMessage id="questions.age-inputLabel" defaultMessage="Age: " />
          </strong>
          {translateNumber(age)}
        </div>
        <div className="member-added-age">
          <strong>
            <FormattedMessage id="householdDataBlock.memberCard.birthYearMonth" defaultMessage="Birth Month/Year: " />
          </strong>
          {birthMonth !== undefined &&
            birthYear !== undefined &&
            translateNumber(String(birthMonth).padStart(2, '0')) + '/' + translateNumber(birthYear)}
        </div>
        <div className="member-added-income">
          <strong>
            <FormattedMessage id="householdDataBlock.member-income" defaultMessage="Income" />:{' '}
          </strong>
          {translateNumber(formatToUSD(Number(income)))}
          <FormattedMessage id="displayAnnualIncome.annual" defaultMessage=" annually" />
        </div>
      </article>
    );
  };

  const createQHeaderAndHHMSummaries = (personIndex) => {
    let header;
    const headOfHHInfoWasEntered = formData.householdData.length >= 1;

    //hHMemberSummaries will have the length of members that have already been saved to formData
    const hHMemberSummaries = [
      ...formData.householdData.map((member, index) => {
        return createFormDataMemberCard(member, index);
      }),
    ];

    //We want the active/current member's summary card to update synchronously as we change their information
    //so we swap out the current one for the one we create using the memberData in state
    const summariesWActiveMemberCard = hHMemberSummaries.map((member, index) => {
      if (index === page - 1) {
        return createFormDataMemberCard(memberData, index);
      } else {
        return member;
      }
    });

    if (personIndex === 1) {
      header = (
        <QuestionHeader>
          <FormattedMessage id="householdDataBlock.questionHeader" defaultMessage="Tell us about yourself." />
        </QuestionHeader>
      );
    } else {
      header = (
        <QuestionHeader>
          <FormattedMessage
            id="questions.householdData"
            defaultMessage="Tell us about the next person in your household."
          />
        </QuestionHeader>
      );
    }

    return (
      <>
        {header}
        {headOfHHInfoWasEntered && (
          <Box sx={{ marginBottom: '1.5rem' }}>
            <h2 className="household-data-sub-header secondary-heading">
              <FormattedMessage id="qcc.so-far-text" defaultMessage="So far you've told us about:" />
            </h2>
            <div>{summariesWActiveMemberCard}</div>
          </Box>
        )}
      </>
    );
  };

  const createDropdownCompProps = () => {
    const dropdownCompProps = {
      labelId: 'relation-to-hh-label',
      inputLabelText: (
        <FormattedMessage id="householdDataBlock.createDropdownCompProps-inputLabelText" defaultMessage="Relation" />
      ),
      id: 'relationship-select',
      label: <FormattedMessage id="householdDataBlock.createDropdownCompProps-label" defaultMessage="Relation Type" />,
      disabledSelectMenuItemText: (
        <FormattedMessage
          id="householdDataBlock.createDropdownCompProps-disabledSelectMenuItemText"
          defaultMessage="Click to select relationship"
        />
      ),
    };

    const details = {
      componentProperties: dropdownCompProps,
      inputError: selectHasError,
      inputHelperText: relationTypeHelperText,
    };

    return details;
  };

  const createRelationshipDropdownMenu = () => {
    return (
      <DropdownMenu
        componentDetails={createDropdownCompProps()}
        options={relationshipOptions}
        setMemberData={setMemberData}
        memberData={memberData}
        submitted={submittedCount}
      />
    );
  };

  const createConditionOptionCards = (index) => {
    return (
      <OptionCardGroup
        options={index === 1 ? conditionOptions.you : conditionOptions.them}
        stateVariable="conditions"
        memberData={memberData}
        setMemberData={setMemberData}
        hhMemberIndex={index}
      />
    );
  };

  const createConditionsQuestion = (index) => {
    const formattedMsgId =
      index === 1
        ? 'householdDataBlock.createConditionsQuestion-do-these-apply-to-you'
        : 'householdDataBlock.createConditionsQuestion-do-these-apply';

    const formattedMsgDefaultMsg = index === 1 ? 'Do any of these apply to you?' : 'Do any of these apply to them?';

    return (
      <Box sx={{ margin: '3rem 0' }}>
        <QuestionQuestion>
          <FormattedMessage id={formattedMsgId} defaultMessage={formattedMsgDefaultMsg} />
        </QuestionQuestion>
        <QuestionDescription>
          <FormattedMessage
            id="householdDataBlock.createConditionsQuestion-pick"
            defaultMessage="Choose all that apply."
          />
        </QuestionDescription>
        {createConditionOptionCards(index)}
      </Box>
    );
  };

  const createIncomeRadioQuestion = (index) => {
    const radiofieldProps = {
      ariaLabel: 'householdDataBlock.createIncomeRadioQuestion-ariaLabel',
      inputName: 'hasIncome',
      value: memberData.hasIncome,
    };

    const formattedMsgId =
      index === 1 ? 'questions.hasIncome' : 'householdDataBlock.createIncomeRadioQuestion-questionLabel';

    const formattedMsgDefaultMsg =
      index === 1
        ? 'Do you have an income?'
        : 'Does this individual in your household have significant income you have not already included?';

    return (
      <Box className="section-container" sx={{ paddingTop: '3rem' }}>
        <Box className="section">
          <QuestionQuestion>
            <FormattedMessage id={formattedMsgId} defaultMessage={formattedMsgDefaultMsg} />
            <HelpButton
              helpText="This includes money from jobs, alimony, investments, or gifts. Income is the money earned or received before deducting taxes"
              helpId="householdDataBlock.createIncomeRadioQuestion-questionDescription"
            />
          </QuestionQuestion>
          <HHDataRadiofield componentDetails={radiofieldProps} memberData={memberData} setMemberData={setMemberData} />
        </Box>
      </Box>
    );
  };

  const createPersonIncomeBlock = (submitted) => {
    return (
      <PersonIncomeBlock memberData={memberData} setMemberData={setMemberData} page={page} submitted={submitted} />
    );
  };

  const handleContinueSubmit = (event, validateInputFunction, inputToBeValidated, stepId, questionName, uuid) => {
    const isComingFromConfirmationPg = isCustomTypedLocationState(location.state)
      ? location.state.routedFromConfirmationPg
      : false;

    event.preventDefault();
    setSubmittedCount(submittedCount + 1);

    const validPersonData = personDataIsValid(memberData);
    const lastHouseholdMember = page >= hHSizeNumber;

    if (validPersonData && isComingFromConfirmationPg) {
      handleHouseholdDataSubmit(memberData, page - 1, uuid);
      navigate(`/${whiteLabel}/${uuid}/confirm-information`);
    } else if (validPersonData && lastHouseholdMember) {
      handleHouseholdDataSubmit(memberData, page - 1, uuid);
      navigate(`/${whiteLabel}/${uuid}/step-${step + 1}`);
    } else if (validPersonData) {
      handleHouseholdDataSubmit(memberData, page - 1, uuid);
      setPage(page + 1);
    } else if (!validPersonData) {
      setWasSubmitted(true);
    }
  };

  const handlePreviousSubmit = () => {
    if (page <= 1) {
      navigate(`/${whiteLabel}/${uuid}/step-${step - 1}`);
    } else {
      setPage(page - 1);
    }
  };

  const displayHealthInsuranceQuestion = (page, hhMemberData, setHHMemberData) => {
    return (
      <Box className="section-container">
        <Stack sx={{ padding: '3rem 0' }} className="section">
          {displayHealthCareQuestion(page)}
          <OptionCardGroup
            options={page === 1 ? healthInsuranceOptions.you : healthInsuranceOptions.them}
            stateVariable="healthInsurance"
            memberData={hhMemberData}
            setMemberData={setHHMemberData}
            hhMemberIndex={page}
          />
          <HealthInsuranceError
            hhMemberInsurance={memberData.healthInsurance}
            submitted={submittedCount}
            hhMemberIndex={page}
          />
        </Stack>
      </Box>
    );
  };

  const displayHealthCareQuestion = (page) => {
    if (page === 1) {
      return (
        <QuestionQuestion>
          <FormattedMessage
            id="questions.healthInsurance-you"
            defaultMessage="Which type of health insurance do you have?"
          />
        </QuestionQuestion>
      );
    } else {
      return (
        <QuestionQuestion>
          <FormattedMessage
            id="questions.healthInsurance-they"
            defaultMessage="What type of health insurance do they have?"
          />
        </QuestionQuestion>
      );
    }
  };

  return (
    <main className="benefits-form">
      <QuestionHeader>
        {page === 1 ? (
          <FormattedMessage id="householdDataBlock.questionHeader" defaultMessage="Tell us about yourself." />
        ) : (
          <FormattedMessage
            id="questions.householdData"
            defaultMessage="Tell us about the next person in your household."
          />
        )}
      </QuestionHeader>
      <HHMSummaryCards activeMemberData={memberData} page={page} formData={formData} />

      {createAgeQuestion(page)}
      {page === 1 && displayHealthInsuranceQuestion(page, memberData, setMemberData)}
      {page !== 1 && createHOfHRelationQuestion()}
      {page !== 1 && displayHealthInsuranceQuestion(page, memberData, setMemberData)}
      {createConditionsQuestion(page)}
      <Box>
        <Stack sx={{ margin: '3rem 0' }}>
          {createIncomeRadioQuestion(page)}
          {memberData.hasIncome && createPersonIncomeBlock(submittedCount)}
        </Stack>
      </Box>
      <div className="question-buttons">
        <PreviousButton navFunction={handlePreviousSubmit} />
        <ContinueButton handleContinueSubmit={handleContinueSubmit} />
      </div>
    </main>
  );
};

export default HouseholdDataBlock;
