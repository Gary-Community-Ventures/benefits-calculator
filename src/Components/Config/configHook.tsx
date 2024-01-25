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
  const [loading, setLoading] = useState<boolean>(true);
  const [config, setConfig] = useState<ApiConfig | undefined>();

  useEffect(() => {
    getConfig().then((value) => {
      // get data and set loading to false
      setConfig(value);
      setLoading(false);
    });
  }, []);

  return { loading, config };
}
