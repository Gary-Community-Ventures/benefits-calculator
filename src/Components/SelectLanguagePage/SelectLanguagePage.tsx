
import { languageSelectHasError, displayLanguageHasErrorText, useErrorController } from "../../Assets/validationFunctions";
import { FormattedMessage } from "react-intl";
import languageOptions from '../../Assets/languageOptions.tsx';
import BasicSelect from "../DropdownMenu/BasicSelect.tsx";

const SelectLanguagePage = () => {
  const componentDetails = {
    componentType: 'BasicSelect',
    inputName: 'language',
    inputError: languageSelectHasError,
    inputHelperText: displayLanguageHasErrorText,
    componentProperties: {
      labelId: 'language-select',
      inputLabelText: <FormattedMessage id="selectLang.text" defaultMessage="Language" />,
      id: 'language-select',
      value: 'language',
      label: <FormattedMessage id="selectLang.text" defaultMessage="Language" />,
      disabledSelectMenuItemText: (
        <FormattedMessage
          id="selectLang.disabledSelectMenuItemText"
          defaultMessage="Select a language"
        />
      ),
    },
    options: languageOptions,
  };

  const errorController = useErrorController(languageSelectHasError, displayLanguageHasErrorText);

  return (
    <BasicSelect
      componentDetails={componentDetails}
      options={languageOptions}
      formDataProperty="language"
      submitted={0}
      errorController={errorController}
    />
  )
}

export default SelectLanguagePage;