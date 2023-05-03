import { FormattedMessage } from 'react-intl';

const referralOptions = {
  gary: 'Gary Community Ventures - Build with Families',
  taxAssistanceSite: 'Tax Assistance Site (VITA/Tax Help Colorado)',
  auroraCC: 'Aurora Community Connection',
  jeffcoPP: 'Jeffco Prosperity Partners',
  projectWorthmore: 'Project Worthmore',
  bia: 'Benefits in Action',
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
