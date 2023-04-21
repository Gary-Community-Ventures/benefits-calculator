import { putScreen } from '../apiCalls.js'


const updateScreen = (uuid, formData) => {

	const getScreensBody = (formData) => {
		const householdMembers = getHouseholdMembersBodies(formData);
		const expenses = getExpensesBodies(formData);	

		const finalReferralSource = formData.otherSource !== '' ? formData.otherSource : formData.referralSource;
		const screenBody = {
			is_test: formData.isTest,
			external_id: formData.externalID,
			agree_to_tos: formData.agreeToTermsOfService,
			zipcode: formData.zipcode,
			county: formData.county,
			start_date: formData.startTime,
			household_size: formData.householdSize === ''? null: formData.householdSize,
			household_members: householdMembers,
			expenses: expenses,
			household_assets: formData.householdAssets,
			last_tax_filing_year: formData.lastTaxFilingYear,
			has_benefits: formData.hasBenefits,
			has_acp: formData.benefits.acp,
			has_andcs: formData.benefits.andcs,
			has_cccap: formData.benefits.cccap,
			has_coeitc: formData.benefits.coeitc,
			has_chs: formData.benefits.coheadstart,
			has_cpcr: formData.benefits.coPropTaxRentHeatCreditRebate,
			has_ctc: formData.benefits.ctc,
			has_cdhcs: formData.benefits.dentallowincseniors,
			has_dpp: formData.benefits.denverpresc,
			has_ede: formData.benefits.ede,
			has_eitc: formData.benefits.eitc,
			has_erc: formData.benefits.erc,
			has_fps: formData.benefits.familyplanning,
			has_lifeline: formData.benefits.lifeline,
			has_leap: formData.benefits.leap,
			has_mydenver: formData.benefits.mydenver,
			has_nslp: formData.benefits.nslp,
			has_oap: formData.benefits.oap,
			has_rhc: formData.benefits.reproductivehealth,
			has_rtdlive: formData.benefits.rtdlive,
			has_snap: formData.benefits.snap,
			has_ssi: formData.benefits.ssi,
			has_tanf: formData.benefits.tanf,
			has_wic: formData.benefits.wic,
			has_employer_hi: formData.healthInsurance.employer,
			has_private_hi: formData.healthInsurance.private,
			has_medicaid_hi: formData.healthInsurance.medicaid,
			has_medicare_hi: formData.healthInsurance.medicare,
			has_chp_hi: formData.healthInsurance.chp,
			has_no_hi: formData.healthInsurance.none,
			referral_source: finalReferralSource,
			referrer_code: formData.referrerCode,
			needs_food: formData.acuteHHConditions.food,
			needs_baby_supplies: formData.acuteHHConditions.babySupplies,
			needs_housing_help: formData.acuteHHConditions.housing,
			needs_mental_health_help: formData.acuteHHConditions.support,
			needs_child_dev_help: formData.acuteHHConditions.childDevelopment,
			needs_funeral_help: formData.acuteHHConditions.loss,
			needs_family_planning_help: formData.acuteHHConditions.familyPlanning
		};

		return screenBody;
	};

	const getHouseholdMembersBodies = (formData) => {
		const householdMembers = formData.householdData.map((householdMember) => {
			return getHouseholdMemberBody(householdMember);
		});
		return householdMembers;
	};

	const getHouseholdMemberBody = (householdMemberData) => {
		const incomes = getIncomeStreamsBodies(householdMemberData);

		return {
			relationship: householdMemberData.relationshipToHH,
			age: Number(householdMemberData.age),
			student: householdMemberData.student,
			student_full_time: householdMemberData.studentFulltime,
			pregnant: householdMemberData.pregnant,
			unemployed: householdMemberData.unemployed,
			worked_in_last_18_mos: householdMemberData.unemployedWorkedInLast18Mos,
			visually_impaired: householdMemberData.blindOrVisuallyImpaired,
			disabled: householdMemberData.disabled,
			veteran: householdMemberData.veteran,
			medicaid: householdMemberData.medicaid,
			disability_medicaid: householdMemberData.disabilityRelatedMedicaid,
			has_income: householdMemberData.hasIncome,
			income_streams: incomes,
		};
	};

	const getIncomeStreamsBodies = (householdMemberData) => {
		return householdMemberData.incomeStreams.map((incomeStream) => {
			return {
				type: incomeStream.incomeStreamName,
				amount: Number(incomeStream.incomeAmount),
				frequency: incomeStream.incomeFrequency,
				hours_worked: Number(incomeStream.hoursPerWeek) ?? null,
			};
		});
	};

	const getExpensesBodies = (formData) => {
		return formData.expenses.map((expense) => {
			return {
				type: expense.expenseSourceName,
				amount: expense.expenseAmount,
				frequency: 'monthly',
			};
		});
	};

  console.log(JSON.stringify(getScreensBody(formData)));
	console.log(putScreen(getScreensBody(formData), uuid));
}

export default updateScreen;