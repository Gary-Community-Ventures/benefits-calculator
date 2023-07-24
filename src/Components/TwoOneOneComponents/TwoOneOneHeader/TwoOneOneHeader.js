import { useContext, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { AppBar, MenuItem, Select, Modal, Link } from '@mui/material';
import { Context } from '../../Wrapper/Wrapper';
import twoOneOneMFBLogo from '../../../Assets/twoOneOneMFBLogo.png';
import twoOneOneLinks from '../../../Assets/twoOneOneLinks';
import LanguageIcon from '@mui/icons-material/Language';
import ShareIcon from '@mui/icons-material/Share';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import Share from '../../Share/Share';
import EmailResults from '../../EmailResults/EmailResults';
import './TwoOneOneHeader.css';

const TwoOneOneHeader = ({ handleTextfieldChange }) => {
  //this is so that when the users click on the cobranded logo, they're navigated back to step-0
  const context = useContext(Context);
  const { formData } = context;
  const { urlSearchParams } = formData;

  //this is for the results icon to conditionally show up
  const location = useLocation();
  const urlRegex = /^\/(?:\/results\/(.+)|(.+)\/results)\/?$/;
  const url = location.pathname.match(urlRegex);
  const isResults = url !== null;
  const screenUUID = url ? url[2] ?? url[1] : undefined;


  const [openShare, setOpenShare] = useState(false);
  const [openEmailResults, setOpenEmailResults] = useState(false);
  const [isLanguageSelectOpen, setIsLanguageSelectOpen] = useState(false);

  const handleOpenShare = () => {
    setOpenShare(true);
  };

  const handleCloseShare = () => {
    setOpenShare(false);
  };

  const handleOpenEmailResults = () => {
    setOpenEmailResults(true);
  };

  const handleCloseEmailResults = () => {
    setOpenEmailResults(false);
  };

  const handleCloseLanguage = () => {
    setIsLanguageSelectOpen(false);
  };

  const handleOpenLanguage = () => {
    setIsLanguageSelectOpen(true);
  };

  const handleLanguageChange = (event) => {
    context.selectLanguage(event);
  };

  const setRenderValue = () => {
    const currentLocale = context.locale;
    switch (currentLocale) {
      case 'en-US':
        return 'EN';
      case 'es':
        return 'ES';
      case 'vi':
        return 'VI';
      default:
        return 'EN';
    }
  };

  const createAllHeaderLinks = () => {
    const mappedLinks = twoOneOneLinks.map((link, index) => {
      return (
        <Link
          href={link.href}
          underline="none"
          target="_blank"
          rel="noreferrer"
          aria-label={link.ariaLabel}
          key={link.defaultMsg + index}
          className='twoOneOneMenuLink'
        >
          <FormattedMessage id={link.formattedMsgId} defaultMessage={link.name} />
        </Link>
      );
    });

    return mappedLinks;
  };

  return (
    <nav>
      <AppBar position="sticky" id="nav-container" sx={{ flexDirection: 'row', backgroundColor: '#FFFFFF' }}>
        <a href={`/step-0${urlSearchParams}`} className="home-link">
          <img src={twoOneOneMFBLogo} alt="211 and my friend ben home page button" className="logo cobranded-logo" />
        </a>
        {createAllHeaderLinks()}
        <div className="icon-wrapper">
          <Select
            labelId="select-language-label"
            id='twoOneOne-select-language'
            value={context.locale}
            label="Language"
            onChange={handleLanguageChange}
            aria-label="select a language"
            variant="standard"
            disableUnderline={true}
            open={isLanguageSelectOpen}
            onOpen={handleOpenLanguage}
            onClose={handleCloseLanguage}
            IconComponent={LanguageIcon}
            renderValue={() => setRenderValue()}
            sx={{ '& .MuiSvgIcon-root': { right: '1.5rem', color: '#005191' } }}
            >
            <MenuItem value="en-US" sx={{color: '#005191'}}>English</MenuItem>
            <MenuItem value="es" sx={{color: '#005191'}}>Español</MenuItem>
            <MenuItem value="vi" sx={{color: '#005191'}}>Tiếng Việt</MenuItem>
          </Select>
          <button className="icon-container" onClick={handleOpenShare} aria-label="share button">
            <ShareIcon role="img" />
          </button>
          {/* {isResults && ( */}
            <button className="icon-container" onClick={handleOpenEmailResults} aria-label="email results button">
              <SaveAltIcon role="img" />
            </button>
          {/* )} */}
        </div>
        <Modal open={openShare} onClose={handleCloseShare} aria-labelledby="share-my-friend-ben-modal">
          <Share close={handleCloseShare} id="share-my-friend-ben-modal" />
        </Modal>
        <Modal open={openEmailResults} onClose={handleCloseEmailResults} aria-labelledby="email-results-modal">
          <EmailResults
            handleTextfieldChange={handleTextfieldChange}
            screenId={screenUUID}
            close={handleCloseEmailResults}
            id="email-results-modal"
            />
        </Modal>
      </AppBar>
    </nav>
  );
};

export default TwoOneOneHeader;
