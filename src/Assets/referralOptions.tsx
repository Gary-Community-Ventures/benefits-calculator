import { FormattedMessage } from 'react-intl';

const referralOptions = {
  '211co': '2-1-1 Colorado',
  gary: 'Gary Community Ventures - Build with Families',
  cedp: 'Community Economic Defense Project (CEDP)',
  auroracc: 'Aurora Community Connection',
  jeffcopp: 'Jeffco Prosperity Partners',
  jeffcohs: 'Jeffco Human Services',
  projectworthmore: 'Project Worthmore',
  bia: 'Benefits in Action',
  mcoa: 'MCOA at Anschutz',
  testorprospect: <FormattedMessage id="referralOptions.testOrProspect" defaultMessage="Test / Prospective Partner" />,
  searchengine: <FormattedMessage id="referralOptions.searchEngine" defaultMessage="Google or other search engine" />,
  other: <FormattedMessage id="referralOptions.other" defaultMessage="Other" />,
};

export default referralOptions;
