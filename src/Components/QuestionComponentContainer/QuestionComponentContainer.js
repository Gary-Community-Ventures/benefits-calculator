import { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useConfig } from '../Config/configHook.tsx';
import { Context } from '../Wrapper/Wrapper.tsx';
import Radiofield from '../Radiofield/Radiofield';
import Textfield from '../Textfield/Textfield.js';
import PreviousButton from '../PreviousButton/PreviousButton';
import ContinueButton from '../ContinueButton/ContinueButton';
import BasicSelect from '../DropdownMenu/BasicSelect';
import BasicCheckboxGroup from '../CheckboxGroup/BasicCheckboxGroup';
import OptionCardGroup from '../OptionCardGroup/OptionCardGroup';
import FollowUpQuestions from '../FollowUpQuestions/FollowUpQuestions';
import { useErrorController } from '../../Assets/validationFunctions.tsx';
import { Zipcode } from '../Steps/Zipcode.tsx';
import Expenses from '../Steps/Expenses/Expenses.tsx';
import HouseholdSize from '../Steps/HouseholdSize';
import QuestionLeadText from '../QuestionComponents/QuestionLeadText';
import QuestionQuestion from '../QuestionComponents/QuestionQuestion';
import QuestionDescription from '../QuestionComponents/QuestionDescription';
import QuestionHeader from '../QuestionComponents/QuestionHeader';
import { useStepName } from '../../Assets/stepDirectory';
import ReferralSourceStep from '../Steps/Referrer';
import questions from '../../Assets/questions';
import { QUESTION_TITLES } from '../../Assets/pageTitleTags';
import './QuestionComponentContainer.css';

