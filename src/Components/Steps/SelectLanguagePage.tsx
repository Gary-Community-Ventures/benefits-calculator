import { useConfig } from '../Config/configHook.tsx';
import { FormControl, Select, InputLabel, MenuItem, SelectChangeEvent } from '@mui/material';
import { FormattedMessage } from 'react-intl';
import { Context } from '../Wrapper/Wrapper.tsx';
import { useContext, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import QuestionHeader from '../QuestionComponents/QuestionHeader.tsx';
import { useQueryString } from '../QuestionComponents/questionHooks.ts';
import FormContinueButton from '../ContinueButton/FormContinueButton.tsx';

const SelectLanguagePage = () => {
  const { locale, selectLanguage } = useContext(Context);
  const languageOptions = useConfig('language_options');
  const { uuid } = useParams();

  const queryString = useQueryString();
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

  const handleSubmit = () => {
    if (uuid !== undefined) {
      navigate(`/${uuid}/step-2${queryString}`);
      return;
    }
    navigate(`/step-2${queryString}`);
  };

  return (
    <main className="benefits-form">
      <QuestionHeader>
        <FormattedMessage id="selectLanguage.header" defaultMessage="Before you begin..." />
      </QuestionHeader>
      <h2 className="sub-header-language-select">
        <FormattedMessage id="selectLanguage.subHeader" defaultMessage="What is your preferred language?" />
      </h2>
      <form onSubmit={handleSubmit}>
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
        <div style={{ marginTop: '1rem' }}>
          <FormContinueButton>
            <FormattedMessage id="continueButton-getStarted" defaultMessage="Get Started" />
          </FormContinueButton>
        </div>
      </form>
    </main>
  );
};

export default SelectLanguagePage;
