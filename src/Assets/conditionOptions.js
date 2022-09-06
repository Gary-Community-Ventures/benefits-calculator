import { FormattedMessage } from 'react-intl';

const conditionOptions = {
  student: 
    <FormattedMessage 
      id='conditionOptions.student' 
      defaultMessage='Student' />,
  pregnant: 
    <FormattedMessage 
      id='conditionOptions.pregnant' 
      defaultMessage='Pregnant' />,
  unemployed: 
    <FormattedMessage 
      id='conditionOptions.unemployed' 
      defaultMessage='Unemployed' />,
  blindOrVisuallyImpaired: 
    <FormattedMessage 
      id='conditionOptions.blindOrVisuallyImpaired' 
      defaultMessage='Blind or visually impaired' />,
  disabled: 
    <FormattedMessage 
      id='conditionOptions.disabled' 
      defaultMessage='Have any disabilities' />,
  veteran: 
    <FormattedMessage 
      id='conditionOptions.veteran' 
      defaultMessage='Served in the U.S. Armed Forces, National Guard or Reserves' />,
  medicaid: 
    <FormattedMessage 
      id='conditionOptions.medicaid' 
      defaultMessage='Receives Medicaid' />,
  disabilityRelatedMedicaid: 
    <FormattedMessage 
      id='conditionOptions.disabilityRelatedMedicaid' 
      defaultMessage='Receives Disability-related Medicaid' />,
  noneOfTheseApply: 
    <FormattedMessage 
      id='conditionOptions.noneOfTheseApply' 
      defaultMessage='None of these apply' />
}

export default conditionOptions;