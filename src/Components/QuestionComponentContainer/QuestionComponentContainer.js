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
import taxYearOptions from '../../Assets/taxYearOptions';
import referralOptions from '../../Assets/referralOptions';
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

  const createTaxDropdownMenu = () => {
    const taxComponentProperties = {
      labelId: 'tax-year-select-label',
      inputLabelText: 
        <FormattedMessage
          id='qcc.createTaxDropdownMenu-label'
          defaultMessage='Tax year'
        />,
      id:'tax-year-select',
      value: 'lastTaxFilingYear',
      label: 
        <FormattedMessage
          id='qcc.createTaxDropdownMenu-label'
          defaultMessage='Tax year'
        />,
      disabledSelectMenuItemText: 
        <FormattedMessage
          id='qcc.createTaxDropdownMenu-disabledSelectMenuItemText'
          defaultMessage='Select a Tax Year' />
    };

    return createBasicSelectMenu(taxComponentProperties, taxYearOptions);
  }

  const createReferralDropdownMenu = () => {
    const referralComponentProperties = {
      labelId: 'referral-source-select-label',
      inputLabelText: 
        <FormattedMessage
          id='qcc.createReferralDropdownMenu-label'
          defaultMessage='Referral Source'
        />,
      id:'referral-source-select',
      value: 'referralSource',
      label: 
        <FormattedMessage
          id='qcc.createReferralDropdownMenu-label'
          defaultMessage='Referral Source'
        />,
      disabledSelectMenuItemText: 
        <FormattedMessage
          id='qcc.createReferralDropdownMenu-disabledSelectMenuItemText'
          defaultMessage='Select a source' />
    };

    return createBasicSelectMenu(referralComponentProperties, referralOptions);
  }

  const createBasicSelectMenu = (componentProperties, options) => {
    return (
      <div className='question-container' id={matchingQuestion.id}>
        <p className='question-label'>{matchingQuestion.question}</p>
        {matchingQuestion.questionDescription && <p className='question-description'>{matchingQuestion.questionDescription}</p>}
          <BasicSelect
            componentProperties={componentProperties}
            setFormData={setFormData}
            formData={formData} 
            options={options} 
            formDataProperty={componentProperties.value} />
        {matchingQuestion.followUpQuestions && formData[componentProperties.value] === 'other' && renderFollowUpQuestions()}
        {createPreviousAndContinueButtons(matchingQuestion)}
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

  const createBasicCheckboxGroup = () => {
    return (
      <div className='question-container' id={matchingQuestion.id}>
        <p className='question-label'>{matchingQuestion.question}</p>
        {matchingQuestion.questionDescription && <p className='question-description'>{matchingQuestion.questionDescription}</p>}
        <BasicCheckboxGroup
          stateVariable={matchingQuestion.componentDetails.inputName}
          options={matchingQuestion.componentDetails.options}
          state={formData}
          setState={setFormData} />
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
        ( matchingQuestion.componentDetails.componentType === 'Textfield' && createTextfieldComponent() ) ||
        ( matchingQuestion.componentDetails.componentType === 'Radiofield' && createRadiofieldComponent() ) ||
        ( matchingQuestion.componentDetails.componentType === 'HouseholdDataBlock' && createHouseholdDataBlock() ) ||
        ( matchingQuestion.componentDetails.componentType === 'BasicCheckboxGroup' && createBasicCheckboxGroup() ) ||
        ( matchingQuestion.componentDetails.inputName === 'lastTaxFilingYear' && createTaxDropdownMenu() ) ||
        ( matchingQuestion.componentDetails.inputName === 'referralSource' && createReferralDropdownMenu() )
      }
    </main>
  );

}

export default QuestionComponentContainer;