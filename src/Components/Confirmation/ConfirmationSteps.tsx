import { ReactNode, useContext } from 'react';
import { Context } from '../Wrapper/Wrapper';
import ConfirmationBlock, { ConfirmationItem, formatToUSD } from './ConfirmationBlock';
import { ReactComponent as Residence } from '../../Assets/icons/residence.svg';
import { ReactComponent as Household } from '../../Assets/icons/household.svg';
import { ReactComponent as Head } from '../../Assets/icons/head.svg';
import { ReactComponent as Expense } from '../../Assets/icons/expenses.svg';
import { ReactComponent as Resources } from '../../Assets/icons/resources.svg';
import { ReactComponent as Benefits } from '../../Assets/icons/benefits.svg';
import { ReactComponent as Immediate } from '../../Assets/icons/immediate.svg';
import { ReactComponent as Referral } from '../../Assets/icons/referral.svg';
import { FormattedMessage, useIntl } from 'react-intl';
import { useTranslateNumber } from '../../Assets/languageOptions';
import { FormattedMessageType, QuestionName } from '../../Types/Questions';
import { useConfig } from '../Config/configHook';
import { calcAge } from '../HouseholdDataBlock/AgeInput';
import { Conditions, IncomeStream, Benefits as BenefitsType } from '../../Types/FormData';

function ZipCode() {
  const { formData } = useContext(Context);
  const { zipcode, county } = formData;
  const { formatMessage } = useIntl();
  const translateNumber = useTranslateNumber();

  const editZipAriaLabel = {
    id: 'confirmation.zipcode.edit-AL',
    defaultMessage: 'edit zipcode',
  };
  const zipcodeIconAlt = {
    id: 'confirmation.zipcode.icon-AL',
    defaultMessage: 'zipcode',
  };

  return (
    <ConfirmationBlock
      icon={<Residence title={formatMessage(zipcodeIconAlt)} />}
      title={<FormattedMessage id="confirmation.residenceInfo" defaultMessage="Residence Information" />}
      editAriaLabel={editZipAriaLabel}
      stepName="zipcode"
    >
      <ConfirmationItem
        label={<FormattedMessage id="confirmation.displayAllFormData-zipcodeText" defaultMessage="Zip code: " />}
        value={translateNumber(zipcode)}
      />
      <ConfirmationItem
        label={<FormattedMessage id="confirmation.displayAllFormData-countyText" defaultMessage="County: " />}
        value={county}
      />
    </ConfirmationBlock>
  );
}

function HouseholdSize() {
  const { formData, locale } = useContext(Context);
  const { householdSize } = formData;
  const { formatMessage } = useIntl();
  const translateNumber = useTranslateNumber();

  let householdSizeDescriptor = { id: 'confirmation.displayAllFormData-personLabel', defaultMessage: 'person' };

  if (householdSize >= 2) {
    householdSizeDescriptor = { id: 'confirmation.displayAllFormData-peopleLabel', defaultMessage: 'people' };
    // Russian uses the singular of people for 1-4 people
    if (householdSize <= 4 && locale === 'ru') {
      householdSizeDescriptor = { id: 'confirmation.displayAllFormData-personLabel', defaultMessage: 'person' };
    }
  }

  const editHouseholdSizeAriaLabel = {
    id: 'confirmation.hhSize.edit-AL',
    defaultMessage: 'edit household size',
  };
  const householdSizeIconAlt = {
    id: 'confirmation.hhsize.icon-AL',
    defaultMessage: 'household size',
  };

  return (
    <ConfirmationBlock
      icon={<Household title={formatMessage(householdSizeIconAlt)} />}
      title={
        <FormattedMessage id="confirmation.displayAllFormData-yourHouseholdLabel" defaultMessage="Household Members" />
      }
      editAriaLabel={editHouseholdSizeAriaLabel}
      stepName="householdSize"
      noReturn
    >
      <ConfirmationItem
        label={<FormattedMessage id="questions.householdSize-inputLabel" defaultMessage="Household Size:" />}
        value={`${translateNumber(householdSize)} ${formatMessage(householdSizeDescriptor)}`}
      />
    </ConfirmationBlock>
  );
}

