import { FormattedMessage, useIntl } from 'react-intl';
import { ComponentType, useState } from 'react';
import { UrgentNeed } from '../../../Types/Results';
import ResultsTranslate from '../Translate/Translate';
import { acuteConditionResultMapping } from '../../../Assets/acuteConditionOptions';
import { formatPhoneNumber } from '../helpers';
import './NeedCard.css';

type NeedsCardProps = {
  need: UrgentNeed;
};

const getIcon = (messageType: string, acuteConditionResultMapping: Record<string, ComponentType>) => {
  const Icon = acuteConditionResultMapping[messageType];

  if (Icon !== undefined) {
    return <Icon />;
  }

  return null;
};

const NeedCard = ({ need }: NeedsCardProps) => {
  const intl = useIntl();
  const [infoIsOpen, setInfoIsOpen] = useState(false);

  let translatedLink = '';
  if (need.link.default_message !== '') {
    translatedLink = intl.formatMessage({ id: need.link.label, defaultMessage: need.link.default_message });
  }

  const needType = need.type.default_message.toLowerCase();
  const icon = getIcon(needType, acuteConditionResultMapping);
  const translatedNeedDesc = intl.formatMessage({
    id: need.description.label,
    defaultMessage: need.description.default_message,
  });

  return (
    <div className="need-card-container">
      <div className="header-and-button-divider">
        <div className="result-resource-more-info">
          {icon}
          <span>
            <ResultsTranslate translation={need.type} />
            <strong>
              <ResultsTranslate translation={need.name} />
            </strong>
          </span>
        </div>
        <button
          className={infoIsOpen ? 'more-info-btn-open' : 'more-info-btn'}
          onClick={() => {
            setInfoIsOpen(!infoIsOpen);
          }}
        >
          <FormattedMessage id="more-info" defaultMessage="More Info" />
        </button>
      </div>
      {infoIsOpen && (
        <>
          <p className="need-desc-paragraph">{translatedNeedDesc}</p>
          {need.phone_number && (
            <a href={`tel:${need.phone_number}`} className="phone-number">
              {formatPhoneNumber(need.phone_number)}
            </a>
          )}
          {translatedLink !== '' && (
            <div className="visit-website-btn-container">
              <a href={translatedLink} target="_blank" className="visit-website-btn">
                <FormattedMessage id="visit-website-btn" defaultMessage="Visit Website" />
              </a>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default NeedCard;
