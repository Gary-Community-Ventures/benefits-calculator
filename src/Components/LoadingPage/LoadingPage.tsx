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
      <>
        {/* <input type="text" pattern='\d*'/> */}
        <input type="text" pattern='[0-9]*' maxLength={5}/>
      </>
    </main>
  );
};

export default LoadingPage;
