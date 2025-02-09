import getRandomPalette from '@/core/randomPaletteGenerator'
import { removeHash } from '@/util/colorFormat'
import { redirect } from 'next/navigation'

const getPaletteParam = () => {
    const { colors } = getRandomPalette()
    return colors.map(({ hex }) => removeHash(hex)).join('-')
}

export async function GET() {
    const url = `/palette/${getPaletteParam()}`
    return redirect(url)
}
