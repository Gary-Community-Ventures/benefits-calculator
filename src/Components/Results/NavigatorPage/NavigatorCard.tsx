import { ProgramNavigator } from '../../../Types/Results';
import ResultsTranslate from '../Translate/Translate';

type NavigatorCardProps = {
  navigator: ProgramNavigator;
};

const NavigatorCard = ({ navigator }: NavigatorCardProps) => {
  return <ResultsTranslate translation={navigator.name} />;
};

export default NavigatorCard;
