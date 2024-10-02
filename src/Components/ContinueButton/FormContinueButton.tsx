import { Button } from "@mui/material";
import { FormattedMessageType } from "../../Types/Questions";

type FormContinueButtonProps = {
  formattedMessage: FormattedMessageType;
};

const FormContinueButton = ({formattedMessage}: FormContinueButtonProps) => {
  return (
    <Button variant="contained" type="submit">
      {formattedMessage}
    </Button>
  );
}

export default FormContinueButton;