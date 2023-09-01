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
import './UrgentNeedsRow.css';
import dataLayerPush from '../../Assets/analytics';

const UrgentNeedsRow = ({ rowProps }) => {
  const [open, setOpen] = useState(false);

  const formatPhoneNumber = (phoneNumberString) => {
    const cleaned = ('' + phoneNumberString).replace(/\D/g, '');
    const match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      const intlCode = match[1] ? '+1 ' : '';
      return [intlCode, '(', match[2], ') ', match[3], '-', match[4]].join('');
    }
  };

  return (
    <>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row" align="left">
          {rowProps.name}
        </TableCell>
        <TableCell>{rowProps.type}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }}></TableCell>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ paddingTop: '1rem', paddingBottom: '1rem' }}>
              <Typography variant="body2" gutterBottom component="div">
                {rowProps.description}
              </Typography>
              {rowProps.phone_number && (
                <h4 className="font-weight">
                  <FormattedMessage id="urgentNeedsRow.formatPhoneNumber" defaultMessage="Phone Number: " />
                  <span className="navigator-info">{formatPhoneNumber(rowProps.phone_number)}</span>
                </h4>
              )}
              {rowProps.link && (
                <a
                  className="margin-top-link"
                  href={rowProps.link}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => {
                    dataLayerPush({
                      event: 'urgent_need',
                      action: 'urgent need link',
                      resource: `Urgent Need Website for ${rowProps.name}`,
                      resource_name: rowProps.name,
                    });
                  }}
                >
                  <Button className="urgent-need-button">
                    <FormattedMessage id="urgentNeedsTable.visit-website-button" defaultMessage="Visit website" />
                  </Button>
                </a>
              )}
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

export default UrgentNeedsRow;
