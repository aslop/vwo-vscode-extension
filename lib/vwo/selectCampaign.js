const vscode = require("vscode");
const tmpSettings = require("../getSettings");
const allCampaigns = require("./getAllCampaigns");
const showCampaignQP = require("./showCampaignQuickPick");
const checkSettingsFileForProperty = require("./checkSettingsFileForProperty");
const path = require("path");
const posix = path.posix;

module.exports = () => {
  return new Promise(async (resolve, reject) => {
    let vwoSettings = await tmpSettings();
    if ((await checkSettingsFileForProperty("selectedcampaign")) === false) {
      const allVwoCampaigns = await allCampaigns(vwoSettings.token);
      const selectedCampaign = await showCampaignQP(allVwoCampaigns);
      await addSelectionToJson(selectedCampaign);
      resolve();
    } else {
      console.log("Campaign already selected");
      resolve();
    }
  });
};

function addSelectionToJson(selectedcampaign) {
  return new Promise(async (resolve, reject) => {
    const folderUri = vscode.workspace.workspaceFolders[0].uri;
    const fileUri = folderUri.with({
      path: posix.join(folderUri.path, "vwo.config.json")
    });
    let tmpSettings = JSON.parse(await vscode.workspace.fs.readFile(fileUri));
    tmpSettings.selectedcampaign = {
      id: selectedcampaign.id,
      label: selectedcampaign.label
    };
    const newSet = Buffer.from(JSON.stringify(tmpSettings), "utf-8");
    await vscode.workspace.fs.writeFile(fileUri, newSet);
    resolve();
  });
}
