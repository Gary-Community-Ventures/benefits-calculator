import { useIntl } from "react-intl";

type AriaLabelProps = {
  id: string;
  defaultMsg: string;
}

const TranslateAriaLabel = ({id, defaultMsg}: AriaLabelProps) => {
  const intl = useIntl();

  return intl.formatMessage({ id: id, defaultMessage: defaultMsg });
}

export default TranslateAriaLabel;