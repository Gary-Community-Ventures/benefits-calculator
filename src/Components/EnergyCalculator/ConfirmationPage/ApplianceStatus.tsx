import { FormattedMessage, useIntl } from 'react-intl';
import ConfirmationBlock from '../../Confirmation/ConfirmationBlock';
import { ReactComponent as WaterHeater } from '../Icons/WaterHeater.svg';
import { Context } from '../../Wrapper/Wrapper';
import { useContext } from 'react';
import { applianceStatusOptions } from '../Steps/Appliances';
import { EnergyCalculatorFormData } from '../../../Types/FormData';

const ApplianceStatus = () => {
  const { formData } = useContext(Context);
  const { energyCalculator } = formData;
  const { needsWaterHeater, needsHvac, needsStove, needsDryer }: EnergyCalculatorFormData = energyCalculator;
  const truthyApplianceStatuses = Object.entries(applianceStatusOptions).filter(([applianceKey]) => {
    if (energyCalculator) {
      return energyCalculator[applianceKey];
    }
  });
  const notApplicable = !needsWaterHeater && !needsHvac && !needsStove && !needsDryer;
  const { formatMessage } = useIntl();
  const editApplianceStatusAriaLabel = {
    id: 'energyCalculator.confirmation.applianceStatus.edit-AL',
    defaultMessage: 'edit appliance status',
  };
  const applianceStatusIconAlt = {
    id: 'energyCalculator.confirmation.applianceStatus.icon-AL',
    defaultMessage: 'appliance status',
  };

  const mappedApplianceStatuses = () => {
    if (truthyApplianceStatuses.length) {
      return truthyApplianceStatuses.map((applianceStatus) => {
        const applianceStatusName = applianceStatus[0];
        const applianceStatusProps = applianceStatus[1];

        return (
          <p style={{ marginBottom: '.5rem' }} key={applianceStatusName}>
            <FormattedMessage
              id={applianceStatusProps.text.props.id}
              defaultMessage={applianceStatusProps.text.props.default_message}
            />
          </p>
        );
      });
    }
  };

  return (
    <ConfirmationBlock
      icon={<WaterHeater title={formatMessage(applianceStatusIconAlt)} />}
      title={
        <FormattedMessage
          id="energyCalculator.confirmation.applianceStatus"
          defaultMessage="Broken appliances or ones in need of replacement"
        />
      }
      editAriaLabel={editApplianceStatusAriaLabel}
      stepName="energyCalculatorApplianceStatus"
    >
      {mappedApplianceStatuses()}
      {notApplicable && (
        <p>
          <FormattedMessage id="energyCalculator.confirmation.notApplicable" defaultMessage="Not applicable" />
        </p>
      )}
    </ConfirmationBlock>
  );
};
export default ApplianceStatus;
