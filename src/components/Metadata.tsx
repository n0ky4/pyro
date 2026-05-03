'use client'
import { useEffect, useRef } from 'react'

interface MetadataProps {
    data: {
        title?: string
        favicon?: string
        themeColor?: string
    }
}

export default function Metadata({ data }: MetadataProps) {
    const { title, favicon, themeColor } = data

    const titleRef = useRef<HTMLTitleElement | null>(null)
    const faviconRef = useRef<HTMLLinkElement | null>(null)
    const shortcutRef = useRef<HTMLLinkElement | null>(null)
    const themeColorRef = useRef<HTMLMetaElement | null>(null)

    useEffect(() => {
        const head = document.head
        if (!head) return

        if (title) {
            if (!titleRef.current) {
                const titleEl = document.createElement('title')
                head.appendChild(titleEl)
                titleRef.current = titleEl
            }
            titleRef.current.innerText = title
        } else if (titleRef.current) {
            head.removeChild(titleRef.current)
            titleRef.current = null
        }

        if (favicon) {
            if (!faviconRef.current) {
                const faviconEl = document.createElement('link')
                faviconEl.rel = 'icon'
                faviconEl.type = 'image/svg+xml'
                head.appendChild(faviconEl)
                faviconRef.current = faviconEl
            }

            if (!shortcutRef.current) {
                const shortcutEl = document.createElement('link')
                shortcutEl.rel = 'shortcut icon'
                shortcutEl.type = 'image/svg+xml'
                head.appendChild(shortcutEl)
                shortcutRef.current = shortcutEl
            }

            faviconRef.current.href = favicon
            shortcutRef.current.href = favicon
        } else {
            if (faviconRef.current) {
                head.removeChild(faviconRef.current)
                faviconRef.current = null
            }
            if (shortcutRef.current) {
                head.removeChild(shortcutRef.current)
                shortcutRef.current = null
            }
        }

        if (themeColor) {
            if (!themeColorRef.current) {
                const themeColorEl = document.createElement('meta')
                themeColorEl.name = 'theme-color'
                head.appendChild(themeColorEl)
                themeColorRef.current = themeColorEl
            }
            themeColorRef.current.content = themeColor
        } else if (themeColorRef.current) {
            head.removeChild(themeColorRef.current)
            themeColorRef.current = null
        }
    }, [title, favicon, themeColor])

    return <></>
}
