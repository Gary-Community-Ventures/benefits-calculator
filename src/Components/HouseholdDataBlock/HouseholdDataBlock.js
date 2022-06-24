import { useState } from 'react';
import Textfield from '../Textfield/Textfield';
import { ageHasError, displayAgeHelperText } from '../../Assets/validationFunctions';

const HouseholdDataBlock = ({ formData }) => {
  const { householdSize } = formData; //# of blocks that will need to be created for each household member
  
  const [householdData, setHouseholdData] = useState([{
      age: '',
      ageLabel: `Person 1 Age`,
      relationshipToHH: ``
    }
  ]);

  const createAgeQuestion = (personIndex) => {
    const ageTextfieldProps = {
      inputType: 'text',
      inputName: 'age', 
      inputValue: householdData[personIndex].age,
      inputLabel: householdData[personIndex].ageLabel,
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
            age: value,
            ageLabel: `Person ${i + 1} Age`
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
      </>
    );
  }

  const createHouseholdBlocks = () => {
    return householdData.map((personData, index) => {
      return (
        <div key={index}>
          { createAgeQuestion(index) }
          { createHOfHRelationQuestion(index) } 
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

  return (
    <div>
      { createHouseholdBlocks() }
    </div>
  );
}

export default HouseholdDataBlock;