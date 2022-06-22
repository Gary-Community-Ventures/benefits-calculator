import HousingBlock from '../HousingBlock/HousingBlock';
import Radiofield from '../Radiofield/Radiofield';
import Textfield from '../Textfield/Textfield';
import PreviousButton from '../PreviousButton/PreviousButton';
import ContinueButton from '../ContinueButton/ContinueButton';
import IncomeBlock from '../IncomeBlock/IncomeBlock';
import ExpenseBlock from '../ExpenseBlock/ExpenseBlock';
import HouseholdDataBlock from '../HouseholdDataBlock/HouseholdDataBlock';
import questions from '../../Assets/questions';
import { useParams } from 'react-router-dom';
import './QuestionComponentContainer.css';

const QuestionComponentContainer = ({ formData, handleTextfieldChange, handleSubmit, handleRadioButtonChange, handleIncomeStreamsSubmit, handleExpenseSourcesSubmit, handleHousingSourcesSubmit }) => {
  let { id } = useParams();
  let numberId = Number(id);
  const matchingQuestion = questions.find((question) => question.id === numberId);

  const createHouseholdDataBlock = () => {
    return (
      <div className='question-container' id={matchingQuestion.id}>
        <p className='question-label household-data-q-underline'>{matchingQuestion.question}</p>
        <HouseholdDataBlock 
          formData={formData} />
      </div>
    );
  }

  const createHousingBlockComponent = () => {
    return (
      <div className='question-container' id={matchingQuestion.id}>
        <p className='question-label'>{matchingQuestion.question}</p>
        {matchingQuestion.questionDescription && <p className='question-description'>{matchingQuestion.questionDescription}</p>}
        <HousingBlock 
          handleHousingSourcesSubmit={handleHousingSourcesSubmit} 
          formData={formData} />
      </div>
    );
  }

  const createTextfieldComponent = () => {
    return (
      <div className='question-container' id={matchingQuestion.id}>
        <p className='question-label'>{matchingQuestion.question}</p>
        {matchingQuestion.questionDescription && <p className='question-description'>{matchingQuestion.questionDescription}</p>}
        <Textfield 
          componentDetails={matchingQuestion.componentDetails}
          formData={formData}
          handleTextfieldChange={handleTextfieldChange} />
        <div className='question-buttons'>
          <PreviousButton formData={formData} />
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
        {matchingQuestion.questionDescription && <p className='question-description'>{matchingQuestion.questionDescription}</p>}
        <Radiofield
          componentDetails={matchingQuestion.componentDetails}
          formData={formData}
          handleRadioButtonChange={handleRadioButtonChange} />
        {formData[inputName] === true && hasFollowUpQuestions && renderFollowUpQuestions()}
        {createPreviousAndContinueButtons(matchingQuestion)}
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
          <IncomeBlock 
            handleIncomeStreamsSubmit={handleIncomeStreamsSubmit} 
            formData={formData} />
        </div>
      }  else if (followUp.componentDetails.componentType === 'ExpenseBlock') {
        return <div className='question-container' key={index}>
          <p className='question-label'>{followUp.question}</p>
          <ExpenseBlock 
            handleExpenseSourcesSubmit={handleExpenseSourcesSubmit}
            formData={formData} />
        </div>
      }
    });
  }

  const createPreviousAndContinueButtons = (question) => {
    //render normal button block if the question isn't the income or expense question or if the user doesn't have an income/expenses at all, 
    //otherwise these buttons will be created in the IncomeBlock/ExpenseBlock components
    const isNotIncomeOrExpenseQ = question.id < 12 || question.id >= 14;
    const hasFalsyIncome = question.id === 12 && formData[question.componentDetails.inputName] === false;
    const hasFalsyExpense = question.id === 13 && formData[question.componentDetails.inputName] === false;
    if (isNotIncomeOrExpenseQ || hasFalsyIncome || hasFalsyExpense) {
      return (
        <div className='question-buttons'>
          <PreviousButton formData={formData} />
          <ContinueButton
            handleSubmit={handleSubmit}
            inputError={matchingQuestion.componentDetails.inputError}
            formData={formData}
            inputName={matchingQuestion.componentDetails.inputName} />
        </div>
      );
    }
  }

  return (
    <main className='benefits-form'>
      <p className='step-progress-title'>Step {id} of {questions.length + 2}</p>
      { matchingQuestion.id !== 15 && <h2 className='sub-header'>Tell us a little more about yourself.</h2> }
      { matchingQuestion.id === 15 && <h2 className='household-data-sub-header'>So far you’ve told us about:</h2> }
      { matchingQuestion.id === 15 && <h4 className='household-data-sub2-header'> 🔵 You, {formData.applicantAge} Head of household</h4> }
      {
        ( matchingQuestion.componentDetails.componentType === 'Textfield' && createTextfieldComponent() ) ||
        ( matchingQuestion.componentDetails.componentType === 'Radiofield' && createRadiofieldComponent() ) ||
        ( matchingQuestion.componentDetails.componentType === 'HousingBlock' && createHousingBlockComponent() ) ||
        ( matchingQuestion.componentDetails.componentType === 'HouseholdDataBlock' && createHouseholdDataBlock() )
      }
    </main>
  );

}

export default QuestionComponentContainer;