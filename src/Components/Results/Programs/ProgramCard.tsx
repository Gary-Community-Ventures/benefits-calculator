import { Link, useParams } from 'react-router-dom';
import { Program } from '../../../Types/Results';
import { FormattedMessage } from 'react-intl';
import { formatMonthlyValue } from '../FormattedValue';
import ResultsTranslate from '../Translate/Translate';
import { useEffect, useState } from 'react';
import './ProgramCard.css';

type ProgramCardProps = {
  program: Program;
};

const ProgramCard = ({ program }: ProgramCardProps) => {
  const { uuid } = useParams();

  const estimatedAppTime = program.estimated_application_time;
  const programName = program.name;
  const programId = program.program_id;
  const windowWidth = window.innerWidth;
  const [size, setSize] = useState(windowWidth);

  useEffect(() => {
    function handleResize() {
      setSize(window.innerWidth);
    }
    // Attach the event listener to the window object
    window.addEventListener('resize', handleResize);

    // Remove the event listener when the component unmounts
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const isMobile = size < 769 ? true : false;

  type ConditonalWrapperProps = {
    children: React.ReactElement;
    condition: boolean;
    wrapper: (children: React.ReactElement) => JSX.Element;
  };
  const ConditonalWrapper: React.FC<ConditonalWrapperProps> = ({ condition, wrapper, children }) =>
    condition ? wrapper(children) : children;
  return (
    <div className="result-program-container">
      <div className="result-program-flags-container">
        {program.new && (
          <div className="new-program-flag">
            <FormattedMessage id="results-new-benefit-flag" defaultMessage="New Benefit" />
          </div>
        )}
        {program.low_confidence && (
          <div className="low-confidence-flag" style={{ marginLeft: program.new ? '-0.5rem' : '0' }}>
            <FormattedMessage id="results-low-confidence-flag" defaultMessage="Low Confidence" />
          </div>
        )}
      </div>
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
            <FormattedMessage id="program-card.estimated-savings" defaultMessage="Estimated Savings: " />
          </div>
          <div className="result-program-details-box">
            <strong>{formatMonthlyValue(program)}</strong>
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
