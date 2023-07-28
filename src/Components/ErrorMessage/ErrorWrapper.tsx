import { PropsWithChildren } from 'react';
import ErrorIcon from '@mui/icons-material/Error';
import './ErrorWrapper.css';

type Props = {
  fontSize: string;
} & PropsWithChildren;

export default function ErrorMessageWrapper({ children, fontSize }: Props) {
  return (
    <span className="error-helper-text">
      <ErrorIcon sx={{ fontSize: fontSize, mr: '5px' }} />
      <span className="error-message">{children}</span>
    </span>
  );
}
