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
    api_default_message: 'Food or groceries',
    icon: <Food />,
  },
  babySupplies: {
    api_default_message: 'Baby Supplies',
    icon: <Baby_supplies />,
  },
  housing: {
    api_default_message: 'Managing housing costs',
    icon: <Housing />,
  },
  support: {
    api_default_message: 'Behavioral Health',
    icon: <Support />,
  },
  childDevelopment: {
    api_default_message: "Child's development",
    icon: <Child_development />,
  },
  familyPlanning: {
    api_default_message: 'Family planning',
    icon: <Family_planning />,
  },
  jobResources: {
    api_default_message: 'Job resources',
    icon: <Job_resources />,
  },
  dentalCare: {
    api_default_message: 'Low-cost dental care',
    icon: <Dental_care />,
  },
  legalServices: {
    api_default_message: 'Civil legal needs',
    icon: <Legal_services />,
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
        defaultMessage="Concern about your child's development"
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
    formattedMessage: <FormattedMessage id="acuteConditionOptions.jobResources" defaultMessage="Job resources" />,
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
