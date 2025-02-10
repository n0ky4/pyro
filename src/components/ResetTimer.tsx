'use client'

import { ArrowCounterClockwise } from '@phosphor-icons/react'
import { useTranslations } from 'next-intl'
import { useEffect, useState } from 'react'

interface ResetTimerProps {
    updateAt: number
}

export default function ResetTimer({ updateAt }: ResetTimerProps) {
    const [text, setText] = useState<string>('')
    const [loaded, setLoaded] = useState<boolean>(false)
    const t = useTranslations('home.featuredColor')

    const update = () => {
        const now = Math.floor(Date.now() / 1000)
        const diff = updateAt - now
        const diffMinutes = Math.floor(diff / 60)

        if (diff <= 0) {
            window.location.reload()
            return
        }

        if (diffMinutes < 1) {
            setText(t('instants'))
            return
        }

        setText(t('minutes', { minutes: diffMinutes }))
    }

    useEffect(() => {
        update()
        const interval = setInterval(() => update(), 1000)

        if (!loaded) setLoaded(true)

        return () => clearInterval(interval)
    }, [])

    return (
        <>
            <div
                className='flex gap-1 items-center text-slate-400 dark:text-zinc-400 transition-all'
                style={{
                    opacity: loaded ? 1 : 0,
                }}
                title={t('updatesIn', { time: text })}
                aria-label={t('updatesInAria', { time: text })}
            >
                <ArrowCounterClockwise weight='bold' />
                <p>{text}</p>
            </div>
        </>
    )
}
