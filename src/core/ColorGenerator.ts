import colorInfo from './colorInfo'
import { colorKeys, darkColors } from './colors'
import { HexAndName, IColorInfo } from './types'

type ColorGeneratorType = 'hex' | 'named'

interface GetRandomColorsConfig {
    type: ColorGeneratorType
    count: number
    unique?: boolean
}

const color = createColorGenerator()

function createColorGenerator() {
    function getRandomColorHex() {
        const hex = Math.random().toString(16).slice(2, 8)
        return `#${hex}`
    }

    /**
     * Generates a random color
     * @param {ColorGeneratorType} type - type of color to generate (hex or named)
     * @returns {string} color hex value
     * @example
     * const color = getRandomColor('hex')
     * console.log(color)
     */
    function getRandomColor(type: ColorGeneratorType): string {
        if (type === 'hex') return getRandomColorHex()

        const rndIndex = Math.floor(Math.random() * colorKeys.length)
        const hex = colorKeys[rndIndex]
        return hex
    }

    /**
     * Generates a random dark color hex value
     * @returns {string} color hex value
     * @example
     * const color = getRandomDarkColor()
     * console.log(color)
     */
    function getRandomDarkColor(): HexAndName {
        const rndIndex = Math.floor(Math.random() * darkColors.length)
        const color = darkColors[rndIndex]
        return color
    }

    /**
     * Generates a list of random colors
     * @param {GetRandomColorsConfig} config - config object
     * @returns {string[]} list of color hex values
     * @example
     * const colors = getRandomColors({ type: 'hex', count: 5, unique: true })
     * console.log(colors)
     */
    function getRandomColors(config: GetRandomColorsConfig): string[] {
        const { type, count, unique: _unique } = config
        const unique = _unique || false

        const colors: string[] = []
        while (colors.length < count) {
            const color = getRandomColor(type)
            if (unique && colors.includes(color)) continue
            colors.push(color)
        }

        return colors
    }

    function getBrainstormColors(): IColorInfo[] {
        const colors = color.getRandomColors({
            type: 'named',
            count: 10,
            unique: true,
        })

        return colors.map((hex) => colorInfo.getColorInfo(hex))
    }

    return {
        getRandomColor,
        getRandomDarkColor,
        getRandomColors,
        getBrainstormColors,
    }
}

export default color
