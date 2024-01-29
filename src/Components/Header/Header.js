import { AppBar, MenuItem, Select, Modal } from '@mui/material';
import { useContext, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Context } from '../Wrapper/Wrapper.tsx';
import LanguageIcon from '@mui/icons-material/Language';
import ShareIcon from '@mui/icons-material/Share';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import Share from '../Share/Share';
import EmailResults from '../EmailResults/EmailResults';
import languageOptions from '../../Assets/languageOptions.tsx';
import Paper from '@mui/material/Paper';
import './Header.css';

const Header = ({ handleTextfieldChange }) => {
  const context = useContext(Context);
  const { formData, getReferrer } = context;
  const queryString = formData.immutableReferrer ? `?referrer=${formData.immutableReferrer}` : '';

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
              aria-label="select a language"
              variant="standard"
              disableUnderline={true}
              open={isLanguageSelectOpen}
              onOpen={handleOpenLanguage}
              onClose={handleCloseLanguage}
              sx={{ '& .MuiSvgIcon-root': { color: '#FFFFFF' } }}
            >
              {createMenuItems(languageOptions)}
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
