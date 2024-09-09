import React, { useState } from 'react';
import './feedbackIcon.css';
import { FormattedMessage } from 'react-intl';
import '../../Components/Results/211Button/211Button.css';

interface FeedbackModalProps {
  handleCloseModal: () => void;
}

const FeedbackModal: React.FC<FeedbackModalProps> = ({ handleCloseModal }) => {
  const onEmailClick = () => {
    handleCloseModal();
    window.location.href =
      'mailto:ricky@codethedream.org?subject=Feedback&body=Please%20provide%20your%20feedback%20here.';
  };

  const surveyLink =
    'https://docs.google.com/forms/d/e/1FAIpQLSdrwxIm8QOpaEDYH1UOahpzMIr3w6OSqqxjmEKCOoAZyWppeg/viewform';

  return (
    <div className="feedback-container">
      <div className="feedback-header">
        <FormattedMessage id="feedbackModal-header" defaultMessage="MyFriendBen Feedback" />
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
        <button onClick={handleCloseModal} className="close-button">
          ✕
        </button>
      </div>
    </div>
  );
};

export default FeedbackModal;
