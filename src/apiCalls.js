const apiKey = 'Token ' + process.env.REACT_APP_API_KEY;
const domain = process.env.REACT_APP_DOMAIN_URL;

const translationsEndpoint = `${domain}/translations/`;
const screensEndpoint = `${domain}/api/screens/`;
const userEndpoint = `${domain}/api/users/`;
const messageEndpoint = `${domain}/api/messages/`;
let eligibilityEndpoint = `${domain}/api/eligibility/`;

const header = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
  Authorization: apiKey,
};

const getTranslations = () => {
  return fetch(translationsEndpoint, {
    method: 'GET',
    headers: header,
  }).then((response) => {
    if (!response.ok) {
      throw new Error(`${response.status} ${response.statusText}`);
    }
    return response.json();
  });
};

const postUser = (userData) => {
  return fetch(userEndpoint, {
    method: 'POST',
    body: JSON.stringify(userData),
    headers: header,
  }).then((response) => {
    if (!response.ok) {
      throw new Error('A user with this email or phone number already exists in our system.');
    }
    return response.json();
  });
};

const putUser = (userData, uuid) => {
  return fetch(userEndpoint + uuid + '/', {
    method: 'PUT',
    body: JSON.stringify(userData),
    headers: header,
  }).then((response) => {
    if (!response.ok) {
      throw new Error('A user with this email or phone number already exists in our system.');
    }
  });
};

const postMessage = (messageData) => {
  return fetch(messageEndpoint, {
    method: 'POST',
    body: JSON.stringify(messageData),
    headers: header,
  }).then((response) => {
    if (!response.ok) {
      throw new Error(`${response.status} ${response.statusText}`);
    }
    return response.json();
  });
};

const getScreen = (uuid) => {
  return fetch(screensEndpoint + uuid, {
    method: 'GET',
    headers: header,
  }).then((response) => {
    if (!response.ok) {
      throw new Error(`${response.status} ${response.statusText}`);
    }
    return response.json();
  });
};

const postScreen = (partialFormData) => {
  return fetch(screensEndpoint, {
    method: 'POST',
    body: JSON.stringify(partialFormData),
    headers: header,
  }).then((response) => {
    if (!response.ok) {
      throw new Error(`${response.status} ${response.statusText}`);
    }
    return response.json();
  });
};

const putScreen = (partialFormData, uuid) => {
  return fetch(screensEndpoint + uuid + '/', {
    method: 'PUT',
    body: JSON.stringify(partialFormData),
    headers: header,
  }).then((response) => {
    if (!response.ok) {
      throw new Error(`${response.status} ${response.statusText}`);
    }
    return response.json();
  });
};

const getEligibility = (screenerId, locale) => {
  const headerWithLocale = {
    ...header,
    'Accept-Language': locale === 'es' ? 'es,en-us' : 'en-us',
  };

  return fetch(eligibilityEndpoint + screenerId, {
    method: 'GET',
    headers: headerWithLocale,
  }).then((response) => {
    if (!response.ok) {
      throw new Error(`${response.status} ${response.statusText}`);
    }
    return response.json();
  });
};

export { getTranslations, postScreen, getScreen, putScreen, postUser, putUser, postMessage, getEligibility };
