import { FormattedMessage } from 'react-intl';
import { ReactComponent as Baby_supplies } from './OptionCardIcons/AcuteConditions/baby_supplies.svg';
import { ReactComponent as Child_development } from './OptionCardIcons/AcuteConditions/child_development.svg';
import { ReactComponent as Dental_care } from './OptionCardIcons/AcuteConditions/dental_care.svg';
import { ReactComponent as Family_planning } from './OptionCardIcons/AcuteConditions/family_planning.svg';
import { ReactComponent as Food } from './OptionCardIcons/AcuteConditions/food.svg';
import { ReactComponent as Housing } from './OptionCardIcons/AcuteConditions/housing.svg';
import { ReactComponent as Job_resources } from './OptionCardIcons/AcuteConditions/job_resources.svg';
import { ReactComponent as Legal_services } from './OptionCardIcons/AcuteConditions/legal_services.svg';
import { ReactComponent as Support } from './OptionCardIcons/AcuteConditions/support.svg';

export const acuteConditionResultMapping = {
  food: {
    default_message: 'Food or groceries',
    api_default_message: 'Food or Groceries',
    icon: <Food className="option-card-icon" />,
  },
  babySupplies: {
    default_message: 'Baby Supplies',
    api_default_message: 'Diapers and Other Baby Supplies',
    icon: <Baby_supplies className="option-card-icon" />,
  },
  housing: {
    default_message: 'Managing housing costs',
    api_default_message: 'Help with managing your mortgage, rent, or utilities',
    icon: <Housing className="option-card-icon" />,
  },
  support: {
    default_message: 'Behavioral Health',
    api_default_message:
      'A challenge that you (or your child) have that you’d be interested in talking with someone outside your household about',
    icon: <Support className="option-card-icon" />,
  },
  childDevelopment: {
    default_message: "Child's Development",
    api_default_message: 'Concern about your baby’s or toddler’s development',
    icon: <Child_development className="option-card-icon" />,
  },
  familyPlanning: {
    default_message: 'Family planning',
    api_default_message: 'Family planning or birth control',
    icon: <Family_planning className="option-card-icon" />,
  },
  jobResources: {
    default_message: 'Job Training',
    api_default_message: 'Finding a job',
    icon: <Job_resources className="option-card-icon" />,
  },
  dentalCare: {
    default_message: 'Low-cost dental care',
    api_default_message: 'Low-cost dental care',
    icon: <Dental_care className="option-card-icon" />,
  },
  legalServices: {
    default_message: 'Civil legal needs',
    api_default_message: 'Free or low-cost help with civil legal needs',
    icon: <Legal_services className="option-card-icon" />,
  },
};

const acuteConditionOptions = {
  food: {
    formattedMessage: <FormattedMessage id="acuteConditionOptions.food" defaultMessage="Food or groceries" />,
    icon: <Food className="option-card-icon" />,
  },
  babySupplies: {
    formattedMessage: (
      <FormattedMessage id="acuteConditionOptions.babySupplies" defaultMessage="Diapers and other baby supplies" />
    ),
    icon: <Baby_supplies className="option-card-icon" />,
  },
  housing: {
    formattedMessage: (
      <FormattedMessage
        id="acuteConditionOptions.housing"
        defaultMessage="Help with managing your mortgage, rent, or utilities"
      />
    ),
    icon: <Housing className="option-card-icon" />,
  },
  support: {
    formattedMessage: (
      <FormattedMessage
        id="acuteConditionOptions.support"
        defaultMessage="A challenge you or your child would like to talk about"
      />
    ),
    icon: <Support className="option-card-icon" />,
  },
  childDevelopment: {
    formattedMessage: (
      <FormattedMessage
        id="acuteConditionOptions.childDevelopment"
        defaultMessage="Concern about your baby or toddler's development"
      />
    ),
    icon: <Child_development className="option-card-icon" />,
  },
  familyPlanning: {
    formattedMessage: (
      <FormattedMessage id="acuteConditionOptions.familyPlanning" defaultMessage="Family planning or birth control" />
    ),
    icon: <Family_planning className="option-card-icon" />,
  },
  jobResources: {
    formattedMessage: <FormattedMessage id="acuteConditionOptions.jobResources" defaultMessage="Finding a job" />,
    icon: <Job_resources className="option-card-icon" />,
  },
  dentalCare: {
    formattedMessage: <FormattedMessage id="acuteConditionOptions.dentalCare" defaultMessage="Low-cost dental care" />,
    icon: <Dental_care className="option-card-icon" />,
  },
  legalServices: {
    formattedMessage: (
      <FormattedMessage
        id="acuteConditionOptions.legalServices"
        defaultMessage="Free or low-cost help with civil legal needs"
      />
    ),
    icon: <Legal_services className="option-card-icon" />,
  },
};

export default acuteConditionOptions;
