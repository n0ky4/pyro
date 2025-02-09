import {
    HSL,
    HSV,
    RGB,
    addHash,
    formatHSL,
    formatHSV,
    formatRGB,
    isValidColor,
    removeHash,
} from '@/util/colorFormat'
import dayjs from '@/util/date'
import { differenceCiede2000, hsl, hsv, nearest, rgb } from 'culori'
import { getColorNames, getColors } from './cache'
import { colorKeys, colorNames } from './colors'
import palette from './paletteGenerator'
import { IColorInfo, ISuggestion } from './types'

const colorInfo = createColorInfo()

type CachedColor = {
    color: IColorInfo
    at: number
}

let HOURLY_COLOR_CACHE: CachedColor | null = null

function createColorInfo() {
    function getNearestColors(hex: string, count: number = 1): string[] {
        const getNearestColors = nearest(colorKeys, differenceCiede2000())
        const nearestColors = getNearestColors(hex, count)
        return nearestColors
    }

    function getNearestColorName(hex: string): string {
        if (colorNames[hex]) return colorNames[hex]
        const nearest = getNearestColors(hex, 1)[0]
        return colorNames[nearest]
    }

    function getExactColorName(hex: string): string | undefined {
        return colorNames[hex]
    }

    function getCmyk(hex: string) {
        const RGB = rgb(hex)
        const r = Math.round((RGB?.r || 0) * 255)
        const g = Math.round((RGB?.g || 0) * 255)
        const b = Math.round((RGB?.b || 0) * 255)

        const c = 1 - r / 255
        const m = 1 - g / 255
        const y = 1 - b / 255

        const k = Math.min(c, m, y)
        const cmyk = {
            c: Math.round(((c - k) / (1 - k)) * 100) || 0,
            m: Math.round(((m - k) / (1 - k)) * 100) || 0,
            y: Math.round(((y - k) / (1 - k)) * 100) || 0,
            k: Math.round(k * 100) || 0,
        }

        return { ...cmyk }
    }

    function getColorInfo(hex: string): IColorInfo {
        if (!isValidColor(hex)) throw new Error('Invalid color')

        const cachedColors = getColors()
        const cached = cachedColors[removeHash(hex)]

        if (cached) {
            // console.log('got from cached', hex, from)
            const res: IColorInfo = {
                ...cached,
                hex: addHash(hex),
                related: cached.related.map((color) => addHash(color)),
                palettes: {
                    theory: {
                        complementary: cached.palettes.theory.complementary.map((color) =>
                            addHash(color)
                        ),
                        splitComplementary: cached.palettes.theory.splitComplementary.map((color) =>
                            addHash(color)
                        ),
                        triadic: cached.palettes.theory.triadic.map((color) => addHash(color)),
                        tetradic: cached.palettes.theory.tetradic.map((color) => addHash(color)),
                        analogous: cached.palettes.theory.analogous.map((color) => addHash(color)),
                    },
                    shades: cached.palettes.shades.map((color) => addHash(color)),
                    tints: cached.palettes.tints.map((color) => addHash(color)),
                    hues: cached.palettes.hues.map((color) => addHash(color)),
                },
            }
            return res
        }

        // Ensure hex is in the correct format
        hex = addHash(hex)

        // Get the 250 nearest colors to get related colors later
        const nearestColors = getNearestColors(hex, 250)

        // Get the nearest color
        const nearestColor = nearestColors[0]

        // Get the last 30 colors from the 250 nearest colors to be used as related colors
        const related = nearestColors
            .slice(-30)
            .map((color) => addHash(color))
            .sort()

        // Get the formatted RGB => [255, 255, 255]
        const _rgb = rgb(hex) as RGB
        const formattedRGB = formatRGB(_rgb)

        // Get the formatted HSV and HSL => 0°, 0%, 0%
        const _hsv = formatHSV(hsv(hex) as HSV, false) as [number, number, number]
        const _hsl = formatHSL(hsl(hex) as HSL, false) as [number, number, number]

        const palettes = palette.generateAll(hex)

        const colorInfo: IColorInfo = {
            hex: hex.toLowerCase(),
            name: colorNames[nearestColor],
            nearestNamedColor: addHash(nearestColor),
            related,
            palettes,
            percent: {
                r: Math.round((_rgb?.r || 0) * 100),
                g: Math.round((_rgb?.g || 0) * 100),
                b: Math.round((_rgb?.b || 0) * 100),
            },
            rgb: {
                r: formattedRGB[0],
                g: formattedRGB[1],
                b: formattedRGB[2],
            },
            hsl: {
                h: _hsl[0],
                s: _hsl[1],
                l: _hsl[2],
            },
            hsv: {
                h: _hsv[0],
                s: _hsv[1],
                v: _hsv[2],
            },
            cmyk: getCmyk(hex),
        }

        return colorInfo
    }

    function getHourlyColor(): IColorInfo {
        const today = dayjs()
        const hourUnix = today.set('minute', 0).set('second', 0).set('millisecond', 0).unix()

        if (!HOURLY_COLOR_CACHE || HOURLY_COLOR_CACHE.at !== hourUnix) {
            const hex = colorKeys[hourUnix % colorKeys.length]
            HOURLY_COLOR_CACHE = {
                color: getColorInfo(hex),
                at: hourUnix,
            }
        }

        return HOURLY_COLOR_CACHE.color
    }

    function getSuggestions(query: string, size: number = 5): ISuggestion[] {
        if (!query) return []

        const colorNamesMap = getColorNames()
        const hexes = Object.keys(colorNamesMap)
        const suggestions: ISuggestion[] = []

        const lowerQuery = query.toLowerCase()
        const isHexQuery = lowerQuery.startsWith('#')
        const normalizedQuery = removeHash(lowerQuery)

        for (const hex of hexes) {
            if (
                (isHexQuery && hex.startsWith(normalizedQuery)) ||
                (!isHexQuery && colorNamesMap[hex].toLowerCase().includes(lowerQuery))
            ) {
                suggestions.push({
                    name: colorNamesMap[hex],
                    hex: addHash(hex),
                    href: `/${removeHash(hex)}`,
                })
            }
        }

        // Sort by name
        suggestions.sort((a, b) => {
            const aLower = a.name.toLowerCase()
            const bLower = b.name.toLowerCase()

            const aEqualsQuery = aLower === lowerQuery
            const bEqualsQuery = bLower === lowerQuery

            if (aEqualsQuery && !bEqualsQuery) return -1
            if (!aEqualsQuery && bEqualsQuery) return 1

            const aNameStartsWithQuery = aLower.startsWith(lowerQuery)
            const bNameStartsWithQuery = bLower.startsWith(lowerQuery)

            if (aNameStartsWithQuery && !bNameStartsWithQuery) return -1
            if (!aNameStartsWithQuery && bNameStartsWithQuery) return 1

            return 0
        })

        if (isHexQuery && suggestions.length === 0 && isValidColor(lowerQuery)) {
            return [
                {
                    name: getExactColorName(lowerQuery) || lowerQuery,
                    hex: lowerQuery,
                    href: `/${normalizedQuery}`,
                },
            ]
        }

        return suggestions.slice(0, size)
    }

    return {
        getNearestColors,
        getNearestColorName,
        getExactColorName,
        getCmyk,
        getColorInfo,
        getHourlyColor,
        getSuggestions,
    }
}

export default colorInfo
