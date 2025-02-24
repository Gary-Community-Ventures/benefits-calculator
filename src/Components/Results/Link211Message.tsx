import { useContext } from 'react';
import { Context } from '../Wrapper/Wrapper';
import { useResultsContext } from './Results';

export default function Link211Message() {
  const { getReferrer } = useContext(Context);
  const { needs } = useResultsContext();
  const Link211_Msg = getReferrer('link211Message');  
 
  const links = Link211_Msg.props.link;
  const defaultMessage = Link211_Msg.props.defaultMessage;  
  const formattedMessage = defaultMessage.replace(
    '{link}',
    `<a href="${links}" target="_blank" rel="noopener noreferrer">Click here</a>`
  );
  return (
    <div
      className="back-to-screen-message"
      dangerouslySetInnerHTML={{ __html: formattedMessage }}
    />    
  );
  // return <div className="back-to-screen-message">{Link211_Msg}</div>;
  
}