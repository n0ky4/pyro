'use client'

import { ArrowCounterClockwise } from '@phosphor-icons/react'
import { useTranslations } from 'next-intl'
import { useEffect, useMemo, useState } from 'react'

interface ResetTimerProps {
    updateAt: number
}

export default function ResetTimer({ updateAt }: ResetTimerProps) {
    const [now, setNow] = useState<number>(() => Math.floor(Date.now() / 1000))
    const [loaded, setLoaded] = useState<boolean>(false)
    const t = useTranslations('home.featuredColor')

    const text = useMemo(() => {
        const diff = updateAt - now
        const diffMinutes = Math.floor(diff / 60)

        if (diffMinutes < 1) {
            return t('instants')
        }

        return t('minutes', { minutes: diffMinutes })
    }, [now, t, updateAt])

    useEffect(() => {
        const interval = setInterval(() => {
            setNow(Math.floor(Date.now() / 1000))
        }, 1000)

        const loadTimer = setTimeout(() => {
            setLoaded(true)
        }, 0)

        return () => {
            clearInterval(interval)
            clearTimeout(loadTimer)
        }
    }, [])

    useEffect(() => {
        if (now >= updateAt) window.location.reload()
    }, [now, updateAt])

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
