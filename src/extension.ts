import * as vscode from 'vscode'
import Decorator from './decorator'

export function activate(context: vscode.ExtensionContext) {
  let decorator = new Decorator()

  vscode.window.onDidChangeTextEditorSelection(
    decorator.changeTextEditorSelection,
    null,
    context.subscriptions
  )
  // vscode.window.onDidChangeActiveTextEditor(
  //   (editor) => {
  //     decorator.changeActiveTextEditor(editor)
  //   },
  //   null,
  //   context.subscriptions
  // )

  // vscode.workspace.onDidChangeTextDocument(
  //   (event) => {
  //     decorator.changeTextDocument(event)
  //   },
  //   null,
  //   context.subscriptions
  // )
}

export function deactivate() {}
