import { Button } from '@mui/material';
import { PropsWithChildren } from 'react';

const FormContinueButton = ({ children }: PropsWithChildren) => {
  return (
    <Button variant="contained" type="submit">
      {children}
    </Button>
  );
};

export default FormContinueButton;
