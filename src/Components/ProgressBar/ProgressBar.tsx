import { useParams } from 'react-router';
import { FormattedMessage } from 'react-intl';
import LinearProgress from '@mui/material/LinearProgress';
import { getStepDirectory, startingQuestionNumer } from '../../Assets/stepDirectory';
import { useContext } from 'react';
import { Context } from '../Wrapper/Wrapper';
import './ProgressBar.css';

interface ProgressBarProps {
  step?: number;
}

const ProgressBar = ({ step }: ProgressBarProps) => {
  const { theme, formData } = useContext(Context);
  const totalSteps = getStepDirectory(formData.immutableReferrer).length + startingQuestionNumer;
  const { id } = useParams();
  let stepValue: number = 0;
  if (step !== undefined) {
    stepValue = step;
  } else if (id !== undefined) {
    stepValue = Number(id);
  }

  const progressBarStyles = {
    marginBottom: '5px',
    backgroundColor: '#d6d6d6c4',
    border: '1px solid #B0B0B0',
    borderRadius: '500rem;',
    height: '1rem',
    boxShadow: 'inset -1px 1px 3px rgb(0 0 0 / 0.2)',
    '& .MuiLinearProgress-bar': {
      background: `linear-gradient(90deg, ${theme.primaryColor} 0%, ${theme.secondaryColor} 100%)`,
      borderRadius: '500rem;',
    },
  };

  return (
    <aside className="progress-bar-container">
      <LinearProgress
        sx={progressBarStyles}
        variant="determinate"
        value={(stepValue / totalSteps) * 100}
        className="progress-bar"
        aria-label="Progress Bar"
      />
      <p className="step-progress-title">
        <FormattedMessage id="confirmation.return-stepLabel" defaultMessage="Step " />
        {stepValue}
        <FormattedMessage id="confirmation.return-ofLabel" defaultMessage=" of " />
        {totalSteps}
      </p>
    </aside>
  );
};

export default ProgressBar;
