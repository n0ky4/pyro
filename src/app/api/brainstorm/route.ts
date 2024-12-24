import color from '@/core/colorGenerator'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export async function GET() {
    const colors = color.getBrainstormColors()
    return NextResponse.json({
        colors,
    })
}
