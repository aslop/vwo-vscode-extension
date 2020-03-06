const vscode = require("vscode");
const vwoSettings = require("../getSettings");
const getAllVariations = require("./getAllVariations");
const showVariationQuickPick = require("./showVariationQuickPick");
const fs = require("fs");
const checkSettingsFileForProperty = require("./checkSettingsFileForProperty");

module.exports = () => {
  return new Promise(async (resolve, reject) => {
    if (checkSettingsFileForProperty("selectedVariation") === false) {
      const selectedCampainVariations = await getAllVariations(
        vwoSettings.selectedCampain.id,
        vwoSettings.token
      );

      const selectedVariation = await showVariationQuickPick(
        selectedCampainVariations
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
  return new Promise((resolve, reject) => {
    settingsFilePath = `${vscode.workspace.workspaceFolders[0].uri.path}/vwo.config.json`;
    const tmpSettings = JSON.parse(fs.readFileSync(settingsFilePath, "UTF-8"));
    tmpSettings.selectedVariation = {
      id: selectedVariation.id,
      label: selectedVariation.label
    };
    fs.writeFileSync(settingsFilePath, JSON.stringify(tmpSettings), "utf-8");
    vscode.window.showInformationMessage("Added to your settings file");
    resolve();
  });
}
