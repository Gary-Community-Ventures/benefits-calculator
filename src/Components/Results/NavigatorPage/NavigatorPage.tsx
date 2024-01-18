import { ProgramNavigator } from '../../../Types/Results';
import NavigatorCard from './NavigatorCard';

type NavigatorPageProps = {
  navigators: ProgramNavigator[];
};

const NavigatorPage = ({ navigators }: NavigatorPageProps) => {
  return navigators.map((navigator, index) => {
    return <NavigatorCard navigator={navigator} key={index} />;
  });
};

export default NavigatorPage;
