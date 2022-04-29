import * as vscode from 'vscode'

export const makeJumpPointDecorator = (color: string) =>
  vscode.window.createTextEditorDecorationType({
    backgroundColor: color,
    dark: {
      borderColor: 'white',
    },
    // borderColor: { id: 'editorCursor.background' },
    // not working
    // borderColor: new vscode.ThemeColor('editorCursor.background')
  })

const borderDecoBase: vscode.DecorationRenderOptions = {
  isWholeLine: true,
}

export const makeJumpLineDecorator = (
  borderLigth: string,
  borderDark: string,
  top: boolean
) =>
  vscode.window.createTextEditorDecorationType({
    ...borderDecoBase,
    borderColor: borderLigth,
    borderStyle: top ? 'solid none none none' : 'none none solid none',
    dark: {
      borderColor: borderDark,
    },
  })
