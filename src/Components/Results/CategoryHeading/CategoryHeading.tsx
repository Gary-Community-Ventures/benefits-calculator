import { ReactComponent as Food } from '../../../Assets/CategoryHeadingIcons/food.svg';
import { ReactComponent as Housing } from '../../../Assets/CategoryHeadingIcons/housing.svg';
import { ReactComponent as HealthCare } from '../../../Assets/CategoryHeadingIcons/healthcare.svg';
import { ReactComponent as Transportation } from '../../../Assets/CategoryHeadingIcons/transportation.svg';
import { ReactComponent as TaxCredits } from '../../../Assets/CategoryHeadingIcons/taxCredits.svg';
import { ReactComponent as CashAssistance } from '../../../Assets/CategoryHeadingIcons/cashAssistant.svg';
import { ReactComponent as ChildCareYouthEducation } from '../../../Assets/CategoryHeadingIcons/childCareYouthEducation.svg';
import { calculateTotalValue, formatToUSD } from '../FormattedValue';
import { FormattedMessage, useIntl } from 'react-intl';
import ResultsTranslate from '../Translate/Translate.tsx';
import { useTranslateNumber } from '../../../Assets/languageOptions';
import { ProgramCategory } from '../../../Types/Results';

export const headingOptionsMappings: { [key: string]: React.ComponentType } = {
  housing: Housing,
  food: Food,
  health_care: HealthCare,
  transportation: Transportation,
  tax_credit: TaxCredits,
  cash: CashAssistance,
  child_care: ChildCareYouthEducation,
};

type CategoryHeadingProps = {
  category: ProgramCategory;
};

const CategoryHeading = ({ category }: CategoryHeadingProps) => {
  const intl = useIntl();
  const translateNumber = useTranslateNumber();

  let IconComponent = headingOptionsMappings[category.icon];

  if (IconComponent === undefined) {
    // if there is a category not in the list of categories use a default icon
    IconComponent = CashAssistance;
  }

  const monthlyCategoryAmt = calculateTotalValue(category) / 12;
  const categoryImageAriaLabelProps = {
    id: category.name.label,
    defaultMsg: category.name.default_message,
  };
  const iconTranslation = intl.formatMessage({ id: 'categoryHeading.icon', defaultMessage: 'icon' });

  return (
    <div>
      <div className="category-heading-container">
        <div className="category-heading-column">
          <div
            className="category-heading-icon"
            aria-label={`${intl.formatMessage(categoryImageAriaLabelProps)} ${iconTranslation}`}
            role="img"
          >
            <IconComponent />
          </div>
          <h2 className="category-heading-text-style">
            <ResultsTranslate translation={category.name} />
          </h2>
        </div>
        <div className="box-right">
          <h2 className="category-heading-text-style normal-weight">
            {translateNumber(formatToUSD(monthlyCategoryAmt))}
            <FormattedMessage id="program-card-month-txt" defaultMessage="/month" />
          </h2>
        </div>
      </div>
      {category.description.default_message !== '' && (
        <p className="child-care-warning-text">
          <ResultsTranslate translation={category.description} />
        </p>
      )}
    </div>
  );
};

export default CategoryHeading;
