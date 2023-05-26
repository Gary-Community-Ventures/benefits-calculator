import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { CardActionArea, Typography } from '@mui/material';
import { useContext } from 'react';
import { Context } from '../Wrapper/Wrapper';
import { useIntl } from 'react-intl';
import './OptionCardGroup.css';

const OptionCardGroup = ({ stateVariable, options, errorController }) => {
  const { formData: state, setFormData: setState } = useContext(Context);
  const intl = useIntl();
  console.log(errorController.hasError);
  console.log(errorController.showError);

  const handleCardClick = (option) => {
    const currentStateVariableObj = { ...state[stateVariable] };
    const currentOptions = Object.keys(currentStateVariableObj);

    const updatedStateVariableObj = currentOptions.reduce((acc, key) => {
      if (option === key) {
        acc[key] = !currentStateVariableObj[key];
      } else {
        acc[key] = currentStateVariableObj[key];
      }
      return acc;
    }, {});

    errorController.updateError(updatedStateVariableObj);
    setState({ ...state, [stateVariable]: updatedStateVariableObj });
  };

  const createOptionCards = () => {
    const optionCards = Object.keys(options).map((optionKey, index) => {
      const translatedAriaLabel = intl.formatMessage({
        id: options[optionKey].formattedMessage.props.id,
      });
      return (
        <CardActionArea
          key={index}
          sx={{ width: '179px' }}
          className="card-action-area"
          onClick={() => {
            handleCardClick(optionKey);
          }}
        >
          <Card
            className={state[stateVariable][optionKey] ? 'selected-option-card' : 'unselected-option-card'}
            sx={{ width: '179px', height: '174px', display: 'grid', placeItems: 'center' }}
          >
            <div className="option-card-image">
              <img src={options[optionKey].image} alt={translatedAriaLabel} />
            </div>
            <CardContent sx={{ textAlign: 'center', padding: '.35rem' }}>
              <Typography>{options[optionKey].formattedMessage}</Typography>
            </CardContent>
          </Card>
        </CardActionArea>
      );
    });

    return optionCards;
  };
  return <div className="option-card-container">{createOptionCards()}</div>;
};

export default OptionCardGroup;
