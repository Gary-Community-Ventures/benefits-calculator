import { FormattedMessage, useIntl } from 'react-intl';
import { Box, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { calcAge } from '../../HouseholdDataBlock/AgeInput';
import { useConfig } from '../../Config/configHook';
import { useTranslateNumber } from '../../../Assets/languageOptions';
import { FormData, HouseholdData } from '../../../Types/FormData';
import { FormattedMessageType } from '../../../Types/Questions';
import { useNavigate } from 'react-router-dom';
import './HHMSummaryCards.css';

type HHMSummariesProps = {
  activeMemberData: HouseholdData;
  page: number;
  formData: FormData;
  uuid?: string;
  step: number;
  triggerValidation: () => Promise<boolean>;
};

const HHMSummaries = ({ activeMemberData, page, formData, uuid, step, triggerValidation }: HHMSummariesProps) => {
  const relationshipOptions = useConfig('relationship_options');
  const headOfHHInfoWasEntered = formData.householdData.length >= 1;
  const translateNumber = useTranslateNumber();
  const intl = useIntl();
  const editHHMemberAriaLabel = intl.formatMessage({
    id: 'editHHMember.ariaText',
    defaultMessage: 'edit household member',
  });
  const navigate = useNavigate();

  const handleEditBtnSubmit = async (memberIndex: number) => {
    const isValid = await triggerValidation()
    if (isValid) {
      navigate(`/${formData.whiteLabel}/${uuid}/step-${step}/${memberIndex + 1}`);
    }
  };

  const formatToUSD = (num: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(num);
  };

  const createMemberCard = (
    memberIndex: number,
    memberData: HouseholdData,
    age: number,
    income: number,
    relationship_options: Record<string, FormattedMessageType>,
  ) => {
    const { relationshipToHH, birthYear, birthMonth } = memberData;
    const containerClassName = `member-added-container ${memberIndex + 1 === page ? 'current-household-member' : ''}`;

    let relationship = relationship_options[relationshipToHH];
    if (relationship === undefined) {
      relationship = <FormattedMessage id="relationshipOptions.yourself" defaultMessage="Yourself" />;
    }

    return (
      <article className={containerClassName} key={memberIndex}>
        <div className="household-member-header">
          <h3 className="member-added-relationship">{relationship}:</h3>
          <div className="household-member-edit-button">
            <IconButton
              onClick={() => {
                handleEditBtnSubmit(memberIndex);
              }}
              aria-label={editHHMemberAriaLabel}
            >
              <EditIcon />
            </IconButton>
          </div>
        </div>
        <div className="member-added-age">
          <strong>
            <FormattedMessage id="questions.age-inputLabel" defaultMessage="Age: " />
          </strong>
          {translateNumber(age)}
        </div>
        <div className="member-added-age">
          <strong>
            <FormattedMessage id="householdDataBlock.memberCard.birthYearMonth" defaultMessage="Birth Month/Year: " />
          </strong>
          {birthMonth !== undefined &&
            birthYear !== undefined &&
            translateNumber(String(birthMonth).padStart(2, '0')) + '/' + translateNumber(birthYear)}
        </div>
        <div className="member-added-income">
          <strong>
            <FormattedMessage id="householdDataBlock.member-income" defaultMessage="Income" />:{' '}
          </strong>
          {translateNumber(formatToUSD(Number(income)))}
          <FormattedMessage id="displayAnnualIncome.annual" defaultMessage=" annually" />
        </div>
      </article>
    );
  };

  const createFormDataMemberCard = (
    memberIndex: number,
    member: HouseholdData,
    relationship_options: Record<string, FormattedMessageType>,
  ) => {
    if (member.birthYear && member.birthMonth) {
      let age = calcAge(member.birthYear, member.birthMonth);

      if (Number.isNaN(age)) {
        age = 0;
      }

      let income = 0;
      for (const { incomeFrequency, incomeAmount, hoursPerWeek } of member.incomeStreams) {
        let num = 0;
        switch (incomeFrequency) {
          case 'weekly':
            num = Number(incomeAmount) * 52;
            break;
          case 'biweekly':
            num = Number(incomeAmount) * 26;
            break;
          case 'semimonthly':
            num = Number(incomeAmount) * 24;
            break;
          case 'monthly':
            num = Number(incomeAmount) * 12;
            break;
          case 'hourly':
            num = Number(incomeAmount) * Number(hoursPerWeek) * 52;
            break;
        }
        income += Number(num);
      }

      // return createMemberCard(memberIndex, relationship, member.birthYear, member.birthMonth, age, income, page);
      return createMemberCard(memberIndex, member, age, income, relationship_options);
    }
  };

  //hHMemberSummaries will have the length of members that have already been saved to formData
  const hHMemberSummaries = [
    ...formData.householdData.map((member, memberIndex) => {
      return createFormDataMemberCard(memberIndex, member, relationshipOptions);
    }),
  ];

  //We want the active/current member's summary card to update synchronously as we change their information
  //so we swap out the current one for the one we create using the memberData in state
  const summariesWActiveMemberCard = hHMemberSummaries.map((member, memberIndex) => {
    if (memberIndex === page - 1) {
      return createFormDataMemberCard(memberIndex, activeMemberData, relationshipOptions);
    } else {
      return member;
    }
  });

  return (
    <article key={page}>
      {headOfHHInfoWasEntered && (
        <Box sx={{ marginBottom: '1.5rem' }}>
          <h2 className="household-data-sub-header secondary-heading">
            <FormattedMessage id="qcc.so-far-text" defaultMessage="So far you've told us about:" />
          </h2>
          <div>{summariesWActiveMemberCard}</div>
        </Box>
      )}
    </article>
  );
};

export default HHMSummaries;
