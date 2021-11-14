import * as vscode from 'vscode'

export const jumpPointDecorator = vscode.window.createTextEditorDecorationType({
  border: '1px solid black',
  backgroundColor: '#ffffff30',
  dark: {
    borderColor: 'white',
    backgroundColor: '#00000030',
  },
  // borderColor: { id: 'editorCursor.background' },
  // not working
  // borderColor: new vscode.ThemeColor('editorCursor.background')
})

export const jumpLineDecorator = vscode.window.createTextEditorDecorationType({
  backgroundColor: '#ffffff20',
  dark: {
    backgroundColor: '#00000020',
  },
})
