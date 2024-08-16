import { useEffect } from 'react';
import { useConfig } from '../Config/configHook.tsx';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';
import { FormControl, Select, MenuItem, InputLabel, FormHelperText } from '@mui/material';
import {
  useErrorController,
  hoursWorkedValueHasError,
  hoursWorkedHelperText,
  incomeStreamValueHasError,
  displayIncomeStreamValueHelperText,
  selectHasError,
  incomeStreamHelperText,
  incomeFrequencyHelperText,
} from '../../Assets/validationFunctions.tsx';
import Textfield from '../Textfield/Textfield';
import HelpButton from '../HelpBubbleIcon/HelpButton.tsx';
import QuestionQuestion from '../QuestionComponents/QuestionQuestion';
import CloseButton from '../CloseButton/CloseButton.tsx';

const StyledSelectfield = styled(Select)({
  minWidth: 200,
  maxWidth: '100%',
  backgroundColor: '#FFFFFF',
});

const IncomeQuestion = ({
  currentIncomeSource,
  allIncomeSources,
  setAllIncomeSources,
  memberData,
  setMemberData,
  index,
  page,
  submitted,
}) => {
  const hoursErrorController = useErrorController(hoursWorkedValueHasError, displayIncomeStreamValueHelperText);
  const amountErrorController = useErrorController(incomeStreamValueHasError, displayIncomeStreamValueHelperText);
  const incomeStreamErrorController = useErrorController(selectHasError, incomeStreamHelperText);
  const incomeFrequencyErrorController = useErrorController(selectHasError, incomeFrequencyHelperText);

  const frequencyOptions = useConfig('frequency_options');
  const incomeOptions = useConfig('income_options');

  useEffect(() => {
    hoursErrorController.setSubmittedCount(submitted);
    amountErrorController.setSubmittedCount(submitted);
    incomeStreamErrorController.setSubmittedCount(submitted);
    incomeFrequencyErrorController.setSubmittedCount(submitted);
  }, [submitted]);

  useEffect(() => {
    incomeStreamErrorController.updateError(incomeStreamName);
    incomeFrequencyErrorController.updateError(incomeFrequency);
  });

  const getIncomeStreamNameLabel = (incomeStreamName) => {
    if (incomeStreamName) {
      return (
        <>
          {'('}
          {incomeOptions[incomeStreamName]}
          {')'}?
        </>
      );
    }

    return '?';
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
      <FormControl sx={{ minWidth: 120, maxWidth: '100%' }} error={incomeStreamErrorController.showError}>
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
        {incomeStreamErrorController.showError && (
          <FormHelperText>{incomeStreamErrorController.message()}</FormHelperText>
        )}
      </FormControl>
    );
  };

  const createHoursWorkedTextField = (incomeStreamName, hoursWorked, index) => {
    let formattedMsgId = 'personIncomeBlock.createHoursWorkedTextfield-youQLabel';
    let formattedMsgDefaultMsg = 'How many hours do you work per week ';

    if (page !== 1) {
      formattedMsgId = 'personIncomeBlock.createHoursWorkedTextfield-questionLabel';
      formattedMsgDefaultMsg = 'How many hours do they work per week ';
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
      inputError: hoursWorkedValueHasError,
      inputHelperText: hoursWorkedHelperText,
      numericField: true,
    };

    return (
      <>
        <div className='margin-bottom'>
          <QuestionQuestion>
            <FormattedMessage id={formattedMsgId} defaultMessage={formattedMsgDefaultMsg} />
            {getIncomeStreamNameLabel(allIncomeSources[index].incomeStreamName)}
          </QuestionQuestion>
        </div>
        <div>
          <Textfield
            componentDetails={textfieldProps}
            data={currentIncomeSource}
            handleTextfieldChange={hoursWorkedChange}
            index={index}
            submitted={hoursErrorController.submittedCount}
          />
        </div>
      </>
    );
  };

  const createIncomeAmountTextfield = (incomeStreamName, incomeAmount, index) => {
    let questionHeader;

    if (allIncomeSources[index].incomeFrequency === 'hourly') {
      let hourlyFormattedMsgId = 'incomeBlock.createIncomeAmountTextfield-hourly-questionLabel';
      let hourlyFormattedMsgDefaultMsg = 'What is your hourly rate ';

      if (page !== 1) {
        hourlyFormattedMsgId = 'personIncomeBlock.createIncomeAmountTextfield-hourly-questionLabel';
        hourlyFormattedMsgDefaultMsg = 'What is their hourly rate ';
      }

      questionHeader = <FormattedMessage id={hourlyFormattedMsgId} defaultMessage={hourlyFormattedMsgDefaultMsg} />;
    } else {
      let payPeriodFormattedMsgId = 'incomeBlock.createIncomeAmountTextfield-questionLabel';
      let payPeriodFormattedMsgDefaultMsg = 'How much do you receive before taxes each pay period for ';

      if (page !== 1) {
        payPeriodFormattedMsgId = 'personIncomeBlock.createIncomeAmountTextfield-questionLabel';
        payPeriodFormattedMsgDefaultMsg = 'How much do they receive before taxes each pay period for ';
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
      inputError: incomeStreamValueHasError,
      inputHelperText: displayIncomeStreamValueHelperText,
      dollarField: true,
      numericField: true,
    };

    return (
      <div>
        <div className='margin-bottom'>
        <QuestionQuestion>
          {questionHeader}
          {getIncomeStreamNameLabel(allIncomeSources[index].incomeStreamName)}
        </QuestionQuestion>
        </div>
          <Textfield
            componentDetails={textfieldProps}
            data={currentIncomeSource}
            handleTextfieldChange={handleIncomeTextfieldChange}
            index={index}
            submitted={amountErrorController.submittedCount}
            numericField={true}
          />
      </div>
    );
  };

  const createIncomeStreamFrequencyDropdownMenu = (incomeFrequency, index) => {
    let formattedMsgId = 'personIncomeBlock.createIncomeStreamFrequencyDropdownMenu-youQLabel';
    let formattedMsgDefaultMsg = 'How often are you paid this income ';
    if (page !== 1) {
      formattedMsgId = 'personIncomeBlock.createIncomeStreamFrequencyDropdownMenu-questionLabel';
      formattedMsgDefaultMsg = 'How often are they paid this income ';
    }

    return (
      <div>
        <QuestionQuestion>
          <FormattedMessage id={formattedMsgId} defaultMessage={formattedMsgDefaultMsg} />
          {getIncomeStreamNameLabel(allIncomeSources[index].incomeStreamName)}
          <HelpButton
            helpText='"Every 2 weeks" means you get paid every other week. "Twice a month" means you get paid two times a month on the same dates each month.'
            helpId="personIncomeBlock.income-freq-help-text"
          />
        </QuestionQuestion>
        <FormControl error={incomeFrequencyErrorController.showError}>
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
                id="personIncomeBlock.createIncomeStreamFrequencyDropdownMenu-freqLabel"
                defaultMessage="Frequency"
              />
            }
            onChange={(event) => {
              handleFrequencySelectChange(event, index);
            }}
          >
            {createFrequencyMenuItems()}
          </StyledSelectfield>
          {incomeFrequencyErrorController.showError && (
            <FormHelperText>{incomeFrequencyErrorController.message()}</FormHelperText>
          )}
        </FormControl>
      </div>
    );
  };

  const deleteIncomeBlock = (selectedIndex) => {
    const updatedSelectedMenuItems = allIncomeSources.filter((incomeSourceData, index) => index !== selectedIndex);
    setAllIncomeSources(updatedSelectedMenuItems);

    setMemberData({
      ...memberData,
      incomeStreams: updatedSelectedMenuItems,
    });
  };

  const { incomeStreamName, incomeAmount, incomeFrequency, hoursPerWeek } = currentIncomeSource;

  let formattedMsgId = 'incomeBlock.createIncomeBlockQuestions-questionLabel';
  let formattedMsgDefaultMsg = 'If you receive another type of income, select it below.';

  if (page !== 1) {
    formattedMsgId = 'personIncomeBlock.createIncomeBlockQuestions-questionLabel';
    formattedMsgDefaultMsg = 'If they receive another type of income, select it below.';
  }

  const incomeStreamQuestion = (
    <div className='margin-bottom'>
      <QuestionQuestion>
        <span className="income-stream-q-padding">
          <FormattedMessage id={formattedMsgId} defaultMessage={formattedMsgDefaultMsg} />
        </span>
      </QuestionQuestion>
    </div>
  );

  if (index === 0) {
    return (
      <div key={index} className="section-container bottom-padding-margin">
        <div className="section">
          {createIncomeStreamsDropdownMenu(incomeStreamName, index)}
          {createIncomeStreamFrequencyDropdownMenu(incomeFrequency, index)}
          {incomeFrequency === 'hourly' && createHoursWorkedTextField(incomeStreamName, hoursPerWeek, index)}
          {createIncomeAmountTextfield(incomeStreamName, incomeAmount, index)}
        </div>
      </div>
    );
  } else {
    return (
      <div className="section-container bottom-padding-margin">
        <div key={index} className={index % 2 === 0 ? 'section' : ''}>
          <div className="delete-button-container">
            <CloseButton handleClose={() => deleteIncomeBlock(index)} />
          </div>
          <div>
            {incomeStreamQuestion}
            {createIncomeStreamsDropdownMenu(incomeStreamName, index)}
            {createIncomeStreamFrequencyDropdownMenu(incomeFrequency, index)}
            {incomeFrequency === 'hourly' && createHoursWorkedTextField(incomeStreamName, hoursPerWeek, index)}
            {createIncomeAmountTextfield(incomeStreamName, incomeAmount, index)}
          </div>
        </div>
      </div>
    );
  }
};

export default IncomeQuestion;
