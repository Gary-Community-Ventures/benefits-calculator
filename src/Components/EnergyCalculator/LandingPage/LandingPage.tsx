import { FormattedMessage } from 'react-intl';
import QuestionHeader from '../../QuestionComponents/QuestionHeader';
import QuestionQuestion from '../../QuestionComponents/QuestionQuestion';
import './LandingPage.css';

const LandingPage = () => {
  return (
    <div>
      <div className="eCalc-landingPage.header">
        <QuestionHeader>
          <FormattedMessage id="eCalcLandingPage.qHeader" defaultMessage="Energy Calculator" />
        </QuestionHeader>
      </div>
      <article className="eCalc-body-text">
        <FormattedMessage
          id="eCalc.bodyText"
          defaultMessage="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Curabitur pretium tincidunt lacus, nec vehicula risus tincidunt a. Sed euismod, nisl nec aliquam."
        />
      </article>
      <QuestionQuestion>
        <FormattedMessage
          id="eCalc-landingPage.question"
          defaultMessage="To get started, are you a renter or homeowner?"
        />
      </QuestionQuestion>
    </div>
  );
};

export default LandingPage;
