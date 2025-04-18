import { Paper } from '@mui/material';
import { useContext } from 'react';
import { FormattedMessage } from 'react-intl';
import { useConfig, useLocalizedLink } from '../Config/configHook';
import { useLogo } from '../Referrer/useLogo';
import { Context } from '../Wrapper/Wrapper';
import './PoweredByFooter.css';

export default function PoweredByFooter() {
  const privacyPolicyLink = useLocalizedLink('privacy_policy');
  const { theme } = useContext(Context);

  const logo = useLogo('logoFooterSource', 'logoFooterAlt', 'logo powered-by-footer-logo');
  return (
    <footer>
      <Paper elevation={0} sx={{ width: '100%', backgroundColor: theme.midBlueColor }} square={true}>
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
