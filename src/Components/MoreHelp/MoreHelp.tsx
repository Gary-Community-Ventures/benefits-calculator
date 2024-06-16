import { FormattedMessage } from 'react-intl';
import { useContext } from 'react';
import { Context } from '../Wrapper/Wrapper.tsx';
import './MoreHelp.css';

type Resource = {
  name: JSX.Element;
  description?: JSX.Element;
  link?: string;
  phone?: JSX.Element;
};

const MoreHelp = () => {
  const { config } = useContext(Context);
  const { more_help } = config ?? {};
  const resources: Resource[] = [
    {
      name: <FormattedMessage id="moreHelp.resource_name" defaultMessage="2-1-1 Colorado" />,
      link: more_help?.resource211Link,
      phone: (
        <a href={more_help?.resourcePhone} className="resource-phone" target="_blank">
          <FormattedMessage id="moreHelp.resource_phone" defaultMessage="Dial 2-1-1 or 866.760.6489" />
        </a>
      ),
    },
    {
      name: <FormattedMessage id="moreHelp.resource_FRCA-name" defaultMessage="Family Resource Center Association" />,
      description: (
        <FormattedMessage
          id="moreHelp.resource_FRCA-description"
          defaultMessage="Your local family resource center may be able to connect you to other resources and support services. Visit a center near you."
        />
      ),
      link: more_help?.resourceFRCALink,
    },
  ];

  const displayResources = (resources: Resource[]) => {
    return resources.map((resource, index) => {
      return (
        <article key={index} className="resource-card-article">
          <h1 className="resource-header" key={index}>
            {resource.name}
          </h1>
          {resource.description && <p className="resource-desc">{resource.description}</p>}
          {resource.link && (
            <a href={resource.link} className="resource-link" target="_blank">
              {resource.link}
            </a>
          )}
          {resource.phone && <p className="resource-phone">{resource.phone}</p>}
        </article>
      );
    });
  };

  return (
    <div className="more-help-container">
      <div className="underline-header-container">
        <h1 className="more-help-header">
          <FormattedMessage id="moreHelp.header" defaultMessage="Other Resources Near You" />
        </h1>
      </div>
      {displayResources(resources)}
    </div>
  );
};

export default MoreHelp;
