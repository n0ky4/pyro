'use client'

import { HexAndName } from '@/core/types'
import { removeHash } from '@/util/colorFormat'
import { twMerge } from 'tailwind-merge'
import Color from './Color'

interface ColorsProps {
    colors: HexAndName[]
    onCopy: (hex: string) => void
}

export default function Colors({ colors, onCopy }: ColorsProps) {
    return (
        <div
            className={twMerge(
                'flex items-center w-full h-full transition-opacity duration-500',
                'flex-col xl:flex-row'
            )}
        >
            {colors.map((color, i) => (
                <Color
                    key={`${color}-${i}`}
                    hex={color.hex}
                    name={color.name}
                    href={`/${removeHash(color.hex)}`}
                    onCopy={onCopy}
                />
            ))}
        </div>
    )
}
