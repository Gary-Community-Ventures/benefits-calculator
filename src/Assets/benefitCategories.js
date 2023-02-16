import { FormattedMessage } from "react-intl";

const benefitCategories = {
  cash:
    <FormattedMessage
      id='benefitCategories.cash'
      defaultMessage='Cash Assistance'
    />,
  foodAndNutrition:
    <FormattedMessage
      id='benefitCategories.foodAndNutrition'
      defaultMessage='Food and Nutrition'
    />,
  childCare:
    <FormattedMessage
      id='benefitCategories.childCare'
      defaultMessage='Child Care, Preschool, and Youth'
    />,
  housingAndUtilities:
    <FormattedMessage
      id='benefitCategories.housingAndUtilities'
      defaultMessage='Housing and Utilities'
    />,
  transportation:
    <FormattedMessage
      id='benefitCategories.transportation'
      defaultMessage='Transportation'
    />,
  healthCare:
    <FormattedMessage
      id='benefitCategories.healthCare'
      defaultMessage='Health Care'
    />,
  taxCredits:
    <FormattedMessage
      id='benefitCategories.taxCredits'
      defaultMessage='Tax Credits'
    />
}

export default benefitCategories;