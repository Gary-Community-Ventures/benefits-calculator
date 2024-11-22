import { useContext } from 'react';
import { Context } from '../Wrapper/Wrapper';
import ConfirmationBlock, { ConfirmationItem } from './ConfirmationBlock';
import { ReactComponent as Residence } from '../../Assets/icons/residence.svg';
import { ReactComponent as Household } from '../../Assets/icons/household.svg';
import { ReactComponent as Head } from '../../Assets/icons/head.svg';
import { ReactComponent as Expenses } from '../../Assets/icons/expenses.svg';
import { ReactComponent as Resources } from '../../Assets/icons/resources.svg';
import { ReactComponent as Benefits } from '../../Assets/icons/benefits.svg';
import { ReactComponent as Immediate } from '../../Assets/icons/immediate.svg';
import { ReactComponent as Referral } from '../../Assets/icons/referral.svg';
import { FormattedMessage } from 'react-intl';
import { useTranslateNumber } from '../../Assets/languageOptions';

function ZipCode() {
  const { formData } = useContext(Context);
  const { zipcode, county } = formData;
  const editZipAriaLabelProps = {
    id: 'confirmation.zipcode-AL',
    defaultMsg: 'edit zipcode',
  };
  const zipcodeIcon = {
    id: 'confirmation.zipcode-AL',
    defaultMsg: 'zipcode',
  };
  const translateNumber = useTranslateNumber();

  return (
    <ConfirmationBlock
      icon={<Residence title="residence icon" />}
      title={<FormattedMessage id="confirmation.residenceInfo" defaultMessage="Residence Information" />}
      editAriaLabel={editZipAriaLabelProps}
      stepName="zipcode"
    >
      <ConfirmationItem
        label={<FormattedMessage id="confirmation.displayAllFormData-zipcodeText" defaultMessage="Zip code: " />}
        value={translateNumber(zipcode)}
      />
      <ConfirmationItem
        label={<FormattedMessage id="confirmation.displayAllFormData-countyText" defaultMessage="County: " />}
        value={county}
      />
    </ConfirmationBlock>
  );
}
