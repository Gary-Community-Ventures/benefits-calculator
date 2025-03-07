import { FormattedMessage } from 'react-intl';

export default function Link211Message1() {
  return (
    <div>
      <p>
        <FormattedMessage
          id="link211.message"
          defaultMessage="These resources are provided by NC 211. If you can't find what you need below, "
        />
        <a href="https://nc211.org/" target="_blank" rel="noopener noreferrer">
          <FormattedMessage id="link211.clickHere" defaultMessage="please visit their website." />
        </a>
      </p>
    </div>
  );
}
