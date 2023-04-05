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
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import AccordionsContainer from '../../Components/AccordionsContainer/AccordionsContainer';
import stepDirectory from '../../Assets/stepDirectory';
import ProgressBar from '../ProgressBar/ProgressBar';
import OptionCardGroup from '../OptionCardGroup/OptionCardGroup';
import questions from '../../Assets/questions';
import { zipcodeHasError } from '../../Assets/validationFunctions';
import './QuestionComponentContainer.css';

const QuestionComponentContainer = ({ formData, handleTextfieldChange, handleContinueSubmit, handleRadioButtonChange,
  handleIncomeStreamsSubmit, handleExpenseSourcesSubmit, handleHouseholdDataSubmit, setFormData,
  handleCheckboxChange }) => {
  let { id } = useParams();
  let numberId = Number(id);
  const matchingQuestion = questions[numberId];

  const createHouseholdDataBlock = () => {
    return (
      <div className='question-container' id={id}>
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

  const renderOptionCardGroup = (question) => {
    return (
      <OptionCardGroup
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
    // this is specifically for step 5 error handling
    const isHealthInsuranceQ = matchingQuestion.name === 'healthInsurance';
    const helperText = isHealthInsuranceQ && matchingQuestion.componentDetails.inputHelperText(formData[matchingQuestion.name]);
    const hasError = isHealthInsuranceQ && matchingQuestion.componentDetails.inputError(formData[matchingQuestion.name]);

    return (
      <div className='question-container' id={id}>
        <p className='question-label'>{matchingQuestion.question}</p>
        {matchingQuestion.questionDescription && <p className='question-description'>{matchingQuestion.questionDescription}</p>}
        {component}
        {shouldRenderFollowUpQuestions(hasFollowUpQuestions, inputName) && renderFollowUpQuestions()}
        {isHealthInsuranceQ && hasError && <ErrorMessage error={helperText} />}
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
      } else if (followUp.componentDetails.componentType === 'AccordionContainer') {
        const hasError = matchingQuestion.componentDetails.inputError(formData.hasBenefits, formData);
        const errorText = matchingQuestion.componentDetails.inputHelperText(formData.hasBenefits, formData);

        return (
          <div className='question-container accordions-container' key={index}>
            <p className='question-label'>{followUp.question}</p>
            <p className='question-description'>{matchingQuestion.followUpQuestions[0].questionDescription}</p>
            <AccordionsContainer
              formData={formData}
              setFormData={setFormData}
            />
            { hasError && <ErrorMessage error={errorText} /> }
          </div>
        );
      }
    });
  }

  const createPreviousAndContinueButtons = (question) => {
    //render normal button block if the question isn't the income or expense question OR
    //if the user doesn't have an income/expenses at all,
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
            defaultMessage='Optional: Sign up for benefits updates and/or paid feedback opportunities' />
        </h2>
      );
    } else if (matchingQuestion.headerType === 'aboutYourself') {
      return (
        <div className='sub-header'>
          <FormattedMessage
            id='qcc.tell-us-text'
            defaultMessage='Tell us a little more about yourself.' />
        </div>
      );
    } else if (matchingQuestion.headerType === 'aboutHousehold') {
      if (matchingQuestion.name === 'hasBenefits' || matchingQuestion.name === 'acuteHHConditions') {
        return (
          <div className='sub-header'>
            <FormattedMessage
              id='qcc.tell-us-final-text'
              defaultMessage='Tell us some final information about your household.' />
          </div>
        )
      } else if (matchingQuestion.name === 'referralSource') {
        return (
          <div className='sub-header'>
            <FormattedMessage
              id='questions.referralSource'
              defaultMessage='How did you hear about this screener?' />
          </div>
        )
      } else {
        return (
          <div className='sub-header'>
            <FormattedMessage
              id='qcc.tell-us-text'
              defaultMessage='Tell us about your household.' />
          </div>
      );
      }

    }
  };

  const totalNumberOfQuestions = () => {
    return Object.keys(stepDirectory).length + 2;
  }

  return (
    <main className='benefits-form'>
      <ProgressBar step={id}/>
      <p className='step-progress-title'>
        <FormattedMessage
          id='qcc.step-text'
          defaultMessage='Step ' />
        {id}
        <FormattedMessage
          id='qcc.of-text'
          defaultMessage=' of ' />
        {totalNumberOfQuestions()}
      </p>
      {renderHeaderAndSubheader()}
      {
        ( matchingQuestion.componentDetails.componentType === 'Textfield' && createComponent(renderTextfieldComponent(matchingQuestion)) ) ||
        ( matchingQuestion.componentDetails.componentType === 'Radiofield' && createComponent(renderRadiofieldComponent(matchingQuestion)) ) ||
        ( matchingQuestion.componentDetails.componentType === 'HouseholdDataBlock' && createHouseholdDataBlock() ) ||
        ( matchingQuestion.componentDetails.componentType === 'BasicCheckboxGroup' && createComponent(renderBasicCheckboxGroup(matchingQuestion)) ) ||
        ( matchingQuestion.componentDetails.componentType === 'OptionCardGroup' && createComponent(renderOptionCardGroup(matchingQuestion)) ) ||
        ( matchingQuestion.componentDetails.componentType === 'BasicSelect' && createComponent(renderBasicSelectComponent(matchingQuestion)) )
      }
    </main>
  );
}

export default QuestionComponentContainer;
