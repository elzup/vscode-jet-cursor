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
  // borderColor: { id: 'editorCursor.background' },
  // not working
  // borderColor: new vscode.ThemeColor('editorCursor.background')
})