type FormattedMessageMap = {
  [key: string]: FormattedMessageType;
};

type IconAndFormattedMessageMap = {
  [key: string]: {
    text: FormattedMessageType;
    icon: ReactNode;
  };
};

function HouseholdData() {
  const { formData } = useContext(Context);
  const { householdData } = formData;

  const { formatMessage } = useIntl();

  const translateNumber = useTranslateNumber();

  const relationshipOptions = useConfig<FormattedMessageMap>('relationship_options');
  const incomeOptions = useConfig<FormattedMessageMap>('income_options');
  const frequencyOptions = useConfig<FormattedMessageMap>('frequency_options');
  const healthInsuranceOptions = useConfig<{
    you: IconAndFormattedMessageMap;
    them: IconAndFormattedMessageMap;
  }>('health_insurance_options');

  const conditionsString = (conditions: Conditions) => {
    const conditionText = [];

    if (conditions.student) {
      conditionText.push(
        formatMessage({
          id: 'confirmation.headOfHouseholdDataBlock-studentText',
          defaultMessage: 'Student',
        }),
      );
    }

    if (conditions.pregnant) {
      conditionText.push(
        formatMessage({
          id: 'confirmation.headOfHouseholdDataBlock-pregnantText',
          defaultMessage: 'Pregnant',
        }),
      );
    }

    if (conditions.blindOrVisuallyImpaired) {
      conditionText.push(
        formatMessage({
          id: 'confirmation.headOfHouseholdDataBlock-blindOrVisuallyImpairedText',
          defaultMessage: 'Blind or visually impaired',
        }),
      );
    }

    if (conditions.disabled) {
      conditionText.push(
        formatMessage({
          id: 'confirmation.headOfHouseholdDataBlock-disabledText',
          defaultMessage: 'Disabled',
        }),
      );
    }

    if (conditions.longTermDisability) {
      conditionText.push(
        formatMessage({
          id: 'confirmation.longTermDisability',
          defaultMessage:
            'Has a medical or developmental condition that has lasted, or is expected to last, more than 12 months',
        }),
      );
    }

    if (conditionText.length === 0) {
      return formatMessage({ id: 'confirmation.none', defaultMessage: 'None' });
    }

    // NOTE: we might want to redesign this to be more like a bullet list because
    // not every language will use commas to seperate a list.
    return conditionText.join(', ');
  };

  const listAllIncomeStreams = (incomeStreams: IncomeStream[]) => {
    const mappedListItems = incomeStreams.map((incomeStream, index) => {
      const incomeStreamName = incomeOptions[incomeStream.incomeStreamName];
      const incomeAmount = formatToUSD(Number(incomeStream.incomeAmount));
      const incomeFrequency = frequencyOptions[incomeStream.incomeFrequency];
      const hoursPerWeek = incomeStream.hoursPerWeek;
      const translatedHrsPerWkText = formatMessage({
        id: 'listAllIncomeStreams.hoursPerWeek',
        defaultMessage: ' hours/week ',
      });

      const translatedAnnualText = formatMessage({
        id: 'displayAnnualIncome.annual',
        defaultMessage: ' annually',
      });
      let num = 0;

      switch (incomeStream.incomeFrequency) {
        case 'weekly':
          num = Number(incomeStream.incomeAmount) * 52;
          break;
        case 'biweekly':
          num = Number(incomeStream.incomeAmount) * 26;
          break;
        case 'semimonthly':
          num = Number(incomeStream.incomeAmount) * 24;
          break;
        case 'monthly':
          num = Number(incomeStream.incomeAmount) * 12;
          break;
        case 'yearly':
          num = Number(incomeStream.incomeAmount);
          break;
        case 'hourly':
          num = Number(incomeStream.incomeAmount) * Number(incomeStream.hoursPerWeek) * 52;
          break;
      }
      const annualAmount = `(${formatToUSD(num)}` + translatedAnnualText + `)`;

      return (
        <li key={index}>
          <ConfirmationItem
            label={<>{incomeStreamName}:</>}
            value={
              incomeStream.incomeFrequency === 'hourly' ? (
                <>
                  {translateNumber(incomeAmount)} {incomeFrequency} ~{translateNumber(hoursPerWeek)}{' '}
                  {translatedHrsPerWkText} {translateNumber(annualAmount)}
                </>
              ) : (
                <>
                  {translateNumber(incomeAmount)} {incomeFrequency} {translateNumber(annualAmount)}
                </>
              )
            }
          />
        </li>
      );
    });

    return mappedListItems;
  };

  const editHouseholdMemberAriaLabel = {
    id: 'confirmation.hhMember.edit-AL',
    defaultMessage: 'edit household member',
  };
  const householdMemberIconAlt = {
    id: 'confirmation.hhMember.icon-AL',
    defaultMessage: 'household member',
  };

  const householdMemberDataBlocks = householdData.map((member, i) => {
    if (member.birthYear === undefined || member.birthMonth === undefined) {
      throw new Error('Birth year and month are undefined');
    }

    const { hasIncome, incomeStreams } = member;
    const age = calcAge(member.birthYear, member.birthMonth);
    let relationship: FormattedMessageType;
    if (i === 0) {
      relationship = <FormattedMessage id="qcc.hoh-text" defaultMessage="Head of Household (You)" />;
    } else {
      relationship = relationshipOptions[member.relationshipToHH];
    }

    const displayHealthInsurance = () => {
      const insurance = member.healthInsurance;
      const selectedNone = insurance.none === true;

      const youVsThemHealthInsuranceOptions = i === 0 ? healthInsuranceOptions.you : healthInsuranceOptions.them;

      const allOtherSelectedOptions = Object.entries(insurance)
        .filter((hHMemberInsEntry) => hHMemberInsEntry[1] === true)
        .map((insurance) => {
          const formattedMessageProp = youVsThemHealthInsuranceOptions[insurance[0]].text.props;
          return formatMessage({ ...formattedMessageProp });
        });

      if (selectedNone) {
        return <>{youVsThemHealthInsuranceOptions.none.text}</>;
      }

      const allOtherSelectedOptionsString = allOtherSelectedOptions.join(', ');

      return <>{allOtherSelectedOptionsString}</>;
    };

    return (
      <ConfirmationBlock
        icon={<Head title={formatMessage(householdMemberIconAlt)} />}
        title={relationship}
        editAriaLabel={editHouseholdMemberAriaLabel}
        stepName="householdData"
        editUrlEnding={String(i + 1)}
        key={i}
      >
        <ConfirmationItem
          label={<FormattedMessage id="questions.age-inputLabel" defaultMessage="Age:" />}
          value={translateNumber(age)}
        />
        <ConfirmationItem
          label={<FormattedMessage id="confirmation.member.birthYearMonth" defaultMessage="Birth Month/Year:" />}
          value={translateNumber(String(member.birthMonth).padStart(2, '0')) + '/' + translateNumber(member.birthYear)}
        />
        <ConfirmationItem
          label={
            <FormattedMessage id="confirmation.headOfHouseholdDataBlock-conditionsText" defaultMessage="Conditions:" />
          }
          value={conditionsString(member.conditions)}
        />
        <ConfirmationItem
          label={<FormattedMessage id="confirmation.headOfHouseholdDataBlock-incomeLabel" defaultMessage="Income:" />}
          value={
            hasIncome && incomeStreams.length > 0 ? (
              <ul>{listAllIncomeStreams(incomeStreams)}</ul>
            ) : (
              <FormattedMessage id="confirmation.noIncome" defaultMessage="None" />
            )
          }
        />
        <ConfirmationItem
          label={
            <FormattedMessage
              id="confirmation.headOfHouseholdDataBlock-healthInsuranceText"
              defaultMessage="Health Insurance: "
            />
          }
          value={displayHealthInsurance()}
        />
      </ConfirmationBlock>
    );
  });

  return <>{householdMemberDataBlocks}</>;
}

