import { useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
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
import { UrgentNeed } from '../../Types/Results';

type UrgentNeedsRowProps = {
  urgentNeed: UrgentNeed;
};

const UrgentNeedsRow = ({ urgentNeed }: UrgentNeedsRowProps) => {
  const [open, setOpen] = useState(false);
  const intl = useIntl();

  const formatPhoneNumber = (phoneNumberString: string) => {
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
          <FormattedMessage id={urgentNeed.name.label} defaultMessage={urgentNeed.name.default_message} />
        </TableCell>
        <TableCell>
          <FormattedMessage id={urgentNeed.type.label} defaultMessage={urgentNeed.type.default_message} />
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }}></TableCell>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ paddingTop: '1rem', paddingBottom: '1rem' }}>
              <Typography variant="body2" gutterBottom component="div">
                <FormattedMessage
                  id={urgentNeed.description.label}
                  defaultMessage={urgentNeed.description.default_message}
                />
              </Typography>
              {urgentNeed.phone_number && (
                <h4 className="font-weight">
                  <FormattedMessage id="urgentNeedsRow.formatPhoneNumber" defaultMessage="Phone Number: " />
                  <span className="navigator-info">{formatPhoneNumber(urgentNeed.phone_number)}</span>
                </h4>
              )}
              {urgentNeed.link.default_message !== null && urgentNeed.link.default_message.length > 0 && (
                <a
                  className="margin-top-link"
                  href={intl.formatMessage({
                    id: urgentNeed.link.label,
                    defaultMessage: urgentNeed.link.default_message,
                  })}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => {
                    dataLayerPush({
                      event: 'urgent_need',
                      action: 'urgent need link',
                      resource: `Urgent Need Website for ${urgentNeed.name.default_message}`,
                      resource_name: urgentNeed.name.default_message,
                    });
                  }}
                >
                  <Button className="urgent-need-button" variant="contained">
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
