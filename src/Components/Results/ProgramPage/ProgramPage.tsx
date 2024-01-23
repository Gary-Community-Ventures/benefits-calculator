import { useNavigate, Link, useParams } from 'react-router-dom';
import { Program } from '../../../Types/Results';
import ResultsTranslate from '../Translate/Translate.tsx';
import './ProgramPage.css';
import BackToResults from '../Buttons/BackToResults.tsx';
import SaveResult from '../Buttons/SaveResult.tsx';
import { headingOptionsMappings } from '../CategoryHeading/CategoryHeading.tsx';

type ProgramPageProps = {
  program: Program;
};

const ProgramPage = ({ program }: ProgramPageProps) => {
  const { uuid, programId } = useParams();

  type IconRendererProps = {
    headingType: string;
  };

  const IconRenderer: React.FC<IconRendererProps> = ({ headingType }) => {
    const IconComponent = headingOptionsMappings[headingType];

    if (!IconComponent) {
      return null;
    }

    return <IconComponent />;
  };

  // //need to come back for estimated time value
  return (
    <div className="program-container">
      <div className="back-to-results-button-container">
        <BackToResults />
      </div>
      <div className="program-header">
        <div className="header-icon">
          <div className="program-icon">
            <IconRenderer headingType={program.category.default_message} />
          </div>
        </div>

        <div className="header-text">
          <p className="top">{program.name.default_message}</p>
          <div className="divider"></div>
          <h1 className="bottom">{program.name_abbreviated}</h1>
        </div>
      </div>

      <div className="estimation">
        <div className="estimation-text">
          <div className="left">Estimated Annual Value</div>
          <div className="right">${program.program_id}</div>
        </div>
        <div className="estimation-text">
          <div className="left">Estimated Time to Apply</div>
          <div className="right">{program.program_id} Min</div>
        </div>
      </div>

      <div className="button help-button">
        <Link to={`/${uuid}/results/benefits/${programId}/navigators`}>Get help</Link>
      </div>
      <div className="button apply-button">
        <Link to={program.apply_button_link.default_message}>Apply Now</Link>
      </div>

      <div className="required-docs">
        <div>Required Documents Checklist</div>
        <div className="required-docs-list">
          <li>a</li>
          <li>b</li>
        </div>
      </div>
      <div className="program-description">
        <ResultsTranslate translation={program.description} />
      </div>
      <SaveResult />
    </div>
  );
};

export default ProgramPage;
