const tmpSettings = require("./getSettings");
const axios = require("axios");
const vscode = require("vscode");
const path = require("path");
const posix = path.posix;

module.exports = () => {
  return new Promise(async (resolve, reject) => {
    let vwoSettings = await tmpSettings();
    let code = getCurretFilesCode();
    let bundleFile = await checkForBundleFile();

    if (bundleFile != false) {
      await pushToVwo(bundleFile);
      vscode.window.showInformationMessage("Pushed code from bundle file");
    } else {
      await pushToVwo(code);
      vscode.window.showInformationMessage("Pushed code from current file");
    }
  });
};

async function checkForBundleFile() {
  const folderUri = vscode.workspace.workspaceFolders[0].uri;
  const fileUri = folderUri.with({
    path: posix.join(folderUri.path, "vwo.config.json")
  });
  let settingsFile = JSON.parse(await vscode.workspace.fs.readFile(fileUri));

  if ("bundleFile" in settingsFile) {
    const folderUri = vscode.workspace.workspaceFolders[0].uri;
    const fileUri = folderUri.with({
      path: posix.join(folderUri.path, settingsFile["bundleFile"])
    });
    let bundleFile = await vscode.workspace.fs.readFile(fileUri);
    return bundleFile.toString("utf8");
  } else {
    return false;
  }
}

function pushToVwo(code) {
  return new Promise(async (resolve, reject) => {
    let vwoSettings = await tmpSettings();
    await axios({
      method: "PATCH",
      url: `${vwoSettings.baseUrl}accounts/current/campaigns/${vwoSettings.selectedcampaign.id}/variations/${vwoSettings.selectedVariation.id}`,
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
