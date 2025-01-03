import Radiofield from '../Radiofield/Radiofield';
import Textfield from '../Textfield/Textfield';
import BasicSelect from '../DropdownMenu/BasicSelect';
import { useContext, useState } from 'react';
import { Context } from '../Wrapper/Wrapper';
import QuestionQuestion from '../QuestionComponents/QuestionQuestion';
import './FollowUpQuestions.css';

const FollowUpQuestions = ({
  followUpQuestions,
  submitted,
  formData,
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
        <div key={index}>
          <QuestionQuestion>{followUp.question}</QuestionQuestion>
          <Radiofield componentDetails={followUp.componentDetails} handleRadioButtonChange={handleRadioButtonChange} />
        </div>
      );
    } else if (followUp.componentDetails.componentType === 'Textfield') {
      return (
        <div key={index}>
          <QuestionQuestion>{followUp.question}</QuestionQuestion>
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
        <div key={index}>
          <QuestionQuestion>{followUp.question}</QuestionQuestion>
          <BasicSelect
            componentDetails={followUp.componentDetails}
            options={finalOptions}
            formDataProperty={followUp.componentDetails.inputName}
            submitted={followUpSubmitted}
          />
        </div>
      );
    }
  });
};

export default FollowUpQuestions;
