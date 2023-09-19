import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TableFooter from '@mui/material/TableFooter';
import UrgentNeedsRow from './UrgentNeedsRow';
import { FormattedMessage } from 'react-intl';
import './UrgentNeedsTable.css';
import { useContext } from 'react';
import { Context } from '../Wrapper/Wrapper';

const UrgentNeedsTable = ({ urgentNeedsPrograms, locale }) => {
  const finalUrgentNeedsPrograms = urgentNeedsPrograms[locale.toLowerCase()];
  const { getReferrer } = useContext(Context);

  const displayFooter = () => {
    if (urgentNeedsPrograms.es.length) {
      return (
        <article className="urgentNeedsTableFooter">
          <p className="noResults-p">
            <FormattedMessage id="noResults.p-Two" defaultMessage="For additional resources, visit " />
            <a
              className="ineligibility-link navigator-info"
              target="_blank"
              rel="noreferrer"
              href={getReferrer('twoOneOneLink')}
            >
              2-1-1 Colorado
            </a>
            <FormattedMessage
              id="noResults.p-Three"
              defaultMessage=" to chat with someone online or on the phone to get the resources you’re looking for."
            />
          </p>
        </article>
      );
    } else {
      return (
        <article className="urgentNeedsTableFooter">
          <p className="noResults-p">
            <FormattedMessage
              id="noResultsOrUrgentNeeds.p-One"
              defaultMessage="It looks like you didn’t indicate any immediate needs."
            />
          </p>
          <p className="noResults-p">
            <FormattedMessage id="noResults.p-Two" defaultMessage="For additional resources, visit " />
            <a className="ineligibility-link navigator-info" target="_blank" rel="noreferrer" href={link}>
              2-1-1 Colorado
            </a>
            <FormattedMessage
              id="noResults.p-Three"
              defaultMessage=" to chat with someone online or on the phone to get the resources you’re looking for."
            />
          </p>
        </article>
      );
    }
  };

  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell align="left">
              <FormattedMessage id="urgentNeedsTable.resources-columnHeader" defaultMessage="Resources" />
            </TableCell>
            <TableCell align="left">
              <FormattedMessage id="urgentNeedsTable.typeOfResource-columnHeader" defaultMessage="Type of Resource" />
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {finalUrgentNeedsPrograms.map((row) => (
            <UrgentNeedsRow key={row.name} rowProps={row} />
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>{displayFooter()}</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
};

export default UrgentNeedsTable;
