import { Link, useParams } from 'react-router-dom';
import { Program } from '../../../Types/Results';
import { FormattedMessage } from 'react-intl';
import ResultsTranslate from '../Translate/Translate';

type ProgramCardProps = {
  program: Program;
};

const ProgramCard = ({ program }: ProgramCardProps) => {
  const { uuid } = useParams();

  const windowWidth = window.innerWidth;

  const estimatedAppTime = program.estimated_application_time;
  const estimatedSavings = program.estimated_value;
  const programName = program.name;
  const programId = program.program_id;

  type ConditonalWrapperProps = {
    children: React.ReactElement;
    condition: boolean;
    wrapper: (children: React.ReactElement) => JSX.Element;
  };
  const ConditonalWrapper: React.FC<ConditonalWrapperProps> = ({ condition, wrapper, children }) =>
    condition ? wrapper(children) : children;
  const isMobile = windowWidth ? (windowWidth <= 700 ? true : false) : false;

  return (
    <div className="result-program-container">
      <ConditonalWrapper
        condition={isMobile}
        wrapper={(children) => <div className="result-program-more-info-wrapper">{children}</div>}
      >
        <>
          <div className="result-program-more-info">
            <ResultsTranslate translation={programName} />
          </div>
          {isMobile && (
            <div className="result-program-more-info-button">
              <Link to={`/${uuid}/results/benefits/${programId}`}>
                <FormattedMessage id="more-info" defaultMessage="More Info" />
              </Link>
            </div>
          )}
        </>
      </ConditonalWrapper>
      <hr />
      <div className="result-program-details-wrapper">
        <div className="result-program-details">
          <div className="result-program-details-box">
            <FormattedMessage id="results.estimated_application_time" defaultMessage="Application Time: " />
          </div>
          <div className="result-program-details-box">
            <strong>
              <ResultsTranslate translation={estimatedAppTime} />
            </strong>
          </div>
        </div>
        <div className="result-program-details">
          <div className="result-program-details-box">
            <FormattedMessage id="results.estimated_application_time" defaultMessage="Estimated Savings: " />
          </div>
          <div className="result-program-details-box">
            <strong>{`$${estimatedSavings}/mo`}</strong>
          </div>
        </div>
      </div>
      {!isMobile && (
        <div className="result-program-more-info-button">
          <Link to={`/${uuid}/results/benefits/${programId}`}>
            <FormattedMessage id="more-info" defaultMessage="More Info" />
          </Link>
        </div>
      )}
    </div>
  );
};

export default ProgramCard;
