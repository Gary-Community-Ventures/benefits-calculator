import Loading from '../Loading/Loading';
import {
	postPartialParentScreen,
	postHouseholdMemberData,
	postHouseholdMemberIncomeStream,
	postHouseholdMemberExpense,
	postUser,
} from '../../apiCalls';
import { Context } from '../Wrapper/Wrapper';
import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const SubmitScreen = ({ formData, setFormData }) => {
	const locale = useContext(Context).locale;
	const navigate = useNavigate()
	useEffect(() => {
		fetchResults();
	}, []);

	const fetchResults = async () => {
    if (formData.screenUUID !== undefined) {
      navigate(formData.screenUUID);
      return
    }
		let userId = 0;

		if (formData.signUpInfo.sendOffers || formData.signUpInfo.sendUpdates) {
			userId = await postUserSignUpInfo();
		}

		const screensBody = getScreensBody(formData, locale.toLowerCase(), userId);
		const screensResponse = await postPartialParentScreen(screensBody);
		const householdMembersBodies = getHouseholdMembersBodies(
			formData,
			screensResponse.id
		);
		for (const householdMembersBody of householdMembersBodies) {
			const householdMembersResponse = await postHouseholdMemberData(
				householdMembersBody
			);

			const incomeStreamsBodies = getIncomeStreamsBodies(
				householdMembersBody,
				householdMembersResponse.id
			);
			for (const incomeStreamsBody of incomeStreamsBodies) {
				await postHouseholdMemberIncomeStream(incomeStreamsBody);
			}

			const expensesBodies = getExpensesBodies(
				householdMembersBody,
				householdMembersResponse.id
			);
			for (const expensesBody of expensesBodies) {
				await postHouseholdMemberExpense(expensesBody);
			}
		}
    setFormData({ ...formData, screenUUID: screensResponse.uuid });
    navigate(`/results/${screensResponse.uuid}`);
	};

	const getScreensBody = (formData, languageCode, userId) => {
		const {
			agreeToTermsOfService,
			zipcode,
			county,
			householdSize,
			householdAssets,
			startTime,
			isTest,
			externalID,
			lastTaxFilingYear,
			benefits,
			healthInsurance,
			referralSource,
			referrerCode,
			otherSource,
			acuteHHConditions,
		} = formData;
		const finalReferralSource =
			otherSource !== '' ? otherSource : referralSource;

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
			needs_funeral_help: acuteHHConditions.loss,
		};

		if (userId !== 0 && userId !== false) {
			screenBody.user = userId;
		}

		return screenBody;
	};

	const getHouseholdMembersBodies = (formData, screensId) => {
		const headOfHousehold = getHouseholdMemberBody(
			formData,
			'headOfHousehold',
			screensId
		);
		const otherHouseholdMembers = formData.householdData.map((otherMember) => {
			return getHouseholdMemberBody(
				otherMember,
				otherMember.relationshipToHH,
				screensId
			);
		});
		return [headOfHousehold, ...otherHouseholdMembers];
	};

	const getHouseholdMemberBody = (formData, relationshipToHH, screensId) => {
		const {
			age,
			student,
			studentFulltime,
			pregnant,
			unemployed,
			unemployedWorkedInLast18Mos,
			blindOrVisuallyImpaired,
			disabled,
			veteran,
			medicaid,
			disabilityRelatedMedicaid,
			hasIncome,
			hasExpenses,
			incomeStreams,
			expenses,
		} = formData;

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
			expenses: expenses ? expenses : [],
		};
	};

	const getIncomeStreamsBodies = (householdMemberBody, householdMemberId) => {
		return householdMemberBody.income_streams.map((incomeStream) => {
			return {
				type: incomeStream.incomeStreamName,
				amount: incomeStream.incomeAmount,
				frequency: incomeStream.incomeFrequency,
				screen: householdMemberBody.screen,
				household_member: householdMemberId,
			};
		});
	};

	const getExpensesBodies = (householdMemberBody, householdMemberId) => {
		return householdMemberBody.expenses.map((expense) => {
			return {
				type: expense.expenseSourceName,
				amount: expense.expenseAmount,
				frequency: 'monthly',
				screen: householdMemberBody.screen,
				household_member: householdMemberId,
			};
		});
	};

	const postUserSignUpInfo = async () => {
		const {
			email,
			phone,
			firstName,
			lastName,
			sendUpdates,
			sendOffers,
			commConsent,
		} = formData.signUpInfo;
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
			send_updates: sendUpdates,
		};

		try {
			const userSignUpResponse = await postUser(user); //this should return what's on the swagger docs
			return userSignUpResponse.id;
		} catch {
			return false;
		}
	};

	return <Loading />;
};
export default SubmitScreen;
