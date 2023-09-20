import { useEffect, useState, useContext, KeyboardEvent, MouseEvent } from 'react';
import { Context } from '../Wrapper/Wrapper.tsx';
import { useNavigate, useParams } from 'react-router-dom';
import { FormattedMessage, useIntl } from 'react-intl';
import {
  Button,
  Link,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  typographyClasses,
  IconButton,
} from '@mui/material';
import FilterSection from '../FilterSection/FilterSection';
import ResultsError from '../ResultsError/ResultsError.js';
import UrgentNeedsTable from '../UrgentNeedsTable/UrgentNeedsTable';
import Loading from '../Loading/Loading.js';
import NoResultsTable from '../NoResultsTable/NoResultsTable.tsx';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import Grid from '@mui/material/Grid';
import {
  DataGridPro,
  useGridSelector,
  useGridApiContext,
  gridFilteredDescendantCountLookupSelector,
  GridLinkOperator,
  GridRenderCellParams,
  GridValueFormatterParams,
  GridFilterItem,
} from '@mui/x-data-grid-pro';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { getEligibility } from '../../apiCalls.js';
import './Results.css';
import dataLayerPush from '../../Assets/analytics.ts';
import {
  Program,
  ProgramNavigator,
  EligibilityResults,
  TestMessage,
  Translation,
  UrgentNeed,
} from '../../Types/Results.ts';

export type UpdateFilterArg =
  | {
      name: 'citizen' | 'eligible';
      filter: GridFilterItem;
    }
  | {
      name: 'hasBenefit' | 'category';
      filter: GridFilterItem | false;
    };

export const isNavigationKey = (key: string) =>
  key === 'Home' || key === 'End' || key.indexOf('Arrow') === 0 || key.indexOf('Page') === 0 || key === ' ';

