import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import UrgentNeedsRow from './UrgentNeedsRow';
import { FormattedMessage } from 'react-intl';

const UrgentNeedsTable = ({ urgentNeedsPrograms, locale }) => {
  const finalUrgentNeedsPrograms = urgentNeedsPrograms[locale.toLowerCase()];

  return (
    <TableContainer component={Paper}>
      <Table aria-label='collapsible table'>
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell align='left'>
              <FormattedMessage
                id='urgentNeedsTable.resources-columnHeader'
                defaultMessage='Resources'
              />
            </TableCell>
            <TableCell align='left'>
              <FormattedMessage
                id='urgentNeedsTable.typeOfResource-columnHeader'
                defaultMessage='Type of Resource'
              />
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {finalUrgentNeedsPrograms.map((row) => (
            <UrgentNeedsRow key={row.name} rowProps={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default UrgentNeedsTable;
