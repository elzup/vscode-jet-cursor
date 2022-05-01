import { calcDraw } from '../logic'

describe('calcDraw', () => {
  it('point mode', () => {
    const res = calcDraw(
      { distance: 5, mode: 'point', linePos: 'inside' },
      { line: 10, character: 4 },
      20
    )

    expect(res.upDecoLines).toHaveLength(0)
    expect(res.dwDecoLines).toHaveLength(0)
    expect(res.nextLines).toStrictEqual([5, 15])
  })

  it('overflow line', () => {
    const res = calcDraw(
      { distance: 5, mode: 'point', linePos: 'inside' },
      { line: 3, character: 4 },
      20
    )

    expect(res.nextLines).toStrictEqual([0, 8])
  })

  it('line mode', () => {
    const res = calcDraw(
      { distance: 5, mode: 'line', linePos: 'inside' },
      { line: 10, character: 4 },
      20
    )

    expect(res.upDecoLines).toStrictEqual([15])
    expect(res.dwDecoLines).toStrictEqual([5])
  })

  it('para mode', () => {
    const res = calcDraw(
      { distance: 5, mode: 'para', linePos: 'inside' },
      { line: 8, character: 4 },
      20
    )

    expect(res.upDecoLines).toStrictEqual([13, 18])
    expect(res.dwDecoLines).toStrictEqual([3])
  })

  it('draw outside', () => {
    const res = calcDraw(
      { distance: 5, mode: 'para', linePos: 'outside' },
      { line: 8, character: 4 },
      20
    )

    expect(res.upDecoLines).toStrictEqual([3])
    expect(res.dwDecoLines).toStrictEqual([13, 18])
  })
})
