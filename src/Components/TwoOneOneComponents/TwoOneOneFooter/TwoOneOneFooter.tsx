import { Paper, Stack, Typography, Link } from '@mui/material';
import Box from '@mui/material/Box';
import chatIcon from '../../../Assets/TwoOneOneAssets/chatIcon.png';
import dialIcon from '../../../Assets/TwoOneOneAssets/dialIcon.png';
import textIcon from '../../../Assets/TwoOneOneAssets/textIcon.png';
import './TwoOneOneFooter.css';

const TwoOneOneFooter = () => {
  const displayChatStack = () => {
    return (
      <Stack direction="row" gap="1rem">
        <img src={chatIcon} className="twoOneOne-footer-icon" alt="chat with a 2-1-1 navigator" />
        <Box>
          <Typography variant="h6" className="icon-header">
            Chat
          </Typography>
          <Link
            href="https://home-c27.incontact.com/inContact/ChatClient/ChatClientPatron.aspx?poc=f927e51b-f96e-477b-9052-088d1fbcdc8f&bu=4594486"
            underline="none"
            target="_blank"
            rel="noreferrer"
            aria-label="2-1-1 chat link"
            color="primary"
          >
            Click to live chat with a 2-1-1 Navigator
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
            Dial
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
            Dial 2-1-1
          </Link>{' '}
          <Typography className="font-color" sx={{ display: 'inline-block' }}>
            or
          </Typography>{' '}
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
          <Typography className="font-color">toll free</Typography>
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
            Text
          </Typography>
          <Typography className="font-color" sx={{ display: 'inline-block' }}>
            Text your
          </Typography>{' '}
          <strong className="font-color">ZIP CODE</strong> <Typography className="font-color">to</Typography>{' '}
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
            *Standard message and data rates may apply.
          </Typography>
        </Box>
      </Stack>
    );
  };

  const displayFirstParagraph = () => {
    return (
      <Typography>
        Services found within search results may involve eligibility criteria. Please contact the resource directly to
        find out more information about how to obtain these services. This site contains links to other sites. All of
        the information provided is believed to be accurate and reliable. However, 2-1-1 Colorado assumes no
        responsibility for any errors appearing, nor for the use of the information provided.
      </Typography>
    );
  };

  const displaySecondParagraph = () => {
    return (
      <Typography>
        2-1-1 Colorado is committed to helping Colorado citizens connect with the services they need. Whether by phone
        or internet, our goal is to present accurate, well-organized and easy-to-find information from state and local
        health and human services programs. We accomplish this through the work of our four Area Information Centers
        across the state. No matter where you live in Colorado, you can dial 2-1-1 and find information about
        resources in your local community. Whether you need help finding food or housing, child care, crisis
        counseling or substance abuse treatment, one number is all you need to know.
      </Typography>
    );
  }

  return (
    <>
      <Paper elevation={0} sx={{ width: '100%', backgroundColor: '#efefef' }} square={true}>
        <Stack direction="row" className="twoOneOne-font stack-container getHelp-text">
          Not finding what you are looking for? Try these other ways to get help:
        </Stack>
        <Stack direction="row" gap="1rem" className="stack-container icon-section">
          {displayDialStack()}
          {displayTextStack()}
          {displayChatStack()}
        </Stack>
      </Paper>
      <Stack direction="row" gap="1rem" className="stack-container first-paragraph">
        {displayFirstParagraph()}
      </Stack>
      <Stack direction="row" gap="1rem" className="stack-container second-paragraph">
        {displaySecondParagraph()}
      </Stack>
      <Paper elevation={0} sx={{ width: '100%', backgroundColor: '#efefef', padding: '1rem 1rem' }} square={true}>
        <Stack direction="row" className="twoOneOne-font stack-container copyright-container">
          <Typography>© Copyright 2-1-1 Colorado</Typography>
          <Stack direction="row">
            <Typography>2-1-1 Terms of Service |&nbsp;</Typography>
            <Typography>2-1-1 Privacy Policy |&nbsp;</Typography>
            <Typography>MyFriendBen Privacy Policy</Typography>
          </Stack>
        </Stack>
      </Paper>
    </>
  );
};

export default TwoOneOneFooter;
