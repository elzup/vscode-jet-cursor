import { Config, Pos } from './types'

const range = (n: number) => [...Array(n).keys()]

export const calcJetLines = (
  current: number,
  end: number,
  distance: number
) => {
  const offset = current % distance

  return range(Math.floor(end / distance)).map((i) => i * distance + offset)
}

export function calcDraw(
  config: Config,
  { line, character }: Pos,
  lastLine: number
) {
  const firstLine = 0
  const notCurrentLine = (v: number) => v !== line
  const upLine = Math.max(firstLine, line - config.distance)
  const dwLine = Math.min(lastLine, line + config.distance)
  const nextLines = [upLine, dwLine].filter(notCurrentLine)

  const allLines = calcJetLines(line, lastLine, config.distance)

  const lines = { point: [], line: nextLines, para: allLines }[config.mode]
  const nextPoints: Pos[] = nextLines.map((line) => ({ line, character }))

  const isOutside = config.linePos === 'outside'
  const upLines = lines.filter((l) => l < line)
  const dwLines = lines.filter((l) => l > line)

  const [upDecoLines, dwDecoLines] = isOutside
    ? [upLines, dwLines]
    : [dwLines, upLines]

  return { lines, nextLines, nextPoints, upDecoLines, dwDecoLines }
}
