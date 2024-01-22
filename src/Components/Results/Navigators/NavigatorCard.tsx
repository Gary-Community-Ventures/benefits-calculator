import { ProgramNavigator } from '../../../Types/Results';
import ResultsTranslate from '../Translate/Translate';

type NavigatorCardProps = {
  navigators: ProgramNavigator[];
};

const NavigatorCard = ({ navigators }: NavigatorCardProps) => {
  return navigators.map((navigator) => <ResultsTranslate translation={navigator.name} />);
};

export default NavigatorCard;
