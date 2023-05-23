import Grid from '@mui/material/Grid';
import {
  DataGridPro,
  GridRowsProp,
  DataGridProProps,
  useGridSelector,
  useGridApiContext,
  gridFilteredDescendantCountLookupSelector,
  GridLinkOperator,
} from '@mui/x-data-grid-pro';
import { useState } from 'react';

export const isNavigationKey = (key) =>
  key === 'Home' ||
  key === 'End' ||
  key.indexOf('Arrow') === 0 ||
  key.indexOf('Page') === 0 ||
  key === ' ';

const Table = () => {
  const [filt, setFilt] = useState([
    {
      id: 1,
      columnField: 'citizenship',
      operatorValue: 'startsWith',
      value: 'none',
    },
    {
      id: 3,
      columnField: 'citizenship',
      operatorValue: 'startsWith',
      value: 'citizen',
    },
  ]);

  return <div>Table</div>;
};

export default Table;
