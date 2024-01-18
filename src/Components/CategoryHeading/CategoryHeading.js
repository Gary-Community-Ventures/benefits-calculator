import { ReactComponent as Food } from '../../Assets/CategoryHeadingIcons/food.svg';
import { ReactComponent as Housing } from '../../Assets/CategoryHeadingIcons/housing.svg';
import { ReactComponent as HealthCare } from '../../Assets/CategoryHeadingIcons/healthcare.svg';
import benefitCategories from '../../Assets/BenefitCategoryLists/benefitCategories.tsx';
import './CategoryHeading.css';

const headingOptionsMappings = {
  housing: { icon: Housing, categoryName: benefitCategories.housingAndUtilities },
  food: { icon: Food, categoryName: benefitCategories.foodAndNutrition },
  healthcare: { icon: HealthCare, categoryName: benefitCategories.healthCare },
};

const CategoryHeading = ({ headingType, amount }) => {
  const { icon: IconComponent, categoryName } = headingOptionsMappings[headingType];
  const defaultMessage = categoryName?.props?.defaultMessage;

  return (
    <div className="category-heading-container">
      <div className="box-left">
        <div className="category-heading-icon" aria-label={`${defaultMessage} icon`}>
          <IconComponent />
        </div>
        <span className="text-style">{defaultMessage}</span>
      </div>
      <div className="box-right">
        <span className="text-style normal-weight">${amount}/mo.</span>
      </div>
    </div>
  );
};

export default CategoryHeading;
