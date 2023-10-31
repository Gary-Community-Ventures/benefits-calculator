import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Textfield from '../Textfield/Textfield';
import DropdownMenu from '../DropdownMenu/DropdownMenu';
import CheckboxGroup from '../CheckboxGroup/CheckboxGroup';
import HHDataRadiofield from '../Radiofield/HHDataRadiofield';
import PersonIncomeBlock from '../IncomeBlock/PersonIncomeBlock';
import HealthInsuranceQ from '../HealthInsuranceQ/HealthInsuranceQ.tsx';
import ContinueButton from '../ContinueButton/ContinueButton';
import relationshipOptions from '../../Assets/relationshipOptions';
import conditionOptions from '../../Assets/conditionOptions';
import {
  householdMemberAgeHasError,
  displayHouseholdMemberAgeHelperText,
  healthInsuranceDataHasError,
  getHealthInsuranceError,
  personDataIsValid,
  useErrorController,
  selectHasError,
  relationTypeHelperText,
} from '../../Assets/validationFunctions.tsx';
import { FormattedMessage } from 'react-intl';
import { getStepNumber } from '../../Assets/stepDirectory';
import PreviousButton from '../PreviousButton/PreviousButton';
import { Context } from '../Wrapper/Wrapper.tsx';
import EditIcon from '@mui/icons-material/Edit';
import { IconButton } from '@mui/material';
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
  const ageErrorController = useErrorController(householdMemberAgeHasError, displayHouseholdMemberAgeHelperText);
  const healthInsuranceErrorController = useErrorController(healthInsuranceDataHasError, getHealthInsuranceError);

  const initialHouseholdData = formData.householdData[page - 1] ?? {
    age: '',
    relationshipToHH: page === 1 ? 'headOfHousehold' : '',
    student: false,
    pregnant: false,
    blindOrVisuallyImpaired: false,
    disabled: false,
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

  const [householdData, setHouseholdData] = useState(initialHouseholdData);
  const [wasSubmitted, setWasSubmitted] = useState(false);

  useEffect(() => {
    window.scroll({ top: 0, left: 0, behavior: 'smooth' });
  }, [wasSubmitted]);

  useEffect(() => {
    const updatedHouseholdData = { ...householdData };

    if (updatedHouseholdData.hasIncome === false) {
      updatedHouseholdData.incomeStreams = [];
    }

    setHouseholdData(updatedHouseholdData);
  }, [householdData.hasIncome]);

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
      inputValue: householdData.age,
      inputLabel: createFMInputLabel(personIndex),
      inputError: householdMemberAgeHasError,
      inputHelperText: displayHouseholdMemberAgeHelperText,
    };

    if (personIndex === 1) {
      return (
        <>
          <h2 className="question-label">
            <FormattedMessage
              id="householdDataBlock.createAgeQuestion-how-headOfHH"
              defaultMessage="How old are you?"
            />
          </h2>
          {createTextField(ageTextfieldProps, ageErrorController)}
          <p className="household-data-q-underline"></p>
        </>
      );
    } else {
      return (
        <>
          <h2 className="question-label">
            <FormattedMessage id="householdDataBlock.createAgeQuestion-how" defaultMessage="How old are they?" />
          </h2>
          <p className="question-description">
            <FormattedMessage
              id="householdDataBlock.createAgeQuestion-zero"
              defaultMessage="If your child is less than a year old, enter 0."
            />
          </p>
          {createTextField(ageTextfieldProps, ageErrorController)}
          <p className="household-data-q-underline"></p>
        </>
      );
    }
  };

  const createTextField = (componentInputProps, errorController) => {
    return (
      <Textfield
        componentDetails={componentInputProps}
        submitted={errorController.submittedCount}
        data={householdData}
        handleTextfieldChange={handleTextfieldChange}
      />
    );
  };

  const handleTextfieldChange = (event) => {
    const { value } = event.target;
    const numberUpToEightDigitsLongRegex = /^\d{0,8}$/;

    if (numberUpToEightDigitsLongRegex.test(value)) {
      setHouseholdData({ ...householdData, age: value });
    }
  };

  const createHOfHRelationQuestion = () => {
    return (
      <>
        <h2 className="question-label">
          <FormattedMessage
            id="householdDataBlock.createHOfHRelationQuestion-relation"
            defaultMessage="What is this person’s relationship to you?"
          />
        </h2>
        {createRelationshipDropdownMenu()}
        <p className="household-data-q-underline"></p>
      </>
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

    return (
      <article className={containerClassName} key={index}>
        <div className="household-member-header">
          <h3 className="member-added-relationship">{relationship}:</h3>
          <div className="household-member-edit-button">
            <IconButton
              onClick={() => {
                navigate(`/${uuid}/step-${step}/${index + 1}`);
              }}
            >
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
        <h1 className="question-label household-data-q-underline">
          <FormattedMessage id="householdDataBlock.questionHeader" defaultMessage="Tell us about yourself." />
        </h1>
      );
    } else {
      header = (
        <h1 className="question-label household-data-q-underline">
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
          <>
            <h2 className="household-data-sub-header">
              <FormattedMessage id="qcc.so-far-text" defaultMessage="So far you've told us about:" />
            </h2>
            <div>{formData.householdData.map(createMembersAdded)}</div>
            <div className="household-data-q-underline"></div>
          </>
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
        setHouseholdData={setHouseholdData}
        householdData={householdData}
        submitted={ageErrorController.submittedCount}
      />
    );
  };

  const createConditionsCheckboxMenu = (index) => {
    return (
      <CheckboxGroup
        options={conditionOptions}
        householdData={householdData}
        setHouseholdData={setHouseholdData}
        index={index}
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
      <>
        <h2 className="question-label">
          <FormattedMessage id={formattedMsgId} defaultMessage={formattedMsgDefaultMsg} />
        </h2>
        <p className="question-description">
          <FormattedMessage
            id="householdDataBlock.createConditionsQuestion-pick"
            defaultMessage="It's OK to pick more than one."
          />
        </p>
        {createConditionsCheckboxMenu(index)}
      </>
    );
  };

  const createIncomeRadioQuestion = (index) => {
    const radiofieldProps = {
      ariaLabel: 'householdDataBlock.createIncomeRadioQuestion-ariaLabel',
      inputName: 'hasIncome',
      value: householdData.hasIncome,
    };

    const formattedMsgId =
      index === 1 ? 'questions.hasIncome' : 'householdDataBlock.createIncomeRadioQuestion-questionLabel';

    const formattedMsgDefaultMsg =
      index === 1
        ? 'Do you have an income?'
        : 'Does this individual in your household have significant income you have not already included?';

    return (
      <>
        <h2 className="question-label radio-question">
          <FormattedMessage id={formattedMsgId} defaultMessage={formattedMsgDefaultMsg} />
        </h2>
        <p className="question-description">
          <FormattedMessage
            id="householdDataBlock.createIncomeRadioQuestion-questionDescription"
            defaultMessage="This includes money from jobs, alimony, investments, or gifts. Income is the money earned or received before deducting taxes"
          />
        </p>
        <HHDataRadiofield
          componentDetails={radiofieldProps}
          setHouseholdData={setHouseholdData}
          householdData={householdData}
        />
      </>
    );
  };

  const createPersonIncomeBlock = (submitted) => {
    return (
      <>
        <PersonIncomeBlock
          householdData={householdData}
          setHouseholdData={setHouseholdData}
          page={page}
          submitted={submitted}
        />
        <p className="household-data-q-underline"></p>
      </>
    );
  };

  const handleContinueSubmit = (event, validateInputFunction, inputToBeValidated, stepId, questionName, uuid) => {
    event.preventDefault();
    ageErrorController.incrementSubmitted();
    ageErrorController.updateError(householdData.age);
    healthInsuranceErrorController.incrementSubmitted();

    const validPersonData = personDataIsValid(householdData);
    const lastHouseholdMember = page >= remainingHHMNumber;

    if (validPersonData && lastHouseholdMember) {
      handleHouseholdDataSubmit(householdData, page - 1, uuid);
      navigate(`/${uuid}/step-${step + 1}`);
    } else if (validPersonData) {
      handleHouseholdDataSubmit(householdData, page - 1, uuid);
      setPage(page + 1);
    } else if (!validPersonData) {
      setWasSubmitted(true);
      healthInsuranceErrorController.updateError(householdData.healthInsurance);
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
      <>
        <HealthInsuranceQ
          hhMemberIndex={page}
          householdMemberData={hhMemberData}
          setHouseholdMemberData={setHHMemberData}
          healthInsuranceErrorController={healthInsuranceErrorController}
        />
        <p className="household-data-q-underline"></p>
      </>
    );
  }

  return (
    <main className="benefits-form">
      <div>
        {createQuestionHeader(page)}
        {createAgeQuestion(page)}
        {page === 1 && displayHealthInsuranceQuestion(page, householdData, setHouseholdData)}
        {page !== 1 && createHOfHRelationQuestion()}
        {page !== 1 && displayHealthInsuranceQuestion(page, householdData, setHouseholdData)}
        {createConditionsQuestion(page)}
        <p className="household-data-q-underline"></p>
        {createIncomeRadioQuestion(page)}
        <p className="household-data-q-underline"></p>
        {householdData.hasIncome && createPersonIncomeBlock(ageErrorController.submittedCount)}
        <div className="question-buttons">
          <PreviousButton navFunction={handlePreviousSubmit} />
          <ContinueButton handleContinueSubmit={handleContinueSubmit} />
        </div>
      </div>
    </main>
  );
};

export default HouseholdDataBlock;