const Results = () => {
  const { uuid: screenerId } = useParams();
  const navigate = useNavigate();
  const { locale, theme } = useContext(Context);
  const intl = useIntl();
  const [filterResultsButton, setFilterResultsButton] = useState('benefits');
  const citizenToggleState = useState(false);
  const categoryState = useState('All Categories');
  const eligibilityState = useState('eligibleBenefits');
  const alreadyHasToggleState = useState(false);

  type ResultsState = {
    programs: Program[];
    urgentNeeds: UrgentNeed[];
    screenerId: number;
    loadingState: 'loading' | 'error' | 'done';
  };

  const initialResults: ResultsState = {
    programs: [],
    urgentNeeds: [],
    screenerId: 0,
    loadingState: 'loading',
  };

  const [results, setResults] = useState<ResultsState>(initialResults);

  type FilterState = {
    citizen: GridFilterItem;
    eligible: GridFilterItem;
    hasBenefit: GridFilterItem | false;
    category: GridFilterItem | false;
  };
  const [filt, setFilt] = useState<FilterState>({
    citizen: {
      id: 1,
      columnField: 'citizenship',
      operatorValue: 'isAnyOf',
      value: ['citizen', 'none'],
    },
    eligible: {
      id: 2,
      columnField: 'eligible',
      operatorValue: 'is',
      value: 'true',
    },
    hasBenefit: {
      id: 3,
      columnField: 'has_benefit',
      operatorValue: 'is',
      value: 'false',
    },
    category: false,
  });

  const filtList = (filt: FilterState) => {
    const filters: GridFilterItem[] = [filt.citizen, filt.eligible];
    if (filt.hasBenefit !== false) {
      filters.push(filt.hasBenefit);
    }
    if (filt.category !== false) {
      filters.push(filt.category);
    }
    return filters;
  };

  const updateFilter = function (...args: UpdateFilterArg[]) {
    const newFilter = { ...filt };
    for (let i = 0; i < args.length; i++) {
      let filter = args[i];
      if ('citizen' === filter.name || 'eligible' === filter.name) {
        newFilter[filter.name] = filter.filter;
      } else {
        newFilter[filter.name] = filter.filter;
      }
    }
    setFilt(newFilter);
  };

  useEffect(() => {
    fetchResults();
  }, []);

  const fetchResults = async () => {
    let rawEligibilityResponse: EligibilityResults;
    try {
      rawEligibilityResponse = (await getEligibility(screenerId, locale)) as EligibilityResults;
    } catch (error) {
      setResults({
        ...results,
        loadingState: 'error',
      });
      return;
    }
    const programs = rawEligibilityResponse.programs.sort(
      (benefitA, benefitB) => benefitB.estimated_value - benefitA.estimated_value,
    );

    setResults({
      programs: programs,
      urgentNeeds: rawEligibilityResponse.urgent_needs,
      screenerId: rawEligibilityResponse.screen_id,
      loadingState: 'done',
    });
  };

  const preschoolProgramCategory = 'Cuidado de Niños, Preescolar y Jóvenes';
  const categoryValues = (programs: Program[]) => {
    const preschoolPrograms = [0, 0];
    const categoryValues: { [key: string]: number } = {};
    for (let program of programs) {
      if (categoryValues[program.category.default_message] === undefined) {
        categoryValues[program.category.default_message] = 0;
      }
      if (filt.citizen.value.includes(program.legal_status_required)) {
        categoryValues[program.category.default_message] += program.estimated_value;
        if (preschoolProgramCategory == program.category.default_message) {
          preschoolPrograms[0]++;
          preschoolPrograms[1] += program.estimated_value;
        }
      }
    }

    for (const category in preschoolPrograms) {
      if (Object.keys(preschoolPrograms).includes(category)) {
        if (preschoolPrograms[1] > 8640 && preschoolPrograms[0] > 1) {
          categoryValues[category] = 8640;
        }
      }
    }

    return categoryValues;
  };

  const totalDollarAmount = (programs: Program[], category?: string) => {
    const valuesByCategory = categoryValues(programs);
    if (category) {
      return valuesByCategory[category];
    }
    let total = 0;
    for (let name in valuesByCategory) {
      total += valuesByCategory[name];
    }
    return total;
  };

  const totalEligiblePrograms = (programs: Program[]) => {
    return programs.reduce((total, program) => {
      if (program.estimated_value <= 0) return total;
      if (filt.citizen.value.includes('non-citizen') && program.legal_status_required !== 'citizen') {
        total += 1;
      } else if (filt.citizen.value.includes('citizen') && program.legal_status_required !== 'non-citizen') {
        total += 1;
      }
      return total;
    }, 0);
  };

  const displayTestResults = (tests: TestMessage[]) => {
    if (tests.length) {
      return (
        <>
          {tests.map((messageParts, i) => {
            return (
              <li key={i}>
                {messageParts.reduce((acc: string, part) => {
                  let newPart: string;
                  if (typeof part === 'string') {
                    newPart = part;
                  } else {
                    newPart = intl.formatMessage({ id: part.label, defaultMessage: part.default_message });
                  }
                  return acc + newPart;
                }, '')}
              </li>
            );
          })}
        </>
      );
    }
  };

  const formatPhoneNumber = (phoneNumberString: string) => {
    const cleaned = ('' + phoneNumberString).replace(/\D/g, '');
    const match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      const intlCode = match[1] ? '+1 ' : '';
      return [intlCode, '(', match[2], ') ', match[3], '-', match[4]].join('');
    }
  };

  const displayNavigators = (navigators: ProgramNavigator[]) => {
    if (navigators.length) {
      return (
        <>
          {navigators
            .map((navigator) => {
              return (
                <div className="navigator-container" key={navigator.id}>
                  <h2 className="navigator-header">
                    <FormattedMessage
                      defaultMessage={navigator.name.default_message}
                      id={navigator.name.label}
                    ></FormattedMessage>
                  </h2>
                  <p className="navigator-desc">
                    <FormattedMessage
                      defaultMessage={navigator.description.default_message}
                      id={navigator.description.label}
                    />
                  </p>
                  {navigator.assistance_link.default_message && (
                    <h4 className="font-weight">
                      Link:{' '}
                      <a
                        className="ineligibility-link navigator-info"
                        href={intl.formatMessage({
                          defaultMessage: navigator.assistance_link.default_message,
                          id: navigator.assistance_link.label,
                        })}
                        target="_blank"
                        rel="noreferrer"
                        onClick={() => {
                          dataLayerPush({
                            event: 'navigator',
                            action: 'navigator link',
                            resource: `Apply With Assistance for ${navigator.name.default_message}`,
                            resource_name: navigator.name.default_message,
                          });
                        }}
                      >
                        <FormattedMessage
                          defaultMessage={navigator.assistance_link.default_message}
                          id={navigator.assistance_link.label}
                        />
                      </a>
                    </h4>
                  )}
                  {navigator.email.default_message && (
                    <h4 className="font-weight">
                      Email:{' '}
                      <span className="navigator-info">
                        <FormattedMessage defaultMessage={navigator.email.default_message} id={navigator.email.label} />
                      </span>
                    </h4>
                  )}
                  {navigator.phone_number && (
                    <h4 className="font-weight">
                      Phone Number: <span className="navigator-info">{formatPhoneNumber(navigator.phone_number)}</span>
                    </h4>
                  )}
                </div>
              );
            })
            .reduce((accu: null | JSX.Element[], elem) => {
              //https://stackoverflow.com/questions/34034038/how-to-render-react-components-by-using-map-and-join/35840806#35840806
              return accu === null ? [elem] : [...accu, <hr className="line-seperator" key="hr"></hr>, elem];
            }, null)}
        </>
      );
    }
  };

  const displaySubheader = () => {
    if (!totalEligiblePrograms(results.programs)) {
      return (
        <Grid xs={12} item>
          <h1 className="bottom-border program-value-header">
            <FormattedMessage id="results.displaySubheader-noResults" defaultMessage="No Benefits Results Found" />
          </h1>
        </Grid>
      );
    } else {
      return (
        <Grid xs={12} item>
          <h1 className="bottom-border program-value-header">
            {totalEligiblePrograms(results.programs)}
            <FormattedMessage
              id="results.return-programsUpToLabel"
              defaultMessage=" programs with an estimated value of "
            />
            ${totalDollarAmount(results.programs).toLocaleString()}
            <FormattedMessage id="results.return-perYearOrLabel" defaultMessage=" per year or " />$
            {Math.round(totalDollarAmount(results.programs) / 12).toLocaleString()}
            <FormattedMessage
              id="results.return-perMonthLabel"
              defaultMessage=" per month in cash or reduced expenses for you to consider"
            />
          </h1>
        </Grid>
      );
    }
  };

  type DataRow = {
    id: number;
    path: string[];
    name: Translation;
    has_benefit: boolean;
    value: { value: number; type: Translation };
    description: Translation;
    application_time: Translation;
    delivery_time: Translation;
    application_link: Translation;
    passed_tests: TestMessage[];
    failed_tests: TestMessage[];
    category: string;
    navigators: ProgramNavigator[];
    citizenship: string;
    eligible: boolean;
  };
  const DataGridRows = (programs: Program[]): DataRow[] => {
    let dgr: DataRow[] = [];
    let count = 0;
    for (let i = 0; i < programs.length; i++) {
      let dataGridRow: DataRow = {
        id: count,
        path: [programs[i].name.label],
        name: programs[i].name,
        has_benefit: programs[i].already_has,
        value: { value: programs[i].estimated_value, type: programs[i].value_type },
        description: programs[i].description,
        application_time: programs[i].estimated_application_time,
        delivery_time: programs[i].estimated_delivery_time,
        application_link: programs[i].apply_button_link,
        passed_tests: programs[i].passed_tests,
        failed_tests: programs[i].failed_tests,
        category: programs[i].category.default_message,
        navigators: programs[i].navigators,
        citizenship: programs[i].legal_status_required,
        eligible: programs[i].eligible,
      };
      dgr.push(dataGridRow);
      count++;
      let dataGridChild: DataRow = {
        id: count,
        path: [programs[i].name.label, 'Detail'],
        name: programs[i].name,
        has_benefit: programs[i].already_has,
        value: { value: programs[i].estimated_value, type: programs[i].value_type },
        application_time: programs[i].estimated_application_time,
        delivery_time: programs[i].estimated_delivery_time,
        description: programs[i].description,
        citizenship: '',
        application_link: programs[i].apply_button_link,
        passed_tests: programs[i].passed_tests,
        failed_tests: programs[i].failed_tests,
        category: programs[i].category.default_message,
        navigators: programs[i].navigators,
        eligible: programs[i].eligible,
      };
      dgr.push(dataGridChild);
      count++;
    }
    return dgr;
  };

  const CustomGridTreeDataGroupingCell = (props: GridRenderCellParams<DataRow>) => {
    const { id, rowNode } = props;
    const apiRef = useGridApiContext();
    const filteredDescendantCountLookup = useGridSelector(apiRef, gridFilteredDescendantCountLookupSelector);
    const [navListOpen, setNavListOpen] = useState(false);
    const openNavList = () => {
      setNavListOpen(!navListOpen);
    };

    let row = apiRef.current.getRow<DataRow>(id);
    if (row === null) {
      return <></>;
    }

    const filteredDescendantCount = filteredDescendantCountLookup[rowNode.id] ?? 0;

    return (
      <div>
        {filteredDescendantCount > 0 ? (
          <FormattedMessage defaultMessage={row.name.default_message} id={row.name.label} />
        ) : (
          <Box sx={{ padding: 1 }}>
            <Typography variant="body1" gutterBottom>
              <FormattedMessage defaultMessage={row.description.default_message} id={row.description.label} />
            </Typography>
            <Typography variant="body1" sx={{ fontStyle: 'italic', marginBottom: 2 }}>
              <FormattedMessage
                id="results.return-estimatedDeliveryTimeA"
                defaultMessage="*On average people who are approved for this benefit start receiving it "
              />
              <FormattedMessage defaultMessage={row.delivery_time.default_message} id={row.delivery_time.label} />
              <FormattedMessage
                id="results.return-estimatedDeliveryTimeB"
                defaultMessage=" after completing the application."
              />
            </Typography>
            <a
              href={intl.formatMessage({
                defaultMessage: row.application_link.default_message,
                id: row.application_link.label,
              })}
              target="_blank"
              rel="noreferrer"
              onClick={() => {
                dataLayerPush({
                  event: 'program',
                  action: 'program link',
                  resource: `Apply to ${row?.name.default_message}`,
                  resource_name: row?.name.default_message,
                });
              }}
            >
              <Button className="apply-button">
                <FormattedMessage id="results.resultsRow-applyButton" defaultMessage="Apply" />
              </Button>
            </a>
            {row.navigators.length > 0 && (
              <Button variant="contained" onClick={openNavList} sx={{ marginLeft: '5px' }}>
                <FormattedMessage id="results.resultsRow-applyWithAssistance" defaultMessage="Apply With Assistance" />
              </Button>
            )}
            {row.navigators.length > 0 && navListOpen && (
              <div className="navigator-list">
                <CloseIcon onClick={openNavList} className="top-right" />
                {displayNavigators(row.navigators)}
              </div>
            )}
            {(row.passed_tests.length > 0 || row.failed_tests.length > 0) && (
              <Accordion sx={{ m: 2 }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                  <Typography variant="body2">
                    <Link>
                      <FormattedMessage
                        id="results.resultsRow-expandForEligibilityLink"
                        defaultMessage="Expand for eligibility details"
                      />
                    </Link>
                  </Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ paddingTop: 0 }}>
                  {displayTestResults(row.passed_tests)}
                  {displayTestResults(row.failed_tests)}
                </AccordionDetails>
              </Accordion>
            )}
          </Box>
        )}
      </div>
    );
  };

  const groupingColDef = {
    headerName: intl.formatMessage({
      id: 'results.resultsTable-benefitLabel',
      defaultMessage: 'Benefit',
    }),
    flex: 1,
    colSpan: ({ row }: { row: DataRow }) => {
      if (row.path.indexOf('Detail') !== -1) {
        return 4;
      } else {
        return 1;
      }
    },
    renderCell: (params: GridRenderCellParams<DataRow>) => <CustomGridTreeDataGroupingCell {...params} />,
  };

  const DataGridTable = (programs: Program[]) => {
    const rows = DataGridRows(programs);

    const nameHeader = intl.formatMessage({
      id: 'results.resultsTable-benefitLabel',
      defaultMessage: 'Benefit',
    });
    const valueHeader = intl.formatMessage({
      id: 'results.resultsTable-annualValueLabel',
      defaultMessage: 'Estimated Annual Value',
    });
    const appTimeHeader = intl.formatMessage({
      id: 'results.resultsTable-timeToApply',
      defaultMessage: 'Time to Apply',
    });

    const columns = [
      { field: 'name', headerName: nameHeader, flex: 1 },
      {
        field: 'value',
        headerName: valueHeader,
        flex: 1,
        valueFormatter: benefitValueFormatter,
        renderCell: benefitValueRender,
      },
      { field: 'type', headerName: 'Type', flex: 1 },
      {
        field: 'application_time',
        headerName: appTimeHeader,
        flex: 1,
        renderCell: (props: GridRenderCellParams<Translation>) => {
          return <FormattedMessage defaultMessage={props.value?.default_message} id={props.value?.label} />;
        },
      },
      { field: 'delivery_time', headerName: 'Delivery Time', flex: 1 },
      { field: 'citizenship', headerName: 'Citizenship Requirements', flex: 1 },
      { field: 'application_link', headerName: 'Application Link', flex: 1 },
      { field: 'passed_tests', headerName: 'Passed Tests', flex: 1 },
      { field: 'failed_tests', headerName: 'Passed Tests', flex: 1 },
      { field: 'eligible', headerName: 'Eligible', flex: 1, type: 'boolean' },
      { field: 'has_benefit', headerName: 'Has Benefit', flex: 1, type: 'boolean' },
      { field: 'category', headerName: 'Category', flex: 1 },
      {
        field: 'toggle',
        headerName: '',
        flex: 0.15,
        align: 'right',
        renderCell: (params) => (
          <CustomDetailPanelToggle id={params.id} field={params.field} rowNode={params.rowNode} />
        ),
      },
    ];

    const categories = programs.reduce((acc: { defaultMessage: string; label: string }[], benefit) => {
      if (!acc.some((category) => category.defaultMessage === benefit.category.default_message)) {
        acc = [...acc, { defaultMessage: benefit.category.default_message, label: benefit.category.label }];
      }
      return acc;
    }, []);

    const CustomDetailPanelToggle = (props) => {
      const { id, field, rowNode } = props;
      const apiRef = useGridApiContext();

      const handleKeyDown = (event: KeyboardEvent<HTMLAnchorElement>) => {
        if (event.key === ' ') {
          event.stopPropagation();
        }
        if (isNavigationKey(event.key) && !event.shiftKey) {
          apiRef.current.publishEvent('cellNavigationKeyDown', props, event);
        }
      };

      const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
        apiRef.current.setRowChildrenExpansion(id, !rowNode.childrenExpanded);
        apiRef.current.setCellFocus(id, field);
        event.stopPropagation();
      };

      return (
        <IconButton
          color="primary"
          tabIndex={0}
          aria-label={rowNode.childrenExpanded ? 'Close' : 'Open'}
          onClick={handleClick}
          onKeyDown={handleKeyDown}
        >
          {rowNode.childrenExpanded ? <RemoveIcon /> : <AddIcon />}
        </IconButton>
      );
    };

    return (
      <>
        <div className="filters-container">
          {
            <FilterSection
              updateFilter={updateFilter}
              categories={categories}
              citizenToggleState={citizenToggleState}
              categoryState={categoryState}
              eligibilityState={eligibilityState}
              alreadyHasToggleState={alreadyHasToggleState}
            />
          }
        </div>
        {filt.category !== false && (
          <>
            <Toolbar sx={{ border: 1, backgroundColor: theme.primaryColor, color: 'white' }}>
              <span className="space-around border-right">{filt.category.value}</span>
              <span className="space-around">
                ${totalDollarAmount(programs, filt.category.value).toLocaleString()}{' '}
                <FormattedMessage id="results.perYear" defaultMessage="Per Year" />
              </span>
            </Toolbar>
            {filt.category.value ===
              categories.find((cat) => cat.label === preschoolProgramCategory)?.defaultMessage && (
              <Typography variant="body2" className="child-care-helper-text">
                <FormattedMessage
                  id="benefitCategories.childCareHelperText"
                  defaultMessage="Do you wonder why the annual value of these programs may differ from the total values in your results? It's because this annual value is an estimate of the combined likely average value of child care and preschool programs you qualify for. Savings from programs may overlap. You may be able to combine benefits to help pay for child care and preschool."
                />
              </Typography>
            )}
          </>
        )}
        <DataGridPro
          treeData
          autoHeight
          getTreeDataPath={(row) => row.path}
          groupingColDef={groupingColDef}
          getRowHeight={() => 'auto'}
          disableChildrenFiltering
          disableColumnFilter
          hideFooter={true}
          rows={rows}
          columns={columns}
          filterModel={{
            items: filtList(filt),
            linkOperator: GridLinkOperator.And,
          }}
          sx={{
            '&.MuiDataGrid-root--densityCompact .MuiDataGrid-cell': {
              py: '8px',
            },
            '&.MuiDataGrid-root--densityStandard .MuiDataGrid-cell': {
              py: '15px',
            },
            '&.MuiDataGrid-root--densityComfortable .MuiDataGrid-cell': {
              py: '22px',
            },
          }}
          initialState={{
            columns: {
              columnVisibilityModel: {
                citizenship: false,
                delivery_time: false,
                type: false,
                name: false,
                description: false,
                application_link: false,
                passed_tests: false,
                failed_tests: false,
                navigators: false,
                eligible: false,
                has_benefit: false,
                category: false,
              },
            },
          }}
        />
      </>
    );
  };

  const benefitValueFormatter = (params: GridValueFormatterParams<number>) => {
    let formatted_value = '';
    if (params.value.toLocaleString().length > 0) {
      formatted_value = '$' + params.value.toLocaleString();
    }

    return formatted_value;
  };

  const benefitValueRender = (params: GridRenderCellParams<{ value: number; type: Translation }>) => {
    let formatted_value = '';

    if (params.value !== undefined && params.value.value.toLocaleString().length > 0) {
      formatted_value = '$' + params.value.value.toLocaleString();
    }

    return (
      <div>
        {formatted_value}
        <Typography variant="body2" sx={{ fontStyle: 'italic' }}>
          <FormattedMessage defaultMessage={params.value?.type.default_message} id={params.value?.type.label} />
        </Typography>
      </div>
    );
  };

  const displayHeaderSection = () => {
    return (
      <Grid container item xs={12} sx={{ mt: 2 }}>
        <Grid xs={12} item={true}>
          <Typography className="body2">
            <FormattedMessage id="results.return-screenerIdLabel" defaultMessage="Screener ID: " />
            {results.screenerId}
          </Typography>
        </Grid>
        <Grid container item xs={12}>
          {displaySubheader()}
        </Grid>
      </Grid>
    );
  };

  const displayBenefitAndImmedNeedsBtns = () => {
    const benefitBtnClass = filterResultsButton === 'benefits' ? 'results-link' : 'results-filter-button-grey';
    const immediateNeedsBtnClass =
      filterResultsButton === 'urgentNeeds' ? 'results-link' : 'results-filter-button-grey';

    return (
      <div>
        <Button
          className={benefitBtnClass}
          onClick={() => {
            setFilterResultsButton('benefits');
          }}
          sx={{ mt: 1, mr: 0.5, mb: 1, p: 0.8, fontSize: '.8rem' }}
          variant="contained"
        >
          <FormattedMessage
            id="results.displayResultsFilterButtons-benefitPrograms"
            defaultMessage="Benefit Programs"
          />
        </Button>
        <Button
          className={immediateNeedsBtnClass}
          onClick={() => {
            setFilterResultsButton('urgentNeeds');
          }}
          sx={{ mt: 1, mb: 1, p: 0.8, fontSize: '.8rem' }}
          variant="contained"
        >
          <FormattedMessage
            id="results.displayResultsFilterButtons-urgentNeedsResources"
            defaultMessage="Immediate Needs"
          />
        </Button>
      </div>
    );
  };

  const renderDataGridOrNoResultsTable = () => {
    if (totalEligiblePrograms(results.programs)) {
      return DataGridTable(results.programs);
    } else {
      return <NoResultsTable />;
    }
  };

  return (
    <main className="benefits-form">
      <div className="results-container">
        <Grid container spacing={2}>
          {results.loadingState === 'loading' && <Loading />}
          {results.loadingState === 'error' && <ResultsError />}
          {results.loadingState === 'done' && (
            <>
              {displayHeaderSection()}
              <Grid xs={12} item={true}>
                {displayBenefitAndImmedNeedsBtns()}
                {filterResultsButton === 'benefits' && renderDataGridOrNoResultsTable()}
                {filterResultsButton === 'urgentNeeds' && (
                  <UrgentNeedsTable urgentNeedsPrograms={results.urgentNeeds} />
                )}
              </Grid>
              <Button
                className="back-to-screen-button"
                onClick={() => {
                  navigate(`/${screenerId}/confirm-information`);
                }}
                variant="contained"
              >
                <FormattedMessage id="results.returnToScreenButton" defaultMessage="Edit Screener Responses" />
              </Button>
            </>
          )}
        </Grid>
      </div>
    </main>
  );
};

export default Results;
