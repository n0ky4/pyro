'use client'

import Button from '@/components/Button'
import Pyro from '@/components/Pyro'
import getRandomPalette from '@/core/randomPaletteGenerator'
import { HexAndName } from '@/core/types'
import { removeHash } from '@/util/colorFormat'
import { Transition } from '@headlessui/react'
import { ArrowsCounterClockwise, House } from '@phosphor-icons/react'
import { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import { twMerge } from 'tailwind-merge'
import Color from './Color'

interface PaletteGeneratorProps {
    colors: HexAndName[]
    validParam: string
}

const setFavicon = (color: string) => {
    const updateFavicon = () => {
        const iconURL = `/favicon?hex=${removeHash(color)}`

        let favicon = document.querySelector<HTMLLinkElement>('link[rel="icon"]')
        if (!favicon) {
            favicon = document.createElement('link')
            favicon.rel = 'icon'
            document.head.appendChild(favicon)
        }

        favicon.href = iconURL
    }

    updateFavicon()
}

export default function PaletteGenerator({
    colors: colorsParam,
    validParam,
}: PaletteGeneratorProps) {
    const [colors, setColors] = useState<HexAndName[]>(colorsParam)
    const [showAdvice, setShowAdvice] = useState<boolean>(true)

    const handleSetPalette = (colors: HexAndName[]) => {
        setColors(colors)
        window.history.replaceState(
            null,
            '',
            `/palette/${colors.map(({ hex }) => removeHash(hex)).join('-')}`
        )
    }

    const handleCopyColor = (hex: string) => {
        navigator.clipboard
            .writeText(hex)
            .then(() => {
                toast.success('copiado!')
            })
            .catch((err) => {
                toast.error('não foi possível copiar a cor :c')
                console.error('Erro ao tentar copiar cor:', err)
            })
    }

    const generateNewPalette = () => {
        if (showAdvice) setShowAdvice(false)

        const rand = getRandomPalette()
        handleSetPalette(rand.colors)
    }

    useEffect(() => {
        if (colors[0]) setFavicon(colors[0].hex)
    }, [colors])

    useEffect(() => {
        const history = window.location.pathname

        if (history !== `/palette/${validParam}`)
            window.history.pushState(null, '', `/palette/${validParam}`)

        const listener = (e: KeyboardEvent) => {
            e.preventDefault()
            if (e.code === 'Space') generateNewPalette()
        }

        window.addEventListener('keyup', listener)
        return () => window.removeEventListener('keyup', listener)
    }, [])

    return (
        <>
            <nav className='w-screen absolute top-0 left-0 z-30 flex items-center justify-center px-4'>
                <div className='max-w-screen-lg w-full bg-white dark:bg-purp-800 rounded-xl mt-4 flex items-center justify-between p-3'>
                    <Pyro link size='sm' />
                    <div className='flex items-center justify-center gap-4'>
                        <Button onClick={() => generateNewPalette()}>
                            <ArrowsCounterClockwise size={22} weight='bold' />
                            <span className='xl:inline hidden'>regerar</span>
                        </Button>
                        <Button asLink href='/' theme='ghost'>
                            <House size={22} weight='bold' />
                        </Button>
                    </div>
                </div>
            </nav>
            <Transition
                show={showAdvice}
                appear={true}
                enterFrom='scale-0 opacity-0'
                enter='transition duration-200 ease-bounce-in'
                enterTo='scale-100 opacity-100'
                leaveFrom='scale-100 opacity-100'
                leave='transition duration-200 ease-bounce-out'
                leaveTo='scale-0 opacity-0'
                onClick={() => setShowAdvice(false)}
                className={twMerge(
                    'xl:block hidden absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-lg p-3',
                    'text-zinc-900 bg-zinc-50',
                    'dark:text-zinc-100 dark:bg-purp-800'
                )}
                as='button'
            >
                <b>dica:</b> Aperte espaço para gerar uma nova paleta!
            </Transition>
            <div
                className={twMerge(
                    'flex items-center w-full h-full transition-opacity duration-500',
                    'flex-col xl:flex-row'
                )}
            >
                {colors.map((color) => (
                    <Color
                        key={color.hex}
                        hex={color.hex}
                        name={color.name}
                        href={`/${removeHash(color.hex)}`}
                        onCopy={() => handleCopyColor(color.hex)}
                    />
                ))}
            </div>
        </>
    )
}
