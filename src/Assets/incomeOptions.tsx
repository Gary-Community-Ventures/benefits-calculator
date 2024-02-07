import { FormattedMessage } from 'react-intl';

const incomeOptions = {
  wages: <FormattedMessage id="incomeOptions.wages" defaultMessage="Wages, salaries, tips" />,
  selfEmployment: (
    <FormattedMessage
      id="incomeOptions.selfEmployment"
      defaultMessage="Income from freelance, independent contractor, or self-employment work"
    />
  ),
  sSDisability: (
    <FormattedMessage id="incomeOptions.sSDisability" defaultMessage="Social Security Disability Benefits" />
  ),
  sSRetirement: (
    <FormattedMessage id="incomeOptions.sSRetirement" defaultMessage="Social Security Retirement Benefits" />
  ),
  sSI: <FormattedMessage id="incomeOptions.sSI" defaultMessage="Supplemental Security Income (SSI)" />,
  childSupport: <FormattedMessage id="incomeOptions.childSupport" defaultMessage="Child Support (Received)" />,
  pension: <FormattedMessage id="incomeOptions.pension" defaultMessage="Military, Government, or Private Pension" />,
  veteran: <FormattedMessage id="incomeOptions.veteran" defaultMessage="Veteran's Pension or Benefits" />,
  sSSurvivor: (
    <FormattedMessage
      id="incomeOptions.sSSurvivor"
      defaultMessage="Social Security Survivor's Benefits (Widow/Widower)"
    />
  ),
  unemployment: <FormattedMessage id="incomeOptions.unemployment" defaultMessage="Unemployment Benefits" />,
  sSDependent: (
    <FormattedMessage
      id="incomeOptions.sSDependent"
      defaultMessage="Social Security Dependent Benefits (retirement, disability, or survivors)"
    />
  ),
  cashAssistance: <FormattedMessage id="incomeOptions.cashAssistance" defaultMessage="Cash Assistance Grant" />,
  gifts: <FormattedMessage id="incomeOptions.gifts" defaultMessage="Gifts/Contributions (Received)" />,
  investment: (
    <FormattedMessage
      id="incomeOptions.investment"
      defaultMessage="Investment Income (interest, dividends, and profit from selling stocks)"
    />
  ),
  cOSDisability: (
    <FormattedMessage id="incomeOptions.cOSDisability" defaultMessage="Colorado State Disability Benefits" />
  ),
  rental: <FormattedMessage id="incomeOptions.rental" defaultMessage="Rental Income" />,
  alimony: <FormattedMessage id="incomeOptions.alimony" defaultMessage="Alimony (Received)" />,
  deferredComp: (
    <FormattedMessage
      id="incomeOptions.deferredComp"
      defaultMessage="Withdrawals from Deferred Compensation (IRA, Keogh, etc.)"
    />
  ),
  workersComp: <FormattedMessage id="incomeOptions.workersComp" defaultMessage="Worker's Compensation" />,
  boarder: <FormattedMessage id="incomeOptions.boarder" defaultMessage="Boarder or Lodger" />,
};

export default incomeOptions;
