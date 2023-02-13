import { useEffect, useState, Fragment, useContext, useRef } from 'react';
import { Context } from '../Wrapper/Wrapper';
import { useNavigate } from 'react-router-dom';
import { FormattedMessage, useIntl } from 'react-intl';
import { Button, FormControlLabel, Link, Typography, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import Filter from '../FilterTable/FilterTable.js'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';
import Grid from '@mui/material/Grid';
import {
	DataGridPro,
	GridRowsProp,
	DataGridProProps,
	useGridSelector,
	useGridApiContext,
	gridFilteredDescendantCountLookupSelector,
	GridLinkOperator,
} from '@mui/x-data-grid-pro';
import Box from '@mui/material/Box';
import Loading from '../Loading/Loading';
import CustomSwitch from '../CustomSwitch/CustomSwitch';
import Table from '../Table/Table';
import Toolbar from '@mui/material/Toolbar';
import UrgentNeedsTable from '../UrgentNeedsTable/UrgentNeedsTable';
import {
  postPartialParentScreen,
  postHouseholdMemberData,
  postHouseholdMemberIncomeStream,
  postHouseholdMemberExpense,
  getEligibility,
  postUser
} from '../../apiCalls';
import './Results.css';

export const isNavigationKey = (key) =>
  key === 'Home' ||
  key === 'End' ||
  key.indexOf('Arrow') === 0 ||
  key.indexOf('Page') === 0 ||
  key === ' ';

const Results = ({ results, setResults, formData}) => {
  const navigate = useNavigate();
  const locale = useContext(Context).locale;
  const intl = useIntl();
  const [filterResultsButton, setFilterResultsButton] = useState('benefits');
  const citizenToggleState = useState(false)
	const eligibilityState = useState('eligibleBenefits');
	const categoryState = useState('All Categories');

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
    filtList: function() {
      const filters = [
        this.citizen,
        this.eligible,
      ]
      if (this.hasBenefit !== false) {
        filters.push(this.hasBenefit)
      }
      if (this.category !== false) {
        filters.push(this.category);
      }
      return filters
    }
	});

  const updateFilter = function() {
    const newFilter = { ...filt };
    for (let i=0; i<arguments.length; i++) {
      let filter = arguments[i]
      newFilter[filter.name] = filter.filter
    }
    setFilt(newFilter)
  }

  useEffect(() => {
    if (results.screenerId === 0) {
      fetchResults();
    }
  }, []);

  const firstUpdate = useRef(true);
  useEffect(() => {
    if (!firstUpdate.current) {
      responseLanguage();
    } else {
      firstUpdate.current = false;
    }
  }, [locale, results.rawResponse])

  const fetchResults = async () => {
    let userId = 0 ;

    if (formData.signUpInfo.sendOffers || formData.signUpInfo.sendUpdates) {
      userId = await postUserSignUpInfo();
    }

    const screensBody = getScreensBody(formData, locale.toLowerCase(), userId);
    const screensResponse = await postPartialParentScreen(screensBody);
    const householdMembersBodies = getHouseholdMembersBodies(formData, screensResponse.id);
    for (const householdMembersBody of householdMembersBodies) {
      const householdMembersResponse = await postHouseholdMemberData(householdMembersBody);

      const incomeStreamsBodies = getIncomeStreamsBodies(householdMembersBody, householdMembersResponse.id);
      for (const incomeStreamsBody of incomeStreamsBodies) {
        await postHouseholdMemberIncomeStream(incomeStreamsBody);
      }

      const expensesBodies = getExpensesBodies(householdMembersBody, householdMembersResponse.id);
      for (const expensesBody of expensesBodies) {
        await postHouseholdMemberExpense(expensesBody);
      }
    }

    const rawEligibilityResponse = await getEligibility(screensResponse.id, locale);
    setResults({
			programs: [],
			rawResponse: rawEligibilityResponse,
			screenerId: screensResponse.id,
			isLoading: true,
			user: userId
		});
  }

  const responseLanguage = () => {
    const { rawResponse } = results;
		const languageCode = locale.toLowerCase();
		const eligibilityResponse = rawResponse.programs[languageCode];
		const programs = eligibilityResponse
			.sort(
				(benefitA, benefitB) => benefitB.estimated_value - benefitA.estimated_value
			);
    
		setResults({
      ...results,
			programs: programs,
			isLoading: false
    });
	};

  const categoryValues = (results) => {
		const categoryValues = {};
		for (let result of results) {
      if (categoryValues[result.category] === undefined) {
        categoryValues[result.category] = 0
      }
      if (filt.citizen.value.includes(result.legal_status_required)) {
				categoryValues[result.category] += result.estimated_value;
			}
		}
		if (categoryValues['Child Care, Preschool, and Youth'] > 720) {
			categoryValues['Child Care, Preschool, and Youth'] = 720;
		}
		return categoryValues;
	};

  const totalDollarAmount = (results, category) => {
    const valuesByCategory = categoryValues(results)
    if (category) {
      return valuesByCategory[category]
    }
    let total = 0;
    for (let name in valuesByCategory) {
      total += valuesByCategory[name]
    }
    return total
  }

  const getScreensBody = (formData, languageCode, userId) => {
    const { agreeToTermsOfService, zipcode, county, householdSize, householdAssets,
      startTime, isTest, externalID, lastTaxFilingYear, benefits, healthInsurance,
      referralSource, referrerCode, otherSource, acuteHHConditions } = formData;
    const finalReferralSource = otherSource !== '' ? otherSource : referralSource;

    const screenBody = {
      is_test: isTest,
      external_id: externalID,
      agree_to_tos: agreeToTermsOfService,
      zipcode: zipcode,
      county: county,
      start_date: startTime,
      household_size: householdSize,
      household_assets: householdAssets,
      last_tax_filing_year: lastTaxFilingYear,
      request_language_code: languageCode,
      has_acp: benefits.acp,
      has_ccb: benefits.ccb,
      has_cccap: benefits.cccap,
      has_chp: benefits.chp,
      has_coeitc: benefits.coeitc,
      has_ctc: benefits.ctc,
      has_eitc: benefits.eitc,
      has_lifeline: benefits.lifeline,
      has_medicaid: benefits.medicaid,
      has_mydenver: benefits.mydenver,
      has_nslp: benefits.nslp,
      has_rtdlive: benefits.rtdlive,
      has_snap: benefits.snap,
      has_tanf: benefits.tanf,
      has_wic: benefits.wic,
      has_employer_hi: healthInsurance.employer,
      has_private_hi: healthInsurance.private,
      has_medicaid_hi: healthInsurance.medicaid,
      has_medicare_hi: healthInsurance.medicare,
      has_chp_hi: healthInsurance.chp,
      has_no_hi: healthInsurance.none,
      referral_source: finalReferralSource,
      referrer_code: referrerCode,
      needs_food: acuteHHConditions.food,
      needs_baby_supplies: acuteHHConditions.babySupplies,
      needs_housing_help: acuteHHConditions.housing,
      needs_mental_health_help: acuteHHConditions.support,
      needs_child_dev_help: acuteHHConditions.childDevelopment,
      needs_funeral_help: acuteHHConditions.loss
    };

    if (userId !== 0 && userId !== false) {
      screenBody.user = userId;
    }

    return screenBody;
  };

  const getHouseholdMembersBodies = (formData, screensId) => {
    const headOfHousehold = getHouseholdMemberBody(formData, 'headOfHousehold', screensId);
    const otherHouseholdMembers = formData.householdData.map(otherMember => {
      return getHouseholdMemberBody(otherMember, otherMember.relationshipToHH, screensId);
    });
    return [headOfHousehold, ...otherHouseholdMembers];
  };

  const getHouseholdMemberBody = (formData, relationshipToHH, screensId) => {
    const { age, student, studentFulltime, pregnant, unemployed,
      unemployedWorkedInLast18Mos, blindOrVisuallyImpaired, disabled, veteran, medicaid,
      disabilityRelatedMedicaid, hasIncome, hasExpenses, incomeStreams, expenses } = formData;

    return {
      screen: screensId,
      relationship: relationshipToHH,
      age: Number(age),
      student: student,
      student_full_time: studentFulltime,
      pregnant: pregnant,
      unemployed: unemployed,
      worked_in_last_18_mos: unemployedWorkedInLast18Mos,
      visually_impaired: blindOrVisuallyImpaired,
      disabled: disabled,
      veteran: veteran,
      medicaid: medicaid,
      disability_medicaid: disabilityRelatedMedicaid,
      has_income: hasIncome,
      has_expenses: hasExpenses ? hasExpenses : false,
      income_streams: incomeStreams,
      expenses: expenses ? expenses : []
    };
  };

  const getIncomeStreamsBodies = (householdMemberBody, householdMemberId) => {
    return householdMemberBody.income_streams.map(incomeStream => {
      return {
        type: incomeStream.incomeStreamName,
        amount: incomeStream.incomeAmount,
        frequency: incomeStream.incomeFrequency,
        screen: householdMemberBody.screen,
        household_member: householdMemberId
      };
    });
  }

  const getExpensesBodies = (householdMemberBody, householdMemberId) => {
    return householdMemberBody.expenses.map(expense => {
      return {
        type: expense.expenseSourceName,
        amount: expense.expenseAmount,
        frequency: 'monthly',
        screen: householdMemberBody.screen,
        household_member: householdMemberId
      };
    });
  }

  const postUserSignUpInfo = async () => {
    const { email, phone, firstName, lastName,
      sendUpdates, sendOffers, commConsent } = formData.signUpInfo;
    const lowerCaseLocale = locale.toLowerCase();
    const phoneNumber = '+1' + phone;

    const user = {
      email_or_cell: email ? email : phoneNumber,
      cell: phone ? phoneNumber : '',
      email: email ? email : '',
      first_name: firstName,
      last_name: lastName,
      tcpa_consent: commConsent,
      language_code: lowerCaseLocale,
      send_offers: sendOffers,
      send_updates: sendUpdates
    };

    try {
      const userSignUpResponse = await postUser(user); //this should return what's on the swagger docs
      return userSignUpResponse.id;
    } catch {
      return false;
    }
  }

  const totalEligiblePrograms = (results) => {
    return results.reduce((total, program) => {
      if (program.estimated_value <= 0) return total
      if (filt.citizen.value.includes('non-citizen') && program.legal_status_required !== 'citizen') {
        total += 1;
      } else if (filt.citizen.value.includes('citizen') && program.legal_status_required !== 'non-citizen'){
        total += 1;
      }
      return total;
    }, 0);
  }

  const displayTestResults = (tests) => {
    if (tests.length) {
      return (
        <>
          { tests.map(testResult => {
              return <li key={testResult}>{testResult}</li>
            })
          }
        </>
      );
    }
  }

  const formatPhoneNumber = (phoneNumberString) => {
    const cleaned = ('' + phoneNumberString).replace(/\D/g, '');
    const match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      const intlCode = match[1] ? '+1 ' : '';
      return [intlCode, '(', match[2], ') ', match[3], '-', match[4]].join('');
    }
  }

  const displayNavigators = (navigators) => {
    if (navigators.length) {
      return (
        <>
          { navigators.map(navigator => {
            return (
							<div className='navigator-container' key={navigator.name}>
								<h2 className='navigator-header'>{navigator.name}</h2>
								<p className='navigator-desc'>{navigator.description}</p>
								{navigator.assistance_link && (
									<h4 className='font-weight'>
										Link:{' '}
										<a
											href={navigator.assistance_link}
											className='ineligibility-link navigator-info'
										>
											{navigator.assistance_link}
										</a>
									</h4>
								)}
								{navigator.email && <h4 className='font-weight'>Email: <span className="navigator-info">{navigator.email}</span></h4>}
								{navigator.phone_number && (
									<h4 className='font-weight'>
										Phone Number: <span className="navigator-info">{formatPhoneNumber(navigator.phone_number)}</span>
									</h4>
								)}
							</div>
						);
          }).reduce((accu, elem) => {
						//https://stackoverflow.com/questions/34034038/how-to-render-react-components-by-using-map-and-join/35840806#35840806
						return accu === null ? [elem] : [...accu, <hr className='line-seperator'></hr>, elem];
					}, null)}
        </>
      );
    }
  }

  const displaySubheader = () => {
    return (
      <>
        <Grid xs={12} item={true}>
          <Typography className='sub-header' variant='h6'> 
            {totalEligiblePrograms(results.programs)} 
            <FormattedMessage 
              id='results.return-programsUpToLabel' 
              defaultMessage=' programs, up to ' /> 
            ${totalDollarAmount(results.programs).toLocaleString()} 
            <FormattedMessage 
              id='results.return-perYearOrLabel' 
              defaultMessage=' per year or ' />
            ${Math.round(totalDollarAmount(results.programs)/12).toLocaleString()} 
            <FormattedMessage 
              id='results.return-perMonthLabel' 
              defaultMessage=' per month for you to consider' />
          </Typography>
        </Grid>
      </>
    );
  }

  const displayFooter = () => {
    return (
      <>
        <Grid container xs={12} item={true} sx={{mt: 2}} >
          <Grid sm={10} item={true}>
            <Typography variant='body1' sx={{mt: 2}} className='remember-disclaimer-label'>
              <FormattedMessage 
                id='results.displaySubheader-emailResultsDescText' 
                defaultMessage='To receive a copy of these results by email please click the email results button.' />
            </Typography>
          </Grid>
          <Grid xs={12} item={true} sm={2} justifyContent='end'>
            <Box justifyContent='end' display='flex'>
              <Button
                sx={{mb: 2, mt: 1}}
                variant='contained'
                endIcon={<SendIcon />}
                onClick={() => {
                  navigate('/email-results');
                }}
                className='results-link'>
                <FormattedMessage 
                  id='results.return-emailResultsButton' 
                  defaultMessage='Email Results' />
              </Button>
            </Box>
          </Grid>
        </Grid>
      </>
    );
  }

  const DataGridRows = (results) => {
    let dgr = [];
    let count = 0;
    for (let i = 0; i < results.length; i++) {
      let dataGridRow = {
				id: count,
				path: results[i].name,
				name: results[i].name,
				has_benefit: formData.benefits[results[i].name_abbreviated],
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
        path: results[i].name + '/Detail',
        name: results[i].description,
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
      }
      dgr.push(dataGridChild);
      count++;
    }
    return dgr;
  }

  const CustomGridTreeDataGroupingCell = (props: GridRenderCellParams) => {
    const { id, field, rowNode } = props;
    const apiRef = useGridApiContext();
    const filteredDescendantCountLookup = useGridSelector(
      apiRef,
      gridFilteredDescendantCountLookupSelector,
    );
    const [navListOpen, setNavListOpen] = useState(false)
    const openNaveList = () => {setNavListOpen(!navListOpen)}

    const handleKeyDown: ButtonProps['onKeyDown'] = (event) => {
      if (event.key === ' ') {
        event.stopPropagation();
      }
      if (isNavigationKey(event.key) && !event.shiftKey) {
        apiRef.current.publishEvent('cellNavigationKeyDown', props, event);
      }
    };

    const handleClick: ButtonProps['onClick'] = (event) => {
      apiRef.current.setRowChildrenExpansion(id, !rowNode.childrenExpanded);
      apiRef.current.setCellFocus(id, field);
      event.stopPropagation();
    };

    let row = apiRef.current.getRow(id);
    const filteredDescendantCount = filteredDescendantCountLookup[rowNode.id] ?? 0;

    return (
      <div>
        {filteredDescendantCount > 0 ? (
          <Link
            onClick={handleClick}
            onKeyDown={handleKeyDown}
            tabIndex={-1}
          >
            {row.name}
          </Link>
        ) : (
          <Box sx={{ padding: 1 }}>
          <Typography variant='body1' gutterBottom>
            {row.description}
          </Typography>
          <Typography variant='body1' sx={{ fontStyle: 'italic', marginBottom: 2 }}>
            <FormattedMessage
              id='results.return-estimatedDeliveryTimeA'
              defaultMessage='*On average people who are approved for this benefit start receiving it ' />
            {row.delivery_time}
            <FormattedMessage
              id='results.return-estimatedDeliveryTimeB'
              defaultMessage=' after completing the application.' />
          </Typography>
          <Button
            variant='contained'
            target='_blank'
            href={row.application_link}>
            <FormattedMessage
              id='results.resultsRow-applyButton'
              defaultMessage='Apply' />
          </Button>
        { (row.navigators.length > 0)  &&
          <Button
            variant='contained'
            target='_blank'
            onClick={openNaveList}
            sx={{marginLeft: '5px'}}>
            <FormattedMessage
              id='results.resultsRow-applyWithAssistance'
              defaultMessage='Apply With Assistance' />
          </Button>
        }
        { (row.navigators.length > 0 && navListOpen)  &&
          <div className='navigator-list'>
            <CloseIcon onClick={openNaveList} className='top-right'/>
            { displayNavigators(row.navigators) }
          </div>
        }
          { (row.passed_tests.length > 0 || row.failed_tests.length > 0)  &&
            <Accordion sx={{ m: 2 }}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls='panel1a-content'
                id='panel1a-header'>
                  <Typography variant='body2'>
                    <Link>
                      <FormattedMessage
                        id='results.resultsRow-expandForEligibilityLink'
                        defaultMessage='Expand for eligibility details' />
                    </Link>
                  </Typography>
              </AccordionSummary>
              <AccordionDetails sx={{paddingTop: 0}}>
                { displayTestResults(row.passed_tests) }
                { displayTestResults(row.failed_tests) }
              </AccordionDetails>
            </Accordion>
          }
        </Box>
        )}
      </div>
    );
  }

  const groupingColDef: DataGridProProps['groupingColDef'] = {
    headerName: 'Benefit',
    flex: 1,
    colSpan: ({ row }) => {
      if (row.path.indexOf('Detail') !== -1) {
        return 4;
      }
      else {
        return 1;
      }
    },
    renderCell: (params) => <CustomGridTreeDataGroupingCell {...params} />
  };

  const DataGridTable = (results) => {
    const rows: GridRowsProp = DataGridRows(results);

    const nameHeader = intl.formatMessage({
			id: 'results.resultsTable-timeToApply',
      defaultMessage: 'Benefit'
		});
    const valueHeader = intl.formatMessage({
      id: 'results.resultsTable-annualValueLabel',
      defaultMessage: 'Annual Value'
    })
    const appTimeHeader = intl.formatMessage({
      id: 'results.resultsTable-timeToApply',
      defaultMessage: 'Time to Apply'
    })

    const columns: GridColDef[] = [
      { field: 'name', headerName: nameHeader, flex: 1 },
      { field: 'value', headerName: valueHeader, flex: 1, valueFormatter: benefitValueFormatter, renderCell: benefitValueRender },
      { field: 'type', headerName: 'Type', flex: 1 },
      { field: 'application_time', headerName: appTimeHeader, flex: 1 },
      { field: 'delivery_time', headerName: 'Delivery Time', flex: 1 },
      { field: 'citizenship', headerName: 'Citizenship Requirements', flex: 1 },
      { field: 'application_link', headerName: 'Application Link', flex: 1 },
      { field: 'passed_tests', headerName: 'Passed Tests', flex: 1 },
      { field: 'failed_tests', headerName: 'Passed Tests', flex: 1 },
      { field: 'eligible', headerName: 'Eligible', flex: 1, 'type': 'boolean' },
      { field: 'has_benefit', headerName: 'Has Benefit', flex: 1, 'type': 'boolean' },
      { field: 'category', headerName: 'Category', flex: 1 },
    ];

    const allCategories = () => {
      return results.reduce((acc, benefit) => {
        if (!acc.includes(benefit.category)) {
          acc = [...acc, benefit.category];
        }
        return acc
      }, []);
    }

    return (
			<>
				<Filter
					filt={filt}
					updateFilter={updateFilter}
					categories={allCategories()}
					eligibilityState={eligibilityState}
					categoryState={categoryState}
          citizenToggleState={citizenToggleState}
				/>
				{filt.category !== false && (
					<Toolbar
						sx={{ border: 1, backgroundColor: '#0096B0', color: 'white' }}
					>
						<span className="space-around border-right">
							{filt.category.value}
						</span>
						<span className="space-around">
							${totalDollarAmount(results, filt.category.value).toLocaleString()}{' '}
							<FormattedMessage
								id="results.perYear"
								defaultMessage="Per Year"
							/>
						</span>
					</Toolbar>
				)}
				<DataGridPro
					treeData
					autoHeight
					getTreeDataPath={(row) => row.path.split('/')}
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
  }

  const benefitValueFormatter = (params) => {
    let formatted_value = '';
    if (params.value.toLocaleString().length > 0) {
      formatted_value = '$' + params.value.toLocaleString();
    }

    return formatted_value;
  }

  const benefitValueRender = (params) => {
    let row = params.api.getRow(params.id);
    let formatted_value = '';

    if (params.value.toLocaleString().length > 0) {
      formatted_value = '$' + params.value.toLocaleString();
    }

    return (
      <div>
        {formatted_value}
        <Typography variant='body2' sx={{ fontStyle: 'italic' }}>
          {row.type}
        </Typography>
      </div>
    );
  }

  const displayHeaderSection = () => {
    return (
      <Grid container xs={12} item={true} sx={{mt: 2}} >
        <Grid xs={12} item={true}>
          <Typography className='body2'>
            <FormattedMessage 
              id='results.return-screenerIdLabel' 
              defaultMessage='Screener ID: ' /> 
            {results.screenerId}
          </Typography>
        </Grid>
        { displaySubheader() }
      </Grid>
    );
  }

  const displayResultsFilterButtons = () => {
    return (
      <div>
        <Button 
          className={ filterResultsButton === 'benefits' ? 'results-link' 
            : 'results-filter-button-grey' 
          }
          onClick={() => {
            setFilterResultsButton('benefits');
          }}
          sx={{mt: 1, mr: .5, mb: 1, p:.8, fontSize:'.8rem'}}
          variant='contained'
          >
          <FormattedMessage
            id='results.displayResultsFilterButtons-benefitPrograms'
            defaultMessage='Benefit Programs'
          />
        </Button>
        <Button 
          className={ filterResultsButton === 'urgentNeeds' ? 'results-link' 
            : 'results-filter-button-grey' 
          }
          onClick={() => {
            setFilterResultsButton('urgentNeeds');
          }}
          sx={{mt: 1, mb: 1, p:.8, fontSize:'.8rem',}}
          variant='contained'
          >
          <FormattedMessage
            id='results.displayResultsFilterButtons-urgentNeedsResources'
            defaultMessage='Immediate Needs'
          />
        </Button>
      </div>
    );
  }

  return (
    <main className='benefits-form'>
      <div className='results-container'>
        <Grid container spacing={2}>
          { results.isLoading ? <Loading /> : 
            <>
              { displayHeaderSection() }
              <Grid xs={12} item={true}>
                { displayResultsFilterButtons() }
                { filterResultsButton === 'benefits' && DataGridTable(results.programs)}
                { filterResultsButton === 'urgentNeeds' && 
                  <UrgentNeedsTable 
                    urgentNeedsPrograms={results.rawResponse.urgent_needs} 
                    locale={locale} 
                  /> 
                }
              </Grid>
              { displayFooter() }
            </>
          }
        </Grid>
      </div>
    </main>
  );
}

export default Results;
