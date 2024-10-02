import { FormattedMessage } from 'react-intl';
import { useConfig } from '../Config/configHook.tsx';
import './MoreHelp.css';

type Resource = {
  name: JSX.Element;
  description?: JSX.Element;
  link?: string;
  phone?: JSX.Element;
  label?: string;
};

const MoreHelp = () => {
  // const resources: Resource[] = [
  //   {
  //     name: '2-1-1 North Carolina',
  //     link: 'https://nc211.org/',
  //     phone: 'Dial 2-1-1 or 866.760.6489',
  //   },
  //   // {
  //   //   name: 'Family Resource Center Association',
  //   //   description:
  //   //     'Your local family resource center may be able to connect you to other resources and support services. Visit a center near you.',
  //   //   link: 'https://maps.cofamilycenters.org',
  //   // },
  // ];
  const { moreHelpOptions } = useConfig('more_help_options');
  const resources: Resource[] = Object.values(moreHelpOptions);

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
