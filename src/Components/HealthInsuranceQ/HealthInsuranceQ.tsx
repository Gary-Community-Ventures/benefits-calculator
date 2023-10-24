import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { CardActionArea, Typography, Stack } from '@mui/material';
import { FormattedMessage, useIntl } from "react-intl";
import healthInsuranceOptions, { HealthInsuranceOptions } from "../../Assets/healthInsuranceOptions";
import { HouseholdData, HealthInsurance } from "../../Types/FormData";
import '../OptionCardGroup/OptionCardGroup.css';

interface HealthInsuranceProps {
  hhMemberIndex: number;
  householdMemberData: HouseholdData;
  setHouseholdMemberData: (householdMemberData: HouseholdData) => void;
}

const HealthInsuranceQ = ({ hhMemberIndex, householdMemberData, setHouseholdMemberData }: HealthInsuranceProps) => {
  const { healthInsurance } = householdMemberData;
  const intl = useIntl();

  const displayQuestion = (page: number) => {
    if (page === 1) {
      return (
        <h2 className="question-label">
          <FormattedMessage
            id="questions.healthInsurance-you"
            defaultMessage="Which type of health insurance do you have?"
          />
        </h2>
      );
    } else {
      return (
        <h2 className="question-label">
          <FormattedMessage
            id="questions.healthInsurance-they"
            defaultMessage="What type of health insurance do they have?"
          />
        </h2>
      );
    }
  };

  const handleCardClick = (optionName: keyof HealthInsuranceOptions, hhMemberData: HouseholdData) => {
    const currentHHMInsurance: HealthInsurance = { ...healthInsurance };
    const currentHealthInsOptionKeys = Object.keys(currentHHMInsurance) as (keyof HealthInsurance)[];

    const updatedHHMInsurance = currentHealthInsOptionKeys.reduce((acc, key) => {
      if (optionName === key) {
        acc[key] = !currentHHMInsurance[key];
      } else {
        acc[key] = currentHHMInsurance[key];
      }
      return acc;
    }, {} as HealthInsurance);

    setHouseholdMemberData({ ...hhMemberData, healthInsurance: updatedHHMInsurance });
  };

  const displayHealthInsuranceOptionCards = (
    healthCareOptions: HealthInsuranceOptions,
    householdMemberIns: HealthInsurance,
    hhMemberIndex: number,
  ) => {
    const optionCards = Object.keys(healthCareOptions).map((key, index) => {
      const optionKey = key as keyof HealthInsuranceOptions;
      const translatedAriaLabel = intl.formatMessage({
        id: healthCareOptions[optionKey].formattedMessage.props.id,
        defaultMessage: healthCareOptions[optionKey].formattedMessage.props.defaultMessage,
      });

      return (
        <CardActionArea
          key={hhMemberIndex + index}
          sx={{ width: '11.25rem' }}
          className="card-action-area"
          onClick={() => {
            handleCardClick(optionKey, householdMemberData);
          }}
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              event.preventDefault();
            }
          }}
        >
          <Card
            className={householdMemberIns[optionKey] ? 'selected-option-card' : 'unselected-option-card'}
            sx={{ width: '11.25rem', height: '11.25rem', display: 'grid', placeItems: 'center' }}
          >
            <div className="option-card-image">
              <img src={healthCareOptions[optionKey].image} alt={translatedAriaLabel} />
            </div>
            <CardContent sx={{ textAlign: 'center', padding: '.35rem' }}>
              <Typography>{healthCareOptions[optionKey].formattedMessage}</Typography>
            </CardContent>
          </Card>
        </CardActionArea>
      );
    });

    return <div className="option-card-container">{optionCards}</div>;
  };

  return (
    <Stack>
      {displayQuestion(hhMemberIndex)}
      <div className="option-card-container">
        {displayHealthInsuranceOptionCards(healthInsuranceOptions, healthInsurance, hhMemberIndex)}
      </div>
    </Stack>
  );
};

export default HealthInsuranceQ;