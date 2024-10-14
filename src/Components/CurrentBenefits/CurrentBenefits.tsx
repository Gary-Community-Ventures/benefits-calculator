import { FormattedMessage, useIntl } from 'react-intl';
import { useState, useEffect } from 'react';
import { getAllLongTermPrograms, getAllNearTermPrograms } from '../../apiCalls';
import { Translation } from '../../Types/Results';
import ResultsTranslate from '../Results/Translate/Translate';
import { ReactComponent as Food } from '../../Assets/CategoryHeadingIcons/food.svg';
import { ReactComponent as Housing } from '../../Assets/CategoryHeadingIcons/housing.svg';
import { ReactComponent as HealthCare } from '../../Assets/CategoryHeadingIcons/healthcare.svg';
import { ReactComponent as Transportation } from '../../Assets/CategoryHeadingIcons/transportation.svg';
import { ReactComponent as TaxCredits } from '../../Assets/CategoryHeadingIcons/taxCredits.svg';
import { ReactComponent as CashAssistance } from '../../Assets/CategoryHeadingIcons/cashAssistant.svg';
import { ReactComponent as ChildCareYouthEducation } from '../../Assets/CategoryHeadingIcons/childCareYouthEducation.svg';
import { ReactComponent as FoodOrGroceries } from '../../Assets/OptionCardIcons/AcuteConditions/food.svg';
import { ReactComponent as BabySupplies } from '../../Assets/OptionCardIcons/AcuteConditions/baby_supplies.svg';
import { ReactComponent as ManagingHousingCosts } from '../../Assets/OptionCardIcons/AcuteConditions/housing.svg';
import { ReactComponent as BehavioralHealth } from '../../Assets/OptionCardIcons/AcuteConditions/support.svg';
import { ReactComponent as ChildDevelopment } from '../../Assets/OptionCardIcons/AcuteConditions/child_development.svg';
import { ReactComponent as FamilyPlanning } from '../../Assets/OptionCardIcons/AcuteConditions/family_planning.svg';
import { ReactComponent as JobResources } from '../../Assets/OptionCardIcons/AcuteConditions/job_resources.svg';
import { ReactComponent as DentalCare } from '../../Assets/OptionCardIcons/AcuteConditions/dental_care.svg';
import { ReactComponent as LegalServices } from '../../Assets/OptionCardIcons/AcuteConditions/legal_services.svg';
import LoadingPage from '../LoadingPage/LoadingPage';
import './CurrentBenefits.css';
import QuestionHeader from '../QuestionComponents/QuestionHeader';
import { useTranslateNumber } from '../../Assets/languageOptions';

export const iconCategoryMap: { [key: string]: React.ComponentType } = {
  housing: Housing,
  food: Food,
  health_care: HealthCare,
  transportation: Transportation,
  tax_credit: TaxCredits,
  cash: CashAssistance,
  child_care: ChildCareYouthEducation,
  'Food or Groceries': FoodOrGroceries,
  'Baby Supplies': BabySupplies,
  'Managing housing costs': ManagingHousingCosts,
  'Behavioral health': BehavioralHealth,
  "Child's development": ChildDevelopment,
  'Family planning': FamilyPlanning,
  'Job resources': JobResources,
  'Low-cost dental care': DentalCare,
  'Civil legal needs': LegalServices,
};

type Program = {
  name: Translation;
  description: Translation;
};

type Category = {
  name: Translation;
  icon: string;
  programs: Program[];
};

function programCount(categories: Category[]) {
  let count = 0;

  for (const category of categories) {
    count += category.programs.length;
  }

  return count;
}

const CurrentBenefits = () => {
  const [programCategories, setProgramCategories] = useState<Category[]>([]);
  const [urgentNeedCategories, setUrgentNeedCategories] = useState<Category[]>([]);
  const [progamsLoaded, setProgramsLoaded] = useState(false);
  const [urgentNeedsLoaded, setUrgentNeedsLoaded] = useState(false);
  const intl = useIntl();

  useEffect(() => {
    getAllLongTermPrograms().then((programs: Category[]) => {
      setProgramCategories(programs);
      setProgramsLoaded(true);
    });

    getAllNearTermPrograms().then((urgentNeeds: Category[]) => {
      setUrgentNeedCategories(urgentNeeds);
      setUrgentNeedsLoaded(true);
    });
  }, []);

  const displayProgramSection = (program: Program, index: number) => {
    return (
      <div className="bottom-margin" key={index}>
        <p className="program-name">
          <ResultsTranslate translation={program.name} />
        </p>
        <p>
          <ResultsTranslate translation={program.description} />
        </p>
      </div>
    );
  };

  const displayProgramsByCategory = (categories: Category[]) => {
    const categoryHeaderIconAndPrograms = Object.values(categories).map((category, index) => {
      const { name, programs, icon } = category;
      if (!(icon in iconCategoryMap)) {
        throw new Error(`"${icon}" is not a valid icon name`);
      }

      const CategoryIcon = iconCategoryMap[icon];

      return (
        <div key={index} className="category-section-container">
          <div className="category-heading-column">
            <div
              className="category-heading-icon"
              aria-label={intl.formatMessage({
                id: name.label,
                defaultMessage: name.default_message,
              })}
              role="img"
            >
              <CategoryIcon />
            </div>
            <h2 className="category-heading-text-style">
              <ResultsTranslate translation={name} />
            </h2>
          </div>
          <div className="programs-container">
            {programs.map((program: Program, index: number) => {
              return displayProgramSection(program, index);
            })}
          </div>
        </div>
      );
    });

    return <div>{categoryHeaderIconAndPrograms}</div>;
  };

  const translateNumber = useTranslateNumber();

  if (progamsLoaded && urgentNeedsLoaded) {
    return (
      <main className="current-benefits-container">
        <QuestionHeader>
          <div className="current-benefits-header">
            <FormattedMessage
              id="currentBenefits.pg-header"
              defaultMessage="Government Benefits, Nonprofit Programs and Tax Credits in MyFriendBen"
            />
          </div>
        </QuestionHeader>
        <div className="header-and-programs-container">
          <h2 className="long-near-term-header">
            <FormattedMessage id="currentBenefits.long-term-benefits" defaultMessage="LONG-TERM BENEFITS" />
            {` (${translateNumber(programCount(programCategories))})`}
          </h2>
          {displayProgramsByCategory(programCategories)}
        </div>
        <div className="header-and-programs-container">
          <h2 className="long-near-term-header">
            <FormattedMessage id="currentBenefits.near-term-benefits" defaultMessage="NEAR-TERM BENEFITS" />
            {` (${translateNumber(programCount(urgentNeedCategories))})`}
          </h2>
          {displayProgramsByCategory(urgentNeedCategories)}
        </div>
      </main>
    );
  } else {
    return <LoadingPage />;
  }
};

export default CurrentBenefits;
