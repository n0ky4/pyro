import palettes from '@/assets/palette_drawings'
import { IRandomPalette } from './types'

function getRandomPalette(): IRandomPalette {
    const rnd = Math.floor(Math.random() * palettes.length)
    const palette = palettes[rnd]

    const colors = palette.map((color) => {
        return {
            hex: color,
            name: 'todo',
        }
    })

    return {
        type: 'random',
        colors,
    }
}

export default getRandomPalette
