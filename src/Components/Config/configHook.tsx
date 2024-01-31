import { useEffect, useState } from 'react';
import { configEndpoint, header } from '../../apiCalls';

import { ConfigApiResponse } from '../../Types/Config';
import { Config } from '../../Types/Config';

function transformConfigResponse(configResponse: ConfigApiResponse[]): Config {
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
    getConfig().then((value: ConfigApiResponse[] | undefined) => {
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
