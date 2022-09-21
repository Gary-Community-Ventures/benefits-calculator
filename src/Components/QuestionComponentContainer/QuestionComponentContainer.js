import { FormattedMessage } from 'react-intl';
import { useParams } from 'react-router-dom';
import Radiofield from '../Radiofield/Radiofield';
import Textfield from '../Textfield/Textfield';
import PreviousButton from '../PreviousButton/PreviousButton';
import ContinueButton from '../ContinueButton/ContinueButton';
import IncomeBlock from '../IncomeBlock/IncomeBlock';
import ExpenseBlock from '../ExpenseBlock/ExpenseBlock';
import HouseholdDataBlock from '../HouseholdDataBlock/HouseholdDataBlock';
import BasicSelect from '../DropdownMenu/BasicSelect';
import BasicCheckboxGroup from '../CheckboxGroup/BasicCheckboxGroup';
import questions from '../../Assets/questions';
import './QuestionComponentContainer.css';

const QuestionComponentContainer = ({ formData, handleTextfieldChange, handleSubmit, handleRadioButtonChange, handleIncomeStreamsSubmit, handleExpenseSourcesSubmit, handleHouseholdDataSubmit, setFormData }) => {
  let { id } = useParams();
  let numberId = Number(id);
  const matchingQuestion = questions.find((question) => question.id === numberId);

  const createHouseholdDataBlock = () => {
    return (
      <div className='question-container' id={matchingQuestion.id}>
        <p className='question-label household-data-q-underline'>{matchingQuestion.question}</p>
        <HouseholdDataBlock 
          formData={formData} 
          handleHouseholdDataSubmit={handleHouseholdDataSubmit} />
      </div>
    );
  }

  const renderTextfieldComponent = (question) => {
    return (
      <Textfield 
        componentDetails={question.componentDetails}
        formData={formData}
        handleTextfieldChange={handleTextfieldChange} />
    );
  }

  const renderRadiofieldComponent = (question) => {
    return (      
      <Radiofield
        componentDetails={question.componentDetails}
        formData={formData}
        handleRadioButtonChange={handleRadioButtonChange} />
    ); 
  }

  const renderBasicCheckboxGroup = (question) => {
    return (
      <BasicCheckboxGroup
        stateVariable={question.componentDetails.inputName}
        options={question.componentDetails.options}
        state={formData}
        setState={setFormData} />
    );
  }

  const renderBasicSelectComponent = (question) => {
    return (
      <BasicSelect
        componentProperties={question.componentDetails.componentProperties}
        setFormData={setFormData}
        formData={formData} 
        options={question.componentDetails.options} 
        formDataProperty={question.componentDetails.inputName} />
    );
  }

  const createComponent = (component) => {
    const inputName = matchingQuestion.componentDetails.inputName;
    const { followUpQuestions } = matchingQuestion;
    const hasFollowUpQuestions = followUpQuestions && followUpQuestions.length > 0;
    return (
      <div className='question-container' id={matchingQuestion.id}>
        <p className='question-label'>{matchingQuestion.question}</p>
        {matchingQuestion.questionDescription && <p className='question-description'>{matchingQuestion.questionDescription}</p>}
        {component}
        {formData[inputName] === true && hasFollowUpQuestions && renderFollowUpQuestions()}
        {createPreviousAndContinueButtons(matchingQuestion)}
      </div>
    );
  }

  const renderFollowUpQuestions = () => {
    const { followUpQuestions } = matchingQuestion;
    return followUpQuestions.map((followUp, index) => {
      if (followUp.componentDetails.componentType === 'Radiofield') {
        return <div className='question-container' key={index}>
          <p className='question-label'>{followUp.question}</p>
          {renderRadiofieldComponent(followUp)}
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
      } else if (followUp.componentDetails.componentType === 'Textfield') {
        return (
          <div className='question-container' key={index}>
            <p className='question-label'>{followUp.question}</p>
            <Textfield 
              componentDetails={matchingQuestion.followUpQuestions[0].componentDetails}
              formData={formData}
              handleTextfieldChange={handleTextfieldChange}
              index='0' />
          </div>
        );
      }
    });
  }

  const createPreviousAndContinueButtons = (question) => {
    //render normal button block if the question isn't the income or expense question or if the user doesn't have an income/expenses at all, 
    //otherwise these buttons will be created in the IncomeBlock/ExpenseBlock components
    const isNotIncomeOrExpenseQ = question.id < 11 || question.id >= 13;
    const hasFalsyIncome = question.id === 11 && formData[question.componentDetails.inputName] === false;
    const hasFalsyExpense = question.id === 12 && formData[question.componentDetails.inputName] === false;
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
      <p className='step-progress-title'>
        <FormattedMessage 
          id='qcc.step-text'
          defaultMessage='Step ' /> 
        {id}
        <FormattedMessage 
          id='qcc.of-text'
          defaultMessage=' of ' />
        {questions.length + 2}
      </p>
      { matchingQuestion.id !== 14 && 
        <h2 className='sub-header'>
          <FormattedMessage
            id='qcc.tell-us-text'
            defaultMessage='Tell us a little more about yourself.' />
        </h2> }
      { matchingQuestion.id === 14 && 
        <h2 className='household-data-sub-header'>
          <FormattedMessage
            id='qcc.so-far-text'
            defaultMessage='So far you’ve told us about:' />
        </h2> }
      { matchingQuestion.id === 14 && 
        <h4 className='household-data-sub2-header'> 
          🔵 
          <FormattedMessage
            id='qcc.you-text'
            defaultMessage=' You, ' />
          {formData.age} 
          <FormattedMessage
            id='qcc.hoh-text'
            defaultMessage=' Head of household' />
        </h4> }
      {
        ( matchingQuestion.componentDetails.componentType === 'Textfield' && createComponent(renderTextfieldComponent(matchingQuestion)) ) ||
        ( matchingQuestion.componentDetails.componentType === 'Radiofield' && createComponent(renderRadiofieldComponent(matchingQuestion)) ) ||
        ( matchingQuestion.componentDetails.componentType === 'HouseholdDataBlock' && createHouseholdDataBlock() ) ||
        ( matchingQuestion.componentDetails.componentType === 'BasicCheckboxGroup' && createComponent(renderBasicCheckboxGroup(matchingQuestion)) ) ||
        ( matchingQuestion.componentDetails.componentType === 'BasicSelect' && createComponent(renderBasicSelectComponent(matchingQuestion)) )
      }
    </main>
  );

}

export default QuestionComponentContainer;