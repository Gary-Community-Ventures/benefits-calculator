import { useState, useEffect, useContext, MouseEvent } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { Box, IconButton, Stack } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import ContinueButton from '../ContinueButton/ContinueButton';
import DropdownMenu from '../DropdownMenu/DropdownMenu';
import HealthInsuranceError from '../HealthInsuranceError/HealthInsuranceError.tsx';
import HHDataRadiofield from '../Radiofield/HHDataRadiofield';
import OptionCardGroup from '../OptionCardGroup/OptionCardGroup';
import PersonIncomeBlock from '../IncomeBlock/PersonIncomeBlock';
import PreviousButton from '../PreviousButton/PreviousButton';
import Textfield from '../Textfield/Textfield';
import relationshipOptions from '../../Assets/relationshipOptions';
import healthInsuranceOptions from '../../Assets/healthInsuranceOptions.tsx';
import conditionOptions from '../../Assets/conditionOptions';
import {
  householdMemberAgeHasError,
  displayHouseholdMemberAgeHelperText,
  personDataIsValid,
  selectHasError,
  relationTypeHelperText,
} from '../../Assets/validationFunctions.tsx';
import { getStepNumber } from '../../Assets/stepDirectory';
import { Context } from '../Wrapper/Wrapper.tsx';
import { HelpBubbleIcon } from '../../Assets/helpBubbleIcon.tsx';
import './HouseholdDataBlock.css';

