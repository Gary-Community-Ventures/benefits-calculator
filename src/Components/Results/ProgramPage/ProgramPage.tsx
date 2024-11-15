import { useParams } from 'react-router-dom';
import { Program } from '../../../Types/Results';
import ResultsTranslate from '../Translate/Translate.tsx';
import { headingOptionsMappings } from '../CategoryHeading/CategoryHeading.tsx';
import BackAndSaveButtons from '../BackAndSaveButtons/BackAndSaveButtons.tsx';
import { FormattedMessage } from 'react-intl';
import { useFormatYearlyValue } from '../FormattedValue';
import './ProgramPage.css';
import WarningMessage from '../../WarningComponent/WarningMessage.tsx';
import { useContext } from 'react';
import { Context } from '../../Wrapper/Wrapper';
import { findValidationForProgram, useResultsContext, useResultsLink } from '../Results';
import { deleteValidation, postValidation } from '../../../apiCalls';
import { Language } from '../../../Assets/languageOptions.tsx';
import { allNavigatorLanguages } from './NavigatorLanguages.tsx';

type ProgramPageProps = {
  program: Program;
};

type IconRendererProps = {
  headingType: string;
};

const ProgramPage = ({ program }: ProgramPageProps) => {
  const { uuid } = useParams();
  const { formData, setFormData, staffToken } = useContext(Context);
  const { isAdminView, validations, setValidations, programCategories } = useResultsContext();
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
      setFormData({ ...formData, frozen: true });
    } catch (error) {
      console.error(error);
    }
  };

  const removeValidation = async () => {
    try {
      await deleteValidation(currentValidation?.id, staffToken);
      const newValidations = validations.filter((validation) => validation.id !== currentValidation?.id);
      setValidations(newValidations);
      if (newValidations.length === 0) {
        setFormData({ ...formData, frozen: false });
      }
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

  const category = programCategories.find((category) => {
    for (const categoryProgram of category.programs) {
      if (categoryProgram.external_name === program.external_name) {
        return true;
      }
    }

    return false;
  });

  if (category === undefined) {
    throw new Error(`program with external name "${program.external_name}" is not in a category`);
  }

  const displayIconAndHeader = (program: Program) => {
    return (
      <header className="program-icon-and-header">
        <div className="header-icon-box">
          <IconRenderer headingType={category.icon} />
        </div>
        <div className="header-text">
          <p className="header-text-top">
            <ResultsTranslate translation={category.name} />
          </p>
          <div className="divider"></div>
          <h1 className="header-text-bottom">
            <ResultsTranslate translation={program.name} />
          </h1>
        </div>
      </header>
    );
  };
  const value = useFormatYearlyValue(program);

  const displayEstimatedValueAndTime = (program: Program) => {
    return (
      <section className="estimation">
        <div className="estimation-text">
          <article className="estimation-text-left">
            <FormattedMessage id="results.estimated-annual-value" defaultMessage="Estimated Annual Value" />
          </article>
          <article className="estimation-text-right slim-text">{value}</article>
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

  const backLink = useResultsLink(`/${uuid}/results/benefits`);
  const displayLanguageFlags = (navigatorLanguages: Language[]) => {
    return (
      <div className="navigator-langs-container">
        {navigatorLanguages.map((lang) => {
          return (
            <p className="navigator-lang-flag" key={lang}>
              {allNavigatorLanguages[lang]}
            </p>
          );
        })}
      </div>
    );
  };

  return (
    <main className="program-page-container">
      <section className="back-to-results-button-container">
        <BackAndSaveButtons
          handleTextfieldChange={() => {}}
          navigateToLink={backLink}
          BackToThisPageText={<FormattedMessage id="results.back-to-results-btn" defaultMessage="BACK TO RESULTS" />}
        />
      </section>
      <div className="icon-header-est-values">
        {displayIconAndHeader(program)}
        {displayEstimatedValueAndTime(program)}
      </div>
      <div className="results-program-page-warning-container">
        {program.warning_messages.map((message, key) => {
          return <WarningMessage message={message} key={key} />;
        })}
      </div>
      <div className="apply-button-container">
        <a className="apply-online-button" href={program.apply_button_link.default_message} target="_blank">
          {program.apply_button_description.default_message == '' ? (
            <FormattedMessage id="results.apply-online" defaultMessage="Apply Online" />
          ) : (
            <ResultsTranslate translation={program.apply_button_description} />
          )}
        </a>
        {isAdminView && staffToken !== undefined && formData.isTestData && (
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
                  {navigator.languages && displayLanguageFlags(navigator.languages)}
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
                  {<ResultsTranslate translation={document.text} />}
                  {document.link_url.default_message && document.link_text.default_message && (
                    <span className="required-docs-link">
                      <a href={document.link_url.default_message} target="_blank" className="link-color">
                        <ResultsTranslate translation={document.link_text} />
                      </a>
                    </span>
                  )}
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
