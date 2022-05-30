import Textfield from '../Textfield/Textfield';
import Radiofield from '../Radiofield/Radiofield';
import PreviousButton from '../PreviousButton/PreviousButton';
import ContinueButton from '../ContinueButton/ContinueButton';
import questions from '../../Assets/questions';
import Selectfield from '../SelectField/Selectfield';
import './QuestionComponentContainer.css';

const QuestionComponentContainer = ({ formData, handleChange, handleSubmit, page, setPage, handleRadioButtonChange }) => {
  const matchingQuestion = questions.find((question) => question.id === page);
  // console.log({matchingQuestion})
  const createTextfieldComponent = () => {
    return (
      <div className='question-container' id={matchingQuestion.id}>
        <p className='question-label'>{matchingQuestion.question}</p>
        <Textfield 
          componentDetails={matchingQuestion.componentDetails}
          formData={formData}
          handleChange={handleChange} />
        <div className='question-buttons'>
          {matchingQuestion.id > 0 && <PreviousButton 
            page={page} 
            setPage={setPage} />}
          <ContinueButton 
            handleSubmit={handleSubmit} 
            inputError={matchingQuestion.componentDetails.inputError}
            formData={formData} 
            inputName={matchingQuestion.componentDetails.inputName} />
        </div>
      </div>
    );
  }

  const createRadiofieldComponent = () => {
    const inputName = matchingQuestion.componentDetails.inputName;
    const { followUpQuestions } = matchingQuestion;
    const hasFollowUpQuestions = followUpQuestions && followUpQuestions.length > 0;
    return (
      <div className='question-container' id={matchingQuestion.id}>
        <p className='question-label'>{matchingQuestion.question}</p>
        <Radiofield 
          componentDetails={matchingQuestion.componentDetails}
          formData={formData}
          handleRadioButtonChange={handleRadioButtonChange} />
        {formData[inputName] === true && hasFollowUpQuestions && renderFollowUpQuestions()}
        {(inputName === 'hasIncome' && formData[inputName] === false || inputName !== 'hasIncome') &&
        <div className='question-buttons'>
          <PreviousButton 
            page={page} 
            setPage={setPage} />
          <ContinueButton 
            handleSubmit={handleSubmit} 
            inputError={matchingQuestion.componentDetails.inputError}
            formData={formData} 
            inputName={matchingQuestion.componentDetails.inputName} />
        </div>
         }
      </div>
    ); 
  }

  const renderFollowUpQuestions = () => {
    const { followUpQuestions } = matchingQuestion;
    return followUpQuestions.map((followUp, index) => {
      if (followUp.componentDetails.componentType === 'Radiofield') {
        return <div key={index}>
          <p className='question-label'>{followUp.question}</p>
          <Radiofield
            componentDetails={followUp.componentDetails}
            formData={formData}
            handleRadioButtonChange={handleRadioButtonChange} />
        </div>
      } else if (followUp.componentDetails.componentType === 'Selectfield') {
        return <div className='question-container' key={index}>
          <p className='question-label'>{followUp.question}</p>
          <Selectfield handleIncomeStreamAmountChange={handleIncomeStreamAmountChange} />
        </div>
      }
    });
  }

  if (matchingQuestion.componentDetails.componentType === 'Textfield') {
    return createTextfieldComponent();
  } else if (matchingQuestion.componentDetails.componentType === 'Radiofield') {
    return createRadiofieldComponent();
  }

}

export default QuestionComponentContainer;