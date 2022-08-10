const apiKey = "Token " + process.env.REACT_APP_API_KEY;

const screensEndpoint = 'https://cobenefits-api.herokuapp.com/api/screens/';
const householdsEndpoint = 'https://cobenefits-api.herokuapp.com/api/householdmembers/';
const incomeStreamsEndpoint = 'https://cobenefits-api.herokuapp.com/api/incomestreams/';
const expensesEndpoint = 'https://cobenefits-api.herokuapp.com/api/expenses/';
let eligibilityEndpoint = 'https://cobenefits-api.herokuapp.com/api/eligibility/';
let emailRequestEndpoint = 'https://cobenefits-api.herokuapp.com/api/send/';

const header = {
  'Accept': 'application/json',
  'Content-Type': 'application/json',
  'Authorization': apiKey
};

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

const getEligibility = (screenerId) => {
  return fetch(eligibilityEndpoint + screenerId, {
    method: "GET",
    headers: header
  })
    .then(response => {
      if(!response.ok) {
        throw new Error(`${response.status} ${response.statusText}`);
      }
      return response.json();
    })
}

const postEmailRequest = (screenerId, email) => {
  return fetch(emailRequestEndpoint + screenerId, {
    method: 'POST',
    body: JSON.stringify({ email: email }),
    headers: header
  })
    .then(response => {
      if(!response.ok) {
        throw new Error(`${response.status} ${response.statusText}`);
      }
      return response.json();
    })
}

module.exports = {
  postPartialParentScreen,
  postHouseholdMemberData,
  postHouseholdMemberIncomeStream,
  postHouseholdMemberExpense,
  getEligibility,
  postEmailRequest
}