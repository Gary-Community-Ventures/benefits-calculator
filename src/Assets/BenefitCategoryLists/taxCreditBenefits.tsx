import { FormattedMessage } from 'react-intl';

const taxCreditBenefits = {
  eitc: (
    <FormattedMessage
      id="taxCreditBenefits.eitc"
      defaultMessage="Federal tax credit: earned income (Earned Income Tax Credit)"
    />
  ),
  ctc: (
    <FormattedMessage
      id="taxCreditBenefits.ctc"
      defaultMessage="Federal tax credit: child tax credit (Child Tax Credit)"
    />
  ),
  coeitc: (
    <FormattedMessage
      id="taxCreditBenefits.coeitc"
      defaultMessage="State tax credit: earned income (Colorado Earned Income Tax Credit/Expanded Earned Income Tax Credit)"
    />
  ),
  coctc: <FormattedMessage id="taxCreditBenefits.coctc" defaultMessage="State tax credit: Colorado child tax credit" />,
};

export default taxCreditBenefits;
