const vscode = require("vscode");

module.exports = allOptions => {
  return new Promise((resolve, reject) => {
    //
    const quickPick = vscode.window.createQuickPick();
    quickPick.items = getQpItems(allOptions);
    quickPick.onDidChangeSelection(selection => {
      if (selection) {
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
    if (e.name != "Control") {
      tmpRes.push({ id: e.id, label: e.name });
    }
  });
  return tmpRes;
}
