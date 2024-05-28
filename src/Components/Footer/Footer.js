import Paper from '@mui/material/Paper';
import Share from '../Share/Share';
import { useContext } from 'react';
import { Context } from '../Wrapper/Wrapper';
import { FormattedMessage } from 'react-intl';
import './Footer.css';

const Footer = () => {
    const context = useContext(Context);
    const { getReferrer } = context;

  return (
    <footer>
      <Paper
        elevation={0}
        sx={{ width: '100%', backgroundColor: `var(--midBlue-color)`, marginTop: '5rem' }}
        square={true}
      >
        <div className="footer-content-container">
          <div>
            <img src={getReferrer('logoSource')} alt={getReferrer('logoAlt')} className="logo footer-logo" />
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
        <div className='footer-policy-container'>
          <a href='https://www.myfriendben.org/privacy-policy' target="_blank" className='policy-link'>
            <FormattedMessage id="footer.privacyPolicy" defaultMessage="Privacy Policy" />
          </a>
        </div>
      </Paper>
    </footer>
  );
};

export default Footer;
