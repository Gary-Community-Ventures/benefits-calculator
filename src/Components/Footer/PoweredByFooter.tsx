import { Paper } from '@mui/material';
import { useContext } from 'react';
import { FormattedMessage } from 'react-intl';
import { useConfig } from '../Config/configHook';
import { useLogo } from '../Referrer/useLogo';
import { Context } from '../Wrapper/Wrapper';
import './PoweredByFooter.css';

type FooterDataConfig = {
  address_one: string;
  address_two: string;
  city: string;
  state: string;
  zip_code: string;
  email: string;
  privacy_policy_link: string;
};

export default function PoweredByFooter() {
  const { privacy_policy_link } = useConfig<FooterDataConfig>('footer_data');
  const { theme } = useContext(Context);

  const logo = useLogo('logoFooterSource', 'logoFooterAlt', 'logo powered-by-footer-logo');
  return (
    <footer>
      <Paper elevation={0} sx={{ width: '100%', backgroundColor: theme.midBlueColor }} square={true}>
        <div className="powered-by-footer-content-container">{logo}</div>
        <div className="powered-by-footer-policy-container">
          <a href={privacy_policy_link} target="_blank" className="policy-link">
            <FormattedMessage id="footer.privacyPolicy" defaultMessage="Privacy Policy" />
          </a>
        </div>
      </Paper>
    </footer>
  );
}
