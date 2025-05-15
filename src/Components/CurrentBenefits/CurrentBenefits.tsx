import { FormattedMessage, useIntl } from 'react-intl';
import { useState, useEffect } from 'react';
import { getAllLongTermPrograms, getAllNearTermPrograms } from '../../apiCalls';
import { Translation } from '../../Types/Results';
import ResultsTranslate from '../Results/Translate/Translate';
import { ReactComponent as Food } from '../../Assets/icons/Programs/CategoryHeading/food.svg';
import { ReactComponent as Housing } from '../../Assets/icons/Programs/CategoryHeading/housing.svg';
import { ReactComponent as HealthCare } from '../../Assets/icons/Programs/CategoryHeading/healthcare.svg';
import { ReactComponent as Transportation } from '../../Assets/icons/Programs/CategoryHeading/transportation.svg';
import { ReactComponent as TaxCredits } from '../../Assets/icons/Programs/CategoryHeading/taxCredits.svg';
import { ReactComponent as CashAssistance } from '../../Assets/icons/Programs/CategoryHeading/cashAssistant.svg';
import { ReactComponent as ChildCareYouthEducation } from '../../Assets/icons/Programs/CategoryHeading/childCareYouthEducation.svg';
import { ReactComponent as FoodOrGroceries } from '../../Assets/icons/UrgentNeeds/AcuteConditions/food.svg';
import { ReactComponent as BabySupplies } from '../../Assets/icons/UrgentNeeds/AcuteConditions/baby_supplies.svg';
import { ReactComponent as ManagingHousingCosts } from '../../Assets/icons/UrgentNeeds/AcuteConditions/housing.svg';
import { ReactComponent as BehavioralHealth } from '../../Assets/icons/UrgentNeeds/AcuteConditions/support.svg';
import { ReactComponent as ChildDevelopment } from '../../Assets/icons/UrgentNeeds/AcuteConditions/child_development.svg';
import { ReactComponent as FamilyPlanning } from '../../Assets/icons/UrgentNeeds/AcuteConditions/family_planning.svg';
import { ReactComponent as JobResources } from '../../Assets/icons/UrgentNeeds/AcuteConditions/job_resources.svg';
import { ReactComponent as DentalCare } from '../../Assets/icons/UrgentNeeds/AcuteConditions/dental_care.svg';
import { ReactComponent as LegalServices } from '../../Assets/icons/UrgentNeeds/AcuteConditions/legal_services.svg';
import { ReactComponent as Military } from '../../Assets/icons/UrgentNeeds/AcuteConditions/military.svg';
import LoadingPage from '../LoadingPage/LoadingPage';
import './CurrentBenefits.css';
import QuestionHeader from '../QuestionComponents/QuestionHeader';
import { useTranslateNumber } from '../../Assets/languageOptions';
import { useParams } from 'react-router-dom';
import { useConfig } from '../Config/configHook';
import { FormattedMessageType } from '../../Types/Questions';

export const iconCategoryMap: { [key: string]: React.ComponentType } = {
  default: CashAssistance,
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
  'Veterans resources': Military,
};

export type Program = {
  name: Translation;
  description: Translation;
};

export type Category = {
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
  const { whiteLabel } = useParams();
  const { title, program_heading, urgent_need_heading } = useConfig<{
    title: FormattedMessageType;
    program_heading: FormattedMessageType;
    urgent_need_heading: FormattedMessageType;
  }>('current_benefits');
  const intl = useIntl();

  if (whiteLabel === undefined) {
    throw new Error('white label is not defined');
  }

  useEffect(() => {
    getAllLongTermPrograms(whiteLabel).then((programs: Category[]) => {
      setProgramCategories(programs);
      setProgramsLoaded(true);
    });

    getAllNearTermPrograms(whiteLabel).then((urgentNeeds: Category[]) => {
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

      let CategoryIcon = iconCategoryMap[icon];

      if (CategoryIcon === undefined) {
        // NOTE: The urgent needs are mapped by the default_message of the name of the category,
        // if the name of the category changes, need to update the icon category map
        console.error(`No icon exists for ${icon} in category ${name.default_message}`);
        CategoryIcon = iconCategoryMap['default'];
      }

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
          <div className="current-benefits-header">{title}</div>
        </QuestionHeader>
        {programCategories.length > 0 && (
          <div className="header-and-programs-container">
            <h2 className="long-near-term-header">
              {program_heading}
              {` (${translateNumber(programCount(programCategories))})`}
            </h2>
            {displayProgramsByCategory(programCategories)}
          </div>
        )}
        {urgentNeedCategories.length > 0 && (
          <div className="header-and-programs-container">
            <h2 className="long-near-term-header">
              {urgent_need_heading}
              {` (${translateNumber(programCount(urgentNeedCategories))})`}
            </h2>
            {displayProgramsByCategory(urgentNeedCategories)}
          </div>
        )}
      </main>
    );
  } else {
    return <LoadingPage />;
  }
};

export default CurrentBenefits;
