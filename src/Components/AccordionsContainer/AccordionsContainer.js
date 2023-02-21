import benefitCategories from "../../Assets/benefitCategories";
import cashAssistanceBenefits from '../../Assets/BenefitCategoryLists/cashAssistanceBenefits';
import foodAndNutritionBenefits from '../../Assets/BenefitCategoryLists/foodAndNutritionBenefits';
import childCareBenefits from '../../Assets/BenefitCategoryLists/childCareBenefits';
import housingAndUtilities from '../../Assets/BenefitCategoryLists/housingAndUtilities';
import transportationBenefits from '../../Assets/BenefitCategoryLists/transportationBenefits';
import healthCareBenefits from '../../Assets/BenefitCategoryLists/healthCareBenefits';
import taxCreditBenefits from '../../Assets/BenefitCategoryLists/taxCreditBenefits';
import CategoryAccordion from "../CategoryAccordion/CategoryAccordion";
import './AccordionsContainer.css';

const AccordionsContainer = ({ formData, setFormData }) => {
  const accordionsData = [
    {
      categoryName: benefitCategories.cash,
      categoryOptions: cashAssistanceBenefits
    },
    {
      categoryName: benefitCategories.foodAndNutrition,
      categoryOptions: foodAndNutritionBenefits
    },
    {
      categoryName: benefitCategories.childCare,
      categoryOptions: childCareBenefits
    },
    {
      categoryName: benefitCategories.housingAndUtilities,
      categoryOptions: housingAndUtilities
    },
    {
      categoryName: benefitCategories.transportation,
      categoryOptions: transportationBenefits
    },
    {
      categoryName: benefitCategories.healthCare,
      categoryOptions: healthCareBenefits
    },
    {
      categoryName: benefitCategories.taxCredits,
      categoryOptions: taxCreditBenefits
    }
  ];

  const createAccordions = (accordionsInfo) => {
    const categoryAccordions = accordionsInfo.map((accordionData, index) => {
      return (
        <div key={index}>
          <CategoryAccordion
            categoryName={accordionData.categoryName}
            categoryOptions={accordionData.categoryOptions}
            formData={formData}
            setFormData={setFormData}
          />
        </div>
      );
    });

    return categoryAccordions;
  }

  return (
    <div className='accordions-container'>
      { createAccordions(accordionsData) }
    </div>
  );
}

export default AccordionsContainer;