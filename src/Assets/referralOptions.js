import { FormattedMessage } from 'react-intl';

const referralOptions = {
  '211co': '2-1-1 Colorado',
  gary: 'Gary Community Ventures - Build with Families',
  cedp: 'Community Economic Defense Project (CEDP)',
  auroraCC: 'Aurora Community Connection',
  jeffcoPP: 'Jeffco Prosperity Partners',
  jeffcoCYFAP: 'Jeffco CYFAP',
  projectWorthmore: 'Project Worthmore',
  bia: 'Benefits in Action',
  mcoa: 'MCOA at Anschutz',
  testOrProspect: <FormattedMessage id="referralOptions.testOrProspect" defaultMessage="Test / Prospective Partner" />,
  searchEngine: <FormattedMessage id="referralOptions.searchEngine" defaultMessage="Google or other search engine" />,
  other: <FormattedMessage id="referralOptions.other" defaultMessage="Other" />,
};

export default referralOptions;
