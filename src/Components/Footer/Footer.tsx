import Paper from '@mui/material/Paper';
import Share from '../Share/Share';
import { useContext } from 'react';
import { Context } from '../Wrapper/Wrapper';
import { FormattedMessage, useIntl } from 'react-intl';
import MFBLogo from '../../Assets/logo.png';
import './Footer.css';

const Footer = () => {
  const context = useContext(Context);
  const { theme } = context;
  const intl = useIntl();

  return (
    <footer>
      <Paper elevation={0} sx={{ width: '100%', backgroundColor: theme.midBlueColor }} square={true}>
        <div className="footer-content-container">
          <div>
            <img
              src={MFBLogo}
              alt={intl.formatMessage({ id: 'footer.logo.alt', defaultMessage: 'MFB Logo' })}
              className="logo footer-logo"
            />
            <p className="white-font">201 W Main St</p>
            <p className="white-font">Suite 100</p>
            <p className="white-font">Durham, NC 27701</p>
            <div className="bottom-top-margin">
              <p className="white-font italicized">
                <FormattedMessage id="footer-questions" defaultMessage="Questions? Contact" />
              </p>
              <a href="mailto:myfriendben@garycommunity.org" className="white-font italicized footer-link">
                myfriendben@garycommunity.org
              </a>
            </div>
          </div>
          <div className="share-container">
            <Share />
          </div>
        </div>
        <div className="footer-policy-container">
          <a href="https://bennc.org/privacy-policy/" target="_blank" className="policy-link">
            <FormattedMessage id="footer.privacyPolicy" defaultMessage="Privacy Policy" />
          </a>
        </div>
      </Paper>
    </footer>
  );
};

export default Footer;
