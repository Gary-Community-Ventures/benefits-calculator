import { FormattedMessage } from 'react-intl';
import bill from './OptionCardIcons/bill.png';
import building from './OptionCardIcons/building.png';
import padlock from './OptionCardIcons/padlock.png';
import redX from './OptionCardIcons/redX.png';
import teddyDoctor from './OptionCardIcons/teddyDoctor.png';
import umbrella from './OptionCardIcons/umbrella.png';
import dontKnow from './OptionCardIcons/dont_know.png';
import emergencyMedicaid from './OptionCardIcons/emergency_medicaid.png';
import familyPlanning from './OptionCardIcons/family_planning.png';
import { HealthInsurance } from '../Types/FormData';

export type HealthInsuranceOptions = {
  [Property in keyof HealthInsurance]: {
    formattedMessage: JSX.Element;
    image: string;
  };
};

const healthInsuranceOptions: HealthInsuranceOptions = {
  you: {
    none: {
      formattedMessage: (
        <FormattedMessage id="healthInsuranceOptions.none-I" defaultMessage="I do not have health insurance" />
      ),
      image: redX,
    },
    employer: {
      formattedMessage: (
        <FormattedMessage id="healthInsuranceOptions.employer" defaultMessage="Employer-provided health insurance" />
      ),
      image: building,
    },
    private: {
      formattedMessage: (
        <FormattedMessage
          id="healthInsuranceOptions.private"
          defaultMessage="Private (non-employer) health insurance"
        />
      ),
      image: padlock,
    },
    medicaid: {
      formattedMessage: (
        <FormattedMessage id="healthInsuranceOptions.medicaid" defaultMessage="Health First Colorado (Full Medicaid)" />
      ),
      image: bill,
    },
    medicare: {
      formattedMessage: <FormattedMessage id="healthInsuranceOptions.medicare" defaultMessage="Medicare" />,
      image: umbrella,
    },
    chp: {
      formattedMessage: (
        <FormattedMessage id="healthInsuranceOptions.chp" defaultMessage="Child Health Plan Plus (CHP+)" />
      ),
      image: teddyDoctor,
    },
    emergency_medicaid: {
      formattedMessage: (
        <FormattedMessage
          id="healthInsuranceOptions.emergency_medicaid"
          defaultMessage="Emergency Medicaid / Reproductive Health"
        />
      ),
      image: emergencyMedicaid,
    },
    family_planning: {
      formattedMessage: (
        <FormattedMessage
          id="healthInsuranceOptions.family_planning"
          defaultMessage="Family Planning Limited Medicaid"
        />
      ),
      image: familyPlanning,
    },
    dont_know: {
      formattedMessage: <FormattedMessage id="healthInsuranceOptions.dont_know" defaultMessage="Don't Know" />,
      image: dontKnow,
    },
  },
  them: {
    none: {
      formattedMessage: (
        <FormattedMessage id="healthInsuranceOptions.none-they" defaultMessage="They do not have health insurance" />
      ),
      image: redX,
    },
    employer: {
      formattedMessage: (
        <FormattedMessage id="healthInsuranceOptions.employer" defaultMessage="Employer-provided health insurance" />
      ),
      image: building,
    },
    private: {
      formattedMessage: (
        <FormattedMessage
          id="healthInsuranceOptions.private"
          defaultMessage="Private (non-employer) health insurance"
        />
      ),
      image: padlock,
    },
    medicaid: {
      formattedMessage: (
        <FormattedMessage id="healthInsuranceOptions.medicaid" defaultMessage="Health First Colorado (Full Medicaid)" />
      ),
      image: bill,
    },
    medicare: {
      formattedMessage: <FormattedMessage id="healthInsuranceOptions.medicare" defaultMessage="Medicare" />,
      image: umbrella,
    },
    chp: {
      formattedMessage: (
        <FormattedMessage id="healthInsuranceOptions.chp" defaultMessage="Child Health Plan Plus (CHP+)" />
      ),
      image: teddyDoctor,
    },
    emergency_medicaid: {
      formattedMessage: (
        <FormattedMessage
          id="healthInsuranceOptions.emergency_medicaid"
          defaultMessage="Emergency Medicaid / Reproductive Health"
        />
      ),
      image: emergencyMedicaid,
    },
    family_planning: {
      formattedMessage: (
        <FormattedMessage
          id="healthInsuranceOptions.family_planning"
          defaultMessage="Family Planning Limited Medicaid"
        />
      ),
      image: familyPlanning,
    },
    dont_know: {
      formattedMessage: <FormattedMessage id="healthInsuranceOptions.dont_know" defaultMessage="Don't Know" />,
      image: dontKnow,
    },
  },
};

export default healthInsuranceOptions;
