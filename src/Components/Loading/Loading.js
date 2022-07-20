import loading from '../../Assets/loading-icon.png';
import './Loading.css';

const Loading = () => {
  return (
    <div className='loading-container'>
      <img 
        className='loading-image'
        src={loading}
        alt='loading-icon'
      />
    </div>
  );
}

export default Loading;