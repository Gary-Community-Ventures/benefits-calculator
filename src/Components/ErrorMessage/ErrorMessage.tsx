import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

type Props = {
  error: string;
};

const ErrorMessage = ({ error }: Props) => {
  return (
    <Stack sx={{ width: '100%', marginBottom: '1.1rem' }} spacing={2}>
      <Alert severity="error">{error}</Alert>
    </Stack>
  );
};

export default ErrorMessage;
