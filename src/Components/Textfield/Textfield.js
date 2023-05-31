import { useRef, useEffect } from 'react';
import { TextField } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledTextField = styled(TextField)({
  marginBottom: 20,
  marginRight: '1rem',
});

const Textfield = ({ componentDetails, data, handleTextfieldChange, index, errorController }) => {
  const { inputType, inputName, inputLabel } = componentDetails;
  const valueRef = useRef('');
  useEffect(() => {
    console.log(errorController.updateError(valueRef.current.value));
  }, [valueRef.current.value]);

  return (
    <>
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
        helperText={errorController.message(data[inputName])}
      />
    </>
  );
};

export default Textfield;
