const vscode = require("vscode");
const path = require("path");
const posix = path.posix;
const vwoSettings = require("./getSettings");

module.exports = async () => {
  // let checkFiles = require("./vwo/checkSettingsFileForProperty");
  // checkFiles("fasdf");
  // console.log(await vwoSettings());
  // console.log(await vwoSettings());
  // const folderUri = vscode.workspace.workspaceFolders[0].uri;
  // const fileUri = folderUri.with({
  //   path: posix.join(folderUri.path, "vwo.config.json")
  // });
  // const curSet = await vscode.workspace.fs.readFile(fileUri);
  // let p = JSON.parse(curSet);
  // p.myThing = "asdf";
  // const newSet = Buffer.from(JSON.stringify(p), "utf-8");
  // await vscode.workspace.fs.writeFile(fileUri, newSet);
};
