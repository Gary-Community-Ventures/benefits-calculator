import { useState, useEffect } from 'react';
import Textfield from '../Textfield/Textfield';
import DropdownMenu from '../DropdownMenu/DropdownMenu';
import CheckboxGroup from '../CheckboxGroup/CheckboxGroup';
import HHDataRadiofield from '../Radiofield/HHDataRadiofield';
import PersonIncomeBlock from '../IncomeBlock/PersonIncomeBlock';
import HouseholdDataContinueButton from '../ContinueButton/HouseholdDataContinueButton';
import relationshipOptions from '../../Assets/relationshipOptions';
import conditionOptions from '../../Assets/conditionOptions';
import HouseholdDataPreviousButton from '../PreviousButton/HouseholdDataPreviousButton';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import { householdMemberAgeHasError, displayHouseholdMemberAgeHelperText,
  getPersonDataErrorMsg } from '../../Assets/validationFunctions';
import { FormattedMessage } from 'react-intl';
import './HouseholdDataBlock.css';

const HouseholdDataBlock = ({ formData, handleHouseholdDataSubmit }) => {
  const { householdSize } = formData;

  //# of blocks that will need to be created for each household member
  //this now includes the head of household
  const remainingHHMNumber = Number(householdSize);
  const [page, setPage] = useState(0);
  let initialHouseholdData = [];

  const createHHMInitData = (remaining, current) => {
    const result = [];
    for (let i = 0; i < remaining - current; i++) {
      result.push({
        age: '',
        relationshipToHH: ``,
        student: false,
        studentFulltime: false,
        pregnant: false,
        unemployed: false,
        unemployedWorkedInLast18Mos: false,
        blindOrVisuallyImpaired: false,
        disabled: false,
        veteran: false,
        noneOfTheseApply: false,
        hasIncome: false,
        incomeStreams: []
      });

      if (i === 0 && current === 0) {
        result[i].relationshipToHH = 'headOfHousehold';
      }
    }
    return result;
  }

  if (formData.householdData.length > 0 && formData.householdData.length === remainingHHMNumber) {
    //the hhData and remHHM numbers are the same => use the hhData saved in state
    initialHouseholdData = formData.householdData;
  } else if (formData.householdData.length < remainingHHMNumber) {
    //they've added/increased the size of their household so we need to create objects
    //for each of the new members and add them to the existing formData.householdData
    const newHHMembers = createHHMInitData(remainingHHMNumber, formData.householdData.length);
    initialHouseholdData = [...formData.householdData, ...newHHMembers];
  } else if (formData.householdData.length > remainingHHMNumber) {
    //they've decreased the size of their household so we need to remove members
    //from the end of the formData.householdData array
    const householdSizeDifference = formData.householdData.length - remainingHHMNumber;
    const updatedHHMembers = formData.householdData.slice(0, formData.householdData.length - householdSizeDifference);
    initialHouseholdData = updatedHHMembers;
  }

  const [state, setState] = useState({
    householdData: initialHouseholdData,
    wasSubmitted: false,
    error: ''
  });

  const useEffectDependencies = [];
  state.householdData.forEach((personData) => {
    useEffectDependencies.push(...[personData.student, personData.unemployed, personData.hasIncome]);
  });

  useEffect(() => {
    let updatedHouseholdData = [ ...state.householdData ];

    updatedHouseholdData = updatedHouseholdData.map((personData) => {
      if (personData.student === false) {
        personData.studentFulltime = false;
      }

      if (personData.unemployed === false) {
        personData.unemployedWorkedInLast18Mos = false;
      }

      if (personData.hasIncome === false) {
        personData.incomeStreams = [];
      }

      if (personData.noneOfTheseApply === true) {
        personData.student = false;
        personData.studentFulltime = false;
        personData.pregnant = false;
        personData.unemployed = false;
        personData.unemployedWorkedInLast18Mos = false;
        personData.blindOrVisuallyImpaired = false;
        personData.disabled = false;
        personData.veteran = false;
      }

      return personData;
    });

    setState({...state, householdData: updatedHouseholdData})
  }, useEffectDependencies);

  useEffect(() => {
    if (state.wasSubmitted) {
      setState({
        ...state,
        error: getPersonDataErrorMsg(state, page)
      });
    }
  }, [state.householdData]);

  useEffect(() => {
    setState({
      ...state,
      wasSubmitted: false
    });
  }, [page]);

  const createFMInputLabel = (personIndex) => {
    if (personIndex === 0) {
      return (
        <FormattedMessage
          id='householdDataBlock.createFMInputLabel-headOfHH'
          defaultMessage='Your Age' />
      );
    } else {
      return (
        <>
          <FormattedMessage
            id='householdDataBlock.createFMInputLabel-person'
            defaultMessage='Person ' />
          {personIndex + 1}
          <FormattedMessage
            id='householdDataBlock.createFMInputLabel-age'
            defaultMessage=' Age' />
        </>
      );
    }

  }

  const createAgeQuestion = (personIndex) => {
    const ageTextfieldProps = {
      inputType: 'text',
      inputName: 'age',
      inputValue: state.householdData[personIndex].age,
      inputLabel: createFMInputLabel(personIndex),
      inputError: householdMemberAgeHasError,
      inputHelperText: displayHouseholdMemberAgeHelperText
    }

    if (personIndex === 0) {
      return (
        <>
          <h2 className='question-label'>
            <FormattedMessage
              id='householdDataBlock.createAgeQuestion-how-headOfHH'
              defaultMessage='How old are you?' />
          </h2>
          { createTextfield(ageTextfieldProps, personIndex) }
          <p className='household-data-q-underline'></p>
        </>
      );
    } else {
      return (
        <>
          <h2 className='question-label'>
            <FormattedMessage
              id='householdDataBlock.createAgeQuestion-how'
              defaultMessage='How old are they?' />
          </h2>
          <p className='question-description'>
            <FormattedMessage
              id='householdDataBlock.createAgeQuestion-zero'
              defaultMessage="If your child is less than a year old, enter 0." />
          </p>
          { createTextfield(ageTextfieldProps, personIndex) }
          <p className='household-data-q-underline'></p>
        </>
      );
    }
  }

  const createTextfield = (componentInputProps, index) => {
    return (
      <Textfield
        componentDetails={componentInputProps}
        formData={state.householdData[index]}
        handleTextfieldChange={handleTextfieldChange}
        index={index} />
    );
  }

  const handleTextfieldChange = (event, index) => {
    const { value } = event.target;
    const numberUpToEightDigitsLongRegex = /^\d{0,8}$/;

    if (numberUpToEightDigitsLongRegex.test(value)) {
      const updatedHouseholdData = state.householdData.map((personData, i) => {
        if (i === index) {
          return {
            ...personData,
            age: value
          };
        } else {
          return personData;
        }
      });

      setState({...state, householdData: updatedHouseholdData});
    }
  }

  const createHOfHRelationQuestion = (index) => {
    return (
      <>
        <h2 className='question-label'>
          <FormattedMessage
            id='householdDataBlock.createHOfHRelationQuestion-relation'
            defaultMessage='What is this person’s relationship to you?' />
        </h2>
        { createRelationshipDropdownMenu(index) }
        <p className='household-data-q-underline'></p>
      </>
    );
  }

  const createMembersAdded = (member, index) => {
    let relationship = relationshipOptions[member.relationshipToHH];
    if (relationship === undefined) {
      relationship = <FormattedMessage
        id="relationshipOptions.yourself"
        defaultMessage="Yourself"
      />
    }
    const age = member.age;
    let income = 0;
    for (const {incomeFrequency, incomeAmount, hoursPerWeek} of member.incomeStreams) {
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

    if (index >= page) {
      return;
    } else {
      return (
        <span className="member-added-container" key={index}>
          <h3 className="member-added-relationship">{relationship}:</h3>
          <div className="member-added-age">Age: {age}</div>
          <div className="member-added-income">Income: ${income} annually</div>
        </span>
      );
    }
  }

  const createQuestionHeader = (personIndex) => {
    if (personIndex === 0) {
      return (
        <h1 className='question-label household-data-q-underline'>
          <FormattedMessage
            id='householdDataBlock.questionHeader'
            defaultMessage='Tell us about yourself.'
          />
        </h1>
      );
    } else {
      return (
				<>
					<h1 className="question-label household-data-q-underline">
						<FormattedMessage
							id="questions.householdData"
							defaultMessage="Tell us about the next person in your household."
						/>
					</h1>
					<h2 className="household-data-sub-header">
						<FormattedMessage
							id="qcc.so-far-text"
							defaultMessage="So far you've told us about:"
						/>
					</h2>
					<div>
						{state.householdData.map(createMembersAdded)}
					</div>
					<div className="household-data-q-underline"></div>
				</>
			);
    }
  }

  const createPersonDataBlocks = () => {
    const personDataBlocks = state.householdData.map((personData, index) => {
      return (
        <div key={index}>
          { createQuestionHeader(index) }
          { createAgeQuestion(index) }
          { index !== 0 && createHOfHRelationQuestion(index) }
          { createConditionsQuestion(index) }
          { personData.student && createFTStudentRadioQuestion(index) }
          { personData.unemployed && createUnemployed18MosRadioQuestion(index) }
          <p className='household-data-q-underline'></p>
          { createIncomeRadioQuestion(index) }
          <p className='household-data-q-underline'></p>
          { personData.hasIncome && createPersonIncomeBlock(index) }
          { state.error && <ErrorMessage error={state.error} /> }
          <div className='question-buttons'>
            <HouseholdDataPreviousButton
              page={page}
              setPage={setPage}
            />
            <HouseholdDataContinueButton
              page={page}
              setPage={setPage}
              remainingHHMNumber={remainingHHMNumber}
              handleHouseholdDataSubmit={handleHouseholdDataSubmit}
              setState={setState}
              state={state}
            />
          </div>
        </div>
      );
    });

    return personDataBlocks;
  }

  const createDropdownCompProps = () => {
    const dropdownCompProps = {
      labelId:'relation-to-hh-label',
      inputLabelText:
        <FormattedMessage
          id='householdDataBlock.createDropdownCompProps-inputLabelText'
          defaultMessage='Relation' />,
      id: 'relationship-select',
      label:
        <FormattedMessage
          id='householdDataBlock.createDropdownCompProps-label'
          defaultMessage='Relation Type' />,
      disabledSelectMenuItemText:
        <FormattedMessage
          id='householdDataBlock.createDropdownCompProps-disabledSelectMenuItemText'
          defaultMessage='Click to select relationship' />
    }

    return dropdownCompProps;
  }

  const createRelationshipDropdownMenu = (index) => {
    return (
      <DropdownMenu
        dropdownComponentProps={createDropdownCompProps()}
        options={relationshipOptions}
        setState={setState}
        state={state}
        index={index} />
    );
  }

  const createConditionsCheckboxMenu = (index) => {
    return (
      <CheckboxGroup
        options={conditionOptions}
        state={state}
        setState={setState}
        index={index}/>
    );
  }

  const createConditionsQuestion = (index) => {
    const formattedMsgId = (index === 0) ?
      'householdDataBlock.createConditionsQuestion-do-these-apply-to-you'
      : 'householdDataBlock.createConditionsQuestion-do-these-apply';

    const formattedMsgDefaultMsg = (index === 0) ?
      'Do any of these apply to you?'
      : 'Do any of these apply to them?';

    return (
      <>
        <h2 className='question-label'>
          <FormattedMessage
            id={formattedMsgId}
            defaultMessage={formattedMsgDefaultMsg} />
        </h2>
        <p className='question-description'>
          <FormattedMessage
            id='householdDataBlock.createConditionsQuestion-pick'
            defaultMessage="It's OK to pick more than one." />
        </p>
        { createConditionsCheckboxMenu(index) }
      </>
    );
  }

  const createFTStudentRadioQuestion = (index) => {
    const radiofieldProps = {
      ariaLabel: 'householdDataBlock.createFTStudentRadioQuestion-ariaLabel',
      inputName: 'studentFulltime',
      value: state.householdData[index].studentFulltime
    };

    const formattedMsgId = (index === 0) ?
    'householdDataBlock.createFTStudentRadioQuestion-youQLabel'
    : 'householdDataBlock.createFTStudentRadioQuestion-questionLabel';

    const formattedMsgDefaultMsg = (index === 0) ?
      'Are you a full-time student'
      : 'Are they a full-time student?';

    return (
      <>
        <h2 className='question-label radio-question'>
          <FormattedMessage
            id={formattedMsgId}
            defaultMessage={formattedMsgDefaultMsg} />
        </h2>
        <HHDataRadiofield
          componentDetails={radiofieldProps}
          setState={setState}
          state={state}
          index={index} />
      </>
    );
  }

  const createUnemployed18MosRadioQuestion = (index) => {
    const radiofieldProps = {
      ariaLabel: 'householdDataBlock.createUnemployed18MosRadioQuestion-ariaLabel',
      inputName: 'unemployedWorkedInLast18Mos',
      value: state.householdData[index].unemployedWorkedInLast18Mos
    };

    const formattedMsgId = (index === 0) ?
      'householdDataBlock.createUnemployed18MosRadioQuestion-youQLabel'
      : 'householdDataBlock.createUnemployed18MosRadioQuestion-questionLabel';

    const formattedMsgDefaultMsg = (index === 0) ?
      'Did you work in the last 18 months?'
      : 'Did they work in the last 18 months?';

    return (
      <>
        <h2 className='question-label radio-question'>
          <FormattedMessage
            id={formattedMsgId}
            defaultMessage={formattedMsgDefaultMsg} />
        </h2>
        <HHDataRadiofield
          componentDetails={radiofieldProps}
          setState={setState}
          state={state}
          index={index} />
      </>
    );
  }

  const createIncomeRadioQuestion = (index) => {
    const radiofieldProps = {
      ariaLabel: 'householdDataBlock.createIncomeRadioQuestion-ariaLabel',
      inputName: 'hasIncome',
      value: state.householdData[index].hasIncome
    };

    const formattedMsgId = (index === 0) ?
      'questions.hasIncome'
      : 'householdDataBlock.createIncomeRadioQuestion-questionLabel';

    const formattedMsgDefaultMsg = (index === 0) ?
      'Do you have an income?'
      : 'Does this individual in your household have significant income you have not already included?';

    return (
      <>
        <h2 className='question-label radio-question'>
          <FormattedMessage
            id={formattedMsgId}
            defaultMessage={formattedMsgDefaultMsg} />
        </h2>
        <p className='question-description'>
          <FormattedMessage
            id='householdDataBlock.createIncomeRadioQuestion-questionDescription'
            defaultMessage='This includes money from jobs, alimony, investments, or gifts.' />
        </p>
        <HHDataRadiofield
          componentDetails={radiofieldProps}
          setState={setState}
          state={state}
          index={index} />
      </>
    );
  }

  const createPersonIncomeBlock = (index) => {
    return (
      <>
        <PersonIncomeBlock
          personData={state.householdData[index]}
          setState={setState}
          state={state}
          personDataIndex={index} />
        <p className='household-data-q-underline'></p>
      </>
    );
  }

  const displaySinglePersonDataPage = (currentPage) => {
    const allHouseholdDataBlockComponents = createPersonDataBlocks();

    //this will only show the personDataBlock who's householdData index matches the currentPage
    return allHouseholdDataBlockComponents[currentPage];
  }

  return (
    <div>
      { displaySinglePersonDataPage(page) }
    </div>
  );
}

export default HouseholdDataBlock;
