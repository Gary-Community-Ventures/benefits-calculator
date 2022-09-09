import { FormattedMessage } from 'react-intl';

const taxYearOptions = {
  2017: '2017',
  2018: '2018',
  2019: '2019',
  2020: '2020',
  2021: '2021',
  noRecentFiling: 
    <FormattedMessage 
      id='taxYearOptions.noRecentFiling' 
      defaultMessage='I have not filed taxes in the last 5 years' />
};

export default taxYearOptions;