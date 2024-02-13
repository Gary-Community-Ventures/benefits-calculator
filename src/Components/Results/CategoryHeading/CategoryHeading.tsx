import { ReactComponent as Food } from '../../../Assets/CategoryHeadingIcons/food.svg';
import { ReactComponent as Housing } from '../../../Assets/CategoryHeadingIcons/housing.svg';
import { ReactComponent as HealthCare } from '../../../Assets/CategoryHeadingIcons/healthcare.svg';
import { ReactComponent as Transportation } from '../../../Assets/CategoryHeadingIcons/transportation.svg';
import { ReactComponent as TaxCredits } from '../../../Assets/CategoryHeadingIcons/taxCredits.svg';
import { ReactComponent as CashAssistance } from '../../../Assets/CategoryHeadingIcons/cashAssistant.svg';
import { ReactComponent as ChildCareYouthEducation } from '../../../Assets/CategoryHeadingIcons/childCareYouthEducation.svg';
import ResultsTranslate from '../Translate/Translate.tsx';
import { calculateTotalValue, useResultsContext } from '../Results';
import { Translation } from '../../../Types/Results.ts';

export const headingOptionsMappings: { [key: string]: React.ComponentType } = {
  'Housing and Utilities': Housing,
  'Food and Nutrition': Food,
  'Health Care': HealthCare,
  Transportation: Transportation,
  'Tax Credits': TaxCredits,
  'Cash Assistance': CashAssistance,
  'Child Care, Youth, and Education': ChildCareYouthEducation,
};

type CategoryHeadingProps = {
  headingType: Translation;
};

const CategoryHeading: React.FC<CategoryHeadingProps> = ({ headingType }) => {
  const { programs } = useResultsContext();

  let IconComponent = headingOptionsMappings[headingType.default_message];

  if (IconComponent === undefined) {
    // if there is a category not in the list of categories use a default icon
    IconComponent = CashAssistance;
  }

  const amount = calculateTotalValue(programs, headingType.default_message);

  return (
    <div className="category-heading-container">
      <div className="box-left">
        <div className="category-heading-icon" aria-label={`${headingType.default_message} icon`}>
          <IconComponent />
        </div>
        <h2 className="category-heading-text-style">
          <ResultsTranslate translation={headingType} />
        </h2>
      </div>
      <div className="box-right">
        <h2 className="category-heading-text-style normal-weight">${amount}/mo.</h2>
      </div>
    </div>
  );
};

export default CategoryHeading;
