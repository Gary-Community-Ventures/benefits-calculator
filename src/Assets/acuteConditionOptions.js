import { FormattedMessage } from 'react-intl';
import cart from './OptionCardIcons/cart.png';
import diaper from './OptionCardIcons/diaper.png';
import home from './OptionCardIcons/home.png';
import chat from './OptionCardIcons/chat.png';
import stroller from './OptionCardIcons/stroller.png';
import pregnant from './OptionCardIcons/pregnant.png';
import briefcase from './OptionCardIcons/briefcase.png';
import dentistry from './OptionCardIcons/dentistry.png';
import gavel from './OptionCardIcons/gavel.png';

const acuteConditionOptions = {
  food: {
    formattedMessage: <FormattedMessage id="acuteConditionOptions.food" defaultMessage="Food or groceries" />,
    image: cart,
  },
  babySupplies: {
    formattedMessage: (
      <FormattedMessage id="acuteConditionOptions.babySupplies" defaultMessage="Diapers and other baby supplies" />
    ),
    image: diaper,
  },
  housing: {
    formattedMessage: (
      <FormattedMessage
        id="acuteConditionOptions.housing"
        defaultMessage="Help with managing your mortgage, rent, or utilities"
      />
    ),
    image: home,
  },
  support: {
    formattedMessage: (
      <FormattedMessage
        id="acuteConditionOptions.support"
        defaultMessage="A challenge you or your child would like to talk about"
      />
    ),
    image: chat,
  },
  childDevelopment: {
    formattedMessage: (
      <FormattedMessage
        id="acuteConditionOptions.childDevelopment"
        defaultMessage="Concern about your baby or toddler's development"
      />
    ),
    image: stroller,
  },
  familyPlanning: {
    formattedMessage: (
      <FormattedMessage id="acuteConditionOptions.familyPlanning" defaultMessage="Family planning or birth control" />
    ),
    image: pregnant,
  },
  jobResources: {
    formattedMessage: <FormattedMessage id="acuteConditionOptions.jobResources" defaultMessage="Finding a job" />,
    image: briefcase,
  },
  dentalCare: {
    formattedMessage: <FormattedMessage id="acuteConditionOptions.dentalCare" defaultMessage="Low-cost dental care" />,
    image: dentistry,
  },
  legalServices: {
    formattedMessage: (
      <FormattedMessage
        id="acuteConditionOptions.legalServices"
        defaultMessage="Free or low-cost help with civil legal needs"
      />
    ),
    image: gavel,
  },
};

export default acuteConditionOptions;
