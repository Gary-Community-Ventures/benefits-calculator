import { Link, useParams } from 'react-router-dom';
import { Program } from '../../../Types/Results';
import ResultsTranslate from '../Translate/Translate.tsx';
import { headingOptionsMappings } from '../CategoryHeading/CategoryHeading.tsx';
import BackAndSaveButtons from '../BackAndSaveButtons/BackAndSaveButtons.tsx';
import { FormattedMessage } from 'react-intl';
import './ProgramPage.css';

type ProgramPageProps = {
  program: Program;
};

type IconRendererProps = {
  headingType: string;
};

const ProgramPage = ({ program }: ProgramPageProps) => {
  const { uuid } = useParams();
  const IconRenderer: React.FC<IconRendererProps> = ({ headingType }) => {
    const IconComponent = headingOptionsMappings[headingType];

    if (!IconComponent) {
      return null;
    }

    return <IconComponent />;
  };

  const displayIconAndHeader = (program:Program) => {
    return (
      <header className="program-icon-and-header">
        <div className="header-icon-box">
          <IconRenderer headingType={program.category.default_message} />
        </div>
        <div className="header-text">
          <p className="header-text-top">
            <ResultsTranslate translation={program.category} />
          </p>
          <div className="divider"></div>
          <h1 className="header-text-bottom">{program.name_abbreviated}</h1>
        </div>
      </header>
    );
  };

  const displayEstimatedValueAndTime = (program: Program) => {
    return (
      <section className="estimation">
        <div className="estimation-text">
          <div className="estimation-text-left">
            <FormattedMessage id="results.estimated-annual-value" defaultMessage="Estimated Annual Value" />
          </div>
          <div className="estimation-text-right">${program.estimated_value}</div>
        </div>
        <div className="estimation-text">
          <div className="estimation-text-left">
            <FormattedMessage id="results.estimated-time-to-apply" defaultMessage="Estimated Time to Apply" />
          </div>
          <div className="estimation-text-right">
            <ResultsTranslate translation={program.estimated_application_time} />
          </div>
        </div>
      </section>
    );
  }

  return (
    <article className="program-page-container">
      <section className="back-to-results-button-container">
        <BackAndSaveButtons
          handleTextfieldChange={() => {}}
          navigateToLink={`/${uuid}/results/benefits`}
          BackToThisPageText={<FormattedMessage id="results.back-to-results-btn" defaultMessage="BACK TO RESULTS" />}
        />
      </section>
      {displayIconAndHeader(program)}
      {displayEstimatedValueAndTime(program)}

      <div className="apply-online-button">
        <Link to={program.apply_button_link.default_message} target="_blank" rel="noopener noreferrer">
          <FormattedMessage id="results.apply-online" defaultMessage="Apply Online" />
        </Link>
      </div>

      {program.navigators.length > 0 && (
        <section className="apply-box">
          <h3>
            <FormattedMessage id="results.get-help-applying" defaultMessage="Get Help Applying" />
          </h3>
          <ul className="apply-box-list">
            {program.navigators.map((info, index) => (
              <li key={index} className="apply-info">
                {info.name && <ResultsTranslate translation={info.name} />}
                <div className="address-info">
                  {info.assistance_link.default_message && (
                    <>
                      <a href={info.assistance_link.default_message}>
                        <FormattedMessage id="results.visit-webiste" defaultMessage="Visit Website" />
                      </a>
                      <br />
                    </>
                  )}
                  {info.email.default_message && (
                    <>
                      <a href={`mailto:${info.email}`}>
                        <ResultsTranslate translation={info.email} />
                      </a>
                      <br />
                    </>
                  )}
                  {info.phone_number && (
                    <a href={`tel:${info.phone_number}`}>
                      <FormattedMessage id="results.phone-number" defaultMessage={info.phone_number} />
                    </a>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </section>
      )}
      {program.documents.length > 0 && (
        <section className="required-docs">
          <h3>
            <FormattedMessage id="results.required-documents-checklist" defaultMessage="Required Documents Checklist" />
          </h3>
          <ul className="required-docs-list">
            {program.documents.map((document, index) => (
              <li key={index}>
                <ResultsTranslate translation={document} />
              </li>
            ))}
          </ul>
        </section>
      )}
      <section className="program-description">
        <ResultsTranslate translation={program.description} />
      </section>
    </article>
  );
};

export default ProgramPage;
