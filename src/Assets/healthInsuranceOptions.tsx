import { FormattedMessage } from 'react-intl';
import chp from './OptionCardIcons/HealthInsurance/chp.svg';
import dont_know from './OptionCardIcons/HealthInsurance/dont_know.svg';
import emergency_medicaid from './OptionCardIcons/HealthInsurance/emergency_medicaid.svg';
import employer from './OptionCardIcons/HealthInsurance/employer.svg';
import family_planning from './OptionCardIcons/HealthInsurance/family_planning.svg';
import medicaid from './OptionCardIcons/HealthInsurance/medicaid.svg';
import medicare from './OptionCardIcons/HealthInsurance/medicare.svg';
import none from './OptionCardIcons/HealthInsurance/none.svg';
import privateInsurance from './OptionCardIcons/HealthInsurance/privateInsurance.svg';
import { HealthInsuranceOptionsList, HealthInsurance } from '../Types/FormData';

export type HealthInsuranceOptions = {
  [Property in keyof HealthInsuranceOptionsList]: {
    [Property in keyof HealthInsurance]: {
      formattedMessage: JSX.Element;
      image: string;
    };
  };
};

const healthInsuranceOptions: HealthInsuranceOptions = {
  you: {
    none: {
      formattedMessage: (
        <FormattedMessage id="healthInsuranceOptions.none-I" defaultMessage="I do not have health insurance" />
      ),
      image: none,
    },
    employer: {
      formattedMessage: (
        <FormattedMessage id="healthInsuranceOptions.employer" defaultMessage="Employer-provided health insurance" />
      ),
      image: employer,
    },
    private: {
      formattedMessage: (
        <FormattedMessage
          id="healthInsuranceOptions.private"
          defaultMessage="Private (non-employer) health insurance"
        />
      ),
      image: privateInsurance,
    },
    medicaid: {
      formattedMessage: (
        <FormattedMessage id="healthInsuranceOptions.medicaid" defaultMessage="Health First Colorado (Full Medicaid)" />
      ),
      image: medicaid,
    },
    medicare: {
      formattedMessage: <FormattedMessage id="healthInsuranceOptions.medicare" defaultMessage="Medicare" />,
      image: medicare,
    },
    chp: {
      formattedMessage: (
        <FormattedMessage id="healthInsuranceOptions.chp" defaultMessage="Child Health Plan Plus (CHP+)" />
      ),
      image: chp,
    },
    emergency_medicaid: {
      formattedMessage: (
        <FormattedMessage
          id="healthInsuranceOptions.emergency_medicaid"
          defaultMessage="Emergency Medicaid / Reproductive Health"
        />
      ),
      image: emergency_medicaid,
    },
    family_planning: {
      formattedMessage: (
        <FormattedMessage
          id="healthInsuranceOptions.family_planning"
          defaultMessage="Family Planning Limited Medicaid"
        />
      ),
      image: family_planning,
    },
    dont_know: {
      formattedMessage: <FormattedMessage id="healthInsuranceOptions.dont_know" defaultMessage="Don't Know" />,
      image: dont_know,
    },
  },
  them: {
    none: {
      formattedMessage: (
        <FormattedMessage id="healthInsuranceOptions.none-they" defaultMessage="They do not have health insurance" />
      ),
      image: none,
    },
    employer: {
      formattedMessage: (
        <FormattedMessage id="healthInsuranceOptions.employer" defaultMessage="Employer-provided health insurance" />
      ),
      image: employer,
    },
    private: {
      formattedMessage: (
        <FormattedMessage
          id="healthInsuranceOptions.private"
          defaultMessage="Private (non-employer) health insurance"
        />
      ),
      image: privateInsurance,
    },
    medicaid: {
      formattedMessage: (
        <FormattedMessage id="healthInsuranceOptions.medicaid" defaultMessage="Health First Colorado (Full Medicaid)" />
      ),
      image: medicaid,
    },
    medicare: {
      formattedMessage: <FormattedMessage id="healthInsuranceOptions.medicare" defaultMessage="Medicare" />,
      image: medicare,
    },
    chp: {
      formattedMessage: (
        <FormattedMessage id="healthInsuranceOptions.chp" defaultMessage="Child Health Plan Plus (CHP+)" />
      ),
      image: chp,
    },
    emergency_medicaid: {
      formattedMessage: (
        <FormattedMessage
          id="healthInsuranceOptions.emergency_medicaid"
          defaultMessage="Emergency Medicaid / Reproductive Health"
        />
      ),
      image: emergency_medicaid,
    },
    family_planning: {
      formattedMessage: (
        <FormattedMessage
          id="healthInsuranceOptions.family_planning"
          defaultMessage="Family Planning Limited Medicaid"
        />
      ),
      image: family_planning,
    },
    dont_know: {
      formattedMessage: <FormattedMessage id="healthInsuranceOptions.dont_know" defaultMessage="Don't Know" />,
      image: dont_know,
    },
  },
};

export default healthInsuranceOptions;
