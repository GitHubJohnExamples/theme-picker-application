interface Color {
  name: string
  rgb: string
}

export const getDifferenceBlendColor = (
  color1: Color,
  color2: Color
): string | undefined => {
  if (color1.rgb === undefined && color2.rgb === undefined) {
    return ''
  }

  const hexColor1 = color1.rgb
  const hexColor2 = color2.rgb

  const rgbColor1 = parseInt(hexColor1, 16)
  const rgbColor2 = parseInt(hexColor2, 16)

  const differenceColor = (rgbColor1 ^ rgbColor2).toString(16).padStart(6, '0')

  return differenceColor
}

export const hasNumber = (backgroundColor: string) => {
  if (/\d/.test(backgroundColor)) {
    return '#' + backgroundColor
  } else {
    return backgroundColor
  }
}
