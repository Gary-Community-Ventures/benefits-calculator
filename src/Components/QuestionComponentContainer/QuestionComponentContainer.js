import { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Context } from '../Wrapper/Wrapper.tsx';
import { ZipcodeStep } from '../Steps/ZipcodeStep';
import Expenses from '../Steps/Expenses/Expenses.tsx';
import HouseholdSize from '../Steps/HouseholdSize';
import { useStepName } from '../../Assets/stepDirectory';
import ReferralSourceStep from '../Steps/Referrer';
import { QUESTION_TITLES } from '../../Assets/pageTitleTags';
import AlreadyHasBenefits from '../Steps/AlreadyHasBenefits';
import ImmediateNeeds from '../Steps/ImmediateNeeds';
import SignUp from '../Steps/SignUp/SignUp';
import HouseholdAssets from '../Steps/HouseholdAssets/HouseholdAssets.tsx';
import './QuestionComponentContainer.css';

const QuestionComponentContainer = () => {
  const { formData } = useContext(Context);
  let { id } = useParams();
  const questionName = useStepName(+id, formData.immutable_referrer);

  useEffect(() => {
    document.title = QUESTION_TITLES[questionName];
  }, [questionName]);

  switch (questionName) {
    case 'zipcode':
      return (
        <main className="benefits-form">
          <ZipcodeStep />
        </main>
      );
    case 'householdSize':
      return (
        <main className="benefits-form">
          <HouseholdSize />
        </main>
      );
    case 'hasExpenses':
      return (
        <main className="benefits-form">
          <Expenses />
        </main>
      );
    case 'householdAssets':
      return (
        <main className="benefits-form">
          <HouseholdAssets />
        </main>
      );
    case 'hasBenefits':
      return (
        <main className="benefits-form">
          <AlreadyHasBenefits />
        </main>
      );
    case 'acuteHHConditions':
      return (
        <main className="benefits-form">
          <ImmediateNeeds />
        </main>
      );
    case 'referralSource':
      return (
        <main className="benefits-form">
          <ReferralSourceStep />
        </main>
      );
    case 'signUpInfo':
      return (
        <main className="benefits-form">
          <SignUp />
        </main>
      );
  }
};

export default QuestionComponentContainer;
