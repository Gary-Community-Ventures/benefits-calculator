import Textfield from '../Textfield/Textfield';
import questions from '../../Assets/questions';
import './QuestionComponentContainer.css';

const QuestionComponentContainer = ({ formData, handleChange, handleSubmit, page, setPage }) => {
  const createQuestionComponent = () => {
    const matchingQuestion = questions.find((question) => question.id === page);

    if (matchingQuestion.componentDetails.componentType === 'Textfield') {
      return (
        <Textfield 
          componentDetails={matchingQuestion.componentDetails}
          formData={formData}
          handleChange={handleChange} />
      ) 
    }
 
  }

  return (
    <>
      {createQuestionComponent(page)}
    </>
  )

}

export default QuestionComponentContainer;