const QuestionComponentContainer = ({
  handleTextfieldChange,
  handleContinueSubmit,
  handleRadioButtonChange,
  handleNoAnswerChange,
  handleIncomeStreamsSubmit,
  handleExpenseSourcesSubmit,
  handleCheckboxChange,
}) => {
  const { formData, setFormData } = useContext(Context);
  const acuteConditionOptions = useConfig('acute_condition_options');
  const referralOptions = useConfig('referral_options');
  const signUpOptions = useConfig('sign_up_options');
  let { id } = useParams();
  const questionName = useStepName(+id, formData.immutableReferrer);
  const matchingQuestion = questions[questionName];
  const errorController = useErrorController(
    matchingQuestion?.componentDetails.inputError,
    matchingQuestion?.componentDetails.inputHelperText,
  );

  const renderTextfieldComponent = (question) => {
    return (
      <Textfield
        componentDetails={question.componentDetails}
        data={formData}
        handleTextfieldChange={handleTextfieldChange}
        submitted={errorController.submittedCount}
      />
    );
  };

  const renderRadiofieldComponent = (question) => {
    return (
      <Radiofield componentDetails={question.componentDetails} handleRadioButtonChange={handleRadioButtonChange} />
    );
  };

  const renderNoAnswerComponent = (question) => {
    return (
      <Radiofield
        componentDetails={question.componentDetails}
        handleRadioButtonChange={handleNoAnswerChange}
        preferNotToAnswer={true}
      />
    );
  };

  const renderBasicCheckboxGroup = (question) => {
    if (question.name === 'signUpInfo')
      return <BasicCheckboxGroup stateVariable={question.componentDetails.inputName} options={signUpOptions} />;
    return (
      <BasicCheckboxGroup
        stateVariable={question.componentDetails.inputName}
        options={matchingQuestion.componentDetails.options}
      />
    );
  };

  const renderOptionCardGroup = (question) => {
    if (question.name === 'acuteHHConditions')
      return (
        <OptionCardGroup
          options={acuteConditionOptions}
          stateVariable={question.componentDetails.inputName}
          memberData={formData}
          setMemberData={setFormData}
        />
      );

    return (
      <OptionCardGroup
        options={matchingQuestion.componentDetails.options}
        stateVariable={question.componentDetails.inputName}
        memberData={formData}
        setMemberData={setFormData}
      />
    );
  };

  const renderBasicSelectComponent = (question) => {
    if (question.name === 'referralSource')
      return (
        <BasicSelect
          componentDetails={question.componentDetails}
          options={referralOptions}
          formDataProperty={question.componentDetails.inputName}
          submitted={errorController.submittedCount}
        />
      );
    return (
      <BasicSelect
        componentDetails={question.componentDetails}
        options={question.componentDetails.options}
        formDataProperty={question.componentDetails.inputName}
        submitted={errorController.submittedCount}
      />
    );
  };

  const createComponent = (component) => {
    const inputName = matchingQuestion.componentDetails.inputName;
    const { followUpQuestions } = matchingQuestion;
    const hasFollowUpQuestions = followUpQuestions && followUpQuestions.length > 0;
    // this is specifically for health & referral q error handling
    const isHealthQuestion = inputName === 'healthInsurance';

    return (
      <div>
        <QuestionQuestion>{matchingQuestion.question}</QuestionQuestion>
        {matchingQuestion.questionDescription && (
          <>
            <QuestionDescription>{matchingQuestion.questionDescription}</QuestionDescription>
          </>
        )}
        {component}
        {shouldRenderFollowUpQuestions(hasFollowUpQuestions, inputName) && (
          <FollowUpQuestions
            followUpQuestions={matchingQuestion.followUpQuestions}
            submitted={errorController.submittedCount}
            formData={formData}
            handleCheckboxChange={handleCheckboxChange}
            handleExpenseSourcesSubmit={handleExpenseSourcesSubmit}
            handleIncomeStreamsSubmit={handleIncomeStreamsSubmit}
            handleTextfieldChange={handleTextfieldChange}
          />
        )}
        {isHealthQuestion && errorController.showError && errorController.message(formData[inputName])}
        {createPreviousAndContinueButtons()}
      </div>
    );
  };

  const shouldRenderFollowUpQuestions = (hasFollowUpQuestions, inputName) => {
    if (!hasFollowUpQuestions) {
      return false;
    }

    if (formData[inputName] === true) {
      // this case is for a radio button question where the user selected "yes"
      return true;
    }
    if (formData[inputName] === 'true') {
      // this case is for a radio button with prefer not to answer where the use selected "yes"
      return true;
    }
    if (formData[inputName] === 'other') {
      // this case is for the referral source question where the user selected "other"
      return true;
    }
    if (
      inputName === 'signUpInfo' &&
      (formData.signUpInfo.sendUpdates || formData.signUpInfo.sendOffers) &&
      !formData.signUpInfo.hasUser
    ) {
      return true;
    }

    return false;
  };

  const createPreviousAndContinueButtons = () => {
    //render normal button block if the question isn't the income or expense question OR
    //if the user doesn't have an income/expenses at all,
    //otherwise these buttons will be created in the IncomeBlock/ExpenseBlock components
    const isNotIncomeAndNotExpenseQ = matchingQuestion.name !== 'hasIncome' && matchingQuestion.name !== 'hasExpenses';
    const hasFalsyIncome =
      matchingQuestion.name === 'hasIncome' && formData[matchingQuestion.componentDetails.inputName] === false;
    const hasFalsyExpense =
      matchingQuestion.name === 'hasExpenses' && formData[matchingQuestion.componentDetails.inputName] === false;

    if (isNotIncomeAndNotExpenseQ || hasFalsyIncome || hasFalsyExpense) {
      return (
        <div className="question-buttons">
          <PreviousButton questionName={matchingQuestion.name} />
          <ContinueButton
            handleContinueSubmit={handleContinueSubmit}
            errorController={errorController}
            inputName={matchingQuestion.componentDetails.inputName}
            questionName={matchingQuestion.name}
          />
        </div>
      );
    }
  };

  const renderHeaderAndSubheader = () => {
    return (
      <>
        {matchingQuestion.subheader && <QuestionLeadText>{matchingQuestion.subheader}</QuestionLeadText>}
        {matchingQuestion.header && <QuestionHeader>{matchingQuestion.header}</QuestionHeader>}
      </>
    );
  };

  useEffect(() => {
    document.title = QUESTION_TITLES[questionName];
  }, [questionName]);

  switch (questionName) {
    case 'zipcode':
      return (
        <main className="benefits-form">
          <Zipcode />
        </main>
      );
    case 'householdSize':
      return (
        <main className="benefits-form">
          <HouseholdSize />
        </main>
      );
    case 'referralSource':
      return (
        <main className="benefits-form">
          <ReferralSourceStep />
        </main>
      );
    case 'hasExpenses':
      return (
        <main className="benefits-form">
          <Expenses />
        </main>
      );
    default:
      return (
        <main className="benefits-form">
          {renderHeaderAndSubheader()}
          {(matchingQuestion.componentDetails.componentType === 'Textfield' &&
            createComponent(renderTextfieldComponent(matchingQuestion))) ||
            (matchingQuestion.componentDetails.componentType === 'Radiofield' &&
              createComponent(renderRadiofieldComponent(matchingQuestion))) ||
            (matchingQuestion.componentDetails.componentType === 'PreferNotToAnswer' &&
              createComponent(renderNoAnswerComponent(matchingQuestion))) ||
            (matchingQuestion.componentDetails.componentType === 'BasicCheckboxGroup' &&
              createComponent(renderBasicCheckboxGroup(matchingQuestion))) ||
            (matchingQuestion.componentDetails.componentType === 'OptionCardGroup' &&
              createComponent(renderOptionCardGroup(matchingQuestion))) ||
            (matchingQuestion.componentDetails.componentType === 'BasicSelect' &&
              createComponent(renderBasicSelectComponent(matchingQuestion)))}
        </main>
      );
  }
};

export default QuestionComponentContainer;
