import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { CardActionArea, Typography, Stack } from '@mui/material';
import { ErrorController } from '../../Types/ErrorController';
import { HouseholdData } from '../../Types/FormData';
import { useIntl } from 'react-intl';
import './OptionCardGroup.css';

interface OptionCardGroupProps {
  options: any; //change?
  memberData: HouseholdData;
  stateVariable: string;
  setMemberData: (householdMemberData: HouseholdData) => void;
  hhMemberIndex?: number;
}
const OptionCardGroup = ({
  options,
  stateVariable,
  memberData,
  setMemberData,
  hhMemberIndex,
}: OptionCardGroupProps) => {
  const intl = useIntl();

  const handleOptionCardClick = (optionName: string, stateVariable: string, memberData: HouseholdData, setMemberData: (householdMemberData: HouseholdData) => void) => {
    const updatedOption = !memberData[stateVariable][optionName];
    const updatedStateVariable = { ...memberData[stateVariable], [optionName]: updatedOption };

    setMemberData({
      ...memberData,
      [stateVariable]: updatedStateVariable,
    });
  };

  const displayOptionCards = (options: any, stateVariable, memberData: HouseholdData, hhMemberIndex: number) => {
    const optionCards = Object.keys(options).map((key, index) => {
      const optionKey = key as typeof options;
      let translatedAriaLabel = intl.formatMessage({
        id: options[optionKey].formattedMessage.props.id,
        defaultMessage: options[optionKey].formattedMessage.props.defaultMessage,
      });

      return (
        <CardActionArea
          key={hhMemberIndex + 'key' + index}
          sx={{ width: '11.25rem' }}
          className="card-action-area"
          onClick={() => {
            handleOptionCardClick(optionKey, stateVariable, memberData, setMemberData);
          }}
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              event.preventDefault();
            }
          }}
        >
          <Card
            className={memberData[stateVariable][optionKey] ? 'selected-option-card' : 'unselected-option-card'}
            sx={{ width: '11.25rem', height: '11.25rem', display: 'grid', placeItems: 'center' }}
          >
            <div className="option-card-image">
              <img src={options[optionKey].image} alt={translatedAriaLabel} />
            </div>
            <CardContent sx={{ textAlign: 'center', padding: '.35rem' }}>
              <Typography>{translatedAriaLabel}</Typography>
            </CardContent>
          </Card>
        </CardActionArea>
      );
    });

    return <div className="option-card-container">{optionCards}</div>;
  };

  return <Stack>{displayOptionCards(options, stateVariable, memberData, hhMemberIndex || 0)}</Stack>;
};

export default OptionCardGroup;
