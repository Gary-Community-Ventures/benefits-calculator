const apiKey = "Token " + process.env.REACT_APP_API_KEY;

const getUserBenefits = (screenerId) => {
  return fetch(`https://cobenefits-api.herokuapp.com/api/eligibility/${screenerId}`, {
    method: "GET",
    headers: {
      "Authorization": apiKey,
      "Content-Type": "application/json"
    }
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