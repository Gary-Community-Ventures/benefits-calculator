import { FormattedMessage, useIntl } from 'react-intl';
import { useState } from 'react';
import { UrgentNeed } from '../../../Types/Results';
import ResultsTranslate from '../Translate/Translate';
import { acuteConditionResultMapping } from '../../../Assets/acuteConditionOptions';
import './NeedCard.css';

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
  const [infoIsOpen, setInfoIsOpen] = useState(false);

  const needLink = need.link.default_message;
  const translatedLink = intl.formatMessage({ id: need.link.label, defaultMessage: needLink });

  const needType = need.type.default_message;
  const urgentNeed = getIconAndDefaultMessage(needType, acuteConditionResultMapping);
  const translatedNeedDesc = intl.formatMessage({
    id: need.description.label,
    defaultMessage: need.description.default_message,
  });

  return (
    <div className="need-card-container">
      <div className="header-and-button-divider">
        <div className="result-resource-more-info">
          {urgentNeed.icon}
          <span>
            <ResultsTranslate translation={need.type} />
            <strong>
              <ResultsTranslate translation={need.name} />
            </strong>
          </span>
        </div>
        <button
          className="more-info-btn"
          onClick={() => {
            setInfoIsOpen(!infoIsOpen);
          }}
        >
          <FormattedMessage id="more-info" defaultMessage="More Info" />
        </button>
      </div>
      {infoIsOpen && (
        <>
          <article className="need-desc-paragraph">{translatedNeedDesc}</article>
          <a href={`tel:${need.phone_number}`} className="phone-number">
            {need.phone_number && need.phone_number}
          </a>
          <div className="visit-website-btn-container">
            <button onClick={() => window.open(translatedLink, '_blank')} className="visit-website-btn">
              <FormattedMessage id="visit-website-btn" defaultMessage="Visit Website" />
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default NeedCard;
