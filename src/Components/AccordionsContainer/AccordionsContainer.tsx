import { useState, useEffect, useContext } from 'react';
import { BenefitAccordion, CategoryOptions } from '../../Assets/BenefitCategoryLists/benefitAccordions.ts';
import CategoryAccordion from '../CategoryAccordion/CategoryAccordion.tsx';
import { Config } from '../../Types/Config.ts';
import { FormattedMessageType } from '../../Types/Questions.ts';
import { Context } from '../Wrapper/Wrapper.tsx';
import './AccordionsContainer.css';
import { useErrorController } from '../../Assets/validationFunctions.tsx';
import { AccordionContainerDetails } from '../../Types/Questions.ts';

type Props = {
  componentDetails: AccordionContainerDetails;
  submitted: number;
};

// transforms config benefits and returns array of accordion object array
const formatCategoryBenefits = (categoryBenefits: Config['category_benefits']): BenefitAccordion[] => {
  return Object.entries(categoryBenefits).map(([categoryKey, categoryValue]) => {
    const categoryName: FormattedMessageType = categoryValue.category_name;
    const categoryOptions: CategoryOptions = Object.entries(categoryValue.benefits).reduce(
      (options, [benefitKey, benefitValue]) => {
        const benefitMessage: FormattedMessageType = benefitValue as FormattedMessageType;

        options[benefitKey] = benefitMessage;
        return options;
      },
      {} as CategoryOptions,
    );

    return {
      categoryName,
      categoryOptions,
    };
  });
};

const AccordionsContainer = ({ componentDetails, submitted }: Props) => {
  const { formData, config } = useContext(Context);
  let formattedBenefits: BenefitAccordion[] = [];

  if (config && !Array.isArray(config.category_benefits)) {
    formattedBenefits = formatCategoryBenefits(config.category_benefits[0]);
  } else {
    console.error('Error: config or category_benefits is undefined.');
  }

  const [expanded, setExpanded] = useState<boolean | number>(false);

  useEffect(() => {
    setExpanded(0);
  }, []);

  const errorController = useErrorController(componentDetails.inputError, componentDetails.inputHelperText);

  useEffect(() => {
    errorController.setSubmittedCount(submitted);
  }, [submitted]);

  useEffect(() => {
    errorController.updateError(formData.hasBenefits, formData);
  }, [expanded]);

  const createAccordions = (accordionsInfo: BenefitAccordion[]) => {
    const categoryAccordions = accordionsInfo.map((accordionData, index) => {
      return (
        <div key={index}>
          <CategoryAccordion
            categoryName={accordionData.categoryName}
            categoryOptions={accordionData.categoryOptions}
            setExpanded={setExpanded}
            expanded={expanded}
            index={index}
          />
        </div>
      );
    });

    return categoryAccordions;
  };

  return (
    <>
      <div className="accordions-container">{createAccordions(formattedBenefits)}</div>
      {errorController.showError && errorController.message(formData.hasBenefits, formData)}
    </>
  );
};

export default AccordionsContainer;

