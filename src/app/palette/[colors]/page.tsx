import { HexAndName } from '@/core/types'
import { addHash, isValidColor, removeHash } from '@/util/colorFormat'
// import { Metadata } from 'next'
import colorInfo from '@/core/colorInfo'
import { redirect } from 'next/navigation'
import PaletteGenerator from './components/PaletteGenerator'

interface Context {
    params: {
        colors: string
    }
}

const parseColors = (colors: string): HexAndName[] => {
    const c = colors
        .trim()
        .split('-')
        .filter((color) => isValidColor(color))
        .map((color) => addHash(color))

    let res: HexAndName[] = []
    c.forEach((color, i) => {
        res.push({
            hex: color,
            name: colorInfo.getNearestColorName(color),
        })
    })

    return res
}

let faviconColor: null | string = null

// export async function generateMetadata(): Promise<Metadata> {
//     if (!faviconColor) return {}

//     const icon = {
//         url: `/favicon?hex=${removeHash(faviconColor)}`,
//         type: 'image/svg+xml',
//     }

//     return {
//         title: `pyro`,
//         // themeColor: faviconColor,
//         icons: {
//             icon,
//             shortcut: icon,
//         },
//     }
// }

export default async function Page(ctx: Context) {
    const colorParam = (await ctx.params)?.colors

    let colors = parseColors(colorParam)
    if (colors.length < 3 || colors.length > 8) return redirect('/palette')

    const validParam = colors.map(({ hex }) => removeHash(hex)).join('-')
    faviconColor = colors[0].hex

    return (
        <main className='w-screen h-screen'>
            <PaletteGenerator colors={colors} validParam={validParam} />
        </main>
    )
}
