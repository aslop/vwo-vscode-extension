const axios = require("axios");

module.exports = (id, token) => {
  return new Promise((resolve, reject) => {
    axios({
      method: "GET",
      url: `https://app.vwo.com/api/v2/accounts/current/campaigns/${id}/variations`,
      headers: { token: token, "Content-Type": "application/json" }
    }).then(r => {
      resolve(r.data._data);
    });
  });
};
