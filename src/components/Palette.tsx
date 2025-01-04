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
}: PaletteProps) {
    const [loaded, setLoaded] = useState(false)
    const [anim, setAnim] = useState(false)

    const gap = 16
    const [size, setSize] = useState(96)

    const minSize = 96
    const containerRef = useRef<HTMLDivElement | null>(null)

    const calculateSize = (divSize: number) => {
        // divSize é o tamanho do container onde estão as cores

        // quantidade das cores
        const len = colors.length

        // tamanho total do espaçamento entre as cores (gap).
        // subtraimos 1 para utilizar somente o gap entre as cores,
        // o que não inclui o gap do final.
        const totalGap = gap * (len - 1)

        // tamanho total que pode ser ocupado pelas cores
        const totalSize = divSize - totalGap

        // tamanho ideal para cada cor
        const divided = totalSize / len

        // se o tamanho ideal for maior que o tamanho mínimo,
        // retornamos o tamanho ideal
        if (divided >= minSize) return divided

        // a partir daqui, o tamanho ideal é menor que o tamanho mínimo,
        // então precisamos calcular outro tamanho ideal para que as cores
        // sejam distribuídas igualmente, preenchendo o container.

        // quantidade máxima de itens por linha.
        const maxItemsPerRow = Math.floor((divSize + gap) / (minSize + gap))
        // adicionamos o gap no divSize e no minSize para que o cálculo
        // considere o espaçamento entre as cores.
        // o gap no divSize serve para desconsiderar o gap do final.
        // se fosse somente (divSize / minSize + gap), o cálculo consideraria
        // o gap do final, o que não é o desejado.

        // a quantidade de gaps em uma linha é a quantidade de itens - 1
        // (novamente, desconsiderando o gap do final)
        const gapsInRow = maxItemsPerRow - 1

        // o tamanho total dos gaps em uma linha em pixels
        const totalGapWidth = gapsInRow * gap

        // finalmente dividimos o tamanho livre pelo número de itens
        const optimalSize = (divSize - totalGapWidth) / maxItemsPerRow

        return Math.max(optimalSize, minSize)
    }

    useEffect(() => {
        const handleResize = () => {
            if (!containerRef?.current?.clientWidth) return
            const newSize = calculateSize(containerRef.current.clientWidth)

            if (!noGrow) setSize(newSize!)
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
                      <Link
                          key={index}
                          href={`/${removeHash(color)}`}
                          aria-label={`Abrir página da cor ${color}`}
                      >
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
