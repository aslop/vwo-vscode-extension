const axios = require("axios");

module.exports = async token => {
  return new Promise((resolve, reject) => {
    axios({
      method: "GET",
      url: "https://app.vwo.com/api/v2/accounts/current/campaigns",
      headers: {
        "Content-Type": "application/json",
        token: token
      }
    }).then(r => {
      resolve(r.data._data);
    });
  });
};
