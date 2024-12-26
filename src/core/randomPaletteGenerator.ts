import { paletteNames, palettes } from '@/assets/data/palettes'
import { IRandomPalette } from './types'

function getRandomPalette(): IRandomPalette {
    const rnd = Math.floor(Math.random() * palettes.length)
    const palette = palettes[rnd]

    const colors = palette.map((color) => {
        const name = paletteNames[color as keyof typeof paletteNames] || 'Unknown'
        return {
            hex: '#' + color,
            name,
        }
    })

    return {
        type: 'random',
        colors,
    }
}

export default getRandomPalette
