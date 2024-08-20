import { FormattedMessage } from 'react-intl';
import { Button, Box } from '@mui/material';
import { useEffect, useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import IncomeQuestion from './IncomeQuestion';
import HelpButton from '../../Components/HelpBubbleIcon/HelpButton.tsx';
import './PersonIncomeBlock.css';
import QuestionQuestion from '../QuestionComponents/QuestionQuestion';

const PersonIncomeBlock = ({ memberData, setMemberData, page, submitted }) => {
  //if there are any elements in state for incomeStreams create IncomeBlock components for those
  //first by assigning them to the initial selectedMenuItem state
  //if not then create the initial income block questions
  const [selectedMenuItem, setSelectedMenuItem] = useState(
    memberData.incomeStreams.length > 0
      ? memberData.incomeStreams
      : [
          {
            incomeStreamName: '',
            incomeAmount: '',
            incomeFrequency: '',
            hoursPerWeek: '',
          },
        ],
  );

  useEffect(() => {
    setMemberData({ ...memberData, incomeStreams: selectedMenuItem });
  }, [selectedMenuItem]);

  const createIncomeBlockQuestions = () => {
    return selectedMenuItem.map((incomeSourceData, index) => {
      return (
        <IncomeQuestion
          currentIncomeSource={incomeSourceData}
          allIncomeSources={selectedMenuItem}
          setAllIncomeSources={setSelectedMenuItem}
          memberData={memberData}
          setMemberData={setMemberData}
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

  const renderFollowUpIncomeQIdAndDefaultMsg = (page) => {
    let formattedMsgId = 'questions.hasIncome-a';
    let formattedMsgDefaultMsg = 'What type of income have you had most recently?';

    if (page !== 1) {
      formattedMsgId = 'personIncomeBlock.return-questionLabel';
      formattedMsgDefaultMsg = 'What type of income have they had most recently?';
    }

    return [formattedMsgId, formattedMsgDefaultMsg];
  };

  return (
    <>
      <div className="section-container">
        <div className="section">
          <QuestionQuestion>
            <FormattedMessage
              id={renderFollowUpIncomeQIdAndDefaultMsg(page)[0]}
              defaultMessage={renderFollowUpIncomeQIdAndDefaultMsg(page)[1]}
            />
            <HelpButton
              helpText="Answer the best you can. You will be able to include additional types of income. The more you include, the more accurate your results will be."
              helpId="personIncomeBlock.return-questionDescription"
            />
          </QuestionQuestion>
        </div>
      </div>
      {createIncomeBlockQuestions()}
      <div>
        <Button
          variant="outlined"
          onClick={(event) => handleAddAdditionalIncomeSource(event)}
          startIcon={<AddIcon sx={{ fontSize: 'medium !important', mr: '-0.5rem' }} />}
        >
          <FormattedMessage id="personIncomeBlock.return-addIncomeButton" defaultMessage="Add another income" />
        </Button>
      </div>
    </>
  );
};

export default PersonIncomeBlock;
