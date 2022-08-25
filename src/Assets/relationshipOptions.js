import { FormattedMessage } from 'react-intl';

const relationshipOptions = {
  child: 
    <FormattedMessage 
      id='relationshipOptions.child' 
      defaultMessage='Child' />,
  fosterChild: 
    <FormattedMessage 
      id='relationshipOptions.fosterChild' 
      defaultMessage='Foster Child' />,
  stepChild: 
    <FormattedMessage 
      id='relationshipOptions.stepChild' 
      defaultMessage='Step-child' />,
  grandChild: 
    <FormattedMessage 
      id='relationshipOptions.grandChild' 
      defaultMessage='Grandchild' />,
  spouse: 
    <FormattedMessage 
      id='relationshipOptions.spouse' 
      defaultMessage='Spouse' />,
  parent: 
    <FormattedMessage 
      id='relationshipOptions.parent' 
      defaultMessage='Parent' />,
  fosterParent: 
    <FormattedMessage 
      id='relationshipOptions.fosterParent' 
      defaultMessage='Foster Parent' />,
  stepParent: 
    <FormattedMessage 
      id='relationshipOptions.stepParent' 
      defaultMessage='Step-parent' />,
  grandParent: 
    <FormattedMessage 
      id='relationshipOptions.grandParent' 
      defaultMessage='Grandparent' />,
  sisterOrBrother: 
    <FormattedMessage 
      id='relationshipOptions.sisterOrBrother' 
      defaultMessage='Sister/Brother' />,
  stepSisterOrBrother: 
    <FormattedMessage 
      id='relationshipOptions.stepSisterOrBrother' 
      defaultMessage='Step-sister/Step-brother' />,
  boyfriendOrGirlfriend: 
    <FormattedMessage 
      id='relationshipOptions.boyfriendOrGirlfriend' 
      defaultMessage='Boyfriend/Girlfriend' />,
  domesticPartner: 
    <FormattedMessage 
      id='relationshipOptions.domesticPartner' 
      defaultMessage='Domestic Partner' />,
  unrelated: 
    <FormattedMessage 
      id='relationshipOptions.unrelated' 
      defaultMessage='Unrelated' />,
  relatedOther: 
    <FormattedMessage 
      id='relationshipOptions.relatedOther' 
      defaultMessage='Related in some other way' />
};

export default relationshipOptions;