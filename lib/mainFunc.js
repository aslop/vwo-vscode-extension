const vscode = require("vscode");
const vwoSettings = require("./getSettings");
const allCampaigns = require("./vwo/getAllCampaigns");
const selectCampaign = require("./vwo/selectCampaign");
const selectVariation = require("./vwo/selectVariation");

module.exports = async () => {
  await selectCampaign();
  await selectVariation();
};
