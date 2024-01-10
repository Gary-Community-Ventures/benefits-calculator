import { useContext, useEffect } from 'react';
import loading from '../../Assets/loading/logoLoading.gif';
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
      <img src={loading} alt="loading-icon" className="spinner"></img>
    </main>
  );
};

export default LoadingPage;
