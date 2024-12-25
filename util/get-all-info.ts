import colorInfo from '@/core/colorInfo'
import { IColorInfo } from '@/core/types'
import { removeHash } from '@/util/colorFormat'
import fs from 'fs'
import path from 'path'
import colorNames from './../src/assets/data/colornames.min.json'

function formatTime(seconds: number): string {
    const minutes = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${minutes}m ${secs}s`
}

function removeHashesFromColorInfo(cinfo: IColorInfo): IColorInfo {
    // Remove "#" from hex color values and arrays containing colors
    if (cinfo.nearestNamedColor === cinfo.hex) delete cinfo.nearestNamedColor
    delete cinfo.hex

    cinfo.related = cinfo.related.map(removeHash)

    // Remove "#" from theory palettes (complementary, splitComplementary, etc.)
    if (cinfo.palettes.theory) {
        Object.keys(cinfo.palettes.theory).forEach((paletteKey) => {
            cinfo.palettes.theory[paletteKey] = cinfo.palettes.theory[paletteKey].map(removeHash)
        })
    }

    // Iterate over all other palette fields (complementary, splitComplementary, etc.)
    if (cinfo.palettes) {
        Object.keys(cinfo.palettes).forEach((paletteKey) => {
            if (Array.isArray(cinfo.palettes[paletteKey])) {
                cinfo.palettes[paletteKey] = cinfo.palettes[paletteKey].map(removeHash)
            }
        })
    }

    // Remove "#" from nearestNamedColor if it exists
    if (cinfo.nearestNamedColor) {
        cinfo.nearestNamedColor = removeHash(cinfo.nearestNamedColor)
    }

    return cinfo
}

function main() {
    const dir = path.join(__dirname, 'output')
    const colors = Object.keys(colorNames).map((x) => `#${x}`)
    const CHUNK_LEN = 5_000

    // Ensure output directory exists
    fs.mkdirSync(dir, { recursive: true })

    const startTime = Date.now()
    colors.forEach((color, index) => {
        const chunkIndex = Math.floor(index / CHUNK_LEN)
        const chunkPath = path.join(dir, `colors-${chunkIndex}.json`)

        // Create a new chunk file if it doesn't exist
        if (!fs.existsSync(chunkPath)) {
            fs.writeFileSync(chunkPath, '{}')
        }

        const chunk = JSON.parse(fs.readFileSync(chunkPath, 'utf-8')) as Record<string, IColorInfo>

        // Process and store color information
        if (!chunk[color]) {
            let cinfo = colorInfo.getColorInfo(color)
            cinfo = removeHashesFromColorInfo(cinfo)

            // Store the color with removed "#" in the chunk
            chunk[removeHash(color)] = cinfo
            fs.writeFileSync(chunkPath, JSON.stringify(chunk, null, 2))
        }

        // Calculate progress and ETA
        const currentTime = Date.now()
        const elapsedTime = (currentTime - startTime) / 1000 // in seconds
        const percent = ((index + 1) / colors.length) * 100
        const estimatedTotalTime = (elapsedTime / (index + 1)) * colors.length
        const eta = estimatedTotalTime - elapsedTime

        // Display progress and ETA in one line
        process.stdout.write(
            `\rProcessing ${index + 1}/${colors.length} (${percent.toFixed(
                2
            )}%) - ETA: ${formatTime(eta)} - Elapsed: ${formatTime(
                elapsedTime
            )} - Current color: ${color}               `
        )
    })

    console.log('\nProcessing complete!')
}

main()
