import { UrgentNeed } from '../../../Types/Results';
import ResultsTranslate from '../Translate/Translate';

type NeedsCardProps = {
  need: UrgentNeed;
};

const NeedCard = ({ need }: NeedsCardProps) => {
  return (
    <>
      <ResultsTranslate translation={need.name} />
    </>
  );
};

export default NeedCard;
