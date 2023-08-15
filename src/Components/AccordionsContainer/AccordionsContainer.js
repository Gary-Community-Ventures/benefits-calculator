import benefitCategories from '../../Assets/benefitCategories';
import cashAssistanceBenefits from '../../Assets/BenefitCategoryLists/cashAssistanceBenefits';
import foodAndNutritionBenefits from '../../Assets/BenefitCategoryLists/foodAndNutritionBenefits';
import childCareBenefits from '../../Assets/BenefitCategoryLists/childCareBenefits';
import housingAndUtilities from '../../Assets/BenefitCategoryLists/housingAndUtilities';
import transportationBenefits from '../../Assets/BenefitCategoryLists/transportationBenefits';
import healthCareBenefits from '../../Assets/BenefitCategoryLists/healthCareBenefits';
import taxCreditBenefits from '../../Assets/BenefitCategoryLists/taxCreditBenefits';
import CategoryAccordion from '../CategoryAccordion/CategoryAccordion';
import { useState, useEffect, useContext } from 'react';
import { Context } from '../Wrapper/Wrapper.tsx';
import './AccordionsContainer.css';
import { useErrorController } from '../../Assets/validationFunctions.tsx';

const AccordionsContainer = ({ followUp, submitted }) => {
  const { formData } = useContext(Context);
  const [expanded, setExpanded] = useState(false);

  const errorController = useErrorController(
    followUp.componentDetails.inputError,
    followUp.componentDetails.inputHelperText,
  );

  useEffect(() => {
    errorController.setTimesSubmitted(submitted);
  }, [submitted]);

  useEffect(() => {
    errorController.updateError(formData.hasBenefits, formData);
  }, [expanded]);

  const handleAccordionSelectChange = (panel) => (event, isExpanded) => {
    errorController.updateError(formData.hasBenefits, formData);
    setExpanded(isExpanded ? panel : false);
  };

  const accordionsData = [
    {
      categoryName: benefitCategories.cash,
      categoryOptions: cashAssistanceBenefits,
    },
    {
      categoryName: benefitCategories.foodAndNutrition,
      categoryOptions: foodAndNutritionBenefits,
    },
    {
      categoryName: benefitCategories.childCare,
      categoryOptions: childCareBenefits,
    },
    {
      categoryName: benefitCategories.housingAndUtilities,
      categoryOptions: housingAndUtilities,
    },
    {
      categoryName: benefitCategories.transportation,
      categoryOptions: transportationBenefits,
    },
    {
      categoryName: benefitCategories.healthCare,
      categoryOptions: healthCareBenefits,
    },
    {
      categoryName: benefitCategories.taxCredits,
      categoryOptions: taxCreditBenefits,
    },
  ];

  const createAccordions = (accordionsInfo) => {
    const categoryAccordions = accordionsInfo.map((accordionData, index) => {
      return (
        <div key={index}>
          <CategoryAccordion
            categoryName={accordionData.categoryName}
            categoryOptions={accordionData.categoryOptions}
            handleAccordionSelectChange={handleAccordionSelectChange}
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
      <div className="accordions-container">{createAccordions(accordionsData)}</div>
      {errorController.showError && errorController.message(formData.hasBenefits, formData)}
    </>
  );
};

export default AccordionsContainer;
