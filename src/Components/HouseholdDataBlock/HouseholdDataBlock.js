import { useState } from 'react';
import Textfield from '../Textfield/Textfield';
import DropdownMenu from '../DropdownMenu/DropdownMenu';
import CheckboxGroup from '../CheckboxGroup/CheckboxGroup';
import HHDataRadiofield from '../Radiofield/HHDataRadiofield';
import relationshipOptions from '../../Assets/relationshipOptions';
import conditionOptions from '../../Assets/conditionOptions';
import { ageHasError, displayAgeHelperText } from '../../Assets/validationFunctions';

const HouseholdDataBlock = ({ formData }) => {
  const { householdSize } = formData; //# of blocks that will need to be created for each household member
  
  const [householdData, setHouseholdData] = useState([{
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
    }
  ]);

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
        <p className='question-label'>Are they a full-time student?</p>
        <HHDataRadiofield 
          componentDetails={radiofieldProps}
          householdData={householdData}
          setHouseholdData={setHouseholdData}
          index={index} />
      </>
    );

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

  return (
    <div>
      { createHouseholdBlocks() }
    </div>
  );
}

export default HouseholdDataBlock;