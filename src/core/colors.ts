import { getColorNames, getDarkColors } from './cache'

const colorNames = getColorNames()
const darkColors = getDarkColors()
const colorKeys = Object.keys(colorNames)

export { colorKeys, colorNames, darkColors }
