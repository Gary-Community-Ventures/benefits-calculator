import { FormattedMessage } from 'react-intl';
import pregnant from './OptionCardIcons/pregnant.png';

const conditionOptions = {
  you: {
    student: {
      formattedMessage: (
        <FormattedMessage
          id="conditionOptions.student"
          defaultMessage="Student at a college, university, or other post-secondary institution like a job-training program."
        />
      ),
      image: pregnant,
    },
    pregnant: {
      formattedMessage: <FormattedMessage id="conditionOptions.pregnant" defaultMessage="Pregnant" />,
      image: pregnant,
    },
    blindOrVisuallyImpaired: {
      formattedMessage: (
        <FormattedMessage id="conditionOptions.blindOrVisuallyImpaired" defaultMessage="Blind or visually impaired" />
      ),
      image: pregnant,
    },
    disabled: {
      formattedMessage: (
        <FormattedMessage
          id="conditionOptions.disabled"
          defaultMessage="Have any disabilities that make you unable to work now or in the future"
        />
      ),
      image: pregnant,
    },
    longTermDisability: {
      formattedMessage: (
        <FormattedMessage
          id="conditionOptions.longTermDisability"
          defaultMessage="Any medical or developmental condition that has lasted, or is expected to last, more than 12 months"
        />
      ),
      image: pregnant,
    },
  },
  them: {
    student: {
      formattedMessage: (
        <FormattedMessage
          id="conditionOptions.student"
          defaultMessage="Student at a college, university, or other post-secondary institution like a job-training program."
        />
      ),
      image: pregnant,
    },
    pregnant: {
      formattedMessage: <FormattedMessage id="conditionOptions.pregnant" defaultMessage="Pregnant" />,
      image: pregnant,
    },
    blindOrVisuallyImpaired: {
      formattedMessage: (
        <FormattedMessage id="conditionOptions.blindOrVisuallyImpaired" defaultMessage="Blind or visually impaired" />
      ),
      image: pregnant,
    },
    disabled: {
      formattedMessage: (
        <FormattedMessage
          id="conditionOptions.disabled-them"
          defaultMessage="Have any disabilities that make them unable to work now or in the future"
        />
      ),
      image: pregnant,
    },
    longTermDisability: {
      formattedMessage: (
        <FormattedMessage
          id="conditionOptions.longTermDisability"
          defaultMessage="Any medical or developmental condition that has lasted, or is expected to last, more than 12 months"
        />
      ),
      image: pregnant,
    },
  },
};

export default conditionOptions;
