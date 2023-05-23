import { FormattedMessage } from 'react-intl';

const childCareBenefits = {
  cccap: (
    <FormattedMessage
      id='childCareBenefits.cccap'
      defaultMessage='Help with child care costs (Colorado Child Care Assistance Program/CCCAP)'
    />
  ),
  denverpresc: (
    <FormattedMessage
      id='childCareBenefits.denverpresc'
      defaultMessage='Tuition credits for Denver preschoolers (Denver Preschool Program)'
    />
  ),
  coheadstart: (
    <FormattedMessage
      id='childCareBenefits.coheadstart'
      defaultMessage='Free early child care and preschool (Colorado Head Start)'
    />
  ),
  mydenver: (
    <FormattedMessage
      id='childCareBenefits.mydenver'
      defaultMessage='Reduced-cost youth programs (MY Denver Card)'
    />
  ),
  upk: (
    <FormattedMessage
      id='childCareBenefits.univpresc'
      defaultMessage='Free preschool (Universal Preschool Colorado)'
    />
  ),
};

export default childCareBenefits;
