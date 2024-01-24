import { useNavigate, Link, useParams } from 'react-router-dom';
import { Program } from '../../../Types/Results';
import ResultsTranslate from '../Translate/Translate.tsx';
import './ProgramPage.css';
import BackToResults from './BackToResults.tsx';
import SaveResult from './SaveResult.tsx';
import { headingOptionsMappings } from '../CategoryHeading/CategoryHeading.tsx';

type ProgramPageProps = {
  program: Program;
};

type IconRendererProps = {
  headingType: string;
};

const ProgramPage = ({ program }: ProgramPageProps) => {
  const { uuid, programId } = useParams();

  const IconRenderer: React.FC<IconRendererProps> = ({ headingType }) => {
    const IconComponent = headingOptionsMappings[headingType];

    if (!IconComponent) {
      return null;
    }

    return <IconComponent />;
  };

  return (
    <article className="program-page-container">
      <section className="back-to-results-button-container">
        <BackToResults />
      </section>

      <header className="program-header">
        <div className="header-icon">
          <div className="program-icon">
            <IconRenderer headingType={program.category.default_message} />
          </div>
        </div>

        <div className="header-text">
          <p className="header-text-top">
            <ResultsTranslate translation={program.name} />
          </p>
          <div className="divider"></div>
          <h1 className="header-text-bottom">{program.name_abbreviated}</h1>
        </div>
      </header>

      <section className="estimation">
        <div className="estimation-text">
          <div className="estimation-text-left">Estimated Annual Value</div>
          <div className="estimation-text-right">${program.estimated_value}</div>
        </div>
        <div className="estimation-text">
          <div className="estimation-text-left">Estimated Time to Apply</div>
          <div className="estimation-text-right">
            <ResultsTranslate translation={program.estimated_application_time} />
          </div>
        </div>
      </section>

      <div className="button help-button">
        <Link to={`/${uuid}/results/benefits/${programId}/navigators`}>Get help</Link>
      </div>
      <div className="button apply-button">
        <Link to={program.apply_button_link.default_message}>Apply Now</Link>
      </div>

      <section className="required-docs">
        <h3>Required Documents Checklist</h3>
        <ul className="required-docs-list">
          <li>a</li>
          <li>b</li>
          <li>c</li>
          {/* {program.documents.map((document, index) => (
            <li key={index}>{document}</li>
          ))} */}
        </ul>
      </section>

      <section className="program-description">
        <ResultsTranslate translation={program.description} />
      </section>

      <SaveResult />
    </article>
  );
};

export default ProgramPage;
