import { ReactNode } from 'react';
import './InformationalText.css';

interface InformationalTextProps {
  children: ReactNode;
  className?: string;
}

const InformationalText = ({ children, className = '' }: InformationalTextProps) => {
  return <div className={`informational-text ${className}`.trim()}>{children}</div>;
};

export default InformationalText;
