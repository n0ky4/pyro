'use client'

import { IColorInfo } from '@/core/types'
import { getPredominantLabel, removeHash } from '@/util/colorFormat'
import { wcagContrast } from 'culori'
import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { useMemo } from 'react'
import { twMerge } from 'tailwind-merge'
import Copyable from './Copyable'

interface ColorCardProps {
    data: IColorInfo
}

export default function ColorCard({ data }: ColorCardProps) {
    const { hex, name, percent, rgb } = data
    const theme = wcagContrast(hex, '#fff') > 3 ? 'light' : 'dark'
    const textColor = theme === 'dark' ? 'text-black/90' : 'text-white/90'

    const t = useTranslations('home.colorInfo')

    const label = useMemo(
        () =>
            getPredominantLabel({
                name,
                percent,
                rgb: [rgb.r, rgb.g, rgb.b],
                t,
            }),
        [data]
    )

    return (
        <div className='relative w-full h-72 rounded-xl p-4' style={{ backgroundColor: hex }}>
            <div
                className={twMerge(
                    'flex w-full items-start justify-between font-semibold text-lg',
                    textColor
                )}
            >
                <Link
                    className='text-2xl sm:text-3xl md:text-4xl hover:opacity-75 transition-opacity'
                    href={`/${removeHash(hex)}`}
                >
                    {name}
                </Link>
                <Copyable value={hex} />
            </div>
            <div
                className={twMerge(
                    'absolute bottom-0 left-0 p-4 w-full opacity-90 md:text-lg text-md',
                    textColor
                )}
            >
                <p>{label}</p>
            </div>
        </div>
    )
}
