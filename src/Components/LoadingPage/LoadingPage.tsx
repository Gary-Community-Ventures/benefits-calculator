import loadingIcon from '../../Assets/loading-icon.png';
import './LoadingPage.css';

const LoadingPage = () => {
  return (
    <main className="loading-wrapper">
      <img src={loadingIcon} alt="loading-icon" className="spinner"></img>
    </main>
  );
};

export default LoadingPage;
