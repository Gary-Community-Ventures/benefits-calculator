import { useContext, useEffect, useState } from 'react';
import { Context } from '../Wrapper/Wrapper';
import { configEndpoint, header } from '../../apiCalls';
import { ConfigApiResponse } from '../../Types/Config';
import { Config } from '../../Types/Config';
import { FormattedMessage } from 'react-intl';

import { ReactComponent as Student } from '../../Assets/OptionCardIcons/Conditions/student.svg';
import { ReactComponent as Pregnant } from '../../Assets/OptionCardIcons/Conditions/pregnant.svg';
import { ReactComponent as BlindOrVisuallyImpaired } from '../../Assets/OptionCardIcons/Conditions/blindOrVisuallyImpaired.svg';
import { ReactComponent as Disabled } from '../../Assets/OptionCardIcons/Conditions/disabled.svg';
import { ReactComponent as LongTermDisability } from '../../Assets/OptionCardIcons/Conditions/longTermDisability.svg';
import { ReactComponent as Chp } from '../../Assets/OptionCardIcons/HealthInsurance/chp.svg';
import { ReactComponent as Dont_know } from '../../Assets/OptionCardIcons/HealthInsurance/dont_know.svg';
import { ReactComponent as Emergency_medicaid } from '../../Assets/OptionCardIcons/HealthInsurance/emergency_medicaid.svg';
import { ReactComponent as Employer } from '../../Assets/OptionCardIcons/HealthInsurance/employer.svg';
import { ReactComponent as Family_planning } from '../../Assets/OptionCardIcons/HealthInsurance/family_planning.svg';
import { ReactComponent as Medicaid } from '../../Assets/OptionCardIcons/HealthInsurance/medicaid.svg';
import { ReactComponent as Medicare } from '../../Assets/OptionCardIcons/HealthInsurance/medicare.svg';
import { ReactComponent as None } from '../../Assets/OptionCardIcons/HealthInsurance/none.svg';
import { ReactComponent as PrivateInsurance } from '../../Assets/OptionCardIcons/HealthInsurance/privateInsurance.svg';

import { ReactComponent as Baby_supplies } from '../../Assets/OptionCardIcons/AcuteConditions/baby_supplies.svg';
import { ReactComponent as Child_development } from '../../Assets/OptionCardIcons/AcuteConditions/child_development.svg';
import { ReactComponent as Dental_care } from '../../Assets/OptionCardIcons/AcuteConditions/dental_care.svg';
import { ReactComponent as Food } from '../../Assets/OptionCardIcons/AcuteConditions/food.svg';
import { ReactComponent as Housing } from '../../Assets/OptionCardIcons/AcuteConditions/housing.svg';
import { ReactComponent as Job_resources } from '../../Assets/OptionCardIcons/AcuteConditions/job_resources.svg';
import { ReactComponent as Legal_services } from '../../Assets/OptionCardIcons/AcuteConditions/legal_services.svg';
import { ReactComponent as Support } from '../../Assets/OptionCardIcons/AcuteConditions/support.svg';

type Item = {
  _label: string;
  _default_message: string;
};

type IconItem = {
  _classname: string;
  _name: string;
};

type OptionItem = {
  _label: string;
  _default_message: string;
  icon: IconItem;
};

