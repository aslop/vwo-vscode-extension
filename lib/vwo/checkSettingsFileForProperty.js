const vscode = require("vscode");
const path = require("path");
const posix = path.posix;

module.exports = async property => {
  const folderUri = vscode.workspace.workspaceFolders[0].uri;
  const fileUri = folderUri.with({
    path: posix.join(folderUri.path, "vwo.config.json")
  });
  const curSet = await vscode.workspace.fs.readFile(fileUri);
  let settingsFile = JSON.parse(curSet);
  if (property.toString() in settingsFile) {
    return true;
  } else {
    return false;
  }
};
