import * as vscode from 'vscode'
import { jumpLineDecorator, jumpPointDecorator } from './decorator'

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

const range = (n: number) => [...Array(n).keys()]

const calcJetLines = (current: number, end: number, distance: number) => {
  const offset = current % distance

  return range(Math.floor(end / distance)).map((i) => i * distance + offset)
}

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
    const allLines = calcJetLines(line, lastLine, DISTNACE)
    const nextLines = [upLine, dwLine]
    const jetLines = (MODE === 'para' ? allLines : nextLines).filter(
      notCurrentLine
    )

    const jumpPoints = jetLines.map((line) => colShadowRange(line, character))
    const jumpLines = jetLines.map(colLineShadowRange)

    if (MODE === 'point') {
      activeEditor.setDecorations(jumpPointDecorator, jumpPoints)
    } else if (MODE === 'line') {
      activeEditor.setDecorations(jumpPointDecorator, jumpPoints)
      activeEditor.setDecorations(jumpLineDecorator, jumpLines)
    } else if (MODE === 'para') {
      activeEditor.setDecorations(jumpLineDecorator, jumpLines)
    }
  }
  function triggerUpdateDecorations() {
    updateDecorations()
  }
}

export function deactivate() {
  jumpPointDecorator.dispose()
}