function Expenses() {
  const { formData } = useContext(Context);
  const { formatMessage } = useIntl();
  const translateNumber = useTranslateNumber();
  const expenseOptions = useConfig<FormattedMessageMap>('expense_options');

  const editExpensesAriaLabel = {
    id: 'confirmation.expense.edit-AL',
    defaultMessage: 'edit expenses',
  };
  const expensesIconAlt = {
    id: 'confirmation.expense.icon-AL',
    defaultMessage: 'expenses',
  };

  const allExpenses = () => {
    if (formData.expenses.length === 0) {
      return <FormattedMessage id="confirmation.none" defaultMessage="None" />;
    }
    const mappedExpenses = formData.expenses.map((expense, i) => {
      return (
        <ConfirmationItem
          label={<>{expenseOptions[expense.expenseSourceName]}:</>}
          value={translateNumber(formatToUSD(Number(expense.expenseAmount)))}
          key={i}
        />
      );
    });

    return mappedExpenses;
  };

  return (
    <ConfirmationBlock
      icon={<Expense title={formatMessage(expensesIconAlt)} />}
      title={
        <FormattedMessage
          id="confirmation.headOfHouseholdDataBlock-expensesLabel"
          defaultMessage="Monthly Household Expenses"
        />
      }
      editAriaLabel={editExpensesAriaLabel}
      stepName="hasExpenses"
    >
      {allExpenses()}
    </ConfirmationBlock>
  );
}

