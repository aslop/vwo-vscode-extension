const vscode = require("vscode");
const fs = require("fs");

module.exports = property => {
  settingsFilePath = `${vscode.workspace.workspaceFolders[0].uri.path}/vwo.config.json`;
  const tmpSettings = JSON.parse(fs.readFileSync(settingsFilePath, "UTF-8"));
  let tmpProp = property.toString();
  if (tmpSettings[tmpProp]) {
    return true;
  } else {
    return false;
  }
};
