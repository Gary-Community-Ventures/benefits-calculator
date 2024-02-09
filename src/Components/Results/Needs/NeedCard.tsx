import { FormattedMessage, useIntl } from 'react-intl';
import { UrgentNeed } from '../../../Types/Results';
import ResultsTranslate from '../Translate/Translate';
import { acuteConditionResultMapping } from '../../../Assets/acuteConditionOptions';

type NeedsCardProps = {
  need: UrgentNeed;
};

interface ResponseObject {
  icon: React.ReactNode | null;
  defaultMessage: string;
}

const getIconAndDefaultMessage = (
  messageType: string,
  acuteConditionResultMapping: Record<string, any>,
): ResponseObject => {
  const matchingType = Object.keys(acuteConditionResultMapping).find(
    (key) => acuteConditionResultMapping[key]?.api_default_message.toLowerCase() === messageType.toLowerCase(),
  );

  if (matchingType) {
    const { icon, default_message } = acuteConditionResultMapping[matchingType];
    return { icon, defaultMessage: default_message };
  }

  return { icon: null, defaultMessage: '' };
};

const NeedCard = ({ need }: NeedsCardProps) => {
  const intl = useIntl();

  const needLink = need.link.default_message;
  const translatedLink = intl.formatMessage({ id: need.link.label, defaultMessage: needLink });

  const needType = need.type.default_message;
  const urgentNeed = getIconAndDefaultMessage(needType, acuteConditionResultMapping);

  return (
    <div className="result-program-container">
      <div className="result-resource-more-info">
        {urgentNeed.icon}
        <span>
          <ResultsTranslate translation={need.type} />
          <strong>
            <ResultsTranslate translation={need.name} />
          </strong>
        </span>
        <a className="resource-more-info" href={translatedLink} target="_blank" rel="noreferrer">
          <FormattedMessage id="more-info" defaultMessage="More Info" />
        </a>
      </div>
    </div>
  );
};

export default NeedCard;
