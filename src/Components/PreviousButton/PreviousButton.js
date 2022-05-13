import { Button } from '@mui/material';

const PreviousButton = ({ page, setPage }) => {
  return (
    <Button
      onClick={() => {
        setPage(page - 1);
      }}
      variant='contained'>
      Prev
    </Button>
  );
}

export default PreviousButton;