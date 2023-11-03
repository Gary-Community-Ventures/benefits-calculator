import { FormattedMessage, useIntl } from 'react-intl';
import { useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { CardActionArea, Typography, Stack, FormHelperText } from '@mui/material';
import healthInsuranceOptions, { HealthInsuranceOptions } from '../../Assets/healthInsuranceOptions.tsx';
import { HouseholdData, HealthInsurance } from '../../Types/FormData';
import {
  useErrorController,
  healthInsuranceDataHasError,
  getHealthInsuranceError,
} from '../../Assets/validationFunctions';
import '../OptionCardGroup/OptionCardGroup.css';

interface HealthInsuranceProps {
  hhMemberIndex: number;
  householdMemberData: HouseholdData;
  setHouseholdMemberData: (householdMemberData: HouseholdData) => void;
  submitted: number;
}

const HealthInsuranceQ = ({
  hhMemberIndex,
  householdMemberData,
  setHouseholdMemberData,
  submitted,
}: HealthInsuranceProps) => {
  const { healthInsurance } = householdMemberData;
  const healthInsuranceErrorController = useErrorController(healthInsuranceDataHasError, getHealthInsuranceError);
  const intl = useIntl();

  useEffect(() => {
    healthInsuranceErrorController.setSubmittedCount(submitted);
  }, [submitted]);

  useEffect(() => {
    healthInsuranceErrorController.updateError(healthInsurance);
  });

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
    const updatedHealthInsuranceOption = !hhMemberData.healthInsurance[optionName];

    setHouseholdMemberData({
      ...hhMemberData,
      healthInsurance: { ...hhMemberData.healthInsurance, [optionName]: updatedHealthInsuranceOption },
    });
  };

  const displayHealthInsuranceOptionCards = (
    healthCareOptions: HealthInsuranceOptions,
    householdMemberIns: HealthInsurance,
    hhMemberIndex: number,
  ) => {
    const optionCards = Object.keys(healthCareOptions).map((key, index) => {
      const optionKey = key as keyof HealthInsuranceOptions;
      let translatedAriaLabel = intl.formatMessage({
        id: healthCareOptions[optionKey].formattedMessage.props.id,
        defaultMessage: healthCareOptions[optionKey].formattedMessage.props.defaultMessage,
      });

      const youDoNotHaveHealthInsuranceFM = intl.formatMessage({
        id: 'healthInsuranceOptions.none-I',
        defaultMessage: 'I do not have health insurance',
      });

      if (hhMemberIndex === 1 && key === 'none') {
        translatedAriaLabel = youDoNotHaveHealthInsuranceFM;
      }

      return (
        <CardActionArea
          key={hhMemberIndex + 'key' + index}
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
              <Typography>{translatedAriaLabel}</Typography>
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
      {displayHealthInsuranceOptionCards(healthInsuranceOptions, healthInsurance, hhMemberIndex)}
      {healthInsuranceErrorController.showError && (
        <FormHelperText>{healthInsuranceErrorController.message(healthInsurance)}</FormHelperText>
      )}
    </Stack>
  );
};

export default HealthInsuranceQ;
