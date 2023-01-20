import { FormattedMessage } from 'react-intl';

const referralOptions = {
  gary: 'Gary Community Ventures - Build with Families',
  taxAssistanceSite: 'Tax Assistance Site (VITA/Tax Help Colorado)',
  auroraCC: 'Aurora Community Connection',
  jeffcoPP: 'Jeffco Prosperity Partners',
  projectWorthmore: 'Project Worthmore',
  bia: 'Benefits in Action',
  villageExchange: 'Village Exchange',
  theFax: 'The Fax',
  communityEvent: 
    <FormattedMessage 
      id='referralOptions.communityEvent' 
      defaultMessage='Community Event' />,
  searchEngine:  
    <FormattedMessage 
      id='referralOptions.searchEngine' 
      defaultMessage='Google or other search engine' />,
  other:   
    <FormattedMessage 
      id='referralOptions.other' 
      defaultMessage='Other' />
}

export default referralOptions;