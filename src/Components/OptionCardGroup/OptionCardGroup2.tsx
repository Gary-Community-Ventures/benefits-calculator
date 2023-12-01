import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { CardActionArea, Typography, Stack, FormHelperText } from '@mui/material';
import { ErrorController } from '../../Types/ErrorController';
import { HouseholdData } from '../../Types/FormData';
import { FormattedMessage, useIntl } from 'react-intl';


interface OptionCardGroupProps {
  options: any; //change?
  memberData: HouseholdData;
  // setMemberData: (householdMemberData: HouseholdData) => void;
  hhMemberIndex?: number;
  youVsThemOptions: any; //change?
  handleCardClick: any; //change?
  errorController: ErrorController;
}
const OptionCardGroup2 = ({
  options,
  memberData,
  // setMemberData,
  hhMemberIndex,
  youVsThemOptions,
  handleCardClick,
  errorController,
}: OptionCardGroupProps) => {
  const intl = useIntl();

  const displayOptionCards = (
    options: any,
    memberData: HouseholdData,
    hhMemberIndex: number,
  ) => {

    const optionCards = Object.keys(options).map((key, index) => {
      const optionKey = key as typeof options;
      let translatedAriaLabel = intl.formatMessage({
        id: options[optionKey].formattedMessage.props.id,
        defaultMessage: options[optionKey].formattedMessage.props.defaultMessage,
      });
      console.log({hhMemberIndex})
      // console.log(`youVsThemOptions.you`, youVsThemOptions.you.props.defaultMessage);
      // console.log({translatedAriaLabel})
          console.log(youVsThemOptions);

      if (hhMemberIndex === 1 && index === 0) { //if it's the first optionCard
        console.log(`in here`)
        translatedAriaLabel = youVsThemOptions.you.props.defaultMessage;
      }

      return (
        <CardActionArea
          key={hhMemberIndex + 'key' + index}
          sx={{ width: '11.25rem' }}
          className="card-action-area"
          onClick={() => {
            handleCardClick(optionKey, memberData);
          }}
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              event.preventDefault();
            }
          }}
        >
          <Card
            className={options[optionKey] ? 'selected-option-card' : 'unselected-option-card'}
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

  return <Stack>{displayOptionCards(options, memberData, hhMemberIndex || 0)}</Stack>;
};

export default OptionCardGroup2;
