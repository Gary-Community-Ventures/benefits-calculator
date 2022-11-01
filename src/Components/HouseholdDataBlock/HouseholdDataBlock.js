import { useState, useEffect } from 'react';
import Textfield from '../Textfield/Textfield';
import DropdownMenu from '../DropdownMenu/DropdownMenu';
import CheckboxGroup from '../CheckboxGroup/CheckboxGroup';
import HHDataRadiofield from '../Radiofield/HHDataRadiofield';
import PersonIncomeBlock from '../IncomeBlock/PersonIncomeBlock';
import PersonExpenseBlock from '../ExpenseBlock/PersonExpenseBlock';
import HouseholdDataContinueButton from '../ContinueButton/HouseholdDataContinueButton';
import relationshipOptions from '../../Assets/relationshipOptions';
import conditionOptions from '../../Assets/conditionOptions';
import HouseholdDataPreviousButton from '../PreviousButton/HouseholdDataPreviousButton';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import { householdMemberAgeHasError, displayHouseholdMemberAgeHelperText } from '../../Assets/validationFunctions';
import { FormattedMessage } from 'react-intl';

const HouseholdDataBlock = ({ formData, handleHouseholdDataSubmit }) => {
  const { householdSize } = formData; //# of blocks - 1 that will need to be created for each household member
  const householdSizeNumber = Number(householdSize);
  const [page, setPage] = useState(0);

  let initialHouseholdData = [];

  if (formData.householdData.length >= 1) {
    initialHouseholdData = formData.householdData;
  } else {
    for (let i = 1; i < householdSizeNumber; i++) { 
      //we start at i = 1 since we don't want to count the head of household
      //this page will be blank unless formData.household size is 2 or greater
      initialHouseholdData.push({
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
        medicaid: false,
        disabilityRelatedMedicaid: false,
        noneOfTheseApply: false,
        hasIncome: false,
        incomeStreams: [],
        hasExpenses: false,
        expenses: []
      });
    }
  }
  
  const [state, setState] = useState({
    householdData: initialHouseholdData,
    wasSubmitted: false,
    error: ''
  });

  const useEffectDependencies = [];
  state.householdData.forEach((personData) => {
    useEffectDependencies.push(...[personData.student, personData.unemployed, personData.hasIncome, personData.hasExpenses]);
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

      if (personData.hasExpenses === false) {
        personData.expenses = [];
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
        personData.medicaid = false;
        personData.disabilityRelatedMedicaid = false;
      }

      return personData;
    });

    setState({...state, householdData: updatedHouseholdData})
  }, useEffectDependencies);

  const createFMInputLabel = (personIndex) => {
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

  const createAgeQuestion = (personIndex) => {
    const ageTextfieldProps = {
      inputType: 'text',
      inputName: 'age', 
      inputValue: state.householdData[personIndex].age,
      inputLabel: createFMInputLabel(personIndex),
      inputError: householdMemberAgeHasError,
      inputHelperText: displayHouseholdMemberAgeHelperText
    }

    return (
      <>
        <p className='question-label'>
          <FormattedMessage
            id='householdDataBlock.createAgeQuestion-how'
            defaultMessage='How old are they?' />
        </p>
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
        <p className='question-label'>
          <FormattedMessage
            id='householdDataBlock.createHOfHRelationQuestion-relation'
            defaultMessage='What is this person’s relationship to you?' />
        </p>
        { createRelationshipDropdownMenu(index) }
        <p className='household-data-q-underline'></p>
      </>
    );
  }

  const createPersonDataBlocks = () => {
    const personDataBlocks = state.householdData.map((personData, index) => {
      return (
        <div key={index}>
          { createAgeQuestion(index) }
          { createHOfHRelationQuestion(index) } 
          { createConditionsQuestion(index) } 
          { personData.student && createFTStudentRadioQuestion(index) }
          { personData.unemployed && createUnemployed18MosRadioQuestion(index) }
          <p className='household-data-q-underline'></p>
          { createIncomeRadioQuestion(index) }
          <p className='household-data-q-underline'></p>
          { personData.hasIncome && createPersonIncomeBlock(index) }
          { createExpenseRadioQuestion(index) }
          <p className='household-data-q-underline'></p>
          { personData.hasExpenses && createPersonExpenseBlock(index) }
          { state.error && <ErrorMessage error={state.error} /> }
          <div className='question-buttons'>
            <HouseholdDataPreviousButton 
              page={page}
              setPage={setPage}
            />
            <HouseholdDataContinueButton 
              page={page}
              setPage={setPage} 
              householdSizeNumber={householdSizeNumber} 
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
    return (
      <>
        <p className='question-label'>
          <FormattedMessage 
            id='householdDataBlock.createConditionsQuestion-do-these-apply' 
            defaultMessage='Do any of these apply to them?' />
        </p>
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
      ariaLabel: 
        <FormattedMessage 
          id='householdDataBlock.createFTStudentRadioQuestion-ariaLabel' 
          defaultMessage='is a full-time student' />,
      inputName: 'studentFulltime',
      value: state.householdData[index].studentFulltime
    };

    return (
      <>
        <p className='question-label radio-question'>
          <FormattedMessage 
            id='householdDataBlock.createFTStudentRadioQuestion-questionLabel' 
            defaultMessage='Are they a full-time student?' />
        </p>
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
      ariaLabel: 
        <FormattedMessage 
          id='householdDataBlock.createUnemployed18MosRadioQuestion-ariaLabel' 
          defaultMessage='has worked in the past 18 months' />,
      inputName: 'unemployedWorkedInLast18Mos',
      value: state.householdData[index].unemployedWorkedInLast18Mos
    };

    return (
      <>
        <p className='question-label radio-question'>
          <FormattedMessage 
            id='householdDataBlock.createUnemployed18MosRadioQuestion-questionLabel' 
            defaultMessage='Did they work in the last 18 months?' />
        </p>
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
      ariaLabel: 
        <FormattedMessage 
          id='householdDataBlock.createIncomeRadioQuestion-ariaLabel' 
          defaultMessage='has an income' />,
      inputName: 'hasIncome',
      value: state.householdData[index].hasIncome
    };

    return (
      <>
        <p className='question-label radio-question'>
          <FormattedMessage 
            id='householdDataBlock.createIncomeRadioQuestion-questionLabel' 
            defaultMessage='Does this individual in your household have significant income you have not already included?' />
        </p>
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

  const createExpenseRadioQuestion = (index) => {
    const radiofieldProps = {
      ariaLabel: 
        <FormattedMessage 
          id='householdDataBlock.createExpenseRadioQuestion-ariaLabel' 
          defaultMessage='has expenses' />,
      inputName: 'hasExpenses',
      value: state.householdData[index].hasExpenses
    };

    return (
      <>
        <p className='question-label radio-question'>
          <FormattedMessage 
            id='householdDataBlock.createExpenseRadioQuestion-questionLabel' 
            defaultMessage='Do they have any expenses' />
        </p>
        <p className='question-description'>
          <FormattedMessage 
            id='householdDataBlock.createExpenseRadioQuestion-questionDescription' 
            defaultMessage='This includes costs like rent, mortgage, medical bills, child care, child support and heating bills.' />
        </p>
        <HHDataRadiofield 
          componentDetails={radiofieldProps}
          setState={setState}
          state={state}
          index={index} />
      </>
    );
  }

  const createPersonExpenseBlock = (index) => {
    return (
      <>
        <PersonExpenseBlock 
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