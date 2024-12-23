import getRandomPalette from '@/core/randomPaletteGenerator'
import { removeHash } from '@/util/colorFormat'
import { NextRequest, NextResponse } from 'next/server'

const getPaletteParam = () => {
    const { colors } = getRandomPalette()
    return colors.map(({ hex }) => removeHash(hex)).join('-')
}

export async function GET(req: NextRequest) {
    const url = req.nextUrl.clone()
    url.pathname = `/palette/${getPaletteParam()}`

    return new NextResponse(null, {
        status: 302,
        headers: {
            Location: url.toString(),
        },
    })
}
