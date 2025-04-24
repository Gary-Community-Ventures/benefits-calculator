import { Paper } from '@mui/material';
import { FormattedMessage } from 'react-intl';
import { useLocalizedLink } from '../Config/configHook';
import { useLogo } from '../Referrer/useLogo';
import './PoweredByFooter.css';

export default function PoweredByFooter() {
  const privacyPolicyLink = useLocalizedLink('privacy_policy');

  const logo = useLogo('logoFooterSource', 'logoFooterAlt', 'logo powered-by-footer-logo');
  return (
    <footer>
      <Paper elevation={0} sx={{ width: '100%', backgroundColor: 'var(--footer-color)' }} square={true}>
        <div className="powered-by-footer-content-container">{logo}</div>
        <div className="powered-by-footer-policy-container">
          <a href={privacyPolicyLink} target="_blank" className="policy-link">
            <FormattedMessage id="footer.privacyPolicy" defaultMessage="Privacy Policy" />
          </a>
        </div>
      </Paper>
    </footer>
  );
}
