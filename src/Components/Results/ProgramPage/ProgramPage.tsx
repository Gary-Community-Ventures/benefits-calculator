import { Link, useParams } from 'react-router-dom';
import { Program } from '../../../Types/Results';
import { ReactComponent as Food } from '../../../Assets/CategoryHeadingIcons/food.svg';
import { ReactComponent as Housing } from '../../../Assets/CategoryHeadingIcons/housing.svg';
import { ReactComponent as HealthCare } from '../../../Assets/CategoryHeadingIcons/healthcare.svg';
import ResultsTranslate from '../Translate/Translate.tsx';
import { calculateTotalValue, useResultsContext } from '../Results';
import PreviousButton from '../../PreviousButton/PreviousButton.tsx';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import { Button } from '@mui/material';
import { FormattedMessage } from 'react-intl';
import './ProgramPage.css';

type ProgramPageProps = {
  program: Program;
};

// const headingOptionsMappings: { [key: string]: { icon: React.ComponentType<any> } } = {
//   'Housing and Utilities': { icon: Housing },
//   'Food and Nutrition': { icon: Food },
//   'Health Care': { icon: HealthCare },
//   Transportation: { icon: HealthCare }, // placeholder icon
// };

const ProgramPage = ({ program }: ProgramPageProps) => {
  const { uuid, programId } = useParams();
  // console.log('program: ', program);

  // //need to come back for estimated time value
  return (
    <div className="program-container">
      <Button variant="outlined" onClick={() => {}} startIcon={<NavigateBeforeIcon sx={{ mr: '-8px' }} />}>
        <FormattedMessage id="backToResultsButton" defaultMessage="Back to results" />
      </Button>

      <div className="program-header">
        <div className="header-icon">
          <div className="program-icon">
            <HealthCare />
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
        <div className="divider1"></div>
        <div className="estimation-text">
          <div className="left">Estimated Time to Apply</div>
          <div className="right">{program.program_id} Min</div>
        </div>
        <div className="divider1"></div>
      </div>

      <div className="help-button">
        <Link to={`/${uuid}/results/benefits/${programId}/navigators`}>Get help</Link>
      </div>
      <div className="apply-button">
        <Link to={`/${uuid}/results/benefits/${programId}/navigators`}>Apply Now</Link>
      </div>

      <div className="required-docs">
        <div>Required Documents Checklist</div>
        <div className="required-docs-list">
          <li>a</li>
          <li>b</li>
        </div>
      </div>
      <div className="apply-button">Save this results button</div>
    </div>
  );
};

export default ProgramPage;
