import { useState, useEffect } from 'react';
import Textfield from '../Textfield/Textfield';
import DropdownMenu from '../DropdownMenu/DropdownMenu';
import CheckboxGroup from '../CheckboxGroup/CheckboxGroup';
import HHDataRadiofield from '../Radiofield/HHDataRadiofield';
import HouseholdDataIncomeBlock from '../IncomeBlock/HouseholdDataIncomeBlock';
import relationshipOptions from '../../Assets/relationshipOptions';
import conditionOptions from '../../Assets/conditionOptions';
import { ageHasError, displayAgeHelperText } from '../../Assets/validationFunctions';

const HouseholdDataBlock = ({ formData }) => {
  const { householdSize } = formData; //# of blocks - 1 that will need to be created for each household member
  const householdSizeNumber = Number(householdSize);
  const initialHouseholdData = [];

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
  
  const [householdData, setHouseholdData] = useState(initialHouseholdData);

  const useEffectDependencies = []
  householdData.forEach((personData) => {
    useEffectDependencies.push(...[personData.student, personData.unemployed, personData.hasIncome, personData.hasExpenses]);
  });
  
  useEffect(() => {
    let updatedHouseholdData = [ ...householdData ];

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

    setHouseholdData(updatedHouseholdData);
  }, useEffectDependencies);

  const createAgeQuestion = (personIndex) => {
    const ageTextfieldProps = {
      inputType: 'text',
      inputName: 'age', 
      inputValue: householdData[personIndex].age,
      inputLabel: `Person ${personIndex + 1} Age`,
      inputError: ageHasError,
      inputHelperText: displayAgeHelperText
    }

    return (
      <>
        <p className='question-label'>How old are they?</p>
        { createTextfield(ageTextfieldProps, personIndex) }
        <p className='household-data-q-underline'></p>
      </>
    );
  }

  const createTextfield = (componentInputProps, index) => {
    return (
      <Textfield 
        componentDetails={componentInputProps}
        formData={householdData[index]}
        handleTextfieldChange={handleTextfieldChange} 
        index={index} />
    );
  }

  const handleTextfieldChange = (event, index) => {
    const { value } = event.target;
    const numberUpToEightDigitsLongRegex = /^\d{0,8}$/;

    if (numberUpToEightDigitsLongRegex.test(value)) {
      const updatedHouseholdData = householdData.map((personData, i) => {
        if (i === index) {
          return {
            ...personData,
            age: value
          };
        } else {
          return personData;
        }
      });

      setHouseholdData(updatedHouseholdData);
    }
  }

  const createHOfHRelationQuestion = (index) => {
    return (
      <>
        <p className='question-label'>What is this person’s relationship to the head of the household?</p>
        { createRelationshipDropdownMenu(index) }
        <p className='household-data-q-underline'></p>
      </>
    );
  }

  const createHouseholdBlocks = () => {
    return householdData.map((personData, index) => {
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
        </div>
      );
    });
  }

  const createDropdownCompProps = () => {
    const dropdownCompProps = {
      labelId:'relation-to-hh-label',
      inputLabelText: 'Relation',
      id: 'relationship-select',
      label:'Relation Type', 
      disabledSelectMenuItemText: 'Click to select relationship'
    }

    return dropdownCompProps;
  }

  const createRelationshipDropdownMenu = (index) => {
    return (
      <DropdownMenu 
        dropdownComponentProps={createDropdownCompProps()}
        options={relationshipOptions}
        householdData={householdData}
        setHouseholdData={setHouseholdData}
        index={index} />
    ); 
  }

  const createConditionsCheckboxMenu = (index) => {
    return (
      <CheckboxGroup
        options={conditionOptions}
        householdData={householdData}
        setHouseholdData={setHouseholdData} 
        index={index}/>
    );
  }

  const createConditionsQuestion = (index) => {
    return (
      <>
        <p className='question-label'>Do any of these apply to them?</p>
        <p className='question-description'>It's OK to pick more than one.</p>
        { createConditionsCheckboxMenu(index) }
      </>
    );
  }

  const createFTStudentRadioQuestion = (index) => {
    const radiofieldProps = {
      ariaLabel: 'is a full-time student',
      inputName: 'studentFulltime',
      value: householdData[index].studentFulltime
    };

    return (
      <>
        <p className='question-label radio-question'>Are they a full-time student?</p>
        <HHDataRadiofield 
          componentDetails={radiofieldProps}
          householdData={householdData}
          setHouseholdData={setHouseholdData}
          index={index} />
      </>
    );
  }

  const createUnemployed18MosRadioQuestion = (index) => {
    const radiofieldProps = {
      ariaLabel: 'has worked in the past 18 months',
      inputName: 'unemployedWorkedInLast18Mos',
      value: householdData[index].unemployedWorkedInLast18Mos
    };

    return (
      <>
        <p className='question-label radio-question'>Did they work in the last 18 months?</p>
        <HHDataRadiofield 
          componentDetails={radiofieldProps}
          householdData={householdData}
          setHouseholdData={setHouseholdData}
          index={index} />
      </>
    );
  }

  const createIncomeRadioQuestion = (index) => {
    const radiofieldProps = {
      ariaLabel: 'has an income',
      inputName: 'hasIncome',
      value: householdData[index].hasIncome
    };

    return (
      <>
        <p className='question-label radio-question'>Do they have an income?</p>
        <p className='question-description'>This includes money from jobs, alimony, investments, or gifts.</p>
        <HHDataRadiofield 
          componentDetails={radiofieldProps}
          householdData={householdData}
          setHouseholdData={setHouseholdData}
          index={index} />
      </>
    );
  }

  return (
    <div>
      { createHouseholdBlocks() }
    </div>
  );
}

export default HouseholdDataBlock;