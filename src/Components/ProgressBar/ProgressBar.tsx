import { useParams } from 'react-router';
import { FormattedMessage } from 'react-intl';
import LinearProgress from '@mui/material/LinearProgress';
import { getStepDirectory, STARTING_QUESTION_NUMBER } from '../../Assets/stepDirectory';
import { useContext } from 'react';
import { Context } from '../Wrapper/Wrapper';
import './ProgressBar.css';

interface ProgressBarProps {
  step?: number;
}

const ProgressBar = ({ step }: ProgressBarProps) => {
  const { theme, formData } = useContext(Context);
  const totalSteps = getStepDirectory(formData.immutableReferrer).length + STARTING_QUESTION_NUMBER;
  const { id } = useParams();

  let stepValue = step ?? id ?? 0;
  let progressPercentage: number = ((Number(stepValue) - 1) / totalSteps) * 100;

  const progressBarStyles = {
    marginBottom: '5px',
    backgroundColor: theme.secondaryBackgroundColor,
    borderRadius: '500rem;',
    height: '1rem',
    '& .MuiLinearProgress-bar': {
      background: theme.terraCottaColor,
      borderRadius: '500rem;',
    },
  };

  return (
    <aside className="progress-bar-container">
      <LinearProgress
        sx={progressBarStyles}
        variant="determinate"
        value={progressPercentage}
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
