import { useResultsContext } from '../Results';
import NeedCard from './NeedCard';
import { ResultsMessageForNeeds } from '../../Referrer/Referrer';

const Needs = () => {
  const { needs } = useResultsContext();
  const needsSortedByCategory = needs.sort((a, b) => {
    if (a.type.default_message > b.type.default_message) {
      return 1;
    } else if (a.type.default_message < b.type.default_message) {
      return -1;
    }

    return 0;
  });

  return (
    <>
      <ResultsMessageForNeeds />
      {needsSortedByCategory.map((need, index) => {
        return <NeedCard need={need} key={index} />;
      })}
    </>
  );
};

export default Needs;
