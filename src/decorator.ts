import * as vscode from 'vscode'

export const jumpPointDecorator = vscode.window.createTextEditorDecorationType({
  border: '1px solid black',
  backgroundColor: '#88888830',
  dark: {
    borderColor: 'white',
    backgroundColor: '#88888830',
  },
  // borderColor: { id: 'editorCursor.background' },
  // not working
  // borderColor: new vscode.ThemeColor('editorCursor.background')
})

export const jumpLineDecorator = vscode.window.createTextEditorDecorationType({
  backgroundColor: '#88888820',
  dark: {
    backgroundColor: '#88888820',
  },
})
