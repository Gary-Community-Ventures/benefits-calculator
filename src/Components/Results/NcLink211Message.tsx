import { useContext } from 'react';
import { Context } from '../Wrapper/Wrapper';
import { useResultsContext } from './Results';

export default function Link211Message1() {
  const { getReferrer } = useContext(Context);
  const { needs } = useResultsContext();  
  const Link211_Msg = getReferrer('featureFlags');    
    
  return (
    <div>
      <p>{Link211_Msg.text}
      <a href={Link211_Msg.url} target="_blank" rel="noopener noreferrer">
        Click here
      </a></p>
    </div>
  );   
}