'use client'

import PaletteNavBar from '@/components/PaletteNavBar'
import getRandomPalette from '@/core/randomPaletteGenerator'
import { HexAndName } from '@/core/types'
import { removeHash } from '@/util/colorFormat'
import { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import Advice from './Advice'
import Colors from './Colors'
import ShortcutHandler from './ShortcutHandler'

interface PaletteGeneratorProps {
    colors: HexAndName[]
    validParam: string
}

const setFavicon = (color: string) => {
    // Remove existing favicon
    const findShortcut = document.querySelectorAll<HTMLLinkElement>('link[rel="shortcut icon"]')
    const findFavicon = document.querySelectorAll<HTMLLinkElement>('link[rel="icon"]')
    if (findShortcut.length) findShortcut.forEach((x) => x.remove())
    if (findFavicon.length) findFavicon.forEach((x) => x.remove())

    // Set theme color
    const themeColor = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]')
    if (themeColor) themeColor.content = color

    // New favicons
    const newFaviconUrl = `/favicon?hex=${removeHash(color)}`

    const shortcutIcon = document.createElement('link')
    shortcutIcon.rel = 'shortcut icon'
    shortcutIcon.href = newFaviconUrl
    document.head.appendChild(shortcutIcon)

    const favicon = document.createElement('link')
    favicon.rel = 'icon'
    favicon.href = newFaviconUrl
    document.head.appendChild(favicon)
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
        navigator.clipboard.writeText(hex).then(() => {
            toast.success('Copiado!')
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
    }, [])

    return (
        <>
            <PaletteNavBar onRegenerate={() => generateNewPalette()} />
            <Advice show={showAdvice} onClose={() => setShowAdvice(false)} />
            <Colors colors={colors} onCopy={handleCopyColor} />
            <ShortcutHandler onNewPalette={() => generateNewPalette()} />
        </>
    )
}
