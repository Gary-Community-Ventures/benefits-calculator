import { FormattedMessage } from 'react-intl';
import './MoreHelp.css';

type Resource = {
  name: string;
  description?: string;
  link?: string;
  phone?: string;
};

const MoreHelp = () => {
  const resources: Resource[] = [
    {
      name: '2-1-1 Colorado',
      link: 'https://www.211colorado.org',
      phone: 'Dial 2-1-1 or 866.760.6489',
    },
    {
      name: 'Family Resource Center Association',
      description:
        'Your local family resource center may be able to connect you to other resources and support services. Visit a center near you.',
      link: 'https://maps.cofamilycenters.org',
    },
  ];

  const displayResources = (resources: Resource[]) => {
    return resources.map((resource) => {
      return (
        <article key={resource.name} className="resource-card-article">
          <h1 className="resource-header" key={resource.name}>
            {resource.name}
          </h1>
          {resource.description && <p className="resource-desc">{resource.description}</p>}
          {resource.link && (
            <a href={resource.link} className="resource-link" target="_blank">
              {resource.link}
            </a>
          )}
          {resource.phone && (
            <a href={`tel:${resource.phone}`} className="resource-phone" target="_blank">
              {resource.phone}
            </a>
          )}
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
