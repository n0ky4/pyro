import { Color, Hsv, formatHex, hsv } from 'culori'
import { IPalettes } from './types'

const palette = createPaletteGenerator()

function createPaletteGenerator() {
    function complementary(hsv: Hsv): string[] {
        const H = hsv?.h || 0
        const newHSV = { ...hsv, h: (H + 180) % 360 }
        const baseColor = formatHex(hsv as Color)
        return [baseColor, formatHex(newHSV as Color)]
    }

    function splitComplementary(hsv: Hsv): string[] {
        const H = hsv?.h || 0

        const hsv1 = { ...hsv, h: (H + 150) % 360 }
        const hsv2 = { ...hsv, h: (H + 210) % 360 }

        const baseColor = formatHex(hsv as Color)
        return [baseColor, formatHex(hsv1 as Color), formatHex(hsv2 as Color)]
    }

    function analogous(hsv: Hsv, length: number = 3, angle: number = 30): string[] {
        const H = hsv?.h || 0
        const analogousColors: string[] = []

        for (let i = 0; i < length; i++) {
            const newHsv = { ...hsv, h: (H + angle * i) % 360 }
            const hex = formatHex(newHsv as Color)
            analogousColors.push(hex)
        }

        return analogousColors
    }

    function triadic(hsv: Hsv): string[] {
        const H = hsv?.h || 0

        const hsv1 = { ...hsv, h: (H + 120) % 360 }
        const hsv2 = { ...hsv, h: (H + 240) % 360 }

        const baseColor = formatHex(hsv as Color)
        return [baseColor, formatHex(hsv1 as Color), formatHex(hsv2 as Color)]
    }

    function tetradic(hsv: Hsv): string[] {
        const H = hsv?.h || 0

        const hsv1 = { ...hsv, h: (H + 60) % 360 }
        const hsv2 = { ...hsv, h: (H + 180) % 360 }
        const hsv3 = { ...hsv, h: (H + 240) % 360 }

        const baseColor = formatHex(hsv as Color)
        return [
            baseColor,
            formatHex(hsv1 as Color),
            formatHex(hsv2 as Color),
            formatHex(hsv3 as Color),
        ]
    }

    function shades(hsv: Hsv, length: number = 10) {
        let colorShades = []
        const V = hsv?.v || 0

        const toSubtract = V / length

        for (let i = 0; i < length; i++) {
            const newHSV = { ...hsv, v: V - toSubtract * i }
            const newHex = formatHex(newHSV as Color)
            colorShades.push(newHex)
        }

        return colorShades
    }

    function tints(hsv: Hsv, length: number = 10) {
        let colorTints = []
        const S = hsv?.s || 0
        const V = hsv?.v || 0

        const subtractS = S / length
        const addV = (1 - V) / length

        for (let i = 0; i < length; i++) {
            const newHSV = { ...hsv, s: S - subtractS * i, v: V + addV * i }
            const newHex = formatHex(newHSV as Color)
            colorTints.push(newHex)
        }

        return colorTints
    }

    function hues(hsv: Hsv, length: number = 10) {
        let colorHues = []

        const H = hsv?.h || 0
        const toAdd = 360 / length

        for (let i = 0; i < length; i++) {
            const newHSV = { ...hsv, h: H + toAdd * i }
            const newHex = formatHex(newHSV as Color)
            colorHues.push(newHex)
        }

        return colorHues
    }

    function generateAll(color: string, length?: number): IPalettes {
        const _hsv = hsv(color) as Hsv
        const comp = complementary(_hsv)
        const splitComp = splitComplementary(_hsv)
        const analog = length ? analogous(_hsv, length) : analogous(_hsv)
        const triad = triadic(_hsv)
        const tetra = tetradic(_hsv)
        const shade = length ? shades(_hsv, length) : shades(_hsv)
        const tint = length ? tints(_hsv, length) : tints(_hsv)
        const hue = length ? hues(_hsv, length) : hues(_hsv)

        return {
            theory: {
                complementary: comp,
                splitComplementary: splitComp,
                analogous: analog,
                triadic: triad,
                tetradic: tetra,
            },
            shades: shade,
            tints: tint,
            hues: hue,
        }
    }

    return {
        complementary,
        splitComplementary,
        analogous,
        triadic,
        tetradic,
        shades,
        tints,
        hues,
        generateAll,
    }
}

export default palette
