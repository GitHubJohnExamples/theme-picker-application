import { getDifferenceBlendColor, hasNumber } from '../utils/colorUtils'

describe('getDifferenceBlendColor', () => {
  it('returns the difference blend color', () => {
    const color1 = { name: 'Red', rgb: 'FF0000' }
    const color2 = { name: 'Green', rgb: '008000' }

    const result = getDifferenceBlendColor(color1, color2)

    expect(result).toBe('ff8000')
  })

  it('returns an #000000 rgb color when both rgb code parameters are empty', () => {
    const color1 = { name: 'Red', rgb: '' }
    const color2 = { name: 'Green', rgb: '' }

    const result = getDifferenceBlendColor(color1, color2)

    expect(result).toBe('000000')
  })
})

describe('hasNumber', () => {
  it('appends "#" to the background color if it contains a number', () => {
    const backgroundColor = 'abc123'

    const result = hasNumber(backgroundColor)

    expect(result).toBe(`#${backgroundColor}`)
  })

  it('returns the original background color if it does not contain a number', () => {
    const backgroundColor = 'abcdef'

    const result = hasNumber(backgroundColor)

    expect(result).toBe(backgroundColor)
  })
})
