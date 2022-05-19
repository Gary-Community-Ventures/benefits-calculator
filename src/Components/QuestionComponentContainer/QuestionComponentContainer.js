import Textfield from '../Textfield/Textfield';
import Radiofield from '../Radiofield/Radiofield';
import PreviousButton from '../PreviousButton/PreviousButton';
import ContinueButton from '../ContinueButton/ContinueButton';
import questions from '../../Assets/questions';
import './QuestionComponentContainer.css';

const QuestionComponentContainer = ({ formData, handleChange, handleSubmit, page, setPage, handleRadioButtonChange }) => {
  const matchingQuestion = questions.find((question) => question.id === page);
  console.log({matchingQuestion})
  if (matchingQuestion.componentDetails.componentType === 'Textfield') {
    return (
      <div className='question-container' id={matchingQuestion.id}>
        <p className='question-label'>{matchingQuestion.question}</p>
        <Textfield 
          componentDetails={matchingQuestion.componentDetails}
          formData={formData}
          handleChange={handleChange} />
        {matchingQuestion.id === 0 ? 
          <ContinueButton 
            handleSubmit={handleSubmit} 
            inputError={matchingQuestion.componentDetails.inputError}
            formData={formData} 
            inputName={matchingQuestion.componentDetails.inputName} />
        
        : 
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
  } else if (matchingQuestion.componentDetails.componentType === 'Radiofield') {
    return (
      <div className='question-container' id={matchingQuestion.id}>
        <p className='question-label'>{matchingQuestion.question}</p>
        <Radiofield 
          componentDetails={matchingQuestion.componentDetails}
          formData={formData}
          handleRadioButtonChange={handleRadioButtonChange} />
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
      </div>
    ); 
  }

}

export default QuestionComponentContainer;