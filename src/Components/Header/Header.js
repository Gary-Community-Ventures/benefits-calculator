import { AppBar, MenuItem, Select, Modal } from '@mui/material';
import { useContext, useState } from 'react';
import { Context } from '../Wrapper/Wrapper.tsx';
import LanguageIcon from '@mui/icons-material/Language';
import ShareIcon from '@mui/icons-material/Share';
import Share from '../Share/Share';
import languageOptions from '../../Assets/languageOptions.tsx';
import Paper from '@mui/material/Paper';
import { useIntl } from 'react-intl';
import './Header.css';

const Header = () => {
  const context = useContext(Context);
  const { formData, getReferrer } = context;
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
  const shareMFBModalAriaLabelProps = {
    id: 'header.shareMFBModal-AL',
    defaultMsg: 'share my friend ben modal',
  };

  const [openShare, setOpenShare] = useState(false);
  const [isLanguageSelectOpen, setIsLanguageSelectOpen] = useState(false);

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

  const createMenuItems = (optionList) => {
    const menuItemKeyLabelPairArr = Object.entries(optionList);

    const dropdownMenuItems = menuItemKeyLabelPairArr.map((key) => {
      return (
        <MenuItem value={key[0]} key={key[0]}>
          {key[1]}
        </MenuItem>
      );
    });

    return dropdownMenuItems;
  };

  return (
    <nav>
      <Paper className="header-full-width-container" square={true} elevation={0}>
        <AppBar id="nav-container" position="sticky" elevation={0}>
          <a href={`/step-1${queryString}`} className="home-link">
            <img src={getReferrer('logoSource')} alt={getReferrer('logoAlt')} className={getReferrer('logoClass')} />
          </a>
          <div className="icon-wrapper">
            <LanguageIcon />
            <Select
              labelId="select-language-label"
              id="select-language"
              placeholder="Change Language"
              value={context.locale}
              label="Language"
              onChange={(event) => context.selectLanguage(event)}
              aria-label={intl.formatMessage(selectLangAriaLabelProps)}
              variant="standard"
              disableUnderline={true}
              open={isLanguageSelectOpen}
              onOpen={handleOpenLanguage}
              onClose={handleCloseLanguage}
              sx={{ '& .MuiSvgIcon-root': { color: '#FFFFFF' } }}
            >
              {createMenuItems(languageOptions)}
            </Select>
            <button
              className="icon-container"
              onClick={handleOpenShare}
              aria-label={intl.formatMessage(shareButtonAriaLabelProps)}
            >
              <ShareIcon role="img" />
            </button>
          </div>
        </AppBar>
        <Modal open={openShare} onClose={handleCloseShare} aria-label={intl.formatMessage(shareMFBModalAriaLabelProps)}>
          <Share close={handleCloseShare} />
        </Modal>
      </Paper>
    </nav>
  );
};

export default Header;
