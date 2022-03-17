import * as vscode from 'vscode'
import { btmBorderDeco, jumpPointDecorator, topBorderDeco } from './decorator'

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
    const nextLines = [upLine, dwLine].filter(notCurrentLine)

    const allLines = calcJetLines(line, lastLine, DISTNACE)

    const nextPoints = nextLines.map((line) => colShadowRange(line, character))

    activeEditor.setDecorations(jumpPointDecorator, nextPoints)
    const isOutside = false
    const [upDeco, dwDeco] = isOutside
      ? [topBorderDeco, btmBorderDeco]
      : [btmBorderDeco, topBorderDeco]

    if (MODE === 'point') {
    } else {
      const lines = { line: nextLines, para: allLines }[MODE]

      activeEditor.setDecorations(
        upDeco,
        lines.filter((l) => l < line).map(colLineShadowRange)
      )
      activeEditor.setDecorations(
        dwDeco,
        lines.filter((l) => l > line).map(colLineShadowRange)
      )
    }
  }
  function triggerUpdateDecorations() {
    updateDecorations()
  }
}

export function deactivate() {
  jumpPointDecorator.dispose()
}
