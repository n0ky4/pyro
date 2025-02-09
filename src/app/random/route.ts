import color from '@/core/colorGenerator'
import { redirect } from 'next/navigation'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export async function GET() {
    const hex = color.getRandomColor('named')

    const url = `/${hex}?r`
    return redirect(url)
}
