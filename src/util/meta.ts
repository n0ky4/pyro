import { Metadata } from 'next'
import { removeHash } from './colorFormat'

interface MetadataSettings {
    hex?: string
    titleStyle?: 'default' | 'hex'
    description?: string
}

export const getMetadata = ({
    hex: informedHex,
    titleStyle = 'hex',
    description,
}: MetadataSettings): Metadata => {
    const hex = informedHex || '#ff004d'

    const icon = {
        url: `/favicon?hex=${removeHash(hex)}`,
        type: 'image/svg+xml',
    }

    const title = titleStyle === 'hex' ? `pyro - ${hex}` : 'pyro'

    return {
        title,
        robots: 'index, follow',
        description:
            description || 'pyro é um gerador de cores e paletas para designers e desenvolvedores.',
        authors: {
            name: 'nokya',
            url: 'https://nokya.me',
        },
        icons: {
            icon,
            shortcut: icon,
        },
    }
}

export const getViewport = (hex?: string) => {
    hex = hex || '#ff004d'
    return {
        themeColor: hex,
    }
}
