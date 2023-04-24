import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getScreen } from '../../apiCalls';

const FetchScreen = ({ formData, setFormData, returnTo, setFetchedScreen }) => {
	const { uuid } = useParams();
	const navigate = useNavigate();

	const fetchScreen = async (uuid) => {
		try {
			const response = await getScreen(uuid);
			createFormData(response);
		} catch (err) {
			navigate('/step-0');
			return;
		}
		setFetchedScreen(true);
	};

	const createFormData = (response) => {
		const initialFormData = {
			screenUUID: response.uuid,
			isTest: response.is_test ?? false,
			externalID: response.external_id,
			agreeToTermsOfService: response.agree_to_tos ?? false,
			zipcode: response.zipcode ?? '',
			county: response.county ?? '',
			startTime: response.start_date ?? formData.startTime,
			has_expenses: false,
			expenses: [],
			householdSize: response.household_size ?? '',
			householdData: [],
			householdAssets: response.householdAssets ?? 0,
			lastTaxFilingYear: response.last_tax_filing_year ?? '',
			hasBenefits: response.has_benefits ?? false,
			benefits: {
				acp: response.has_acp ?? false,
				andcs: response.has_andcs ?? false,
				cccap: response.has_cccap ?? false,
				coeitc: response.has_coeitc ?? false,
				coheadstart: response.has_chs ?? false,
				coPropTaxRentHeatCreditRebate: response.has_cpcr ?? false,
				ctc: response.has_ctc ?? false,
				dentallowincseniors: response.has_cdhcs ?? false,
				denverpresc: response.has_dpp ?? false,
				ede: response.has_ede ?? false,
				eitc: response.has_eitc ?? false,
				erc: response.has_erc ?? false,
				familyplanning: response.has_fps ?? false,
				lifeline: response.has_lifeline ?? false,
				leap: response.has_leap ?? false,
				mydenver: response.has_mydenver ?? false,
				nslp: response.has_nslp ?? false,
				oap: response.has_oap ?? false,
				reproductivehealth: response.has_rhc ?? false,
				rtdlive: response.has_rtdlive ?? false,
				snap: response.has_snap ?? false,
				ssi: response.has_ssi ?? false,
				tanf: response.has_tanf ?? false,
				wic: response.has_wic ?? false,
			},
			healthInsurance: {
				employer: response.has_employer_hi ?? false,
				private: response.has_private_hi ?? false,
				medicaid: response.has_medicaid_hi ?? false,
				medicare: response.has_medicare_hi ?? false,
				chp: response.has_chp_hi ?? false,
				none: response.has_no_hi ?? false,
			},
			referralSource: response.referral_source,
			referrerCode: response.referrer_code,
			otherSource: response.referral_source ?? '',
			acuteHHConditions: {
				food: response.needs_food ?? false,
				babySupplies: response.needs_baby_supplies ?? false,
				housing: response.needs_housing_help ?? false,
				support: response.needs_mental_health_help ?? false,
				childDevelopment: response.needs_child_dev_help ?? false,
				loss: response.needs_funeral_help ?? false,
				familyPlanning: response.needs_family_planning_help ?? false,
			},
		};

		let defaultRelationship = 'headOfHousehold'
		for (const member of response.household_members) {
			const incomes = [];
			for (const income of member.income_streams) {
				incomes.push({
					incomeStreamName: income.type ?? '',
					incomeAmount: income.amount ?? '',
					incomeFrequency: income.frequency ?? '',
					hoursPerWeek: income.hours_worked ?? '',
				});
			}
			initialFormData.householdData.push({
				age: member.age ?? '',
				relationshipToHH: member.relationship ? member.relationship : defaultRelationship,
				student: response.student ?? false,
				studentFulltime: response.student_full_time ?? false,
				pregnant: response.pregnant ?? false,
				unemployed: response.unemployed ?? false,
				unemployedWorkedInLast18Mos: response.worked_in_last_18_mos ?? false,
				blindOrVisuallyImpaired: response.visually_impaired ?? false,
				disabled: response.disabled ?? false,
				veteran: response.veteran ?? false,
				hasIncome: response.has_income ?? false,
				incomeStreams: incomes,
			});
			defaultRelationship = ''
		}

		for (const expense of response.expenses) {
			console.log(expense);
			initialFormData.has_expenses = true;
			initialFormData.expenses.push({
				expenseSourceName: expense.type ?? '',
				expenseAmount: expense.amount ?? '',
			});
		}
		setFormData({ ...formData, ...initialFormData });
	};

	useEffect(() => {
		fetchScreen(uuid);
	}, []);

	return (
		<h1>
			If you can read this whole sentece than something has gone horibly wrong
			(or you are a really fast reader).
		</h1>
	);
};

export default FetchScreen;
