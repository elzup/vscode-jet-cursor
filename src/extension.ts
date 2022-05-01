import * as vscode from 'vscode'
import { makeJumpLineDecorator, makeJumpPointDecorator } from './decorator'
import { calcDraw } from './logic'
import { Config, LinePos, MaaiMode, Pos } from './types'

const colShadowRange = ({ line, character }: Pos) =>
  new vscode.Range(line, character, line, character + 1)
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

const getConfig = () => vscode.workspace.getConfiguration('maaiCursor')
const getDistanceConfig = () => getConfig().get<number>('distance') ?? 5

type Color = string
const getModeConfig = () => getConfig().get<MaaiMode>('mode') || 'line'

const getBorderColorLightConfig = () =>
  getConfig().get<Color>('borderColorLight') ?? '#ffffff40'
const getBorderColorDarkConfig = () =>
  getConfig().get<Color>('borderColorDark') ?? '#00000040'
const getPointerColorConfig = () =>
  getConfig().get<Color>('pointerColor') ?? '#88888850'
const getLinePositionInOutConfig = () =>
  getConfig().get<LinePos>('linePositionInOut') ?? 'outside'

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

    const lastLine = activeEditor.document.lineCount - 1
    const config: Config = {
      distance: getDistanceConfig(),
      mode: getModeConfig(),
      linePos: getLinePositionInOutConfig(),
    }

    const { anchor } = activeEditor.selection
    const { nextPoints, upDecoLines, dwDecoLines } = calcDraw(
      config,
      anchor,
      lastLine
    )
    const isOutside = config.linePos === 'outside'
    const [upDeco, dwDeco] = isOutside
      ? [decos.topLineDeco, decos.btmLineDeco]
      : [decos.btmLineDeco, decos.topLineDeco]

    activeEditor.setDecorations(decos.pointDeco, nextPoints.map(colShadowRange))
    activeEditor.setDecorations(upDeco, upDecoLines.map(colLineShadowRange))
    activeEditor.setDecorations(dwDeco, dwDecoLines.map(colLineShadowRange))
  }
  function triggerUpdateDecorations() {
    updateDecorations()
  }
}

export function deactivate() {}
