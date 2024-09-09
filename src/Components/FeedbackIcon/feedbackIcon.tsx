import React, { useState } from 'react';
import FeedbackIconImage from '../../Assets/icons/feedback.svg';
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
      {isModalOpen && <FeedbackModal handleCloseModal={handleCloseModal} />}
      <div className="feedback-icon-container">
        <img src={FeedbackIconImage} alt="Feedback Icon" onClick={handleIconClick} className="feedback-icon" />
      </div>
    </>
  );
};

export default FeedbackIcon;
