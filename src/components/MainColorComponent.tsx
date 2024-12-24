'use client'

import { IColorInfo } from '@/core/types'
import { Transition } from '@headlessui/react'
import axios from 'axios'
import { useEffect, useRef, useState } from 'react'
import { twMerge } from 'tailwind-merge'
import ColorCard from './ColorCard'
import ColorDetails from './ColorDetails'
import { Items } from './Items'
import ResetTimer from './ResetTimer'

interface MainColorComponentProps {
    initialData: IColorInfo
    nextUnix: number
    initialBrainstormColors: IColorInfo[]
}

const BRAINSTORM_INTERVAL = 5000

export function MainColorComponent({
    initialData,
    nextUnix,
    initialBrainstormColors,
}: MainColorComponentProps) {
    const [mounted, setMounted] = useState(false)

    const [data, setData] = useState<IColorInfo>(initialData)
    const [brainstorm, setBrainstorm] = useState(false)

    const fetching = useRef(false)
    const nextColors = useRef<IColorInfo[]>(initialBrainstormColors)
    const highlightedColor = useRef<IColorInfo>(initialData)

    const [progress, setProgress] = useState(0)

    useEffect(() => {
        setMounted(true)
    }, [])

    const nextColor = () => {
        const prev = nextColors.current

        const next = prev.slice(1)

        console.log('prev', prev, prev.length)
        console.log('next', next, next.length)

        if (next.length === 3 && !fetching.current) {
            fetching.current = true
            axios
                .get('/api/brainstorm')
                .then((res) => {
                    const { colors } = res.data
                    console.log('fetched brainstorm colors:', colors)
                    nextColors.current = [...prev, ...colors]
                })
                .catch((err) => {
                    console.error('Error fetching brainstorm colors:', err)
                })
                .finally(() => {
                    fetching.current = false
                })
        }

        if (next.length === 0) {
            console.log('resetting brainstorm colors')
            const resetColors = initialBrainstormColors
            setData(resetColors[0])
            nextColors.current = resetColors
            return
        }

        setData(next[0])
        nextColors.current = next

        startProgress()
    }

    const startProgress = () => {
        let startTime: number | null = null
        const duration = BRAINSTORM_INTERVAL

        const step = (timestamp: number) => {
            if (!startTime) startTime = timestamp
            const progressValue = Math.min(((timestamp - startTime) / duration) * 100, 100)
            setProgress(progressValue)

            if (progressValue < 100) {
                requestAnimationFrame(step)
            }
        }

        requestAnimationFrame(step)
    }

    useEffect(() => {
        if (!brainstorm) {
            setData(highlightedColor.current)
            setProgress(0)
            return
        }

        startProgress()
        const interval = setInterval(nextColor, BRAINSTORM_INTERVAL)

        return () => clearInterval(interval)
    }, [brainstorm])

    return (
        <>
            <Transition
                as='div'
                show={brainstorm}
                enter='transition-opacity'
                enterFrom='opacity-0'
                enterTo='opacity-100'
                leave='transition-opacity'
                leaveFrom='opacity-100'
                leaveTo='opacity-0'
                className='fixed top-0 left-0 h-1 rounded-r-full z-50'
                style={{
                    background: data.hex,
                    width: `${progress}%`,
                }}
            />
            <div
                className={twMerge(
                    'flex flex-col gap-8 transition-all duration-500 ease-in-out',
                    mounted ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
                )}
            >
                <div className='flex items-center justify-between'>
                    <div className='flex items-center gap-4'>
                        <h1 className='text-2xl sm:text-4xl md:text-6xl font-bold'>
                            {brainstorm ? 'brainstorm' : 'cor destaque'}
                        </h1>
                        {!brainstorm && <ResetTimer updateAt={nextUnix} />}
                    </div>
                    <input
                        type='checkbox'
                        onChange={() => setBrainstorm(!brainstorm)}
                        checked={brainstorm}
                    />
                </div>
                <ColorCard data={data} />
                <ColorDetails data={data} />
                <Items data={data} />
            </div>
        </>
    )
}
