import { FormattedMessage } from 'react-intl';

const foodAndNutritionBenefits = {
  snap: (
    <FormattedMessage
      id="foodAndNutritionBenefits.snap"
      defaultMessage="Food assistance (Supplemental Nutrition Assistance Program/SNAP)"
    />
  ),
  wic: (
    <FormattedMessage
      id="foodAndNutritionBenefits.wic"
      defaultMessage="Food and breastfeeding assistance (Special Supplemental Nutrition Program for Women, Infants, and Children/WIC)"
    />
  ),
  nslp: (
    <FormattedMessage
      id="foodAndNutritionBenefits.nslp"
      defaultMessage="Free school meals (National School Lunch Program)"
    />
  ),
  ede: (
    <FormattedMessage
      id="foodAndNutritionBenefits.ede"
      defaultMessage="Food support for people 60 years of age or older (Everyday Eats)"
    />
  ),
};

export default foodAndNutritionBenefits;
