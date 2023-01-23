const apiKey = "Token " + process.env.REACT_APP_API_KEY;
const domain = process.env.REACT_APP_DOMAIN_URL;

// const screensEndpoint = 'https://cobenefits-api.herokuapp.com/api/screens/';
// const householdsEndpoint = 'https://cobenefits-api.herokuapp.com/api/householdmembers/';
// const incomeStreamsEndpoint = 'https://cobenefits-api.herokuapp.com/api/incomestreams/';
// const expensesEndpoint = 'https://cobenefits-api.herokuapp.com/api/expenses/';
// const userEndpoint = 'https://cobenefits-api.herokuapp.com/api/users/';
// const messageEndpoint = 'https://cobenefits-api.herokuapp.com/api/messages/';
// let eligibilityEndpoint = 'https://cobenefits-api.herokuapp.com/api/eligibility/';
// let screensUpdateEndpoint = 'https://cobenefits-api.herokuapp.com/api/screens/';

const screensEndpoint = `${domain}/api/screens/`;
const householdsEndpoint = `${domain}/api/householdmembers/`;
const incomeStreamsEndpoint = `${domain}/api/incomestreams/`;
const expensesEndpoint = `${domain}/api/expenses/`;
const userEndpoint = `${domain}/api/users/`;
const messageEndpoint = `${domain}/api/messages/`;
let eligibilityEndpoint = `${domain}/api/eligibility/`;
let screensUpdateEndpoint = `${domain}/api/screens/`;

const header = {
  'Accept': 'application/json',
  'Content-Type': 'application/json',
  'Authorization': apiKey
};

const postUser = (userData) => {
  return fetch(userEndpoint, {
    method: 'POST',
    body: JSON.stringify(userData),
    headers: header
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('A user with this email or phone number already exists in our system.');
    }
    return response.json();
  });
}

const postMessage = (messageData) => {
  return fetch(messageEndpoint, {
    method: 'POST',
    body: JSON.stringify(messageData),
    headers: header
  })
    .then(response => {
      if(!response.ok) {
        throw new Error(`${response.status} ${response.statusText}`);
      }
      return response.json();
    })
}

const postPartialParentScreen = (partialFormData) => {
  return fetch(screensEndpoint, {
    method: 'POST',
    body: JSON.stringify(partialFormData),
    headers: header
  })
    .then(response => {
      if(!response.ok) {
        throw new Error(`${response.status} ${response.statusText}`);
      }
      return response.json();
    })
}

const updateScreen = (screenerId, partialFormData) => {
  return fetch(screensUpdateEndpoint + screenerId + '/', {
    method: 'PATCH',
    body: JSON.stringify(partialFormData),
    headers: header
  })
    .then(response => {
      if(!response.ok) {
        throw new Error(`${response.status} ${response.statusText}`);
      }
      return response.json();
    })
}

const postHouseholdMemberData = (householdMemberData) => {
  return fetch(householdsEndpoint, {
    method: 'POST',
    body: JSON.stringify(householdMemberData),
    headers: header
  })
    .then(response => {
      if(!response.ok) {
        throw new Error(`${response.status} ${response.statusText}`);
      }
      return response.json();
    })
}

const postHouseholdMemberIncomeStream = (singleIncomeStream) => {
  return fetch(incomeStreamsEndpoint, {
    method: 'POST',
    body: JSON.stringify(singleIncomeStream),
    headers: header
  })
    .then(response => {
      if(!response.ok) {
        throw new Error(`${response.status} ${response.statusText}`);
      }
      return response.json();
    })
}

const postHouseholdMemberExpense = (singleExpense) => {
  return fetch(expensesEndpoint, {
    method: 'POST',
    body: JSON.stringify(singleExpense),
    headers: header
  })
    .then(response => {
      if(!response.ok) {
        throw new Error(`${response.status} ${response.statusText}`);
      }
      return response.json();
    })
}

const getEligibility = (screenerId, locale) => {
  const headerWithLocale = {
    ...header,
    'Accept-Language': locale === 'es' ? 'es,en-us' : 'en-us'
  };

  return fetch(eligibilityEndpoint + screenerId, {
    method: "GET",
    headers: headerWithLocale
  })
    .then(response => {
      if(!response.ok) {
        throw new Error(`${response.status} ${response.statusText}`);
      }
      return response.json();
    })
}

export {
  postPartialParentScreen,
  updateScreen,
  postUser,
  postMessage,
  postHouseholdMemberData,
  postHouseholdMemberIncomeStream,
  postHouseholdMemberExpense,
  getEligibility,
}
