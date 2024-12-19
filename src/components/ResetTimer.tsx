'use client'

import dayjs from '@/util/date'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function ResetTimer({ remaining }: { remaining: string }) {
    const [text, setText] = useState<string>(remaining)
    const startDate = new Date()
    const router = useRouter()

    const update = () => {
        const now = new Date()
        const tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 0)
        setText(dayjs(tomorrow).fromNow(true))

        if (now.getDay() !== startDate.getDay()) return router.refresh()
    }

    useEffect(() => {
        update()
        const interval = setInterval(() => update(), 1000)
        return () => clearInterval(interval)
    }, [])

    return <p className='text-slate-400'>nova cor em {text}</p>
}
