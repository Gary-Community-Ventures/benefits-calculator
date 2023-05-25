import { TextField } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledTextField = styled(TextField)({
  marginBottom: 20,
  marginRight: '1rem',
});

const Textfield = ({ componentDetails, data, handleTextfieldChange, index, errorController }) => {
  const { inputType, inputName, inputLabel } = componentDetails;

  return (
    <>
      <StyledTextField
        type={inputType}
        name={inputName}
        value={data[inputName]}
        label={inputLabel}
        onChange={(event) => {
          errorController.updateError(event.target.value);
          handleTextfieldChange(event, index);
        }}
        variant="outlined"
        required
        error={errorController.showError}
        helperText={errorController.message(data[inputName])}
      />
    </>
  );
};

export default Textfield;
