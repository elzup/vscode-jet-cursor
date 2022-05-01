import { Position } from 'vscode'

export type LinePos = 'inside' | 'outside'
export type MaaiMode = 'point' | 'line' | 'para'
export type Config = {
  distance: number
  mode: MaaiMode
  linePos: LinePos
}

export type Pos = Pick<Position, 'character' | 'line'>
