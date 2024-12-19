import color from '@/core/colorGenerator'
import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export async function GET(req: NextRequest) {
    const hex = color.getRandomColor('named')

    const url = req.nextUrl.clone()
    url.pathname = `/${hex}`

    return new NextResponse(null, {
        status: 302,
        headers: {
            Location: url.toString() + '?r',
        },
    })
}
