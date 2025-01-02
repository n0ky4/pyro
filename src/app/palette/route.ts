import getRandomPalette from '@/core/randomPaletteGenerator'
import { removeHash } from '@/util/colorFormat'
import { redirect } from 'next/navigation'
import { NextRequest } from 'next/server'

const getPaletteParam = () => {
    const { colors } = getRandomPalette()
    return colors.map(({ hex }) => removeHash(hex)).join('-')
}

export async function GET(req: NextRequest) {
    const url = `/palette/${getPaletteParam()}`
    return redirect(url)
}
