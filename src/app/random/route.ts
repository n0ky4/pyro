import color from '@/core/colorGenerator'
import { redirect } from 'next/navigation'
import { NextRequest } from 'next/server'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export async function GET(req: NextRequest) {
    const hex = color.getRandomColor('named')

    const url = `/${hex}?r`
    return redirect(url)
}
