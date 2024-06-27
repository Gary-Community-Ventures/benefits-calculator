import benefitCategories from './benefitCategories.tsx';
import cashAssistanceBenefits from './categories/cashAssistanceBenefits.tsx';
import foodAndNutritionBenefits from './categories/foodAndNutritionBenefits.tsx';
import childCareBenefits from './categories/childCareBenefits.tsx';
import housingAndUtilities from './categories/housingAndUtilities.tsx';
import transportationBenefits from './categories/transportationBenefits.tsx';
import healthCareBenefits from './categories/healthCareBenefits.tsx';
import taxCreditBenefits from './categories/taxCreditBenefits.tsx';
import type { FormattedMessageType } from '../../Types/Questions.ts';

export type CategoryOptions = {
  [key: string]: FormattedMessageType;
};

export type BenefitAccordion = {
  categoryName: FormattedMessageType;
  categoryOptions: CategoryOptions;
};

const benefitAccordions: BenefitAccordion[] = [
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

export default benefitAccordions;
