import { TextField } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledTextField = styled(TextField)({
  marginBottom: 20
});

const Textfield = ({ componentDetails, formData, handleTextfieldChange }) => {
  const { inputType, inputName, inputLabel, inputError, inputHelperText } = componentDetails;

  return (
    <>
      <StyledTextField 
        type={inputType}
        name={inputName}
        value={formData[inputName]}
        label={inputLabel}
        onChange={(event) => {handleTextfieldChange(event)}}
        variant='outlined'
        required
        error={inputError(formData[inputName])}
        helperText={inputHelperText(formData[inputName])} />
    </>
  );
}

export default Textfield;