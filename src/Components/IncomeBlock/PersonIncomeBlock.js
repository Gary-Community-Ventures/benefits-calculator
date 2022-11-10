import { FormattedMessage } from 'react-intl';
import { FormControl, Select, MenuItem, InputLabel, TextField, Button } from "@mui/material";
import { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import { incomeStreamValueHasError, displayIncomeStreamValueHelperText, incomeStreamsAreValid } from '../../Assets/validationFunctions';
import incomeOptions from '../../Assets/incomeOptions';
import frequencyOptions from '../../Assets/frequencyOptions';
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

const PersonIncomeBlock = ({ personData, state, setState, personDataIndex }) => {
  //if there are any elements in state for incomeStreams create IncomeBlock components for those 
  //first by assigning them to the initial selectedMenuItem state
  //if not then create the initial income block questions
  const [selectedMenuItem, setSelectedMenuItem] = useState(personData.incomeStreams.length > 0 ? personData.incomeStreams :
  [
    {
      incomeStreamName: '', 
      incomeAmount: '',
      incomeFrequency: ''    
    }
  ]);

  const getIncomeStreamNameLabel = (incomeStreamName) => {
    return incomeOptions[incomeStreamName];
  }

  useEffect(() => {
    let updatedSelectedMenuItem = [ ...selectedMenuItem ];
    if (incomeStreamsAreValid(updatedSelectedMenuItem)) {
      const updatedHouseholdData = state.householdData.map((personData, i) => {
        if (i === personDataIndex) {
          return {
            ...personData,
            incomeStreams: updatedSelectedMenuItem
          };
        } else {
          return personData;
        }
      });

      setState({...state, householdData: updatedHouseholdData});
    }
  }, [selectedMenuItem]);

  const createIncomeStreamsMenuItems = () => {
    const disabledSelectMenuItem = 
      <MenuItem value='select' key='disabled-select-value' disabled>
        <FormattedMessage 
        id='personIncomeBlock.createMenuItems-disabledSelectMenuItem' 
        defaultMessage='Select' />
      </MenuItem>;

    const menuItemKeys = Object.keys(incomeOptions);
    const menuItemLabels = Object.values(incomeOptions);

    const menuItems = menuItemKeys.map((menuItemKey, i) => {
      return (
        <MenuItem value={menuItemKey} key={menuItemKey}>{menuItemLabels[i]}</MenuItem>
      );
    });

    return [disabledSelectMenuItem, menuItems];
  }

  const createFrequencyMenuItems = () => {
    const disabledSelectMenuItem = 
      <MenuItem value='select' key='disabled-frequency-select-value' disabled>
        <FormattedMessage 
          id='personIncomeBlock.createFrequencyMenuItems-disabledSelectMenuItem' 
          defaultMessage='Select' />
      </MenuItem>;

    const menuItemKeys = Object.keys(frequencyOptions);
    const menuItemLabels = Object.values(frequencyOptions);

    const menuItems = menuItemKeys.map((menuItemKey, i) => {
      return (
        <MenuItem value={menuItemKey} key={menuItemKey}>{menuItemLabels[i]}</MenuItem>
      );
    });

    return [disabledSelectMenuItem, menuItems];
  }
  
  const handleIncomeStreamsSelectChange = (event, index) => {
    const updatedSelectedMenuItems = selectedMenuItem.map((incomeSourceData, i) => {
      if (i === index) {
        return { 
          incomeStreamName: event.target.value, 
          incomeAmount: 0, 
          incomeFrequency: ''
        }
      } else {
        return incomeSourceData;
      }
    });
    
    setSelectedMenuItem(updatedSelectedMenuItems);
  }

  const handleIncomeTextfieldChange = (event, index) => {
    const { value } = event.target;
    const numberUpToEightDigitsLongRegex = /^\d{0,8}$/;

    if (numberUpToEightDigitsLongRegex.test(value)) {
      const updatedSelectedMenuItems = selectedMenuItem.map((incomeSourceData, i) => {
        if (i === index) {
          return { ...incomeSourceData, incomeAmount: Math.round(Number(value)) }
        } else {
          return incomeSourceData;
        }
      });
      
      setSelectedMenuItem(updatedSelectedMenuItems);
    }
  }

  const handleFrequencySelectChange = (event, index) => {
    const { value } = event.target; 
    const updatedSelectedMenuItems = selectedMenuItem.map((incomeSourceData, i) => {
      if (i === index) {
        return { 
          ...incomeSourceData, 
          incomeFrequency: value        
        }
      } else {
        return incomeSourceData;
      }
    });
    
    setSelectedMenuItem(updatedSelectedMenuItems);
  }

  const createIncomeStreamsDropdownMenu = (incomeStreamName, index) => {
    return (
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel if='income-type-label'>
          <FormattedMessage 
            id='personIncomeBlock.createIncomeStreamsDropdownMenu-inputLabel' 
            defaultMessage='Income Type' />
        </InputLabel>
        <StyledSelectfield
          labelId='income-type-label'
          id={incomeStreamName}
          value={incomeStreamName}
          label={
            <FormattedMessage 
            id='personIncomeBlock.createIncomeStreamsDropdownMenu-inputLabel' 
            defaultMessage='Income Type' />
          }
          onChange={(event) => { handleIncomeStreamsSelectChange(event, index) }}>
          {createIncomeStreamsMenuItems()}
        </StyledSelectfield>
      </FormControl>
    );
  }
  
  const createIncomeAmountTextfield = (incomeStreamName, incomeAmount, index) => {
    return (
      <div>
        <p className='question-label'>
          <FormattedMessage 
            id='personIncomeBlock.createIncomeAmountTextfield-questionLabel' 
            defaultMessage='How much do they receive each pay period for this type of income: ' />
          {getIncomeStreamNameLabel(selectedMenuItem[index].incomeStreamName)}?
        </p>
        <div className='income-block-textfield'>
          <StyledTextField 
            type='text'
            name={incomeStreamName}
            value={incomeAmount}
            label={
              <FormattedMessage 
                id='personIncomeBlock.createIncomeAmountTextfield-amountLabel' 
                defaultMessage='Amount' />
            }
            onChange={(event) => {handleIncomeTextfieldChange(event, index)}}
            variant='outlined'
            required
            error={incomeStreamValueHasError(selectedMenuItem[index].incomeAmount)} 
            helperText={displayIncomeStreamValueHelperText(selectedMenuItem[index].incomeAmount)} 
            />
        </div>
      </div>
    );
  }

  const createIncomeStreamFrequencyDropdownMenu = (incomeFrequency, index) => {
    return (
      <div>
        <p className='question-label'>
          <FormattedMessage 
            id='personIncomeBlock.createIncomeStreamFrequencyDropdownMenu-questionLabel' 
            defaultMessage='How often do they receive this income: ' />
            {getIncomeStreamNameLabel(selectedMenuItem[index].incomeStreamName)}?
        </p>
        <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel if='income-frequency-label'>
          <FormattedMessage 
            id='personIncomeBlock.createIncomeStreamFrequencyDropdownMenu-freqLabel' 
            defaultMessage='Frequency' />
        </InputLabel>
        <StyledSelectfield
          labelId='income-frequency-label'
          id='income-frequency'
          value={incomeFrequency}
          name={incomeFrequency}
          label={
            <FormattedMessage 
              id='personIncomeBlock.createIncomeStreamFrequencyDropdownMenu-incomeFreqLabel' 
              defaultMessage='Income Frequency' />
          }
          onChange={(event) => { handleFrequencySelectChange(event, index) }}>
          {createFrequencyMenuItems()}
        </StyledSelectfield>
        </FormControl>
      </div>
    );
  }

  const createIncomeBlockQuestions = () => {
    return selectedMenuItem.map((incomeSourceData, index) => {
      const { incomeStreamName, incomeAmount, incomeFrequency } = incomeSourceData;
      const incomeStreamQuestion = 
        <p className='question-label'>
          <FormattedMessage 
            id='personIncomeBlock.createIncomeBlockQuestions-questionLabel' 
            defaultMessage='If they receive another type of income, select it below.' />
        </p>;
      return (
        <div key={index}>
          {index > 0 &&
            <div className='delete-button-container'>
              <StyledDeleteButton variant='contained' onClick={() => deleteIncomeBlock(index)}>x</StyledDeleteButton>
            </div>
          }
          {index > 0 && incomeStreamQuestion}
          {createIncomeStreamsDropdownMenu(incomeStreamName, index)}
          {createIncomeStreamFrequencyDropdownMenu(incomeFrequency, index)}
          {createIncomeAmountTextfield(incomeStreamName, incomeAmount, index)}
        </div>
      );
    });
  }

  const deleteIncomeBlock = (selectedIndex) => {
    const updatedSelectedMenuItems = selectedMenuItem.filter((incomeSourceData, index) => index !== selectedIndex );
    setSelectedMenuItem(updatedSelectedMenuItems);  

    const updatedHouseholdData = state.householdData.map((personData, i) => {
      if (i === personDataIndex) {
        return {
          ...personData,
          incomeStreams: updatedSelectedMenuItems
        };
      } else {
        return personData;
      }
    });

    setState({...state, householdData: updatedHouseholdData});
  }
  
  const handleAddAdditionalIncomeSource = (event) => {
    event.preventDefault();
    setSelectedMenuItem([
      ...selectedMenuItem,
      {
        incomeStreamName: '', 
        incomeStreamLabel: '', 
        incomeAmount: 0,
        incomeFrequency: '',
        incomeFrequencyLabel: ''
      }
    ]);
  }

  return (
    <>
      <p className='question-label radio-question'>
        <FormattedMessage 
          id='personIncomeBlock.return-questionLabel' 
          defaultMessage='What type of income have they had most recently?' />
      </p>
      <p className='question-description'>
        <FormattedMessage 
          id='personIncomeBlock.return-questionDescription' 
          defaultMessage='Answer the best you can. You will be able to include additional types of income. The more you include, the more accurate your results will be.' />
      </p>
      {createIncomeBlockQuestions()}
      <Button
        variant='contained'
        onClick={(event) => handleAddAdditionalIncomeSource(event)} >
          <FormattedMessage 
            id='personIncomeBlock.return-addIncomeButton' 
            defaultMessage='Add another income' />
      </Button>
    </>
  );
}

export default PersonIncomeBlock;