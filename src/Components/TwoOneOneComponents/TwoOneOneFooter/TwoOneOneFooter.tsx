import { Paper, Stack, Typography, Link } from '@mui/material';
import Box from '@mui/material/Box';
import chatIcon from '../../../Assets/TwoOneOneAssets/chatIcon.png';
import dialIcon from '../../../Assets/TwoOneOneAssets/dialIcon.png';
import textIcon from '../../../Assets/TwoOneOneAssets/textIcon.png';
import { FormattedMessage } from 'react-intl';
import './TwoOneOneFooter.css';

const TwoOneOneFooter = () => {
  const displayChatStack = () => {
    return (
      <Stack direction="row" gap="1rem">
        <img src={chatIcon} className="twoOneOne-footer-icon" alt="chat with a 2-1-1 navigator" />
        <Box>
          <Typography variant="h6" className="icon-header">
            <FormattedMessage id="footer-chat-text" defaultMessage="Chat" />
          </Typography>
          <Link
            href="https://home-c27.incontact.com/inContact/ChatClient/ChatClientPatron.aspx?poc=f927e51b-f96e-477b-9052-088d1fbcdc8f&bu=4594486"
            underline="none"
            target="_blank"
            rel="noreferrer"
            aria-label="2-1-1 chat link"
            color="primary"
          >
            <FormattedMessage id="footer-liveChat-text" defaultMessage="Click to live chat with a 2-1-1 Navigator" />
          </Link>
        </Box>
      </Stack>
    );
  };

  const displayDialStack = () => {
    return (
      <Stack direction="row" gap="1rem">
        <img src={dialIcon} className="twoOneOne-footer-icon" alt="talk to a 2-1-1 navigator via phone" />
        <Box>
          <Typography variant="h6" className="icon-header">
            <FormattedMessage id="footer-dial-text" defaultMessage="Dial" />
          </Typography>
          <Link
            href="tel:211"
            underline="none"
            target="_blank"
            rel="noreferrer"
            aria-label="2-1-1 dial link"
            color="primary"
            sx={{ display: 'inline-block' }}
          >
            <FormattedMessage id="footer-dial-text" defaultMessage="Dial " />
            2-1-1
          </Link>
          &nbsp;
          <Typography className="font-color" sx={{ display: 'inline-block' }}>
            <FormattedMessage id="footer-or-text" defaultMessage=" or" />
            &nbsp;
          </Typography>
          <Link
            href="tel:866-760-6489"
            underline="none"
            target="_blank"
            rel="noreferrer"
            aria-label="2-1-1 dial link"
            color="primary"
            sx={{ display: 'inline-block' }}
          >
            (866) 760-6489
          </Link>
          <Typography className="font-color">
            <FormattedMessage id="footer-tollFree-text" defaultMessage="toll free" />
          </Typography>
        </Box>
      </Stack>
    );
  };

  const displayTextStack = () => {
    return (
      <Stack direction="row" gap="1rem">
        <img src={textIcon} className="twoOneOne-footer-icon" alt="text with a 2-1-1 navigator" />
        <Box>
          <Typography variant="h6" className="icon-header">
            <FormattedMessage id="footer-text-text" defaultMessage="Text " />
          </Typography>
          <Typography className="font-color displayInline">
            <FormattedMessage id="footer-text-text" defaultMessage="Text" />
          </Typography>
          &nbsp;
          <strong className="font-color">ZIP CODE</strong>
          &nbsp;
          <Typography className="font-color displayInline">
            <FormattedMessage id="footer-to-text" defaultMessage="to" />
          </Typography>
          &nbsp;
          <Link
            href="sms:898211"
            underline="none"
            target="_blank"
            rel="noreferrer"
            aria-label="2-1-1 chat link"
            color="primary"
            className="font-weight"
          >
            898-211*
          </Link>
          <Typography sx={{ marginTop: '1rem' }} className="font-color">
            <FormattedMessage
              id="footer-standardMsg-text"
              defaultMessage="*Standard message and data rates may apply."
            />
          </Typography>
        </Box>
      </Stack>
    );
  };

  const displayFirstParagraph = () => {
    return (
      <Typography>
        <FormattedMessage
          id="footer-first-paragraph"
          defaultMessage="Services found within search results may involve eligibility criteria. Please contact the resource directly to find out more information about how to obtain these services. This site contains links to other sites. All of the information provided is believed to be accurate and reliable. However, 2-1-1 Colorado assumes no responsibility for any errors appearing, nor for the use of the information provided."
        />
      </Typography>
    );
  };

  const displaySecondParagraph = () => {
    return (
      <Typography>
        <FormattedMessage
          id="footer-second-paragraph"
          defaultMessage="2-1-1 Colorado is committed to helping Colorado citizens connect with the services they need. Whether by phone
        or internet, our goal is to present accurate, well-organized and easy-to-find information from state and local
        health and human services programs. We accomplish this through the work of our four Area Information Centers
        across the state. No matter where you live in Colorado, you can dial 2-1-1 and find information about resources
        in your local community. Whether you need help finding food or housing, child care, crisis counseling or
        substance abuse treatment, one number is all you need to know."
        />
      </Typography>
    );
  };

  const displayCopyrightPolicySection = () => {
    return (
      <Box className="twoOneOne-font flexIntoRow copyright-container">
        <Typography className="privacy-policy-links">
          <FormattedMessage id="footer-copyright" defaultMessage="© Copyright 2-1-1 Colorado" />
        </Typography>
        <Box className="flexLinksIntoRow">
          <Link
            href="https://www.211colorado.org/terms-of-service/"
            underline="none"
            target="_blank"
            rel="noreferrer"
            aria-label="2-1-1 terms of service"
            className="privacy-policy-links"
          >
            <FormattedMessage id="footer-terms-of-service-link" defaultMessage="2-1-1 Terms of Service |" />
            &nbsp;
          </Link>
          <Link
            href="https://www.211colorado.org/privacy-policy/"
            underline="none"
            target="_blank"
            rel="noreferrer"
            aria-label="2-1-1 terms of service"
            className="privacy-policy-links"
          >
            <FormattedMessage id="footer-twoOneOne-privacy" defaultMessage="2-1-1 Privacy Policy |" />
            &nbsp;
          </Link>
          <Link
            href="https://www.myfriendben.org/en/data-privacy-policy"
            underline="none"
            target="_blank"
            rel="noreferrer"
            aria-label="2-1-1 terms of service"
            className="privacy-policy-links"
          >
            <FormattedMessage id="footer-twoOneOne-mfb" defaultMessage="MyFriendBen Privacy Policy" />
          </Link>
        </Box>
      </Box>
    );
  };

  return (
    <>
      <Paper elevation={0} sx={{ width: '100%', backgroundColor: '#efefef' }} square={true}>
        <Box className="twoOneOne-font flexIntoRow getHelp-text">
          <FormattedMessage
            id="footer-header"
            defaultMessage="Not finding what you are looking for? Try these other ways to get help:"
          />
        </Box>
        <Box className="flexIntoRow icon-section">
          {displayDialStack()}
          {displayTextStack()}
          {displayChatStack()}
        </Box>
      </Paper>
      <Box className="flexIntoRow footer-paragraph first-paragraph">{displayFirstParagraph()}</Box>
      <Box className="flexIntoRow footer-paragraph second-paragraph">{displaySecondParagraph()}</Box>
      <Paper elevation={0} sx={{ width: '100%', backgroundColor: '#efefef', padding: '1rem 1rem' }} square={true}>
        {displayCopyrightPolicySection()}
      </Paper>
    </>
  );
};

export default TwoOneOneFooter;
