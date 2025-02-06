import { useContext, useMemo } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import ConfirmationBlock from '../../Confirmation/ConfirmationBlock';
import { Context } from '../../Wrapper/Wrapper';
import { ReactComponent as Referral } from '../../../Assets/icons/referral.svg';
import { getProviderNames } from '../electricityProviders';

export default function EnergyCalculatorElectricityProvider() {
  const { formData } = useContext(Context);
  const { formatMessage } = useIntl();

  const providerNames = useMemo(getProviderNames, []);

  const providerName = providerNames[formData.energyCalculator?.electricProvider ?? ''] ?? (
    <FormattedMessage id="energyCalculator.electricityProvider.other" defaultMessage="Other" />
  );

  const editElectricityProviderAriaLabel = {
    id: 'energyCalculator.confirmation.electricityProvider.edit-AL',
    defaultMessage: 'edit electricity provider',
  };
  const electricityProviderIconAlt = {
    id: 'energyCalculator.confirmation.electricityProvider.icon-AL',
    defaultMessage: 'electricity provider',
  };

  return (
    <ConfirmationBlock
      icon={<Referral title={formatMessage(electricityProviderIconAlt)} />}
      title={
        <FormattedMessage
          id="energyCalculator.confirmation.electricityProvider"
          defaultMessage="Electric Utility Provider"
        />
      }
      editAriaLabel={editElectricityProviderAriaLabel}
      stepName="energyCalculatorElectricityProvider"
    >
      {providerName}
    </ConfirmationBlock>
  );
}
