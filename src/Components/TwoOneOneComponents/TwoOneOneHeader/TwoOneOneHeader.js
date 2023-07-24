import { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { AppBar, Link } from '@mui/material';
import { Context } from '../../Wrapper/Wrapper';
import twoOneOneMFBLogo from '../../../Assets/twoOneOneMFBLogo.png';
import twoOneOneLinks from '../../../Assets/twoOneOneLinks';
import './TwoOneOneHeader.css';
import { FormattedMessage } from 'react-intl';

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

  const createAllHeaderLinks = () => {
    const mappedLinks = twoOneOneLinks.map((link, index) => {
      return (
        <Link
          href={link.href}
          underline="none"
          target="_blank"
          rel="noreferrer"
          aria-label={link.ariaLabel}
          key={link.defaultMsg + index}
          className='twoOneOneMenuLink'
        >
          <FormattedMessage id={link.formattedMsgId} defaultMessage={link.name} />
        </Link>
      );
    });

    return mappedLinks;
  };

  return (
    <nav>
      <AppBar position="sticky" id="nav-container" sx={{ flexDirection: 'row', backgroundColor: '#FFFFFF' }}>
        <a href={`/step-0${urlSearchParams}`} className="home-link">
          <img src={twoOneOneMFBLogo} alt="211 and my friend ben home page button" className="logo cobranded-logo" />
        </a>
        {createAllHeaderLinks()}
      </AppBar>
    </nav>
  );
};

export default TwoOneOneHeader;
