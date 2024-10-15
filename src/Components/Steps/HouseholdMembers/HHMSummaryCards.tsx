import { useContext } from 'react';
import { Context } from '../../Wrapper/Wrapper';
import { FormattedMessage, useIntl } from 'react-intl';
import { Box, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { calcAge } from '../../HouseholdDataBlock/AgeInput';
import { useConfig } from '../../Config/configHook';
import { useTranslateNumber } from '../../../Assets/languageOptions';
import { useParams } from 'react-router-dom';


const HHMSummaries = ({activeMemberData, page}) => {
  const { formData } = useContext(Context);
  const relationshipOptions = useConfig('relationship_options');
  const headOfHHInfoWasEntered = formData.householdData.length >= 1;
  const translateNumber = useTranslateNumber();
  const intl = useIntl();
  const editHHMemberAriaLabel = intl.formatMessage({
    id: 'editHHMember.ariaText',
    defaultMessage: 'edit household member',
  });

  const handleEditBtnSubmit = () => {
    // const validPersonData = personDataIsValid(memberData);
    // if (validPersonData) {
      // handleHouseholdDataSubmit(memberData, page - 1, uuid);
      console.log(`will need to update formData and backend data`)
      // navigate(`/${uuid}/step-${step}/${memberIndex + 1}`);
    // }
  };

  const formatToUSD = (num) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(num);
  };

  const createMemberCard = (index, relationship, birthYear, birthMonth, age, income, page) => {
    const containerClassName = `member-added-container ${index + 1 === page ? 'current-household-member' : ''}`;

    return (
      <article className={containerClassName} key={index}>
        <div className="household-member-header">
          <h3 className="member-added-relationship">{relationship}:</h3>
          <div className="household-member-edit-button">
            <IconButton
              onClick={() => {
                handleEditBtnSubmit(index);
              }}
              aria-label={editHHMemberAriaLabel}
            >
              <EditIcon alt="edit icon" />
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

  const createFormDataMemberCard = (member, index) => {
    let relationship = relationshipOptions[member.relationshipToHH];
    if (relationship === undefined) {
      relationship = <FormattedMessage id="relationshipOptions.yourself" defaultMessage="Yourself" />;
    }

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

    return createMemberCard(index, relationship, member.birthYear, member.birthMonth, age, income, page);
  };

  //hHMemberSummaries will have the length of members that have already been saved to formData
  const hHMemberSummaries = [
    ...formData.householdData.map((member, index) => {
      return createFormDataMemberCard(member, index);
    }),
  ];

  //TODO: this will require memberData from HHDB to be passed as a prop to this component, pass page to this component
  //We want the active/current member's summary card to update synchronously as we change their information
  //so we swap out the current one for the one we create using the memberData in state
  const summariesWActiveMemberCard = hHMemberSummaries.map((member, index) => {
    if (index === page - 1) {
      return createFormDataMemberCard(activeMemberData, index);
    } else {
      return member;
    }
  });

  return (
    <>
      {headOfHHInfoWasEntered && (
        <Box sx={{ marginBottom: '1.5rem' }}>
          <h2 className="household-data-sub-header secondary-heading">
            <FormattedMessage id="qcc.so-far-text" defaultMessage="So far you've told us about:" />
          </h2>
          <div>{summariesWActiveMemberCard}</div>
        </Box>
      )}
    </>
  );

};

export default HHMSummaries;