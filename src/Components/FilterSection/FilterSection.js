import FilterListIcon from '@mui/icons-material/FilterList';
import { Button } from '@mui/material';
import './FilterSection.css';

const FilterSection = () => {

  return (
    <div className='filter-button-container'>
      <FilterListIcon sx={{ mr: '.5rem', color: '#037A93' }} />
      <Button
        id='citizenshipOpen'
        variant='contained'
        className='filter-button citizen'
        onClick={(event) => handleFilterButton(event)}
      >
        Citizenship
      </Button>
      <Button
        id='otherOpen'
        variant='contained'
        className='filter-button other'
        onClick={(event) => handleFilterButton(event)}
      >
        Other
      </Button>
      <Button
        id='resetOpen'
        variant='contained'
        className='filter-button'
        onClick={(event) => handleFilterButton(event)}
      >
        Reset
      </Button>
    </div>
  );
}

export default FilterSection;