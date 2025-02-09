import colorInfo from '@/core/colorInfo'
import { HexAndName } from '@/core/types'
import { addHash, isValidColor, removeHash } from '@/util/colorFormat'
import { getMetadata, getViewport } from '@/util/meta'
import { redirect } from 'next/navigation'
import PaletteGenerator from './_components/PaletteGenerator'

interface Context {
    params: Promise<{
        colors: string
    }>
}

const parseColors = (colors: string): HexAndName[] => {
    const c = colors
        .trim()
        .split('-')
        .filter((color) => isValidColor(color))
        .map((color) => addHash(color))

    const res: HexAndName[] = []

    c.forEach((color) => {
        res.push({
            hex: color,
            name: colorInfo.getNearestColorName(color),
        })
    })

    return res
}

let faviconColor: string | undefined = undefined

export async function generateMetadata() {
    return getMetadata({
        hex: faviconColor,
        titleStyle: 'default',
    })
}
export async function generateViewport() {
    return getViewport(faviconColor)
}

export default async function Page({ params }: Context) {
    const colorParam = (await params)?.colors

    const colors = parseColors(colorParam)
    if (colors.length < 3 || colors.length > 8) return redirect('/palette')

    const validParam = colors.map(({ hex }) => removeHash(hex)).join('-')
    faviconColor = colors[0].hex

    return (
        <main className='w-screen h-screen'>
            <PaletteGenerator colors={colors} validParam={validParam} />
        </main>
    )
}
