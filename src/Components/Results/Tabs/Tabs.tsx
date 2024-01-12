import { NavLink, Link, useParams } from 'react-router-dom';
import { useResultsContext } from '../Results';
import { Grid } from '@mui/material';
import { FormattedMessage } from 'react-intl';

type ResultsTabsProps = {
  currentTab: 'program' | 'need';
};

const ResultsTabs = ({ currentTab }: ResultsTabsProps) => {
  const { uuid } = useParams();

  const { programs, needs } = useResultsContext();

  return (
    <Grid container className="results-tab-container">
      <Grid item xs={6} className="results-tab">
        <NavLink to={`/${uuid}/results/benefits`} className={({ isActive }) => (isActive ? 'active' : '')}>
          <FormattedMessage
            id="resultsOptions.longtermBenefits"
            defaultMessage={`Long-Term Benefits (${programs.length})`}
          />
        </NavLink>
      </Grid>
      <Grid item xs={6} className="results-tab">
        <NavLink to={`/${uuid}/results/near-term-needs`} className={({ isActive }) => (isActive ? 'active' : '')}>
          <FormattedMessage
            id="resultsOptions.longtermBenefits"
            defaultMessage={`Near-Term Benefits (${needs.length})`}
          />
        </NavLink>
      </Grid>
    </Grid>
  );
};

export default ResultsTabs;
