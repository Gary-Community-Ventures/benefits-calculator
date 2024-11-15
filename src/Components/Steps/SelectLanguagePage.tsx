import { useConfig } from '../Config/configHook.tsx';
import { FormControl, Select, InputLabel, MenuItem, SelectChangeEvent } from '@mui/material';
import { FormattedMessage } from 'react-intl';
import { Context } from '../Wrapper/Wrapper.tsx';
import { useContext, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import QuestionHeader from '../QuestionComponents/QuestionHeader.tsx';
import { useQueryString } from '../QuestionComponents/questionHooks.ts';
import FormContinueButton from '../ContinueButton/FormContinueButton.tsx';
import QuestionQuestion from '../QuestionComponents/QuestionQuestion';
import { STATES } from './SelectStatePage';

const SelectLanguagePage = () => {
  const { locale, selectLanguage, formData, setFormData } = useContext(Context);
  const languageOptions = useConfig('language_options');
  const { whiteLabel, uuid } = useParams();

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
        handleSubmit(event);
      }
    };
    document.addEventListener('keyup', continueOnEnter);
    return () => {
      document.removeEventListener('keyup', continueOnEnter); // remove event listener on unmount
    };
  });

  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();

    if (uuid !== undefined) {
      navigate(`/${whiteLabel}/${uuid}/step-2${queryString}`);
      return;
    }

    if (whiteLabel !== undefined) {
      navigate(`/${whiteLabel}/step-2${queryString}`);
      return;
    }

    const stateCodes = Object.keys(STATES);

    if (stateCodes.length > 1) {
      navigate(`/select-state${queryString}`);
      return;
    }

    setFormData({ ...formData, whiteLabel: stateCodes[0] });
    // wait for the new config to be loaded
    setTimeout(() => {
      navigate(`/${stateCodes[0]}/step-2${queryString}`);
    });
  };

  return (
    <main className="benefits-form">
      <QuestionHeader>
        <FormattedMessage id="selectLanguage.header" defaultMessage="Before you begin..." />
      </QuestionHeader>
      <QuestionQuestion>
        <FormattedMessage id="selectLanguage.subHeader" defaultMessage="What is your preferred language?" />
      </QuestionQuestion>
      <form onSubmit={handleSubmit}>
        <FormControl sx={{ mt: 1, mb: 2, minWidth: 210, maxWidth: '100%' }}>
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
