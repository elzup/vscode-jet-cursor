import * as vscode from 'vscode'
import { makeJumpLineDecorator, makeJumpPointDecorator } from './decorator'

const colShadowRange = (line: number, char: number) =>
  new vscode.Range(line, char, line, char + 1)
const colLineShadowRange = (line: number) =>
  new vscode.Range(line, 0, line, 100)

function setupCommands(ctx: vscode.ExtensionContext) {
  const BORDER_COLOR_LIGHT = getBorderColorLightConfig()
  const BORDER_COLOR_DARK = getBorderColorDarkConfig()
  const BORDER_COLOR_POINTER = getPointerColorConfig()
  const pointDeco = makeJumpPointDecorator(BORDER_COLOR_POINTER)
  const topLineDeco = makeJumpLineDecorator(
    BORDER_COLOR_LIGHT,
    BORDER_COLOR_DARK,
    true
  )
  const btmLineDeco = makeJumpLineDecorator(
    BORDER_COLOR_LIGHT,
    BORDER_COLOR_DARK,
    false
  )
  const decos = { pointDeco, topLineDeco, btmLineDeco }

  ctx.globalState.update('dynamicDecos', decos)
  return { decos }
}

type MaaiMode = 'point' | 'line' | 'para'

const getConfig = () => vscode.workspace.getConfiguration('maaiCursor')
const getDistanceConfig = () => getConfig().get<number>('distance') || 5

type Color = string
const getModeConfig = () => getConfig().get<MaaiMode>('mode') || 'point'

const getBorderColorLightConfig = () =>
  getConfig().get<Color>('borderColorLight') || '#ffffff40'
const getBorderColorDarkConfig = () =>
  getConfig().get<Color>('borderColorDark') || '#00000040'
const getPointerColorConfig = () =>
  getConfig().get<Color>('pointerColor') || '#88888850'

const range = (n: number) => [...Array(n).keys()]

const calcJetLines = (current: number, end: number, distance: number) => {
  const offset = current % distance

  return range(Math.floor(end / distance)).map((i) => i * distance + offset)
}

export function activate(context: vscode.ExtensionContext) {
  let activeEditor = vscode.window.activeTextEditor

  const { decos } = setupCommands(context)

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

    activeEditor.setDecorations(decos.pointDeco, nextPoints)

    const isOutside = false
    const [upDeco, dwDeco] = isOutside
      ? [decos.topLineDeco, decos.btmLineDeco]
      : [decos.btmLineDeco, decos.topLineDeco]

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

export function deactivate() {}
