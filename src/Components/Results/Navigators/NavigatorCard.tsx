import { ProgramNavigator } from '../../../Types/Results';
import ResultsTranslate from '../Translate/Translate';

type NavigatorCardProps = {
  navigators: ProgramNavigator[];
};

const NavigatorCard = ({ navigators }: NavigatorCardProps) => {
  return navigators.map((navigator, index) => <ResultsTranslate translation={navigator.name} key={index} />);
};

export default NavigatorCard;
