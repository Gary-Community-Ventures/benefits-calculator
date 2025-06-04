import { Paper, Stack, Typography, Link } from '@mui/material';
import Box from '@mui/material/Box';
import dialIcon from '../../../Assets/States/CO/WhiteLabels/TwoOneOneAssets/dialIcon.png';
import { FormattedMessage, useIntl } from 'react-intl';
import './LancFooter.css';
import { useLocalizedLink } from '../../Config/configHook';

const LancFooter = () => {
  const intl = useIntl();
  const privacyPolicyLink = useLocalizedLink('privacy_policy');

  const lancDialALProps = {
    id: 'lancFooter.dialAL',
    defaultMsg: 'LANC dial link',
  };
  const lancApplyALProps = {
    id: 'lancFooter.applyAL',
    defaultMsg: 'LANC apply online link',
  };
  const lancTOSALProps = {
    id: 'lancFooter.termsOfSvcAL',
    defaultMsg: 'LANC terms of service',
  };

  const displayDialStack = () => {
    return (
      <Stack direction="row" gap="1rem">
        <img src={dialIcon} className="lanc-footer-icon" alt="talk to a LANC navigator via phone" />
        <Box sx={{ textAlign: 'center' }}>
          <Typography className="font-color">
            <FormattedMessage id="footer-dial-text-lanc" defaultMessage="Call the Helpline at " />
          </Typography>
          <Link
            href="tel:866-219-5262"
            underline="none"
            target="_blank"
            aria-label={intl.formatMessage(lancDialALProps)}
            color="primary"
            // sx={{ display: 'inline-block' }}
          >
            1-866-219-LANC (5262)
          </Link>
          {/* &nbsp; */}
          {/* <Typography className="font-color" sx={{ display: 'inline-block' }}> */}
          <Typography>
            <FormattedMessage id="footer-or-text-nc" defaultMessage=" or" />
            &nbsp;
          </Typography>
          <Typography className="font-color">
            <FormattedMessage id="footer-apply-text-lanc" defaultMessage="Apply online at " />
          </Typography>
          <Link
            href="https://legalaidnc.org/apply"
            underline="none"
            target="_blank"
            aria-label={intl.formatMessage(lancApplyALProps)}
            color="primary"
            // sx={{ display: 'inline-block' }}
          >
            https://legalaidnc.org/apply
          </Link>

        </Box>
      </Stack>
    );
  };

  const displayFirstParagraph = () => {
    return (
      <Typography>
        <FormattedMessage
          id="footer-first-paragraph-lanc"
          defaultMessage="Services found within search results may involve eligibility criteria. Please contact the resource directly to find out more information about how to obtain these services. This site contains links to other sites. All of the information provided is believed to be accurate and reliable. However, Legal Aid of North Carolina assumes no responsibility for any errors appearing, nor for the use of the information provided."
        />
      </Typography>
    );
  };

  const displaySecondParagraph = () => {
    return (
      <Typography>
        <FormattedMessage
          id="footer-second-paragraph-lanc"
          defaultMessage="MyFriendBen is for informational and educational purposes only. It does not provide legal advice and is not an application for services or benefits. Using the benefit screener or submitting information through MyFriendBen does not create an attorney-client relationship with Legal Aid of North Carolina. Legal Aid of North Carolina is not responsible for any errors or for how the information is used. If you need legal advice about your specific situation, please contact Legal Aid of North Carolina or a private attorney."
        />
      </Typography>
    );
  };

  const displayCopyrightPolicySection = () => {
    return (
      <Box className="lanc-font flexIntoRow copyright-container">
        <Typography className="privacy-policy-links">
          <FormattedMessage id="footer-copyright-lanc" defaultMessage="© Copyright LANC North Carolina" />
        </Typography>
        <Box className="flexLinksIntoRow">
          <Link
            href="https://legalaidnc.org/privacy-policy-2/"
            underline="none"
            target="_blank"
            aria-label={intl.formatMessage(lancTOSALProps)}
            className="privacy-policy-links"
          >
            <FormattedMessage id="footer-lanc-privacy" defaultMessage="LANC Privacy Policy |" />
            &nbsp;
          </Link>
          <Link
            href={privacyPolicyLink}
            underline="none"
            target="_blank"
            aria-label={intl.formatMessage(lancTOSALProps)}
            className="privacy-policy-links"
          >
            <FormattedMessage id="footer-lanc-mfb" defaultMessage="MyFriendBen Privacy Policy" />
          </Link>
        </Box>
      </Box>
    );
  };

  return (
    <footer>
      <Paper elevation={0} sx={{ width: '100%', backgroundColor: '#efefef' }} className="paper-container" square={true}>
        <Box className="lanc-font flexIntoRow getHelp-text">
          <FormattedMessage
            id="footer-header-lanc"
            defaultMessage="To apply for help from Legal Aid of North Carolina:"
          />
        </Box>
        <Box className="flexIntoRow icon-section">{displayDialStack()}</Box>
      </Paper>
      <Box className="flexIntoRow footer-paragraph first-paragraph">{displayFirstParagraph()}</Box>
      <Box className="flexIntoRow footer-paragraph second-paragraph">{displaySecondParagraph()}</Box>
      <Paper elevation={0} sx={{ width: '100%', backgroundColor: '#efefef', padding: '1rem 1rem' }} square={true}>
        {displayCopyrightPolicySection()}
      </Paper>
    </footer>
  );
};

export default LancFooter;
