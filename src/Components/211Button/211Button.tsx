import './211Button.css';
import { Link, Button } from '@mui/material';

const HelpButton = () => {
  return (
    <Button className="hover-button">
      <Link href="https://www.211colorado.org/" target="_blank" aria-label="More Help at 2-1-1" className="button211">
        More Help at 2-1-1
      </Link>
    </Button>
  );
};

export default HelpButton;
