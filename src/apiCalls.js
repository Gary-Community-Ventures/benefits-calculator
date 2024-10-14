import { cleanTranslationDefaultMessage } from './cleanAPICategoryTranslation';

const apiKey = 'Token ' + process.env.REACT_APP_API_KEY;
const domain = process.env.REACT_APP_DOMAIN_URL;

const translationsEndpoint = `${domain}/api/translations/`;
const screensEndpoint = `${domain}/api/screens/`;
const userEndpoint = `${domain}/api/users/`;
const messageEndpoint = `${domain}/api/messages/`;
const apiLongTermProgramsEndPoint = `${domain}/api/programs`;
const apiProgramCategoriesEndPoint = `${domain}/api/program_categories`;
const apiUrgentNeedsEndpoint = `${domain}/api/urgent-needs`;
export const configEndpoint = `${domain}/api/configuration/`;
const eligibilityEndpoint = `${domain}/api/eligibility/`;
const validationEndpoint = `${domain}/api/validations/`;
const authTokenEndpoint = `${domain}/api/auth-token/`;

export const header = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
  Authorization: apiKey,
};

const getTranslations = (lang) => {
  return fetch(translationsEndpoint + `?lang=${lang}`, {
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

const getAllLongTermPrograms = async () => {
  const response = await fetch(apiProgramCategoriesEndPoint, {
    method: 'GET',
    headers: header,
  });
  if (!response.ok) {
    throw new Error(`${response.status} ${response.statusText}`);
  }

  const data = await response.json();

  const programs = [];

  for (const category of data) {
    for (const program of category.programs)
      programs.push({
        ...program,
        category: category.name,
      });
  }

  return programs;
};

const getAllNearTermPrograms = async () => {
  const response = await fetch(apiUrgentNeedsEndpoint, {
    method: 'GET',
    headers: header,
  });
  if (!response.ok) {
    throw new Error(`${response.status} ${response.statusText}`);
  }

  const programs = await response.json();
  const programsWithNormalizedTypeTranslations = programs.map((program) => {
    const categoryWithNormalizedDefaultMessage = cleanTranslationDefaultMessage(program.type);
    return { ...program, type: categoryWithNormalizedDefaultMessage };
  });

  return programsWithNormalizedTypeTranslations;
};

const postValidation = async (validationBody, key) => {
  const staffHeader = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: 'Token ' + key,
  };

  return await fetch(validationEndpoint, {
    method: 'POST',
    headers: staffHeader,
    body: JSON.stringify(validationBody),
  }).then((response) => {
    if (!response.ok) {
      throw new Error(`${response.status} ${response.statusText}`);
    }
    return response.json();
  });
};

const deleteValidation = async (validationid, key) => {
  const staffHeader = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: 'Token ' + key,
  };

  return await fetch(validationEndpoint + validationid, {
    method: 'DELETE',
    headers: staffHeader,
  }).then((response) => {
    if (!response.ok) {
      throw new Error(`${response.status} ${response.statusText}`);
    }
  });
};

const getAuthToken = async (email, password) => {
  const header = {
    'Content-Type': 'application/json',
  };

  return await fetch(authTokenEndpoint, {
    method: 'POST',
    headers: header,
    body: JSON.stringify({
      username: email,
      password: password,
    }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText}`);
      }
      return response.json();
    })
    .then((response) => {
      return response.token;
    });
};

export {
  getTranslations,
  postScreen,
  getScreen,
  putScreen,
  postUser,
  putUser,
  postMessage,
  getEligibility,
  getAllLongTermPrograms,
  getAllNearTermPrograms,
  postValidation,
  deleteValidation,
  getAuthToken,
};
