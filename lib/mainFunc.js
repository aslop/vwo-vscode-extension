const selectCampaign = require("./vwo/selectCampaign");
const selectVariation = require("./vwo/selectVariation");

module.exports = async () => {
  await selectCampaign();
  await selectVariation();
};
