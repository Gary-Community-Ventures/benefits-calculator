import { FormattedMessage } from 'react-intl';

const cashAssistanceBenefits = {
  tanf: (
    <FormattedMessage
      id="cashAssistanceBenefits.tanf"
      defaultMessage="Cash assistance and work support (Temporary Assistance for Needy Families (TANF/Colorado Works))"
    />
  ),
  ssi: (
    <FormattedMessage
      id="cashAssistanceBenefits.ssi"
      defaultMessage="Federal cash assistance for individuals who are disabled, blind, or 65 years of age or older (Supplemental Security Income/SSI)"
    />
  ),
  andcs: (
    <FormattedMessage
      id="cashAssistanceBenefits.andcs"
      defaultMessage="State cash assistance for individuals who are disabled and receiving SSI (Aid to the Needy Disabled - Colorado Supplement/AND-CS)"
    />
  ),
  oap: (
    <FormattedMessage
      id="cashAssistanceBenefits.oap"
      defaultMessage="State cash assistance for individuals 60 years of age or older (Old Age Pension/OAP)"
    />
  ),
};

export default cashAssistanceBenefits;
