import { FormattedMessage } from 'react-intl';

const referralOptions = {
  '211co': '2-1-1 Colorado',
  cedp: 'Community Economic Defense Project (CEDP)',
  taxAssistanceSite: (
    <FormattedMessage
      id="referralOptions.taxAssistanceSite"
      defaultMessage="Tax Assistance Site (VITA/Tax Help Colorado)"
    />
  ),
  cch: 'Colorado Coalition for the Homeless',
  frca: 'Family Resource Center Association',
  jeffcoHS: 'Jeffco Human Services',
  gac: 'Get Ahead Colorado',
  bia: 'Benefits in Action',
  villageExchange: 'Village Exchange',
  lgs: "Let's Get Set",
  testOrProspect: <FormattedMessage id="referralOptions.testOrProspect" defaultMessage="Test / Prospective Partner" />,
  searchEngine: <FormattedMessage id="referralOptions.searchEngine" defaultMessage="Google or other search engine" />,
  socialMedia: <FormattedMessage id="referralOptions.socialMedia" defaultMessage="Social Media" />,
  mail: <FormattedMessage id="referralOptions.mail" defaultMessage="Mail" />,
  other: <FormattedMessage id="referralOptions.other" defaultMessage="Other" />,
};

export default referralOptions;
