import { calcDraw } from '../logic'

describe('calcDraw', () => {
  it('point mode', () => {
    const res = calcDraw(
      { distance: 5, mode: 'point', linePos: 'inside' },
      { line: 4, character: 4 },
      10
    )

    expect(res).toMatchInlineSnapshot()
  })
})
