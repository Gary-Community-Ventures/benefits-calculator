import { useContext, useMemo } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import ConfirmationBlock from '../../Confirmation/ConfirmationBlock';
import { Context } from '../../Wrapper/Wrapper';
import { ReactComponent as Referral } from '../../../Assets/icons/referral.svg';
import { getProviderNames } from '../gasProviders';
import { FormattedMessageType } from '../../../Types/Questions';

export default function EnergyCalculatorGasProvider() {
  const { formData } = useContext(Context);
  const { formatMessage } = useIntl();

  const providerNames = useMemo(getProviderNames, []);

  const gasProvider = formData.energyCalculator?.gasProvider ?? 'other';
  let providerName: string | FormattedMessageType = providerNames[gasProvider];
  if (gasProvider === 'other') {
    providerName = <FormattedMessage id="energyCalculator.gasProvider.other" defaultMessage="Other" />;
  } else if (gasProvider === 'propane') {
    providerName = (
      <FormattedMessage
        id="energyCalculator.gasProvider.propane"
        defaultMessage="Propane tank / firewood / heating pellets"
      />
    );
  } else if (gasProvider === 'none') {
    providerName = <FormattedMessage id="energyCalculator.gasProvider.none" defaultMessage="None / Don't Pay" />;
  }

  const editGasProviderAriaLabel = {
    id: 'energyCalculator.confirmation.gasProvider.edit-AL',
    defaultMessage: 'edit gas provider',
  };
  const gasProviderIconAlt = {
    id: 'energyCalculator.confirmation.gasProvider.icon-AL',
    defaultMessage: 'gas provider',
  };

  return (
    <ConfirmationBlock
      icon={<Referral title={formatMessage(gasProviderIconAlt)} />}
      title={<FormattedMessage id="energyCalculator.confirmation.gasProvider" defaultMessage="Gas Utility Provider" />}
      editAriaLabel={editGasProviderAriaLabel}
      stepName="energyCalculatorGasProvider"
    >
      {providerName}
    </ConfirmationBlock>
  );
}
