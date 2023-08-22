import { AppBar, MenuItem, Select, Modal } from '@mui/material';
import { useContext, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Context } from '../Wrapper/Wrapper.tsx';
import LanguageIcon from '@mui/icons-material/Language';
import ShareIcon from '@mui/icons-material/Share';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import Share from '../Share/Share';
import EmailResults from '../EmailResults/EmailResults';
import MFBLogo from '../../Assets/logo.png';
import BIAMFBLogo from '../../Assets/biamfbcombinedlogo.png';
import JHSAMFBLogo from '../../Assets/JeffcoAssets/jeffcobrand.png';
import Paper from '@mui/material/Paper';
import './Header.css';

const Header = ({ handleTextfieldChange }) => {
  const context = useContext(Context);
  const { formData } = context;
  const { urlSearchParams, referralSource } = formData;

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

  const getLogoSource = (refSource) => {
    switch (refSource) {
      case 'bia':
        return BIAMFBLogo;
      case 'jeffcohs':
        return JHSAMFBLogo;
      default:
        return MFBLogo;
    }
  };

  const getAltText = (refSource) => {
    switch (refSource) {
      case 'bia':
        return 'benefits in action and my friend ben home page button';
      case 'jeffcohs':
        return 'jeffco human services and my friend ben home page button';
      default:
        return 'my friend ben home page button';
    }
  };

  return (
    <nav>
      <Paper elevation={4} sx={{ width: '100%', height: '50px', backgroundColor: '#2A2B2A' }} square={true}>
        <AppBar position="sticky" id="nav-container" elevation={0} sx={{ backgroundColor: '#2A2B2A' }}>
          <a href={`/step-1${urlSearchParams}`} className="home-link">
            <img src={getLogoSource(referralSource)} alt={getAltText(referralSource)} className="logo" />
          </a>
          <div className="icon-wrapper">
            <Select
              labelId="select-language-label"
              id="select-language"
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
              sx={{ '& .MuiSvgIcon-root': { right: '1.5rem', color: '#FFFFFF' } }}
            >
              <MenuItem value="en-US">English</MenuItem>
              <MenuItem value="es">Español</MenuItem>
              <MenuItem value="vi">Tiếng Việt</MenuItem>
            </Select>
            <button className="icon-container" onClick={handleOpenShare} aria-label="share button">
              <ShareIcon role="img" />
            </button>
            {isResults && (
              <button className="icon-container" onClick={handleOpenEmailResults} aria-label="email results button">
                <SaveAltIcon role="img" />
              </button>
            )}
          </div>
        </AppBar>
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
      </Paper>
    </nav>
  );
};

export default Header;
