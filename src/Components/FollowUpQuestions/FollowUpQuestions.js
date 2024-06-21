import Radiofield from '../Radiofield/Radiofield';
import ExpenseBlock from '../ExpenseBlock/ExpenseBlock';
import Textfield from '../Textfield/Textfield';
import SignUp from '../SignUp/SignUp';
import AccordionsContainer from '../AccordionsContainer/AccordionsContainer';
import BasicSelect from '../DropdownMenu/BasicSelect';
import { useContext, useState } from 'react';
import { Context } from '../Wrapper/Wrapper';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';

const FollowUpQuestions = ({
  followUpQuestions,
  submitted,
  formData,
  handleCheckboxChange,
  handleExpenseSourcesSubmit,
  handleTextfieldChange,
  handleRadioButtonChange,
}) => {
  const { config } = useContext(Context);
  const { counties_by_zipcode: countiesByZipcode } = config;

  const [initialSubmittedCount, setInitialSubmitted] = useState(submitted);
  const followUpSubmitted = submitted - initialSubmittedCount;

  return followUpQuestions.map((followUp, index) => {
    if (followUp.componentDetails.componentType === 'Radiofield') {
      return (
        <div className="question-container" key={index}>
          <h2 className="question-label">{followUp.question}</h2>
          <Radiofield componentDetails={followUp.componentDetails} handleRadioButtonChange={handleRadioButtonChange} />
        </div>
      );
    } else if (followUp.componentDetails.componentType === 'ExpenseBlock') {
      return (
        <div className="question-container" key={index}>
          <Box className="section-container">
            <Stack className="section">
              <h2 className="question-label section" style={{ paddingTop: '3rem' }}>
                {followUp.question}
              </h2>
            </Stack>
          </Box>
          <ExpenseBlock handleExpenseSourcesSubmit={handleExpenseSourcesSubmit} />
        </div>
      );
    } else if (followUp.componentDetails.componentType === 'Textfield') {
      return (
        <div className="question-container" key={index}>
          <h2 className="question-label">{followUp.question}</h2>
          <Textfield
            componentDetails={followUp.componentDetails}
            submitted={followUpSubmitted}
            data={formData}
            handleTextfieldChange={handleTextfieldChange}
            index="0"
          />
        </div>
      );
    } else if (followUp.componentDetails.componentType === 'BasicSelect') {
      const finalOptions =
        followUp.componentDetails.inputName === 'county' ? countiesByZipcode[formData.zipcode] : countiesByZipcode;
      return (
        <div className="question-container" key={index}>
          <h2 className="question-label">{followUp.question}</h2>
          <BasicSelect
            componentDetails={followUp.componentDetails}
            options={finalOptions}
            formDataProperty={followUp.componentDetails.inputName}
            submitted={followUpSubmitted}
          />
        </div>
      );
    } else if (followUp.componentDetails.componentType === 'SignUp') {
      return (
        <div className="question-container" key={index}>
          <h2 className="question-label">{followUp.question}</h2>
          <SignUp
            handleTextfieldChange={handleTextfieldChange}
            handleCheckboxChange={handleCheckboxChange}
            submitted={followUpSubmitted}
          />
        </div>
      );
    } else if (followUp.componentDetails.componentType === 'AccordionContainer') {
      return (
        <div className="question-container accordions-container" key={index}>
          <h2 className="question-label">{followUp.question}</h2>
          <p className="question-description">{followUp.questionDescription}</p>
          <AccordionsContainer componentDetails={followUp.componentDetails} submitted={followUpSubmitted} />
        </div>
      );
    }
  });
};

export default FollowUpQuestions;
