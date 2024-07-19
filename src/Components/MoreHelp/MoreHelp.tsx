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
  const { moreHelpOptions } = useConfig('more_help_options');
  const resources: Resource[] = Object.values(moreHelpOptions);

  const displayResources = (resources: Resource[]) => {
    return resources.map((resource, index) => {
      return (
        <article key={index} className="resource-card-article">
          <h1 className="resource-header" key={index}>
            <FormattedMessage id={resource.name.props.id} defaultMessage={resource.name.props.defaultMessage} />
          </h1>
          {resource.description && (
            <p className="resource-desc">
              <FormattedMessage
                id={resource.description.props.id}
                defaultMessage={resource.description.props.defaultMessage}
              />
            </p>
          )}
          {resource.link && (
            <a href={resource.link} className="resource-link" target="_blank">
              {resource.link}
            </a>
          )}
          {resource.phone && (
            <p className="resource-phone">
              <FormattedMessage id={resource.phone.props.id} defaultMessage={resource.phone.props.defaultMessage} />
            </p>
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
