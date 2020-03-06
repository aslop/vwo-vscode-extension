const vscode = require("vscode");

module.exports = allCampaigns => {
  return new Promise((resolve, reject) => {
    //
    const quickPick = vscode.window.createQuickPick();
    quickPick.items = getQpItems(allCampaigns);
    quickPick.onDidChangeSelection(selection => {
      if (selection) {
        // vscode.window.showInformationMessage(`Selected ${selection[0].label}`);
        resolve(selection[0]);
        quickPick.hide();
      }
    });

    quickPick.onDidHide(() => quickPick.dispose());
    quickPick.show();
    //
  });
};

function getQpItems(options) {
  let tmpRes = [];

  options.forEach(e => {
    tmpRes.push({ id: e.id, label: e.name, status: e.status });
  });
  return tmpRes;
}
