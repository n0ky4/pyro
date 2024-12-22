import { removeHash } from './colorFormat'

export const getMetadata = (hex?: string, noTitle: boolean = false) => {
    hex = hex || '#ff004d'

    const icon = {
        url: `/favicon?hex=${removeHash(hex)}`,
        type: 'image/svg+xml',
    }

    return {
        title: `pyro${noTitle ? '' : ` - ${hex}`}`,
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
