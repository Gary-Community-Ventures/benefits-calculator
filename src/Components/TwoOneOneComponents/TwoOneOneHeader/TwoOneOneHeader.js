import { useContext, useState, useEffect } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import {
  AppBar,
  MenuItem,
  Select,
  Link,
  IconButton,
  Dialog,
} from '@mui/material';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { useConfig } from '../../Config/configHook';
import { Context } from '../../Wrapper/Wrapper';
import twoOneOneMFBLogo from '../../../Assets/TwoOneOneAssets/twoOneOneMFBLogo.png';
import twoOneOneLinks from '../../../Assets/TwoOneOneAssets/twoOneOneLinks';
import LanguageIcon from '@mui/icons-material/Language';
import ShareIcon from '@mui/icons-material/Share';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import TwoOneOneShare from '../TwoOneOneShare/TwoOneOneShare';
import './TwoOneOneHeader.css';

const TwoOneOneHeader = () => {
  //this is so that when the users click on the cobranded logo, they're navigated back to step-1
  const { formData, locale, selectLanguage } = useContext(Context);
  const languageOptions = useConfig('language_options');
  const queryString = formData.immutableReferrer ? `?referrer=${formData.immutableReferrer}` : '';
  const intl = useIntl();

  const selectLangAriaLabelProps = {
    id: 'header.selectLang-AL',
    defaultMsg: 'select a language',
  };
  const shareButtonAriaLabelProps = {
    id: 'header.shareBtn-AL',
    defaultMsg: 'share button',
  };
  const openMenuBtnAriaLabelProps = {
    id: '211Header.openMenuBtn-AL',
    defaultMsg: 'open menu',
  };
  const closeBtnAriaLabelProps = {
    id: '211Header.closeMenuBtn-AL',
    defaultMsg: 'close menu',
  };
  const shareMFBModalAriaLabelProps = {
    id: 'header.shareMFBModal-AL',
    defaultMsg: 'share my friend ben modal',
  };
  const logoAltText = {
    id: '211Header.logo.alt',
    defaultMsg: '211 and myfriendben logo',
  };

  const [openShare, setOpenShare] = useState(false);
  const [isLanguageSelectOpen, setIsLanguageSelectOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);

  //this will disable the scroll when the hamburgerMenu is open
  useEffect(() => {
    if (openMenu) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "scroll";
    }
  }, [openMenu])

  const handleOpenShare = () => {
    setOpenShare(true);
  };

  const handleCloseShare = () => {
    setOpenShare(false);
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

  const create211Links = () => {
    const mappedLinks = twoOneOneLinks.map((link, index) => {
      return (
        <Link
          href={link.href}
          underline="none"
          target="_blank"
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
    return (
      <IconButton
        edge="end"
        color="primary"
        aria-label={
          openMenu ? intl.formatMessage(closeBtnAriaLabelProps) : intl.formatMessage(openMenuBtnAriaLabelProps)
        }
        onClick={handleOpenMenu}
        className="hamburger-icon"
      >
        {openMenu ? <CloseIcon /> : <MenuIcon />}
      </IconButton>
    );
  };

  const displayHamburgerMenu = () => {
    return (
      <Stack id="hamburger-drawer">
        {create211Links()}
      </Stack>
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
      <Paper elevation={4} square={true} className="twoOneOne-header-container">
        <AppBar position="sticky" id="twoOneOne-nav-container" elevation={0} sx={{ backgroundColor: '#FFFFFF' }}>
          <Box>
            <a href={`/step-1${queryString}`}>
              <img src={twoOneOneMFBLogo} alt={intl.formatMessage(logoAltText)} className="cobranded-logo" />
            </a>
          </Box>
          <Stack direction="row" gap=".55rem">
            <Stack direction="row" gap="0.55rem" alignItems="center" className="twoOneOne-desktop-links">
              {create211Links()}
            </Stack>
            <Stack direction="row" gap=".25rem" alignItems="center">
              <LanguageIcon className="twoOneOne-globe-icon" />
              <Select
                labelId="select-language-label"
                id="twoOneOne-select-language"
                value={locale}
                label="Language"
                onChange={handleLanguageChange}
                aria-label={intl.formatMessage(selectLangAriaLabelProps)}
                variant="standard"
                disableUnderline={true}
                open={isLanguageSelectOpen}
                onOpen={handleOpenLanguage}
                onClose={handleCloseLanguage}
                sx={{ '& .MuiSvgIcon-root': { color: '#005191' } }}
              >
                {createMenuItems(languageOptions)}
              </Select>
              <IconButton
                color="primary"
                onClick={handleOpenShare}
                aria-label={intl.formatMessage(shareButtonAriaLabelProps)}
                sx={{ padding: '0' }}
              >
                <ShareIcon role="img" />
              </IconButton>
              {displayHamburgerMenuIcon()}
            </Stack>
            <Dialog
              open={openShare}
              onClose={handleCloseShare}
              aria-label={intl.formatMessage(shareMFBModalAriaLabelProps)}
              sx={{ '& .MuiPaper-root': { borderRadius: '1rem' } }}
            >
              <TwoOneOneShare close={handleCloseShare} />
            </Dialog>
          </Stack>
        </AppBar>
        {openMenu && displayHamburgerMenu()}
      </Paper>
    </nav>
  );
};

export default TwoOneOneHeader;
