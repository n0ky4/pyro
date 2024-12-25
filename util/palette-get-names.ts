import palettes from '@/assets/palettes'
import colorInfo from '@/core/colorInfo'
import * as fs from 'fs'

function main() {
    const trve: string[][] = []
    const names = new Map<string, string>()

    const start = new Date().getTime()

    let i = 0
    for (const palette of palettes) {
        const p: string[] = []
        let name = ''

        for (const color of palette) {
            const nearest = colorInfo.getNearestColors(color)[0]
            name = colorInfo.getExactColorName(nearest) || colorInfo.getNearestColorName(nearest)

            if (!names.has(name)) {
                names.set(name, nearest)
            }

            p.push(nearest)
        }
        trve.push(p)
        i += 1
        // console.log(Math.round((i / palettes.length) * 100) + '%')
        const po = Math.round((i / palettes.length) * 100)

        const elapsed = new Date().getTime() - start
        const eta = Math.round(((elapsed / i) * (palettes.length - i)) / 1000)

        const etaStr = `${Math.floor(eta / 60)}m ${eta % 60}s`

        const fmt = `[${i}/${palettes.length}] ${name}${' '.padEnd(
            20 - name.length
        )}(${po}%) ETA: ${etaStr} - ${elapsed / 1000}s elapsed`

        process.stdout.write('\r' + fmt)
    }

    // Write JSON files in a single batch
    fs.writeFileSync('palettes.json', JSON.stringify(trve))
    fs.writeFileSync('names.json', JSON.stringify(Object.fromEntries(names)))
}

main()
