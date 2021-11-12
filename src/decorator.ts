import * as vscode from 'vscode'

export const jumpPointDecorator = vscode.window.createTextEditorDecorationType({
  borderWidth: '1px',
  borderStyle: 'solid',
  light: {
    borderColor: 'black',
  },
  dark: {
    borderColor: 'white',
  },
  // not working
  // borderColor: new vscode.ThemeColor('editorCursor.background')
})
