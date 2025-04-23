import { Box, Button, CircularProgress } from '@mui/material';
import { PropsWithChildren, useContext } from 'react';
import { FormattedMessage } from 'react-intl';
import { Context } from '../Wrapper/Wrapper';

const FormContinueButton = ({ children }: PropsWithChildren) => {
  const { stepLoading } = useContext(Context);
  return (
    <Button variant="contained" type="submit">
      {stepLoading && <CircularProgress size="1rem" color="inherit" sx={{ position: 'absolute' }} />}
      <span
        style={{
          visibility: stepLoading ? 'hidden' : 'visible',
        }}
      >
        {children ?? <FormattedMessage id="continueButton" defaultMessage="Continue" />}
      </span>
    </Button>
  );
};

export default FormContinueButton;
