import * as vscode from 'vscode'

export const jumpPointDecorator = {
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
