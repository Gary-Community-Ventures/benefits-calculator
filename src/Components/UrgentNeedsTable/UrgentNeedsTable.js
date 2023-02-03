import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import UrgentNeedsRow from './UrgentNeedsRow';

const UrgentNeedsTable = ({ urgentNeedsPrograms, locale }) => {
  const finalUrgentNeedsPrograms = urgentNeedsPrograms[locale.toLowerCase()];

  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell align='left'>Resources</TableCell>
            <TableCell align='left'>Type of Resource</TableCell>
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
}

export default UrgentNeedsTable;