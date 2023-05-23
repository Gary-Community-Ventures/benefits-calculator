import { FormattedMessage } from 'react-intl';
import bill from './OptionCardIcons/bill.png';
import building from './OptionCardIcons/building.png';
import padlock from './OptionCardIcons/padlock.png';
import redX from './OptionCardIcons/redX.png';
import teddyDoctor from './OptionCardIcons/teddyDoctor.png';
import umbrella from './OptionCardIcons/umbrella.png';

const healthInsuranceOptions = {
  employer: {
    formattedMessage: (
      <FormattedMessage
        id='healthInsuranceOptions.employer'
        defaultMessage='Employer-provided health insurance'
      />
    ),
    image: building,
  },
  private: {
    formattedMessage: (
      <FormattedMessage
        id='healthInsuranceOptions.private'
        defaultMessage='Private health insurance'
      />
    ),
    image: padlock,
  },
  medicaid: {
    formattedMessage: (
      <FormattedMessage
        id='healthInsuranceOptions.medicaid'
        defaultMessage='Health First Colorado (Medicaid)'
      />
    ),
    image: bill,
  },
  medicare: {
    formattedMessage: (
      <FormattedMessage id='healthInsuranceOptions.medicare' defaultMessage='Medicare' />
    ),
    image: umbrella,
  },
  chp: {
    formattedMessage: (
      <FormattedMessage
        id='healthInsuranceOptions.chp'
        defaultMessage='Child Health Plan Plus (CHP+)'
      />
    ),
    image: teddyDoctor,
  },
  none: {
    formattedMessage: (
      <FormattedMessage
        id='healthInsuranceOptions.none'
        defaultMessage='One or more household member(s) do not have health insurance'
      />
    ),
    image: redX,
  },
};

export default healthInsuranceOptions;
