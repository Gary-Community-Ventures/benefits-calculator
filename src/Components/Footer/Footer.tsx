import Paper from '@mui/material/Paper';
import Share from '../Share/Share';
import { useContext } from 'react';
import { Context } from '../Wrapper/Wrapper';
import { useConfig } from '../Config/configHook.tsx';
import { FormattedMessage } from 'react-intl';
import './Footer.css';
import { useLogo } from '../Referrer/useLogo';

const Footer = () => {
  const footerData = useConfig('footer_data');
  const context = useContext(Context);

  const { theme } = context;
  const { address_one, address_two, city, state, zip_code, email, privacy_policy_link } = footerData;
  return (
    <footer>
      <Paper elevation={0} sx={{ width: '100%', backgroundColor: theme.midBlueColor }} square={true}>
        <div className="footer-content-container">
          <div>
            {useLogo('logoFooterSource', 'logoFooterAlt', 'logo footer-logo')}
            <p className="white-font">{address_one}</p>
            <p className="white-font">{address_two}</p>
            <p className="white-font">
              {city}, {state} {zip_code}
            </p>
            <div className="bottom-top-margin">
              <p className="white-font italicized">
                <FormattedMessage id="footer-questions" defaultMessage="Questions? Contact" />
              </p>
              <a href={`mailto:${email}`} className="white-font italicized footer-link">
                {email}
              </a>
            </div>
          </div>
          <div className="share-container">
            <Share />
          </div>
        </div>
        <div className="footer-policy-container">
          <a href={privacy_policy_link} target="_blank" className="policy-link">
            <FormattedMessage id="footer.privacyPolicy" defaultMessage="Privacy Policy" />
          </a>
        </div>
      </Paper>
    </footer>
  );
};

export default Footer;
