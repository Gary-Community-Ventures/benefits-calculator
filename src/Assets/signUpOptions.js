import { FormattedMessage } from 'react-intl';

const signUpOptions = {
  sendUpdates: (
    <FormattedMessage
      id='signUpOptions.sendUpdates'
      defaultMessage='Please notify me when new benefits become available to me that I am likely eligible for based on the information I have provided.'
    />
  ),
  sendOffers: (
    <FormattedMessage
      id='signUpOptions.sendOffers'
      defaultMessage='Please notify me when there are paid opportunities to provide feedback on this screener.'
    />
  ),
};

export default signUpOptions;
