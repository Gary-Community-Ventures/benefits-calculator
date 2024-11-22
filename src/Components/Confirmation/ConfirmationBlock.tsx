import { ReactComponent as Edit } from '../../Assets/icons/edit.svg';
import { PropsWithChildren, ReactNode } from 'react';
import { Link, useParams } from 'react-router-dom';
import { FormattedMessageType, QuestionName } from '../../Types/Questions';
import './Confirmation.css';
import { useStepNumber } from '../../Assets/stepDirectory';
import { MessageDescriptor, useIntl } from 'react-intl';

type ConfirmationBlockParams = PropsWithChildren<{
  icon: ReactNode;
  title: ReactNode;
  stepName: QuestionName;
  editAriaLabel: MessageDescriptor;
}>;

export default function ConfirmationBlock({ icon, title, stepName, editAriaLabel, children }: ConfirmationBlockParams) {
  const { whiteLabel, uuid } = useParams();
  const { formatMessage } = useIntl();
  const stepNumber = useStepNumber(stepName);
  const locationState = { routedFromConfirmationPg: true };

  return (
    <div className="confirmation-block-container">
      <div className="confirmation-icon">{icon}</div>
      <div className="confirmation-block-content">
        <p className="section-title">{title}</p>
        {children}
      </div>
      <Link
        to={`/${whiteLabel}/${uuid}/step-${stepNumber}`}
        state={locationState}
        className="edit-button"
        aria-label={formatMessage(editAriaLabel)}
      >
        <Edit title={formatMessage(editAriaLabel)} />
      </Link>
    </div>
  );
}

type ConfirmationItemParams = {
  label: ReactNode;
  value: ReactNode;
};

// be sure to include the ":" in the label
export function ConfirmationItem({ label, value }: ConfirmationItemParams) {
  return (
    <p className="section-p">
      <strong>{label}</strong>
      {value}
    </p>
  );
}
