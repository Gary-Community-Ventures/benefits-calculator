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

type WrapperResultsContext = {
  programs: Program[];
  needs: UrgentNeed[];
  filters: string[];
  setFilters: (newFilters: string[]) => void;
};

type ResultsProps = {
  type: 'program' | 'need';
};

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
  const { uuid, id } = useParams();

  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState(false);
  const [apiResults, setApiResults] = useState<EligibilityResults | undefined>();

  const fetchResults = async () => {
    try {
      const rawEligibilityResponse = (await getEligibility(uuid, locale)) as EligibilityResults;
      setApiResults(rawEligibilityResponse);
    } catch (error) {
      setApiError(true);
    }
    setLoading(false);
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
  }, [filters, apiResults]);

  if (loading) {
    return (
      <div className="results-loading-container">
        <Loading />
      </div>
    );
  } else if (apiError) {
    return <ResultsError />;
  } else if (id === undefined) {
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
        <ResultsTabs currentTab={type} />
        {type === 'need' ? <Needs /> : <Programs />}
        <MoreHelp />
      </ResultsContext.Provider>
    );
  } else {
    const program = findProgramById(programs, id);

    if (program === undefined) {
      return <Navigate to={`/${uuid}/results/benefits`} />;
    }

    return <ProgramPage program={program} />;
  }
};

export default Results;
