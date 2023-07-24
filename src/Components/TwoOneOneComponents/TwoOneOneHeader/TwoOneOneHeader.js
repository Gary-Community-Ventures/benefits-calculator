import { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { AppBar } from '@mui/material';
import { Context } from '../../Wrapper/Wrapper';
import twoOneOneMFBLogo from '../../../Assets/twoOneOneMFBLogo.png';
import './TwoOneOneHeader.css';

const TwoOneOneHeader = () => {
  //this is so that when the users click on the cobranded logo, they're navigated back to step-0
  const context = useContext(Context);
  const { formData } = context;
  const { urlSearchParams } = formData;

  //this is for the results icon to conditionally show up
  const location = useLocation();
  const urlRegex = /^\/(?:\/results\/(.+)|(.+)\/results)\/?$/;
  const url = location.pathname.match(urlRegex);
  const isResults = url !== null;
  const screenUUID = url ? url[2] ?? url[1] : undefined;

  return (
    <nav>
      <AppBar position="sticky" id="nav-container" sx={{ flexDirection: 'row', backgroundColor: '#FFFFFF' }}>
        <a href={`/step-0${urlSearchParams}`} className="home-link">
          <img src={twoOneOneMFBLogo} alt="211 and my friend ben home page button" className="logo cobranded-logo" />
        </a>
      </AppBar>
    </nav>
  );
};

export default TwoOneOneHeader;
