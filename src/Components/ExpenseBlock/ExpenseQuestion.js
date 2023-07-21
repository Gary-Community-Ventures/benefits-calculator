import { FormattedMessage } from 'react-intl';
import { FormControl, Select, MenuItem, InputLabel, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import expenseOptions from '../../Assets/expenseOptions';
import {
  useErrorController,
  expenseSourceValueHasError,
  displayExpenseSourceValueHelperText,
} from '../../Assets/validationFunctions';
import { useEffect } from 'react';
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
  fontSize: '1.25rem',
});

const ExpenseQuestion = ({ expenseData, allExpensesData, setAllExpenses, deleteExpenseBlock, index, submitted }) => {
  const amountErrorController = useErrorController(expenseSourceValueHasError, displayExpenseSourceValueHelperText);

  useEffect(() => {
    amountErrorController.setIsSubmitted(submitted);
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
    return expenseOptions[expenseSourceName];
  };

  const textfieldProps = {
    inputType: 'text',
    inputLabel: <FormattedMessage id="expenseBlock.createExpenseAmountTextfield-amountLabel" defaultMessage="Amount" />,
    inputName: 'expenseAmount',
  };

  const createExpenseAmountTextfield = (expenseSourceName, expenseAmount, index) => {
    return (
      <div className="bottom-border">
        <p className="question-label">
          <FormattedMessage
            id="expenseBlock.createExpenseAmountTextfield-questionLabel"
            defaultMessage="How much is this type of expense: "
          />
          {getExpenseSourceLabel(allExpensesData[index].expenseSourceName)}?
        </p>
        <div className="expense-block-textfield">
          <Textfield
            componentDetails={textfieldProps}
            data={expenseData}
            handleTextfieldChange={handleExpenseTextfieldChange}
            index={index}
            errorController={amountErrorController}
          />
        </div>
      </div>
    );
  };

  const createExpenseDropdownMenu = (expenseSourceName, index) => {
    return (
      <FormControl sx={{ m: 1, minWidth: 120 }}>
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
      </FormControl>
    );
  };

  const { expenseSourceName, expenseAmount } = expenseData;

  const expenseSourceQuestion = (
    <p className="question-label">
      <FormattedMessage
        id="expenseBlock.createExpenseBlockQuestions-questionLabel"
        defaultMessage="If you have another expense, select it below."
      />
    </p>
  );

  return (
    <div key={index}>
      {index > 0 && (
        <div className="delete-button-container">
          <StyledDeleteButton className="delete-button" onClick={() => deleteExpenseBlock(index)} variant="contained">
            &#215;
          </StyledDeleteButton>
        </div>
      )}
      {index > 0 && expenseSourceQuestion}
      {createExpenseDropdownMenu(expenseSourceName, index)}
      {createExpenseAmountTextfield(expenseSourceName, expenseAmount, index)}
    </div>
  );
};

export default ExpenseQuestion;