// Transforms objects with icon key to return Icon ReactComponent
function transformItemIcon(item: unknown): any {
  const { _label, _default_message, icon } = item as OptionItem;

  let iconComponent;
  switch (icon._name) {
    // Acute Conditions
    case 'Baby_supplies':
      iconComponent = <Baby_supplies className={icon._classname} />;
      break;
    case 'Child_development':
      iconComponent = <Child_development className={icon._classname} />;
      break;
    case 'Dental_care':
      iconComponent = <Dental_care className={icon._classname} />;
      break;
    case 'Food':
      iconComponent = <Food className={icon._classname} />;
      break;
    case 'Housing':
      iconComponent = <Housing className={icon._classname} />;
      break;
    case 'Job_resources':
      iconComponent = <Job_resources className={icon._classname} />;
      break;
    case 'Legal_services':
      iconComponent = <Legal_services className={icon._classname} />;
      break;
    case 'Support':
      iconComponent = <Support className={icon._classname} />;
      break;
    // Conditions
    case 'BlindOrVisuallyImpaired':
      iconComponent = <BlindOrVisuallyImpaired className={icon._classname} />;
      break;
    case 'Disabled':
      iconComponent = <Disabled className={icon._classname} />;
      break;
    case 'LongTermDisability':
      iconComponent = <LongTermDisability className={icon._classname} />;
      break;
    case 'Pregnant':
      iconComponent = <Pregnant className={icon._classname} />;
      break;
    case 'Student':
      iconComponent = <Student className={icon._classname} />;
      break;
    // Health Insurance
    case 'Chp':
      iconComponent = <Chp className={icon._classname} />;
      break;
    case 'Dont_know':
      iconComponent = <Dont_know className={icon._classname} />;
      break;
    case 'Emergency_medicaid':
      iconComponent = <Emergency_medicaid className={icon._classname} />;
      break;
    case 'Employer':
      iconComponent = <Employer className={icon._classname} />;
      break;
    case 'Family_planning':
      iconComponent = <Family_planning className={icon._classname} />;
      break;
    case 'Medicaid':
      iconComponent = <Medicaid className={icon._classname} />;
      break;
    case 'Medicare':
      iconComponent = <Medicare className={icon._classname} />;
      break;
    case 'None':
      iconComponent = <None className={icon._classname} />;
      break;
    case 'PrivateInsurance':
      iconComponent = <PrivateInsurance className={icon._classname} />;
      break;
    // Needs a generic catch-all
    default:
      iconComponent = <LongTermDisability className="option-card-icon" />;
      break;
  }

  return {
    formattedMessage: <FormattedMessage id={_label} defaultMessage={_default_message} />,
    icon: iconComponent,
  };
}

// Recursively transform any object that has _label && _default_message as keys into a FormattedMessage
// and convert icon object into ReactComponent
function transformItem(item: unknown): any {
  if (typeof item !== 'object' || item === null) return item;

  if (item.hasOwnProperty('_label') && item.hasOwnProperty('_default_message') && !item.hasOwnProperty('icon')) {
    const { _label, _default_message } = item as Item;
    return <FormattedMessage id={_label} defaultMessage={_default_message} />;
  }

  if (item.hasOwnProperty('icon')) {
    const iconItem = transformItemIcon(item);

    return iconItem;
  }

  const config: Config = {};
  for (const key in item) {
    if (item.hasOwnProperty(key)) {
      config[key] = transformItem((item as any)[key]);
    }
  }
  return config;
}

function transformConfigData(configData: ConfigApiResponse[]): Config {
  const transformedConfig: Config = {};

  configData.forEach((item) => {
    const { name, data } = item;
    const configOptions = data;

    transformedConfig[name] = transformItem(configOptions);
  });

  return transformedConfig;
}

async function getConfig() {
  // fetch data
  return fetch(configEndpoint, {
    method: 'GET',
    headers: header,
  }).then((response) => {
    if (!response.ok) {
      throw new Error(`${response.status} ${response.statusText}`);
    }
    return response.json();
  });
}

export function useGetConfig() {
  const [configLoading, setLoading] = useState<boolean>(true);
  const [configResponse, setConfigResponse] = useState<Config | undefined>();

  useEffect(() => {
    getConfig().then((value: ConfigApiResponse[]) => {
      // get data and set loading to false
      try {
        if (value !== undefined) {
          const transformedOutput: Config = transformConfigData(value);
          setConfigResponse(transformedOutput);
        }
      } catch (e) {
        console.error(e);
      }
      setLoading(false);
    });
  }, []);

  return { configLoading, configResponse };
}

export function useConfig(name: string) {
  const { config } = useContext(Context);

  if (config === undefined) {
    return {};
  }

  if (config[name] === undefined) {
    throw new Error(`'${name}' does not exist in the config`);
  }

  let configValue = config[name];

  return configValue;
}
