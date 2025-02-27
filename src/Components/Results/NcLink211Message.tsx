import { useContext } from 'react';
import { Context } from '../Wrapper/Wrapper';
import { useResultsContext } from './Results';

export default function Link211Message1() {
  // const { getReferrer } = useContext(Context);
  const { needs } = useResultsContext();  
  // const Link211_Msg = getReferrer('featureFlags');    
    
  return (
    <div>
      <p>For more information or to learn more, please visit the following link  :  
      <a href="https://nc211.org/" target="_blank" rel="noopener noreferrer">
         Click here
      </a></p>
    </div>
  );   
}