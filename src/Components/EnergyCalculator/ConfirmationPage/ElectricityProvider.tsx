import { useContext, useMemo } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import ConfirmationBlock from '../../Confirmation/ConfirmationBlock';
import { Context } from '../../Wrapper/Wrapper';
import { ReactComponent as Referral } from '../../../Assets/icons/General/referral.svg';
import { getProviderNames } from '../electricityProviders';
import { FormattedMessageType } from '../../../Types/Questions';

export default function EnergyCalculatorElectricityProvider() {
  const { formData } = useContext(Context);
  const { formatMessage } = useIntl();

  const providerNames = useMemo(getProviderNames, []);

  const electricProvider = formData.energyCalculator?.electricProvider ?? 'other';
  let providerName: string | FormattedMessageType = providerNames[electricProvider];
  if (electricProvider === 'other') {
    providerName = <FormattedMessage id="energyCalculator.electricityProvider.other" defaultMessage="Other" />;
  } else if (electricProvider === 'none') {
    providerName = (
      <FormattedMessage id="energyCalculator.electricityProvider.none" defaultMessage="None / Don't Pay" />
    );
  }

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
