import * as vscode from 'vscode'
import { jumpPointDecorator } from './decorator'

const colShadowRange = (line: number, char: number) =>
  new vscode.Range(line, char, line, char + 1)
const colLineShadowRange = (line: number) =>
  new vscode.Range(line, 0, line, 100)

function setupCommands(_context: vscode.ExtensionContext) {
  //
}

type MaaiMode = 'point' | 'line' | 'para'

const getConfig = () => vscode.workspace.getConfiguration('maaiCursor')
const getDistanceConfig = () => getConfig().get<number>('distance') || 5
const getModeConfig = () => getConfig().get<MaaiMode>('mode') || 'point'

export function activate(context: vscode.ExtensionContext) {
  let activeEditor = vscode.window.activeTextEditor

  setupCommands(context)

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

  function updateDecorations() {
    if (!activeEditor) return
    const DISTNACE = getDistanceConfig()
    const MODE = getModeConfig()

    const { character, line } = activeEditor.selection.anchor
    const firstLine = 0
    const lastLine = activeEditor.document.lineCount - 1
    const notCurrentLine = (v: number) => v !== line
    const upLine = Math.max(firstLine, line - DISTNACE)
    const dwLine = Math.min(lastLine, line + DISTNACE)
    const jetLines = [upLine, dwLine]

    const jumpPoints: vscode.DecorationOptions[] = jetLines
      .filter(notCurrentLine)
      .map((line) => ({
        range:
          MODE === 'point'
            ? colShadowRange(line, character)
            : MODE === 'line'
            ? colLineShadowRange(line)
            : colShadowRange(line, character),
      }))

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
