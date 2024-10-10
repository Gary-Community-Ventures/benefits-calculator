import { Button } from '@mui/material';
import { PropsWithChildren } from 'react';
import { FormattedMessage } from 'react-intl';

const FormContinueButton = ({ children }: PropsWithChildren) => {
  return (
    <Button variant="contained" type="submit">
      {children ?? <FormattedMessage id="continueButton" defaultMessage="Continue" />}
    </Button>
  );
};

export default FormContinueButton;
