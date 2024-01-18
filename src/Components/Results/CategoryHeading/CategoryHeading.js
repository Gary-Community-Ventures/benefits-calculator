import { ReactComponent as Food } from '../../../Assets/CategoryHeadingIcons/food.svg';
import { ReactComponent as Housing } from '../../../Assets/CategoryHeadingIcons/housing.svg';
import { ReactComponent as HealthCare } from '../../../Assets/CategoryHeadingIcons/healthcare.svg';
import ResultsTranslate from '../Translate/Translate.tsx';
import './CategoryHeading.css';

const headingOptionsMappings = {
  'Housing and Utilities': { icon: Housing },
  'Food and Nutrition': { icon: Food },
  'Health Care': { icon: HealthCare },
  Transportation: { icon: HealthCare }, // placeholder icon
};

const CategoryHeading = ({ headingType, amount }) => {
  const { icon: IconComponent } = headingOptionsMappings[headingType.default_message];

  return (
    <div className="category-heading-container">
      <div className="box-left">
        <div className="category-heading-icon" aria-label={`${headingType.default_message} icon`}>
          <IconComponent />
        </div>
        <h2 className="text-style">
          <ResultsTranslate translation={headingType} />
        </h2>
      </div>
      <div className="box-right">
        <h2 className="text-style normal-weight">${amount}/mo.</h2>
      </div>
    </div>
  );
};

export default CategoryHeading;
