import { FormControl, Select, InputLabel, MenuItem, SelectChangeEvent, Button, Box } from '@mui/material';
import { FormattedMessage } from 'react-intl';
import { Context } from '../Wrapper/Wrapper.tsx';
import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import languageOptions from '../../Assets/languageOptions.tsx';

const SelectLanguagePage = () => {
  const { formData, locale, selectLanguage } = useContext(Context);
  const queryString = formData.immutableReferrer ? `?referrer=${formData.immutableReferrer}` : '';
  const navigate = useNavigate();

  const createMenuItems = (optionList: Record<string, string>, disabledFMId: string, disabledFMDefault: string) => {
    const disabledSelectMenuItem = (
      <MenuItem value="disabled-select" key="disabled-select" disabled>
        <FormattedMessage id={disabledFMId} defaultMessage={disabledFMDefault} />
      </MenuItem>
    );
    const menuItemKeyLabelPairArr = Object.entries(optionList);

    const dropdownMenuItems = menuItemKeyLabelPairArr.map((key) => {
      return (
        <MenuItem value={key[0]} key={key[0]}>
          {key[1]}
        </MenuItem>
      );
    });

    return [disabledSelectMenuItem, dropdownMenuItems];
  };

  useEffect(() => {
    const continueOnEnter = (event: KeyboardEvent) => {
      if (event.key === 'Enter') {
        navigate(`/step-2${queryString}`);
      }
    };
    document.addEventListener('keyup', continueOnEnter);
    return () => {
      document.removeEventListener('keyup', continueOnEnter); // remove event listener on unmount
    };
  });

  return (
    <main className="benefits-form">
      <h1 className="sub-header">
        <FormattedMessage id="selectLanguage.header" defaultMessage="Before you begin..." />
      </h1>
      <h2 className="sub-header-language-select">
        <FormattedMessage id="selectLanguage.subHeader" defaultMessage="What is your preferred language?" />
      </h2>
      <FormControl sx={{ width: '150px' }}>
        <InputLabel id="language-select-label">
          <FormattedMessage id="selectLang.text" defaultMessage="Language" />
        </InputLabel>
        <Select
          labelId="language-select-label"
          id="language-select"
          value={locale}
          label={<FormattedMessage id="selectLang.text" defaultMessage="Language" />}
          //@ts-ignore
          onChange={(event: SelectChangeEvent<string>) => selectLanguage(event)}
        >
          {createMenuItems(languageOptions, 'selectLang.disabledSelectMenuItemText', 'Select a language')}
        </Select>
      </FormControl>
      <Box sx={{ mt: '1rem' }}>
        <Button variant="contained" onClick={() => navigate(`/step-2${queryString}`)}>
          <FormattedMessage id="continueButton-getStarted" defaultMessage="Get Started" />
        </Button>
      </Box>
    </main>
  );
};

export default SelectLanguagePage;
