import { useContext, useEffect } from 'react';
import loadingIcon from '../../Assets/loading-icon.png';
import './LoadingPage.css';
import { Context } from '../Wrapper/Wrapper';
import { useParams } from 'react-router-dom';

const LoadingPage = () => {
  const { screenDoneLoading } = useContext(Context);
  const { uuid } = useParams();

  useEffect(() => {
    if (uuid === undefined) {
      screenDoneLoading();
    }
  });

  return (
    <main className="loading-wrapper">
      <img src={loadingIcon} alt="loading-icon" className="spinner"></img>
    </main>
  );
};

export default LoadingPage;
