import { NavLink } from 'react-router-dom';
import { useResultsContext, useResultsLink } from '../Results';
import { Grid } from '@mui/material';
import { FormattedMessage } from 'react-intl';
import { useTranslateNumber } from '../../../Assets/languageOptions';

const ResultsTabs = () => {
  const { programs, needs } = useResultsContext();
  const translateNumber = useTranslateNumber();

  const benefitsLink = useResultsLink(`results/benefits`);
  const needsLink = useResultsLink(`results/near-term-needs`);
  return (
    <Grid container className="results-tab-container">
      <Grid item xs={6} className="results-tab">
        <NavLink to={benefitsLink} className={({ isActive }) => (isActive ? 'active' : '')}>
          <h1 style={{ fontSize: '1rem' }}>
            <FormattedMessage id="resultsOptions.longTermBenefits" defaultMessage="Long-Term Benefits " />(
            {translateNumber(programs.length)})
          </h1>
        </NavLink>
      </Grid>
      <Grid item xs={6} className="results-tab">
        <NavLink to={needsLink} className={({ isActive }) => (isActive ? 'active' : '')}>
          <h1 style={{ fontSize: '1rem' }}>
            <FormattedMessage id="resultsOptions.nearTermBenefits" defaultMessage="Near-Term Benefits " />(
            {translateNumber(needs.length)})
          </h1>
        </NavLink>
      </Grid>
    </Grid>
  );
};

export default ResultsTabs;
