import { FormattedMessage } from 'react-intl';

const conditionOptions = {
  student: (
    <FormattedMessage
      id="conditionOptions.student"
      defaultMessage="Student or prospective student at a college, university, or other post-secondary institution"
    />
  ),
  pregnant: <FormattedMessage id="conditionOptions.pregnant" defaultMessage="Pregnant" />,
  blindOrVisuallyImpaired: (
    <FormattedMessage id="conditionOptions.blindOrVisuallyImpaired" defaultMessage="Blind or visually impaired" />
  ),
  disabled: (
    <FormattedMessage
      id="conditionOptions.disabled"
      defaultMessage="Have any disabilities that make you unable to work now or in the future"
    />
  ),
  longTermDisability: (
    <FormattedMessage
      id="conditionOptions.longTermDisability"
      defaultMessage="Any medical or developmental condition that has lasted, or is expected to last, more than 12 months"
    />
  )
};

export default conditionOptions;
