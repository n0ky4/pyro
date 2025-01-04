export interface RGB {
    r: number
    g: number
    b: number
}

export interface HSL {
    h: number
    s: number
    l: number
}

export interface HSV {
    h: number
    s: number
    v: number
}

export function formatRGB(rgb: RGB) {
    const red = Math.round(rgb.r * 255)
    const green = Math.round(rgb.g * 255)
    const blue = Math.round(rgb.b * 255)
    return [red, green, blue]
}

export function sanitizeColor(color: string) {
    return color.replace(/[^a-f0-9]/gi, '')
}

export function isValidColor(color: string) {
    const rgx = /^#?([0-9A-Fa-f]{3}){1,2}$/
    return rgx.test(color)
}

export function getFullLengthHex(hex: string) {
    if (hex.length === 3) {
        hex = hex
            .split('')
            .map((char) => char + char)
            .join('')
    }
    return hex
}

function hslHsv(x: number, y: number, z: number, symbols = true, percent = true) {
    x = Math.round(x)
    y = Math.round(y * (percent ? 100 : 1))
    z = Math.round(z * (percent ? 100 : 1))
    if (symbols) return [x + '°', y + '%', z + '%']
    return [x, y, z]
}

export function formatHSL(hsl: HSL | undefined, symbols: boolean = true, percent: boolean = true) {
    return hslHsv(hsl?.h || 0, hsl?.s || 0, hsl?.l || 0, symbols, percent)
}

export function formatHSV(hsv: HSV | undefined, symbols: boolean = true, percent: boolean = true) {
    return hslHsv(hsv?.h || 0, hsv?.s || 0, hsv?.v || 0, symbols, percent)
}

export function removeHash(hex: string) {
    if (hex.startsWith('#')) hex = hex.slice(1)
    return hex
}

export function formatCMYK(cmyk: { c: number; m: number; y: number; k: number }) {
    return [cmyk.c + '%', cmyk.m + '%', cmyk.y + '%', cmyk.k + '%']
}

export function addHash(hex: string) {
    if (!hex.startsWith('#')) hex = '#' + hex
    return hex
}

export function getPredominantColors([r, g, b]: number[]): string | null {
    const colors = ['vermelha', 'verde', 'azul']
    const values = [r, g, b]

    // check for monochromatic colors
    if (new Set(values).size === 1) return null

    // sort the values and get the indices
    const sortedIndices = [0, 1, 2].sort((a, b) => values[b] - values[a])
    const [firstIndex, secondIndex] = sortedIndices

    const max1 = values[firstIndex]
    const max2 = values[secondIndex]

    return max1 === max2 ? `${colors[firstIndex]} e ${colors[secondIndex]}` : colors[firstIndex]
}

interface GetPredominantLabelSettings {
    rgb: number[]
    name: string
    percent: {
        r: number
        g: number
        b: number
    }
}
export function getPredominantLabel({ rgb, name, percent }: GetPredominantLabelSettings): string {
    const predominant = getPredominantColors(rgb)
    const { r, g, b } = percent
    return `${name} é composta por ${r}% de vermelho, ${g}% de verde e ${b}% de azul. ${
        predominant ? `Contém majoritariamente a cor ${predominant}.` : 'É uma cor neutra.'
    }`
}
