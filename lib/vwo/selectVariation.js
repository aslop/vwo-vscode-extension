const vscode = require("vscode");
const tmpSettings = require("../getSettings");
const getAllVariations = require("./getAllVariations");
const showVariationQuickPick = require("./showVariationQuickPick");
const checkSettingsFileForProperty = require("./checkSettingsFileForProperty");
const path = require("path");
const posix = path.posix;

module.exports = () => {
  return new Promise(async (resolve, reject) => {
    let vwoSettings = await tmpSettings();
    if ((await checkSettingsFileForProperty("selectedVariation")) === false) {
      const selectedcampaignVariations = await getAllVariations(
        vwoSettings.selectedcampaign.id,
        vwoSettings.token
      );

      const selectedVariation = await showVariationQuickPick(
        selectedcampaignVariations
      );

      await addSelectionToJson(selectedVariation);

      setTimeout(() => {
        resolve();
      }, 500);
    } else {
      console.log("Variation already selected");
      resolve();
    }
  });
};

function addSelectionToJson(selectedVariation) {
  return new Promise(async (resolve, reject) => {
    const folderUri = vscode.workspace.workspaceFolders[0].uri;
    const fileUri = folderUri.with({
      path: posix.join(folderUri.path, "vwo.config.json")
    });
    let tmpSettings = JSON.parse(await vscode.workspace.fs.readFile(fileUri));
    tmpSettings.selectedVariation = {
      id: selectedVariation.id,
      label: selectedVariation.label
    };
    const newSet = Buffer.from(JSON.stringify(tmpSettings), "utf-8");
    await vscode.workspace.fs.writeFile(fileUri, newSet);
    resolve();
  });
}