const HouseholdDataBlock = ({ handleHouseholdDataSubmit }) => {
  const { formData } = useContext(Context);
  const { householdSize } = formData;
  const remainingHHMNumber = Number(householdSize);
  let { uuid, page } = useParams();
  page = parseInt(page);
  const step = getStepNumber('householdData');
  const navigate = useNavigate();
  const setPage = (page) => {
    navigate(`/${uuid}/step-${step}/${page}`);
  };
  const [submittedCount, setSubmittedCount] = useState(0);
  const [showHelpText, setShowHelpText] = useState(false);

  const initialMemberData = formData.householdData[page - 1] ?? {
    age: '',
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
      dont_know: false,
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
    const lastMemberPage = Math.min(formData.householdData.length + 1, formData.householdSize);
    if (isNaN(page) || page < 1 || page >= lastMemberPage) {
      navigate(`/${uuid}/step-${step}/${lastMemberPage}`, { replace: true });
      return;
    }
  }, []);

  const createFMInputLabel = (personIndex) => {
    if (personIndex === 1) {
      return <FormattedMessage id="householdDataBlock.createFMInputLabel-headOfHH" defaultMessage="Your Age" />;
    } else {
      return (
        <>
          <FormattedMessage id="householdDataBlock.createFMInputLabel-person" defaultMessage="Person " />
          {personIndex}
          <FormattedMessage id="householdDataBlock.createFMInputLabel-age" defaultMessage=" Age" />
        </>
      );
    }
  };

  const createAgeQuestion = (personIndex) => {
    const ageTextfieldProps = {
      inputType: 'text',
      inputName: 'age',
      inputValue: memberData.age,
      inputLabel: createFMInputLabel(personIndex),
      numericField: true,
      inputError: householdMemberAgeHasError,
      inputHelperText: displayHouseholdMemberAgeHelperText,
    };

    if (personIndex === 1) {
      return (
        <Box sx={{ marginBottom: '1.5rem' }}>
          <h2 className="question-label">
            <FormattedMessage
              id="householdDataBlock.createAgeQuestion-how-headOfHH"
              defaultMessage="How old are you?"
            />
          </h2>
          {createTextField(ageTextfieldProps, submittedCount)}
        </Box>
      );
    } else {
      return (
        <Box sx={{ marginBottom: '1.5rem' }}>
          <h2 className="question-label">
            <FormattedMessage id="householdDataBlock.createAgeQuestion-how" defaultMessage="How old are they?" />
          </h2>
          <p className="question-description">
            <FormattedMessage
              id="householdDataBlock.createAgeQuestion-zero"
              defaultMessage="If your child is less than a year old, enter 0."
            />
          </p>
          {createTextField(ageTextfieldProps, submittedCount)}
        </Box>
      );
    }
  };

  const createTextField = (componentInputProps, submittedCount) => {
    return (
      <Textfield
        componentDetails={componentInputProps}
        submitted={submittedCount}
        data={memberData}
        handleTextfieldChange={handleTextfieldChange}
      />
    );
  };

  const handleTextfieldChange = (event) => {
    const { value } = event.target;
    const numberUpToEightDigitsLongRegex = /^\d{0,8}$/;

    if (numberUpToEightDigitsLongRegex.test(value)) {
      setMemberData({ ...memberData, age: value });
    }
  };

  const createHOfHRelationQuestion = () => {
    return (
      <Box sx={{ marginBottom: '1.5rem' }}>
        <h2 className="question-label">
          <FormattedMessage
            id="householdDataBlock.createHOfHRelationQuestion-relation"
            defaultMessage="What is this person’s relationship to you?"
          />
        </h2>
        {createRelationshipDropdownMenu()}
      </Box>
    );
  };

  const formatToUSD = (num) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(num);
  };

  const createMembersAdded = (member, index) => {
    let relationship = relationshipOptions[member.relationshipToHH];
    if (relationship === undefined) {
      relationship = <FormattedMessage id="relationshipOptions.yourself" defaultMessage="Yourself" />;
    }
    const age = member.age;
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
        case 'monthly':
          num = Number(incomeAmount) * 12;
          break;
        case 'hourly':
          num = Number(incomeAmount) * Number(hoursPerWeek) * 52;
          break;
      }
      income += Number(num);
    }

    const containerClassName = `member-added-container ${index + 1 === page ? 'current-household-member' : ''}`;

    const handleEditSubmit = () => {
      setSubmittedCount(submittedCount + 1);

      const validPersonData = personDataIsValid(memberData);
      if (validPersonData) {
        handleHouseholdDataSubmit(memberData, page - 1, uuid);
        navigate(`/${uuid}/step-${step}/${index + 1}`);
      }
    };

    return (
      <article className={containerClassName} key={index}>
        <div className="household-member-header">
          <h3 className="member-added-relationship">{relationship}:</h3>
          <div className="household-member-edit-button">
            <IconButton onClick={handleEditSubmit}>
              <EditIcon />
            </IconButton>
          </div>
        </div>
        <div className="member-added-age">
          <FormattedMessage id="questions.age-inputLabel" defaultMessage="Age" />: {age}
        </div>
        <div className="member-added-income">
          <FormattedMessage id="householdDataBlock.member-income" defaultMessage="Income" />:{' '}
          {formatToUSD(Number(income))}
          <FormattedMessage id="displayAnnualIncome.annual" defaultMessage=" annually" />
        </div>
      </article>
    );
  };

  const createQuestionHeader = (personIndex) => {
    let header;
    const headOfHHInfoWasEntered = formData.householdData.length >= 1;

    if (personIndex === 1) {
      header = (
        <h1 className="sub-header question-label">
          <FormattedMessage id="householdDataBlock.questionHeader" defaultMessage="Tell us about yourself." />
        </h1>
      );
    } else {
      header = (
        <h1 className="sub-header question-label">
          <FormattedMessage
            id="questions.householdData"
            defaultMessage="Tell us about the next person in your household."
          />
        </h1>
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
            <div>{formData.householdData.map(createMembersAdded)}</div>
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
        <h2 className="question-label">
          <FormattedMessage id={formattedMsgId} defaultMessage={formattedMsgDefaultMsg} />
        </h2>
        <p className="question-description">
          <FormattedMessage
            id="householdDataBlock.createConditionsQuestion-pick"
            defaultMessage="Choose all that apply."
          />
        </p>
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
          <h2 className="question-label">
            <FormattedMessage id={formattedMsgId} defaultMessage={formattedMsgDefaultMsg} />
            <IconButton onClick={handleClick} >
            <HelpBubbleIcon/>
          </IconButton>
        </h2>
          <p className="question-description help-text">
            {showHelpText && (
            <FormattedMessage
                id="householdDataBlock.createIncomeRadioQuestion-questionDescription"
                defaultMessage="This includes money from jobs, alimony, investments, or gifts. Income is the money earned or received before deducting taxes"
              />
            )}
        </p>
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
    event.preventDefault();
    setSubmittedCount(submittedCount + 1);

    const validPersonData = personDataIsValid(memberData);
    const lastHouseholdMember = page >= remainingHHMNumber;

    if (validPersonData && lastHouseholdMember) {
      handleHouseholdDataSubmit(memberData, page - 1, uuid);
      navigate(`/${uuid}/step-${step + 1}`);
    } else if (validPersonData) {
      handleHouseholdDataSubmit(memberData, page - 1, uuid);
      setPage(page + 1);
    } else if (!validPersonData) {
      setWasSubmitted(true);
    }
  };

  const handlePreviousSubmit = () => {
    if (page <= 1) {
      navigate(`/${uuid}/step-${step - 1}`);
    } else {
      setPage(page - 1);
    }
  };

  const displayHealthInsuranceQuestion = (page, hhMemberData, setHHMemberData) => {
    return (
      <Box className="section-container">
        <Stack sx={{ padding: '3rem 0' }} className="section">
          {displayHealthCareQuestion(page)}
          {
            <OptionCardGroup
              options={page === 1 ? healthInsuranceOptions.you : healthInsuranceOptions.them}
              stateVariable="healthInsurance"
              memberData={hhMemberData}
              setMemberData={setHHMemberData}
              hhMemberIndex={page}
            />
          }
          {
            <HealthInsuranceError
              hhMemberInsurance={memberData.healthInsurance}
              submitted={submittedCount}
              hhMemberIndex={page}
            />
          }
        </Stack>
      </Box>
    );
  };

  const displayHealthCareQuestion = (page) => {
    if (page === 1) {
      return (
        <h2 className="question-label">
          <FormattedMessage
            id="questions.healthInsurance-you"
            defaultMessage="Which type of health insurance do you have?"
          />
        </h2>
      );
    } else {
      return (
        <h2 className="question-label">
          <FormattedMessage
            id="questions.healthInsurance-they"
            defaultMessage="What type of health insurance do they have?"
          />
        </h2>
      );
    }
  };

  return (
    <main className="benefits-form">
      {createQuestionHeader(page)}
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
