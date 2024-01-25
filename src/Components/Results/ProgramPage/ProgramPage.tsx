import { useNavigate, Link, useParams } from 'react-router-dom';
import { Program } from '../../../Types/Results';
import ResultsTranslate from '../Translate/Translate.tsx';
import { headingOptionsMappings } from '../CategoryHeading/CategoryHeading.tsx';
import './ProgramPage.css';

type ProgramPageProps = {
  program: Program;
};

type IconRendererProps = {
  headingType: string;
};

const ProgramPage = ({ program }: ProgramPageProps) => {
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
        <button>back to results</button> {/*  onClick={() => navigate(`/${uuid}/results/benefits`)} */}
        <button>save this result</button>
      </section>

      <header className="program-header">
        <div className="header-icon-box">
          <div className="header-icon">
            <IconRenderer headingType={program.category.default_message} />
          </div>
        </div>

        <div className="header-text">
          <p className="header-text-top">
            <ResultsTranslate translation={program.category} />
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

      <div className="apply-online-button">
        <Link to={program.apply_button_link.default_message} target="_blank" rel="noopener noreferrer">
          Apply Online
        </Link>
      </div>

      <section className="apply-box">
        <h3>Get Help Applying</h3>
        <ul className="apply-box-list">
          {program.navigators.map((info, index) => (
            <li key={index} className="apply-info">
              <ResultsTranslate translation={info.name} />
              <address className="address-info">
                <p>Address bla bla bla</p>
                <a href={info.assistance_link.default_message}>Visit Website</a>
                <br />
                <a href={`mailto:${info.email}`}>{info.email.default_message}someone@somewhere.com</a>
                <br />
                <a href={`tel:${info.phone_number}`}>{info.phone_number}123.123.1233</a>
              </address>
            </li>
          ))}
        </ul>
      </section>

      <section className="required-docs">
        <h3>Required Documents Checklist</h3>
        <ul className="required-docs-list">
          <li>a</li>
          <li>b</li>
          <li>c</li>
          {/* {program.documents.map((document, index) => (
            <li key={index}>
              <ResultsTranslate translation={document} />
            </li>
          ))} */}
        </ul>
      </section>

      <section className="program-description">
        <ResultsTranslate translation={program.description} />
      </section>
    </article>
  );
};

export default ProgramPage;
