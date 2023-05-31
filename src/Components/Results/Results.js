import { useEffect, useState, useContext, useRef } from 'react';
import { Context } from '../Wrapper/Wrapper';
import { useNavigate, useParams } from 'react-router-dom';
import { FormattedMessage, useIntl } from 'react-intl';
import { Button, Link, Typography, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import FilterTable from '../FilterTable/FilterTable.js';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CloseIcon from '@mui/icons-material/Close';
import Grid from '@mui/material/Grid';
import {
  DataGridPro,
  useGridSelector,
  useGridApiContext,
  gridFilteredDescendantCountLookupSelector,
  GridLinkOperator,
} from '@mui/x-data-grid-pro';
import Box from '@mui/material/Box';
import Loading from '../Loading/Loading';
import ResultsError from '../ResultsError/ResultsError';
import Toolbar from '@mui/material/Toolbar';
import ReactGA from 'react-ga';
import UrgentNeedsTable from '../UrgentNeedsTable/UrgentNeedsTable';
import { getEligibility } from '../../apiCalls';
import './Results.css';

export const isNavigationKey = (key) =>
  key === 'Home' || key === 'End' || key.indexOf('Arrow') === 0 || key.indexOf('Page') === 0 || key === ' ';

const Results = () => {
  const { uuid: screenerId } = useParams();
  const navigate = useNavigate();
  const locale = useContext(Context).locale;
  const intl = useIntl();
  const [filterResultsButton, setFilterResultsButton] = useState('benefits');
  const citizenToggleState = useState(false);
  const alreadyHasToggleState = useState(false);
  const eligibilityState = useState('eligibleBenefits');
  const categoryState = useState('All Categories');

  const initialResults = {
    programs: [],
    rawResponse: {},
    screenerId: 0,
    loadingState: 'loading',
  };

  const [results, setResults] = useState(initialResults);

  const [filt, setFilt] = useState({
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
    filtList: function () {
      const filters = [this.citizen, this.eligible];
      if (this.hasBenefit !== false) {
        filters.push(this.hasBenefit);
      }
      if (this.category !== false) {
        filters.push(this.category);
      }
      return filters;
    },
  });

  const updateFilter = function () {
    const newFilter = { ...filt };
    for (let i = 0; i < arguments.length; i++) {
      let filter = arguments[i];
      newFilter[filter.name] = filter.filter;
    }
    setFilt(newFilter);
  };

  useEffect(() => {
    fetchResults();
  }, []);

  const firstUpdate = useRef(true);
  useEffect(() => {
    if (!firstUpdate.current) {
      responseLanguage();
      updateFilter({ name: 'category', filter: false });
      categoryState[1]('All Categories'); //this resets the category filter when user selects a diff lang.
      //Otherwise it'll look for that literal category str and throw an err b/c it won't find it in that exact lang.
    } else {
      firstUpdate.current = false;
    }
  }, [locale, results.rawResponse]);

  const fetchResults = async () => {
    let rawEligibilityResponse;
    try {
      rawEligibilityResponse = await getEligibility(screenerId, locale);
    } catch (error) {
      setResults({
        ...results,
        loadingState: 'error',
      });
    }
    setResults({
      programs: [],
      rawResponse: rawEligibilityResponse,
      screenerId: rawEligibilityResponse.screen_id,
    });
  };

  const responseLanguage = () => {
    const { rawResponse } = results;
    if (rawResponse.programs === undefined) {
      return;
    }
    const languageCode = locale.toLowerCase();
    const eligibilityResponse = rawResponse.programs[languageCode];
    const programs = eligibilityResponse.sort(
      (benefitA, benefitB) => benefitB.estimated_value - benefitA.estimated_value,
    );

    setResults({
      ...results,
      programs: programs,
      loadingState: 'done',
    });
  };

  const categoryValues = (results) => {
    const preschoolPrograms = {
      'Cuidado de Niños, Preescolar y Jóvenes': [0, 0],
      'Child Care, Preschool, and Youth': [0, 0],
      'Chăm Sóc Trẻ Em, Trẻ Mầm Non và Thanh Thiếu Niên': [0, 0],
    };
    const categoryValues = {};
    for (let result of results) {
      if (categoryValues[result.category] === undefined) {
        categoryValues[result.category] = 0;
      }
      if (filt.citizen.value.includes(result.legal_status_required)) {
        categoryValues[result.category] += result.estimated_value;
        if (Object.keys(preschoolPrograms).includes(result.category)) {
          preschoolPrograms[result.category][0]++;
          preschoolPrograms[result.category][1] += result.estimated_value;
        }
      }
    }

    for (const category in preschoolPrograms) {
      if (!Object.keys(preschoolPrograms).includes(category)) continue;
      if (preschoolPrograms[category][1] > 8640 && preschoolPrograms[category][0] > 1) {
        categoryValues[category] = 8640;
      }
    }

    return categoryValues;
  };

  const totalDollarAmount = (results, category) => {
    const valuesByCategory = categoryValues(results);
    if (category) {
      return valuesByCategory[category];
    }
    let total = 0;
    for (let name in valuesByCategory) {
      total += valuesByCategory[name];
    }
    return total;
  };

  const totalEligiblePrograms = (results) => {
    return results.reduce((total, program) => {
      if (program.estimated_value <= 0) return total;
      if (filt.citizen.value.includes('non-citizen') && program.legal_status_required !== 'citizen') {
        total += 1;
      } else if (filt.citizen.value.includes('citizen') && program.legal_status_required !== 'non-citizen') {
        total += 1;
      }
      return total;
    }, 0);
  };

  const displayTestResults = (tests) => {
    if (tests.length) {
      return (
        <>
          {tests.map((testResult) => {
            return <li key={testResult}>{testResult}</li>;
          })}
        </>
      );
    }
  };

  const formatPhoneNumber = (phoneNumberString) => {
    const cleaned = ('' + phoneNumberString).replace(/\D/g, '');
    const match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      const intlCode = match[1] ? '+1 ' : '';
      return [intlCode, '(', match[2], ') ', match[3], '-', match[4]].join('');
    }
  };

  const displayNavigators = (navigators) => {
    if (navigators.length) {
      return (
        <>
          {navigators
            .map((navigator) => {
              return (
                <div className="navigator-container" key={navigator.name}>
                  <h2 className="navigator-header">{navigator.name}</h2>
                  <p className="navigator-desc">{navigator.description}</p>
                  {navigator.assistance_link && (
                    <h4 className="font-weight">
                      Link:{' '}
                      <ReactGA.OutboundLink
                        className="ineligibility-link navigator-info"
                        eventLabel={`Apply With Assistance for ${navigator.name}`}
                        to={navigator.assistance_link}
                        target="_blank"
                        trackerNames={['main']}
                      >
                        {navigator.assistance_link}
                      </ReactGA.OutboundLink>
                    </h4>
                  )}
                  {navigator.email && (
                    <h4 className="font-weight">
                      Email: <span className="navigator-info">{navigator.email}</span>
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
            .reduce((accu, elem) => {
              //https://stackoverflow.com/questions/34034038/how-to-render-react-components-by-using-map-and-join/35840806#35840806
              return accu === null ? [elem] : [...accu, <hr className="line-seperator" key="hr"></hr>, elem];
            }, null)}
        </>
      );
    }
  };

  const displaySubheader = () => {
    return (
      <>
        <Grid xs={12} item>
          <h1 className="bottom-border program-value-header">
            {totalEligiblePrograms(results.programs)}
            <FormattedMessage id="results.return-programsUpToLabel" defaultMessage=" programs, up to " />$
            {totalDollarAmount(results.programs).toLocaleString()}
            <FormattedMessage id="results.return-perYearOrLabel" defaultMessage=" per year or " />$
            {Math.round(totalDollarAmount(results.programs) / 12).toLocaleString()}
            <FormattedMessage
              id="results.return-perMonthLabel"
              defaultMessage=" per month in cash or reduced expenses for you to consider"
            />
          </h1>
        </Grid>
      </>
    );
  };

  const DataGridRows = (results) => {
    let dgr = [];
    let count = 0;
    for (let i = 0; i < results.length; i++) {
      let dataGridRow = {
        id: count,
        path: [results[i].name],
        name: results[i].name,
        has_benefit: results[i].already_has,
        value: results[i].estimated_value,
        type: results[i].value_type,
        description: results[i].description,
        application_time: results[i].estimated_application_time,
        delivery_time: results[i].estimated_delivery_time,
        application_link: results[i].apply_button_link,
        passed_tests: results[i].passed_tests,
        failed_tests: results[i].failed_tests,
        category: results[i].category,
        navigators: results[i].navigators,
        citizenship: results[i].legal_status_required,
        eligible: results[i].eligible,
      };
      dgr.push(dataGridRow);
      count++;
      let dataGridChild = {
        id: count,
        path: [results[i].name, 'Detail'],
        name: results[i].name,
        value: '',
        type: '',
        application_time: '',
        delivery_time: results[i].estimated_delivery_time,
        description: results[i].description,
        citizenship: '',
        application_link: results[i].apply_button_link,
        passed_tests: results[i].passed_tests,
        failed_tests: results[i].failed_tests,
        category: results[i].category,
        navigators: results[i].navigators,
      };
      dgr.push(dataGridChild);
      count++;
    }
    return dgr;
  };

  const CustomGridTreeDataGroupingCell = (props) => {
    const { id, field, rowNode } = props;
    const apiRef = useGridApiContext();
    const filteredDescendantCountLookup = useGridSelector(apiRef, gridFilteredDescendantCountLookupSelector);
    const [navListOpen, setNavListOpen] = useState(false);
    const openNavList = () => {
      setNavListOpen(!navListOpen);
    };

    const handleKeyDown = (event) => {
      if (event.key === ' ') {
        event.stopPropagation();
      }
      if (isNavigationKey(event.key) && !event.shiftKey) {
        apiRef.current.publishEvent('cellNavigationKeyDown', props, event);
      }
    };

    const handleClick = (event) => {
      apiRef.current.setRowChildrenExpansion(id, !rowNode.childrenExpanded);
      apiRef.current.setCellFocus(id, field);
      event.stopPropagation();
    };

    let row = apiRef.current.getRow(id);
    const filteredDescendantCount = filteredDescendantCountLookup[rowNode.id] ?? 0;

    return (
      <div>
        {filteredDescendantCount > 0 ? (
          <Link onClick={handleClick} onKeyDown={handleKeyDown} tabIndex={-1}>
            {row.name}
          </Link>
        ) : (
          <Box sx={{ padding: 1 }}>
            <Typography variant="body1" gutterBottom>
              {row.description}
            </Typography>
            <Typography variant="body1" sx={{ fontStyle: 'italic', marginBottom: 2 }}>
              <FormattedMessage
                id="results.return-estimatedDeliveryTimeA"
                defaultMessage="*On average people who are approved for this benefit start receiving it "
              />
              {row.delivery_time}
              <FormattedMessage
                id="results.return-estimatedDeliveryTimeB"
                defaultMessage=" after completing the application."
              />
            </Typography>
            <ReactGA.OutboundLink
              eventLabel={`Apply to ${row.name}`}
              to={row.application_link}
              target="_blank"
              trackerNames={['main']}
            >
              <Button className="apply-button">
                <FormattedMessage id="results.resultsRow-applyButton" defaultMessage="Apply" />
              </Button>
            </ReactGA.OutboundLink>
            {row.navigators.length > 0 && (
              <Button variant="contained" target="_blank" onClick={openNavList} sx={{ marginLeft: '5px' }}>
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
    headerName: 'Benefit',
    flex: 1,
    colSpan: ({ row }) => {
      if (row.path.indexOf('Detail') !== -1) {
        return 4;
      } else {
        return 1;
      }
    },
    renderCell: (params) => <CustomGridTreeDataGroupingCell {...params} />,
  };

  const DataGridTable = (results) => {
    const rows = DataGridRows(results);

    const nameHeader = intl.formatMessage({
      id: 'results.resultsTable-timeToApply',
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
      { field: 'application_time', headerName: appTimeHeader, flex: 1 },
      { field: 'delivery_time', headerName: 'Delivery Time', flex: 1 },
      { field: 'citizenship', headerName: 'Citizenship Requirements', flex: 1 },
      { field: 'application_link', headerName: 'Application Link', flex: 1 },
      { field: 'passed_tests', headerName: 'Passed Tests', flex: 1 },
      { field: 'failed_tests', headerName: 'Passed Tests', flex: 1 },
      { field: 'eligible', headerName: 'Eligible', flex: 1, type: 'boolean' },
      { field: 'has_benefit', headerName: 'Has Benefit', flex: 1, type: 'boolean' },
      { field: 'category', headerName: 'Category', flex: 1 },
    ];

    const categories = results.reduce((acc, benefit) => {
      if (!acc.includes(benefit.category)) {
        acc = [...acc, benefit.category];
      }
      return acc;
    }, []);

    return (
      <>
        <div className="filters-container">
          {displayBenefitAndImmedNeedsBtns()}
          <FilterTable
            filt={filt}
            updateFilter={updateFilter}
            categories={categories}
            eligibilityState={eligibilityState}
            categoryState={categoryState}
            citizenToggleState={citizenToggleState}
            alreadyHasToggleState={alreadyHasToggleState}
          />
        </div>
        {filt.category !== false && (
          <>
            <Toolbar sx={{ border: 1, backgroundColor: '#037A93', color: 'white' }}>
              <span className="space-around border-right">{filt.category.value}</span>
              <span className="space-around">
                ${totalDollarAmount(results, filt.category.value).toLocaleString()}{' '}
                <FormattedMessage id="results.perYear" defaultMessage="Per Year" />
              </span>
            </Toolbar>
            {(filt.category.value === 'Child Care, Preschool, and Youth' ||
              filt.category.value === 'Cuidado de Niños, Preescolar y Jóvenes') && (
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
            items: filt.filtList(),
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

  const benefitValueFormatter = (params) => {
    let formatted_value = '';
    if (params.value.toLocaleString().length > 0) {
      formatted_value = '$' + params.value.toLocaleString();
    }

    return formatted_value;
  };

  const benefitValueRender = (params) => {
    let row = params.api.getRow(params.id);
    let formatted_value = '';

    if (params.value.toLocaleString().length > 0) {
      formatted_value = '$' + params.value.toLocaleString();
    }

    return (
      <div>
        {formatted_value}
        <Typography variant="body2" sx={{ fontStyle: 'italic' }}>
          {row.type}
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
    const immediateNeedsBtnClass = filterResultsButton === 'urgentNeeds' ? 'results-link' : 'results-filter-button-grey';

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
              <Grid xs={12} item={true}>
                {filterResultsButton === 'benefits' && DataGridTable(results.programs)}
                {filterResultsButton === 'urgentNeeds' && displayBenefitAndImmedNeedsBtns()}
                {filterResultsButton === 'urgentNeeds' && (
                  <UrgentNeedsTable urgentNeedsPrograms={results.rawResponse.urgent_needs} locale={locale} />
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
