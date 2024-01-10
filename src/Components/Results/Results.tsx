import { createContext, useContext, useEffect, useState } from 'react';
import './Results.css';
import ResultsError from './ResultsError/ResultsError';
import Loading from './Loading/Loading';
import { EligibilityResults, Program, UrgentNeed } from '../../Types/Results';
import { getEligibility } from '../../apiCalls';
import { Context } from '../Wrapper/Wrapper';
import { Navigate, useParams } from 'react-router-dom';
import ResultsHeader from './Header/Header';
import ProgramPage from './ProgramPage/ProgramPage';
import ResultsTabs from './Tabs/Tabs';
import Needs from './Needs/Needs';
import Programs from './Programs/Programs';
import MoreHelp from './MoreHelp/MoreHelp';
import NavigatorPage from './NavigatorPage/NavigatorPage';

import { Box, Container, Tab, Tabs, Typography } from '@mui/material';

type WrapperResultsContext = {
  programs: Program[];
  needs: UrgentNeed[];
  filters: string[];
  setFilters: (newFilters: string[]) => void;
};

type ResultsProps = {
  type: 'program' | 'need' | 'navigator';
};
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export const ResultsContext = createContext<WrapperResultsContext | undefined>(undefined);

export function useResultsContext() {
  const context = useContext(ResultsContext);

  if (context === undefined) {
    throw new Error('Component not in results context');
  }

  return context;
}

function findProgramById(programs: Program[], id: string) {
  return programs.find((program) => String(program.program_id) === id);
}

const Results = ({ type }: ResultsProps) => {
  const { locale } = useContext(Context);
  const { uuid, programId } = useParams();

  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState(false);
  const [apiResults, setApiResults] = useState<EligibilityResults | undefined>();

  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const fetchResults = async () => {
    try {
      const rawEligibilityResponse = (await getEligibility(uuid, locale)) as EligibilityResults;
      setApiResults(rawEligibilityResponse);
    } catch (error) {
      setApiError(true);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResults();
  }, []);

  const [filters, setFilters] = useState<string[]>(['citizen']);
  const [programs, setPrograms] = useState<Program[]>([]);
  const [needs, setNeeds] = useState<UrgentNeed[]>([]);

  useEffect(() => {
    if (apiResults === undefined) {
      setNeeds([]);
      setPrograms([]);
      return;
    }

    setNeeds(apiResults.urgent_needs);
    setPrograms(
      apiResults.programs.filter((program) => {
        return program.legal_status_required.some((status) => filters.includes(status)) && program.eligible;
      }),
    );
    setLoading(false);
  }, [filters, apiResults]);

  if (loading) {
    return (
      <div className="results-loading-container">
        <Loading />
      </div>
    );
  } else if (apiError) {
    return <ResultsError />;
  } else if (programId === undefined && (type === 'program' || type === 'need')) {
    return (
      <ResultsContext.Provider
        value={{
          programs,
          needs,
          filters,
          setFilters,
        }}
      >
        <ResultsHeader type={type} />
        <Box sx={{ width: '100%' }}>
          <Box className="results-tab-container">
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
              variant="fullWidth"
              indicatorColor="secondary"
            >
              <Tab label={`LONG-TERM BENEFITS (${programs.length})`} {...a11yProps(0)} />
              <Tab label={`NEAR-TERM RESOURCES (${needs.length})`} {...a11yProps(1)} />
            </Tabs>
          </Box>
          <CustomTabPanel value={value} index={0}>
            <ResultsTabs currentTab={type} />
            {type === 'need' ? <Needs /> : <Programs />}
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            <Needs />
          </CustomTabPanel>
        </Box>
        <MoreHelp />
      </ResultsContext.Provider>
    );
  }

  if (programId === undefined) {
    return <Navigate to={`/${uuid}/results/benefits`} />;
  }

  const program = findProgramById(programs, programId);

  if (program === undefined) {
    return <Navigate to={`/${uuid}/results/benefits`} />;
  }

  if (type === 'navigator') {
    return <NavigatorPage navigators={program.navigators} />;
  }

  return <ProgramPage program={program} />;
};

export default Results;
