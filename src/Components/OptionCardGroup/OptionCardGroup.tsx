import { useIntl } from 'react-intl';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { CardActionArea, Typography, Stack } from '@mui/material';
import { HouseholdData, FormData } from '../../Types/FormData';
import checkmark from '../../Assets/OptionCardIcons/checkmark.png';
import './OptionCardGroup.css';

interface OptionCardGroupProps {
  options: any;
  memberData: HouseholdData | FormData;
  stateVariable: string;
  setMemberData: (householdMemberData: HouseholdData | FormData) => void;
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

  const handleOptionCardClick = (optionName: string, stateVariable: string, memberData: HouseholdData | FormData, setMemberData: (householdMemberData: HouseholdData | FormData) => void) => {
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
          sx={{ width: '12rem' }}
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
            sx={{ display: 'flex', flexDirection: 'column', border: '.05px solid #6D6E71', height: '14rem' }}
          >
            <Stack direction="column" justifyContent="center" sx={{ flex: 1 }}>
              <CardContent sx={{ textAlign: 'center', padding: '.15rem' }}>
                <img src={options[optionKey].image} alt={translatedAriaLabel} className="option-card-image" />
                <Typography>{translatedAriaLabel}</Typography>
              </CardContent>
            </Stack>
            {memberData[stateVariable][optionKey] && (
              <Stack direction="row" justifyContent="flex-end" alignItems="flex-end">
                <img src={checkmark} alt="checked" className="checkmark" />
              </Stack>
            )}
          </Card>
        </CardActionArea>
      );
    });

    return <div className="option-cards-container">{optionCards}</div>;
  };

  return <Stack>{displayOptionCards(options, stateVariable, memberData, hhMemberIndex || 0)}</Stack>;
};

export default OptionCardGroup;
