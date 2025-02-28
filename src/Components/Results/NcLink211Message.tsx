import { FormattedMessage } from 'react-intl';

export default function Link211Message1() {   
    return (
    <div>      
      <p>
        <FormattedMessage
          id="link211.message"
          defaultMessage="For more information or to learn more, please visit the following link :"
        />
        <a href="https://nc211.org/" target="_blank" rel="noopener noreferrer">
          <FormattedMessage id="link211.clickHere" defaultMessage="Click here" />
        </a>
      </p>      
    </div>
  );   
}