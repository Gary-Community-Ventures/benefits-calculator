const apiKey = "Token " + process.env.REACT_APP_API_KEY;

const screensEndpoint = 'https://cobenefits-api.herokuapp.com/api/screens/';
const householdsEndpoint = 'https://cobenefits-api.herokuapp.com/api/householdmembers/';
const incomeStreamsEndpoint = 'https://cobenefits-api.herokuapp.com/api/incomestreams/';
const expensesEndpoint = 'https://cobenefits-api.herokuapp.com/api/expenses/';
let eligibilityEndpoint = 'https://cobenefits-api.herokuapp.com/api/eligibility/';

const header = {
  'Accept': 'application/json',
  'Content-Type': 'application/json',
  'Authorization': apiKey
};

const postParentScreen = (partialFormData) => {
  return fetch(screensEndpoint, {
    body: JSON.stringify(partialFormData),
    method: "POST",
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
  getUserBenefits,
}