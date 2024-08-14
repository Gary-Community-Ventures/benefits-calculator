import React, { useState, useContext, useEffect } from 'react';
import { Button, Modal, Box, Typography, CircularProgress } from '@mui/material';
import { useParams } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { Context } from '../Wrapper/Wrapper.tsx';

const FeedbackButton = ({ handleContinueSubmit, errorController, inputName, questionName, style }) => {
  const { formData } = useContext(Context);
  let { id, uuid } = useParams();
  let stepNumberId = Number(id);

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleIframeLoad = () => {
    setLoading(false);
  };
  const location = window.location.href

  useEffect(() => {
    const feedbackOnEnter = (event) => {
      if (event.key === 'Enter') {
        handleContinueSubmit(event, errorController, formData?.[inputName], stepNumberId, questionName, uuid);
      }
    };
    document.addEventListener('keyup', feedbackOnEnter);
    return () => {
      document.removeEventListener('keyup', feedbackOnEnter); // remove event listener on unmount
    };
  });

  return (
    <>
      <Button
        style={{ ...style, marginRight: '1rem' }}
        variant="outlined"
        onClick={handleOpen}
      >
        <FormattedMessage id="feedback" defaultMessage="Beta Testing - Feedback Form" />
      </Button>
      
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="feedback-modal-title"
        aria-describedby="feedback-modal-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '60%',
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography id="feedback-modal-title" variant="h6" component="h2">
            Feedback
          </Typography>
          <Box position="relative" width="100%" height="80vh" sx={{ mt: 2 }}>
            {loading && (
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                position="absolute"
                top={0}
                left={0}
                right={0}
                bottom={0}
                bgcolor="rgba(255, 255, 255, 0.8)"
                zIndex={1}
              >
                <CircularProgress />
              </Box>
            )}
            <iframe
              title="Bug-report"
              className="airtable-embed"
              src={"https://airtable.com/embed/app8EC0NO7FrnAMlP/shrhS9Nr88cMoXJIa" + "?prefill_Screener Page="+ location}
              frameBorder="0"
              width="100%"
              height="533"
              style={{ height: '100%', display: loading ? 'none' : 'block' }}
              onLoad={handleIframeLoad}
            ></iframe>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default FeedbackButton;
