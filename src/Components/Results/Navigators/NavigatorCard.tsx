import { ProgramNavigator } from '../../../Types/Results';
import ResultsTranslate from '../Translate/Translate';

type NavigatorCardProps = {
  navigators: ProgramNavigator[];
};

const NavigatorCard = ({ navigators }: NavigatorCardProps) => {
  return navigators.map((navigator, i) => <ResultsTranslate translation={navigator.name} key={i} />);
};

export default NavigatorCard;
