import { FormattedMessage } from 'react-intl';

const benefitOptions = {
  tanf: 
    <FormattedMessage 
      id='benefitOptions.tanf' 
      defaultMessage='Temporary Assistance for Needy Families (TANF/Colorado Works)' />,
  wic: 
    <FormattedMessage 
      id='benefitOptions.wic' 
      defaultMessage='Special Supplemental Nutrition Program for Women, Infants, and Children (WIC)' />,
  snap: 
    <FormattedMessage 
      id='benefitOptions.snap' 
      defaultMessage='Supplemental Nutrition Assistance Program (Food Assistance Program/SNAP)' />,
  lifeline: 
    <FormattedMessage 
      id='benefitOptions.lifeline' 
      defaultMessage='Lifeline Phone/Internet Service' />,
  acp: 
    <FormattedMessage 
      id='benefitOptions.acp' 
      defaultMessage='Affordable Connectivity Program' />,
  eitc:
    <FormattedMessage
      id='benefitOptions.eitc'
      defaultMessage='Earned Income Tax Credit' />,
  coeitc:
    <FormattedMessage
      id='benefitOptions.coeitc'
      defaultMessage='Colorado Earned Income Tax Credit' />,
  nslp:
    <FormattedMessage
      id='benefitOptions.nslp'
      defaultMessage='National School Lunch Program' />,
  ctc:
    <FormattedMessage
      id='benefitOptions.ctc'
      defaultMessage='Child Tax Credit' />,
  medicaid:
    <FormattedMessage
      id='benefitOptions.medicaid'
      defaultMessage='MEDICAID - also known as Health First Colorado' />,
  rtdlive:
    <FormattedMessage
      id='benefitOptions.rtdlive'
      defaultMessage='RTD Live' />,
  cccap:
    <FormattedMessage
      id='benefitOptions.cccap'
      defaultMessage='Colorado Child Care Assistance Program' />,
  mydenver:
    <FormattedMessage
      id='benefitOptions.mydenver'
      defaultMessage='MY Denver Card' />,
  chp:
    <FormattedMessage
      id='benefitOptions.chp'
      defaultMessage='CHP+' />,
  ccb:
    <FormattedMessage
      id='benefitOptions.ccb'
      defaultMessage='Colorado Cash Back TABOR refund' />
};

export default benefitOptions;