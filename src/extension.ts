import * as vscode from 'vscode'
import { jumpPointDecorator } from './decorator'

const colShadowRange = (line: number, char: number) =>
  new vscode.Range(line, char, line, char + 1)

export function activate(context: vscode.ExtensionContext) {
  let activeEditor = vscode.window.activeTextEditor

  vscode.window.onDidChangeActiveTextEditor(
    (editor) => {
      activeEditor = editor
      if (editor) {
        triggerUpdateDecorations()
      }
    },
    null,
    context.subscriptions
  )

  vscode.window.onDidChangeTextEditorSelection(
    triggerUpdateDecorations,
    null,
    context.subscriptions
  )

  const LINE_DIFF = 5

  function updateDecorations() {
    if (!activeEditor) return

    const { character, line } = activeEditor.selection.anchor
    const firstLine = 0
    const lastLine = activeEditor.document.lineCount - 1
    const notCurrentLine = (v: number) => v !== line
    const upLine = Math.max(firstLine, line - LINE_DIFF)
    const dwLine = Math.min(lastLine, line + LINE_DIFF)
    const jetLines = [upLine, dwLine]

    const jumpPoints: vscode.DecorationOptions[] = jetLines
      .filter(notCurrentLine)
      .map((line) => ({ range: colShadowRange(line, character) }))

    if (jumpPoints.length > 0) {
      activeEditor.setDecorations(jumpPointDecorator, jumpPoints)
    }
  }
  function triggerUpdateDecorations() {
    updateDecorations()
  }
}

export function deactivate() {
  jumpPointDecorator.dispose()
}
