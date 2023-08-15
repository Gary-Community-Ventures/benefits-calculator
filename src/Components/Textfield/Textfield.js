import { useRef, useEffect } from 'react';
import { TextField } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useErrorController } from '../../Assets/validationFunctions.tsx';

const StyledTextField = styled(TextField)({
  marginBottom: 20,
  marginRight: '1rem',
});

const Textfield = ({ componentDetails, data, handleTextfieldChange, index, submitted }) => {
  const { inputType, inputName, inputLabel, inputError, inputHelperText } = componentDetails;
  const errorController = useErrorController(inputError, inputHelperText);
  useEffect(() => {
    errorController.setTimesSubmitted(submitted);
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
    />
  );
};

export default Textfield;
