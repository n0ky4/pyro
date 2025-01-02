import color from '@/core/colorGenerator'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export async function GET() {
    const hex = color.getRandomColor('named')

    return new NextResponse(hex, {
        headers: {
            'content-type': 'text/plain',
        },
    })
}
