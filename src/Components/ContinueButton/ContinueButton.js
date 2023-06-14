import { Button } from '@mui/material';
import { useParams } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { useContext, useEffect } from 'react';
import { Context } from '../Wrapper/Wrapper';

const ContinueButton = ({ handleContinueSubmit, errorController, inputName, questionName }) => {
  const { formData } = useContext(Context);
  let { id, uuid } = useParams();
  let stepNumberId = Number(id);

  useEffect(() => {
    const continueOnEnter = (event) => {
      if (event.key === 'Enter') {
        handleContinueSubmit(event, errorController, formData?.[inputName], stepNumberId, questionName, uuid);
      }
    };
    document.addEventListener('keyup', continueOnEnter);
    return () => {
      document.removeEventListener('keyup', continueOnEnter); // remove event listener on onmount
    };
  });

  return (
    <Button
      variant="contained"
      onClick={(event) => {
        handleContinueSubmit(event, errorController, formData?.[inputName], stepNumberId, questionName, uuid);
      }}
    >
      <FormattedMessage id="continueButton" defaultMessage="Continue" />
    </Button>
  );
};

export default ContinueButton;
