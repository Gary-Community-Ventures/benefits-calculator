import Textfield from '../Textfield/Textfield';
import Radiofield from '../Radiofield/Radiofield';
import PreviousButton from '../PreviousButton/PreviousButton';
import ContinueButton from '../ContinueButton/ContinueButton';
import IncomeBlock from '../IncomeBlock/IncomeBlock';
import questions from '../../Assets/questions';
import './QuestionComponentContainer.css';

const QuestionComponentContainer = ({ formData, handleChange, handleSubmit, page, setPage, handleRadioButtonChange, handleIncomeStreamsSubmit }) => {
  const matchingQuestion = questions.find((question) => question.id === page);

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
      } else if (followUp.componentDetails.componentType === 'IncomeBlock') {
        return <div className='question-container' key={index}>
          <p className='question-label'>{followUp.question}</p>
          <IncomeBlock handleIncomeStreamAmountChange={handleIncomeStreamAmountChange} />
        </div>
      }
    });
  }

  const createPreviousAndContinueButtons = (question) => {
    //render normal button block if the question isn't the income question or if the user doesn't have an income at all, 
    //otherwise these buttons will be in the IncomeBlock component
    if (question.id !== 10 || question.id === 10 && formData[question.componentDetails.inputName] === false) {
      return (
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
      );
    }
  }

  if (matchingQuestion.componentDetails.componentType === 'Textfield') {
    return createTextfieldComponent();
  } else if (matchingQuestion.componentDetails.componentType === 'Radiofield') {
    return createRadiofieldComponent();
  }

}

export default QuestionComponentContainer;