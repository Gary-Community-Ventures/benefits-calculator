import { useEffect, useState } from 'react';
import { configEndpoint, header } from '../../apiCalls';

import { ConfigApiItem } from '../../Types/Config';
import { Config } from '../../Types/Config';

function transformConfigResponse(configResponse: ConfigApiItem[]): Config {
  const output: Config = {};

  configResponse.forEach((item) => {
    output[item.name] = item.data;
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
    getConfig().then((value: Config | undefined) => {
      // get data and set loading to false
      try {
        const configData = Array.isArray(value) && value[0]?.data;
        const transformedOutput: Config = transformConfigResponse(configData);
        setConfigResponse(transformedOutput);
      } catch (e) {
        console.log(e);
      }
      setLoading(false);
    });
  }, []);

  return { configLoading, configResponse };
}
