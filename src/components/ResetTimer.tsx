'use client'

import { useEffect, useState } from 'react'

interface ResetTimerProps {
    updateAt: number
}

export default function ResetTimer({ updateAt }: ResetTimerProps) {
    const [text, setText] = useState<string>('')
    const [loaded, setLoaded] = useState<boolean>(false)

    const update = () => {
        const now = Math.floor(Date.now() / 1000)
        const diff = updateAt - now
        const diffMinutes = Math.floor(diff / 60)

        if (diff <= 0) {
            window.location.reload()
            return
        }

        if (diffMinutes < 1) {
            setText('nova cor em instantes')
            return
        }

        setText(`nova cor em ${diffMinutes} minuto${diffMinutes > 1 ? 's' : ''}`)
    }

    useEffect(() => {
        update()
        const interval = setInterval(() => update(), 1000)

        if (!loaded) setLoaded(true)

        return () => clearInterval(interval)
    }, [])

    return (
        <>
            <p
                className='text-slate-400 transition-opacity'
                style={{
                    opacity: loaded ? 1 : 0,
                }}
            >
                {text}
            </p>
        </>
    )
}
