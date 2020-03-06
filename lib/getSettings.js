const vscode = require("vscode");
const path = require("path");
const posix = path.posix;

const folderUri = vscode.workspace.workspaceFolders[0].uri;
const fileUri = folderUri.with({
  path: posix.join(folderUri.path, "vwo.config.json")
});

module.exports = async () => {
  return JSON.parse(await vscode.workspace.fs.readFile(fileUri));
};
