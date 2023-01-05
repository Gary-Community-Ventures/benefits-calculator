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
import SignUp from '../SignUp/SignUp';
import questions from '../../Assets/questions';
import { zipcodeHasError } from '../../Assets/validationFunctions';
import './QuestionComponentContainer.css';

const QuestionComponentContainer = ({ formData, handleTextfieldChange, handleContinueSubmit, handleRadioButtonChange, 
  handleIncomeStreamsSubmit, handleExpenseSourcesSubmit, handleHouseholdDataSubmit, setFormData,
  handleCheckboxChange }) => {
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
    const finalOptions = question.componentDetails.inputName === 'county' 
      ? question.componentDetails.options[formData.zipcode] 
      : question.componentDetails.options;

    return (
      <BasicSelect
        componentProperties={question.componentDetails.componentProperties}
        setFormData={setFormData}
        formData={formData} 
        options={finalOptions} 
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
        {shouldRenderFollowUpQuestions(hasFollowUpQuestions, inputName) && renderFollowUpQuestions()}
        {createPreviousAndContinueButtons(matchingQuestion)}
      </div>
    );
  }

  const shouldRenderFollowUpQuestions = (hasFollowUpQuestions, inputName) => {
    if (!hasFollowUpQuestions) {
      return false;
    }
    if (inputName === 'zipcode') {
      return !zipcodeHasError(formData.zipcode);
    }
    if (formData[inputName] === true) {
      // this case is for a radio button question where the user selected "yes"
      return true;
    }
    if (formData[inputName] === 'other') {
      // this case is for the referral source question where the user selected "other"
      return true;
    }
    if ((inputName === 'signUpInfo' && formData.signUpInfo.sendUpdates) ||
      (inputName === 'signUpInfo' && formData.signUpInfo.sendOffers)) {
      return true;
    }

    return false;
  };

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
      } else if (followUp.componentDetails.componentType === 'BasicSelect') {
        return (
          <div className='question-container' key={index}>
            <p className='question-label'>{followUp.question}</p>
            {renderBasicSelectComponent(followUp)}
          </div>
        );
      } else if (followUp.componentDetails.componentType === 'SignUp') {
        return (
          <div className='question-container' key={index}>
            <p className='question-label'>{followUp.question}</p>
            <SignUp 
              formData={formData} 
              handleTextfieldChange={handleTextfieldChange} 
              handleCheckboxChange={handleCheckboxChange} />
          </div>
        );
      }
    });
  }

  const createPreviousAndContinueButtons = (question) => {
    //render normal button block if the question isn't the income or expense question or if the user doesn't have an income/expenses at all, 
    //otherwise these buttons will be created in the IncomeBlock/ExpenseBlock components
    const isNotIncomeAndNotExpenseQ = question.name !== 'hasIncome' && question.name !== 'hasExpenses';
    const hasFalsyIncome = question.name === 'hasIncome' && formData[question.componentDetails.inputName] === false;
    const hasFalsyExpense = question.name === 'hasExpenses' && formData[question.componentDetails.inputName] === false;
    if (isNotIncomeAndNotExpenseQ || hasFalsyIncome || hasFalsyExpense) {
      return (
        <div className='question-buttons'>
          <PreviousButton formData={formData} questionName={question.name} />
          <ContinueButton
            handleContinueSubmit={handleContinueSubmit}
            inputError={matchingQuestion.componentDetails.inputError}
            formData={formData}
            inputName={matchingQuestion.componentDetails.inputName}
            questionName={matchingQuestion.name} />
        </div>
      );
    }
  }

  const renderHeaderAndSubheader = () => {
    if (matchingQuestion.headerType === 'signUpInfo') {
      return (
        <h2 className='sub-header'>
          <FormattedMessage 
            id='qcc.optional-sign-up-text' 
            defaultMessage='Optional: Sign up for benefits updates and offers' />
        </h2>
      );
    } else if (matchingQuestion.headerType === 'householdData') {
      return (
        <>
          <h2 className='household-data-sub-header'>
            <FormattedMessage
              id='qcc.so-far-text'
              defaultMessage='So far you’ve told us about:' />
          </h2>
          <h4 className='household-data-sub2-header'> 
            ⚫️
            <FormattedMessage
              id='qcc.you-text'
              defaultMessage=' You, ' />
            {formData.age} 
            <FormattedMessage
              id='qcc.hoh-text'
              defaultMessage=' Head of household' />
          </h4>
        </>
      );
    } else if (matchingQuestion.headerType === 'aboutYourself') {
      return (
        <div className='sub-header'>
          <FormattedMessage
            id='qcc.tell-us-text'
            defaultMessage='Tell us a little more about yourself.' />
          <h4 className='subheader-desc'>
            <FormattedMessage
              id='qcc.renderHeaderAndSubheader-subheader-desc'
              defaultMessage="You will have an opportunity to tell us about other household members in future questions." />
          </h4>
        </div>
      );
    } else if (matchingQuestion.headerType === 'aboutHousehold') {
      return (
        <div className='sub-header'>
          <FormattedMessage
            id='qcc.tell-us-about-household-text'
            defaultMessage='Tell us a little more about your household.' />
        </div>
      );
    }
  };

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
      {renderHeaderAndSubheader()}
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