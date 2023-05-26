import { Button } from '@mui/material';
import { useParams } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { useContext } from 'react';
import { Context } from '../Wrapper/Wrapper';

const ContinueButton = ({ handleContinueSubmit, inputError, inputName, questionName }) => {
  const { formData } = useContext(Context);
  let { id, uuid } = useParams();
  let stepNumberId = Number(id);

  return (
    <Button
      variant="contained"
      onClick={(event) => {
        handleContinueSubmit(event, inputError, formData?.[inputName], stepNumberId, questionName, uuid);
      }}
    >
      <FormattedMessage id="continueButton" defaultMessage="Continue" />
    </Button>
  );
};

export default ContinueButton;
