import { FormattedMessage } from 'react-intl';

const referralOptions = {
  '211co': '2-1-1 Colorado',
  cedp: 'Community Economic Defense Project (CEDP)',
  cch: 'Colorado Coalition for the Homeless',
  frca: 'Family Resource Center Association',
  jeffcoHS: 'Jeffco Human Services',
  gac: 'Get Ahead Colorado',
  bia: 'Benefits in Action',
  villageExchange: 'Village Exchange',
  fircsummitresourcecenter: (
    <FormattedMessage id="referralOptions.fircsummitresourcecenter" defaultMessage="FIRC Summit Resource Center" />
  ),
  testOrProspect: <FormattedMessage id="referralOptions.testOrProspect" defaultMessage="Test / Prospective Partner" />,
  searchEngine: <FormattedMessage id="referralOptions.searchEngine" defaultMessage="Google or other search engine" />,
  socialMedia: <FormattedMessage id="referralOptions.socialMedia" defaultMessage="Social Media" />,
  other: <FormattedMessage id="referralOptions.other" defaultMessage="Other" />,
};

export default referralOptions;
