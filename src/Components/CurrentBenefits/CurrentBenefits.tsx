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

type CategoryName =
  | 'Housing and Utilities'
  | 'Food and Nutrition'
  | 'Health Care'
  | 'Transportation'
  | 'Tax Credits'
  | 'Cash Assistance'
  | 'Child Care, Youth, and Education'
  | 'Food or Groceries'
  | 'Baby Supplies'
  | 'Managing housing costs'
  | 'Behavioral health'
  | "Child's development"
  | 'Family planning'
  | 'Job resources'
  | 'Low-cost dental care'
  | 'Civil legal needs';

const isCategoryName = (maybeCategoryName: string | undefined): maybeCategoryName is CategoryName => {
  if (!maybeCategoryName) {
    return false;
  }

  return [
    'Housing and Utilities',
    'Food and Nutrition',
    'Health Care',
    'Transportation',
    'Tax Credits',
    'Cash Assistance',
    'Child Care, Youth, and Education',
    'Food or Groceries',
    'Baby Supplies',
    'Managing housing costs',
    'Behavioral health',
    "Child's development",
    'Family planning',
    'Job resources',
    'Low-cost dental care',
    'Civil legal needs',
  ].includes(maybeCategoryName);
};

export const iconCategoryMap: Record<CategoryName, React.ComponentType> = {
  'Housing and Utilities': Housing,
  'Food and Nutrition': Food,
  'Health Care': HealthCare,
  Transportation: Transportation,
  'Tax Credits': TaxCredits,
  'Cash Assistance': CashAssistance,
  'Child Care, Youth, and Education': ChildCareYouthEducation,
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
  website_description: Translation;
  category?: Translation;
  id: number;
  type?: Translation;
};

type Category = {
  name: Translation;
  programs: Program[];
};

const CurrentBenefits = () => {
  const [allLongTermPrograms, setAllLongTermPrograms] = useState<Program[]>([]);
  const [allNearTermPrograms, setAllNearTermPrograms] = useState<Program[]>([]);
  const intl = useIntl();

  useEffect(() => {
    getAllLongTermPrograms().then((programs: Program[]) => {
      setAllLongTermPrograms(programs);
    });

    getAllNearTermPrograms().then((programs: Program[]) => {
      setAllNearTermPrograms(programs);
    });
  }, []);

  const groupProgramsIntoCategories = (
    programs: Program[],
    typeOrCategoryField: 'type' | 'category',
  ): Record<CategoryName, Category> => {
    //this actually returns an object with category name
    const programsGroupedByCategory = programs.reduce((acc, program) => {
      const programTypeOrCategory = program[typeOrCategoryField];
      if (!programTypeOrCategory) {
        throw new Error(`program.${typeOrCategoryField} is undefined`);
      }

      const categoryName = programTypeOrCategory.default_message;

      if (!isCategoryName(categoryName)) {
        throw new Error(`CategoryName ${categoryName} is invalid`);
      }

      if (!acc[categoryName]) {
        acc[categoryName] = { name: programTypeOrCategory, programs: [] };
      }

      acc[categoryName].programs.push(program);

      return acc;
    }, {} as Record<CategoryName, Category>);

    return programsGroupedByCategory;
  };

  const displayProgramSection = (program: Program, index: number) => {
    return (
      <div className="bottom-margin" key={index}>
        <p className="program-name">{program.name.default_message}</p>
        <p>{<ResultsTranslate translation={program.website_description} />}</p>
      </div>
    );
  };

  const displayProgramsByCategory = (
    programs: Program[],
    typeOrCategoryField: 'type' | 'category',
    groupProgramsIntoCategories: (
      programs: Program[],
      typeOrCategoryField: 'type' | 'category',
    ) => Record<CategoryName, Category>,
  ) => {
    const programsSortedByCategories = groupProgramsIntoCategories(programs, typeOrCategoryField);

    const categoryHeaderIconAndPrograms = Object.keys(programsSortedByCategories).map((key: string, index) => {
      const categoryName = key as CategoryName;
      const category = programsSortedByCategories[categoryName];
      const { name, programs } = category;
      const CategoryIcon = iconCategoryMap[categoryName];

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

  if (allLongTermPrograms.length && allNearTermPrograms.length) {
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
            {` (${allLongTermPrograms.length})`}
          </h2>
          {displayProgramsByCategory(allLongTermPrograms, 'category', groupProgramsIntoCategories)}
        </div>
        <div className="header-and-programs-container">
          <h2 className="long-near-term-header">
            <FormattedMessage id="currentBenefits.near-term-benefits" defaultMessage="NEAR-TERM BENEFITS" />
            {` (${allNearTermPrograms.length})`}
          </h2>
          {displayProgramsByCategory(allNearTermPrograms, 'type', groupProgramsIntoCategories)}
        </div>
      </main>
    );
  } else {
    return <LoadingPage />;
  }
};

export default CurrentBenefits;
