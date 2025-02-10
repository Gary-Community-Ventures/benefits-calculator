import { useContext, useEffect, useState } from 'react';
import { calcTotalIncome } from '../../../Assets/income';
import { Language } from '../../../Assets/languageOptions';
import { FormData } from '../../../Types/FormData';
import { FormattedMessageType } from '../../../Types/Questions';
import { Context } from '../../Wrapper/Wrapper';
import { useIsEnergyCalculator } from '../hooks';
import { EnergyCalculatorAPIResponse, EnergyCalculatorRebateCategory } from './rebateTypes';

const API_KEY = `Bearer ${process.env.REACT_APP_ENERGY_CALCULATOR_REWIRING_AMERICA_API_KEY}`;

function calcFilingStatus(formData: FormData) {
  // no children or spouse
  let filingStatus = 'single';

  for (const member of formData.householdData) {
    if (member.relationshipToHH === 'headOfHousehold') {
      continue;
    }

    if (member.relationshipToHH === 'spouse') {
      // has a spouse
      filingStatus = 'joint';
    } else if (filingStatus !== 'joint') {
      // has dependents but no spouse
      filingStatus = 'hoh';
    }
  }

  return filingStatus;
}

function createQueryString(formData: FormData, lang: Language) {
  const query = new URLSearchParams();

  query.append('zip', formData.zipcode);

  let ownerStatus = 'homeowner';
  query.append('owner_status', ownerStatus);

  const income = calcTotalIncome(formData);
  query.append('household_income', String(income));

  let filingStatus = calcFilingStatus(formData);
  query.append('tax_filing', filingStatus);

  query.append('household_size', String(formData.householdSize));

  let reqLang = 'en';
  if (lang === 'es') {
    reqLang = 'es';
  }
  query.append('language', reqLang);

  return `?${query.toString()}`;
}

async function getRebates(formData: FormData, lang: Language) {
  const queryString = createQueryString(formData, lang);
  const res = await fetch(`https://api.rewiringamerica.org/api/v1/calculator${queryString}`, {
    method: 'GET',
    headers: {
      Authorization: API_KEY,
    },
  });

  const data = (await res.json()) as EnergyCalculatorAPIResponse;
  console.log(data); // FIXME: remove

  const rebateCategories: EnergyCalculatorRebateCategory[] = [];

  for (const rebate of data.incentives) {
    const rebateCategory = rebate.items[0]; // TODO: figure this out
    const rebateCategoryName = rebateCategory as unknown as FormattedMessageType; // FIXME: figure out the category names
    let category = rebateCategories.find((category) => category.type === rebateCategory);

    if (category === undefined) {
      category = {
        type: rebateCategory,
        name: rebateCategoryName,
        rebates: [],
      };
      rebateCategories.push(category);
    }

    category.rebates.push(rebate);
  }

  return rebateCategories;
}

export default function useFetchEnergyCalculatorRebates() {
  const { formData, locale } = useContext(Context);
  const [rebates, setRebates] = useState<EnergyCalculatorRebateCategory[]>([]);
  const isEnergyCalculator = useIsEnergyCalculator();

  useEffect(() => {
    if (!isEnergyCalculator || !formData.energyCalculator?.isHomeOwner) {
      setRebates([]);
      return;
    }

    getRebates(formData, locale).then((rebates) => {
      setRebates(rebates);
    });
  }, [isEnergyCalculator, locale]);

  return rebates;
}
