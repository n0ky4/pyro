import { sanitizeColor } from '@/util/colorFormat'
import { NextRequest, NextResponse } from 'next/server'

export const runtime = 'edge'

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url)
    const hex = sanitizeColor(searchParams.get('hex') || 'ff004d')

    const svgMarkup = `
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
            <rect width="100%" height="100%" fill="#${hex}" rx="33.33%"/>
        </svg>
    `
        .trim()
        .replace(/\s{2,}/g, '')

    return new NextResponse(svgMarkup, {
        headers: {
            'Content-Type': 'image/svg+xml',
        },
    })
}
