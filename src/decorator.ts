import * as vscode from 'vscode'

function _varticalPosition(
  document: vscode.TextDocument,
  position: vscode.Position,
  characterDelta: number
): vscode.Position | null {
  if (position.line === 0) return null
  return position.translate({ characterDelta })
}

export default class Decolator {
  private readonly activeEditor = vscode.window.activeTextEditor
  private readonly timeout: NodeJS.Timer | undefined = undefined
  private readonly decorationTypes: vscode.TextEditorDecorationType[] = []

  constructor() {
    this.setDecorators()

    if (this.activeEditor) {
      this.triggerUpdateDecorations()
    }
  }
  changeTextEditorSelection(
    event: vscode.TextEditorSelectionChangeEvent
  ): void {
    if (!event || event.textEditor.selection.isEmpty) {
      this.triggerUpdateDecorations()
    }
  }

  private triggerUpdateDecorations(): void {
    this.updateDecorations()
  }

  private updateDecorations(): void {
    if (!this.activeEditor) return

    const anchor = this.activeEditor.selection.anchor
    const upLine = anchor.line - 1
    const dwLine = anchor.line + 1

    const jumpPoints: vscode.DecorationOptions[] = []

    jumpPoints.push({
      range: new vscode.Range(upLine, 0, upLine, 1),
      hoverMessage: 'jump pos up',
    })
    jumpPoints.push({
      range: new vscode.Range(dwLine, 0, dwLine, 1),
      hoverMessage: 'jump pos down',
    })

    this.activeEditor.setDecorations(this.decorationTypes[0], jumpPoints)
  }

  private setDecorators(): void {
    const jumpPointDecorationType =
      vscode.window.createTextEditorDecorationType({
        borderWidth: '1px',
        borderStyle: 'solid',
        overviewRulerColor: 'blue',
        overviewRulerLane: vscode.OverviewRulerLane.Right,
        light: {
          // this color will be used in light color themes
          borderColor: 'darkblue',
        },
        dark: {
          // this color will be used in dark color themes
          borderColor: 'lightblue',
        },
      })

    this.decorationTypes.push(jumpPointDecorationType)
  }
}
