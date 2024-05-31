import { FormattedMessage } from "react-intl";
import './CurrentCOBenefits.css';

const CurrentCOBenefits = () => {
  return (
    <div className="co-benefits-container">
      <h1 className="sub-header">
        <FormattedMessage id="currentCOBenefits.pg-header" defaultMessage="Government Benefits, Nonprofit Programs and Tax Credits in MyFriendBen" />
      </h1>
      <h2 className="sub-header blue">
        <FormattedMessage id="currentCOBenefits.long-term-benefits" defaultMessage="LONG-TERM BENEFITS" />
      </h2>
      <h2 className="sub-header blue">
        <FormattedMessage id="currentCOBenefits.near-term-benefits" defaultMessage="NEAR-TERM BENEFITS" />
      </h2>

    </div>
  );
}

export default CurrentCOBenefits;