import { useContext } from 'react';
import { Context } from '../Wrapper/Wrapper';
import { useResultsContext } from './Results';

export default function Link211Message1() {
  const { getReferrer } = useContext(Context);
  const { needs } = useResultsContext();  
  const Link211_Msg = getReferrer('link211Message');    
  const defaultMessage = Link211_Msg.props.defaultMessage;  
  return (  
    <div
      className="back-to-screen-message"
      dangerouslySetInnerHTML={{ __html: defaultMessage }}
    />  
  );  
}