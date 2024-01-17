import { Typography, Box } from '@mui/material';
import { ReactComponent as Food } from './food.svg';
import { ReactComponent as Housing } from './housing.svg';
import { ReactComponent as HealthCare } from './healthcare.svg';
import benefitCategories from '../../Assets/BenefitCategoryLists/benefitCategories.tsx';
import './CategoryHeading.css';

const textStyle = {
  fontFamily: 'Roboto Slab',
  fontWeight: '700',
  fontSize: '1.25rem',
  color: '#B85A27',
};

const headingOptionsMappings = {
  housing: { icon: Housing, categoryName: benefitCategories.housingAndUtilities },
  food: { icon: Food, categoryName: benefitCategories.foodAndNutrition },
  healthcare: { icon: HealthCare, categoryName: benefitCategories.healthCare },
};

const CategoryHeading = ({ iconKey, amount }) => {
  const { icon: IconComponent, categoryName } = headingOptionsMappings[iconKey];
  const defaultMessage = categoryName?.props?.defaultMessage;

  return (
    <Box className='category-heading-container'>
      <Box display="flex" alignItems="center">
        <div className="category-heading-icon">
          <IconComponent />
        </div>
        <Typography style={textStyle}>
          {defaultMessage}
        </Typography>
      </Box>

      <Box display="flex" alignItems="center" >
        <Typography style={{ ...textStyle, fontWeight: 'normal' }}>
          ${amount}/mo.
        </Typography>
      </Box>
    </Box >
  );
};

export default CategoryHeading;