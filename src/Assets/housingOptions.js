import { FormattedMessage } from 'react-intl';

const housingOptions = {
  renting: 
    <FormattedMessage
      id='housingOptions.renting'
      defaultMessage='Renting' />,
  owner: 
    <FormattedMessage
      id='housingOptions.owner'
      defaultMessage='You or a household member owns the home or apartment' />,
  stayingWithFriend: 
    <FormattedMessage
      id='housingOptions.stayingWithFriend'
      defaultMessage='Staying with friend' />,
  hotel: 
    <FormattedMessage
      id='housingOptions.hotel'
      defaultMessage='In a hotel' />,
  shelter: 
    <FormattedMessage
      id='housingOptions.shelter'
      defaultMessage='In a shelter or homeless' />,
  preferNotToSay: 
    <FormattedMessage
      id='housingOptions.preferNotToSay'
      defaultMessage='Prefer not to say' />,
};

export default housingOptions;