import { useContext, useEffect, useState } from 'react';
import { Language } from '../../../Assets/languageOptions';
import { FormData } from '../../../Types/FormData';
import { Context } from '../../Wrapper/Wrapper';
import { useIsEnergyCalculator } from '../hooks';
import { EnergyCalculatorAPIResponse } from './rebateTypes';

type Rebate = {};

const API_KEY = `Bearer ${process.env.REACT_APP_ENERGY_CALCULATOR_REWIRING_AMERICA_API_KEY}`;

function createQueryString(formData: FormData, lang: Language) {
  const query = new URLSearchParams();

  query.append('zip', formData.zipcode);

  let ownerStatus = 'homeowner';
  query.append('owner_status', ownerStatus);

  let income = 0; // TODO: calculate income
  query.append('household_income', String(income));

  let filingStatus = 'hoh'; // TODO: caclulate filing status
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

  console.log(data);

  return [];
}

export default function useFetchEnergyCalculatorRebates() {
  const { formData, locale } = useContext(Context);
  const [rebates, setRebates] = useState<Rebate[]>([]);
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
