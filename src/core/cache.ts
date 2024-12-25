import fs from 'fs'
import path from 'path'
import { HexAndName, IColorInfo, IColorNames } from './types'

export const COLORNAMES_PATH = path.resolve('src/assets/data/colornames.min.json')
export const DARKCOLORS_PATH = path.resolve('src/assets/data/dark-colors.json')
export const CACHED_COLORS_PATH = path.resolve('src/assets/colors')

let colorNames: IColorNames | null = null
let darkColors: HexAndName[] | null = null
let colors: Record<string, IColorInfo> | null = null

export function getDarkColors(): HexAndName[] {
    if (!darkColors) {
        const data = JSON.parse(fs.readFileSync(DARKCOLORS_PATH, 'utf-8'))
        darkColors = data
        return data
    }
    return darkColors
}

export function getColorNames(): IColorNames {
    if (!colorNames) {
        const data = JSON.parse(fs.readFileSync(COLORNAMES_PATH, 'utf-8'))
        colorNames = data
        return data
    }
    return colorNames
}

export function getColors(): Record<string, IColorInfo> {
    if (!colors) {
        const files = fs.readdirSync(CACHED_COLORS_PATH)
        let c: Record<string, IColorInfo> = {}
        for (const file of files) {
            const read = JSON.parse(fs.readFileSync(path.join(CACHED_COLORS_PATH, file), 'utf-8'))
            c = { ...c, ...read }
        }
        colors = c
    }
    return colors
}

function setupColors() {
    getColorNames()
    getDarkColors()
    getColors()
}

setupColors()
