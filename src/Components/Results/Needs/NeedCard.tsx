import { UrgentNeed } from '../../../Types/Results';
import ResultsTranslate from '../Translate/Translate';

type NeedsCardProps = {
  need: UrgentNeed;
};

const NeedCard = ({ need }: NeedsCardProps) => {
  return (
    <div>
      <ResultsTranslate translation={need.name} />
    </div>
  );
};

export default NeedCard;
