const vwoSettings = require("./getSettings");
const axios = require("axios");
const vscode = require("vscode");
const checkSettingsFileForProperty = require("./vwo/checkSettingsFileForProperty");
const fs = require("fs");

module.exports = () => {
  return new Promise(async (resolve, reject) => {
    let code = getCurretFilesCode();
    let bundleFile = checkForBundleFile();

    if (bundleFile != false) {
      await pushToVwo(bundleFile);
      vscode.window.showInformationMessage("Pushed code from bundle file");
    } else {
      await pushToVwo(code);
      vscode.window.showInformationMessage("Pushed code from current file");
    }
  });
};

function checkForBundleFile() {
  const settingsFile = require(`${vscode.workspace.workspaceFolders[0].uri.path}/vwo.config.json`);
  const bundleFile = require(`${vscode.workspace.workspaceFolders[0].uri.path}/vwo.config.json`);

  if (checkSettingsFileForProperty("bundleFile") != false) {
    // let tmpBundleFile = require(`${vscode.workspace.workspaceFolders[0].uri.path}/${settingsFile.bundleFile}`);
    // return tmpBundleFile;
    let tmpBundleFile = fs.readFileSync(
      `${vscode.workspace.workspaceFolders[0].uri.path}/${settingsFile.bundleFile}`,
      "utf-8"
    );

    return tmpBundleFile;
  } else {
    return false;
  }
}

function pushToVwo(code) {
  return new Promise(async (resolve, reject) => {
    await axios({
      method: "PATCH",
      url: `${vwoSettings.baseUrl}accounts/current/campaigns/${vwoSettings.selectedCampain.id}/variations/${vwoSettings.selectedVariation.id}`,
      headers: { token: vwoSettings.token, "Content-Type": "application/json" },
      data: {
        variations: {
          name: vwoSettings.selectedVariation.label,
          changes: `<script>${code}</script><style>* { color: red; }</style>`
        }
      }
    });
    resolve();
  });
}

function getCurretFilesCode() {
  let editor = vscode.window.activeTextEditor;
  if (editor) {
    let document = editor.document;
    let text = document.getText(0, document.lineCount.length);
    return text;
  }
}
