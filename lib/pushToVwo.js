const vwoSettings = require("./getSettings");
const axios = require("axios");
const vscode = require("vscode");

module.exports = () => {
  return new Promise(async (resolve, reject) => {
    let code = getCurretFilesCode();
    await pushToVwo(code);
    vscode.window.showInformationMessage("Pushed code from current file");
  });
};

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
