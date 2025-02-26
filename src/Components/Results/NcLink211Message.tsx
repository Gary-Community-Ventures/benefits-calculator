import { useContext } from 'react';
import { Context } from '../Wrapper/Wrapper';
import { useResultsContext } from './Results';

export default function Link211Message1() {
  const { getReferrer } = useContext(Context);
  const { needs } = useResultsContext();  
  const Link211_Msg = getReferrer('featureFlags');    
  // const defaultMessage = Link211_Msg.props.defaultMessage;  
  // return <div className="back-to-screen-message">{Link211_Msg}</div>
  return (
    <div>
      <p>{Link211_Msg.text}</p>
      <a href={Link211_Msg.url} target="_blank" rel="noopener noreferrer">
        Click here
      </a>
    </div>
  );
  // return (  
  //   <div
  //     className="back-to-screen-message"
  //     dangerouslySetInnerHTML={{ __html: defaultMessage }}
  //   />  
  // );  
}