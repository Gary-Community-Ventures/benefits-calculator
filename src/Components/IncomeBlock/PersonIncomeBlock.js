import { FormattedMessage } from 'react-intl';
import { Button } from '@mui/material';
import { useEffect, useState } from 'react';
import IncomeQuestion from './IncomeQuestion';
import './IncomeBlock.css';
import { IconButton } from '@mui/material';
import { HelpBubbleIcon } from '../../Assets/helpBubbleIcon.tsx';

const PersonIncomeBlock = ({ householdData, setHouseholdData, page, submitted }) => {
  //if there are any elements in state for incomeStreams create IncomeBlock components for those
  //first by assigning them to the initial selectedMenuItem state
  //if not then create the initial income block questions
  const [selectedMenuItem, setSelectedMenuItem] = useState(
    householdData.incomeStreams.length > 0
      ? householdData.incomeStreams
      : [
          {
            incomeStreamName: '',
            incomeAmount: '',
            incomeFrequency: '',
            hoursPerWeek: '',
          },
        ],
  );
  const [showHelpText, setShowHelpText] = useState(false);


  useEffect(() => {
    setHouseholdData({ ...householdData, incomeStreams: selectedMenuItem });
  }, [selectedMenuItem]);

  const createIncomeBlockQuestions = () => {
    return selectedMenuItem.map((incomeSourceData, index) => {
      return (
        <IncomeQuestion
          currentIncomeSource={incomeSourceData}
          allIncomeSources={selectedMenuItem}
          setAllIncomeSources={setSelectedMenuItem}
          householdData={householdData}
          setHouseholdData={setHouseholdData}
          index={index}
          page={page}
          submitted={submitted}
          key={index}
        />
      );
    });
  };

  const handleAddAdditionalIncomeSource = (event) => {
    event.preventDefault();
    setSelectedMenuItem([
      ...selectedMenuItem,
      {
        incomeStreamName: '',
        incomeAmount: '',
        incomeFrequency: '',
        hoursPerWeek: '',
      },
    ]);
  };

  const renderReturnStmtIdOrDefaultMsg = (page) => {
    let formattedMsgId = 'questions.hasIncome-a';
    let formattedMsgDefaultMsg = 'What type of income have you had most recently?';

    if (page !== 1) {
      formattedMsgId = 'personIncomeBlock.return-questionLabel';
      formattedMsgDefaultMsg = 'What type of income have they had most recently?';
    }

    return [formattedMsgId, formattedMsgDefaultMsg];
  };
  const handleClick = () => {
    setShowHelpText((setShow) => !setShow);
  };

  return (
    <>
      <h2 className="question-label radio-question">
        <FormattedMessage
          id={renderReturnStmtIdOrDefaultMsg(page)[0]}
          defaultMessage={renderReturnStmtIdOrDefaultMsg(page)[1]}
        />
          <IconButton onClick={handleClick} >
            <HelpBubbleIcon/>
          </IconButton>
      </h2>
    

      <p className="question-description help-text">
      {showHelpText && (
        <FormattedMessage
          id="personIncomeBlock.return-questionDescription"
          defaultMessage="Answer the best you can. You will be able to include additional types of income. The more you include, the more accurate your results will be."
        />)}
      </p>
      {createIncomeBlockQuestions()}
      <Button variant="contained" onClick={(event) => handleAddAdditionalIncomeSource(event)}>
        <FormattedMessage id="personIncomeBlock.return-addIncomeButton" defaultMessage="Add another income" />
      </Button>
    </>
  );
};

export default PersonIncomeBlock;
