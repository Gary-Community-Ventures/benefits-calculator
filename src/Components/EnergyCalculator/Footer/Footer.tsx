import { Paper } from '@mui/material';
import { FormattedMessage, useIntl } from 'react-intl';
import { useLocalizedLink } from '../../Config/configHook';
import '../../Footer/PoweredByFooter.css';
import './Footer.css';
import { renderLogoSource } from '../../Referrer/referrerDataInfo';

export default function EnergyCalculatorFooter() {
  const privacyPolicyLink = useLocalizedLink('privacy_policy');
  const intl = useIntl();

  const mfbLogo = renderLogoSource(
    'PoweredByLogo',
    intl.formatMessage({ id: 'poweredByFooter.logo.alt', defaultMessage: 'Powered by MyFriendBen' }),
    'logo powered-by-footer-logo',
  );
  const raLogo = renderLogoSource(
    'RewiringAmericaLogo',
    intl.formatMessage({ id: 'poweredByFooter.logo.alt', defaultMessage: 'Powered by MyFriendBen' }),
    'logo powered-by-footer-logo',
  );
  const mfbUrl =
    'https://screener.myfriendben.org/co/step-1?referrer=energy_calculator&utm_source=cesn&utm_medium=web&utm_campaign=cesn&utm_id=cesn';
  const raUrl =
    'https://homes.rewiringamerica.org/calculator?utm_source=cesn&utm_medium=web&utm_campaign=cesn&utm_id=cesn';
  return (
    <footer>
      <Paper elevation={0} sx={{ width: '100%', backgroundColor: 'var(--footer-color)' }} square={true}>
        <div className="energy-calculator-footer-logo-container">
          <a href={mfbUrl} target="_blank">
            {mfbLogo}
          </a>
          <a href={raUrl} target="_blank">
            {raLogo}
          </a>
        </div>
        <div className="powered-by-footer-policy-container">
          <a href={privacyPolicyLink} target="_blank" className="policy-link">
            <FormattedMessage id="footer.privacyPolicy" defaultMessage="Privacy Policy" />
          </a>
        </div>
      </Paper>
    </footer>
  );
}
