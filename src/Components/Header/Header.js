import { AppBar, MenuItem, Select } from '@mui/material';
import { useContext, useState } from 'react';
import { Context } from '../Wrapper/Wrapper.tsx';
import LanguageIcon from '@mui/icons-material/Language';
import { useConfig } from '../Config/configHook.tsx';
import Paper from '@mui/material/Paper';
import { useIntl } from 'react-intl';
import './Header.css';

const Header = () => {
  const context = useContext(Context);
  const { formData, getReferrer } = context;
  const languageOptions = useConfig('language_options');
  const queryString = formData.immutableReferrer ? `?referrer=${formData.immutableReferrer}` : '';
  const intl = useIntl();

  const selectLangAriaLabelProps = {
    id: 'header.selectLang-AL',
    defaultMsg: 'select a language',
  };

  const [isLanguageSelectOpen, setIsLanguageSelectOpen] = useState(false);

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
            <img src={getReferrer('logoSource')} alt={intl.formatMessage(getReferrer('logoAlt'))} className={getReferrer('logoClass')} />
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
          </div>
        </AppBar>
      </Paper>
    </nav>
  );
};

export default Header;
