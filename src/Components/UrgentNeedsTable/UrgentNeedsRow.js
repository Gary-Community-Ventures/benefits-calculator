import { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';

const UrgentNeedsRow = ({ rowProps }) => {
  const [open, setOpen] = useState(false);

  const formatPhoneNumber = (phoneNumberString) => {
    const cleaned = ('' + phoneNumberString).replace(/\D/g, '');
    const match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      const intlCode = match[1] ? '+1 ' : '';
      return [intlCode, '(', match[2], ') ', match[3], '-', match[4]].join('');
    }
  }

    return (
      <>
        <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
          <TableCell>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
          <TableCell component="th" scope="row" align='left'>
            {rowProps.name}
          </TableCell>
          <TableCell>{rowProps.type}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell></TableCell>
          <TableCell colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box>
                <Typography variant="body2" gutterBottom component="div">
                  {rowProps.description}
                </Typography>
                {rowProps.phone_number.length && 
                  <h4>
                    Phone Number: {formatPhoneNumber(rowProps.phone_number)}
                  </h4>
                }
                <Button
                  variant='contained'
                  target='_blank'
                  href={rowProps.link}
                  sx={{ marginTop: '1rem'}}>
                  <FormattedMessage 
                    id='urgentNeedsTable.visit-website-button' 
                    defaultMessage='Visit website' />
                </Button>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </>
    );
}

export default UrgentNeedsRow;