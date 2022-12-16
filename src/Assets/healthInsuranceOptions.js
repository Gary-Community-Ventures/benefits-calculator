import { FormattedMessage } from "react-intl";

const healthInsuranceOptions = {
  employer: 
    <FormattedMessage
      id='healthInsuranceOptions.employer'
      defaultMessage='Employer-provided health insurance' />,
  private: 
    <FormattedMessage
      id='healthInsuranceOptions.private'
      defaultMessage='Private health insurance' />,
  medicaid: 
    <FormattedMessage
      id='healthInsuranceOptions.medicaid'
      defaultMessage='Free or low-cost public health insurance through Health First Colorado (Medicaid)' />,
  chp: 
    <FormattedMessage
      id='healthInsuranceOptions.chp'
      defaultMessage='Low-cost health insurance for children and pregnant women through Child Health Plus (CHP+)' />,
  none: 
    <FormattedMessage
      id='healthInsuranceOptions.none'
      defaultMessage='One or more household member(s) do not have health insurance' />
}

export default healthInsuranceOptions;