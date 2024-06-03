import { FormattedMessage } from 'react-intl';
import { useState, useEffect } from 'react';
import { getAllPrograms } from '../../apiCalls';
import { Translation } from '../../Types/Results';
import './CurrentBenefits.css';

type Program = {
  name: Translation;
  website_description: Translation;
  category: Translation;
  id: number;
};

const CurrentCOBenefits = () => {
  const [allPrograms, setAllPrograms] = useState<Program[]>([]);

  useEffect(() => {
    getAllPrograms().then((response) => {
      setAllPrograms(response);
    });
  }, []);

  const renderProgram = (program: Program, index: number) => {
    return <div key={index}>{program.name.default_message}</div>;
  };

  return (
    <div className="co-benefits-container">
      <h1 className="sub-header">
        <FormattedMessage
          id="currentCOBenefits.pg-header"
          defaultMessage="Government Benefits, Nonprofit Programs and Tax Credits in MyFriendBen"
        />
      </h1>
      <h2 className="sub-header blue">
        <FormattedMessage id="currentCOBenefits.long-term-benefits" defaultMessage="LONG-TERM BENEFITS" />
      </h2>
      {allPrograms.map((program, index) => {
        return renderProgram(program, index);
      })}
      <h2 className="sub-header blue">
        <FormattedMessage id="currentCOBenefits.near-term-benefits" defaultMessage="NEAR-TERM BENEFITS" />
      </h2>
    </div>
  );
};

export default CurrentCOBenefits;
