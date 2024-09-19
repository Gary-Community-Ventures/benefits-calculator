import React, { useState } from 'react';
import {ReactComponent as FeedbackIconImage} from '../../Assets/icons/feedback.svg';
import './feedbackIcon.css';
import FeedbackModal from './feedbackModal';

const FeedbackIcon: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleIconClick = () => {
    setIsModalOpen((prevState) => !prevState);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="feedback-icon-container">
        <FeedbackIconImage onClick={handleIconClick} className="feedback-icon" />
      </div>
      {isModalOpen && <FeedbackModal handleCloseModal={handleCloseModal} />}
    </>
  );
};

export default FeedbackIcon;
