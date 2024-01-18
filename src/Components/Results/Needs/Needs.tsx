import { useResultsContext } from '../Results';
import NeedCard from './NeedCard';

const Needs = () => {
  const { needs } = useResultsContext();
  return needs.map((need, index) => {
    return <NeedCard need={need} key={index} />;
  });
};

export default Needs;
