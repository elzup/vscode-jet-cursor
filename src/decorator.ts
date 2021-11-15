import * as vscode from 'vscode'

export const jumpPointDecorator = vscode.window.createTextEditorDecorationType({
  border: '1px solid black',
  backgroundColor: '#88888850',
  dark: {
    borderColor: 'white',
  },
  // borderColor: { id: 'editorCursor.background' },
  // not working
  // borderColor: new vscode.ThemeColor('editorCursor.background')
})

export const jumpLineDecorator = vscode.window.createTextEditorDecorationType({
  backgroundColor: '#88888840',
})
