import { FormattedMessage } from 'react-intl';
import { Translation } from '../../../Types/Results';

type TransalteProps = {
  translation: Translation;
};

const ResultsTranslate = ({ translation }: TransalteProps) => {
  return <FormattedMessage id={translation.label} defaultMessage={translation.default_message} />;
};

export default ResultsTranslate;
