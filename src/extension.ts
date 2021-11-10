import * as vscode from 'vscode'

export function activate(context: vscode.ExtensionContext) {
  console.log('Congratulations, your extension "maai" is now active!')

  let disposable = vscode.commands.registerCommand('maai.helloWorld', () => {
    vscode.window.showInformationMessage('Hello World from maai!')
  })

  context.subscriptions.push(disposable)
}

// this method is called when your extension is deactivated
export function deactivate() {}
