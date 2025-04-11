import { Button, CircularProgress } from '@mui/material';
import { PropsWithChildren, useContext } from 'react';
import { FormattedMessage } from 'react-intl';
import { Context } from '../Wrapper/Wrapper';

const FormContinueButton = ({ children }: PropsWithChildren) => {
  const { stepLoading } = useContext(Context);
  return (
    <Button variant="contained" type="submit">
      {stepLoading ? (
        <CircularProgress />
      ) : (
        children ?? <FormattedMessage id="continueButton" defaultMessage="Continue" />
      )}
    </Button>
  );
};

export default FormContinueButton;
