import { ReactComponent as Food } from '../../../Assets/CategoryHeadingIcons/food.svg';
import { ReactComponent as Housing } from '../../../Assets/CategoryHeadingIcons/housing.svg';
import { ReactComponent as HealthCare } from '../../../Assets/CategoryHeadingIcons/healthcare.svg';
import { ReactComponent as Transportation } from '../../../Assets/CategoryHeadingIcons/transportation.svg';
import { ReactComponent as TaxCredits } from '../../../Assets/CategoryHeadingIcons/taxCredits.svg';
import { ReactComponent as CashAssistance } from '../../../Assets/CategoryHeadingIcons/cashAssistant.svg';
import { ReactComponent as ChildCareYouthEducation } from '../../../Assets/CategoryHeadingIcons/childCareYouthEducation.svg';
import { useResultsContext } from '../Results';
import { calculateTotalValue, formatToUSD } from '../FormattedValue';
import { Translation } from '../../../Types/Results.ts';
import { FormattedMessage } from 'react-intl';
import ResultsTranslate from '../Translate/Translate.tsx';
import { PRESCHOOL_CATEGORY } from '../../../Assets/resultsConstants.ts';
import TranslateAriaLabel from '../Translate/TranslateAriaLabel.tsx';

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

  const monthlyCategoryAmt = calculateTotalValue(programs, headingType.default_message) / 12;
  const savedTranslation = <ResultsTranslate translation={headingType} />;
  const categoryImageAriaLabelProps = {
    id: savedTranslation.props.translation.label,
    defaultMsg: savedTranslation.props.translation.default_message,
  };
  const iconTranslation = TranslateAriaLabel({ id: 'categoryHeading.icon', defaultMsg: 'icon'})

  return (
    <div>
      <div className="category-heading-container">
        <div className="category-heading-column">
          <div className="category-heading-icon" aria-label={`${TranslateAriaLabel(categoryImageAriaLabelProps)} ${iconTranslation}`} role="img">
            <IconComponent />
          </div>
          <h2 className="category-heading-text-style">
            <ResultsTranslate translation={headingType} />
          </h2>
        </div>
        <div className="box-right">
          <h2 className="category-heading-text-style normal-weight">
            {formatToUSD(monthlyCategoryAmt)}
            <FormattedMessage id="program-card-month-txt" defaultMessage="/month" />
          </h2>
        </div>
      </div>
      {headingType.default_message === PRESCHOOL_CATEGORY && (
        <p className="child-care-warning-text">
          <FormattedMessage
            id="benefitCategories.childCareHelperText"
            defaultMessage="This monthly value is an estimate of the combined average value of child care and preschool programs. Savings from programs may overlap."
          />
        </p>
      )}
    </div>
  );
};

export default CategoryHeading;
