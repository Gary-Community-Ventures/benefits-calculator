import { FormattedMessage } from 'react-intl';
import cart from './OptionCardIcons/cart.png';
import diaper from './OptionCardIcons/diaper.png';
import home from './OptionCardIcons/home.png';
import chat from './OptionCardIcons/chat.png';
import stroller from './OptionCardIcons/stroller.png';
import bill from './OptionCardIcons/bill.png';
import pregnant from './OptionCardIcons/pregnant.png';

const acuteConditionOptions = {
  food: {
    formattedMessage: <FormattedMessage
      id='acuteConditionOptions.food'
      defaultMessage='Food or groceries'
    />,
    image: cart
  },
  babySupplies: {
    formattedMessage: <FormattedMessage
      id='acuteConditionOptions.babySupplies'
      defaultMessage='Diapers and other baby supplies'
    />,
    image: diaper
  },
  housing: {
    formattedMessage: <FormattedMessage
      id='acuteConditionOptions.housing'
      defaultMessage='Emergency help paying mortgage, rent, or utilities'
    />,
    image: home
  },
  support: {
    formattedMessage: <FormattedMessage
      id='acuteConditionOptions.support'
      defaultMessage="A challenge you or your child would like to talk about"
    />,
    image: chat
  },
  childDevelopment: {
    formattedMessage: <FormattedMessage
      id='acuteConditionOptions.childDevelopment'
      defaultMessage="Concern about your baby or toddler's development"
    />,
    image: stroller
  },
  loss: {
    formattedMessage: <FormattedMessage
      id='acuteConditionOptions.loss'
      defaultMessage='Funeral, burial, or cremation costs'
    />,
    image: bill
  },
  familyPlanning: {
    formattedMessage: <FormattedMessage
      id='acuteConditionOptions.familyPlanning'
      defaultMessage='Family planning or birth control'
    />,
    image: pregnant
  }
};

export default acuteConditionOptions;