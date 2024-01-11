import { Link, useParams } from 'react-router-dom';
import { useResultsContext } from '../Results';
import { useState } from 'react';
import Needs from '../Needs/Needs';
import Programs from '../Programs/Programs';
import { Box, Tab, Tabs, Typography } from '@mui/material';

type ResultsTabsProps = {
  currentTab: 'program' | 'need';
};

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const ResultsTabs = ({ currentTab }: ResultsTabsProps) => {
  const { programs, needs } = useResultsContext();
  console.log('programs:', programs);
  console.log('needs:', needs);
  console.log('currentTab:', currentTab);
  const { uuid } = useParams();

  const [tabValue, setTabValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <>
      {/* <Link to={`/${uuid}/results/benefits`}>Benfits</Link>
      <Link to={`/${uuid}/results/near-term-needs`}>Needs</Link> */}

      <Box sx={{ width: '100%' }}>
        <Box className="results-tab-container">
          <Tabs
            value={tabValue}
            onChange={handleChange}
            aria-label="basic tabs example"
            variant="fullWidth"
            indicatorColor="secondary"
          >
            <Tab label={`LONG-TERM BENEFITS (${programs.length})`} {...a11yProps(0)} />
            <Tab label={`NEAR-TERM RESOURCES (${needs.length})`} {...a11yProps(1)} />
          </Tabs>
        </Box>
        <CustomTabPanel value={tabValue} index={0}>
          {currentTab === 'need' ? <Needs /> : <Programs />}
        </CustomTabPanel>
        <CustomTabPanel value={tabValue} index={1}>
          <Needs />
        </CustomTabPanel>
      </Box>
    </>
  );
};

export default ResultsTabs;
