import { FormattedMessage } from 'react-intl';
import { ReactComponent as Student } from './OptionCardIcons/Conditions/student.svg';
import { ReactComponent as Pregnant } from './OptionCardIcons/Conditions/pregnant.svg';
import { ReactComponent as BlindOrVisuallyImpaired } from './OptionCardIcons/Conditions/blindOrVisuallyImpaired.svg';
import { ReactComponent as Disabled } from './OptionCardIcons/Conditions/disabled.svg';
import { ReactComponent as LongTermDisability } from './OptionCardIcons/Conditions/longTermDisability.svg';

const conditionOptions = {
  you: {
    student: {
      formattedMessage: (
        <FormattedMessage
          id="conditionOptions.student"
          defaultMessage="Student at a college, university, or other post-secondary institution like a job-training program"
        />
      ),
      icon: <Student className="option-card-icon" />,
    },
    pregnant: {
      formattedMessage: <FormattedMessage id="conditionOptions.pregnant" defaultMessage="Pregnant" />,
      icon: <Pregnant className="option-card-icon" />,
    },
    blindOrVisuallyImpaired: {
      formattedMessage: (
        <FormattedMessage id="conditionOptions.blindOrVisuallyImpaired" defaultMessage="Blind or visually impaired" />
      ),
      icon: <BlindOrVisuallyImpaired className="option-card-icon" />,
    },
    disabled: {
      formattedMessage: (
        <FormattedMessage
          id="conditionOptions.disabled"
          defaultMessage="Have any disabilities that make you unable to work now or in the future"
        />
      ),
      icon: <Disabled className="option-card-icon" />,
    },
    longTermDisability: {
      formattedMessage: (
        <FormattedMessage
          id="conditionOptions.longTermDisability"
          defaultMessage="Any medical or developmental condition that has lasted, or is expected to last, more than 12 months"
        />
      ),
      icon: <LongTermDisability className="option-card-icon" />,
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
      icon: <Student className="option-card-icon" />,
    },
    pregnant: {
      formattedMessage: <FormattedMessage id="conditionOptions.pregnant" defaultMessage="Pregnant" />,
      icon: <Pregnant className="option-card-icon" />,
    },
    blindOrVisuallyImpaired: {
      formattedMessage: (
        <FormattedMessage id="conditionOptions.blindOrVisuallyImpaired" defaultMessage="Blind or visually impaired" />
      ),
      icon: <BlindOrVisuallyImpaired className="option-card-icon" />,
    },
    disabled: {
      formattedMessage: (
        <FormattedMessage
          id="conditionOptions.disabled-them"
          defaultMessage="Have any disabilities that make them unable to work now or in the future"
        />
      ),
      icon: <Disabled className="option-card-icon" />,
    },
    longTermDisability: {
      formattedMessage: (
        <FormattedMessage
          id="conditionOptions.longTermDisability"
          defaultMessage="Any medical or developmental condition that has lasted, or is expected to last, more than 12 months"
        />
      ),
      icon: <LongTermDisability className="option-card-icon" />,
    },
  },
};

export default conditionOptions;
