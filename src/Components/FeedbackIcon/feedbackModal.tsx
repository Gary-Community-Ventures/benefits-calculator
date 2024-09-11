import React from 'react';
import './feedbackIcon.css';
import { FormattedMessage } from 'react-intl';
import '../../Components/Results/211Button/211Button.css';
import { useConfig } from '../Config/configHook';

interface FeedbackModalProps {
  handleCloseModal: () => void;
}

const FeedbackModal: React.FC<FeedbackModalProps> = ({ handleCloseModal }) => {
  const { email, survey } = useConfig('feedback_links');

  const onEmailClick = () => {
    handleCloseModal();
    window.location.href = email;
  };

  const surveyLink = survey;

  return (
    <div className="feedback-container-wrapper">
      <div className="feedback-container">
      
        <div className="feedback-header">
          <FormattedMessage id="feedbackModal-header" defaultMessage="MyFriendBen Feedback" />
          <button onClick={handleCloseModal} className="close-button">
          ✕
        </button>
        </div>
        <FormattedMessage id="feedbackModal-question" defaultMessage="Tell us what you think" />
        <p className="border-bottom"></p>
        <div className="button-wrapper">
          <button onClick={onEmailClick} className="button211">
            <FormattedMessage id="emailButton" defaultMessage="Email" />
          </button>
          <button>
            <a href={surveyLink} target="_blank" className="button211">
              <FormattedMessage id="surveyButton" defaultMessage="Survey" />
            </a>
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeedbackModal;
