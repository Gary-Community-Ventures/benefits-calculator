import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import ResultsError from './ResultsError/ResultsError';
import Loading from './Loading/Loading';
import { EligibilityResults, Program, ProgramCategory, UrgentNeed, Validation } from '../../Types/Results';
import { getEligibility } from '../../apiCalls';
import { Context } from '../Wrapper/Wrapper';
import { Navigate, useParams, useSearchParams } from 'react-router-dom';
import { Grid } from '@mui/material';
import ResultsHeader from './ResultsHeader/ResultsHeader';
import Needs from './Needs/Needs';
import Programs from './Programs/Programs';
import ProgramPage from './ProgramPage/ProgramPage';
import ResultsTabs from './Tabs/Tabs';
import { CitizenLabels } from '../../Assets/citizenshipFilterFormControlLabels';
import dataLayerPush from '../../Assets/analytics';
import HelpButton from './211Button/211Button';
import MoreHelp from '../MoreHelp/MoreHelp';
import BackAndSaveButtons from './BackAndSaveButtons/BackAndSaveButtons';
import { FormattedMessage } from 'react-intl';
import './Results.css';

type WrapperResultsContext = {
  programs: Program[];
  programCategories: ProgramCategory[];
  needs: UrgentNeed[];
  filtersChecked: Record<CitizenLabels, boolean>;
  setFiltersChecked: (newFiltersChecked: Record<CitizenLabels, boolean>) => void;
  missingPrograms: boolean;
  isAdminView: boolean;
  validations: Validation[];
  setValidations: (validations: Validation[]) => void;
};

type ResultsProps = {
  type: 'program' | 'need' | 'navigator' | 'help';
  handleTextfieldChange: (event: Event) => void;
};

export const ResultsContext = createContext<WrapperResultsContext | undefined>(undefined);

export function useResultsContext() {
  const context = useContext(ResultsContext);

  if (context === undefined) {
    throw new Error('Component not in results context');
  }

  return context;
}

function findProgramById(programs: Program[], id: number) {
  return programs.find((program) => program.program_id === id);
}

export function findValidationForProgram(validations: Validation[], program: Program) {
  return validations.find((validation) => validation.program_name === program.external_name);
}

function addAdminToLink(link: string, isAdmin: boolean) {
  if (isAdmin) {
    return link + '?admin=true';
  }

  return link;
}

export function useResultsLink(link: string) {
  const { isAdminView } = useResultsContext();
  return addAdminToLink(link, isAdminView);
}

const Results = ({ type, handleTextfieldChange }: ResultsProps) => {
  const { locale, formData } = useContext(Context);
  const { uuid, programId } = useParams();
  const is211Co = formData.immutableReferrer === '211co';

  const [searchParams] = useSearchParams();
  const isAdminView = useMemo(() => searchParams.get('admin') === 'true', [searchParams.get('admin')]);

  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState(false);
  const [apiResults, setApiResults] = useState<EligibilityResults | undefined>();

  useEffect(() => {
    dataLayerPush({ event: 'config', user_id: uuid });
  }, [uuid]);

  const fetchResults = async () => {
    try {
      const rawEligibilityResponse = await getEligibility(uuid, locale);

      // replace the program id in the categories with the program
      for (const category of rawEligibilityResponse.program_categories) {
        category.programs = category.programs.map((programId: number) => {
          const program = findProgramById(rawEligibilityResponse.programs, programId);

          if (program === undefined) {
            throw new Error(`program with id of "${programId}" does not exist`);
          }

          return program;
        });
      }

      setApiResults(rawEligibilityResponse);
    } catch (error) {
      setApiError(true);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResults();
  }, []);

  const [filtersChecked, setFiltersChecked] = useState<Record<CitizenLabels, boolean>>({
    citizen: true,
    non_citizen: false,
    green_card: false,
    refugee: false,
    gc_5plus: false,
    gc_18plus_no5: false,
    gc_under18_no5: false,
    other: false,
    otherWithWorkPermission: false,
    otherHealthCareUnder19: false,
    otherHealthCarePregnant: false,
  });
  const [programs, setPrograms] = useState<Program[]>([]);
  const [programCategories, setProgramCategories] = useState<ProgramCategory[]>([]);
  const [needs, setNeeds] = useState<UrgentNeed[]>([]);
  const [missingPrograms, setMissingPrograms] = useState(false);
  const [validations, setValidations] = useState<Validation[]>([]);

  function showProgram(program: Program) {
    // show all programs in the admin view
    if (isAdminView) {
      return true;
    }

    const filtersCheckedStrArr = Object.entries(filtersChecked)
      .filter((filterKeyValPair) => {
        return filterKeyValPair[1];
      })
      .map((filteredKeyValPair) => filteredKeyValPair[0]);

    const meetsLegalStatus = program.legal_status_required.some((status) => filtersCheckedStrArr.includes(status));
    const isEligible = program.eligible;
    const doesNotHave = !program.already_has;

    return meetsLegalStatus && isEligible && doesNotHave;
  }

  useEffect(() => {
    if (apiResults === undefined) {
      setNeeds([]);
      setPrograms([]);
      setProgramCategories([]);
      setMissingPrograms(false);
      setValidations([]);
      return;
    }

    setNeeds(apiResults.urgent_needs);
    setPrograms(apiResults.programs.filter(showProgram));
    setProgramCategories(
      apiResults.program_categories.map((category) => {
        return {
          ...category,
          programs: category.programs.filter(showProgram),
        };
      }),
    );
    setMissingPrograms(apiResults.missing_programs);
    setValidations(apiResults.validations);
    setLoading(false);
  }, [filtersChecked, apiResults, isAdminView]);

  if (loading) {
    return (
      <div className="results-loading-container">
        <Loading />
      </div>
    );
  } else if (apiError) {
    return <ResultsError />;
  } else if (programId === undefined && type === 'help') {
    return (
      <Grid container>
        <Grid item xs={12}>
          <BackAndSaveButtons
            handleTextfieldChange={handleTextfieldChange}
            navigateToLink={addAdminToLink(`/${uuid}/results/benefits`, isAdminView)}
            BackToThisPageText={<FormattedMessage id="results.back-to-results-btn" defaultMessage="BACK TO RESULTS" />}
          />
          <MoreHelp />
        </Grid>
      </Grid>
    );
  } else if (programId === undefined && (type === 'program' || type === 'need')) {
    return (
      <main>
        <ResultsContext.Provider
          value={{
            programs,
            programCategories,
            needs,
            filtersChecked,
            setFiltersChecked,
            missingPrograms,
            isAdminView,
            validations,
            setValidations,
          }}
        >
          <ResultsHeader type={type} handleTextfieldChange={handleTextfieldChange} />
          <ResultsTabs />
          <Grid container sx={{ p: 2 }}>
            <Grid item xs={12}>
              {type === 'need' ? <Needs /> : <Programs />}
            </Grid>
          </Grid>
          {!is211Co && <HelpButton />}
        </ResultsContext.Provider>
      </main>
    );
  }

  if (programId === undefined) {
    return <Navigate to={`/${uuid}/results/benefits`} />;
  }

  const program = findProgramById(programs, Number(programId));

  if (program === undefined) {
    return <Navigate to={`/${uuid}/results/benefits`} />;
  }

  return (
    <ResultsContext.Provider
      value={{
        programs,
        programCategories,
        needs,
        filtersChecked,
        setFiltersChecked,
        missingPrograms,
        isAdminView,
        validations,
        setValidations,
      }}
    >
      <ProgramPage program={program} />
    </ResultsContext.Provider>
  );
};

export default Results;
