import colorInfo from '@/core/colorInfo'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export async function GET() {
    const dailyColor = colorInfo.getDailyColor()
    return NextResponse.json(dailyColor)
}
