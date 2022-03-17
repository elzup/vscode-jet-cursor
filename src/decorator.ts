import * as vscode from 'vscode'

export const jumpPointDecorator = vscode.window.createTextEditorDecorationType({
  backgroundColor: '#88888850',
  dark: {
    borderColor: 'white',
  },
  // borderColor: { id: 'editorCursor.background' },
  // not working
  // borderColor: new vscode.ThemeColor('editorCursor.background')
})

export const jumpLineDecorator = vscode.window.createTextEditorDecorationType({
  backgroundColor: '#44444440',
})

export const topBorderDeco = vscode.window.createTextEditorDecorationType({
  isWholeLine: true,
  borderStyle: 'solid none none none',
  borderColor: '#00000020',
  dark: {
    borderColor: '#ffffff20',
  },
})
export const btmBorderDeco = vscode.window.createTextEditorDecorationType({
  isWholeLine: true,
  borderStyle: 'none none solid none',
  borderColor: '#00000020',
  dark: {
    borderColor: '#ffffff20',
  },
})
