'use client'

import { IColorInfo } from '@/core/types'
import { getPredominantColors, removeHash } from '@/util/colorFormat'
import { wcagContrast } from 'culori'
import Link from 'next/link'
import { twMerge } from 'tailwind-merge'
import Copyable from './Copyable'

interface ColorCardProps {
    data: IColorInfo
}

export default function ColorCard({ data }: ColorCardProps) {
    const { hex, name, hsl } = data
    const theme = wcagContrast(hex, '#fff') > 3 ? 'light' : 'dark'
    const textColor = theme === 'dark' ? 'text-black/90' : 'text-white/90'

    const { r, g, b } = data.percent
    const predominant = getPredominantColors([r, g, b])

    return (
        <div className='relative w-full h-72 rounded-xl p-4' style={{ backgroundColor: hex }}>
            <div
                className={twMerge(
                    'flex w-full items-center justify-between font-semibold text-lg',
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
                <p>
                    {data.name} é composta por {r}% de vermelho, {g}% de verde e {b}% de azul.{' '}
                    {predominant
                        ? `Contém majoritariamente a cor ${predominant}.`
                        : 'É uma cor neutra.'}
                </p>
            </div>
        </div>
    )
}
