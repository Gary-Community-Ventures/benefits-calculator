import { Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledTypography = styled(Typography)`
  color: #c6252b;
  height: 24px;
`;

const ErrorMessage = ({ error }) => {
  return <StyledTypography gutterBottom>*{error}</StyledTypography>;
}

export default ErrorMessage;