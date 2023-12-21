import { Link, useParams } from 'react-router-dom';

type ResultsTabsProps = {
  currentTab: 'program' | 'need';
};

const ResultsTabs = ({ currentTab }: ResultsTabsProps) => {
  const { uuid } = useParams();

  return (
    <>
      <Link to={`/${uuid}/results/benefits`}>Benfits</Link>
      <Link to={`/${uuid}/results/near-term-needs`}>Needs</Link>;
    </>
  );
};

export default ResultsTabs;