function Assets() {
  const { formData } = useContext(Context);
  const { formatMessage } = useIntl();
  const translateNumber = useTranslateNumber();

  const editAssetsAriaLabel = {
    id: 'confirmation.assets.edit-AL',
    defaultMessage: 'edit assets',
  };
  const assetsIconAlt = {
    id: 'confirmation.assets.icon-AL',
    defaultMessage: 'assets',
  };

  return (
    <ConfirmationBlock
      icon={<Resources title={formatMessage(assetsIconAlt)} />}
      title={
        <FormattedMessage
          id="confirmation.displayAllFormData-householdResourcesText"
          defaultMessage="Household resources"
        />
      }
      editAriaLabel={editAssetsAriaLabel}
      stepName="householdAssets"
    >
      <ConfirmationItem
        label={
          <FormattedMessage
            id="confirmation.displayAllFormData-householdResourcesText"
            defaultMessage="Household resources"
          />
        }
        value={
          <>
            {translateNumber(formatToUSD(formData.householdAssets, 0))}
            <i>
              <FormattedMessage
                id="confirmation.displayAllFormData-householdResourcesDescription"
                defaultMessage="(This is cash on hand, checking or saving accounts, stocks, bonds or mutual funds.)"
              />
            </i>
          </>
        }
      />
    </ConfirmationBlock>
  );
}

type BenefitList = {
  [key: string]: {
    name: FormattedMessageType;
    description: FormattedMessageType;
  };
};

type CategoryBenefits = {
  [key: string]: { benefits: BenefitList; category_name: FormattedMessageType };
};

function HasBenefits() {
  const { formData } = useContext(Context);
  const { formatMessage } = useIntl();
  const categoryBenefits = useConfig<CategoryBenefits>('category_benefits');

  const alreadyHasBenefits = () => {
    let allBenefits: BenefitList = {};

    for (const category of Object.values(categoryBenefits)) {
      allBenefits = { ...allBenefits, ...category.benefits };
    }

    const benefitsText = Object.entries(allBenefits)
      .filter(([name, _]) => {
        return formData.benefits[name as keyof BenefitsType];
      })
      .map(([name, value]) => {
        return <ConfirmationItem label={value.name} value={value.description} key={name} />;
      });

    if (benefitsText.length > 0) {
      return benefitsText;
    }

    return <FormattedMessage id="confirmation.none" defaultMessage="None" />;
  };

  const editHasBenefitsAriaLabel = {
    id: 'confirmation.currentBenefits.edit-AL',
    defaultMessage: 'edit benefits you already have',
  };
  const hasBenefitsIconAlt = {
    id: 'confirmation.currentBenefits.icon-AL',
    defaultMessage: 'benefits you already have',
  };

  return (
    <ConfirmationBlock
      icon={<Benefits title={formatMessage(hasBenefitsIconAlt)} />}
      title={
        <FormattedMessage
          id="confirmation.displayAllFormData-currentHHBenefitsText"
          defaultMessage="Current Household Benefits:"
        />
      }
      editAriaLabel={editHasBenefitsAriaLabel}
      stepName="householdAssets"
    >
      {alreadyHasBenefits()}
    </ConfirmationBlock>
  );
}

