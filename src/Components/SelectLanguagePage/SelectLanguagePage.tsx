
import { FormControl, Select, InputLabel, MenuItem, SelectChangeEvent } from "@mui/material";
// import { languageSelectHasError, displayLanguageHasErrorText, useErrorController } from "../../Assets/validationFunctions.tsx";
import { FormattedMessage } from "react-intl";
import languageOptions from '../../Assets/languageOptions.tsx';
import { Context } from "../Wrapper/Wrapper.tsx";
import { useContext } from "react";

const SelectLanguagePage = () => {
  const context = useContext(Context);

  const createMenuItems = (optionList:Record<string, string>, disabledFMId: string, disabledFMDefault: string) => {
    const disabledSelectMenuItem = (
      <MenuItem value="disabled-select" key="disabled-select" disabled>
        <FormattedMessage id={disabledFMId} defaultMessage={disabledFMDefault} />
      </MenuItem>
    );
    const menuItemKeys = Object.keys(optionList);
    const menuItemLabels = Object.values(optionList);

    const dropdownMenuItems = menuItemKeys.map((option, i) => {
      return (
        <MenuItem value={option} key={option}>
          {menuItemLabels[i]}
        </MenuItem>
      );
    });

    return [disabledSelectMenuItem, dropdownMenuItems];
  };

  useEffect(() => {
    const continueOnEnter = (event:Event) => {
      if (event.key === 'Enter') {
        navigate(`/${uuid}/results`);
      }
    };
    document.addEventListener('keyup', continueOnEnter);
    return () => {
      document.removeEventListener('keyup', continueOnEnter); // remove event listener on onmount
    };
  });

  return (
    <main className="benefits-form">
      <h1 className="sub-header">
        <FormattedMessage
          id="selectLanguage.header"
          defaultMessage="Before you begin, what is your preferred language?"
        />
      </h1>
      <FormControl>
        <InputLabel id="language-select-label">
          <FormattedMessage id="selectLang.text" defaultMessage="Language" />
        </InputLabel>
        <Select
          labelId="language-select-label"
          id="language-select"
          value={context.locale}
          label={<FormattedMessage id="selectLang.text" defaultMessage="Language" />}
          onChange={(event: SelectChangeEvent<string>) => context.selectLanguage(event)}
        >
          {createMenuItems(languageOptions, 'selectLang.disabledSelectMenuItemText', 'Select a language')}
        </Select>
      </FormControl>
    </main>
  );
}

export default SelectLanguagePage;