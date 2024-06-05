import { FormattedMessage, useIntl } from 'react-intl';
import { useState, useEffect } from 'react';
import { getAllPrograms } from '../../apiCalls';
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
import './CurrentBenefits.css';

export const iconCategoryMap: { [key: string]: React.ComponentType } = {
  'Housing and Utilities': Housing,
  'Food and Nutrition': Food,
  'Health Care': HealthCare,
  Transportation: Transportation,
  'Tax Credits': TaxCredits,
  'Cash Assistance': CashAssistance,
  'Child Care, Youth, and Education': ChildCareYouthEducation,
  'Food or Groceries': FoodOrGroceries,
  'Diapers': BabySupplies,
  'Housing': Housing,
  'Managing housing costs': ManagingHousingCosts,
  'Behavioral health': BehavioralHealth,
  "Child's development": ChildDevelopment,
  'Family planning': FamilyPlanning,
  'Job training': JobResources,
  'Low-cost dental care': DentalCare,
  'Civil legal needs': LegalServices,
};

type Program = {
  name: Translation;
  website_description: Translation;
  category: Translation;
  id: number;
};

type Category = {
  name: string;
  programs: Program[];
}

const CurrentCOBenefits = () => {
  const [allPrograms, setAllPrograms] = useState<Program[]>([]);
  const intl = useIntl();

  useEffect(() => {
    getAllPrograms().then((response) => {
      setAllPrograms(response);
    });
  }, []);

  const groupProgramsIntoCategories = (programs: Program[]): Program => {
    const programsGroupedByCategory = programs.reduce((acc: Category[], program) => {
      const categoryName = program.category.default_message;

      if (!acc[categoryName]) {
        acc[categoryName] = { name: program.category, programs: [] };
      }

      acc[categoryName].programs.push(program);

      return acc;
    }, {});

    return programsGroupedByCategory;
  };

  const displayProgramSection = (program: Program, index: number) => {
    return (
      <div className="bottom-margin" key={index}>
        <p className="current-benefits-program-name">
          {program.name.default_message}
        </p>
        <p>
          {<ResultsTranslate translation={program.website_description} />}
        </p>
      </div>
    );
  };

  const displayProgramsByCategory = (programs: Program[], groupProgramsIntoCategories: () => void) => {
    const programsSortedByCategories = groupProgramsIntoCategories(programs);

    const categoryHeaderIconAndPrograms = Object.entries(programsSortedByCategories).map((entry, index) => {
      const categoryPrograms = entry[1].programs;

      const IconComponent = headingOptionsMappings[entry[0]];
      return (
        <div key={index} className='bottom-margin'>
          <div className="category-heading-column">
            <div
              className="category-heading-icon"
              aria-label={`${intl.formatMessage({id: entry[1].name.label })}`}
              role="img"
            >
              <IconComponent />
            </div>
            <h2 className="category-heading-text-style">
              <ResultsTranslate translation={entry[1].name} />
            </h2>
          </div>

          <div className='programs-container'>
            {categoryPrograms.map((program:Program, index:number) => {
                return displayProgramSection(program, index);
              })
            }
          </div>
        </div>
      );
    });

    return (<div>{categoryHeaderIconAndPrograms}</div>);
  };

  return (
    <div className="co-benefits-container">
      <h1 className="sub-header">
        <FormattedMessage
          id="currentCOBenefits.pg-header"
          defaultMessage="Government Benefits, Nonprofit Programs and Tax Credits in MyFriendBen"
        />
      </h1>
      <h2 className="sub-header blue-header">
        <FormattedMessage id="currentCOBenefits.long-term-benefits" defaultMessage="LONG-TERM BENEFITS" />
      </h2>
      {allPrograms.length && displayProgramsByCategory(allPrograms, groupProgramsIntoCategories)}
      <h2 className="sub-header blue-header">
        <FormattedMessage id="currentCOBenefits.near-term-benefits" defaultMessage="NEAR-TERM BENEFITS" />
      </h2>
    </div>
  );
};

export default CurrentCOBenefits;
