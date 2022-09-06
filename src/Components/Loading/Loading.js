import { FormattedMessage } from 'react-intl';
import loading from '../../Assets/loading-icon.png';
import './Loading.css';

const Loading = () => {
  return (
    <div className='loading-container'>
      <p className='loading-text'>
        <FormattedMessage 
          id='loading.return-loadingText' 
          defaultMessage='Please wait while we gather your results...' />
      </p>
      <img 
        className='loading-image'
        src={loading}
        alt='loading-icon'
      />
    </div>
  );
}

export default Loading;