const hello = [
  {
    cash: {
      benefits: {
        oap: {
          _label: 'cashAssistanceBenefits.oap',
          _default_message: 'State cash assistance for individuals 60 years of age or older (Old Age Pension/OAP)',
        },
        ssi: {
          _label: 'cashAssistanceBenefits.ssi',
          _default_message:
            'Federal cash assistance for individuals who are disabled, blind, or 65 years of age or older (Supplemental Security Income/SSI)',
        },
        ssdi: {
          _label: 'cashAssistanceBenefits.ssdi',
          _default_message:
            'Social security benefit for people with disabilities (Social Security Disability Insurance/SSDI)',
        },
        tanf: {
          _label: 'cashAssistanceBenefits.tanf',
          _default_message:
            'Cash assistance and work support (Temporary Assistance for Needy Families (TANF/Colorado Works))',
        },
        andcs: {
          _label: 'cashAssistanceBenefits.andcs',
          _default_message:
            'State cash assistance for individuals who are disabled and receiving SSI (Aid to the Needy Disabled - Colorado Supplement/AND-CS)',
        },
      },
      category_name: 'Cash Assistance',
    },
    childCare: {
      benefits: {
        upk: {
          _label: 'childCareBenefits.univpresc',
          _default_message: 'Free preschool (Universal Preschool Colorado)',
        },
        pell: {
          _label: 'childCareBenefits.pell',
          _default_message: 'Federal grant to finance college costs (Pell Grant)',
        },
        cccap: {
          _label: 'childCareBenefits.cccap',
          _default_message: 'Help with child care costs (Colorado Child Care Assistance Program/CCCAP)',
        },
        mydenver: {
          _label: 'childCareBenefits.mydenver',
          _default_message: 'Reduced-cost youth programs (MY Denver Card)',
        },
        coheadstart: {
          _label: 'childCareBenefits.coheadstart',
          _default_message: 'Free early child care and preschool (Colorado Head Start)',
        },
        denverpresc: {
          _label: 'childCareBenefits.denverpresc',
          _default_message: 'Tuition credits for Denver preschoolers (Denver Preschool Program)',
        },
      },
      category_name: 'Child Care, Youth, and Education',
    },
    healthCare: {
      benefits: {
        dentallowincseniors: {
          _label: 'healthCareBenefits.dentallowincseniors',
          _default_message:
            'Low-cost dental care for people 60 years of age or older (Colorado Dental Health Program for Low-Income Seniors)',
        },
      },
      category_name: 'Health Care',
    },
    taxCredits: {
      benefits: {
        ctc: {
          _label: 'taxCreditBenefits.ctc',
          _default_message: 'Federal tax credit: child tax credit (Child Tax Credit)',
        },
        eitc: {
          _label: 'taxCreditBenefits.eitc',
          _default_message: 'Federal tax credit: earned income (Earned Income Tax Credit)',
        },
        coctc: { _label: 'taxCreditBenefits.coctc', _default_message: 'State tax credit: Colorado child tax credit' },
        coeitc: {
          _label: 'taxCreditBenefits.coeitc',
          _default_message:
            'State tax credit: earned income (Colorado Earned Income Tax Credit/Expanded Earned Income Tax Credit)',
        },
      },
      category_name: 'Tax Credits',
    },
    transportation: {
      benefits: {
        rtdlive: { _label: 'transportationBenefits.rtdlive', _default_message: 'Discounted RTD fares (RTD LiVE)' },
      },
      category_name: 'Transportation',
    },
    foodAndNutrition: {
      benefits: {
        ede: {
          _label: 'foodAndNutritionBenefits.ede',
          _default_message: 'Food support for people 60 years of age or older (Everyday Eats)',
        },
        wic: {
          _label: 'foodAndNutritionBenefits.wic',
          _default_message:
            'Food and breastfeeding assistance (Special Supplemental Nutrition Program for Women, Infants, and Children/WIC)',
        },
        nslp: {
          _label: 'foodAndNutritionBenefits.nslp',
          _default_message: 'Free school meals (National School Lunch Program)',
        },
        snap: {
          _label: 'foodAndNutritionBenefits.snap',
          _default_message: 'Food assistance (Supplemental Nutrition Assistance Program/SNAP)',
        },
      },
      category_name: 'Food and Nutrition',
    },
    housingAndUtilities: {
      benefits: {
        acp: {
          _label: 'housingAndUtilities.acp',
          _default_message: 'Home internet discount (Affordable Connectivity Program)',
        },
        ubp: {
          _label: 'housingAndUtilities.ubp',
          _default_message: 'Help paying utility bills (Colorado Utility Bill Help Program)',
        },
        leap: {
          _label: 'housingAndUtilities.leap',
          _default_message: 'Help with winter heating bills (Low-Income Energy Assistance Program/LEAP)',
        },
        cowap: {
          _label: 'housingAndUtilities.cowap',
          _default_message: 'Free home energy upgrades (Weatherization Assistance Program)',
        },
        lifeline: {
          _label: 'housingAndUtilities.lifeline',
          _default_message: 'Phone or internet discount (Lifeline Phone/Internet Service)',
        },
        coPropTaxRentHeatCreditRebate: {
          _label: 'cashAssistanceBenefits.coPropTaxRentHeatCreditRebate',
          _default_message:
            'Cash to pay property tax, rent, and heat bills (Colorado Property Tax/Rent/Heat Credit Rebate)',
        },
      },
      category_name: 'Housing and Utilities',
    },
  },
];
