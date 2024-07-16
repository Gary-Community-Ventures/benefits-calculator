import Paper from '@mui/material/Paper';
import Share from '../Share/Share';
import { useContext } from 'react';
import { Context } from '../Wrapper/Wrapper';
import { FormattedMessage, useIntl } from 'react-intl';
// import MFBLogoCO from '../../Assets/co_logo_header.png'
import MFBLogoNC from '../../Assets/nc_logo_header_white.png';
import './Footer.css';
import { useConfig } from '../Config/configHook';
import { getFooterLogo } from '../../Shared/helperFunctions';
import { States } from '../../Shared/state';


const Footer = () => {
  const context = useContext(Context);
  const { theme } = context;
  const intl = useIntl();
  const logoFooter = useConfig('MBF_logo');
  const stateLogo = Array.isArray(logoFooter) ? '' : logoFooter.state_code;
  const logoImage = getFooterLogo(stateLogo)


  return (
    <footer>
      <Paper elevation={0} sx={{ width: '100%', backgroundColor: theme.midBlueColor }} square={true}>
        <div className="footer-content-container">
          <div>
            <img
              src={getFooterLogo(stateLogo as States)}
              alt={intl.formatMessage({ id: 'footer.logo.alt', defaultMessage: 'MFB Logo' })}
              className="logo footer-logo"
            />
            <p className="white-font">1705 17th St.</p>
            <p className="white-font">Suite 200</p>
            <p className="white-font">Denver, CO 80202</p>
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
          <a href="https://co.myfriendben.org/en/data-privacy-policy" target="_blank" className="policy-link">
            <FormattedMessage id="footer.privacyPolicy" defaultMessage="Privacy Policy" />
          </a>
        </div>
      </Paper>
    </footer>
  );
};

export default Footer;