function AcuteConditions() {
  const { formData } = useContext(Context);
  const { formatMessage } = useIntl();
  const acuteConditionOptions = useConfig<IconAndFormattedMessageMap>('acute_condition_options');

  const editAcuteConditionsAriaLabel = {
    id: 'confirmation.acuteConditions.edit-AL',
    defaultMessage: 'edit immediate needs',
  };
  const acuteConditionsIconAlt = {
    id: 'confirmation.acuteConditions.icon-AL',
    defaultMessage: 'immediate needs',
  };

  const formatedNeeds = () => {
    const allNeeds = Object.entries(formData.acuteHHConditions).filter(([_, value]) => value === true);

    if (allNeeds.length === 0) {
      return <FormattedMessage id="confirmation.noIncome" defaultMessage="None" />;
    }

    return (
      <ul className="confirmation-acute-need-list">
        {allNeeds.map(([key, _]) => {
          return <li key={key}>{acuteConditionOptions[key].text}</li>;
        })}
      </ul>
    );
  };

  return (
    <ConfirmationBlock
      icon={<Immediate title={formatMessage(acuteConditionsIconAlt)} />}
      title={
        <FormattedMessage id="confirmation.displayAllFormData-acuteHHConditions" defaultMessage="Immediate Needs" />
      }
      editAriaLabel={editAcuteConditionsAriaLabel}
      stepName="acuteHHConditions"
    >
      {formatedNeeds()}
    </ConfirmationBlock>
  );
}

function ReferralSource() {
  const { formData } = useContext(Context);
  const { formatMessage } = useIntl();
  const referralOptions = useConfig<{ [key: string]: string | FormattedMessageType }>('referral_options');

  if (formData.referralSource === undefined) {
    return null;
  }

  const editReferralSourceAriaLabel = {
    id: 'confirmation.referralSource.edit-AL',
    defaultMessage: 'edit referral source',
  };
  const referralSourceIconAlt = {
    id: 'confirmation.referralSource.icon-AL',
    defaultMessage: 'referral source',
  };

  return (
    <ConfirmationBlock
      icon={<Referral title={formatMessage(referralSourceIconAlt)} />}
      title={
        <FormattedMessage id="confirmation.displayAllFormData-referralSourceText" defaultMessage="Referral Source" />
      }
      editAriaLabel={editReferralSourceAriaLabel}
      stepName="referralSource"
    >
      {formData.referralSource in referralOptions ? referralOptions[formData.referralSource] : formData.referralSource}
    </ConfirmationBlock>
  );
}

const STEP_CONFIRMATIONS: Record<QuestionName, ReactNode | null> = {
  zipcode: <ZipCode key="zipcode" />,
  householdSize: <HouseholdSize key="householdSize" />,
  householdData: <HouseholdData key="HouseholdData" />,
  hasExpenses: <Expenses key="hasExpenses" />,
  householdAssets: <Assets key="householdAssets" />,
  hasBenefits: <HasBenefits key="hasBenefits" />,
  acuteHHConditions: <AcuteConditions key="acuteHHConditions" />,
  referralSource: <ReferralSource key="referralSource" />,
  signUpInfo: null,
};

export default STEP_CONFIRMATIONS;