import { FormattedMessage } from 'react-intl';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import { useContext } from 'react';
import { Context } from '../Wrapper/Wrapper';
import './NoResultsTable.css';

const NoResultsTable = () => {
  const { getReferrer } = useContext(Context);

  return (
    <article className="no-results-content-container">
      <p className="noResults-p">
        <FormattedMessage
          id="noResults.p-One"
          defaultMessage="It looks like you may not qualify for benefits included in MyFriendBen at this time. If you indicated need for an immediate resource, please click on the “Immediate Needs” tab."
        />
      </p>
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
};

export default NoResultsTable;
