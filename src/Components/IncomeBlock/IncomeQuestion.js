import { useEffect } from 'react';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';
import { FormControl, Select, MenuItem, InputLabel, TextField, Button } from '@mui/material';
import {
  useErrorController,
  hoursWorkedValueHasError,
  incomeStreamValueHasError,
  displayIncomeStreamValueHelperText,
} from '../../Assets/validationFunctions';
import incomeOptions from '../../Assets/incomeOptions';
import frequencyOptions from '../../Assets/frequencyOptions';
import Textfield from '../Textfield/Textfield';

const StyledSelectfield = styled(Select)({
  marginBottom: 20,
  minWidth: 200,
});

const StyledDeleteButton = styled(Button)({
  width: '40px',
  height: '40px',
  minWidth: 0,
  padding: 0,
  fontSize: '20px',
});

const IncomeQuestion = ({
  currentIncomeSource,
  allIncomeSources,
  setAllIncomeSources,
  householdData,
  setHouseholdData,
  index,
  page,
  submitted,
}) => {
  const hoursErrorController = useErrorController(hoursWorkedValueHasError, displayIncomeStreamValueHelperText);
  const amountErrorController = useErrorController(incomeStreamValueHasError, displayIncomeStreamValueHelperText);
  useEffect(() => {
    hoursErrorController.setIsSubmitted(submitted);
    amountErrorController.setIsSubmitted(submitted);
  }, [submitted]);

  const getIncomeStreamNameLabel = (incomeStreamName) => {
    return incomeOptions[incomeStreamName];
  };

  const createIncomeStreamsMenuItems = () => {
    const disabledSelectMenuItem = (
      <MenuItem value="select" key="disabled-select-value" disabled>
        <FormattedMessage id="personIncomeBlock.createMenuItems-disabledSelectMenuItem" defaultMessage="Select" />
      </MenuItem>
    );

    const menuItemKeys = Object.keys(incomeOptions);
    const menuItemLabels = Object.values(incomeOptions);

    const menuItems = menuItemKeys.map((menuItemKey, i) => {
      return (
        <MenuItem value={menuItemKey} key={menuItemKey}>
          {menuItemLabels[i]}
        </MenuItem>
      );
    });

    return [disabledSelectMenuItem, menuItems];
  };

  const createFrequencyMenuItems = () => {
    const disabledSelectMenuItem = (
      <MenuItem value="select" key="disabled-frequency-select-value" disabled>
        <FormattedMessage
          id="personIncomeBlock.createFrequencyMenuItems-disabledSelectMenuItem"
          defaultMessage="Select"
        />
      </MenuItem>
    );

    const menuItemKeys = Object.keys(frequencyOptions);
    const menuItemLabels = Object.values(frequencyOptions);

    const menuItems = menuItemKeys.map((menuItemKey, i) => {
      return (
        <MenuItem value={menuItemKey} key={menuItemKey}>
          {menuItemLabels[i]}
        </MenuItem>
      );
    });

    return [disabledSelectMenuItem, menuItems];
  };

  const handleIncomeStreamsSelectChange = (event, index) => {
    const updatedSelectedMenuItems = allIncomeSources.map((incomeSourceData, i) => {
      if (i === index) {
        return {
          ...incomeSourceData,
          incomeStreamName: event.target.value,
        };
      } else {
        return incomeSourceData;
      }
    });

    setAllIncomeSources(updatedSelectedMenuItems);
  };

  const handleIncomeTextfieldChange = (event, index) => {
    const { value } = event.target;
    // Income amount can be up to 8 digits long with 2 decimal places. Can not start with a decimal
    const incomeAmountRegex = /^\d{0,7}(?:\d\.\d{0,2})?$/;

    if (incomeAmountRegex.test(value) || value === '') {
      const updatedSelectedMenuItems = allIncomeSources.map((incomeSourceData, i) => {
        if (i === index) {
          return { ...incomeSourceData, incomeAmount: value };
        } else {
          return incomeSourceData;
        }
      });

      setAllIncomeSources(updatedSelectedMenuItems);
    }
  };

  const handleFrequencySelectChange = (event, index) => {
    const { value } = event.target;
    const updatedSelectedMenuItems = allIncomeSources.map((incomeSourceData, i) => {
      if (i === index) {
        return {
          ...incomeSourceData,
          incomeFrequency: value,
          hoursPerWeek: value === 'hourly' ? incomeSourceData.hoursPerWeek : '',
        };
      } else {
        return incomeSourceData;
      }
    });

    setAllIncomeSources(updatedSelectedMenuItems);
  };

  const createIncomeStreamsDropdownMenu = (incomeStreamName, index) => {
    return (
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="income-type-label">
          <FormattedMessage
            id="personIncomeBlock.createIncomeStreamsDropdownMenu-inputLabel"
            defaultMessage="Income Type"
          />
        </InputLabel>
        <StyledSelectfield
          labelId="income-type-label"
          id={incomeStreamName}
          value={incomeStreamName}
          label={
            <FormattedMessage
              id="personIncomeBlock.createIncomeStreamsDropdownMenu-inputLabel"
              defaultMessage="Income Type"
            />
          }
          onChange={(event) => {
            handleIncomeStreamsSelectChange(event, index);
          }}
        >
          {createIncomeStreamsMenuItems()}
        </StyledSelectfield>
      </FormControl>
    );
  };

  const createHoursWorkedTextField = (incomeStreamName, hoursWorked, index) => {
    let formattedMsgId = 'personIncomeBlock.createHoursWorkedTextfield-youQLabel';
    let formattedMsgDefaultMsg = 'How many hours do you work per week: ';

    if (page !== 0) {
      formattedMsgId = 'personIncomeBlock.createHoursWorkedTextfield-questionLabel';
      formattedMsgDefaultMsg = 'How many hours do they work per week: ';
    }

    const hoursWorkedChange = (event, index) => {
      const { value } = event.target;
      const numberUpToEightDigitsLongRegex = /^\d{0,3}$/;

      if (numberUpToEightDigitsLongRegex.test(value)) {
        const updatedSelectedMenuItems = allIncomeSources.map((incomeSourceData, i) => {
          if (i === index) {
            return { ...incomeSourceData, hoursPerWeek: value };
          } else {
            return incomeSourceData;
          }
        });

        setAllIncomeSources(updatedSelectedMenuItems);
      }
    };

    const textfieldProps = {
      inputType: 'text',
      inputLabel: <FormattedMessage id="incomeBlock.createHoursWorkedTextfield-amountLabel" defaultMessage="Hours" />,
      inputName: 'hoursPerWeek',
    };

    return (
      <>
        <h2 className="question-label">
          <FormattedMessage id={formattedMsgId} defaultMessage={formattedMsgDefaultMsg} />
          {getIncomeStreamNameLabel(allIncomeSources[index].incomeStreamName)}?
        </h2>
        <div className="income-block-textfield">
          <Textfield
            componentDetails={textfieldProps}
            data={currentIncomeSource}
            handleTextfieldChange={hoursWorkedChange}
            index={index}
            errorController={hoursErrorController}
          />
        </div>
      </>
    );
  };

  const createIncomeAmountTextfield = (incomeStreamName, incomeAmount, index) => {
    let questionHeader;

    if (allIncomeSources[index].incomeFrequency === 'hourly') {
      let hourlyFormattedMsgId = 'incomeBlock.createIncomeAmountTextfield-hourly-questionLabel';
      let hourlyFormattedMsgDefaultMsg = 'What is your hourly rate: ';

      if (page !== 0) {
        hourlyFormattedMsgId = 'personIncomeBlock.createIncomeAmountTextfield-hourly-questionLabel';
        hourlyFormattedMsgDefaultMsg = 'What is their hourly rate: ';
      }

      questionHeader = <FormattedMessage id={hourlyFormattedMsgId} defaultMessage={hourlyFormattedMsgDefaultMsg} />;
    } else {
      let payPeriodFormattedMsgId = 'incomeBlock.createIncomeAmountTextfield-questionLabel';
      let payPeriodFormattedMsgDefaultMsg = 'How much do you receive each pay period for: ';

      if (page !== 0) {
        payPeriodFormattedMsgId = 'personIncomeBlock.createIncomeAmountTextfield-questionLabel';
        payPeriodFormattedMsgDefaultMsg = 'How much do they receive each pay period for: ';
      }

      questionHeader = (
        <FormattedMessage id={payPeriodFormattedMsgId} defaultMessage={payPeriodFormattedMsgDefaultMsg} />
      );
    }

    const textfieldProps = {
      inputType: 'text',
      inputLabel: (
        <FormattedMessage id="personIncomeBlock.createIncomeAmountTextfield-amountLabel" defaultMessage="Amount" />
      ),
      inputName: 'incomeAmount',
    };

    return (
      <div>
        <h2 className="question-label">
          {questionHeader}
          {getIncomeStreamNameLabel(allIncomeSources[index].incomeStreamName)}?
        </h2>
        <div className="income-block-textfield">
          <Textfield
            componentDetails={textfieldProps}
            data={currentIncomeSource}
            handleTextfieldChange={handleIncomeTextfieldChange}
            index={index}
            errorController={amountErrorController}
          />
        </div>
      </div>
    );
  };

  const createIncomeStreamFrequencyDropdownMenu = (incomeFrequency, index) => {
    let formattedMsgId = 'personIncomeBlock.createIncomeStreamFrequencyDropdownMenu-youQLabel';
    let formattedMsgDefaultMsg = 'How often are you paid this income: ';
    if (page !== 0) {
      formattedMsgId = 'personIncomeBlock.createIncomeStreamFrequencyDropdownMenu-questionLabel';
      formattedMsgDefaultMsg = 'How often are they paid this income: ';
    }

    return (
      <div>
        <h2 className="question-label">
          <FormattedMessage id={formattedMsgId} defaultMessage={formattedMsgDefaultMsg} />
          {getIncomeStreamNameLabel(allIncomeSources[index].incomeStreamName)}?
        </h2>
        <FormControl sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="income-frequency-label">
            <FormattedMessage
              id="personIncomeBlock.createIncomeStreamFrequencyDropdownMenu-freqLabel"
              defaultMessage="Frequency"
            />
          </InputLabel>
          <StyledSelectfield
            labelId="income-frequency-label"
            id="income-frequency"
            value={incomeFrequency}
            name={incomeFrequency}
            label={
              <FormattedMessage
                id="personIncomeBlock.createIncomeStreamFrequencyDropdownMenu-incomeFreqLabel"
                defaultMessage="Income Frequency"
              />
            }
            onChange={(event) => {
              handleFrequencySelectChange(event, index);
            }}
          >
            {createFrequencyMenuItems()}
          </StyledSelectfield>
        </FormControl>
      </div>
    );
  };

  const deleteIncomeBlock = (selectedIndex) => {
    const updatedSelectedMenuItems = allIncomeSources.filter((incomeSourceData, index) => index !== selectedIndex);
    setAllIncomeSources(updatedSelectedMenuItems);

    setHouseholdData({
      ...householdData,
      incomeStreams: updatedSelectedMenuItems,
    });
  };

  const { incomeStreamName, incomeAmount, incomeFrequency, hoursPerWeek } = currentIncomeSource;

  let formattedMsgId = 'incomeBlock.createIncomeBlockQuestions-questionLabel';
  let formattedMsgDefaultMsg = 'If you receive another type of income, select it below.';

  if (page !== 0) {
    formattedMsgId = 'personIncomeBlock.createIncomeBlockQuestions-questionLabel';
    formattedMsgDefaultMsg = 'If they receive another type of income, select it below.';
  }

  const incomeStreamQuestion = (
    <h2 className="question-label">
      <FormattedMessage id={formattedMsgId} defaultMessage={formattedMsgDefaultMsg} />
    </h2>
  );

  return (
    <div key={index}>
      {index > 0 && (
        <div className="delete-button-container">
          <StyledDeleteButton variant="contained" onClick={() => deleteIncomeBlock(index)}>
            &#215;
          </StyledDeleteButton>
        </div>
      )}
      {index > 0 && incomeStreamQuestion}
      {createIncomeStreamsDropdownMenu(incomeStreamName, index)}
      {createIncomeStreamFrequencyDropdownMenu(incomeFrequency, index)}
      {incomeFrequency === 'hourly' && createHoursWorkedTextField(incomeStreamName, hoursPerWeek, index)}
      {createIncomeAmountTextfield(incomeStreamName, incomeAmount, index)}
    </div>
  );
};

export default IncomeQuestion;