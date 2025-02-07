import { ReactNode, useContext } from 'react';
import { useIntl, FormattedMessage } from 'react-intl';
import { useFormatBirthMonthYear, calcAge, hasBirthMonthYear } from '../../../Assets/age';
import { useTranslateNumber } from '../../../Assets/languageOptions';
import { Conditions, HouseholdData, IncomeStream } from '../../../Types/FormData';
import { FormattedMessageType } from '../../../Types/Questions';
import { useConfig } from '../../Config/configHook';
import ConfirmationBlock, { formatToUSD, ConfirmationItem } from '../ConfirmationBlock';
import { Context } from '../../Wrapper/Wrapper';
import { ReactComponent as Head } from '../../../Assets/icons/head.svg';

const EnergyCalcConfirmationHHData = () => {
  const { formData } = useContext(Context);
  const { householdData } = formData;

  const { formatMessage } = useIntl();

  const translateNumber = useTranslateNumber();
  const formatBirthMonthYear = useFormatBirthMonthYear();

  const relationshipOptions = useConfig<FormattedMessageType>('relationship_options');
  const incomeOptions = useConfig<FormattedMessageType>('income_options');
  const frequencyOptions = useConfig<FormattedMessageType>('frequency_options');

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
    const { hasIncome, incomeStreams } = member;
    const age = calcAge(member);
    let relationship: FormattedMessageType;
    if (i === 0) {
      relationship = <FormattedMessage id="qcc.hoh-text" defaultMessage="Head of Household (You)" />;
    } else {
      relationship = relationshipOptions[member.relationshipToHH];
    }

    const energyCalculatorConditionsList = (member: HouseholdData) => {
      const { conditions, energyCalculator } = member;
      const hasConditions = conditions.disabled || energyCalculator?.receivesSsi || energyCalculator?.survivingSpouse;
      const survivingSpouseText = formatMessage({
        id: 'eCConditionOptions.survivingSpouse',
        defaultMessage: 'Surviving Spouse',
      });
      const disabledText = formatMessage({
        id: 'confirmationHHData.disability',
        defaultMessage: 'Disability',
      });
      const receiveSsiText = formatMessage({
        id: 'ecHHMF.they-receiveSsi',
        defaultMessage:
          'Received full benefits from Social Security, SSI, the Department of Human Services, or a public or private plan:',
      });
      const receivesSsiDisplayedValue = energyCalculator?.receivesSsi
        ? formatMessage({
            id: 'radiofield.label-yes',
            defaultMessage: 'Yes',
          })
        : formatMessage({
            id: 'radiofield.label-no',
            defaultMessage: 'No',
          });

      if (hasConditions) {
        return (
          <ul>
            {energyCalculator?.survivingSpouse && <li key="survivingSpouse">{survivingSpouseText}</li>}
            {conditions?.disabled && <li key="disabled">{disabledText}</li>}
            {energyCalculator?.receivesSsi && (
              <li key="receivesSsi">
                {receiveSsiText} {receivesSsiDisplayedValue}
              </li>
            )}
          </ul>
        );
      }
    };

    return (
      <ConfirmationBlock
        icon={<Head title={formatMessage(householdMemberIconAlt)} />}
        title={relationship}
        editAriaLabel={editHouseholdMemberAriaLabel}
        stepName="ecHouseholdData"
        editUrlEnding={String(i + 1)}
        key={i}
      >
        <ConfirmationItem
          label={<FormattedMessage id="questions.age-inputLabel" defaultMessage="Age:" />}
          value={translateNumber(age)}
        />
        {hasBirthMonthYear(member) && (
          <ConfirmationItem
            label={<FormattedMessage id="confirmation.member.birthYearMonth" defaultMessage="Birth Month/Year:" />}
            value={formatBirthMonthYear(member)}
          />
        )}
        <ConfirmationItem
          label={
            <FormattedMessage id="confirmation.headOfHouseholdDataBlock-conditionsText" defaultMessage="Conditions:" />
          }
          value={energyCalculatorConditionsList(member)}
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
      </ConfirmationBlock>
    );
  });

  return <>{householdMemberDataBlocks}</>;
};

export default EnergyCalcConfirmationHHData;
