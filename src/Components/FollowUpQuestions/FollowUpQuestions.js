import { useEffect } from 'react';
import Radiofield from '../Radiofield/Radiofield';
import IncomeBlock from '../IncomeBlock/IncomeBlock';
import ExpenseBlock from '../ExpenseBlock/ExpenseBlock';
import Textfield from '../Textfield/Textfield';
import SignUp from '../SignUp/SignUp';
import AccordionsContainer from '../AccordionsContainer/AccordionsContainer';
import BasicSelect from '../DropdownMenu/BasicSelect';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import { useErrorController } from '../../Assets/validationFunctions';

const FollowUpQuestions = ({
  matchingQuestion,
  submitted,
  formData,
  handleCheckboxChange,
  handleExpenseSourcesSubmit,
  handleIncomeStreamsSubmit,
  handleTextfieldChange,
  handleRadioButtonChange,
}) => {
  const errorController = useErrorController(
    matchingQuestion.componentDetails.inputError,
    matchingQuestion.componentDetails.inputHelperText,
  );
  useEffect(() => {
    errorController.setIsSubmitted(submitted);
  }, [submitted]);
  const { followUpQuestions } = matchingQuestion;

  return followUpQuestions.map((followUp, index) => {
    if (followUp.componentDetails.componentType === 'Radiofield') {
      return (
        <div className="question-container" key={index}>
          <h2 className="question-label">{followUp.question}</h2>
          <Radiofield componentDetails={followUp.componentDetails} handleRadioButtonChange={handleRadioButtonChange} />
        </div>
      );
    } else if (followUp.componentDetails.componentType === 'IncomeBlock') {
      return (
        <div className="question-container" key={index}>
          <h2 className="question-label">{followUp.question}</h2>
          <IncomeBlock handleIncomeStreamsSubmit={handleIncomeStreamsSubmit} />
        </div>
      );
    } else if (followUp.componentDetails.componentType === 'ExpenseBlock') {
      return (
        <div className="question-container" key={index}>
          <h2 className="question-label">{followUp.question}</h2>
          <ExpenseBlock handleExpenseSourcesSubmit={handleExpenseSourcesSubmit} />
        </div>
      );
    } else if (followUp.componentDetails.componentType === 'Textfield') {
      return (
        <div className="question-container" key={index}>
          <h2 className="question-label">{followUp.question}</h2>
          <Textfield
            componentDetails={matchingQuestion.followUpQuestions[0].componentDetails}
            errorController={errorController}
            data={formData}
            handleTextfieldChange={handleTextfieldChange}
            index="0"
          />
        </div>
      );
    } else if (followUp.componentDetails.componentType === 'BasicSelect') {
      const finalOptions =
        followUp.componentDetails.inputName === 'county'
          ? followUp.componentDetails.options[formData.zipcode]
          : followUp.componentDetails.options;
      return (
        <div className="question-container" key={index}>
          <h2 className="question-label">{followUp.question}</h2>
          <BasicSelect
            componentProperties={followUp.componentDetails.componentProperties}
            options={finalOptions}
            formDataProperty={followUp.componentDetails.inputName}
          />
        </div>
      );
    } else if (followUp.componentDetails.componentType === 'SignUp') {
      return (
        <div className="question-container" key={index}>
          <h2 className="question-label">{followUp.question}</h2>
          <SignUp handleTextfieldChange={handleTextfieldChange} handleCheckboxChange={handleCheckboxChange} />
        </div>
      );
    } else if (followUp.componentDetails.componentType === 'AccordionContainer') {
      const hasError = matchingQuestion.componentDetails.inputError(formData.hasBenefits, formData);
      const errorText = matchingQuestion.componentDetails.inputHelperText(formData.hasBenefits, formData);

      return (
        <div className="question-container accordions-container" key={index}>
          <h2 className="question-label">{followUp.question}</h2>
          <p className="question-description">{matchingQuestion.followUpQuestions[0].questionDescription}</p>
          <AccordionsContainer />
          {hasError && <ErrorMessage error={errorText} />}
        </div>
      );
    }
  });
};

export default FollowUpQuestions;
