import { FormControl, Select, MenuItem, InputLabel, TextField, Button } from "@mui/material";
import { useState } from 'react';
import { styled } from '@mui/material/styles';
import { incomeStreamValueHasError, displayIncomeStreamValueHelperText } from '../../Assets/validationFunctions';
import incomeOptions from '../../Assets/incomeOptions';
import PreviousButton from "../PreviousButton/PreviousButton";
import { incomeStreamsAreValid } from "../../Assets/validationFunctions";
import './IncomeBlock.css';

const StyledSelectfield = styled(Select)({
  marginBottom: 20,
  minWidth: 200
});

const StyledTextField = styled(TextField)({
  marginBottom: 20
});

const StyledDeleteButton = styled(Button)({
  minWidth: 32
});

const IncomeBlock = ({ page, setPage, handleIncomeStreamsSubmit, formData }) => {
  //if there are any elements in state for incomeStreams create IncomeBlock components for those 
  //first by assigning them to the initial selectedMenuItem state
  //if not then create the initial income block questions
  const [selectedMenuItem, setSelectedMenuItem] = useState(formData.incomeStreams.length > 0 ? formData.incomeStreams :
  [
    {
      incomeStreamName: '', 
      incomeStreamLabel: '', 
      incomeAmount: 0,
      incomeFrequency: ''
    }
  ]);

  const createMenuItems = () => {
    const disabledSelectMenuItem = <MenuItem value='select' key='disabled-select-value' disabled>Select</MenuItem>;
    const menuItemKeys = Object.keys(incomeOptions);
    const menuItemLabels = Object.values(incomeOptions);

    const menuItems = menuItemKeys.map((menuItemKey, i) => {
      return (
        <MenuItem value={menuItemKey} key={menuItemLabels[i]}>{menuItemLabels[i]}</MenuItem>
      );
    });

    return [disabledSelectMenuItem, menuItems];
  }

  const createFrequencyMenuItems = () => {
    const disabledSelectMenuItem = <MenuItem value='select' key='disabled-frequency-select-value' disabled>Select</MenuItem>;
    const incomeFrequencyOptions = {
      weekly:'Every week',
      biweekly: 'Every 2 weeks',
      monthly: 'Every month',
      semimonthly: 'Twice a month',
      yearly: 'Every year'
    };

    const menuItemKeys = Object.keys(incomeFrequencyOptions);
    const menuItemLabels = Object.values(incomeFrequencyOptions);
    const menuItems = menuItemKeys.map((menuItemKey, i) => {
      return (
        <MenuItem value={menuItemKey} key={menuItemLabels[i]}>{menuItemLabels[i]}</MenuItem>
      );
    });

    return [disabledSelectMenuItem, menuItems];

  }
  
  const handleSelectChange = (event, index) => {
    const updatedSelectedMenuItems = selectedMenuItem.map((incomeSourceData, i) => {
      if (i === index) {
        return { 
          incomeStreamName: event.target.value, 
          incomeStreamLabel: incomeOptions[event.target.value],
          incomeAmount: 0, 
          incomeFrequency: ''
        }
      } else {
        return incomeSourceData;
      }
    });
    setSelectedMenuItem(updatedSelectedMenuItems);
  }

  const handleTextfieldChange = (event, index) => {
    const { value } = event.target;
    const updatedSelectedMenuItems = selectedMenuItem.map((incomeSourceData, i) => {
      if (i === index) {
        return { ...incomeSourceData, incomeAmount: Math.round(Number(value)) }
      } else {
        return incomeSourceData;
      }
    });
    setSelectedMenuItem(updatedSelectedMenuItems);
  }

  const handleFrequencySelectChange = (event, index) => {
    const { value } = event.target; 
    const updatedSelectedMenuItems = selectedMenuItem.map((incomeSourceData, i) => {
      if (i === index) {
        return { ...incomeSourceData, incomeFrequency: value }
      } else {
        return incomeSourceData;
      }
    });
    setSelectedMenuItem(updatedSelectedMenuItems);
  }

  const createIncomeStreamsDropdownMenu = (incomeStreamName, incomeStreamLabel, index) => {
    return (
      <FormControl sx={{ m: 1, minWidth: 120 }}>
      <InputLabel if='income-type-label'>Income Type</InputLabel>
      <StyledSelectfield
        labelId='income-type-label'
        id={incomeStreamName}
        value={incomeStreamName}
        name={incomeStreamLabel}
        label='Income Type'
        onChange={(event) => { handleSelectChange(event, index) }}>
        {createMenuItems()}
      </StyledSelectfield>
    </FormControl>
    );
  }
  
  const createIncomeAmountTextfield = (incomeStreamName, incomeAmount, index) => {
    return (
      <div className='income-block-textfield'>
        <p className='question-label'>How much do you receive for: {selectedMenuItem[index].incomeStreamLabel}?</p>
        <StyledTextField 
          type='number'
          name={incomeStreamName}
          value={incomeAmount}
          label='Amount'
          onChange={(event) => {handleTextfieldChange(event, index)}}
          variant='outlined'
          required
          error={incomeStreamValueHasError(selectedMenuItem[index].incomeAmount)} 
          helperText={displayIncomeStreamValueHelperText(selectedMenuItem[index].incomeAmount)} 
        />
      </div>
    );
  }

  const createIncomeStreamFrequencyDropdownMenu = (incomeFrequency, index) => {
    return (
      <div className='bottom-border'>
        <p className='question-label'>How often do you receive this income: {selectedMenuItem[index].incomeStreamLabel}?</p>
        <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel if='income-frequency-label'>Frequency</InputLabel>
        <StyledSelectfield
          labelId='income-frequency-label'
          id='income-frequency'
          value={incomeFrequency}
          name={incomeFrequency}
          label='Income Frequency'
          onChange={(event) => { handleFrequencySelectChange(event, index) }}>
          {createFrequencyMenuItems()}
        </StyledSelectfield>
        </FormControl>
      </div>
    );
  }

  const createIncomeBlockQuestions = () => {
    return selectedMenuItem.map((incomeSourceData, index) => {
      const { incomeStreamName, incomeStreamLabel, incomeAmount, incomeFrequency } = incomeSourceData;
      const incomeStreamQuestion = <p className='question-label'>If you receive another type of income, select it below.</p>;
      return (
        <div key={index}>
          {index > 0 &&
            <div className='delete-button-container'>
              <StyledDeleteButton variant='contained' onClick={() => deleteIncomeBlock(index)}>x</StyledDeleteButton>
            </div>
          }
          {index > 0 && incomeStreamQuestion}
          {createIncomeStreamsDropdownMenu(incomeStreamName, incomeStreamLabel, index)}
          {createIncomeAmountTextfield(incomeStreamName, incomeAmount, index)}
          {createIncomeStreamFrequencyDropdownMenu(incomeFrequency, index)}
        </div>
      );
    });
  }

  const deleteIncomeBlock = (selectedIndex) => {
    const updatedSelectedMenuItems = selectedMenuItem.filter((incomeSourceData, index) => index !== selectedIndex );
    setSelectedMenuItem(updatedSelectedMenuItems);  
  }
  
  const handleAddAdditionalIncomeSource = (event) => {
    event.preventDefault();
    setSelectedMenuItem([
      ...selectedMenuItem,
      {
        incomeStreamName: '', 
        incomeStreamLabel: '', 
        incomeAmount: 0,
        incomeFrequency: ''
      }
    ]);
  }

  const handleSaveAndContinue = (event) => {
     event.preventDefault();
     if(incomeStreamsAreValid(selectedMenuItem)) {
       handleIncomeStreamsSubmit(selectedMenuItem);
    }
  }

  return (
    <>
      {createIncomeBlockQuestions()}
      <Button
        variant='contained'
        onClick={(event) => handleAddAdditionalIncomeSource(event)}
      >
        Add additional income source
      </Button>
      <div className='income-block-question-buttons'>
        <PreviousButton 
          page={page} 
          setPage={setPage} />
         <Button
          variant='contained'
          onClick={(event) => { handleSaveAndContinue(event) }}
          >
          Save and Continue
        </Button>
      </div>
    </>
  );

}

export default IncomeBlock;