import { ReactComponent as Baby_supplies } from './icons/UrgentNeeds/AcuteConditions/baby_supplies.svg';
import { ReactComponent as Child_development } from './icons/UrgentNeeds/AcuteConditions/child_development.svg';
import { ReactComponent as Dental_care } from './icons/UrgentNeeds/AcuteConditions/dental_care.svg';
import { ReactComponent as Family_planning } from './icons/UrgentNeeds/AcuteConditions/family_planning.svg';
// import { ReactComponent as Food } from './icons/UrgentNeeds/AcuteConditions/food.svg';
import { ReactComponent as Food } from './icons/Programs/CategoryHeading/food.svg';
import { ReactComponent as Housing } from './icons/UrgentNeeds/AcuteConditions/housing.svg';
import { ReactComponent as Job_resources } from './icons/UrgentNeeds/AcuteConditions/job_resources.svg';
import { ReactComponent as Legal_services } from './icons/UrgentNeeds/AcuteConditions/legal_services.svg';
import { ReactComponent as Support } from './icons/UrgentNeeds/AcuteConditions/support.svg';
import { ReactComponent as Military } from './icons/UrgentNeeds/AcuteConditions/military.svg';
import { ComponentType } from 'react';

// NOTE: keys must be lower case
export const acuteConditionResultMapping: { [key: string]: ComponentType } = {
  'food or groceries': Food,
  'baby supplies': Baby_supplies,
  'managing housing costs': Housing,
  'behavioral health': Support,
  "child's development": Child_development,
  'family planning': Family_planning,
  'job resources': Job_resources,
  'low-cost dental care': Dental_care,
  'civil legal needs': Legal_services,
  'veterans resources': Military,
};
