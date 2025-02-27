import { useResultsContext } from './Results';

export default function Link211Message1() {  
  const { needs } = useResultsContext();   
    
  return (
    <div>
      <p>For more information or to learn more, please visit the following link  :  
      <a href="https://nc211.org/" target="_blank" rel="noopener noreferrer">
         Click here
      </a></p>
    </div>
  );   
}