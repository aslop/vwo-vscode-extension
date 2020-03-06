const vscode = require("vscode");
const vwoSettings = require("../getSettings");
const allCampaigns = require("./getAllCampaigns");
const showCampaignQP = require("./showCampaignQuickPick");
const fs = require("fs");
const checkSettingsFileForProperty = require("./checkSettingsFileForProperty");

module.exports = () => {
  return new Promise(async (resolve, reject) => {
    if (checkSettingsFileForProperty("selectedCampain") === false) {
      const allVwoCampaigns = await allCampaigns(vwoSettings.token);
      const selectedCampain = await showCampaignQP(allVwoCampaigns);
      await addSelectionToJson(selectedCampain);
      resolve();
    } else {
      console.log("Campaign already selected");
      resolve();
    }
  });
};

function addSelectionToJson(selectedCampain) {
  return new Promise((resolve, reject) => {
    settingsFilePath = `${vscode.workspace.workspaceFolders[0].uri.path}/vwo.config.json`;
    const tmpSettings = JSON.parse(fs.readFileSync(settingsFilePath, "UTF-8"));
    tmpSettings.selectedCampain = {
      id: selectedCampain.id,
      label: selectedCampain.label
    };
    fs.writeFileSync(settingsFilePath, JSON.stringify(tmpSettings), "utf-8");
    vscode.window.showInformationMessage("Added to your settings file");
    resolve();
  });
}
