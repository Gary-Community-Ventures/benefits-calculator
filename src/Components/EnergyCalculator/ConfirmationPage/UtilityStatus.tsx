import { FormattedMessage, useIntl } from 'react-intl';
import ConfirmationBlock from '../../Confirmation/ConfirmationBlock';
import { ReactComponent as WarningIcon } from '../../../Assets/icons/warning.svg';
import { Context } from '../../Wrapper/Wrapper';
import { useContext } from 'react';

const UtilityStatus = () => {
  const { formData } = useContext(Context);
  const { energyCalculator } = formData;
  const notApplicable = !energyCalculator?.electricityIsDisconnected && !energyCalculator?.hasPastDueEnergyBills;
  const { formatMessage } = useIntl();
  const editUtilityStatusAriaLabel = {
    id: 'energyCalculator.confirmation.utilityStatus.edit-AL',
    defaultMessage: 'edit utility status',
  };
  const utilityStatusIconAlt = {
    id: 'energyCalculator.confirmation.utilityStatus.icon-AL',
    defaultMessage: 'utility status',
  };

  return (
    <ConfirmationBlock
      icon={<WarningIcon title={formatMessage(utilityStatusIconAlt)} />}
      title={
        <FormattedMessage
          id="energyCalculator.confirmation.utilityStatus"
          defaultMessage="Disconnection Notice or Past Due Bill"
        />
      }
      editAriaLabel={editUtilityStatusAriaLabel}
      stepName="energyCalculatorUtilityStatus"
    >
      {energyCalculator?.electricityIsDisconnected && (
        <p style={{ marginBottom: '.5rem' }}>
          <FormattedMessage
            id="energyCalculator.confirmation.energyIsDisconnected"
            defaultMessage="Your electricity and/or gas has been disconnected"
          />
        </p>
      )}
      {energyCalculator?.hasPastDueEnergyBills && (
        <p>
          <FormattedMessage
            id="energyCalculator.confirmation.hasPastDueEnergyBills"
            defaultMessage="You have a past-due electric or heating bill or you are low on fuel"
          />
        </p>
      )}
      {notApplicable && (
        <p>
          <FormattedMessage id="energyCalculator.confirmation.notApplicable" defaultMessage="Not applicable" />
        </p>
      )}
    </ConfirmationBlock>
  );
};
export default UtilityStatus;
