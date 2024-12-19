'use client'

import { removeHash } from '@/util/colorFormat'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { twMerge } from 'tailwind-merge'

interface PaletteProps {
    label?: string
    colors: string[]
    linkColors?: boolean
    noGrow?: boolean
    perRow?: false | number
}

interface ColorProps {
    color: string
    size: number
    transition?: boolean
    hov?: boolean
}

function Color({ color, size, transition = false, hov = false }: ColorProps) {
    const [hover, setHover] = useState(false)

    return (
        <div
            className={twMerge(
                'flex rounded-[0px]',
                transition && 'transition-all ease-out duration-300'
            )}
            style={{
                backgroundColor: color,
                width: `${size}px`,
                height: `${size}px`,
                minWidth: `${size}px`,
                minHeight: `${size}px`,
                borderRadius: hover ? `50%` : 0,
            }}
            onMouseEnter={() => {
                if (hov) setHover(true)
            }}
            onMouseLeave={() => {
                if (hov) setHover(false)
            }}
        />
    )
}

export default function Palette({
    label,
    colors,
    linkColors = false,
    noGrow = false,
    perRow = false,
}: PaletteProps) {
    const [loaded, setLoaded] = useState(false)
    const [anim, setAnim] = useState(false)

    const [size, setSize] = useState(96)
    const minSize = 96
    const gap = 16
    const containerRef = useRef<HTMLDivElement | null>(null)

    const calculateSize = (divSize: number) => {
        if (perRow) return Math.max(minSize, divSize / perRow - gap)

        const len = colors.length
        const totalGap = gap * (len - 1)
        const totalSize = divSize - totalGap
        return Math.max(minSize, totalSize / len)
    }

    useEffect(() => {
        const handleResize = () => {
            if (!containerRef.current) return
            const newSize = calculateSize(containerRef.current.clientWidth)

            if (!noGrow) setSize(newSize)
        }

        handleResize()
        window.addEventListener('resize', handleResize)

        setLoaded(true)
        setTimeout(() => setAnim(true), 300)

        return () => window.removeEventListener('resize', handleResize)
    }, [])

    const paletteComponent = (
        <div
            className='flex w-full items-center flex-wrap'
            style={{
                gap: `${gap}px`,
            }}
            ref={containerRef}
        >
            {linkColors
                ? colors.map((color, index) => (
                      <Link key={index} href={`/${removeHash(color)}`}>
                          <Color color={color} size={size} transition={anim} hov={true} />
                      </Link>
                  ))
                : colors.map((color, index) => (
                      <Color key={index} color={color} size={size} transition={anim} />
                  ))}
        </div>
    )

    if (!label)
        return (
            <div
                className='transition-opacity'
                style={{
                    opacity: loaded ? 1 : 0,
                }}
            >
                {paletteComponent}
            </div>
        )

    return (
        <div
            className='transition-opacity'
            style={{
                opacity: loaded ? 1 : 0,
            }}
        >
            <h1 className='text-xl md:text-2xl font-bold mb-1'>{label}</h1>
            {paletteComponent}
        </div>
    )
}
