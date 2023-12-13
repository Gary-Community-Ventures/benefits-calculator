import { useIntl } from 'react-intl';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { CardActionArea, Typography, Stack, Box } from '@mui/material';
import { ReactComponent as Checkmark } from '../../Assets/OptionCardIcons/checkmark.svg';
import './OptionCardGroup.css';

const OptionCardGroup = ({ options, stateVariable, memberData, setMemberData, hhMemberIndex }) => {
  const intl = useIntl();

  const handleOptionCardClick = (optionName, stateVariable, memberData, setMemberData) => {
    const updatedOption = !memberData[stateVariable][optionName];
    const updatedStateVariable = { ...memberData[stateVariable], [optionName]: updatedOption };

    setMemberData({
      ...memberData,
      [stateVariable]: updatedStateVariable,
    });
  };

  const displayOptionCards = (options, stateVariable, memberData, hhMemberIndex) => {
    const optionCards = Object.keys(options).map((optionKey, index) => {
      let translatedAriaLabel = intl.formatMessage({
        id: options[optionKey].formattedMessage.props.id,
        defaultMessage: options[optionKey].formattedMessage.props.defaultMessage,
      });

      return (
        <CardActionArea
          key={hhMemberIndex + 'key' + index}
          sx={{ width: '15rem' }}
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
          <Card className={memberData[stateVariable][optionKey] ? 'option-card selected-option-card' : 'option-card'}>
            <Stack direction="column" justifyContent="center" sx={{ flex: 1 }}>
              <CardContent sx={{ textAlign: 'center', padding: '0.5rem' }}>
                <Box>{options[optionKey].icon}</Box>
                <Typography>{translatedAriaLabel}</Typography>
              </CardContent>
            </Stack>
            {memberData[stateVariable][optionKey] && (
              <Stack direction="row" justifyContent="flex-end" alignItems="flex-end">
                <Checkmark alt="checked" className="checkmark" />
              </Stack>
            )}
          </Card>
        </CardActionArea>
      );
    });

    return <div className="option-cards-container">{optionCards}</div>;
  };

  return (
    <Stack sx={{ alignItems: 'center' }}>
      {displayOptionCards(options, stateVariable, memberData, hhMemberIndex || 0)}
    </Stack>
  );
};

export default OptionCardGroup;
