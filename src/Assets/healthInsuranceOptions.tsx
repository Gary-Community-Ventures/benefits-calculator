import { FormattedMessage } from 'react-intl';
import { ReactComponent as Chp } from './OptionCardIcons/HealthInsurance/chp.svg';
import { ReactComponent as VA } from './OptionCardIcons/HealthInsurance/va.svg';
import { ReactComponent as Emergency_medicaid } from './OptionCardIcons/HealthInsurance/emergency_medicaid.svg';
import { ReactComponent as Employer } from './OptionCardIcons/HealthInsurance/employer.svg';
import { ReactComponent as Family_planning } from './OptionCardIcons/HealthInsurance/family_planning.svg';
import { ReactComponent as Medicaid } from './OptionCardIcons/HealthInsurance/medicaid.svg';
import { ReactComponent as Medicare } from './OptionCardIcons/HealthInsurance/medicare.svg';
import { ReactComponent as None } from './OptionCardIcons/HealthInsurance/none.svg';
import { ReactComponent as PrivateInsurance } from './OptionCardIcons/HealthInsurance/privateInsurance.svg';
import { HealthInsurance } from '../Types/FormData';
import { ReactElement } from 'react';

export type HealthInsuranceOptionsList = {
  you: HealthInsurance;
  them: HealthInsurance;
};

export type HealthInsuranceOptions = {
  [Property in keyof HealthInsuranceOptionsList]: {
    [Property in keyof HealthInsurance]: {
      formattedMessage: JSX.Element;
      icon: ReactElement;
    };
  };
};

const healthInsuranceOptions: HealthInsuranceOptions = {
  you: {
    none: {
      formattedMessage: (
        <FormattedMessage
          id="healthInsuranceOptions.none-dont-know-I"
          defaultMessage="I don't have or know if I have health insurance"
        />
      ),
      icon: <None className="option-card-icon" />,
    },
    employer: {
      formattedMessage: (
        <FormattedMessage id="healthInsuranceOptions.employer" defaultMessage="Employer-provided health insurance" />
      ),
      icon: <Employer className="option-card-icon" />,
    },
    private: {
      formattedMessage: (
        <FormattedMessage
          id="healthInsuranceOptions.private"
          defaultMessage="Private (non-employer) health insurance"
        />
      ),
      icon: <PrivateInsurance className="option-card-icon" />,
    },
    medicaid: {
      formattedMessage: (
        <FormattedMessage id="healthInsuranceOptions.medicaid" defaultMessage="Health First Colorado (Full Medicaid)" />
      ),
      icon: <Medicaid className="option-card-icon" />,
    },
    medicare: {
      formattedMessage: <FormattedMessage id="healthInsuranceOptions.medicare" defaultMessage="Medicare" />,
      icon: <Medicare className="option-card-icon" />,
    },
    chp: {
      formattedMessage: (
        <FormattedMessage id="healthInsuranceOptions.chp" defaultMessage="Child Health Plan Plus (CHP+)" />
      ),
      icon: <Chp className="option-card-icon" />,
    },
    emergency_medicaid: {
      formattedMessage: (
        <FormattedMessage
          id="healthInsuranceOptions.emergency_medicaid"
          defaultMessage="Emergency Medicaid / Reproductive Health"
        />
      ),
      icon: <Emergency_medicaid className="option-card-icon" />,
    },
    family_planning: {
      formattedMessage: (
        <FormattedMessage
          id="healthInsuranceOptions.family_planning"
          defaultMessage="Family Planning Limited Medicaid"
        />
      ),
      icon: <Family_planning className="option-card-icon" />,
    },
    va: {
      formattedMessage: <FormattedMessage id="healthInsuranceOptions.va" defaultMessage="VA health care benefits" />,
      icon: <VA className="option-card-icon" />,
    },
  },
  them: {
    none: {
      formattedMessage: (
        <FormattedMessage
          id="healthInsuranceOptions.none-dont-know-they"
          defaultMessage="They don't have or know if they have health insurance"
        />
      ),
      icon: <None className="option-card-icon" />,
    },
    employer: {
      formattedMessage: (
        <FormattedMessage id="healthInsuranceOptions.employer" defaultMessage="Employer-provided health insurance" />
      ),
      icon: <Employer className="option-card-icon" />,
    },
    private: {
      formattedMessage: (
        <FormattedMessage
          id="healthInsuranceOptions.private"
          defaultMessage="Private (non-employer) health insurance"
        />
      ),
      icon: <PrivateInsurance className="option-card-icon" />,
    },
    medicaid: {
      formattedMessage: (
        <FormattedMessage id="healthInsuranceOptions.medicaid" defaultMessage="Health First Colorado (Full Medicaid)" />
      ),
      icon: <Medicaid className="option-card-icon" />,
    },
    medicare: {
      formattedMessage: <FormattedMessage id="healthInsuranceOptions.medicare" defaultMessage="Medicare" />,
      icon: <Medicare className="option-card-icon" />,
    },
    chp: {
      formattedMessage: (
        <FormattedMessage id="healthInsuranceOptions.chp" defaultMessage="Child Health Plan Plus (CHP+)" />
      ),
      icon: <Chp className="option-card-icon" />,
    },
    emergency_medicaid: {
      formattedMessage: (
        <FormattedMessage
          id="healthInsuranceOptions.emergency_medicaid"
          defaultMessage="Emergency Medicaid / Reproductive Health"
        />
      ),
      icon: <Emergency_medicaid className="option-card-icon" />,
    },
    family_planning: {
      formattedMessage: (
        <FormattedMessage
          id="healthInsuranceOptions.family_planning"
          defaultMessage="Family Planning Limited Medicaid"
        />
      ),
      icon: <Family_planning className="option-card-icon" />,
    },
    va: {
      formattedMessage: <FormattedMessage id="healthInsuranceOptions.va" defaultMessage="VA health care benefits" />,
      icon: <VA className="option-card-icon" />,
    },
  },
};

export default healthInsuranceOptions;
