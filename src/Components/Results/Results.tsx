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
  IconButton,
  Modal,
} from '@mui/material';
import FilterSection from '../FilterSection/FilterSection';
import ResultsError from '../ResultsError/ResultsError.tsx';
import UrgentNeedsTable from '../UrgentNeedsTable/UrgentNeedsTable';
import Loading from '../Loading/Loading.tsx';
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
  GridAlignment,
  useGridApiRef,
  gridVisibleSortedRowEntriesSelector,
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
import { citizenshipFilterOperators } from '../FilterSection/CitizenshipPopover.tsx';
import type { CitizenLabels } from '../../Assets/citizenshipFilterFormControlLabels';
import EmailResults from '../EmailResults/EmailResults.tsx';
import { BrandedResultsHeader } from '../Referrer/Referrer.tsx';
import BackToScreen from '../BackToScreen/BackToScreen.tsx';

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

type ResultsProps = {
  handleTextFieldChange: (event: Event) => void;
};

const Results = ({ handleTextFieldChange }: ResultsProps) => {
  const { uuid: screenerId } = useParams();
  const navigate = useNavigate();
  const { locale, theme, formData } = useContext(Context);
  const intl = useIntl();
  const [filterResultsButton, setFilterResultsButton] = useState('benefits');
  const [citizenshipFilterIsChecked, setCitizenshipFilterIsChecked] = useState<Record<CitizenLabels, boolean>>({
    non_citizen: false,
    green_card: false,
    gc_5plus: false,
    gc_18plus_no5: false,
    gc_under18_no5: false,
    refugee: false,
    other: false,
    otherWithWorkPermission: false,
    otherHealthCareUnder19: false,
    otherHealthCarePregnant: false,
  });
  const categoryState = useState('All Categories');
  const eligibilityState = useState('eligibleBenefits');
  const alreadyHasToggleState = useState(false);
  const [sendResultsOpen, setSendResultsOpen] = useState(false);

  useEffect(() => {
    dataLayerPush({ event: 'config', user_id: screenerId });
  }, [screenerId]);

  type ResultsState = {
    programs: Program[];
    urgentNeeds: UrgentNeed[];
    screenerId: number;
    loadingState: 'loading' | 'error' | 'done';
    missingPrograms: boolean;
  };

  const initialResults: ResultsState = {
    programs: [],
    urgentNeeds: [],
    screenerId: 0,
    missingPrograms: false,
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
    //https://v5.mui.com/x/react-data-grid/filtering/#create-a-custom-operator
    citizen: {
      id: 1,
      columnField: 'citizenship',
      operatorValue: 'customCitizenshipOperator',
      value: ['citizen'],
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

  const [citizenshipRowCount, setCitizenshipRowCount] = useState(1);
  const [totalCitizenshipDollarValue, setTotalCitizenshipDollarValue] = useState({
    cashOrReducedExpenses: 0,
    taxCredits: 0,
  });
  const [totalVisibleRowDollarValue, setTotalVisibleRowDollarValue] = useState(0);
  const apiRef = useGridApiRef();

  useEffect(() => {
    let count = 0;
    const eligiblePrograms = results.programs.filter((program) => program.eligible);

    //this will calculate the number of eligible programs/rows
    eligiblePrograms.forEach((program) => {
      const hasOverlap = program.legal_status_required.some((legalStatusType) => {
        return filt.citizen.value.includes(legalStatusType);
      });

      if (hasOverlap) {
        count += 1;
      }
    });

    //used renderAllCategoryValues(eligiblePrograms) instead of the real total to take into account the preschool/childCare category value cap at 8640
    const allCategoriesAndValuesObjCappedForPreschool = renderAllCategoryValues(eligiblePrograms);
    const totalCashAndTaxCreditValues = Object.entries(allCategoriesAndValuesObjCappedForPreschool).reduce(
      (acc, categoryAndValueArr) => {
        const categoryName = categoryAndValueArr[0];
        const categoryValue = categoryAndValueArr[1];
        const taxCreditsCategoryString = 'Tax Credits';

        if (categoryName === taxCreditsCategoryString) {
          acc.taxCredits += categoryValue;
        } else {
          acc.cashOrReducedExp += categoryValue;
        }

        return acc;
      },
      { cashOrReducedExp: 0, taxCredits: 0 },
    );
console.log('hi');
console.log('hi');
console.log('hi');
console.log('hi');
console.log('hi');
console.log('hi');
console.log('hi');

setCitizenshipRowCount(count);
setTotalCitizenshipDollarValue({
cashOrReducedExpenses: totalCashAndTaxCreditValues.cashOrReducedExp,
taxCredits: totalCashAndTaxCreditValues.taxCredits,
});

    //this is for the category header
    if (apiRef && apiRef.current && Object.keys(apiRef.current).length) {
      const updatedTotalEligibleDollarValue = gridVisibleSortedRowEntriesSelector(apiRef).reduce((acc, row) => {
        return (acc += row.model.value.value);
      }, 0);

      //this is only to cap the totalVisibleRowDollarValue for preschool
      const typedFiltCategory = filt.category as GridFilterItem;
      if (typedFiltCategory.value === childCareYouthAndEducationCategoryString) {
        const childCareYouthAndEducationDollarValue =
          renderAllCategoryValues(eligiblePrograms)[childCareYouthAndEducationCategoryString];
        setTotalVisibleRowDollarValue(childCareYouthAndEducationDollarValue);
        return;
      }

      setTotalVisibleRowDollarValue(updatedTotalEligibleDollarValue);
    }
  }, [results, filt]);

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
      //@ts-ignore
      newFilter[filter.name] = filter.filter;
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
      missingPrograms: rawEligibilityResponse.missing_programs,
    });
  };

  const childCareYouthAndEducationCategoryString = 'Child Care, Youth, and Education';

  const renderAllCategoryValues = (programs: Program[]) => {
    let childCareTotalEstVal = 0;
    let youthAndEducationTotalEstVal = 0;
    const categoryValues: { [key: string]: number } = {};

    for (let program of programs) {
      const isPreschoolOrChildCareProgram = ['upk', 'dpp', 'chs', 'cccap'].includes(program.short_name);

      //add this category to the categoryValues dictionary if the key doesn't already exist
      if (categoryValues[program.category.default_message] === undefined) {
        categoryValues[program.category.default_message] = 0;
      }

      const hasOverlap = program.legal_status_required.some((status) => {
        return filt.citizen.value.includes(status);
      });

      if (hasOverlap) {
        //we add that program's est value to its corresponding categoryValues key
        categoryValues[program.category.default_message] += program.estimated_value;

        //if the program is in the preschoolProgramCategory, we also add it to the childCareTotalEstVal or youthAndEducationTotalEstVal separately
        if (isPreschoolOrChildCareProgram) {
          childCareTotalEstVal += program.estimated_value;
        } else if (
          program.category.default_message === childCareYouthAndEducationCategoryString &&
          isPreschoolOrChildCareProgram === false
        ) {
          youthAndEducationTotalEstVal += program.estimated_value;
        }
      }
    }

    if (childCareTotalEstVal > 8640) {
      childCareTotalEstVal = 8640;
    }

    categoryValues[childCareYouthAndEducationCategoryString] = childCareTotalEstVal + youthAndEducationTotalEstVal;

    return categoryValues;
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
                      <FormattedMessage id="navigator.linkLabel" defaultMessage="Link: " />
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
                      <FormattedMessage id="navigator.emailLabel" defaultMessage="Email: " />
                      <span className="navigator-info">
                        <FormattedMessage defaultMessage={navigator.email.default_message} id={navigator.email.label} />
                      </span>
                    </h4>
                  )}
                  {navigator.phone_number && (
                    <h4 className="font-weight">
                      <FormattedMessage id="navigator.phoneLabel" defaultMessage="Phone Number: " />
                      <span className="navigator-info">{formatPhoneNumber(navigator.phone_number)}</span>
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
    if (citizenshipRowCount === 0) {
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
          <BrandedResultsHeader
            programCount={citizenshipRowCount}
            programsValue={totalCitizenshipDollarValue.cashOrReducedExpenses}
            taxCreditsValue={totalCitizenshipDollarValue.taxCredits}
          />
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
    citizenship: string[];
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
        citizenship: [],
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
              <Button className="apply-button" variant="contained">
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
      {
        field: 'citizenship',
        headerName: 'Citizenship Requirements',
        flex: 1,
        filterOperators: citizenshipFilterOperators,
      },
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
        align: 'right' as GridAlignment,
        renderCell: (params: GridRenderCellParams) => (
          <CustomDetailPanelToggle {...params} id={params.id} field={params.field} rowNode={params.rowNode} />
        ),
      },
    ];

    const categories = programs.reduce((acc: { defaultMessage: string; label: string }[], benefit) => {
      if (!acc.some((category) => category.defaultMessage === benefit.category.default_message)) {
        acc = [...acc, { defaultMessage: benefit.category.default_message, label: benefit.category.label }];
      }
      return acc;
    }, []);

    const CustomDetailPanelToggle = (props: GridRenderCellParams) => {
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
        // @ts-ignore
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

    const currentCategory = categories.find((cat) => {
      if (filt.category === false) {
        return false;
      }

      return cat.defaultMessage === filt.category.value;
    });

    return (
      <>
        <div className="filters-container">
          {
            <FilterSection
              updateFilter={updateFilter}
              categories={categories}
              citizenshipFilterIsChecked={citizenshipFilterIsChecked}
              setCitizenshipFilterIsChecked={setCitizenshipFilterIsChecked}
              categoryState={categoryState}
              eligibilityState={eligibilityState}
              alreadyHasToggleState={alreadyHasToggleState}
            />
          }
        </div>
        {currentCategory && (
          <>
            <Toolbar sx={{ border: 1, backgroundColor: theme.primaryColor, color: 'white' }}>
              <span className="space-around border-right">
                <FormattedMessage id={currentCategory.label} defaultMessage={currentCategory.defaultMessage} />
              </span>
              <span className="space-around">
                ${totalVisibleRowDollarValue.toLocaleString()}{' '}
                <FormattedMessage id="results.perYear" defaultMessage="Per Year" />
              </span>
            </Toolbar>
            {currentCategory.defaultMessage ===
              categories.find((cat) => cat.defaultMessage === childCareYouthAndEducationCategoryString)
                ?.defaultMessage && (
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
            '& .MuiDataGrid-main > div:nth-of-type(1)': {
              //allows the link in the NoResultsOverlay to be clickable
              zIndex: 999,
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
          apiRef={apiRef}
          components={{ NoResultsOverlay: NoResultsTable }} //fixes filters disappearing when there are no results
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
        <Grid container item xs={12}>
          {displaySubheader()}
        </Grid>
        <Grid xs={12} item={true}>
          <h2 className="results-instuctions">
            <FormattedMessage
              id="results.instructions"
              defaultMessage="For more information on each benefit, click the arrow to expand for details. To send a copy of your results
            to yourself and/or a navigator, click"
            />{' '}
            <button
              className="open-share-button"
              type="button"
              onClick={(event) => {
                event.preventDefault();
                setSendResultsOpen(true);
              }}
            >
              <FormattedMessage id="results.openSendResultsButton" defaultMessage="here" />
            </button>
            .
          </h2>
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

  return (
    <main className="benefits-form">
      <div className="results-container">
        <Grid container spacing={2}>
          {results.loadingState === 'loading' && <Loading />}
          {results.loadingState === 'error' && <ResultsError />}
          {results.loadingState === 'done' && (
            <>
              {displayHeaderSection()}
              {results.missingPrograms && formData.immutableReferrer === 'lgs' && <BackToScreen />}
              <Grid xs={12} item={true}>
                {displayBenefitAndImmedNeedsBtns()}
                {filterResultsButton === 'benefits' && DataGridTable(results.programs)}
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
              <Grid xs={12} item={true}>
                <FormattedMessage id="results.return-screenerIdLabel" defaultMessage="Screener ID: " />
                {results.screenerId}
              </Grid>
            </>
          )}
        </Grid>
      </div>
      {screenerId && (
        <Modal
          open={sendResultsOpen}
          onClose={() => {
            setSendResultsOpen(false);
          }}
          aria-labelledby="email-results-modal"
        >
          <EmailResults
            handleTextfieldChange={handleTextFieldChange}
            screenId={screenerId}
            close={() => {
              setSendResultsOpen(false);
            }}
          />
        </Modal>
      )}
    </main>
  );
};

export default Results;
