const vscode = require("vscode");
const settingsFile = require(`${vscode.workspace.workspaceFolders[0].uri.path}/vwo.config.json`);
module.exports = settingsFile;
