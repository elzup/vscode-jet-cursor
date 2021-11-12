import * as vscode from 'vscode'
import { jumpPointDecorator } from './decorator'

const cursorRange = (line: number, char: number) =>
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
    const jumpPoints: vscode.DecorationOptions[] = []

    const firstLine = 0
    const lastLine = activeEditor.document.lineCount - 1

    if (line > firstLine) {
      const upLine = Math.max(line - LINE_DIFF, firstLine)

      jumpPoints.push({ range: cursorRange(upLine, character) })
    }
    if (line < lastLine) {
      const dwLine = Math.min(line + LINE_DIFF, lastLine)

      jumpPoints.push({ range: cursorRange(dwLine, character) })
    }

    if (jumpPoints.length > 0) {
      activeEditor.setDecorations(jumpPointDecorator.decorator, jumpPoints)
    }
  }
  function triggerUpdateDecorations() {
    updateDecorations()
  }
}

export function deactivate() {}
