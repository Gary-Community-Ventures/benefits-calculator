import { ReactComponent as Food } from '../../../Assets/CategoryHeadingIcons/food.svg';
import { ReactComponent as Housing } from '../../../Assets/CategoryHeadingIcons/housing.svg';
import { ReactComponent as HealthCare } from '../../../Assets/CategoryHeadingIcons/healthcare.svg';
import ResultsTranslate from '../Translate/Translate.tsx';
import { calculateTotalValue, useResultsContext } from '../Results';

const headingOptionsMappings: { [key: string]: React.ComponentType<any> } = {
  'Housing and Utilities': Housing,
  'Food and Nutrition': Food,
  'Health Care': HealthCare,
  Transportation: HealthCare, // placeholder icon
};

type CategoryHeadingProps = {
  headingType: { default_message: string; label: string };
};

const CategoryHeading: React.FC<CategoryHeadingProps> = ({ headingType }) => {
  const { programs } = useResultsContext();
  const IconComponent = headingOptionsMappings[headingType.default_message];
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
