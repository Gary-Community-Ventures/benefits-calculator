import { useConfig } from '../Config/configHook.tsx';
import { FormattedMessage } from 'react-intl';
import { FormControl, Select, MenuItem, InputLabel, Button, FormHelperText } from '@mui/material';
import { styled } from '@mui/material/styles';
import {
  useErrorController,
  expenseSourceValueHasError,
  displayExpenseSourceValueHelperText,
  selectHasError,
  expenseTypeHelperText,
} from '../../Assets/validationFunctions.tsx';
import { useEffect } from 'react';
import Textfield from '../Textfield/Textfield';
import QuestionQuestion from '../QuestionComponents/QuestionQuestion';
import CloseButton from '../CloseButton/CloseButton.tsx';
import './ExpenseBlock.css';

const StyledSelectfield = styled(Select)({
  minWidth: 200,
  maxWidth: '100%',
  backgroundColor: 'white',
});

const ExpenseQuestion = ({ expenseData, allExpensesData, setAllExpenses, deleteExpenseBlock, index, submitted }) => {
  const expenseTypeErrorController = useErrorController(selectHasError, expenseTypeHelperText);

  const expenseOptions = useConfig('expense_options');

  useEffect(() => {
    expenseTypeErrorController.updateError(expenseSourceName);
  }, []);

  useEffect(() => {
    expenseTypeErrorController.setSubmittedCount(submitted);
  }, [submitted]);

  const handleSelectChange = (event, index) => {
    const updatedSelectedMenuItems = allExpensesData.map((expenseSourceData, i) => {
      if (i === index) {
        return {
          ...expenseSourceData,
          expenseSourceName: event.target.value,
        };
      } else {
        return expenseSourceData;
      }
    });

    expenseTypeErrorController.updateError(event.target.value);

    setAllExpenses(updatedSelectedMenuItems);
  };

  const handleExpenseTextfieldChange = (event, index) => {
    const { value } = event.target;
    const numberUpToEightDigitsLongRegex = /^\d{0,8}$/;

    if (numberUpToEightDigitsLongRegex.test(value)) {
      const updatedSelectedMenuItems = allExpensesData.map((expenseSourceData, i) => {
        if (i === index) {
          return { ...expenseSourceData, expenseAmount: Math.round(Number(value)) };
        } else {
          return expenseSourceData;
        }
      });

      setAllExpenses(updatedSelectedMenuItems);
    }
  };

  const createExpenseMenuItems = () => {
    const disabledSelectMenuItem = (
      <MenuItem value="select" key="disabled-select-value" disabled>
        <FormattedMessage id="expenseBlock.createExpenseMenuItems-disabledSelectMenuItemText" defaultMessage="Select" />
      </MenuItem>
    );

    const menuItemKeys = Object.keys(expenseOptions);
    const menuItemLabels = Object.values(expenseOptions);

    const menuItems = menuItemKeys.map((menuItemKey, i) => {
      return (
        <MenuItem value={menuItemKey} key={menuItemKey}>
          {menuItemLabels[i]}
        </MenuItem>
      );
    });

    return [disabledSelectMenuItem, menuItems];
  };

  const getExpenseSourceLabel = (expenseSourceName) => {
    if (expenseSourceName) {
      return (
        <>
          {' ('}
          {expenseOptions[expenseSourceName]}
          {')'}?
        </>
      );
    }

    return '?';
  };

  const textfieldProps = {
    inputType: 'text',
    inputLabel: <FormattedMessage id="expenseBlock.createExpenseAmountTextfield-amountLabel" defaultMessage="Amount" />,
    inputName: 'expenseAmount',
    inputError: expenseSourceValueHasError,
    inputHelperText: displayExpenseSourceValueHelperText,
    dollarField: true,
    numericField: true,
  };

  const createExpenseAmountTextfield = (expenseSourceName, expenseAmount, index) => {
    return (
      <div>
        <div className="expense-margin-bottom">
          <QuestionQuestion>
            <FormattedMessage
              id="expenseBlock.createExpenseAmountTextfield-questionLabel"
              defaultMessage="How much is this expense every month "
            />
            {getExpenseSourceLabel(allExpensesData[index].expenseSourceName)}
          </QuestionQuestion>
        </div>
        <div className="expense-block-textfield">
          <Textfield
            componentDetails={textfieldProps}
            data={expenseData}
            handleTextfieldChange={handleExpenseTextfieldChange}
            index={index}
            submitted={submitted}
          />
        </div>
      </div>
    );
  };

  const createExpenseDropdownMenu = (expenseSourceName, index) => {
    return (
      <FormControl sx={{ m: 1, minWidth: 120, maxWidth: '100%' }} error={expenseTypeErrorController.showError}>
        <InputLabel id="expense-type-label">
          <FormattedMessage
            id="expenseBlock.createExpenseDropdownMenu-expenseTypeInputLabel"
            defaultMessage="Expense Type"
          />
        </InputLabel>
        <StyledSelectfield
          labelId="expense-type-label"
          id={expenseSourceName}
          value={expenseSourceName}
          label={
            <FormattedMessage
              id="expenseBlock.createExpenseDropdownMenu-expenseTypeSelectLabel"
              defaultMessage="Expense Type"
            />
          }
          onChange={(event) => {
            handleSelectChange(event, index);
          }}
        >
          {createExpenseMenuItems()}
        </StyledSelectfield>
        {expenseTypeErrorController.showError && (
          <FormHelperText>{expenseTypeErrorController.message()}</FormHelperText>
        )}
      </FormControl>
    );
  };

  const { expenseSourceName, expenseAmount } = expenseData;

  const expenseSourceQuestion = (
    <QuestionQuestion>
      <FormattedMessage
        id="expenseBlock.createExpenseBlockQuestions-questionLabel"
        defaultMessage="If you have another expense, select it below."
      />
    </QuestionQuestion>
  );

  if (index === 0) {
    return (
      <div key={index}>
        {createExpenseDropdownMenu(expenseSourceName, index)}
        {createExpenseAmountTextfield(expenseSourceName, expenseAmount, index)}
      </div>
    );
  } else {
    return (
      <div key={index}>
        <div className="delete-button-container">
          <CloseButton handleClose={() => deleteExpenseBlock(index)} />
        </div>
        {expenseSourceQuestion}
        {createExpenseDropdownMenu(expenseSourceName, index)}
        {createExpenseAmountTextfield(expenseSourceName, expenseAmount, index)}
      </div>
    );
  }
};

export default ExpenseQuestion;
