import { FormattedMessage } from 'react-intl';
import baby_supplies from './OptionCardIcons/AcuteConditions/baby_supplies.svg';
import child_development from './OptionCardIcons/AcuteConditions/child_development.svg';
import dental_care from './OptionCardIcons/AcuteConditions/dental_care.svg';
import family_planning from './OptionCardIcons/AcuteConditions/family_planning.svg';
import food from './OptionCardIcons/AcuteConditions/food.svg';
import housing from './OptionCardIcons/AcuteConditions/housing.svg';
import job_resources from './OptionCardIcons/AcuteConditions/job_resources.svg';
import legal_services from './OptionCardIcons/AcuteConditions/legal_services.svg';
import support from './OptionCardIcons/AcuteConditions/support.svg';

const acuteConditionOptions = {
  food: {
    formattedMessage: <FormattedMessage id="acuteConditionOptions.food" defaultMessage="Food or groceries" />,
    image: food,
  },
  babySupplies: {
    formattedMessage: (
      <FormattedMessage id="acuteConditionOptions.babySupplies" defaultMessage="Diapers and other baby supplies" />
    ),
    image: baby_supplies,
  },
  housing: {
    formattedMessage: (
      <FormattedMessage
        id="acuteConditionOptions.housing"
        defaultMessage="Help with managing your mortgage, rent, or utilities"
      />
    ),
    image: housing,
  },
  support: {
    formattedMessage: (
      <FormattedMessage
        id="acuteConditionOptions.support"
        defaultMessage="A challenge you or your child would like to talk about"
      />
    ),
    image: support,
  },
  childDevelopment: {
    formattedMessage: (
      <FormattedMessage
        id="acuteConditionOptions.childDevelopment"
        defaultMessage="Concern about your baby or toddler's development"
      />
    ),
    image: child_development,
  },
  familyPlanning: {
    formattedMessage: (
      <FormattedMessage id="acuteConditionOptions.familyPlanning" defaultMessage="Family planning or birth control" />
    ),
    image: family_planning,
  },
  jobResources: {
    formattedMessage: <FormattedMessage id="acuteConditionOptions.jobResources" defaultMessage="Finding a job" />,
    image: job_resources,
  },
  dentalCare: {
    formattedMessage: <FormattedMessage id="acuteConditionOptions.dentalCare" defaultMessage="Low-cost dental care" />,
    image: dental_care,
  },
  legalServices: {
    formattedMessage: (
      <FormattedMessage
        id="acuteConditionOptions.legalServices"
        defaultMessage="Free or low-cost help with civil legal needs"
      />
    ),
    image: legal_services,
  },
};

export default acuteConditionOptions;
