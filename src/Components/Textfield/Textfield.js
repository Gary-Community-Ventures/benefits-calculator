import { useRef, useEffect } from 'react';
import { TextField, InputAdornment } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useErrorController } from '../../Assets/validationFunctions.tsx';

const StyledTextField = styled(TextField)({
  marginBottom: 20,
  marginRight: '1rem',
  backgroundColor: '#fffff',
});

const Textfield = ({ componentDetails, data, handleTextfieldChange, index, submitted }) => {
  const { inputType, inputName, inputLabel, inputError, inputHelperText, dollarField } = componentDetails;
  const errorController = useErrorController(inputError, inputHelperText);
  useEffect(() => {
    errorController.setSubmittedCount(submitted);
  }, [submitted]);

  const valueRef = useRef('');
  useEffect(() => {
    errorController.updateError(valueRef.current.value);
  }, [valueRef.current.value]);

  return (
    <StyledTextField
      type={inputType}
      name={inputName}
      value={data[inputName]}
      label={inputLabel}
      onChange={(event) => {
        handleTextfieldChange(event, index);
      }}
      inputRef={valueRef}
      variant="outlined"
      required
      error={errorController.showError}
      helperText={errorController.showError && errorController.message(data[inputName])}
      InputProps={
        dollarField
          ? {
              startAdornment: <InputAdornment position="start">$</InputAdornment>,
            }
          : {}
      }
    />
  );
};

export default Textfield;
