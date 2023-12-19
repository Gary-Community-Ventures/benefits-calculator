import { useContext, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { AppBar, MenuItem, Select, Modal, Link, IconButton } from '@mui/material';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { Context } from '../../Wrapper/Wrapper';
import twoOneOneMFBLogo from '../../../Assets/TwoOneOneAssets/twoOneOneMFBLogo.png';
import twoOneOneLinks from '../../../Assets/TwoOneOneAssets/twoOneOneLinks';
import LanguageIcon from '@mui/icons-material/Language';
import ShareIcon from '@mui/icons-material/Share';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import Share from '../../Share/Share';
import CloseIcon from '@mui/icons-material/Close';
import EmailResults from '../../EmailResults/EmailResults';
import languageOptions from '../../../Assets/languageOptions';
import './TwoOneOneHeader.css';

const TwoOneOneHeader = ({ handleTextfieldChange }) => {
  //this is so that when the users click on the cobranded logo, they're navigated back to step-1
  const { formData, locale, selectLanguage } = useContext(Context);
  const queryString = formData.immutableReferrer ? `?referrer=${formData.immutableReferrer}` : '';

  //this is for the results icon to conditionally show up
  const location = useLocation();
  const urlRegex = /^\/(?:\/results\/(.+)|(.+)\/results)\/?$/;
  const url = location.pathname.match(urlRegex);
  const isResults = url !== null;
  const screenUUID = url ? url[2] ?? url[1] : undefined;

  const [openShare, setOpenShare] = useState(false);
  const [openEmailResults, setOpenEmailResults] = useState(false);
  const [isLanguageSelectOpen, setIsLanguageSelectOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);

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
    selectLanguage(event);
  };

  const handleOpenMenu = () => {
    setOpenMenu(!openMenu);
  };

  const setRenderValue = () => {
    const currentLocale = locale;
    return currentLocale.slice(0, 2).toLocaleUpperCase();
  };

  const create211Links = () => {
    const mappedLinks = twoOneOneLinks.map((link, index) => {
      return (
        <Link
          href={link.href}
          underline="none"
          target="_blank"
          rel="noreferrer"
          aria-label={link.ariaLabel}
          className="twoOneOneMenuLink"
          key={link.defaultMsg + index}
        >
          <FormattedMessage id={link.formattedMsgId} defaultMessage={link.defaultMsg} />
        </Link>
      );
    });

    return mappedLinks;
  };

  const displayHamburgerMenuIcon = () => {
    if (openMenu) {
      return (
        <IconButton
          edge="end"
          color="primary"
          aria-label="open menu"
          onClick={handleOpenMenu}
          className="hamburger-icon"
        >
          <CloseIcon />
        </IconButton>
      );
    } else {
      return (
        <IconButton
          edge="end"
          color="primary"
          aria-label="open menu"
          onClick={handleOpenMenu}
          className="hamburger-icon"
        >
          <MenuIcon />
        </IconButton>
      );
    }
  };

  const displayHamburgerMenu = () => {
    return (
      <Drawer
        className="hamburger-drawer"
        anchor="right"
        variant="temporary"
        open={openMenu}
        onClose={handleOpenMenu}
        sx={{
          zIndex: 1000,
          [`& .MuiDrawer-paper`]: {
            mt: '50px',
            width: '100%',
            boxShadow: `inset 0px 2px 4px -1px rgba(0,0,0,0.2),
                        inset 0px 4px 5px 0px rgba(0,0,0,0.14),
                        inset 0px 1px 10px 0px rgba(0,0,0,0.12)`,
          },
        }}
      >
        <Stack gap="1rem" alignItems="end" sx={{ margin: '1rem' }}>
          {create211Links()}
        </Stack>
      </Drawer>
    );
  };

  const createMenuItems = (optionList) => {
    const menuItemKeyLabelPairArr = Object.entries(optionList);

    const dropdownMenuItems = menuItemKeyLabelPairArr.map((key) => {
      return (
        <MenuItem value={key[0]} key={key[0]} sx={{ color: '#005191' }}>
          {key[1]}
        </MenuItem>
      );
    });

    return dropdownMenuItems;
  };

  return (
    <nav>
      <Paper elevation={4} sx={{ width: '100%', height: '50px', backgroundColor: '#FFFFFF' }} square={true}>
        <AppBar position="sticky" id="twoOneOne-nav-container" elevation={0} sx={{ backgroundColor: '#FFFFFF' }}>
          <Box>
            <a href={`/step-1${queryString}`}>
              <img src={twoOneOneMFBLogo} alt="211 and myfriendben logo" className="cobranded-logo" />
            </a>
          </Box>
          <Stack direction="row">
            <Stack direction="row" gap="1rem" alignItems="center" className="twoOneOne-desktop-links">
              {create211Links()}
            </Stack>
            <Stack direction="row" sx={{ marginLeft: '3rem' }} className="twoOneOne-remove-leftMargin">
              <Select
                labelId="select-language-label"
                id="twoOneOne-select-language"
                value={locale}
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
                sx={{ '& .MuiSvgIcon-root': { right: '1.25rem', color: '#005191' } }}
              >
                {createMenuItems(languageOptions)}
              </Select>
              <IconButton color="primary" onClick={handleOpenShare} aria-label="share button">
                <ShareIcon role="img" />
              </IconButton>
              {isResults && (
                <IconButton onClick={handleOpenEmailResults} aria-label="email results button" color="primary">
                  <SaveAltIcon role="img" />
                </IconButton>
              )}
              {displayHamburgerMenuIcon()}
              {displayHamburgerMenu()}
            </Stack>
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
          </Stack>
        </AppBar>
      </Paper>
    </nav>
  );
};

export default TwoOneOneHeader;
