import { useEffect, useState } from 'react';
import { configEndpoint, header } from '../../apiCalls';
import { ConfigApiResponse } from '../../Types/Config';
import { Config } from '../../Types/Config';
import { FormattedMessage } from 'react-intl';

// Recursively transform any object that has _label, and _default_message as keys into a FormattedMessage
function transformItem(item: unknown): any {
  type Item = {
    _label: string;
    _default_message: string;
  };

  if (typeof item !== 'object' || item === null) {
    return item;
  }

  if (item.hasOwnProperty('_label') && item.hasOwnProperty('_default_message')) {
    const { _label, _default_message } = item as Item;
    return <FormattedMessage id={_label} defaultMessage={_default_message} />;
  }

  const config: Config = {};
  for (const key in item) {
    if (item.hasOwnProperty(key)) {
      config[key] = transformItem((item as any)[key]);
    }
  }
  return config;
}

function transformConfigResponse(configResponse: ConfigApiResponse[]): Config {
  const output: Config = {};

  configResponse.forEach((item) => {
    output[item.name] = transformItem(item.data);
  });

  return output;
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

export default function useGetConfig() {
  const [configLoading, setLoading] = useState<boolean>(true);
  const [configResponse, setConfigResponse] = useState<Config | undefined>();

  useEffect(() => {
    getConfig().then((value: ConfigApiResponse[]) => {
      // get data and set loading to false
      try {
        if (value !== undefined) {
          const transformedOutput: Config = transformConfigResponse(value);
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
