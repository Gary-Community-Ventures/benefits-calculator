import { FormattedMessage } from 'react-intl';
import { Translation } from '../../../Types/Results';

type TranslateProps = {
  translation: Translation;
};

const ResultsTranslate = ({ translation }: TranslateProps) => {
  return <FormattedMessage id={translation.label} defaultMessage={translation.default_message} />;
};

export default ResultsTranslate;
