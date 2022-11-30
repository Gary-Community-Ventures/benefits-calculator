import { FormattedMessage } from 'react-intl';

const benefitOptions = {
  tanf: 
    <FormattedMessage 
      id='benefitOptions.tanf' 
      defaultMessage='Cash assistance and work support (Temporary Assistance for Needy Families (TANF/Colorado Works))' />,
  wic: 
    <FormattedMessage 
      id='benefitOptions.wic' 
      defaultMessage='Food and breastfeeding assistance (Special Supplemental Nutrition Program for Women, Infants, and Children (WIC))' />,
  snap: 
    <FormattedMessage 
      id='benefitOptions.snap' 
      defaultMessage='Food assistance (Supplemental Nutrition Assistance Program/SNAP)' />,
  lifeline: 
    <FormattedMessage 
      id='benefitOptions.lifeline' 
      defaultMessage='Phone or internet discount (Lifeline Phone/Internet Service)' />,
  acp: 
    <FormattedMessage 
      id='benefitOptions.acp' 
      defaultMessage='Home internet discount (Affordable Connectivity Program)' />,
  eitc:
    <FormattedMessage
      id='benefitOptions.eitc'
      defaultMessage='Federal tax credit: earned income (Earned Income Tax Credit)' />,
  coeitc:
    <FormattedMessage
      id='benefitOptions.coeitc'
      defaultMessage='State tax credit: earned income (Colorado Earned Income Tax Credit)' />,
  nslp:
    <FormattedMessage
      id='benefitOptions.nslp'
      defaultMessage='Free school meals (National School Lunch Program)' />,
  ctc:
    <FormattedMessage
      id='benefitOptions.ctc'
      defaultMessage='Federal tax credit: child tax credit (Child Tax Credit)' />,
  medicaid:
    <FormattedMessage
      id='benefitOptions.medicaid'
      defaultMessage='Free or low-cost public health insurance (Medicaid - also known as Health First Colorado)' />,
  rtdlive:
    <FormattedMessage
      id='benefitOptions.rtdlive'
      defaultMessage='Discounted RTD fares (RTD LiVE)' />,
  cccap:
    <FormattedMessage
      id='benefitOptions.cccap'
      defaultMessage='Help with child care costs (Colorado Child Care Assistance Program)' />,
  mydenver:
    <FormattedMessage
      id='benefitOptions.mydenver'
      defaultMessage='Reduced-cost youth programs (MY Denver Card)' />,
  chp:
    <FormattedMessage
      id='benefitOptions.chp'
      defaultMessage='Low-cost health insurance for children and pregnant women (CHP+)' />,
  leap:
    <FormattedMessage
      id='benefitOptions.leap'
      defaultMessage='Help with winter heating bills (LEAP)' />
};

export default benefitOptions;