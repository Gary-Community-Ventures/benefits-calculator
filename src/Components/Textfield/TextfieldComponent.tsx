import { TextField } from "@mui/material"
import { FormattedMessageType } from "../../Types/Questions";

type TextfieldComponentProps<T> = {
  inputName: string;
  inputType: string;
  label: FormattedMessageType;
  value: T;
  onChange: (value: T) => void;
  helperText: FormattedMessageType;
  //need to get pass this from the validation functions
  dollarField?: boolean;
  numberField?: boolean;
  valueTypeConverterFunction: (value: string) => T;
  required: boolean;
}


const TextfieldComponent = ({inputName, inputType, label, value, onChange, helperText, dollarField = false, numberField = false, valueTypeConverterFunction, required}: TextfieldComponentProps<T>) => {

  return (
      <TextField
        type={inputType}
        name={inputName}
        label={label}
        value={value}
        onChange={onChange}
        />
  );
}

export default TextfieldComponent;