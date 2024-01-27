import { useEffect, useState } from 'react';
import { configEndpoint, header } from '../../apiCalls';

import { ApiConfig } from '../../Types/ApiFormData';

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
  const [configResponse, setConfigResponse] = useState<ApiConfig | undefined>();

  useEffect(() => {
    getConfig().then((value: ApiConfig | undefined) => {
      // get data and set loading to false
      const configData = Array.isArray(value) && value[0]?.data;
      setConfigResponse(configData);
      setLoading(false);
    });
  }, []);

  return { configLoading, configResponse };
}
