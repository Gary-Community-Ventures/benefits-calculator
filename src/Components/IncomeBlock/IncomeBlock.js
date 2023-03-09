import { FormControl, Select, MenuItem, InputLabel, TextField, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import PreviousButton from '../PreviousButton/PreviousButton';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import {
	hoursWorkedValueHasError,
  incomeStreamValueHasError,
	displayIncomeStreamValueHelperText,
	incomeStreamsAreValid,
} from '../../Assets/validationFunctions';
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

const IncomeBlock = ({ handleIncomeStreamsSubmit, formData }) => {
  const { id } = useParams();
  const stepNumberId = Number(id);

  //if there are any elements in state for incomeStreams create IncomeBlock components for those 
  //first by assigning them to the initial selectedMenuItem state
  //if not then create the initial income block questions
  const [selectedMenuItem, setSelectedMenuItem] = useState(formData.incomeStreams.length > 0 ? formData.incomeStreams :
  [
    {
      incomeStreamName: '', 
      incomeAmount: '',
      incomeFrequency: '',
      hoursPerWeek: ''
    }
  ]);

  const getIncomeStreamNameLabel = (incomeStreamName) => {
    return incomeOptions[incomeStreamName];
  };

  const createIncomeStreamsMenuItems = () => {
    const disabledSelectMenuItem = 
      <MenuItem value='select' key='disabled-select-value' disabled>
        <FormattedMessage 
          id='incomeBlock.createMenuItems-disabledSelectMenuItemText' 
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
          id='incomeBlock.createFrequencyMenuItems-disabledSelectMenuItemText' 
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
          incomeAmount: '',
          incomeFrequency: '',
          hoursPerWeek: ''
        }
      } else {
        return incomeSourceData;
      }
    });
    
    setSelectedMenuItem(updatedSelectedMenuItems);
  }

  const handleIncomeTextfieldChange = (event, index) => {
		const { value } = event.target;
		// Income amount can be up to 8 digits long with 2 decimal places. Can not start with a decimal
		const incomeAmountRegex = /^\d{0,8}(?:(?<=\d)\d\.\d{0,2})?$/;

		if (incomeAmountRegex.test(value)) {
			const updatedSelectedMenuItems = selectedMenuItem.map(
				(incomeSourceData, i) => {
					if (i === index) {
						return { ...incomeSourceData, incomeAmount: value };
					} else {
						return incomeSourceData;
					}
				}
			);

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
            id='incomeBlock.createIncomeStreamsDropdownMenu-incomeTypeInputLabel' 
            defaultMessage='Income Type' />
        </InputLabel>
        <StyledSelectfield
          labelId='income-type-label'
          id={incomeStreamName}
          value={incomeStreamName}
          label={
            <FormattedMessage 
            id='incomeBlock.createIncomeStreamsDropdownMenu-incomeTypeSelectLabel' 
            defaultMessage='Income Type' />
          }
          onChange={(event) => { handleIncomeStreamsSelectChange(event, index) }}>
          {createIncomeStreamsMenuItems()}
        </StyledSelectfield>
      </FormControl>
    );
  }
  
  const createIncomeAmountTextfield = (incomeStreamName, incomeAmount, index) => {
    let questionHeader;
    if (selectedMenuItem[index].incomeFrequency === 'hourly') {
			questionHeader = (
				<FormattedMessage
					id="incomeBlock.createIncomeAmountTextfield-hourly-questionLabel"
					defaultMessage="What is your hourly rate: "
				/>
			);
		} else {
			questionHeader = (
				<FormattedMessage
					id="incomeBlock.createIncomeAmountTextfield-questionLabel"
					defaultMessage="How much do you receive each pay period for: "
				/>
			);
		}
    return (
      <div className='bottom-border'>
        <p className='question-label'>
          {questionHeader}
          {getIncomeStreamNameLabel(selectedMenuItem[index].incomeStreamName)}?
        </p>
        <div className='income-block-textfield'>
          <StyledTextField
            type='text'
            name={incomeStreamName}
            value={incomeAmount}
            label={
              <FormattedMessage 
                id='incomeBlock.createIncomeAmountTextfield-amountLabel' 
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

  const createHoursWorkedTextField = (incomeStreamName, hoursWorked, index) => {
    const hoursWorkedChange = (event, index) => {
			const { value } = event.target;
			const numberUpToEightDigitsLongRegex = /^\d{0,3}$/;

			if (numberUpToEightDigitsLongRegex.test(value)) {
				const updatedSelectedMenuItems = selectedMenuItem.map(
					(incomeSourceData, i) => {
						if (i === index) {
							return { ...incomeSourceData, hoursPerWeek: value };
						} else {
							return incomeSourceData;
						}
					}
				);

				setSelectedMenuItem(updatedSelectedMenuItems);
			}
		};
		return (
			<>
				<p className="question-label">
					<FormattedMessage
						id="incomeBlock.createHoursWorkedTextfield-questionLabel"
						defaultMessage="How many hours do you work per week: "
					/>
					{getIncomeStreamNameLabel(selectedMenuItem[index].incomeStreamName)}?
				</p>
				<div className="income-block-textfield">
					<StyledTextField
						type="text"
						value={hoursWorked}
						label={
							<FormattedMessage
								id="incomeBlock.createHoursWorkedTextfield-amountLabel"
								defaultMessage="Hours"
							/>
						}
						onChange={(event) => {
							hoursWorkedChange(event, index);
						}}
						variant="outlined"
						required
						error={hoursWorkedValueHasError(hoursWorked)}
						helperText={displayIncomeStreamValueHelperText(hoursWorked)}
					/>
				</div>
			</>
		);
	};

  const createIncomeStreamFrequencyDropdownMenu = (incomeFrequency, index) => {
    return (
      <div>
        <p className='question-label'>
          <FormattedMessage 
            id='incomeBlock.createIncomeStreamFrequencyDropdownMenu-questionLabel' 
            defaultMessage='How often do you receive this income: ' /> 
          {getIncomeStreamNameLabel(selectedMenuItem[index].incomeStreamName)}?
        </p>
        <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel if='income-frequency-label'>
          <FormattedMessage 
            id='incomeBlock.createIncomeStreamFrequencyDropdownMenu-incomeFrequencyLabel' 
            defaultMessage='Frequency' />
        </InputLabel>
        <StyledSelectfield
          labelId='income-frequency-label'
          id='income-frequency'
          value={incomeFrequency}
          label={
            <FormattedMessage 
              id='incomeBlock.createIncomeStreamFrequencyDropdownMenu-incomeFrequencySelectLabel' 
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
      const { incomeStreamName, incomeAmount, incomeFrequency, hoursPerWeek } =
				incomeSourceData;
      const incomeStreamQuestion = 
        <p className='question-label'>
          <FormattedMessage 
            id='incomeBlock.createIncomeBlockQuestions-questionLabel' 
            defaultMessage='If you receive another type of income, select it below.' />
        </p>;
      return (
				<div key={index}>
					{index > 0 && (
						<div className="delete-button-container">
							<StyledDeleteButton
								variant="contained"
								onClick={() => deleteIncomeBlock(index)}
							>
								x
							</StyledDeleteButton>
						</div>
					)}
					{index > 0 && incomeStreamQuestion}
					{createIncomeStreamsDropdownMenu(incomeStreamName, index)}
					{createIncomeStreamFrequencyDropdownMenu(incomeFrequency, index)}
					{incomeFrequency === 'hourly' &&
						createHoursWorkedTextField(incomeStreamName, hoursPerWeek, index)
          }
					{createIncomeAmountTextfield(incomeStreamName, incomeAmount, index)}
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
        incomeAmount: 0,
        incomeFrequency: '',
        hoursPerWeek: ''
      }
    ]);
  }

  const handleSaveAndContinue = (event) => {
     event.preventDefault();
   
     if(incomeStreamsAreValid(selectedMenuItem)) {
      const incomes = selectedMenuItem.map((income) => {
        return { ...income, incomeAmount: Number(income.incomeAmount), hoursPerWeek: Number(income.hoursPerWeek) };
      })
      //need to pass the id obtained from useParams in this component to the handler s.t. it can navigate to the next step
      handleIncomeStreamsSubmit(incomes, stepNumberId); 
    }
  }

  return (
    <>
      { createIncomeBlockQuestions() }
      { !incomeStreamsAreValid(selectedMenuItem) && 
        <ErrorMessage 
          error={ 
            <FormattedMessage 
              id='incomeBlock.return-error-message' 
              defaultMessage='Please select and enter a response for all three fields' />
          } 
        />
      }
      <Button
        variant='contained'
        onClick={(event) => handleAddAdditionalIncomeSource(event)} >
          <FormattedMessage 
            id='incomeBlock.return-addIncomeButton' 
            defaultMessage='Add another income' />
      </Button>
      <div className='prev-save-continue-buttons'>
        <PreviousButton />
        <Button
          variant='contained'
          onClick={(event) => { handleSaveAndContinue(event) }} >
          <FormattedMessage 
            id='continueButton'
            defaultMessage='Continue' />
        </Button>
      </div>
    </>
  );
}

export default IncomeBlock;