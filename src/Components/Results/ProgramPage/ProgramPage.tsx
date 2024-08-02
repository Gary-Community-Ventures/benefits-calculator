import { useParams } from 'react-router-dom';
import { Program } from '../../../Types/Results';
import ResultsTranslate from '../Translate/Translate.tsx';
import { headingOptionsMappings } from '../CategoryHeading/CategoryHeading.tsx';
import BackAndSaveButtons from '../BackAndSaveButtons/BackAndSaveButtons.tsx';
import { FormattedMessage } from 'react-intl';
import { formatYearlyValue } from '../FormattedValue';
import './ProgramPage.css';
import WarningMessage from '../../WarningComponent/WarningMessage.tsx';
import { useContext } from 'react';
import { Context } from '../../Wrapper/Wrapper';
import { findValidationForProgram, useResultsContext } from '../Results';
import { deleteValidation, postValidation } from '../../../apiCalls';

type ProgramPageProps = {
  program: Program;
};

type IconRendererProps = {
  headingType: string;
};

const ProgramPage = ({ program }: ProgramPageProps) => {
  const { uuid } = useParams();
  const { locale, staffToken } = useContext(Context);
  const { isAdminView, validations, setValidations } = useResultsContext();
  const IconRenderer: React.FC<IconRendererProps> = ({ headingType }) => {
    const IconComponent = headingOptionsMappings[headingType];

    if (!IconComponent) {
      return null;
    }

    return <IconComponent />;
  };
  const currentValidation = findValidationForProgram(validations, program);

  const saveValidation = async () => {
    const body = {
      screen_uuid: uuid,
      program_name: program.external_name,
      eligible: program.eligible,
      value: program.estimated_value,
    };

    try {
      const response = await postValidation(body, staffToken);
      setValidations([...validations, response]);
    } catch (error) {
      console.error(error);
    }
  };

  const removeValidation = async () => {
    try {
      await deleteValidation(currentValidation?.id, staffToken);
      setValidations(validations.filter((validation) => validation.id !== currentValidation?.id));
    } catch (error) {
      console.error(error);
    }
  };

  const toggleValidation = async () => {
    if (currentValidation !== undefined) {
      removeValidation();
      return;
    }

    saveValidation();
  };

  const displayIconAndHeader = (program: Program) => {
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
          <h1 className="header-text-bottom">
            <ResultsTranslate translation={program.name} />
          </h1>
        </div>
      </header>
    );
  };

  const displayEstimatedValueAndTime = (program: Program) => {
    return (
      <section className="estimation">
        <div className="estimation-text">
          <article className="estimation-text-left">
            <FormattedMessage id="results.estimated-annual-value" defaultMessage="Estimated Annual Value" />
          </article>
          <article className="estimation-text-right slim-text">{formatYearlyValue(program, locale)}</article>
        </div>
        <div className="estimation-text">
          <article className="estimation-text-left">
            <FormattedMessage id="results.estimated-time-to-apply" defaultMessage="Estimated Time to Apply" />
          </article>
          <article className="slim-text">
            <ResultsTranslate translation={program.estimated_application_time} />
          </article>
        </div>
      </section>
    );
  };

  return (
    <main className="program-page-container">
      <section className="back-to-results-button-container">
        <BackAndSaveButtons
          handleTextfieldChange={() => {}}
          navigateToLink={`/${uuid}/results/benefits`}
          BackToThisPageText={<FormattedMessage id="results.back-to-results-btn" defaultMessage="BACK TO RESULTS" />}
        />
      </section>
      <div className="icon-header-est-values">
        {displayIconAndHeader(program)}
        {displayEstimatedValueAndTime(program)}
      </div>
      {program.warning.default_message && <WarningMessage message={program.warning} />}
      {program.multiple_tax_units && (
        <WarningMessage
          message={{
            label: 'results.multiple_tax_units.warning',
            default_message:
              'There may be members of your household who are not part of your "tax household." Ask them to complete this tool to determine if they qualify for this benefit.',
          }}
        />
      )}
      <div className="apply-button-container">
        <a className="apply-online-button" href={program.apply_button_link.default_message} target="_blank">
          <FormattedMessage id="results.apply-online" defaultMessage="Apply Online" />
        </a>
        {isAdminView && (
          <button className="apply-online-button" onClick={toggleValidation}>
            {currentValidation === undefined ? (
              <FormattedMessage id="results.validations.button.add" defaultMessage="Create Validation" />
            ) : (
              <FormattedMessage id="results.validations.button.remove" defaultMessage="Remove Validation" />
            )}
          </button>
        )}
      </div>
      <div className="content-width">
        {program.navigators.length > 0 && (
          <section className="apply-box">
            <h2 className="content-header">
              <FormattedMessage id="results.get-help-applying" defaultMessage="Get Help Applying" />
            </h2>
            <ul className="apply-box-list">
              {program.navigators.map((navigator, index) => (
                <li key={index} className="apply-info">
                  {navigator.name && (
                    <p className="navigator-name">
                      <ResultsTranslate translation={navigator.name} />
                    </p>
                  )}
                  <div className="address-info">
                    {navigator.description && (
                      <p className="navigator-desc">
                        <ResultsTranslate translation={navigator.description} />
                      </p>
                    )}
                    {navigator.assistance_link.default_message && (
                      <div>
                        <a href={navigator.assistance_link.default_message} target="_blank" className="link-color">
                          <FormattedMessage id="results.visit-webiste" defaultMessage="Visit Website" />
                        </a>
                      </div>
                    )}
                    {navigator.email.default_message && (
                      <div>
                        <a href={`mailto:${navigator.email}`} className="link-color email-link">
                          <ResultsTranslate translation={navigator.email} />
                        </a>
                      </div>
                    )}
                    {navigator.phone_number && (
                      <div>
                        <a href={`tel:${navigator.phone_number}`} className="link-color phone-link">
                          {navigator.phone_number}
                        </a>
                      </div>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </section>
        )}
        {program.documents.length > 0 && (
          <section className="required-docs">
            <h3 className="content-header">
              <FormattedMessage
                id="results.required-documents-checklist"
                defaultMessage="Required Key Documents Checklist"
              />
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
      </div>
    </main>
  );
};

export default ProgramPage;
