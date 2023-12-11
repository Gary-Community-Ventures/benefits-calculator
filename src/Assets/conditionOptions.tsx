import { FormattedMessage } from 'react-intl';
import student from './OptionCardIcons/Conditions/student.svg';
import pregnant from './OptionCardIcons/Conditions/pregnant.svg';
import blindOrVisuallyImpaired from './OptionCardIcons/Conditions/blindOrVisuallyImpaired.svg';
import disabled from './OptionCardIcons/Conditions/disabled.svg';
import longTermDisability from './OptionCardIcons/Conditions/longTermDisability.svg';

const conditionOptions = {
  you: {
    student: {
      formattedMessage: (
        <FormattedMessage
          id="conditionOptions.student"
          defaultMessage="Student at a college, university, or other post-secondary institution like a job-training program"
        />
      ),
      image: student,
    },
    pregnant: {
      formattedMessage: <FormattedMessage id="conditionOptions.pregnant" defaultMessage="Pregnant" />,
      image: pregnant,
    },
    blindOrVisuallyImpaired: {
      formattedMessage: (
        <FormattedMessage id="conditionOptions.blindOrVisuallyImpaired" defaultMessage="Blind or visually impaired" />
      ),
      image: blindOrVisuallyImpaired,
    },
    disabled: {
      formattedMessage: (
        <FormattedMessage
          id="conditionOptions.disabled"
          defaultMessage="Have any disabilities that make you unable to work now or in the future"
        />
      ),
      image: disabled,
    },
    longTermDisability: {
      formattedMessage: (
        <FormattedMessage
          id="conditionOptions.longTermDisability"
          defaultMessage="Any medical or developmental condition that has lasted, or is expected to last, more than 12 months"
        />
      ),
      image: longTermDisability,
    },
  },
  them: {
    student: {
      formattedMessage: (
        <FormattedMessage
          id="conditionOptions.student"
          defaultMessage="Student at a college, university, or other post-secondary institution like a job-training program"
        />
      ),
      image: student,
    },
    pregnant: {
      formattedMessage: <FormattedMessage id="conditionOptions.pregnant" defaultMessage="Pregnant" />,
      image: pregnant,
    },
    blindOrVisuallyImpaired: {
      formattedMessage: (
        <FormattedMessage id="conditionOptions.blindOrVisuallyImpaired" defaultMessage="Blind or visually impaired" />
      ),
      image: blindOrVisuallyImpaired,
    },
    disabled: {
      formattedMessage: (
        <FormattedMessage
          id="conditionOptions.disabled-them"
          defaultMessage="Have any disabilities that make them unable to work now or in the future"
        />
      ),
      image: disabled,
    },
    longTermDisability: {
      formattedMessage: (
        <FormattedMessage
          id="conditionOptions.longTermDisability"
          defaultMessage="Any medical or developmental condition that has lasted, or is expected to last, more than 12 months"
        />
      ),
      image: longTermDisability,
    },
  },
};

export default conditionOptions;
