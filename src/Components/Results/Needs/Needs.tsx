import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { useResultsContext, useResultsLink } from '../Results';
import NeedCard from './NeedCard';
import { ResultsMessageForNeeds } from '../../Referrer/Referrer';
import InformationalText from '../../Common/InformationalText/InformationalText';

const Needs = () => {
  const { needs } = useResultsContext();
  const needsSortedByCategory = needs.sort((a, b) => {
    if (a.type.default_message > b.type.default_message) {
      return 1;
    } else if (a.type.default_message < b.type.default_message) {
      return -1;
    }

    return 0;
  });

  const immediateNeedsLink = useResultsLink('step-9');

  return (
    <>
      <ResultsMessageForNeeds />
      <InformationalText>
        <FormattedMessage
          id="nearTermBenefits.editSelections"
          defaultMessage="If you would like to see additional types of resources, please edit your selections in {thisStepLink}."
          values={{
            thisStepLink: (
              <Link to={immediateNeedsLink}>
                <FormattedMessage id="nearTermBenefits.thisStep" defaultMessage="this step" />
              </Link>
            ),
          }}
        />
      </InformationalText>
      {needsSortedByCategory.map((need, index) => {
        return <NeedCard need={need} key={index} />;
      })}
    </>
  );
};

export default Needs;
