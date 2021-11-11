import * as vscode from 'vscode'

export function activate(context: vscode.ExtensionContext) {
  let activeEditor = vscode.window.activeTextEditor

  const jumpPointDecorator = {
    decorator: vscode.window.createTextEditorDecorationType({
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
    }),
  }
  let timeout: NodeJS.Timer | undefined = undefined

  vscode.window.onDidChangeTextEditorSelection(
    triggerUpdateDecorations,
    null,
    context.subscriptions
  )

  function updateDecorations() {
    if (!activeEditor) return

    const anchor = activeEditor.selection.anchor
    const upLine = anchor.line - 1
    const dwLine = anchor.line + 1

    const jumpPoints: vscode.DecorationOptions[] = []

    jumpPoints.push({
      range: new vscode.Range(
        upLine,
        anchor.character,
        upLine,
        anchor.character + 1
      ),
      hoverMessage: 'jump pos up',
    })
    jumpPoints.push({
      range: new vscode.Range(
        dwLine,
        anchor.character,
        dwLine,
        anchor.character + 1
      ),
      hoverMessage: 'jump pos down',
    })

    activeEditor.setDecorations(jumpPointDecorator.decorator, jumpPoints)
  }
  function triggerUpdateDecorations() {
    updateDecorations()
  }

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
}

export function deactivate() {}
